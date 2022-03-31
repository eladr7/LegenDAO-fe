import React, { useCallback } from "react";
import cn from "classnames";
import { VoidLayout } from "../components/layouts/VoidLayout";
import imgYeti01 from "./../assets/images/yeti-01.png";
import imgYeti02 from "./../assets/images/yeti-02.png";
import imgYetiSleep01 from "./../assets/images/yeti-sleep-01.png";
import imgTank01 from "./../assets/images/tank-01.png";
import imgTank01Filter from "./../assets/images/tank-01-filter.png";
import imgTank01Line01 from "./../assets/images/tank-01-line-01.png";
import imgTank01Line02 from "./../assets/images/tank-01-line-02.png";
import imgTank01Line03 from "./../assets/images/tank-01-line-03.png";
import imgMountain01 from "./../assets/images/mountain-01.png";
import imgLab01 from "./../assets/images/lab-01.png";

import imgYetiHoodie01 from "./../assets/images/yeti-hoodie-01.png";
import imgYetiGirl01 from "./../assets/images/yeti-girl-01.png";
import imgArticleUniverse01Filter from "./../assets/images/article-universe-01-filter.png";
import imgArticleUniverse01Background from "./../assets/images/article-universe-01-background.png";
import imgTokens01 from "./../assets/images/tokens-01.png";
import imgRoadmap01 from "./../assets/images/roadmap-background-01.png";
import imgPlatform01 from "./../assets/images/platform-01.png";

import imgYetiNinja01 from "./../assets/images/yeti-ninja-01.png";
import imgArticlePlatform01Background from "./../assets/images/article-platform-01-background.png";
import imgMountain02 from "./../assets/images/mountain-02.png";

import imgYetiHead01 from "./../assets/images/yeti-head-01.png";

import imgTopSecretCol01 from "./../assets/images/top-secret-col-01.png";
import imgTopSecretColBg01 from "./../assets/images/top-secret-col-background-01.png";
import imgTopSecretColMintBg01 from "./../assets/images/top-secret-col-mint-background-01.png";

import imgBox01 from "./../assets/images/box-01.png";
import imgSword01 from "./../assets/images/sword-01.png";

export function Asset(): React.ReactElement {
    const renderWelcomeImages = useCallback(() => {
        return (
            <div className="mb-12 last:mb-0 flex flex-col flex-nowrap justify-start items-stretch">
                <div className="mb-4 last:mb-0">
                    <h1 className="text-white">Welcome Page</h1>
                </div>
                <div className="grid gap-4 grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))]">
                    <div
                        className={cn(
                            "h-[300px]",
                            "bg-no-repeat bg-center bg-contain",
                            "border border-white rounded-lg"
                        )}
                        style={{ backgroundImage: `url(${imgYeti01})` }}
                    ></div>
                    <div
                        className={cn(
                            "h-[300px]",
                            "bg-no-repeat bg-center bg-contain",
                            "border border-white rounded-lg"
                        )}
                        style={{ backgroundImage: `url(${imgYeti02})` }}
                    ></div>
                    <div
                        className={cn(
                            "h-[300px]",
                            "bg-no-repeat bg-center bg-contain",
                            "border border-white rounded-lg"
                        )}
                        style={{ backgroundImage: `url(${imgYetiSleep01})` }}
                    ></div>
                    <div
                        className={cn(
                            "h-[300px]",
                            "bg-no-repeat bg-center bg-contain",
                            "border border-white rounded-lg"
                        )}
                        style={{ backgroundImage: `url(${imgTank01})` }}
                    ></div>
                    <div
                        className={cn(
                            "h-[300px]",
                            "bg-no-repeat bg-center bg-contain",
                            "border border-white rounded-lg"
                        )}
                        style={{ backgroundImage: `url(${imgTank01Filter})` }}
                    ></div>
                    <div
                        className={cn(
                            "h-[300px]",
                            "bg-no-repeat bg-center bg-contain",
                            "border border-white rounded-lg"
                        )}
                        style={{ backgroundImage: `url(${imgTank01Line01})` }}
                    ></div>
                    <div
                        className={cn(
                            "h-[300px]",
                            "bg-no-repeat bg-center bg-contain",
                            "border border-white rounded-lg"
                        )}
                        style={{ backgroundImage: `url(${imgTank01Line02})` }}
                    ></div>
                    <div
                        className={cn(
                            "h-[300px]",
                            "bg-no-repeat bg-center bg-contain",
                            "border border-white rounded-lg"
                        )}
                        style={{ backgroundImage: `url(${imgTank01Line03})` }}
                    ></div>
                    <div
                        className={cn(
                            "h-[300px]",
                            "bg-no-repeat bg-center bg-contain",
                            "border border-white rounded-lg"
                        )}
                        style={{ backgroundImage: `url(${imgMountain01})` }}
                    ></div>
                    <div
                        className={cn(
                            "h-[300px]",
                            "bg-no-repeat bg-center bg-contain",
                            "border border-white rounded-lg"
                        )}
                        style={{ backgroundImage: `url(${imgLab01})` }}
                    ></div>
                </div>
            </div>
        );
    }, []);

    const renderDomainImages = useCallback(() => {
        return (
            <div className="mb-12 last:mb-0 flex flex-col flex-nowrap justify-start items-stretch">
                <div className="mb-4 last:mb-0">
                    <h1 className="text-white">Domain Pages</h1>
                </div>
                <div className="grid gap-4 grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))]">
                    <div
                        className={cn(
                            "h-[300px]",
                            "bg-no-repeat bg-center bg-contain",
                            "border border-white rounded-lg"
                        )}
                        style={{ backgroundImage: `url(${imgYetiHoodie01})` }}
                    ></div>
                    <div
                        className={cn(
                            "h-[300px]",
                            "bg-no-repeat bg-center bg-contain",
                            "border border-white rounded-lg"
                        )}
                        style={{ backgroundImage: `url(${imgYetiGirl01})` }}
                    ></div>
                    <div
                        className={cn(
                            "h-[300px]",
                            "bg-no-repeat bg-center bg-contain",
                            "border border-white rounded-lg"
                        )}
                        style={{ backgroundImage: `url(${imgArticleUniverse01Filter})` }}
                    ></div>
                    <div
                        className={cn(
                            "h-[300px]",
                            "bg-no-repeat bg-center bg-contain",
                            "border border-white rounded-lg"
                        )}
                        style={{ backgroundImage: `url(${imgArticleUniverse01Background})` }}
                    ></div>

                    <div
                        className={cn(
                            "h-[300px]",
                            "bg-no-repeat bg-center bg-contain",
                            "border border-white rounded-lg"
                        )}
                        style={{ backgroundImage: `url(${imgYetiNinja01})` }}
                    ></div>
                    <div
                        className={cn(
                            "h-[300px]",
                            "bg-no-repeat bg-center bg-contain",
                            "border border-white rounded-lg"
                        )}
                        style={{ backgroundImage: `url(${imgArticlePlatform01Background})` }}
                    ></div>

                    <div
                        className={cn(
                            "h-[300px]",
                            "bg-no-repeat bg-center bg-contain",
                            "border border-white rounded-lg"
                        )}
                        style={{ backgroundImage: `url(${imgPlatform01})` }}
                    ></div>
                    <div
                        className={cn(
                            "h-[300px]",
                            "bg-no-repeat bg-center bg-contain",
                            "border border-white rounded-lg"
                        )}
                        style={{ backgroundImage: `url(${imgMountain02})` }}
                    ></div>
                    <div
                        className={cn(
                            "h-[300px]",
                            "bg-no-repeat bg-center bg-contain",
                            "border border-white rounded-lg"
                        )}
                        style={{ backgroundImage: `url(${imgTokens01})` }}
                    ></div>

                    <div
                        className={cn(
                            "h-[300px]",
                            "bg-no-repeat bg-center bg-contain",
                            "border border-white rounded-lg"
                        )}
                        style={{ backgroundImage: `url(${imgRoadmap01})` }}
                    ></div>
                    <div
                        className={cn(
                            "h-[300px]",
                            "bg-no-repeat bg-center bg-contain",
                            "border border-white rounded-lg"
                        )}
                        style={{ backgroundImage: `url(${imgYetiHead01})` }}
                    ></div>

                    <div
                        className={cn(
                            "h-[300px]",
                            "bg-no-repeat bg-center bg-contain",
                            "border border-white rounded-lg"
                        )}
                        style={{ backgroundImage: `url(${imgTopSecretCol01})` }}
                    ></div>
                    <div
                        className={cn(
                            "h-[300px]",
                            "bg-no-repeat bg-center bg-contain",
                            "border border-white rounded-lg"
                        )}
                        style={{ backgroundImage: `url(${imgTopSecretColBg01})` }}
                    ></div>
                    <div
                        className={cn(
                            "h-[300px]",
                            "bg-no-repeat bg-center bg-contain",
                            "border border-white rounded-lg"
                        )}
                        style={{ backgroundImage: `url(${imgTopSecretColMintBg01})` }}
                    ></div>
                    <div
                        className={cn(
                            "h-[300px]",
                            "bg-no-repeat bg-center bg-contain",
                            "border border-white rounded-lg"
                        )}
                        style={{ backgroundImage: `url(${imgSword01})` }}
                    ></div>
                    <div
                        className={cn(
                            "h-[300px]",
                            "bg-no-repeat bg-center bg-contain",
                            "border border-white rounded-lg"
                        )}
                        style={{ backgroundImage: `url(${imgBox01})` }}
                    ></div>
                </div>
            </div>
        );
    }, []);

    return (
        <VoidLayout>
            {renderWelcomeImages()}
            {renderDomainImages()}
        </VoidLayout>
    );
}
