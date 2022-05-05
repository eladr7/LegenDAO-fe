import React from "react";
import cn from "classnames";
import Article from "./commons/Article";

import imgArticlePlatform01Background from "./../assets/images/article-platform-01-background.png";
import imgPlatform01 from "./../assets/images/platform-01.png";
import { useMediaQuery } from "../app/hooks";

export default function LegendaryPlatformArticle(): React.ReactElement {
    const mediaQuery = useMediaQuery();
    return (
        <>
            <Article
                className="min-h-[1000px] bg-right-top bg-primary-mint-lab pt-10 lg:pt-20"
                style={{
                    backgroundImage: mediaQuery.checkMatchMinWidth(1024)
                        ? `url(${imgArticlePlatform01Background})`
                        : "",
                }}
            >
                <div
                    className={cn(
                        "lg:w-1/2 z-20 px-5 lg:px-36",
                        "text-white flex flex-col justify-center items-center lg:items-end"
                    )}
                >
                    <div
                        className={cn(
                            "flex flex-col flex-nowrap justify-center  lg:items-start",
                            "mb-20 last:mb-0"
                        )}
                    >
                        <h1 className="mb-8 last:mb-0 font-bold text-2xl lg:text-5xl">
                            The Legendary <p className="inline-block lg:block">Platform</p>
                        </h1>
                        <div className="mb-8 last:mb-0 lg:max-w-[650px]">
                            <p className="mb-4 last:mb-0 opacity-75 text-paragraph ">
                                Legendao is a first of its kind NFT platform, designed to be a Mint
                                Lab for top creators, and a unique kind of immersive experience for
                                collectors, all of it governed by an underlying DAO.
                            </p>

                            <p className="mb-4 last:mb-0 opacity-75 text-paragraph ">
                                It’s a mixed-in and out-of-universe experience with its own
                                backstory, where users start with a unique avatar (a baseline NFT).
                                Avatars grow stronger over time and obtain loot boxes in their
                                journey (either by direct purchase or by earning them). Loot boxes
                                contain $LGND tokens, the in-universe currency, item-NFTs that help
                                your avatar grow, whitelist spots for major upcoming drops, or
                                unique NFTs from current or prior partner collections.
                            </p>
                        </div>
                    </div>
                    <div
                        className={cn(
                            "flex flex-col flex-nowrap justify-center items-start",
                            "mb-20 last:mb-0"
                        )}
                    >
                        <h1 className="mb-8 last:mb-0 font-bold text-2xl lg:text-5xl">
                            Platform Mechanics
                        </h1>
                        <div className="mb-8 last:mb-0 lg:max-w-[650px]">
                            <p className="mb-4 last:mb-0 opacity-75 text-paragraph ">
                                Loot-boxes allow you to mint NFTs from the best artists on our
                                platform (all curated and hand-picked by us), as well as develop
                                your avatar. Developing your avatar has far-reaching implications,
                                increasing the amount of $LGND and new loot boxes your avatar earns
                                and increasing your chances of obtaining good loot, NFTs, and
                                whitelist spots.
                            </p>

                            <p className="mb-4 last:mb-0 opacity-75 text-paragraph ">
                                Our goal is to bring the best and most interesting NFT projects into
                                Legendao. We achieve this through two mechanisms. First, Secret NFT
                                technology, which is only available on Secret Network, allows us to
                                create NFTs with exclusive and unlockable content. Second, Legendao
                                maintains a strong balance-sheet through Protocol-Owned-Liquidity
                                (POL), ensuring that the platform can onboard the best artists,
                                brands and creators.
                            </p>
                        </div>
                    </div>
                </div>
            </Article>
            <Article className="min-h-[250px] lg:min-h-[700px] bg-primary-mint-lab my-10">
                <div
                    className={cn(
                        "absolute top-0 bottom-0  right-0 left-0",
                        "bg-no-repeat bg-contain bg-bottom"
                    )}
                    style={{ backgroundImage: `url(${imgPlatform01})` }}
                ></div>
            </Article>
        </>
    );
}
