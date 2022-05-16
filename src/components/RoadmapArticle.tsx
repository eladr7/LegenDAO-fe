/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useMemo } from "react";
import cn from "classnames";
import imgRoadmap01 from "../assets/images/roadmap-background-01.png";
import imgRoadmapMobile from "../assets/images/roadmap-mobile-background.png";
import Article from "./commons/Article";
import { ArticleBox } from "./ArticleBox";
import { useMediaQuery } from "../app/hooks";
import RoadMapCanvas from "./RoadMapCanvas";

export default function RoadmapArticle(): React.ReactElement {
    const mediaQuery = useMediaQuery();

    const arr = useMemo(
        () => [
            {
                stage: "Stage 0:",
                type: "light",
                title: "The journey begins; Presale opens",
                desc: [
                    "We’re announcing the first-ever play-to-mint NFT Mint Lab",
                    "This marks the beginning of a new generation of NFT collections, leveraging Secret NFT technology.",
                    "$LGND Presale opens.",
                ],
            },
            {
                stage: "Stage 1:",
                type: "light",
                title: "Launching the Legendao platform",
                desc: [
                    "Launch of the NFT Mintlab and $LGND token.",
                    "You will be able to purchase NFT collections and stake your tokens to earn more using the $LGND token.",
                    "Launch of the first Secret NFT collections in the Legendao universe.",
                ],
            },
            {
                stage: "Stage 2:",
                title: "Legendary Creatures Appear",
                desc: [
                    "Legendary Creatures collection launch.",
                    "Mint your cryptid.",
                    "A cryptid owner will get whitelist spot for the 3D collection.",
                ],
            },
            {
                stage: "Stage 3:",
                title: "Airdrop",
                desc: [
                    "Legendao will give away some free $LGND tokens as part of its airdrop.",
                    "Check your eligibility for the airdrop.",
                ],
            },
            {
                stage: "Stage 4:",
                title: "The Rise of the Legendao Community",
                desc: [
                    "Behind each successful project, stands a big and strong community.",
                    "Join the legendao community, propose new ideas, vote and approve other proposals and design the community platform you would like to see.",
                ],
            },
            {
                stage: "Stage 5:",
                title: "Creating your Avatar",
                desc: [
                    "Legendary 3D Creatures collection launch and the first play-to-mint mechanics open.",
                    "Pick your cryptid, gain experience points, and level it up.",
                    "The higher your cryptid, the higher your APY.",
                    "A high-ranking avatar gives you better access to the most legendary collections.",
                ],
            },
            {
                stage: "Stage 6:",
                title: "Discovering Loot Boxes",
                desc: [
                    "Loot boxes are found in the mystic mountains. What do these mysterious boxes contain?",
                    "Buy a loot box and reveal its treasures. Will it contain $LGND tokens? Or maybe a whitelist spot for the next legendary drop?",
                ],
            },
            {
                stage: "Stage 7:",
                title: "The House of Creators",
                desc: [
                    "Legendao becomes the de-facto place for creators all over the Cosmos universe.",
                    " The Secret NFT collections are unique and offer new value to artists and users alike. A new world is created inside the metaverse!",
                ],
            },
            {
                stage: "",
                title: "Beyond the Mountains: The lost Kingdom",
                desc: [
                    "Legendao is a living, breathing universe.",
                    "Through expansions and seasonal events, the DAO will keep collectors engaged. Each expansion will introduce new in-universe content, such as new characters, new item types (Legenforge for transmuting objects, potions, etc..), and many, many more.",
                ],
            },
        ],
        []
    );

    const arrMobile = useMemo(
        () => [
            {
                stage: "Stage 0:",
                title: "The journey begins; Presale opens",
                desc: [
                    "We’re announcing the first-ever play-to-mint NFT Mint Lab",
                    "This marks the beginning of a new generation of NFT collections, leveraging Secret NFT technology.",
                    "$LGND Presale opens.",
                ],
            },
            {
                stage: "Stage 1:",
                title: "Launching the Legendao platform",
                desc: [
                    "Launch of the NFT Mintlab and $LGND token.",
                    "You will be able to purchase NFT collections and stake your tokens to earn more using the $LGND token.",
                    "Launch of the first Secret NFT collections in the Legendao universe.",
                ],
            },
            {
                stage: "Stage 2:",
                title: "Legendary Creatures Appear",
                desc: [
                    "Legendary Creatures collection launch.",
                    "Mint your cryptid.",
                    "A cryptid owner will get whitelist spot for the 3D collection.",
                ],
            },
            {
                stage: "Stage 3:",
                title: "Airdrop",
                desc: [
                    "Legendao will give away some free $LGND tokens as part of its airdrop.",
                    "Check your eligibility for the airdrop.",
                ],
            },
            {
                stage: "Stage 4:",
                title: "The Rise of the Legendao Community",
                desc: [
                    "Behind each successful project, stands a big and strong community.",
                    "Join the legendao community, propose new ideas, vote and approve other proposals and design the community platform you would like to see.",
                ],
            },
            {
                stage: "Stage 5:",
                title: "Creating your Avatar",
                desc: [
                    "Legendary 3D Creatures collection launch and the first play-to-mint mechanics open.",
                    "Pick your cryptid, gain experience points, and level it up.",
                    "The higher your cryptid, the higher your APY.",
                    "A high-ranking avatar gives you better access to the most legendary collections.",
                ],
            },
            {
                stage: "Stage 6:",
                title: "Discovering Loot Boxes",
                desc: [
                    "Loot boxes are found in the mystic mountains. What do these mysterious boxes contain?",
                    "Buy a loot box and reveal its treasures. Will it contain $LGND tokens? Or maybe a whitelist spot for the next legendary drop?",
                ],
            },
            {
                stage: "Stage 7:",
                title: "The House of Creators",
                desc: [
                    "Legendao becomes the de-facto place for creators all over the Cosmos universe.",
                    " The Secret NFT collections are unique and offer new value to artists and users alike. A new world is created inside the metaverse!",
                ],
            },
            {
                stage: "",
                title: "Beyond the Mountains: The lost Kingdom",
                desc: [
                    "Legendao is a living, breathing universe.",
                    "Through expansions and seasonal events, the DAO will keep collectors engaged. Each expansion will introduce new in-universe content, such as new characters, new item types (Legenforge for transmuting objects, potions, etc..), and many, many more.",
                ],
            },
        ],
        []
    );

    const renderArr = useCallback(() => {
        const left = (
            <div className="flex flex-col -mt-16">
                {arr
                    .filter((item, index) => {
                        return index % 2 === 0;
                    })
                    .map((item, index) => {
                        return (
                            <div className="" key={index}>
                                <div className="mt-28 desktop-6:mt-36 text-white text-xl font-bold">
                                    {item.stage}
                                </div>
                                <div className="mt-3 text-2xl font-bold text-[#90E4FF] canvas-paragraph">
                                    {item.title}
                                </div>
                                <ul className="ml-8 ">
                                    {item.desc.map((item1, index1) => {
                                        return (
                                            <li
                                                className={cn(
                                                    "list-disc ",
                                                    item.type ? "text-white" : " text-[#AFB7C6] "
                                                )}
                                                key={index1}
                                            >
                                                {item1}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        );
                    })}
            </div>
        );

        const right = (
            <div className="flex flex-col">
                {arr
                    .filter((item, index) => {
                        return index % 2 === 1;
                    })
                    .map((item, index) => {
                        return (
                            <div className="" key={index}>
                                <div className="mt-36 desktop-6:mt-40 text-white text-xl font-bold">
                                    {item.stage}
                                </div>
                                <div className="mt-3 text-2xl font-bold text-[#FFC09D] canvas-paragraph">
                                    {item.title}
                                </div>

                                <ul className="ml-8 ">
                                    {item.desc.map((item1, index1) => {
                                        return (
                                            <li
                                                className={cn(
                                                    "list-disc ",
                                                    item.type ? "text-white" : " text-[#AFB7C6] "
                                                )}
                                                key={index1}
                                            >
                                                {item1}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        );
                    })}
            </div>
        );

        return [left, right];
    }, [arr]);

    const renderArrMobile = useCallback(() => {
        return (
            <div className="z-10">
                {arrMobile.map((item, index) => {
                    return (
                        <div key={index}>
                            <div className="mt-14  text-md font-bold">{item.stage}</div>
                            <div
                                className={cn(
                                    "mt-3 text-lg font-bold",
                                    index % 2 == 0 ? "text-sky-300" : "text-orange-300"
                                )}
                            >
                                {item.title}
                            </div>
                            <div className={cn("mt-3  text-base font-medium")}>
                                <ul className="ml-8">
                                    {item.desc.map((item1, index1) => {
                                        return (
                                            <li className="list-disc text-[#E3E3E3]" key={index1}>
                                                {item1}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }, []);
    return (
        <Article className="flex-col lg:flex-row min-h-[700px]">
            <div
                className={cn(
                    "grow z-20 bg-primary-mint-lab px-5 lg:px-12",
                    "text-white flex flex-col flex-nowrap justify-center flex:items-center"
                )}
            >
                <h1 className="mb-8 last:mb-0 lg:text-center font-bold text-2xl lg:text-5xl z-20">
                    The Legendary Roadmap
                </h1>

                <div
                    className={cn(
                        "absolute top-0 md:top-20 bottom-0 right-0 left-0",
                        "bg-no-repeat  "
                    )}
                    style={{
                        backgroundImage: mediaQuery.checkMatchMinWidth(1024)
                            ? `url(${imgRoadmap01})`
                            : `url(${imgRoadmapMobile})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                ></div>
                <div
                    className={cn(
                        "hidden md:block bg-gradient-to-b from-primary-mint-lab via-primary-mint-lab/100 to-slate-900/0 ",
                        "absolute h-1/4 w-full top-[3%] right-0 left-0  "
                    )}
                ></div>
                <div
                    className={cn(
                        "hidden md:block bg-gradient-to-t from-primary-mint-lab via-primary-mint-lab-900/75 to-slate-900/0 ",
                        "absolute h-1/5 w-full bottom-0 right-0 left-0  "
                    )}
                ></div>
                <div className="canvas-container relative">
                    {mediaQuery.checkMatchMinWidth(1024) && (
                        <>
                            <RoadMapCanvas />
                            <ArticleBox
                                className="bg-contain bg-repeat-round justify-between lg:pt-12 lg:pb-36 4xl:pr-36 4xl:pl-48  z-10"
                                childElement={renderArr()}
                            />
                        </>
                    )}
                    {!mediaQuery.checkMatchMinWidth(1024) && renderArrMobile()}
                </div>
            </div>
        </Article>
    );
}
