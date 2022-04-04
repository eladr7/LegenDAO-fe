import React from "react";
import cn from "classnames";
import Article from "../components/commons/Article";
import { DefaultLayout } from "../components/layouts/DefaultLayout";

import imgArticleUniverse01Background from "./../assets/images/article-universe-01-background.png";

export default function MyCollections(): React.ReactElement {
    return (
        <DefaultLayout headerType="general" bFooterOn sidebarTab="tab/collections">
            <Article bFullScreen>
                <div
                    className={cn(
                        "absolute top-0 bottom-0 right-0 left-0",
                        "bg-no-repeat bg-cover bg-bottom"
                    )}
                    style={{ backgroundImage: `url(${imgArticleUniverse01Background})` }}
                ></div>
                <div className="absolute top-0 left-0 bottom-0 right-0 bg-slate-900/75"></div>
            </Article>
        </DefaultLayout>
    );
}