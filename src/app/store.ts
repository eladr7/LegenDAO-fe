import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import accessibilityReducer from "../features/accessibility/accessibilitySlice";
import walletReducer, { walletAsyncActions } from "../features/wallet/walletSlice";
import collectionReducer from "../features/collection/collectionSlice";
import airdropReducer from "../features/airdrop/airdropSlice";
import mintReducer from "../features/mint/mintSlice";
import networkReducer from "../features/network/networkSlice";
import transactionReducer from "../features/transaction/transactionSlice";
import { netMiddleware } from "./middlewares/net";

const rootReducer = combineReducers({
    accessibility: accessibilityReducer,
    network: networkReducer,
    transaction: transactionReducer,
    wallet: walletReducer,
    airdrop: airdropReducer,
    collection: collectionReducer,
    mint: mintReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [walletAsyncActions.connect.fulfilled.type],
            },
        }).concat(netMiddleware),
    // .concat(timeoutSchedulerMiddleware)
    // .concat(thunk)
    // .concat(vanillaPromiseMiddleware)
    // .concat(loggerMiddleware),
});

export type TRootState = ReturnType<typeof rootReducer>;
export type TAppDispatch = typeof store.dispatch;
export default store;
