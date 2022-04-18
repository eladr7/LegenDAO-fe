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

export type TWalletState = {
    primary?: TWallet;
    balance: Coin;
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
    balance: {
        amount: "0",
        denom: DF_DENOM,
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
    PayloadAction<{ client?: SecretNetworkClient; denom?: TDenomination; balance?: Coin } | undefined>
> = (state, action) => {
    console.log(action.payload);
    if (!action.payload?.balance) return;
    state.balance = action.payload.balance;
};

const walletSlice = createSlice({
    name: "wallet",
    initialState,
    reducers: {
        getAllBalances: _getAllBalances,
        getBalance: _getBalance,
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
