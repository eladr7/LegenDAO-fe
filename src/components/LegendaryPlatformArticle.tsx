import React from "react";
import cn from "classnames";
import Article from "./commons/Article";

import imgArticleUniverse01Background from "./../assets/images/article-universe-01-background.png";
import imgYetiNinja01 from "./../assets/images/yeti-ninja-01.png";
import imgPlatform01 from "./../assets/images/platform-01.png";

export default function LegendaryPlatformArticle(): React.ReactElement {
    return (
        <>
            <Article>
                <div
                    className={cn(
                        "absolute top-0 bottom-0 right-0 left-0",
                        "bg-no-repeat bg-cover bg-bottom"
                    )}
                    style={{ backgroundImage: `url(${imgArticleUniverse01Background})` }}
                ></div>

                <div
                    className={cn(
                        "absolute bottom-0 left-0 right-0 h-[200px] z-20",
                        "bg-gradient-to-t from-slate-900 to-slate-900/0"
                    )}
                ></div>

                <div
                    className={cn(
                        "absolute top-0 left-0 right-0 h-[200px] z-20",
                        "bg-gradient-to-b from-slate-900 to-slate-900/0"
                    )}
                ></div>

                <div
                    className={cn(
                        "w-1/2 z-20 bg-slate-900 px-16",
                        "text-white flex flex-col flex-nowrap justify-center items-end"
                    )}
                >
                    <h1 className="mb-8 last:mb-0 font-bold text-5xl">The Legendary Platform</h1>
                    <div className="mb-8 last:mb-0 max-w-xl">
                        <p className="mb-4 last:mb-0 opacity-75 text-lg text-justify">
                            The Legendary universe is a home for artists and their art. Through the
                            Legendary platform, artists and creators can distribute their art.
                        </p>

                        <p className="mb-4 last:mb-0 opacity-75 text-lg text-justify">
                            Legendary is a mixed-in and out-of-universe experience with its own
                            backstory, in which users start with a unique character (a baseline
                            NFT). This character can grow stronger by interacting with loot boxes,
                            that distribute in-universe items alongside partner drops. Growing
                            stronger allows users to earn more of the in-universe currency, which
                            they use to buy more loot.
                        </p>
                        <p className="mb-4 last:mb-0 opacity-75 text-lg text-justify">
                            As a creator, Secret NFTs will provide you with a unique value for your
                            work. As a collector, you will have access to unique collections that
                            contain art and secret content only available to the owner. As an
                            investor, the Legendary platform gives you the chance to participate in
                            a new project and purchase tokens at a low cost.
                        </p>
                    </div>
                </div>

                <div className="relative w-1/2 z-10">
                    <div
                        className={cn(
                            "absolute top-0 bottom-0 left-0 w-1/2",
                            "bg-gradient-to-r from-slate-900 to-slate-900/0"
                        )}
                    ></div>
                    <div
                        className={cn(
                            "absolute left-0 -bottom-12 w-full h-full",
                            "bg-no-repeat bg-contain bg-left-bottom"
                        )}
                        style={{ backgroundImage: `url(${imgYetiNinja01})` }}
                    ></div>
                </div>
            </Article>
            <Article className="min-h-[1000px] bg-slate-900">
                <div
                    className={cn(
                        "absolute top-0 bottom-[100px] right-0 left-0",
                        "bg-no-repeat bg-contain bg-bottom"
                    )}
                    style={{ backgroundImage: `url(${imgPlatform01})` }}
                ></div>

                <div
                    className={cn(
                        "absolute bottom-0 left-0 right-0 h-[100px] z-20",
                        "bg-gradient-to-t from-slate-900 to-slate-900/0"
                    )}
                ></div>
            </Article>
        </>
    );
}
