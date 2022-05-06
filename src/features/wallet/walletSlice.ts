/* eslint-disable no-console */
import { SecretNetworkClient, Coin, StdSignature } from "secretjs";
import { CaseReducer, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TActionStage } from "../../app/commons/api";
import { TWallet } from "../../classes/Wallet";
import walletAPI, {
    TWalletConnectOptions,
    TWalletConnectReturn,
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
    suggestStage?: TActionStage;
    connectStage?: TActionStage;
    signature?: StdSignature;
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
    signature: undefined,
};

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
    PayloadAction<
        | {
              tokens?: {
                  denom: TDenomination;
                  tokenAddress: string;
              }[];
              balance?: TBalance;
          }
        | undefined
    >
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
> = () => {
    return;
};

const _getSigner: CaseReducer<
    TWalletState,
    PayloadAction<{ signature?: StdSignature } | undefined>
> = (state, action) => {
    state.signature = action.payload?.signature;
    return;
};

const walletSlice = createSlice({
    name: "wallet",
    initialState,
    reducers: {
        getAllBalances: _getAllBalances,
        getBalance: _getBalance,
        getAllCodeHash: _getAllCodeHash,
        getSigner: _getSigner,
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
    },
});

export const walletActions = walletSlice.actions;
export const walletAsyncActions = {
    connect,
};

export default walletSlice.reducer;
