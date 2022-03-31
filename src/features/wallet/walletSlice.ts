import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TWallet } from "../../classes/Wallet";

export type TWalletState = {
    primary: TWallet;
};

const initialState: TWalletState = {
    primary: {},
};

const _setPrimaryAddress: CaseReducer<TWalletState, PayloadAction<string | undefined>> = (
    state,
    action
) => {
    state.primary.address = action.payload;
};

const walletSlice = createSlice({
    name: "wallet",
    initialState,
    reducers: {
        setPrimaryAddress: _setPrimaryAddress,
    },
});

export const { setPrimaryAddress } = walletSlice.actions;

export default walletSlice.reducer;
