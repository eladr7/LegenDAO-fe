import React, { useCallback, useEffect, useRef, useState } from "react";
import AppContext, { TAppContext } from "./contexts/AppContext";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store";
import Home from "./routes/Home";
import About from "./routes/About";
import UI from "./routes/UI";
import { Asset } from "./routes/Asset";

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
                    <Route path="about" element={<About />} />
                    <Route path="ui" element={<UI />} />
                    <Route path="asset" element={<Asset />} />
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
