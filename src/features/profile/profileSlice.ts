import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";

const TABS = ["/profile/general", "/profile/collected", "/profile/created"] as const;

export type TProfileTab = typeof TABS[number];

export function isProfileTab(tab: string): tab is TProfileTab {
    return TABS.includes(tab as TProfileTab);
}

export type TProfileState = {
    tab: TProfileTab;
};

const initialState: TProfileState = {
    tab: "/profile/general",
};

const _setTab: CaseReducer<TProfileState, PayloadAction<TProfileTab>> = (state, action) => {
    state.tab = action.payload;
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setTab: _setTab,
    },
});

export const profileActions = profileSlice.actions;

export default profileSlice.reducer;
