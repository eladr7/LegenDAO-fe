/* eslint-disable no-console */
import { Buffer } from "buffer";
import { SecretNetworkClient } from "secretjs";
import { AccountData } from "secretjs/dist/wallet_amino";
import { Middleware, MiddlewareAPI } from "redux";
import { TAppDispatch, TRootState } from "../store";
import { TNetError } from "../commons/types";
import { networkActions } from "../../features/network/networkSlice";
import { walletActions } from "../../features/wallet/walletSlice";
import { LGND_ADDRESS, PLATFORM_ADDRESS } from "../../constants/contractAddress";
import { transactionActions } from "../../features/transaction/transactionSlice";
import { DF_DENOM } from "../../constants/defaults";

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
                if (!client || !primaryAccount) return;
                client.query.bank
                    .allBalances({
                        address: primaryAccount.address,
                    })
                    .then((result) => {
                        next({ ...action, payload: { balances: result.balances } });
                    })
                    .catch((err) => {
                        console.warn(err);
                    });
                break;
            }

            case walletActions.getBalance.type: {
                if (!client || !primaryAccount) return;
                client.query.bank
                    .balance({
                        address: primaryAccount.address,
                        denom: action.payload.denom || DF_DENOM,
                    })
                    .then((result) => {
                        next({ ...action, payload: { balance: result.balance } });
                    })
                    .catch((err) => {
                        console.warn(err);
                    });
                break;
            }

            case transactionActions.sendTokenFromPlatformToContract.type: {
                const platformContractAddress: string = PLATFORM_ADDRESS || "";
                if (!client || !platformContractAddress) return;

                const { sendAmount, mintAmount, destinationContract, forAddress } = action.payload;

                console.log({ sendAmount, mintAmount, destinationContract, forAddress });

                store.dispatch(transactionActions.startTransaction());

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
                                    contract_addr: destinationContract,
                                    amount: sendAmount.toString(),
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
                                    amount: amount.toString(),
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

            default:
                next(action);
                break;
        }
    };
};

export const netMiddleware = _netMiddlewareClosure();
