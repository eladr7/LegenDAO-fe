import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tx } from "secretjs";
import { TRANSACTION_KEY } from "../../constants/constant";

export type TTransactionState = {
    bIsPending: boolean;
    txName?: string;
    txData?: Uint8Array[];
};

const initialState: TTransactionState = {
    bIsPending: false,
    txName: undefined,
    txData: undefined,
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
        sendAmount?: string;
        amountToMint?: number;
        forAddress?: string;
        mintingContractAddress?: string;
        tx?: Tx;
    }>
> = (state, action) => {
    state.bIsPending = false;
    state.txName = TRANSACTION_KEY.MINT_NFT;
    state.txData = action.payload.tx?.data;
};

const _depositToPlatform: CaseReducer<
    TTransactionState,
    PayloadAction<{ snipContractAddress?: string; amount: string; toAddress?: string; tx?: Tx }>
> = (state, action) => {
    state.bIsPending = false;
    state.txName = TRANSACTION_KEY.DEPOSIT;
    state.txData = action.payload.tx?.data;
};

const _addMinters: CaseReducer<
    TTransactionState,
    PayloadAction<{ minters: string; codeHash?: string }>
> = (state) => {
    state.bIsPending = false;
};

const _mintNfts: CaseReducer<TTransactionState, PayloadAction<{ amount: string }>> = (state) => {
    state.bIsPending = false;
};

const _mintNftsWithSnip: CaseReducer<
    TTransactionState,
    PayloadAction<{
        snipContract: string;
        priceForEach: string;
        amountToBuy: string;
        buyFor?: string;
    }>
> = (state) => {
    state.bIsPending = false;
};

const _mintAdminNfts: CaseReducer<TTransactionState, PayloadAction<{ amount: string }>> = (
    state
) => {
    state.bIsPending = false;
};

const _setTokenAttributes: CaseReducer<
    TTransactionState,
    PayloadAction<{ attributes: IAttributes; codeHash: string }>
> = (state) => {
    state.bIsPending = false;
};

const _changeWhitelistLevel: CaseReducer<
    TTransactionState,
    PayloadAction<{ newLevel: string; codeHash: string }>
> = (state) => {
    state.bIsPending = false;
};

const _addToWhitelist: CaseReducer<
    TTransactionState,
    PayloadAction<{ address: string; codeHash: string }>
> = (state) => {
    state.bIsPending = false;
};

const _viewTokens: CaseReducer<
    TTransactionState,
    PayloadAction<{ codeHash: string; address: string; key: string }>
> = (state) => {
    state.bIsPending = false;
};

const _isWhitelisted: CaseReducer<TTransactionState, PayloadAction<{ address: string }>> = (
    state
) => {
    state.bIsPending = false;
};

const _claimPlatform: CaseReducer<TTransactionState, PayloadAction<{ amountClaim?: string }>> = (state) => {
    state.bIsPending = false;
    state.txName = TRANSACTION_KEY.CLAIM_REDEEMED;
};

const _withdrawFromPlatform: CaseReducer<
    TTransactionState,
    PayloadAction<{ amount?: string; tx?: Tx }>
> = (state, action) => {
    state.bIsPending = false;
    state.txName = TRANSACTION_KEY.WITHDRAW;
    state.txData = action.payload.tx?.data;
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
        claimPlatform: _claimPlatform,
        withdrawFromPlatform: _withdrawFromPlatform,
    },
});

export const transactionActions = transactionSlice.actions;
export default transactionSlice.reducer;
