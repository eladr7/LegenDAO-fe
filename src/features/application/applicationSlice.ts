import { CaseReducer, createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

type PopupList = Array<{
    key: string;
    show: boolean;
    content: TContentPopup;
    removeAfterMs: number | null;
}>;

export type TContentPopup = {
    txn: {
        success: boolean;
        summary?: string;
        errSummary?: string;
    };
};

export interface ApplicationState {
    readonly popupList: PopupList;
    readonly errorMsg?: string
}

const initialState: ApplicationState = {
    popupList: [],
    errorMsg: undefined,
};

import { createAction } from "@reduxjs/toolkit";

export const addPopup = createAction<{
    key?: string;
    removeAfterMs?: number | null;
    content: TContentPopup;
}>("application/addPopup");

export const removePopup = createAction<{ key: string }>("application/removePopup");

const _toastRequestRejected: CaseReducer<
    ApplicationState,
    PayloadAction<{ errorMsg: string }>
> = () => {
    // state.error = action.payload?.error;
};

const applicationSlice = createSlice({
    name: "application",
    initialState,
    reducers: {
        toastRequestRejected: _toastRequestRejected,
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                addPopup,
                (
                    state,
                    {
                        payload: {
                            content,
                            key,
                            removeAfterMs = Number(process.env.REACT_APP_COUNTDOWN_POPUP) || 5000,
                        },
                    }
                ) => {
                    state.popupList = (
                        key ? state.popupList.filter((popup) => popup.key !== key) : state.popupList
                    ).concat([
                        {
                            key: key || nanoid(),
                            show: true,
                            content,
                            removeAfterMs,
                        },
                    ]);
                }
            )
            .addCase(removePopup, (state, { payload: { key } }) => {
                state.popupList.forEach((p) => {
                    if (p.key === key) {
                        p.show = false;
                    }
                });
            });
    },
});

export default applicationSlice.reducer;
export const applicationActions = applicationSlice.actions;

