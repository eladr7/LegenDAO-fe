import React from "react";
import cn from "classnames";
import Article from "./commons/Article";

import imgTokens01 from "./../assets/images/tokens-01.png";

export default function LegendaryTokenArticle(): React.ReactElement {
    return (
        <Article>
            <div
                className={cn(
                    "absolute top-0 bottom-0 right-0 left-0",
                    "bg-no-repeat bg-cover bg-bottom"
                )}
            ></div>

            <div
                className={cn(
                    "absolute bottom-0 left-0 right-0 h-[200px] z-20",
                    "bg-gradient-to-t from-primary-mint-lab to-slate-900/0"
                )}
            ></div>

            <div
                className={cn(
                    "absolute top-0 left-0 right-0 h-[200px] z-20",
                    "bg-gradient-to-b from-primary-mint-lab to-slate-900/0"
                )}
            ></div>

            <div
                className={cn(
                    "w-1/2 z-20 bg-primary-mint-lab px-16",
                    "text-white flex flex-col flex-nowrap justify-center items-end"
                )}
            >
                <h1 className="mb-8 last:mb-0 font-bold text-5xl">Legendary Tokens</h1>
                <div className="mb-8 last:mb-0 max-w-xl">
                    <p className="mb-4 last:mb-0 opacity-75 text-lg text-justify">
                        The legendary token (LGND) is the native token of the Legendary universe.
                        The LGND token is used to purchase NFT collections, NFT avatars, and loot
                        boxes. The APY earned by staking is connected to the avatar rank - the
                        higher the avatar&apos;s rank, the higher the APY.
                    </p>
                </div>
            </div>

            <div className="relative w-1/2 z-10">
                <div
                    className={cn(
                        "absolute top-0 bottom-0 left-0 w-1/2",
                        "bg-gradient-to-r from-primary-mint-lab to-slate-900/0"
                    )}
                ></div>
                <div
                    className={cn(
                        "absolute top-0 bottom-0 left-0 right-0",
                        "bg-no-repeat bg-center"
                    )}
                    style={{ backgroundImage: `url(${imgTokens01})` }}
                ></div>
            </div>
        </Article>
    );
}
