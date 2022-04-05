import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TMintAgent } from "../../classes/MintAgent";

export type TMintState = {
    bAgreeTermOfService: boolean;
    successMessage?: string;
    errorMessage?: string;
    failedMessage?: string;
    agent?: TMintAgent;
};

const initialState: TMintState = {
    bAgreeTermOfService: false,
};

const _setAgent: CaseReducer<TMintState, PayloadAction<TMintAgent | undefined>> = (state, action) => {
    state.agent = action.payload;
};

const _toggleAgreeTermOfService: CaseReducer<TMintState, PayloadAction<boolean | undefined>> = (
    state,
    action
) => {
    state.bAgreeTermOfService = action.payload ?? !state.bAgreeTermOfService;
};

const _setSuccessMessage: CaseReducer<TMintState, PayloadAction<string | undefined>> = (
    state,
    action
) => {
    state.successMessage = action.payload;
};

const mintSlice = createSlice({
    name: "mint",
    initialState,
    reducers: {
        setAgent: _setAgent,
        toggleAgreeTermOfService: _toggleAgreeTermOfService,
        setSuccessMessage: _setSuccessMessage,
    },
});

export const { setAgent, toggleAgreeTermOfService, setSuccessMessage } = mintSlice.actions;

export default mintSlice.reducer;
