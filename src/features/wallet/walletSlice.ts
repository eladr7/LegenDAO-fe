import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TActionStage } from "../../app/commons/api";
import { TWallet } from "../../classes/Wallet";
import walletAPI, { TWalletConnectOptions, TWalletConnectReturn } from "./walletApi";

export type TWalletState = {
    primary?: TWallet;
    connectStage?: TActionStage;
};

const initialState: TWalletState = {
    primary: undefined,
};

const connect = createAsyncThunk("wallet/connect", async (options: TWalletConnectOptions) => {
    const res: TWalletConnectReturn = await walletAPI.connect(options);
    return res;
});

const walletSlice = createSlice({
    name: "wallet",
    initialState,
    reducers: {},
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
