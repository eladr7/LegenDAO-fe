import React, { useContext } from "react";
import cn from "classnames";
import Article from "../components/commons/Article";
import { DefaultLayout } from "../components/layouts/DefaultLayout";

import imgArticleUniverse01Background from "./../assets/images/article-universe-01-background.png";
import Modal from "../components/commons/Modal";
import AirDropStatusPanel from "../components/AirDropStatusPanel";
import AppContext from "../contexts/AppContext";

export default function AirDrop(): React.ReactElement {
    const { state } = useContext(AppContext);

    return (
        <DefaultLayout headerType="general" bFooterOn sidebarTab="tab/airdrop">
            <Article bFullScreen>
                <div
                    className={cn(
                        "absolute top-0 bottom-0 right-0 left-0",
                        "bg-no-repeat bg-cover bg-bottom"
                    )}
                    style={{ backgroundImage: `url(${imgArticleUniverse01Background})` }}
                ></div>
                <div className="absolute top-0 left-0 bottom-0 right-0 bg-slate-900/75"></div>
                {state.bodyElement && (
                    <Modal bodyElement={state.bodyElement}>
                        <AirDropStatusPanel />
                    </Modal>
                )}
            </Article>
        </DefaultLayout>
    );
}