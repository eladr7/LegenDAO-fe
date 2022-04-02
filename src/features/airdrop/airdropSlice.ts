import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TAirDropStatus } from "../../classes/AirDrop";

export type TAirDropState = {
    status?: TAirDropStatus;
};

const initialState: TAirDropState = {
    status: undefined,
};

const _setStatus: CaseReducer<TAirDropState, PayloadAction<TAirDropStatus | undefined>> = (
    state,
    action
) => {
    state.status = action.payload;
};

const airdropSlice = createSlice({
    name: "airdrop",
    initialState,
    reducers: {
        setStatus: _setStatus,
    },
});

export const { setStatus } = airdropSlice.actions;

export default airdropSlice.reducer;
