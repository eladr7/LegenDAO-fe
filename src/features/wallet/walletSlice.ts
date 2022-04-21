/* eslint-disable no-console */
import { SecretNetworkClient, Coin } from "secretjs";
import { CaseReducer, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TActionStage } from "../../app/commons/api";
import { TWallet } from "../../classes/Wallet";
import walletAPI, {
    TWalletConnectOptions,
    TWalletConnectReturn,
    TWalletSuggestChainOptions,
    TWalletSuggestChainReturn,
} from "./walletApi";
import { DF_DENOM } from "../../constants/defaults";
import { TDenomination } from "../../classes/Currency";
import { LGND_ADDRESS } from "../../constants/contractAddress";

interface IBalance {
    [key: string]: {
        denom: string;
        amount: string;
        tokenAddress?: string;
        staked?: string;
        pending_redeem?: {
            claimable?: string;
            unbondings?: [];
        };
    };
}

type TBalance = {
    denom: string;
    amount: string;
    tokenAddress?: string;
};

export type TWalletState = {
    primary?: TWallet;
    balances: IBalance;
    fiatBalance: {
        amount: number;
    };
    undelegate: Coin;
    fiatUndelegate: {
        amount: number;
    };
    unclaim: Coin;
    fiatUnclaim: {
        amount: number;
    };
    bSuggested: boolean;
    suggestStage?: TActionStage;
    connectStage?: TActionStage;
};

const initialState: TWalletState = {
    primary: undefined,
    balances: {
        [LGND_ADDRESS as string]: {
            amount: "0",
            denom: DF_DENOM,
            tokenAddress: "",
        },
    },
    fiatBalance: { amount: 0 },
    undelegate: {
        amount: "0",
        denom: DF_DENOM,
    },
    fiatUndelegate: { amount: 0 },
    unclaim: {
        amount: "0",
        denom: DF_DENOM,
    },
    fiatUnclaim: { amount: 0 },
    bSuggested: false,
};

const suggestChain = createAsyncThunk(
    "wallet/suggestChain",
    async (options: TWalletSuggestChainOptions) => {
        const res: TWalletSuggestChainReturn = await walletAPI.suggestChain(options);
        return res;
    }
);

const connect = createAsyncThunk("wallet/connect", async (options: TWalletConnectOptions) => {
    const res: TWalletConnectReturn = await walletAPI.connect(options);
    return res;
});

const _getAllBalances: CaseReducer<
    TWalletState,
    PayloadAction<{ client?: SecretNetworkClient; balances?: Coin[] } | undefined>
> = (state, action) => {
    console.log(action.payload);
};

const _getBalance: CaseReducer<
    TWalletState,
    PayloadAction<{ denom: TDenomination; balance?: TBalance; tokenAddress: string } | undefined>
> = (state, action) => {
    if (!action.payload?.balance) return;
    const key = action.payload.balance?.tokenAddress;
    state.balances[key as string] = {
        ...action.payload.balance,
    };
};

const _getAllCodeHash: CaseReducer<
    TWalletState,
    PayloadAction<{ contractAddress?: string[] } | undefined>
> = (state, action) => {
    console.log({state, action});
    return;
};

const walletSlice = createSlice({
    name: "wallet",
    initialState,
    reducers: {
        getAllBalances: _getAllBalances,
        getBalance: _getBalance,
        getAllCodeHash: _getAllCodeHash,
    },
    extraReducers: (builder) => {
        builder.addCase(connect.pending, (state) => {
            state.connectStage = "pending";
        });
        builder.addCase(connect.fulfilled, (state, action) => {
            state.connectStage = "fulfilled";
            state.primary = {
                address: action.payload.bech32Address,
                name: action.payload.name,
            };
        });
        builder.addCase(connect.rejected, (state, action) => {
            console.warn(action.error);
            state.connectStage = "rejected";
        });

        builder.addCase(suggestChain.pending, (state) => {
            state.suggestStage = "pending";
            state.bSuggested = false;
        });
        builder.addCase(suggestChain.fulfilled, (state) => {
            state.suggestStage = "fulfilled";
            state.bSuggested = true;
        });
        builder.addCase(suggestChain.rejected, (state, action) => {
            console.warn(action.error);
            state.suggestStage = "rejected";
            state.bSuggested = false;
        });
    },
});

export const walletActions = walletSlice.actions;
export const walletAsyncActions = {
    suggestChain,
    connect,
};

export default walletSlice.reducer;
