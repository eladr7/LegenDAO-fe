import React, { useCallback, useState } from "react";
import cn from "classnames";
import Article from "../components/commons/Article";
import { DefaultLayout } from "../components/layouts/DefaultLayout";

import Input from "../components/commons/Input";

import ProfileItemsPanel from "../components/ProfileItemsPanel";
import imgArticleUniverse01Background from "./../assets/images/article-universe-01-background.png";
import imgYetiHoodie01 from "./../assets/images/yeti-hoodie-01.png";
import imgBox01 from "./../assets/images/box-01.png";
import ProfileCollectedPanel from "../components/ProfileCollectedPanel";
import ProfileMyCollectionPanel from "../components/ProfileMyCollectionPanel";

type Tab = "profile/general" | "profile/collected" | "profile/created";

export default function Profile(): React.ReactElement {
    const [tab, setTab] = useState<Tab>("profile/general");

    const handleOnGeneralTabClicked = useCallback(() => {
        setTab("profile/general");
    }, []);

    const handleOnCollectedTabClicked = useCallback(() => {
        setTab("profile/collected");
    }, []);

    const handleOnCreatedTabClicked = useCallback(() => {
        setTab("profile/created");
    }, []);

    const renderHeaderDomainNode = useCallback(() => {
        return (
            <div className="flex flex-row flex-nowrap text-lg">
                <div
                    className={cn("ml-8 first:ml-0 cursor-pointer", {
                        "text-purple-400": tab === "profile/general",
                    })}
                    onClick={handleOnGeneralTabClicked}
                >
                    General
                </div>
                <div className="ml-8 first:ml-0 opacity-25">|</div>
                <div
                    className={cn("ml-8 first:ml-0 cursor-pointer", {
                        "text-purple-400": tab === "profile/collected",
                    })}
                    onClick={handleOnCollectedTabClicked}
                >
                    Collected
                </div>
                <div className="ml-8 first:ml-0 opacity-25">|</div>
                <div
                    className={cn("ml-8 first:ml-0 cursor-pointer", {
                        "text-purple-400": tab === "profile/created",
                    })}
                    onClick={handleOnCreatedTabClicked}
                >
                    Created
                </div>
            </div>
        );
    }, [handleOnCollectedTabClicked, handleOnCreatedTabClicked, handleOnGeneralTabClicked, tab]);

    const renderDomain = useCallback(() => {
        switch (tab) {
            case "profile/general": {
                return (
                    <div className="w-full grid grid-cols-3 z-10 text-white justify-items-center items-start">
                        <div className="flex flex-row flex-nowrap items-center justify-self-start">
                            <label
                                className="mr-4 last:mr-0"
                                htmlFor="input-profile/general/my-name"
                            >
                                My name:
                            </label>
                            <Input
                                id="input-profile/general/my-name"
                                placeholder="Enter your name"
                            />
                        </div>

                        <div
                            className="w-[500px] h-[600px] bg-contain bg-top bg-no-repeat"
                            style={{ backgroundImage: `url(${imgYetiHoodie01})` }}
                        ></div>

                        <div className="justify-self-end flex flex-col flex-nowrap justify-start items-stretch">
                            <ProfileItemsPanel />
                            <div className="mt-8 flex flex-col flex-nowrap justify-start items-center">
                                <div className="mb-4 last:mb-0 font-bold">Loot Boxes</div>
                                <div className="mb-8 last:mb-0 text-center">
                                    Where do they come from? What&apos;s inside?
                                    <br />
                                    Stay tuned to learn more
                                </div>
                                <div
                                    className="mb-4 last:mb-0 w-[130px] h-[130px] bg-contain bg-no-repeat bg-center"
                                    style={{ backgroundImage: `url(${imgBox01})` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                );
            }

            case "profile/collected": {
                return (
                    <div className="w-full grid grid-cols-3 z-10 text-white justify-items-center items-start">
                        <div className="justify-self-start">
                            <ProfileCollectedPanel />
                        </div>

                        <div
                            className="w-[500px] h-[600px] bg-contain bg-top bg-no-repeat"
                            style={{ backgroundImage: `url(${imgYetiHoodie01})` }}
                        ></div>

                        <div className="justify-self-end flex flex-col flex-nowrap justify-start items-stretch">
                            <ProfileItemsPanel />
                            <div className="mt-8 flex flex-col flex-nowrap justify-start items-center">
                                <div className="mb-4 last:mb-0 font-bold">Loot Boxes</div>
                                <div className="mb-8 last:mb-0 text-center">
                                    Where do they come from? What&apos;s inside?
                                    <br />
                                    Stay tuned to learn more
                                </div>
                                <div
                                    className="mb-4 last:mb-0 w-[130px] h-[130px] bg-contain bg-no-repeat bg-center"
                                    style={{ backgroundImage: `url(${imgBox01})` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                );
            }

            case "profile/created": {
                return (
                    <div className="w-full grid grid-cols-3 z-10 text-white justify-items-center items-start">
                        <div className="justify-self-start">
                            <ProfileMyCollectionPanel />
                        </div>

                        <div
                            className="w-[500px] h-[600px] bg-contain bg-top bg-no-repeat"
                            style={{ backgroundImage: `url(${imgYetiHoodie01})` }}
                        ></div>

                        <div className="justify-self-end flex flex-col flex-nowrap justify-start items-stretch">
                            <ProfileItemsPanel />
                            <div className="mt-8 flex flex-col flex-nowrap justify-start items-center">
                                <div className="mb-4 last:mb-0 font-bold">Loot Boxes</div>
                                <div className="mb-8 last:mb-0 text-center">
                                    Where do they come from? What&apos;s inside?
                                    <br />
                                    Stay tuned to learn more
                                </div>
                                <div
                                    className="mb-4 last:mb-0 w-[130px] h-[130px] bg-contain bg-no-repeat bg-center"
                                    style={{ backgroundImage: `url(${imgBox01})` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                );
            }
        }
    }, [tab]);

    return (
        <DefaultLayout headerType="general" headerDomainNode={renderHeaderDomainNode()}>
            <Article className="grow">
                <div
                    className={cn(
                        "absolute top-0 bottom-0 right-0 left-0",
                        "bg-no-repeat bg-cover bg-bottom"
                    )}
                    style={{ backgroundImage: `url(${imgArticleUniverse01Background})` }}
                ></div>
                <div className="absolute top-0 left-0 bottom-0 right-0 bg-blue-900/50"></div>
                <div className="absolute top-0 left-0 bottom-0 right-0 bg-slate-900/75"></div>
                <div className="w-full mt-28 px-8 z-10">{renderDomain()}</div>
            </Article>
        </DefaultLayout>
    );
}
