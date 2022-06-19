/* eslint-disable no-console */
import { Buffer } from "buffer";
import {
    Coin,
    MsgExecuteContract,
    MsgSnip20Send,
    Permission,
    SecretNetworkClient,
    StdSignature,
} from "secretjs";
import { AccountData } from "secretjs/dist/wallet_amino";
import { Middleware, MiddlewareAPI } from "redux";
import { TAppDispatch, TRootState } from "../store";
import { TNetError } from "../commons/types";
import { networkActions } from "../../features/network/networkSlice";
import { IDataStaking, walletActions, walletAsyncActions } from "../../features/wallet/walletSlice";
import {
    LGND_ADDRESS,
    NFT_ADDRESSES,
    NFT_MINTING_ADDRESSES,
    PLATFORM_ADDRESS,
    STAKING_ADDRESS,
} from "../../constants/contractAddress";
import { transactionActions } from "../../features/transaction/transactionSlice";
import { DF_DENOM } from "../../constants/defaults";
import { KEY, MESSAGE_ERROR } from "../../constants/constant";
import { collectionAtions, TGeneralCollectionData } from "../../features/collection/collectionSlice";
import { addPopup, applicationActions } from "../../features/application/applicationSlice";
import { formatBalance } from "../../helpers/format";
import {
    toggleDepositPanel,
    toggleWithdrawPanel,
} from "../../features/accessibility/accessibilitySlice";
import walletAPI from "../../features/wallet/walletApi";
import { mongoDbServices } from "../commons/mongoDbServices";
import BigNumber from "bignumber.js";
import { getDetailNft, getMintingHistory } from "../nftContract";
import {
    ISigner,
    TBalanceSnip20,
    TCodeHash,
    TRewards,
    TTotalLocked,
    TTransactionHistory,
} from "../../classes/QueryContract";
import { mintActions } from "../../features/mint/mintSlice";

import imgTopSecretColBg01 from "../../assets/images/top-secret-col-background-01.png";
import imgTopSecretColMintBg01 from "../../assets/images/top-secret-col-mint-background-01.png";

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
    let codeHashes: TCodeHash = {};
    let signerPermit: ISigner = {
        msg: {
            permit_name: KEY.PERMIT_NAME,
            allowed_tokens: [],
            permissions: ["balance", "owner"] as Permission[],
        },
        signature: undefined,
        account: "",
    };
    const chainId = process.env.REACT_APP_NET_CHAIN_ID;

    const initAddressArray = [
        LGND_ADDRESS,
        PLATFORM_ADDRESS,
        ...NFT_ADDRESSES,
        ...NFT_MINTING_ADDRESSES,
        STAKING_ADDRESS,
    ];

    return (store: MiddlewareAPI<TAppDispatch, TRootState>) => (next) => async (action) => {
        switch (action.type) {
            case networkActions.tryConnecting.type: {
                console.log("%cSTART CONNECTING TO SECRET NETWORK...", "color: lightgreen");
                store.dispatch(networkActions.beginConnecting);

                if (client !== null) {
                    console.log("%CLEAR PREVIOUS CLIENT...", "color: yellow");
                    client = null;
                }
                await walletAPI.suggestChain({ delay: 0 });

                _connect()
                    .then((result) => {
                        client = result.client;
                        store.dispatch(networkActions.finishConnecting());
                    })
                    .catch((err) => {
                        console.warn(err);
                        store.dispatch(networkActions.disconnect());
                        store.dispatch(
                            applicationActions.toastRequestRejected({
                                errorMsg: (err as any)?.message as string,
                            })
                        );
                    });

                break;
            }

            case walletActions.getAllCodeHash.type: {
                const codeHashLocal = JSON.parse(localStorage.getItem(KEY.CODE_HASHES) as string);
                const contractAddress = action.payload?.contractAddress;
                const addressArray = contractAddress
                    ? codeHashes.length
                        ? [...Object.keys(codeHashes), ...contractAddress]
                        : [...initAddressArray, ...contractAddress]
                    : [...initAddressArray];

                const matchArray = codeHashLocal && Object.keys(codeHashLocal).equals(addressArray);

                if (codeHashLocal && matchArray) {
                    codeHashes = codeHashLocal;
                } else {
                    const getCodeHash = async (address: string) => {
                        return {
                            codeHash: await client?.query.compute.contractCodeHash(address),
                            address: address,
                        };
                    };

                    const codeHashArr = addressArray.map((address) => {
                        return getCodeHash(address as string);
                    });
                    Promise.all(codeHashArr).then((res) => {
                        for (let index = 0; index < addressArray.length; index++) {
                            codeHashes[addressArray[index] as string] = { ...res[index] };
                        }
                        localStorage.setItem(KEY.CODE_HASHES, JSON.stringify(codeHashes));
                    });
                }

                break;
            }

            case walletActions.getSigner.type: {
                const getSigner = async () => {
                    const signer = JSON.parse(localStorage.getItem(KEY.SIGNER) as string);
                    const allowedTokensMsg = signer?.msg.allowed_tokens;

                    const matchArray = initAddressArray.equals(allowedTokensMsg);

                    if (signer && signer.account === client?.address && matchArray) {
                        signerPermit = signer;
                        store.dispatch(walletAsyncActions.connect({ delay: 200 }));
                        next({ ...action, payload: { signature: signer.signature } });
                    } else {
                        const msg = {
                            permit_name: KEY.PERMIT_NAME,
                            permissions: ["balance", "owner"],
                            allowed_tokens: initAddressArray.map((address) => {
                                return address as string;
                            }),
                        };

                        try {
                            if (window.keplr) {
                                const { signature } = await window.keplr.signAmino(
                                    chainId as string,
                                    client?.address as string,
                                    {
                                        chain_id: chainId as string,
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
                                                    ...msg,
                                                },
                                            },
                                        ],
                                        memo: "", // Must be empty
                                    },
                                    {
                                        preferNoSetFee: true, // Fee must be 0, so hide it from the user
                                        preferNoSetMemo: true, // Memo must be empty, so hide it from the user
                                    }
                                );
                                signerPermit = {
                                    signature,
                                    msg,
                                    account: client?.address,
                                };
                                localStorage.setItem(KEY.SIGNER, JSON.stringify(signerPermit));
                                store.dispatch(walletAsyncActions.connect({ delay: 200 }));
                                next({ ...action, payload: { signature } });
                            }
                        } catch (error) {
                            store.dispatch(
                                applicationActions.toastRequestRejected({
                                    errorMsg: (error as any)?.message as string,
                                })
                            );
                        }
                    }
                };

                getSigner();
                break;
            }

            case walletActions.getBalance.type: {
                const lgndToken = process.env.REACT_APP_ADDRESS_LGND;
                const contractAddress = process.env.REACT_APP_ADDRESS_PLATFORM;

                if (!client || !window.keplr) return;
                if (!chainId || !lgndToken || !contractAddress || !signerPermit) return;
                const initTokens = [
                    {
                        denom: DF_DENOM,
                        tokenAddress: LGND_ADDRESS as string,
                    },
                    {
                        denom: DF_DENOM,
                        tokenAddress: PLATFORM_ADDRESS as string,
                    },
                    {
                        denom: DF_DENOM,
                        tokenAddress: STAKING_ADDRESS as string,
                    },
                ];
                const tokens = action.payload?.tokens;

                const getBalance = async (
                    tokenAddress: string,
                    denom: string,
                    signature: StdSignature
                ) => {
                    try {
                        const result = await (
                            client as SecretNetworkClient
                        )?.query.snip20.queryContract({
                            contractAddress: tokenAddress,
                            codeHash: codeHashes[tokenAddress]?.codeHash || "",
                            query: {
                                with_permit: {
                                    query: { balance: {} },
                                    permit: {
                                        params: {
                                            ...signerPermit?.msg,
                                            chain_id: chainId,
                                        },
                                        signature,
                                    },
                                },
                            },
                        });
                        const balance = {
                            ...(result as TBalanceSnip20)?.balance,
                            denom: denom || DF_DENOM,
                            tokenAddress,
                        };
                        next({
                            ...action,
                            payload: { balance },
                        });
                    } catch (error) {
                        store.dispatch(
                            applicationActions.toastRequestRejected({
                                errorMsg: (error as any)?.message as string,
                            })
                        );
                    }
                };

                if (signerPermit.signature) {
                    const fetchData = (tokens ? [...initTokens, ...tokens] : initTokens).map(
                        (item: { tokenAddress: string; denom: string }) => {
                            return getBalance(
                                item.tokenAddress,
                                item.denom,
                                signerPermit?.signature as StdSignature
                            );
                        }
                    );
                    Promise.all(fetchData);
                }

                break;
            }

            case transactionActions.sendTokenFromPlatformToContract.type: {
                const platformContractAddress: string = PLATFORM_ADDRESS || "";
                if (!client || !platformContractAddress || !STAKING_ADDRESS) return;

                const { sendAmount, amountToMint, forAddress, mintingContractAddress } =
                    action.payload;

                if (!sendAmount || !amountToMint) {
                    return next({ ...action, payload: { ...action.payload, tx: undefined } });
                }
                store.dispatch(transactionActions.startTransaction());

                const wantedMsg = Buffer.from(
                    JSON.stringify({
                        mint: {
                            amount_to_mint: amountToMint,
                            mint_for: forAddress || client.address,
                        },
                    })
                ).toString("base64");

                const msgSendFromPlatform = new MsgExecuteContract({
                    sender: client.address,
                    contractAddress: platformContractAddress,
                    codeHash: codeHashes[platformContractAddress].codeHash || "",
                    msg: {
                        send_from_platform: {
                            contract_addr: mintingContractAddress,
                            amount: sendAmount,
                            msg: wantedMsg,
                        },
                    },
                });

                client.tx
                    .broadcast([msgSendFromPlatform], {
                        gasLimit: 500_000,
                    })
                    .then((tx) => {
                        store.dispatch(
                            addPopup({
                                content: {
                                    txn: {
                                        success: Boolean(tx?.data.length),
                                        errSummary: "Mint NFT failed",
                                    },
                                },
                                key: tx.transactionHash,
                            })
                        );
                        next({ ...action, payload: { ...action.payload, tx } });
                    })
                    .catch((error) => {
                        store.dispatch(
                            applicationActions.toastRequestRejected({
                                errorMsg: (error as any)?.message as string,
                            })
                        );
                    });

                break;
            }

            case transactionActions.depositToPlatform.type: {
                const { amount, toAddress } = action.payload;
                if (!client || !PLATFORM_ADDRESS || !LGND_ADDRESS) return;
                store.dispatch(transactionActions.startTransaction());

                const msgDeposit = new MsgSnip20Send({
                    contractAddress: LGND_ADDRESS,
                    sender: client.address,
                    codeHash: codeHashes[LGND_ADDRESS]?.codeHash || "",
                    msg: {
                        send: {
                            recipient: PLATFORM_ADDRESS,
                            amount: amount,
                            msg: Buffer.from(
                                JSON.stringify({ deposit: { to: toAddress || client.address } })
                            ).toString("base64"),
                        },
                    },
                });

                const msgStake = new MsgExecuteContract({
                    contractAddress: PLATFORM_ADDRESS,
                    sender: client.address,
                    codeHash: codeHashes[PLATFORM_ADDRESS]?.codeHash || "",
                    msg: {
                        send_from_platform: {
                            contract_addr: STAKING_ADDRESS,
                            amount: amount,
                            msg: Buffer.from(
                                JSON.stringify({
                                    Deposit: {},
                                })
                            ).toString("base64"),
                        },
                    },
                });

                client.tx
                    .broadcast([msgDeposit, msgStake], {
                        gasLimit: 500_000,
                    })
                    .then((tx) => {
                        if (tx?.data.length) {
                            store.dispatch(toggleDepositPanel());
                        }
                        store.dispatch(
                            addPopup({
                                content: {
                                    txn: {
                                        success: Boolean(tx?.data.length),
                                        summary: `Deposit ${formatBalance(
                                            amount
                                        )} $${DF_DENOM.toUpperCase()} successfully`,
                                        errSummary: "Deposit unsuccessfully. Please try again.",
                                    },
                                },
                                key: tx?.transactionHash,
                            })
                        );
                        next({ ...action, payload: { ...action.payload, tx } });
                    })
                    .catch((error) => {
                        store.dispatch(
                            applicationActions.toastRequestRejected({
                                errorMsg: error?.message as string,
                            })
                        );
                    });

                break;
            }

            case transactionActions.addMinters.type: {
                const { minters, codeHash } = action.payload;
                const nftContractAddress: string | undefined = NFT_ADDRESSES[0]; //TODO: adjust for all collections
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
                    .catch((error) => {
                        store.dispatch(
                            applicationActions.toastRequestRejected({
                                errorMsg: (error as any)?.message as string,
                            })
                        );
                    });

                break;
            }

            case transactionActions.mintNfts.type: {
                const { amount } = action.payload;
                const nftContractAddress: string | undefined = NFT_ADDRESSES[0]; //TODO: adjust for all collections;
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
                    .catch((error) => {
                        store.dispatch(
                            applicationActions.toastRequestRejected({
                                errorMsg: (error as any)?.message as string,
                            })
                        );
                    });

                break;
            }

            case transactionActions.mintNftsWithSnip.type: {
                const { snipContract, priceForEach, amountToBuy, buyFor } = action.payload;
                const nftContractAddress: string | undefined = NFT_ADDRESSES[0]; //TODO: adjust for all collections;
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
                    .catch((error) => {
                        store.dispatch(
                            applicationActions.toastRequestRejected({
                                errorMsg: (error as any)?.message as string,
                            })
                        );
                    });

                break;
            }

            case transactionActions.mintAdminNfts.type: {
                const { amount } = action.payload;
                const nftContractAddress: string | undefined = NFT_ADDRESSES[0]; //TODO: adjust for all collections;
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
                    .catch((error) => {
                        store.dispatch(
                            applicationActions.toastRequestRejected({
                                errorMsg: (error as any)?.message as string,
                            })
                        );
                    });

                break;
            }

            case transactionActions.setTokenAttributes.type: {
                const { attributes, codeHash } = action.payload;
                const nftContractAddress: string | undefined = NFT_ADDRESSES[0]; //TODO: adjust for all collections;
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
                    .catch((error) => {
                        store.dispatch(
                            applicationActions.toastRequestRejected({
                                errorMsg: (error as any)?.message as string,
                            })
                        );
                    });

                break;
            }

            case transactionActions.changeWhitelistLevel.type: {
                const { newLevel, codeHash } = action.payload;
                const nftContractAddress: string | undefined = NFT_ADDRESSES[0]; //TODO: adjust for all collections;
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
                    .catch((error) => {
                        store.dispatch(
                            applicationActions.toastRequestRejected({
                                errorMsg: (error as any)?.message as string,
                            })
                        );
                    });

                break;
            }

            case transactionActions.addToWhitelist.type: {
                const { address, codeHash } = action.payload;
                const nftContractAddress: string | undefined = NFT_ADDRESSES[0]; //TODO: adjust for all collections;
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
                    .catch((error) => {
                        store.dispatch(
                            applicationActions.toastRequestRejected({
                                errorMsg: (error as any)?.message as string,
                            })
                        );
                    });

                break;
            }

            case transactionActions.viewTokens.type: {
                const { codeHash, address, key } = action.payload;
                const nftContractAddress: string | undefined = NFT_ADDRESSES[0]; //TODO: adjust for all collections;
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
                    .catch((error) => {
                        store.dispatch(
                            applicationActions.toastRequestRejected({
                                errorMsg: (error as any)?.message as string,
                            })
                        );
                    });

                break;
            }

            case transactionActions.isWhitelisted.type: {
                const { address, nftMintingContract } = action.payload;
                if (!client || !nftMintingContract) return;

                client.query.compute
                    .queryContract({
                        contractAddress: nftMintingContract,
                        codeHash: codeHashes[nftMintingContract]?.codeHash,
                        query: { is_whitelisted: { address } },
                    })
                    .then((status) => {
                        next({ ...action, payload: { ...action.payload, status } });
                    })
                    .catch((error) => {
                        store.dispatch(
                            applicationActions.toastRequestRejected({
                                errorMsg: (error as any)?.message as string,
                            })
                        );
                    });

                break;
            }

            case transactionActions.claimPlatform.type: {
                const platformContractAddress = PLATFORM_ADDRESS;
                if (!client || !platformContractAddress) return;
                const { amountClaim } = action.payload;
                client.tx.compute
                    .executeContract(
                        {
                            contractAddress: PLATFORM_ADDRESS as string,
                            codeHash: codeHashes[platformContractAddress].codeHash || "",
                            sender: client.address,
                            msg: {
                                claim_redeemed: {},
                            },
                        },
                        {
                            gasLimit: 300_000,
                        }
                    )
                    .then((tx) => {
                        store.dispatch(
                            addPopup({
                                content: {
                                    txn: {
                                        success: Boolean(tx?.data.length),
                                        summary: `Claim ${amountClaim} $LGND successfully`,
                                        errSummary: `Claim ${amountClaim} $LGND unsuccessfully`,
                                    },
                                },
                                key: tx.transactionHash,
                            })
                        );
                        next({ ...action, payload: { ...action.payload, tx } });
                    })
                    .catch((error) => {
                        store.dispatch(
                            applicationActions.toastRequestRejected({
                                errorMsg: (error as any)?.message as string,
                            })
                        );
                    });

                break;
            }

            case transactionActions.withdrawFromPlatform.type: {
                const platformContractAddress = PLATFORM_ADDRESS;
                if (!client || !platformContractAddress || !STAKING_ADDRESS) return;
                const { amount } = action.payload;
                store.dispatch(transactionActions.startTransaction());

                const msgWithdrawFromStaking = new MsgExecuteContract({
                    contractAddress: STAKING_ADDRESS,
                    codeHash: codeHashes[STAKING_ADDRESS]?.codeHash,
                    sender: client.address,
                    msg: {
                        withdraw: {
                            amount: amount,
                        },
                    },
                });

                const msgRedeemFromPlatform = new MsgExecuteContract({
                    contractAddress: PLATFORM_ADDRESS as string,
                    codeHash: codeHashes[platformContractAddress].codeHash || "",
                    sender: client.address,
                    msg: {
                        redeem: {
                            amount,
                        },
                    },
                });

                client.tx
                    .broadcast([msgWithdrawFromStaking, msgRedeemFromPlatform], {
                        gasLimit: 500_000,
                    })
                    .then((tx) => {
                        store.dispatch(
                            addPopup({
                                content: {
                                    txn: {
                                        success: Boolean(tx?.data.length),
                                        summary: `Withdraw ${formatBalance(
                                            amount
                                        )} $${DF_DENOM.toUpperCase()} successfully`,
                                        errSummary: "Withdraw unsuccessfully. Please try again.",
                                    },
                                },
                                key: tx.transactionHash,
                            })
                        );
                        if (tx?.data.length) {
                            store.dispatch(toggleWithdrawPanel());
                        }
                        next({ ...action, payload: { ...action.payload, tx } });
                    })
                    .catch((error) => {
                        store.dispatch(
                            applicationActions.toastRequestRejected({
                                errorMsg: error?.message as string,
                            })
                        );
                    });

                break;
            }

            case collectionAtions.getCollection.type: {
                const { nftContract } = action.payload;
                const getTokens = async () => {
                    if (!client || !nftContract || !chainId || !signerPermit.signature) return;
                    const tokens = await client.query.compute.queryContract({
                        contractAddress: nftContract,
                        codeHash: codeHashes[nftContract]?.codeHash || "",
                        query: {
                            with_permit: {
                                query: {
                                    tokens: {
                                        owner: client.address,
                                        limit: 4444,
                                    },
                                },
                                permit: {
                                    params: {
                                        ...signerPermit.msg,
                                        chain_id: chainId,
                                    },
                                    signature: signerPermit.signature,
                                },
                            },
                        },
                    });

                    const allTokens = (tokens as any).token_list.tokens;

                    const collectionsDetails = allTokens?.map((token: string) => {
                        if (!signerPermit) return;
                        const msg = {
                            with_permit: {
                                query: {
                                    nft_dossier: {
                                        token_id: token,
                                    },
                                },
                                permit: {
                                    params: {
                                        ...signerPermit.msg,
                                        chain_id: chainId,
                                    },
                                    signature: signerPermit.signature,
                                },
                            },
                        };

                        return (client as SecretNetworkClient).query.compute.queryContract({
                            contractAddress: nftContract as string,
                            codeHash: codeHashes[nftContract as string]?.codeHash || "",
                            query: {
                                ...msg,
                            },
                        });
                    });

                    const listMyCollection = await Promise.all(collectionsDetails);
                    next({ ...action, payload: { listMyCollection, nftContract } }); // , nftContract: nftContract
                };

                getTokens();

                break;
            }

            case collectionAtions.getGeneralCollectionsData.type: {
                // TODO: impl the real method
                // const { nftContract } = action.payload;
                // Notice to always put a collection with "onSale: true" as the first element of the array,
                // since collectionSlice::selectedCollectionIndex is set to 0 by default
                const collectionItems: Array<TGeneralCollectionData> = [
                    {
                        coverImgUrl: imgTopSecretColMintBg01,
                        name: "Top Secret Collection",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod \
                        tempor incididunt ut labore et dolore magna aliqua. Suscipit tellus mauris a \
                        diam maecenas sed enim ut sem. Pharetra diam sit amet nisl. Cras ornare arcu \
                        dui vivamus arcu felis bibendum. Dapibus ultrices in iaculis nunc sed augue \
                        lacus viverra vitae. Duis ut diam quam nulla porttitor massa id neque.",
                        artistDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod \
                        tempor incididunt ut labore et dolore magna aliqua. Suscipit tellus mauris a \
                        diam maecenas sed enim ut sem. Pharetra diam sit amet nisl. Cras ornare arcu \
                        dui vivamus arcu felis bibendum. Dapibus ultrices in iaculis nunc sed augue \
                        lacus viverra vitae. Duis ut diam quam nulla porttitor massa id neque.",
                        artistName: "XXXX XXXXX XXXX",
                        startingDate: new Date(2022, 4, 18),
                        totalItemNum: 300,
                        mintPrice: 0.1,
                        nftContractAddress: NFT_ADDRESSES[0]!,
                        onSale: true
                    },
                    {
                        coverImgUrl: imgTopSecretColBg01,
                        name: "Hall of Legend 1",
                        description: "There is a hall, full of legends that being kept by mysteries creatures 1",
                        artistDescription: " 1",
                        artistName: "XXXX XXXXX XXXX 1",
                        startingDate: new Date(2022, 3, 18),
                        totalItemNum: 100,
                        mintPrice: 0.1,
                        nftContractAddress: NFT_ADDRESSES[1]!,
                        onSale: true
                    },
                    {
                        coverImgUrl: imgTopSecretColBg01,
                        name: "Hall of Legend 2",
                        description: "There is a hall, full of legends that being kept by mysteries creatures 2",
                        artistDescription: " 2",
                        artistName: "XXXX XXXXX XXXX 2",
                        startingDate: new Date(2022, 6, 12),
                        totalItemNum: 100,
                        mintPrice: 0.1,
                        nftContractAddress: NFT_ADDRESSES[2]!,
                        onSale: true
                    },
                    {
                        coverImgUrl: imgTopSecretColBg01,
                        name: "Hall of Legend 3",
                        description: "There is a hall, full of legends that being kept by mysteries creatures 3",
                        artistDescription: " 3",
                        artistName: "XXXX XXXXX XXXX 3",
                        startingDate: new Date(2021, 1, 1),
                        totalItemNum: 200,
                        mintPrice: 0.1,
                        nftContractAddress: "some address 3",
                        onSale: false
                    },
                    {
                        coverImgUrl: imgTopSecretColBg01,
                        name: "Hall of Legend 4",
                        description: "There is a hall, full of legends that being kept by mysteries creatures 4",
                        artistDescription: " 4",
                        artistName: "XXXX XXXXX XXXX 4",
                        startingDate: new Date(2021, 7, 5),
                        totalItemNum: 200,
                        mintPrice: 0.1,
                        nftContractAddress: "some address 4",
                        onSale: false
                    },
                    
                 ]

                 next({ ...action, payload: { generalCollectionsData: collectionItems } });

                 break;
            }

            case applicationActions.toastRequestRejected.type: {
                const message = action.payload?.errorMsg;
                switch (message) {
                    case MESSAGE_ERROR.REQUEST_REJECTED:
                        store.dispatch(
                            addPopup({
                                content: {
                                    txn: {
                                        success: false,
                                        errSummary: "Request rejected. Please try again.",
                                    },
                                },
                            })
                        );
                        break;
                    case MESSAGE_ERROR.SIGNER_NOT_SET:
                        break;
                    default:
                        store.dispatch(
                            addPopup({
                                content: {
                                    txn: {
                                        success: false,
                                        errSummary: "System error!",
                                    },
                                },
                            })
                        );
                        console.error(message);
                        break;
                }

                store.dispatch(transactionActions.endTransaction());
                break;
            }

            case walletActions.getTokenData.type:
                (async () => {
                    try {
                        const res = await mongoDbServices.getTokenDataMongoDb();

                        if (res.status === 200) {
                            const { apy, apr, liquidity, price_usd, total_locked, daily_volume} = res.data.document;
                            next({
                                ...action,
                                payload: {
                                    tokenData: {
                                        price: price_usd,
                                        apy: apy,
                                        apr: apr,
                                        liquidity: liquidity,
                                        dailyVolume: daily_volume,
                                        totalLocked: total_locked
                                    },
                                },
                            });
                        }
                    } catch (error) {
                        store.dispatch(
                            applicationActions.toastRequestRejected({
                                errorMsg: (error as any)?.message as string,
                            })
                        );
                    }
                })();
                break;

            case walletActions.getRewardsStaking.type:
                (async () => {
                    try {
                        if (!client || !STAKING_ADDRESS) return;
                        const getDataStaking = (query: any) => {
                            if (!client || !STAKING_ADDRESS) return;
                            return client.query.snip20.queryContract({
                                contractAddress: STAKING_ADDRESS,
                                codeHash: codeHashes[STAKING_ADDRESS]?.codeHash || "",
                                query: {
                                    ...query,
                                },
                            });
                        };

                        const [rewardsResult] = await Promise.all([
                            getDataStaking({
                                with_permit: {
                                    query: {
                                        rewards: {
                                            height: 1,
                                        },
                                    },
                                    permit: {
                                        params: {
                                            ...signerPermit?.msg,
                                            chain_id: chainId,
                                        },
                                        signature: signerPermit?.signature as StdSignature,
                                    },
                                },
                            })
                        ]);

                        const amountRewards = (rewardsResult as TRewards)?.rewards.rewards;

                        const rewards: Coin = {
                            amount: formatBalance(amountRewards),
                            denom: DF_DENOM,
                        };

                        const storeState = store.getState();
                        const { balances } = storeState.wallet;
                        const price = storeState.wallet.tokenData?.price?? 0;
                        
                        // The amount staked by the user
                        const totalStakedBalance = balances[STAKING_ADDRESS]?.amount;
                        const priceStaked = new BigNumber(totalStakedBalance)
                            .times(price.toString())
                            .toFixed();
                        const priceReward = new BigNumber(amountRewards)
                            .times(price.toString())
                            .toFixed();

                        const dataStaking: IDataStaking = {
                            totalStakedBalance: formatBalance(totalStakedBalance),
                            priceStaked: formatBalance(priceStaked),
                            rewards,
                            priceReward: formatBalance(priceReward),
                        };

                        next({
                            ...action,
                            payload: { dataStaking },
                        });
                    } catch (error) {
                        store.dispatch(
                            applicationActions.toastRequestRejected({
                                errorMsg: (error as any)?.message as string,
                            })
                        );
                    }
                })();

                break;

            case mintActions.getLatestNft.type:
                (async () => {
                    const { selectedCollectionIndex } = action.payload;

                    try {
                        console.log("run");

                        if (!client || !NFT_ADDRESSES[selectedCollectionIndex] || !signerPermit.msg?.allowed_tokens) return;
                        const selectedNFTCollectionAddress = NFT_ADDRESSES[selectedCollectionIndex]!;
                        const mintingHistory = await getMintingHistory(
                            client,
                            {
                                params: {
                                    ...signerPermit.msg,
                                    allowed_tokens: signerPermit.msg.allowed_tokens,
                                    permissions: signerPermit.msg.permissions as Permission[],
                                    chain_id: chainId as string,
                                },
                                signature: signerPermit.signature as StdSignature,
                            },
                            selectedNFTCollectionAddress,
                            codeHashes[selectedNFTCollectionAddress]?.codeHash
                        );

                        const latestTx = (mintingHistory as TTransactionHistory).transaction_history
                            .txs[0];

                        const latestNft = await getDetailNft(
                            client,
                            latestTx.token_id,
                            {
                                params: {
                                    ...signerPermit.msg,
                                    allowed_tokens: signerPermit.msg.allowed_tokens,
                                    permissions: signerPermit.msg.permissions as Permission[],
                                    chain_id: chainId as string,
                                },
                                signature: signerPermit.signature as StdSignature,
                            },
                            selectedNFTCollectionAddress,
                            codeHashes[selectedNFTCollectionAddress]?.codeHash
                        );

                        const publicData = (latestNft as any).nft_dossier?.public_metadata
                            .extension;
                        const privateData = (latestNft as any).nft_dossier?.private_metadata
                            ?.extension;
                        const royalties = (latestNft as any).nft_dossier?.royalty_info?.royalties;

                        const agent = {
                            name: publicData?.name,
                            description: publicData?.description,
                            publicAttributes: publicData?.attributes?.map(
                                (item: any) => item.trait_type
                            ),
                            privateAttributes: privateData?.attributes?.map(
                                (item: any) => item.trait_type
                            ),
                            token: royalties[0]?.recipient,
                            royalties: royalties[0].rate,
                        };

                        next({
                            ...action,
                            payload: { agent },
                        });
                    } catch (error) {
                        store.dispatch(
                            applicationActions.toastRequestRejected({
                                errorMsg: (error as any)?.message as string,
                            })
                        );
                    }
                })();
                break;

            default:
                next(action);
                break;
        }
    };
};

export const netMiddleware = _netMiddlewareClosure();
