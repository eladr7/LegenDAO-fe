import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TAccessibilityState = {
    bSidebarOn: boolean;
    bBalanceMenuOn: boolean;
    bWithdrawPanelOn: boolean;
    bDepositPanelOn: boolean;
};

const initialState: TAccessibilityState = {
    bSidebarOn: false,
    bBalanceMenuOn: false,
    bWithdrawPanelOn: false,
    bDepositPanelOn: false,
};

const _turnOffAllPanel: CaseReducer<TAccessibilityState> = (state) => {
    state.bBalanceMenuOn = false;
    state.bWithdrawPanelOn = false;
    state.bDepositPanelOn = false;
};

const _toggleSidebar: CaseReducer<TAccessibilityState, PayloadAction<boolean | undefined>> = (
    state,
    action
) => {
    state.bSidebarOn = action.payload ?? !state.bSidebarOn;
};

const _toggleWithdrawPanel: CaseReducer<TAccessibilityState, PayloadAction<boolean | undefined>> = (
    state,
    action
) => {
    state.bWithdrawPanelOn = action.payload ?? !state.bWithdrawPanelOn;
};

const _toggleDepositPanel: CaseReducer<TAccessibilityState, PayloadAction<boolean | undefined>> = (
    state,
    action
) => {
    state.bDepositPanelOn = action.payload ?? !state.bDepositPanelOn;
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
        turnOffAllPanel: _turnOffAllPanel,
        toggleSidebar: _toggleSidebar,
        toggleBalanceMenu: _toggleBalanceMenu,
        toggleWithdrawPanel: _toggleWithdrawPanel,
        toggleDepositPanel: _toggleDepositPanel,
    },
});

export const {
    turnOffAllPanel,
    toggleSidebar,
    toggleBalanceMenu,
    toggleDepositPanel,
    toggleWithdrawPanel,
} = accessibilitySlice.actions;

export default accessibilitySlice.reducer;
