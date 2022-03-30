import React, { useCallback, useEffect, useRef, useState } from "react";
import AppContext, { TAppContext } from "./contexts/AppContext";
import { Routes, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store";

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
                <header className="App-header">
                    <h1 className="text-xl">LEGEND-DAO</h1>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="about" element={<About />} />
                    </Routes>
                </header>
            </div>
        </AppContext.Provider>
    );
}

function Home(): React.ReactElement {
    return (
        <div>
            <h1>LEGEND-DAO#HOME</h1>
            <header>
                <nav>
                    <Link to="/about">About</Link>
                </nav>
            </header>
        </div>
    );
}

function About(): React.ReactElement {
    return (
        <div>LEGEND-DAO#ABOUT</div>
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
