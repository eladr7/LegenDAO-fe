import React, { useCallback, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { useActivePopups, useAppDispatch, useAppSelector } from "./app/hooks";
import store from "./app/store";
import ToastMessage from "./components/commons/ToastMessage";
import AppContext, { TAppContext } from "./contexts/AppContext";
import { collectionAtions } from "./features/collection/collectionSlice";
import { walletActions } from "./features/wallet/walletSlice";
import About from "./routes/About";
import AirDrop from "./routes/AirDrop";
import { Asset } from "./routes/Asset";
import Community from "./routes/Community";
import Docs from "./routes/Docs";
import Faq from "./routes/FAQ";
import FormCreation from "./routes/FormCreation";
import Governance from "./routes/Governance";
import Home from "./routes/Home";
import { MintLabLanding } from "./routes/MintLabLanding";
import MyCollections from "./routes/MyCollections";
import NotFound from "./routes/NotFound";
import OldCollections from "./routes/OldCollections";
import Profile from "./routes/Profile";
import Stake from "./routes/Stake";
import UI from "./routes/UI";

function App(): React.ReactElement {
    // App context (for stuffs that should not use redux by performance)
    const [bodyElement, setBodyElement] = useState<HTMLBodyElement>();
    const activePopups = useActivePopups();

    const dispatch = useAppDispatch();
    const walletState = useAppSelector((state) => state.wallet);
    const networkState = useAppSelector((state) => state.network);
    const transactionState = useAppSelector((state) => state.transaction);

    const appContextValue: TAppContext = {
        state: {
            bodyElement,
        },
        setBodyElement,
    };

    const getBodyElement = useCallback(() => document.querySelector("body"), []);

    useEffect(() => {
        setBodyElement(getBodyElement() || undefined);
    }, [getBodyElement]);

    useEffect(() => {
        if (networkState.bIsConnected && !walletState.signature) {
            dispatch(walletActions.getAllCodeHash());
            dispatch(walletActions.getSigner());
        }
    }, [dispatch, walletState.signature, networkState.bIsConnected]);

    useEffect(() => {
        if (walletState.signature) {
            dispatch(walletActions.getBalance());
        }
        dispatch(walletActions.getTokenData());
    }, [dispatch, transactionState.tx?.txHash, walletState.signature]);

    useEffect(() => {
        // TODO: for efficiency: separate this from collectionSlice because each time we'll
        // navigante between the user NFTs and the Collections page, the store will get run over
        dispatch(collectionAtions.getGeneralCollectionsData({}));
    }, [dispatch, networkState.bIsConnected, walletState.signature]);

    const getAnswer = async () => {
        dispatch(walletActions.getTokenData());
    };

    useEffect(() => {
        const timer = setInterval(getAnswer, 60000);
        return () => clearInterval(timer);
    }, []);

    const renderPopups = useCallback(() => {
        return activePopups.map((item, index) => {
            return (
                <ToastMessage
                    key={item.key}
                    removeAfterMs={item.removeAfterMs}
                    popKey={item.key}
                    content={item.content}
                    idPreItem={index ? activePopups[index - 1].key : undefined}
                />
            );
        });
    }, [activePopups]);

    return (
        <>
            <AppContext.Provider value={appContextValue}>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/docs" element={<Docs />} />
                        <Route path="/faq" element={<Faq />} />
                        <Route path="/governance" element={<Governance />} />
                        <Route path="/community" element={<Community />} />
                        <Route path="/ui" element={<UI />} />
                        <Route path="/asset" element={<Asset />} />
                        <Route path="/mint-lab" element={<MintLabLanding />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/profile/collected" element={<Profile />} />
                        <Route path="/airdrop" element={<AirDrop />} />
                        <Route path="/collections" element={<MyCollections />} />
                        <Route path="/collections/o" element={<OldCollections />} />
                        <Route path="/form-creation" element={<FormCreation />} />
                        <Route path="/stake" element={<Stake />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </AppContext.Provider>
            {renderPopups()}
        </>
    );
}

function Root() {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

export default Root;
