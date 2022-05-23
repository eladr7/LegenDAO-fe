import { StdSignature } from "secretjs";

export type TRewards = {
    rewards: {
        rewards: string;
    };
};

export type TTotalLocked = {
    total_locked: {
        amount: string;
    };
};

export type TBalanceSnip20 = {
    balance: {
        amount: string;
        denom: string;
        tokenAddress: string;
    };
};

export type TCodeHash = {
    [key: string]: {
        codeHash?: string;
        address?: string;
    };
};

export interface ISigner {
    msg?: {
        permit_name: string;
        allowed_tokens?: string[];
        permissions: string[];
    };
    signature?: StdSignature;
    account?: string;
}

export type TTransactionHistory = {
    transaction_history: {
        total: number;
        txs: [
            {
                action: any;
                block_height: number;
                block_time: number;
                memo: any;
                token_id: string;
                tx_id: number;
            }
        ];
    };
};
