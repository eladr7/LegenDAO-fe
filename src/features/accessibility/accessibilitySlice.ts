import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TAccessibilityState = {
    bSidebarOn: boolean;
    bBalanceMenuOn: boolean;
    bWithdrawPanelOn: boolean;
    bDepositPanelOn: boolean;
    bCreationFormPanelOn: boolean;
    bMintConfirmPurchasePanelOn: boolean;
    bMintSuccessfulPanelOn: boolean;
};

const initialState: TAccessibilityState = {
    bSidebarOn: false,
    bBalanceMenuOn: false,
    bWithdrawPanelOn: false,
    bDepositPanelOn: false,
    bCreationFormPanelOn: false,
    bMintConfirmPurchasePanelOn: false,
    bMintSuccessfulPanelOn: false,
};

const _turnOffAllPanel: CaseReducer<TAccessibilityState> = (state) => {
    state.bBalanceMenuOn = false;
    state.bWithdrawPanelOn = false;
    state.bDepositPanelOn = false;
    state.bCreationFormPanelOn = false;
    state.bMintConfirmPurchasePanelOn = false;
    state.bMintSuccessfulPanelOn = false;
};

const _toggleSidebar: CaseReducer<TAccessibilityState, PayloadAction<boolean | undefined>> = (
    state,
    action
) => {
    state.bSidebarOn = action.payload ?? !state.bSidebarOn;
};

const _toggleCreationFormPanel: CaseReducer<TAccessibilityState, PayloadAction<boolean | undefined>> = (
    state,
    action
) => {
    state.bCreationFormPanelOn = action.payload ?? !state.bCreationFormPanelOn;
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

const _toggleMintConfirmPurchasePanel: CaseReducer<TAccessibilityState, PayloadAction<boolean | undefined>> = (
    state,
    action
) => {
    state.bMintConfirmPurchasePanelOn = action.payload ?? !state.bMintConfirmPurchasePanelOn;
};

const _toggleMintSuccessfulPanelOn: CaseReducer<TAccessibilityState, PayloadAction<boolean | undefined>> = (
    state,
    action
) => {
    state.bMintSuccessfulPanelOn = action.payload ?? !state.bMintSuccessfulPanelOn;
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
        toggleCreationFormPanel: _toggleCreationFormPanel,
        toggleMintConfirmPurchasePanel: _toggleMintConfirmPurchasePanel,
        toggleMintSuccessfulPanelOn: _toggleMintSuccessfulPanelOn,
    },
});

export const {
    toggleMintConfirmPurchasePanel,
    toggleMintSuccessfulPanelOn,
    turnOffAllPanel,
    toggleSidebar,
    toggleBalanceMenu,
    toggleDepositPanel,
    toggleWithdrawPanel,
    toggleCreationFormPanel,
} = accessibilitySlice.actions;

export const accessibilityActions = accessibilitySlice.actions;

export default accessibilitySlice.reducer;
