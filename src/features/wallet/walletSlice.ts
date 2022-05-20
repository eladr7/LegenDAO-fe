/* eslint-disable no-console */
import { SecretNetworkClient, Coin, StdSignature } from "secretjs";
import { CaseReducer, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TActionStage } from "../../app/commons/api";
import { TWallet } from "../../classes/Wallet";
import walletAPI, { TWalletConnectOptions, TWalletConnectReturn } from "./walletApi";
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

interface ITokenData {
    price: number;
    apy: number;
    liquidity: number;
    dailyVolume: number;
}

type TBalance = {
    denom: string;
    amount: string;
    tokenAddress: string;
};

export interface IDataStaking {
    apr: string;
    value: string;
    tvl: string;
    totalStakedBalance: string;
    priceStaked: string;
    rewards: Coin;
    priceReward: string;
}

export type TWalletState = {
    primary?: TWallet;
    balances: IBalance;
    suggestStage?: TActionStage;
    connectStage?: TActionStage;
    signature?: StdSignature;
    tokenData?: ITokenData;
    dataStaking?: IDataStaking;
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
    signature: undefined,
    tokenData: {
        apy: 0,
        price: 0,
        liquidity: 0,
        dailyVolume: 0,
    },
    dataStaking: {
        apr: "0",
        value: "0",
        tvl: "0",
        totalStakedBalance: "0",
        priceStaked: "0",
        rewards: {
            amount: "0",
            denom: DF_DENOM,
        },
        priceReward: "0",
    },
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

const _getTokenData: CaseReducer<
    TWalletState,
    PayloadAction<{ tokenData: ITokenData } | undefined>
> = (state, action) => {
    state.tokenData = action.payload?.tokenData;
    return;
};

const _getRewardsStaking: CaseReducer<
    TWalletState,
    PayloadAction<{ dataStaking?: IDataStaking } | undefined>
> = (state, action) => {
    state.dataStaking = action.payload?.dataStaking;
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
        getTokenData: _getTokenData,
        getRewardsStaking: _getRewardsStaking,
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
