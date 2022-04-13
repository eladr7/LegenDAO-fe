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
