/* eslint-disable no-console */
import { Buffer } from "buffer";
import { SecretNetworkClient } from "secretjs";
import { AccountData } from "secretjs/dist/wallet_amino";
import { Middleware, MiddlewareAPI } from "redux";
import { TAppDispatch, TRootState } from "../store";
import { TNetError } from "../commons/types";
import { networkActions } from "../../features/network/networkSlice";
import { walletActions } from "../../features/wallet/walletSlice";
import { LGND_ADDRESS, NFT_ADDRESS, PLATFORM_ADDRESS } from "../../constants/contractAddress";
import { transactionActions } from "../../features/transaction/transactionSlice";
import { DF_DENOM } from "../../constants/defaults";

type TBalance = {
    balance: {
        amount: string;
        denom: string;
    };
};

const _connect = (): Promise<{ client: SecretNetworkClient; account: AccountData }> => {
    return new Promise((resolve, reject: (reason?: TNetError) => void) => {
        if (!process.env.REACT_APP_NET_URL_RPC || !process.env.REACT_APP_NET_CHAIN_ID) {
            console.warn("invalid/net/urls");
            reject("invalid/net/urls");
            return;
        }
        if (!window.getOfflineSigner) {
            console.warn("invalid/keplr/signer");
            reject("invalid/keplr/signer");
            return;
        }

        const rpcUrl = new URL(process.env.REACT_APP_NET_URL_RPC);
        const chainId = process.env.REACT_APP_NET_CHAIN_ID;
        const offlineSigner = window.getOfflineSigner(chainId);
        let primaryAccount: AccountData | null = null;

        offlineSigner
            .getAccounts()
            .then((accounts) => {
                const [firstAccount] = accounts;
                primaryAccount = firstAccount;
                console.table(accounts);
                return SecretNetworkClient.create({
                    grpcWebUrl: rpcUrl.toString(),
                    chainId: chainId,
                    wallet: offlineSigner,
                    walletAddress: primaryAccount.address,
                });
            })
            .then((result) => {
                if (!primaryAccount) {
                    reject("invalid/keplr/signer/accounts");
                    return;
                }
                resolve({
                    client: result,
                    account: primaryAccount,
                });
            })
            .catch((err) => {
                console.warn(err);
                reject(err);
            });
    });
};

const _netMiddlewareClosure = (): Middleware => {
    let client: SecretNetworkClient | null = null;
    let primaryAccount: AccountData | null = null;
    return (store: MiddlewareAPI<TAppDispatch, TRootState>) => (next) => (action) => {
        switch (action.type) {
            case networkActions.tryConnecting.type: {
                console.log("%cSTART CONNECTING TO SECRET NETWORK...", "color: lightgreen");
                store.dispatch(networkActions.beginConnecting);

                if (client !== null) {
                    console.log("%CLEAR PREVIOUS CLIENT...", "color: yellow");
                    client = null;
                }

                _connect()
                    .then((result) => {
                        client = result.client;
                        primaryAccount = result.account;
                        store.dispatch(networkActions.finishConnecting());
                    })
                    .catch((err) => {
                        console.warn(err);
                        store.dispatch(networkActions.disconnect());
                    });

                break;
            }

            case walletActions.getAllBalances.type: {
                break;
            }

            case walletActions.getBalance.type: {
                if (!client || !primaryAccount) return;
                const chainId = process.env.REACT_APP_NET_CHAIN_ID;
                const lgndToken = process.env.REACT_APP_ADDRESS_LGND;
                const contractAddress = process.env.REACT_APP_ADDRESS_PLATFORM;
                if (!client || !primaryAccount || !window.keplr) return;
                if (!chainId || !lgndToken || !contractAddress) return;

                window.keplr
                    .signAmino(
                        chainId,
                        client.address,
                        {
                            chain_id: chainId,
                            account_number: "0", // Must be 0
                            sequence: "0", // Must be 0
                            fee: {
                                amount: [{ denom: "uscrt", amount: "0" }], // Must be 0 uscrt
                                gas: "1", // Must be 1
                            },
                            msgs: [
                                {
                                    type: "query_permit", // Must be "query_permit"
                                    value: {
                                        permit_name: "LegenDAO Sotatek Test",
                                        allowed_tokens: [lgndToken],
                                        permissions: ["balance"],
                                    },
                                },
                            ],
                            memo: "", // Must be empty
                        },
                        {
                            preferNoSetFee: true, // Fee must be 0, so hide it from the user
                            preferNoSetMemo: true, // Memo must be empty, so hide it from the user
                        }
                    )
                    .then(({ signature }) => {
                        if (!client) return;
                        client.query.snip20
                            .queryContract({
                                contractAddress: lgndToken,
                                query: {
                                    with_permit: {
                                        query: { balance: {} },
                                        permit: {
                                            params: {
                                                permit_name: "LegenDAO Sotatek Test",
                                                allowed_tokens: [lgndToken],
                                                chain_id: chainId,
                                                permissions: ["balance"],
                                            },
                                            signature,
                                        },
                                    },
                                },
                            })
                            .then((result) => {
                                const balance = {
                                    ...(result as TBalance)?.balance,
                                    denom: DF_DENOM,
                                };
                                next({
                                    ...action,
                                    payload: { balance },
                                });
                            })
                            .catch((err) => {
                                console.error(err);
                            });
                    })
                    .catch((err) => {
                        console.warn(err);
                    });
                break;
            }

            case transactionActions.sendTokenFromPlatformToContract.type: {
                const platformContractAddress: string = PLATFORM_ADDRESS || "";
                const nftContractAddress: string = NFT_ADDRESS || "";
                if (!client || !platformContractAddress || !nftContractAddress) return;

                const { sendAmount, mintAmount, forAddress } = action.payload;
                console.log({ sendAmount, mintAmount, forAddress });
                if (!sendAmount || !mintAmount) {
                    return next({ ...action, payload: { ...action.payload, tx: undefined } });
                }

                const wantedMsg = Buffer.from(
                    JSON.stringify({
                        mint: {
                            amount_to_mint: mintAmount,
                            mint_for: forAddress || client.address,
                        },
                    })
                ).toString("base64");

                console.log(wantedMsg);

                client.tx.compute
                    .executeContract(
                        {
                            sender: client.address,
                            contractAddress: platformContractAddress,
                            msg: {
                                send_from_platform: {
                                    contract_addr: nftContractAddress,
                                    amount: sendAmount,
                                    msg: wantedMsg,
                                },
                            },
                        },
                        { gasLimit: 500_000 }
                    )
                    .then((tx) => {
                        next({ ...action, payload: { ...action.payload, tx } });
                    })
                    .catch((err) => {
                        console.error(err);
                    });

                break;
            }

            case transactionActions.depositToPlatform.type: {
                const { snipContractAddress, amount, toAddress } = action.payload;
                const platformContractAddress: string | undefined = PLATFORM_ADDRESS;
                const targetContractAddress: string | undefined =
                    snipContractAddress || LGND_ADDRESS;
                if (!client || !platformContractAddress || !targetContractAddress) return;

                console.log({ amount, toAddress });

                const msg = Buffer.from(
                    JSON.stringify({ deposit: { to: toAddress || client.address } })
                ).toString("base64");

                client.tx.snip20
                    .send(
                        {
                            sender: client.address,
                            contractAddress: targetContractAddress,
                            msg: {
                                send: {
                                    recipient: platformContractAddress,
                                    amount: amount,
                                    msg,
                                },
                            },
                        },
                        { gasLimit: 500_000 }
                    )
                    .then((tx) => {
                        next({ ...action, payload: { ...action.payload, tx } });
                    })
                    .catch((err) => {
                        console.error(err);
                    });

                break;
            }

            case transactionActions.addMinters.type: {
                const { minters, codeHash } = action.payload;
                const nftContractAddress: string | undefined = NFT_ADDRESS;
                if (!client || !nftContractAddress) return;

                client.tx.compute
                    .executeContract(
                        {
                            sender: client.address,
                            contractAddress: nftContractAddress,
                            msg: { add_minters: { minters } },
                            codeHash,
                        },
                        {
                            gasLimit: 30_000,
                            gasPriceInFeeDenom: 0.1,
                        }
                    )
                    .then((tx) => {
                        next({ ...action, payload: { ...action.payload, tx } });
                    })
                    .catch((err) => {
                        console.error(err);
                    });

                break;
            }

            case transactionActions.mintNfts.type: {
                const { amount } = action.payload;
                const nftContractAddress: string | undefined = NFT_ADDRESS;
                if (!client || !nftContractAddress) return;

                client.tx.compute
                    .executeContract(
                        {
                            sender: client.address,
                            contractAddress: nftContractAddress,
                            msg: { mint: { amount } },
                            sentFunds: [
                                { denom: "uscrt", amount: String(1_000_000 * Number(amount)) },
                            ],
                        },
                        {
                            gasPriceInFeeDenom: 0.1,
                        }
                    )
                    .then((tx) => {
                        next({ ...action, payload: { ...action.payload, tx } });
                    })
                    .catch((err) => {
                        console.error(err);
                    });

                break;
            }

            case transactionActions.mintNftsWithSnip.type: {
                const { snipContract, priceForEach, amountToBuy, buyFor } = action.payload;
                const nftContractAddress: string | undefined = NFT_ADDRESS;
                if (!client || !nftContractAddress) return;
                const msg = Buffer.from(
                    JSON.stringify({
                        mint: {
                            amount_to_mint: amountToBuy,
                            mint_for: buyFor || client.address,
                        },
                    })
                ).toString("base64");

                client.tx.snip20
                    .send(
                        {
                            sender: client.address,
                            contractAddress: snipContract,
                            msg: {
                                send: {
                                    recipient: nftContractAddress,
                                    amount: (Number(priceForEach) * Number(amountToBuy)).toString(),
                                    msg,
                                },
                            },
                        },
                        {
                            gasLimit: 500_000,
                            gasPriceInFeeDenom: 0.1,
                        }
                    )
                    .then((tx) => {
                        next({ ...action, payload: { ...action.payload, tx } });
                    })
                    .catch((err) => {
                        console.error(err);
                    });

                break;
            }

            case transactionActions.mintAdminNfts.type: {
                const { amount } = action.payload;
                const nftContractAddress: string | undefined = NFT_ADDRESS;
                if (!client || !nftContractAddress) return;

                client.tx.compute
                    .executeContract(
                        {
                            sender: client.address,
                            contractAddress: nftContractAddress,
                            msg: { mint_admin: { amount } },
                        },
                        {
                            gasLimit: 500_000,
                            gasPriceInFeeDenom: 0.1,
                        }
                    )
                    .then((tx) => {
                        next({ ...action, payload: { ...action.payload, tx } });
                    })
                    .catch((err) => {
                        console.error(err);
                    });

                break;
            }

            case transactionActions.setTokenAttributes.type: {
                const { attributes, codeHash } = action.payload;
                const nftContractAddress: string | undefined = NFT_ADDRESS;
                if (!client || !nftContractAddress) return;

                client.tx.compute
                    .executeContract(
                        {
                            sender: client.address,
                            contractAddress: nftContractAddress,
                            msg: { set_attributes: { tokens: attributes } },
                            codeHash,
                        },
                        {
                            gasLimit: 1_500_000,
                            gasPriceInFeeDenom: 0.1,
                        }
                    )
                    .then((tx) => {
                        next({ ...action, payload: { ...action.payload, tx } });
                    })
                    .catch((err) => {
                        console.error(err);
                    });

                break;
            }

            case transactionActions.changeWhitelistLevel.type: {
                const { newLevel, codeHash } = action.payload;
                const nftContractAddress: string | undefined = NFT_ADDRESS;
                if (!client || !nftContractAddress) return;

                client.tx.compute
                    .executeContract(
                        {
                            sender: client.address,
                            contractAddress: nftContractAddress,
                            msg: { changing_minting_state: { mint_state: newLevel } },
                            codeHash,
                        },
                        {
                            gasLimit: 50_000,
                            gasPriceInFeeDenom: 0.1,
                        }
                    )
                    .then((tx) => {
                        next({ ...action, payload: { ...action.payload, tx } });
                    })
                    .catch((err) => {
                        console.error(err);
                    });

                break;
            }

            case transactionActions.addToWhitelist.type: {
                const { address, codeHash } = action.payload;
                const nftContractAddress: string | undefined = NFT_ADDRESS;
                if (!client || !nftContractAddress) return;

                client.tx.compute
                    .executeContract(
                        {
                            sender: client.address,
                            contractAddress: nftContractAddress,
                            msg: { add_whitelist: { addresses: [{ address, amount: 3 }] } },
                            codeHash,
                        },
                        {
                            gasLimit: 500_000,
                            gasPriceInFeeDenom: 0.1,
                        }
                    )
                    .then((tx) => {
                        next({ ...action, payload: { ...action.payload, tx } });
                    })
                    .catch((err) => {
                        console.error(err);
                    });

                break;
            }

            case transactionActions.viewTokens.type: {
                const { codeHash, address, key } = action.payload;
                const nftContractAddress: string | undefined = NFT_ADDRESS;
                if (!client || !nftContractAddress) return;

                client.query.snip721
                    .GetOwnedTokens({
                        contract: {
                            codeHash,
                            address: nftContractAddress,
                        },
                        owner: address,
                        auth: {
                            viewer: {
                                address: address,
                                viewing_key: key,
                            },
                        },
                    })
                    .then((results) => {
                        next({ ...action, payload: { ...action.payload, results } });
                    })
                    .catch((err) => {
                        console.error(err);
                    });

                break;
            }

            case transactionActions.isWhitelisted.type: {
                const { address } = action.payload;
                const nftContractAddress: string | undefined = NFT_ADDRESS;
                if (!client || !nftContractAddress) return;

                client.query.compute
                    .queryContract({
                        contractAddress: nftContractAddress,
                        query: { is_whitelisted: { address } },
                    })
                    .then((results) => {
                        next({ ...action, payload: { ...action.payload, results } });
                    })
                    .catch((err) => {
                        console.error(err);
                    });

                break;
            }

            case transactionActions.claimAirdrop.type: {
                const platformContractAddress = PLATFORM_ADDRESS;
                if (!client || !platformContractAddress) return;

                client.tx.compute
                    .executeContract(
                        {
                            contractAddress: PLATFORM_ADDRESS as string,
                            sender: client.address,
                            msg: {
                                claim_redeemed: {
                                },
                            },
                        },
                        {
                            gasLimit: 300_000,
                        }
                    )
                    .then((results) => {
                        console.log(results);
                        next({ ...action, payload: { ...action.payload, results } });
                    })
                    .catch((err) => {
                        console.error(err);
                    });

                break;
            }

            default:
                next(action);
                break;
        }
    };
};

export const netMiddleware = _netMiddlewareClosure();
