import React from "react";
import cn from "classnames";
import Button from "./commons/Button";
import Article from "./commons/Article";
import DiscordIcon from "./icons/DiscordIcon";
import TwitterIcon from "./icons/TwitterIcon";

import imgYetiHoodie01 from "./../assets/images/yeti-hoodie-01.png";
import imgYetiGirl01 from "./../assets/images/yeti-girl-01.png";
import imgArticleUniverse01Background from "./../assets/images/article-universe-01-background.png";

export default function LegendaryUniverseArticle(): React.ReactElement {
    return (
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
                    "bg-gradient-to-t from-slate-900 via-slate-900/75 to-slate-900/0"
                )}
            ></div>

            <div className="relative w-1/2 z-10">
                <div
                    className={cn(
                        "absolute top-0 bottom-0 right-0 w-1/2",
                        "bg-gradient-to-l from-slate-900 via-slate-900/75 to-slate-900/0"
                    )}
                ></div>
                <div
                    className={cn(
                        "absolute left-0 -bottom-24 w-3/4 h-full",
                        "bg-no-repeat bg-contain bg-bottom"
                    )}
                    style={{ backgroundImage: `url(${imgYetiHoodie01})` }}
                ></div>
                <div
                    className={cn(
                        "absolute right-0 -bottom-24 w-3/4 h-full",
                        "bg-no-repeat bg-contain bg-bottom"
                    )}
                    style={{ backgroundImage: `url(${imgYetiGirl01})` }}
                ></div>
            </div>
            <div
                className={cn(
                    "w-1/2 z-10 bg-slate-900 px-16",
                    "text-white flex flex-col flex-nowrap justify-center items-stretch"
                )}
            >
                <h1 className="mb-8 last:mb-0 font-bold text-5xl">The Legendary Universe</h1>
                <div className="mb-8 last:mb-0 max-w-xl">
                    <p className="opacity-75 text-lg">
                        Bringing all legendary creators into the Cosmos. The immersive mintlab for
                        all significant NFT projects. Focused on Cosmos, powered by Secret Network
                        and Secret NFTs. Legendao is a play-to-mint NFT platform. The platform is
                        set as its own universe, providing users with a gamified experience allowing
                        them to obtain unique and exclusive NFT content, while enriching the
                        DAO&apos;s treasury.
                    </p>
                </div>
                <div className="mb-8 last:mb-0 flex flex-row flex-nowrap items-center">
                    <Button>Get $LGND</Button>
                    <Button bTransparent>Creator? Contact Us</Button>
                    <div className="ml-4 first:ml-0 w-icon-lg h-icon-lg grow-0 shrink-0">
                        <DiscordIcon />
                    </div>
                    <div className="ml-4 first:ml-0 w-icon-lg h-icon-lg grow-0 shrink-0">
                        <TwitterIcon />
                    </div>
                </div>
            </div>
        </Article>
    );
}
