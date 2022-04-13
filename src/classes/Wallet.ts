import { ICurrency } from "./Currency";

export type TWallet = {
    address?: string;
    name?: string;
};

export interface IWallet {
    address?: string;
    name?: string;

    isConnected: () => boolean;
}

export default class Wallet implements IWallet {
    protected _address?: string;
    protected _name?: string;

    constructor(options: TWallet) {
        this._address = options.address;
    }

    isConnected(): boolean {
        return Boolean(this._address);
    }

    public get address(): string | undefined {
        return this._address;
    }

    public get name(): string | undefined {
        return this._name;
    }
}

export interface IChainInfo {
    readonly rpc: string;
    readonly rest: string;
    readonly chainId: string;
    readonly chainName: string;

    readonly stakeCurrency: ICurrency;
    readonly walletUrlForStaking?: string;
    readonly bip44: {
        coinType: number;
    };
    readonly alternativeBIP44s?: [];
    readonly bech32Config: IBech32Config;

    readonly currencies: ICurrency[];
    readonly feeCurrencies: ICurrency[];

    readonly gasPriceStep?: {
        low: number;
        average: number;
        high: number;
    };

    readonly coinType?: number;

    /**
     * Indicate the features supported by this chain. Ex) cosmwasm, secretwasm ...
     */
    readonly features?: string[];
}

export interface IBech32Config {
    readonly bech32PrefixAccAddr: string;
    readonly bech32PrefixAccPub: string;
    readonly bech32PrefixValAddr: string;
    readonly bech32PrefixValPub: string;
    readonly bech32PrefixConsAddr: string;
    readonly bech32PrefixConsPub: string;
}
