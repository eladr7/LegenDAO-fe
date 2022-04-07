import React, { useCallback, useEffect, useRef, useState } from "react";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import store from "./app/store";
import AppContext, { TAppContext } from "./contexts/AppContext";
import AirDrop from "./routes/AirDrop";
import { Asset } from "./routes/Asset";
import FormCreation from "./routes/FormCreation";
import Home from "./routes/Home";
import { MintLabLanding } from "./routes/MintLabLanding";
import MyCollections from "./routes/MyCollections";
import NotFound from "./routes/NotFound";
import Profile from "./routes/Profile";
import Stake from "./routes/Stake";
import UI from "./routes/UI";

function App(): React.ReactElement {
    const rfIsUnmounted = useRef(false);

    // App context (for stuffs that should not use redux by performance)
    const [bodyElement, setBodyElement] = useState<HTMLBodyElement>();

    const appContextValue: TAppContext = {
        state: {
            bodyElement,
        },
        setBodyElement,
    };

    const getBodyElement = useCallback(() => document.querySelector("body"), []);

    useEffect(() => {
        return () => {
            rfIsUnmounted.current = true;
        };
    }, []);

    useEffect(() => {
        setBodyElement(getBodyElement() || undefined);
    }, [getBodyElement]);

    return (
        <AppContext.Provider value={appContextValue}>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    {/* <Route path="/about" element={<About />} />
                    <Route path="/docs" element={<Docs />} />
                    <Route path="/faq" element={<Faq />} />
                    <Route path="/governance" element={<Governance />} />
                    <Route path="/community" element={<Community />} /> */}
                    <Route path="/ui" element={<UI />} />
                    <Route path="/asset" element={<Asset />} />
                    <Route path="/mint-lab" element={<MintLabLanding />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/profile/collected" element={<Profile />} />
                    <Route path="/airdrop" element={<AirDrop />} />
                    <Route path="/collections" element={<MyCollections />} />
                    <Route path="/form-creation" element={<FormCreation />} />
                    <Route path="/stake" element={<Stake />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </AppContext.Provider>
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
