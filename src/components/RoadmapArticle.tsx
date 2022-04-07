/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useMemo } from "react";
import cn from "classnames";
import imgRoadmap01 from "../assets/images/roadmap-background-01.png";
import Article from "./commons/Article";
import { ArticleBox } from "./ArticleBox";

export default function RoadmapArticle(): React.ReactElement {
    const arr = useMemo(
        () => [
            {
                stage: "Stage 0:",
                title: "The Journey Begins",
                desc: `We are launching the first NFT launchpad in the Cosmos universe!
          This marks the beginning of a new generation of NFT collections.`,
            },
            {
                stage: "Stage 1:",
                title: "Presale - New Token is Born & the First Drops",
                desc: `A new token is created! You will be able to purchase NFT collections, stake and upgrade
          your avatar using the LGN token.
          Launch of the first secret NFT collections in the Legendary universe. With private metadata, creators can now spread their creations in new ways.`,
            },
            {
                stage: "Stage 2:",
                title: "Legendary Creatures Appear",
                desc: `Launch of the legendary creatures collection! NFTs of the first
          secret and evolving avatars are revealed.
          Pick your Yeti, gain experience points, and then level up your Yeti to gain higher APY and gain access to the best Legendary
          collections.`,
            },
            {
                stage: "Stage 3:",
                title: "Secret NFT Collections",
                desc: `The DAO treasury will be used to invest back tokens into
          the platform and to allow artists to create their collections
          using the unique features of secret NFTs.`,
            },
            {
                stage: "Stage 4:",
                title: "The Mist Disperses",
                desc: `Loot boxes are found in the mystic mountains. What
          do these mysterious boxes contain?
          Buy a loot box and reveal its treasures. Will it
          contain LGN tokens? Or maybe a whitelist spot?`,
            },
            {
                stage: "Stage 5:",
                title: "Opening of the Armory",
                desc: `The armory is now open! Upgrade your avatar by buying
          new items. Your avatar's rank increases as it becomes
          better equipped. High-ranked avatars yield higher APYs.`,
            },
            {
                stage: "Stage 6:",
                title: "SOD - The House of Creators",
                desc: `Legendary becomes the place for creators all over the cosmos
          universe. The SNFT collections are unique and o!er new value to
          artists and users alike. A new world is created inside the
          metaverse!`,
            },
            {
                stage: "",
                title: "Beyond the Mountains: The Lost Kingdom",
                desc: `These creatures live peacefully in the high mountains, in the
          snowy peaks. Each one is unique and rare. These creatures
          desire privacy. They want to remain unknown.
          You are your avatar, and this avatar is the legendary creature.
          Take care of your legendary creature. This will allow you to
          enter the hidden kingdom.
          You will find the most desirable collections and be able to get
          the best interest rates there.
          This will be continued...`,
            },
        ],
        []
    );

    const renderArr = useCallback(() => {
        const left = (
            <div className="flex flex-col w-1/3 -mt-16">
                {arr
                    .filter((item, index) => {
                        return index % 2 === 0;
                    })
                    .map((item, index) => {
                        return (
                            <div key={index}>
                                <div className="mt-28 text-white text-xl font-bold">
                                    {item.stage}
                                </div>
                                <div className="mt-3 text-2xl font-bold text-sky-300">
                                    {item.title}
                                </div>
                                <div className="mt-3 text-white text-base font-medium">
                                    {item.desc}
                                </div>
                            </div>
                        );
                    })}
            </div>
        );

        const right = (
            <div className="flex flex-col w-1/3">
                {arr
                    .filter((item, index) => {
                        return index % 2 === 1;
                    })
                    .map((item, index) => {
                        return (
                            <div key={index}>
                                <div className="mt-28 text-white text-xl font-bold">
                                    {item.stage}
                                </div>
                                <div className="mt-3 text-2xl font-bold text-orange-300">
                                    {item.title}
                                </div>
                                <div className="mt-3 text-white text-base font-medium">
                                    {item.desc}
                                </div>
                            </div>
                        );
                    })}
            </div>
        );

        return [left, right];
    }, [arr]);

    return (
        <Article>
            <div
                className={cn(
                    "absolute top-0 bottom-0 right-0 left-0",
                    "bg-no-repeat bg-cover bg-center bg-primary-mint-lab"
                )}
            ></div>

            <div
                className={cn(
                    "grow z-20 bg-primary-mint-lab px-16",
                    "text-white flex flex-col flex-nowrap justify-center items-center"
                )}
            >
                <h1 className="font-bold text-5xl">The Legendary Roadmap</h1>
                <div
                    className={cn(
                        "absolute top-20 bottom-0 right-0 left-0",
                        "bg-no-repeat bg-cover bg-top"
                    )}
                    style={{ backgroundImage: `url(${imgRoadmap01})` }}
                ></div>

                <div
                    className={cn(
                        "absolute bottom-0 left-0 right-0 h-[500px] z-10",
                        "bg-gradient-to-t from-primary-mint-lab to-slate-900/0"
                    )}
                ></div>

                <div
                    className={cn(
                        "absolute top-20 left-0 right-0 h-[200px] z-10",
                        "bg-gradient-to-b from-primary-mint-lab to-slate-900/0"
                    )}
                ></div>
                <ArticleBox
                    className="bg-contain bg-repeat-round justify-between pt-12 pl-48 pb-36 pr-36 z-10"
                    childElement={renderArr()}
                />
            </div>
        </Article>
    );
}
