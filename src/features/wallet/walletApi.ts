import { Key } from "@keplr-wallet/types";
import { attachAbortController, sendCreator, TSend } from "../../app/commons/api";
import { experimentalSuggestChain } from "./experimentalSuggestChain";

export const SECRET_CHAIN_ID = "secret-4";

export type TWalletConnectOptions = {
    chainId?: string;
    delay?: number;
};
export type TWalletConnectReturn = Key;

const _connect: TSend<TWalletConnectReturn, TWalletConnectOptions> = sendCreator<
    TWalletConnectReturn,
    TWalletConnectOptions
>((options) => {
    return new Promise((resolve, reject) => {
        if (!window.keplr) {
            reject("Can not detect Keplr wallet");
            return;
        }
        const chainId = options.chainId || process.env.REACT_APP_NETWORK_CHAINID || "";
        const experimentalSuggestChainProm = experimentalSuggestChain();
        experimentalSuggestChainProm && experimentalSuggestChainProm
            .then(() => {
                if (!window.keplr) return;
                return window.keplr.enable(chainId);
            })
            .then(() => {
                if (!window.keplr) {
                    reject("Somthing went wrong with Keplr wallet extension");
                    return;
                }
                return window.keplr.getKey(chainId);
            })
            .then((key) => {
                if (!key) {
                    reject("Can not get Keplr wallet key");
                    return;
                }
                resolve(key);
            })
            .catch((err) => {
                reject(err);
            });
    });
});

const connect = attachAbortController<TWalletConnectReturn, TWalletConnectOptions>(_connect);

const walletAPI = { connect };

export default walletAPI;
