import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Window as KeplrWindow } from "@keplr-wallet/types";

/**
 * To future if Legend-DAO need a routing:
 * Serving Apps with Client-Side Routing
 * https://create-react-app.dev/docs/deployment/#serving-apps-with-client-side-routing
 */

declare global {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Window extends KeplrWindow {}
}

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
