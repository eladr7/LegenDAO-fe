import { CaseReducer, createSlice } from "@reduxjs/toolkit";

export type TNetworkState = {
    bIsConnecting: boolean;
    bIsConnected: boolean;
};

const initialState: TNetworkState = {
    bIsConnecting: false,
    bIsConnected: false,
};

const _tryConnecting: CaseReducer<TNetworkState> = () => {
    return;
};

const _beginConnecting: CaseReducer<TNetworkState> = (state) => {
    state.bIsConnecting = true;
    state.bIsConnected = false;
};

const _disconnect: CaseReducer<TNetworkState> = (state) => {
    state.bIsConnecting = false;
    state.bIsConnected = false;
};

const _finishConnecting: CaseReducer<TNetworkState> = (state) => {
    state.bIsConnecting = false;
    state.bIsConnected = true;
};

const networkSlice = createSlice({
    name: "network",
    initialState,
    reducers: {
        tryConnecting: _tryConnecting,
        beginConnecting: _beginConnecting,
        finishConnecting: _finishConnecting,
        disconnect: _disconnect,
    },
});

export const networkActions = networkSlice.actions;

export default networkSlice.reducer;
