import { CaseReducer, createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { TActionStage } from "../../app/commons/api";

type MyData = string;
export type TListCollection = {
    [key: string]: Array<any>
}

export type TCollectionState = {
    searchStage: TActionStage | undefined;
    searchResult: Array<unknown> | undefined;
    searchString: string;
    whitelistSpot?: unknown;
    bEntered: boolean;
    selectedCollectionIndex: number;
    listMyCollection: TListCollection;
};

const initialState: TCollectionState = {
    searchStage: undefined,
    searchResult: undefined,
    searchString: "",
    whitelistSpot: undefined,
    bEntered: false,
    selectedCollectionIndex: 0,
    listMyCollection: {},
};

const _toggleEnter: CaseReducer<TCollectionState, PayloadAction<{
    entered: boolean | undefined;
    collectionIndex: number;
}>> = (
    state,
    action
) => {
    state.bEntered = action.payload.entered ?? !state.bEntered;
    state.selectedCollectionIndex = action.payload.collectionIndex;
};

const searchOld = createAsyncThunk<MyData, string>("collection/searchOld", async (input) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(`Fetch ${input} Done`), 2000);
    });
});
// const _searchOld: CaseReducer<TCollectionState, PayloadAction<string>> = (
//     state,
//     action
// ) => {

//     // Send request (use Api)
//     state.searchStage = "pending";
//     console.log("a");

//     // Wait for response
//     setTimeout(() => {
//         // Update state
//         state.searchStage = "fulfilled";
//         state.searchResult = [];
//     }, 2000);

// };

const _setSearchString: CaseReducer<TCollectionState, PayloadAction<string>> = (state, action) => {
    state.searchString = action.payload;
    if (state.searchString.trim() == "") state.searchStage = undefined;
    // state.searchResult = [];
};

const _setWhitelistSpot: CaseReducer<TCollectionState, PayloadAction<unknown | undefined>> = (
    state,
    action
) => {
    state.whitelistSpot = action.payload;
};

const _getCollection: CaseReducer<
    TCollectionState,
    PayloadAction<{ 
        listMyCollection?: any;
        nftContract: string;
    }>
> = (state, action) => {
    const nftContractAddress = action.payload?.nftContract;
        const collectionItems = action.payload?.listMyCollection;
        state.listMyCollection[nftContractAddress as string] = [
            ...collectionItems
        ]
};

const collectionSlice = createSlice({
    name: "collection",
    initialState,
    reducers: {
        // searchOld: _searchOld,
        setSearchString: _setSearchString,
        toggleEnter: _toggleEnter,
        setWhitelistSpot: _setWhitelistSpot,
        getCollection: _getCollection,
    },
    extraReducers: (builder) => {
        builder.addCase(searchOld.pending, (state) => {
            state.searchStage = "pending";
        });
        builder.addCase(searchOld.fulfilled, (state) => {
            state.searchStage = "fulfilled";
            state.searchResult = [];
        });
    },
});

export const { setWhitelistSpot, toggleEnter } = collectionSlice.actions;

export const collectionAsyncActions = { searchOld };
export const collectionAtions = collectionSlice.actions;

export default collectionSlice.reducer;
