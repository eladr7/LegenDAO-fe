export type TWallet = {
    address?: string;
}

export interface IWallet {
    address?: string;

    isConnected: () => boolean;
}

export default class Wallet implements IWallet {
    protected _address?: string;

    constructor(options: TWallet) {
        this._address = options.address;
    }

    isConnected(): boolean {
        return Boolean(this._address);
    }

    public get address(): string | undefined {
        return this._address;
    }
}
