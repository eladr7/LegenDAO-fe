import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import networkReducer from "../features/network/networkSlice";
import walletReducer, { walletAsyncActions } from "../features/wallet/walletSlice";
import transactionReducer from "../features/transaction/transactionSlice";
import mintReducer from "../features/mint/mintSlice";
import collectionReducer from "../features/collection/collectionSlice";
import airdropReducer from "../features/airdrop/airdropSlice";
import profileReducer from "../features/profile/profileSlice";
import accessibilityReducer from "../features/accessibility/accessibilitySlice";
import applicationReducer from "../features/application/applicationSlice";
import { netMiddleware } from "./middlewares/net";

const rootReducer = combineReducers({
    network: networkReducer,
    wallet: walletReducer,
    transaction: transactionReducer,
    mint: mintReducer,
    collection: collectionReducer,
    airdrop: airdropReducer,
    profile: profileReducer,
    accessibility: accessibilityReducer,
    application: applicationReducer,
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
