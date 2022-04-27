import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TCollectionState = {
    whitelistSpot?: unknown;
    bEntered: boolean;
    listMyCollection: Array<any>;
};

const initialState: TCollectionState = {
    whitelistSpot: undefined,
    bEntered: false,
    listMyCollection: [],
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

const _getCollection: CaseReducer<TCollectionState, PayloadAction<{ listMyCollection?: any } | undefined>> = (
    state,
    action
) => {
    state.listMyCollection = action.payload?.listMyCollection;
};

const collectionSlice = createSlice({
    name: "collection",
    initialState,
    reducers: {
        toggleEnter: _toggleEnter,
        setWhitelistSpot: _setWhitelistSpot,
        getCollection: _getCollection,
    },
});

export const { setWhitelistSpot, toggleEnter } = collectionSlice.actions;

export const collectionAtions = collectionSlice.actions;

export default collectionSlice.reducer;
