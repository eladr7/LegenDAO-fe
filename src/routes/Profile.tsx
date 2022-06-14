import React, { useCallback, useRef, useState } from "react";
import cn from "classnames";
import Article from "../components/commons/Article";
import { DefaultLayout } from "../components/layouts/DefaultLayout";

import Input from "../components/commons/Input";

import ProfileItemsPanel from "../components/ProfileItemsPanel";
import imgArticleUniverse01Background from "./../assets/images/article-universe-01-background.png";
import imgYetiProfile01 from "./../assets/images/yeti-profile-01.png";
import imgBox01 from "./../assets/images/box-01.png";
import ProfileCollectedPanel from "../components/ProfileCollectedPanel";
import ProfileMyCollectionPanel from "../components/ProfileMyCollectionPanel";
import PencilIcon from "../components/icons/PencilIcon";
import { useAppDispatch, useAppSelector, useMediaQuery } from "../app/hooks";
import { profileActions } from "../features/profile/profileSlice";
import MintAgentDetailPanel from "../components/MintAgentDetailPanel";
import { TMintAgent } from "../classes/MintAgent";

const REGEXP_USERNAME = "^[0-9a-zA-Z]+$";

export default function Profile(): React.ReactElement {
    const rfMyNameInput = useRef<HTMLInputElement>(null);
    const profileState = useAppSelector((state) => state.profile);

    const dispatch = useAppDispatch();
    const mediaQuery = useMediaQuery();

    const [myName, setMyName] = useState<string>("");
    const [isDisableInput, setIsDisableInput] = useState<boolean>(true);
    const [myNameErrorMessage, setMyNameErrorMessage] = useState<string | undefined>(undefined);

    const [selectedNft, setSelectedNft] = useState<TMintAgent | undefined>();

    const handleOnGeneralTabClicked = useCallback(() => {
        dispatch(profileActions.setTab("/profile/general"));
    }, [dispatch]);

    const handleOnCollectedTabClicked = useCallback(() => {
        dispatch(profileActions.setTab("/profile/collected"));
    }, [dispatch]);

    const handleOnCreatedTabClicked = useCallback(() => {
        dispatch(profileActions.setTab("/profile/created"));
    }, [dispatch]);

    const handleOnMyNameChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (!rfMyNameInput.current) return;

        const value = e.target.value;
        setMyName(value);

        const usernameRegexp = new RegExp(REGEXP_USERNAME);

        if (value && !usernameRegexp.test(value)) {
            setMyNameErrorMessage("You can use letters and digits only");
            rfMyNameInput.current.reportValidity();
        } else {
            setMyNameErrorMessage(undefined);
        }
    }, []);

    const renderHeaderDomainNode = useCallback(() => {
        return (
            <div className="flex flex-row flex-nowrap lg:text-lg justify-around w-full text-[#B2BAC7]">
                <div
                    className={cn("lg:ml-8 first:ml-0 cursor-pointer", {
                        "text-purple-400": profileState.tab === "/profile/general",
                    })}
                    onClick={handleOnGeneralTabClicked}
                >
                    General
                </div>
                <div className="lg:ml-8 first:ml-0 opacity-25">|</div>
                <div
                    className={cn("lg:ml-8 first:ml-0 cursor-pointer ", {
                        "text-purple-400": profileState.tab === "/profile/collected",
                    })}
                    onClick={handleOnCollectedTabClicked}
                >
                    Collected
                </div>
                <div className="lg:ml-8 first:ml-0 opacity-25">|</div>
                <div
                    className={cn("lg:ml-8 first:ml-0 cursor-pointer", {
                        "text-purple-400": profileState.tab === "/profile/created",
                    })}
                    onClick={handleOnCreatedTabClicked}
                >
                    Created
                </div>
            </div>
        );
    }, [
        handleOnCollectedTabClicked,
        handleOnCreatedTabClicked,
        handleOnGeneralTabClicked,
        profileState.tab,
    ]);

    const renderDomain = useCallback(() => {
        switch (profileState.tab) {
            case "/profile/general": {
                return (
                    <div
                        className={cn(
                            "w-full z-10 text-white  grid grid-cols-1 lg:grid-cols-3 justify-items-center items-start"
                        )}
                    >
                        <form
                            className="flex flex-row flex-nowrap items-center justify-self-start"
                            onSubmit={(e: React.FormEvent) => {
                                e.preventDefault();
                            }}
                        >
                            <div className="flex flex-col mr-4 last:mr-0">
                                <label className="pt-8" htmlFor="input-profile/general/my-name">
                                    My name:
                                </label>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-red-500 h-8">{myNameErrorMessage}</label>

                                <Input
                                    className="w-[200px] lg:w-auto"
                                    refV={rfMyNameInput}
                                    rightIconNode={<PencilIcon size={18} />}
                                    rightIconOnClick={async () => {
                                        await setIsDisableInput(false);
                                        rfMyNameInput.current?.focus();
                                    }}
                                    onBlur={() => {
                                        setIsDisableInput(true);
                                    }}
                                    disabled={isDisableInput}
                                    bigness="lg"
                                    id="input-profile/general/my-name"
                                    placeholder="Enter your name"
                                    onChange={handleOnMyNameChanged}
                                    value={myName}
                                    pattern={REGEXP_USERNAME}
                                    autoComplete="off"
                                />
                            </div>
                        </form>

                        <div
                            className="w-full xs:h-[400px] my-6 bg-contain lg:w-[500px] lg:h-[600px]  bg-top bg-no-repeat"
                            style={{ backgroundImage: `url(${imgYetiProfile01})` }}
                        ></div>

                        <div className="justify-self-end flex flex-col flex-nowrap justify-start items-stretch">
                            <ProfileItemsPanel />
                            <div className="mt-8 flex flex-col flex-nowrap justify-start items-center ">
                                <div className="mb-4 last:mb-0 font-semibold text-lg text-[#B3BBC9]">
                                    Loot Boxes
                                </div>
                                <div className="mb-8 last:mb-0 text-center text-base text-[#AFB7C6]">
                                    Where do they come from?{" "}
                                    <span className="whitespace-nowrap">What&apos;s inside?</span>
                                    <br className="hidden lg:block" />
                                    &nbsp; Stay tuned to{" "}
                                    <span className="whitespace-nowrap">learn more</span>
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

            case "/profile/collected": {
                return (
                    <div
                        className={cn(
                            "w-full z-10 text-white flex flex-col items-stretch ",
                            "lg:flex-none lg:grid grid-cols-3 lg:justify-items-center lg:items-start"
                        )}
                    >
                        <div className="justify-self-start lg:order-first">
                            <ProfileCollectedPanel setSelectedNft={setSelectedNft} />
                        </div>

                        <div
                            className=" max-w-full xs:h-[400px] my-6 bg-contain lg:w-[500px] lg:h-[600px]  bg-top bg-no-repeat xs:order-first  "
                            style={{ backgroundImage: `url(${imgYetiProfile01})` }}
                        ></div>

                        <div className="mt-8 lg:mt-0 justify-self-end flex flex-col flex-nowrap justify-start items-stretch">
                            <ProfileItemsPanel />
                            <div className="mt-8 flex flex-col flex-nowrap justify-start items-center ">
                                <div className="mb-4 last:mb-0 font-semibold text-lg text-[#B3BBC9]">
                                    Loot Boxes
                                </div>
                                <div className="mb-8 last:mb-0 text-center text-base text-[#AFB7C6]">
                                    Where do they come from?{" "}
                                    <span className="whitespace-nowrap">What&apos;s inside?</span>
                                    <br className="hidden lg:block" />
                                    &nbsp; Stay tuned to{" "}
                                    <span className="whitespace-nowrap">learn more</span>
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

            case "/profile/created": {
                return (
                    <div
                        className={cn(
                            "w-full z-10 text-white flex flex-col items-stretch ",
                            "lg:flex-none lg:grid grid-cols-3 lg:justify-items-center lg:items-start"
                        )}
                    >
                        <div className="justify-self-start lg:order-first">
                            <ProfileMyCollectionPanel />
                        </div>

                        <div
                            className=" max-w-full xs:h-[400px] my-6 bg-contain lg:w-[500px] lg:h-[600px]  bg-top bg-no-repeat xs:order-first  "
                            style={{ backgroundImage: `url(${imgYetiProfile01})` }}
                        ></div>
                        <div className="mt-8 justify-self-end flex flex-col flex-nowrap justify-start items-stretch">
                            <ProfileItemsPanel />
                            <div className="mt-8 flex flex-col flex-nowrap justify-start items-center ">
                                <div className="mb-4 last:mb-0 font-semibold text-lg text-[#B3BBC9]">
                                    Loot Boxes
                                </div>
                                <div className="mb-8 last:mb-0 text-center text-base text-[#AFB7C6]">
                                    Where do they come from?{" "}
                                    <span className="whitespace-nowrap">What&apos;s inside?</span>
                                    <br className="hidden lg:block" />
                                    &nbsp; Stay tuned to{" "}
                                    <span className="whitespace-nowrap">learn more</span>
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
    }, [
        profileState.tab,
        myNameErrorMessage,
        isDisableInput,
        handleOnMyNameChanged,
        myName,
        selectedNft,
    ]);

    return (
        <DefaultLayout
            bFooterOn={!mediaQuery.checkMatchMinWidth(1020)}
            headerType="general"
            headerDomainNode={renderHeaderDomainNode()}
            bHeaderAlwaysOnTop
        >
            <Article className="grow pb-20">
                <div
                    className={cn(
                        "absolute top-0 bottom-0 right-0 left-0",
                        "bg-no-repeat bg-cover bg-bottom"
                    )}
                    style={{ backgroundImage: `url(${imgArticleUniverse01Background})` }}
                ></div>
                {selectedNft && profileState.tab === "/profile/collected" && (
                    <div className="absolute ml-96 mt-40 z-20">
                        <div className="ml-72">
                            <MintAgentDetailPanel mintAgent={selectedNft} />
                        </div>
                    </div>
                )}
                <div className="absolute top-0 left-0 bottom-0 right-0 bg-blue-900/50"></div>
                <div className="absolute top-0 left-0 bottom-0 right-0 bg-slate-900/75"></div>
                <div className="w-full mt-28 px-5 lg:px-16 z-10">
                    {!mediaQuery.checkMatchMinWidth(1020) && renderHeaderDomainNode()}
                    {renderDomain()}
                </div>
            </Article>
        </DefaultLayout>
    );
}
