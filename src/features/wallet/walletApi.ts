import { AppCurrency, ChainInfo, Key } from "@keplr-wallet/types";
import { attachAbortController, sendCreator, TSend } from "../../app/commons/api";
import { TNetError } from "../../app/commons/types";
import { COIN_TYPES } from "../../classes/Currency";
import { DF_CHAIN, NET_COINGECKO_ID, NET_DENOM, NET_DENOM_MINIMAL } from "../../constants/defaults";

const DF_CURRENCY_DOMAIN: AppCurrency = {
    coinDenom: NET_DENOM,
    coinMinimalDenom: NET_DENOM_MINIMAL,
    coinDecimals: 6,
    coinGeckoId: NET_COINGECKO_ID,
};
const DF_CURRENCIES: AppCurrency[] = [DF_CURRENCY_DOMAIN];

export type TWalletSuggestChainOptions = {
    delay?: number;
};
export type TWalletSuggestChainReturn = void;

export type TWalletConnectOptions = {
    chainId?: string;
    delay?: number;
};
export type TWalletConnectReturn = Key;

const _suggestChain: TSend<TWalletSuggestChainReturn, TWalletSuggestChainOptions> = sendCreator<
    TWalletSuggestChainReturn,
    TWalletSuggestChainOptions
>(() => {
    return new Promise<void>((resolve, reject: (reson: TNetError) => void) => {
        if (!process.env.REACT_APP_NET_CHAIN_ID) {
            reject("invalid/chain/id");
            return;
        }

        if (!window.keplr) {
            reject("invalid/keplr");
            return;
        }

        if (!process.env.REACT_APP_NET_URL_RPC || !process.env.REACT_APP_NET_URL_REST) {
            reject("invalid/net/urls");
            return;
        }

        const chainId = process.env.REACT_APP_NET_CHAIN_ID;

        const chainInfo: ChainInfo = {
            chainId,
            chainName: process.env.REACT_APP_NET_CHAIN_NAME || "",
            rpc: process.env.REACT_APP_NET_URL_RPC || "",
            rest: process.env.REACT_APP_NET_URL_REST || "",
            bip44: { coinType: COIN_TYPES.scrt },
            bech32Config: {
                bech32PrefixAccAddr: DF_CHAIN,
                bech32PrefixAccPub: DF_CHAIN + "pub",
                bech32PrefixValAddr: DF_CHAIN + "valoper",
                bech32PrefixValPub: DF_CHAIN + "valoperpub",
                bech32PrefixConsAddr: DF_CHAIN + "valcons",
                bech32PrefixConsPub: DF_CHAIN + "valconspub",
            },
            currencies: DF_CURRENCIES,
            feeCurrencies: DF_CURRENCIES,
            stakeCurrency: DF_CURRENCY_DOMAIN,
            gasPriceStep: {
                low: 0.1,
                average: 0.25,
                high: 0.3,
            },
        };

        resolve(window.keplr.experimentalSuggestChain(chainInfo));
    });
});

const _connect: TSend<TWalletConnectReturn, TWalletConnectOptions> = sendCreator<
    TWalletConnectReturn,
    TWalletConnectOptions
>((options) => {
    return new Promise((resolve, reject: (reason?: TNetError) => void) => {
        const chainId = options.chainId || process.env.REACT_APP_NET_CHAIN_ID;

        if (!window.keplr) {
            reject("invalid/keplr");
            return;
        }

        if (!chainId) {
            reject("invalid/chain/id");
            return;
        }

        window.keplr
            .enable(chainId)
            .then(() => {
                if (!window.keplr) {
                    reject("invalid/keplr");
                    return;
                }
                return window.keplr.getKey(chainId);
            })
            .then((key) => {
                if (!key) {
                    reject("failed/keplr/get/key");
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
const suggestChain = attachAbortController<TWalletSuggestChainReturn, TWalletSuggestChainOptions>(
    _suggestChain
);

const walletAPI = { connect, suggestChain };

export default walletAPI;
