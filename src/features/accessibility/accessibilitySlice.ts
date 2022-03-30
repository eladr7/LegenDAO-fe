import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TAccessibilityState = {
    bSidebarOn: boolean;
};

const initialState: TAccessibilityState = {
    bSidebarOn: false,
};

const _toggleSidebar: CaseReducer<TAccessibilityState, PayloadAction<boolean | undefined>> = (
    state,
    action
) => {
    state.bSidebarOn = action.payload ?? !state.bSidebarOn;
};

const accessibilitySlice = createSlice({
    name: "accessibility",
    initialState,
    reducers: {
        toggleSidebar: _toggleSidebar,
    },
});

export const { toggleSidebar } = accessibilitySlice.actions;

export default accessibilitySlice.reducer;
