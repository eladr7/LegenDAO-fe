import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TAccessibilityState = {
    bSidebarOn: boolean;
    bBalanceMenuOn: boolean;
};

const initialState: TAccessibilityState = {
    bSidebarOn: false,
    bBalanceMenuOn: false,
};

const _toggleSidebar: CaseReducer<TAccessibilityState, PayloadAction<boolean | undefined>> = (
    state,
    action
) => {
    state.bSidebarOn = action.payload ?? !state.bSidebarOn;
};

const _toggleBalanceMenu: CaseReducer<TAccessibilityState, PayloadAction<boolean | undefined>> = (
    state,
    action
) => {
    state.bBalanceMenuOn = action.payload ?? !state.bBalanceMenuOn;
};

const accessibilitySlice = createSlice({
    name: "accessibility",
    initialState,
    reducers: {
        toggleSidebar: _toggleSidebar,
        toggleBalanceMenu: _toggleBalanceMenu,
    },
});

export const { toggleSidebar, toggleBalanceMenu } = accessibilitySlice.actions;

export default accessibilitySlice.reducer;
