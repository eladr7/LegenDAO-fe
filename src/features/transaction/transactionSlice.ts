import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tx } from "secretjs";

export type TTransactionState = {
    bIsPending: boolean;
};

const initialState: TTransactionState = {
    bIsPending: false,
};

export interface IAttributes {
    readonly token_id: string;
    readonly attributes: {
        custom_traits: {
            trait_type: string;
            value: string;
        }[];
        rarity: number;
        token_uri: string;
    };
}
[];

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

const _addMinters: CaseReducer<
    TTransactionState,
    PayloadAction<{ minters: string; codeHash?: string }>
> = (state, action) => {
    state.bIsPending = false;
    console.log(action.payload);
};

const _mintNfts: CaseReducer<TTransactionState, PayloadAction<{ amount: string }>> = (
    state,
    action
) => {
    state.bIsPending = false;
    console.log(action.payload);
};

const _mintNftsWithSnip: CaseReducer<
    TTransactionState,
    PayloadAction<{
        snipContract: string;
        priceForEach: string;
        amountToBuy: string;
        buyFor?: string;
    }>
> = (state, action) => {
    state.bIsPending = false;
    console.log(action.payload);
};

const _mintAdminNfts: CaseReducer<TTransactionState, PayloadAction<{ amount: string }>> = (
    state,
    action
) => {
    state.bIsPending = false;
    console.log(action.payload);
};

const _setTokenAttributes: CaseReducer<
    TTransactionState,
    PayloadAction<{ attributes: IAttributes; codeHash: string }>
> = (state, action) => {
    state.bIsPending = false;
    console.log(action.payload);
};

const _changeWhitelistLevel: CaseReducer<
    TTransactionState,
    PayloadAction<{ newLevel: string; codeHash: string }>
> = (state, action) => {
    state.bIsPending = false;
    console.log(action.payload);
};

const _addToWhitelist: CaseReducer<
    TTransactionState,
    PayloadAction<{ address: string; codeHash: string }>
> = (state, action) => {
    state.bIsPending = false;
    console.log(action.payload);
};

const _viewTokens: CaseReducer<
    TTransactionState,
    PayloadAction<{ codeHash: string; address: string; key: string }>
> = (state, action) => {
    state.bIsPending = false;
    console.log(action.payload);
};

const _isWhitelisted: CaseReducer<TTransactionState, PayloadAction<{ address: string }>> = (
    state,
    action
) => {
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
        addMinters: _addMinters,
        mintNfts: _mintNfts,
        mintNftsWithSnip: _mintNftsWithSnip,
        mintAdminNfts: _mintAdminNfts,
        setTokenAttributes: _setTokenAttributes,
        changeWhitelistLevel: _changeWhitelistLevel,
        addToWhitelist: _addToWhitelist,
        viewTokens: _viewTokens,
        isWhitelisted: _isWhitelisted,
    },
});

export const transactionActions = transactionSlice.actions;
export default transactionSlice.reducer;
