import cn from "classnames";
import React from "react";
import { useAppSelector } from "../app/hooks";
import AirDropStatusPanel from "../components/AirDropStatusPanel";
import Article from "../components/commons/Article";
import { DefaultLayout } from "../components/layouts/DefaultLayout";
import imgArticleUniverse01Background from "./../assets/images/article-universe-01-background.png";

export default function AirDrop(): React.ReactElement {
    const depositPanel = useAppSelector((state) => state.accessibility.bDepositPanelOn);
    const withdrawPanel = useAppSelector((state) => state.accessibility.bWithdrawPanelOn);
    return (
        <DefaultLayout headerType="general" bHeaderAlwaysOnTop sidebarTab="tab/airdrop">
            <Article bFullScreen>
                <div
                    className={cn(
                        "absolute top-0 bottom-0 right-0 left-0",
                        "bg-no-repeat bg-cover bg-bottom"
                    )}
                    style={{ backgroundImage: `url(${imgArticleUniverse01Background})` }}
                ></div>
                <div className="absolute top-0 left-0 bottom-0 right-0 bg-slate-900/75"></div>
                <div
                    className={cn(
                        "font-body w-full h-full m-auto top-0 left-0 flex flex-row items-center justify-center select-none",
                        "min-h-[700px] py-20",
                    )}
                >
                    <div
                        className={cn(
                            "absolute top-0 left-0 w-full h-[200vh]",
                            "select-none cursor-pointer",
                            "bg-slate-900/95 tablet-2:bg-slate-900/50"
                        )}
                    ></div>
                    <div
                        className={cn(
                            "px-4 tablet-2:px-0 w-full max-w-[600px]",
                        )}
                    >
                        {!depositPanel && !withdrawPanel && <AirDropStatusPanel />}
                    </div>
                </div>
            </Article>
        </DefaultLayout>
    );
}
