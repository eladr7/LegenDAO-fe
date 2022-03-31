import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import accessibilityReducer from "../features/accessibility/accessibilitySlice";
import walletReducer from "../features/wallet/walletSlice";

const rootReducer = combineReducers({
    accessibility: accessibilityReducer,
    wallet: walletReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    // .concat(timeoutSchedulerMiddleware)
    // .concat(thunk)
    // .concat(vanillaPromiseMiddleware)
    // .concat(loggerMiddleware),
});

export type TRootState = ReturnType<typeof rootReducer>;
export type TAppDispatch = typeof store.dispatch;
export default store;
