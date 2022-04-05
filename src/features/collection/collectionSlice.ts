import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TCollectionState = {
    whitelistSpot?: unknown;
    bEntered: boolean;
};

const initialState: TCollectionState = {
    whitelistSpot: undefined,
    bEntered: false,
};

const _toggleEnter: CaseReducer<TCollectionState, PayloadAction<boolean | undefined>> = (
    state,
    action
) => {
    state.bEntered = action.payload ?? !state.bEntered;
};

const _setWhitelistSpot: CaseReducer<TCollectionState, PayloadAction<unknown | undefined>> = (
    state,
    action
) => {
    state.whitelistSpot = action.payload;
};

const collectionSlice = createSlice({
    name: "collection",
    initialState,
    reducers: {
        toggleEnter: _toggleEnter,
        setWhitelistSpot: _setWhitelistSpot,
    },
});

export const { setWhitelistSpot, toggleEnter } = collectionSlice.actions;

export default collectionSlice.reducer;
