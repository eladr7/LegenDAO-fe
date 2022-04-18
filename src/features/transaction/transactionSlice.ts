import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tx } from "secretjs";

export type TTransactionState = {
    bIsPending: boolean;
};

const initialState: TTransactionState = {
    bIsPending: false,
};

const _startTransaction: CaseReducer<TTransactionState> = (state) => {
    state.bIsPending = true;
};

const _sendTokenFromPlatformToContract: CaseReducer<
    TTransactionState,
    PayloadAction<{
        sendAmount?: number;
        mintAmount?: number;
        destinationContract: string;
        forAddres?: string;
        tx?: Tx;
    }>
> = (state, action) => {
    state.bIsPending = false;
    console.log(action.payload.tx);
};

const _depositToPlatform: CaseReducer<
    TTransactionState,
    PayloadAction<{ snipContractAddress?: string; amount: number; toAddress?: string }>
> = (state, action) => {
    state.bIsPending = false;
    console.log(action.payload);
};

const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {
        startTransaction: _startTransaction,
        depositToPlatform: _depositToPlatform,
        sendTokenFromPlatformToContract: _sendTokenFromPlatformToContract,
    },
});

export const transactionActions = transactionSlice.actions;
export default transactionSlice.reducer;
