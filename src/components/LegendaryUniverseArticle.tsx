import React, { useCallback } from "react";
import cn from "classnames";
import Button from "./commons/Button";
import Article from "./commons/Article";
import DiscordIcon from "./icons/DiscordIcon";
import TwitterIcon from "./icons/TwitterIcon";

import imgYetiHoodie01 from "./../assets/images/yeti-hoodie-01.png";
import imgYetiGirl01 from "./../assets/images/yeti-girl-01.png";
import imgArticleUniverse01Background from "./../assets/images/article-universe-01-background.png";
import { useAppDispatch, useMediaQuery } from "../app/hooks";
import { toggleCreationFormPanel } from "../features/accessibility/accessibilitySlice";
import { SOCIAL_NETWORK_URL } from "../constants/linkSocial";

export default function LegendaryUniverseArticle(): React.ReactElement {
    const dispatch = useAppDispatch();
    const mediaQuery = useMediaQuery();

    const handleOnGetLGNDBtnClicked = useCallback(() => {
        window.open("https://app.osmosis.zone/?from=ATOM&to=OSMO", "_blank");
    }, []);

    const handleOnContactUsBtnClicked = useCallback(() => {
        dispatch(toggleCreationFormPanel(true));
    }, [dispatch]);

    return (
        <Article
            className={cn("flex-col-reverse flex-wrap lg:flex-row lg:flex-nowrap lg:min-h-[700px]")}
        >
            <div
                className={cn(
                    "hidden lg:block",
                    "absolute top-0 bottom-0 right-0 left-0 ",
                    "bg-no-repeat bg-cover bg-[left_-150px_top_100px] lg:bg-center"
                )}
                style={{
                    backgroundImage: `url(${imgArticleUniverse01Background})`,
                    // backgroundPosition: "-250px 60px",
                }}
            ></div>
            <div
                className={cn(
                    "hidden lg:block",
                    "absolute bottom-0 left-0 right-0 h-[100px] z-30 ",
                    "bg-gradient-to-t from-primary-mint-lab via-primary-mint-lab-900/75 to-slate-900/0"
                )}
            ></div>

            <div className="relative lg:w-1/2 z-20 h-[400px] lg:h-auto">
                <div
                    className={cn(
                        "hidden lg:block",
                        "absolute top-0 bottom-0 right-0 w-1/2",
                        "bg-gradient-to-l from-primary-mint-lab via-primary-mint-lab/75 to-slate-900/0"
                    )}
                ></div>
                <div
                    className={cn(
                        "lg:hidden",
                        "absolute -bottom-10 left-0 right-0 h-[100px] z-10",
                        "bg-gradient-to-t from-primary-mint-lab via-primary-mint-lab/75 to-slate-900/0"
                    )}
                ></div>
                <div
                    className={cn(
                        "absolute left-[20px] lg:left-0 -bottom-8 lg:-bottom-24   w-3/4 h-[90%] ",
                        "bg-no-repeat bg-bottom "
                    )}
                    style={{
                        backgroundImage: `url(${imgYetiHoodie01})`,
                        backgroundSize: "auto 100%",
                    }}
                ></div>
                <div
                    className={cn(
                        "absolute -right-8 -bottom-6 lg:-bottom-24 w-3/4 h-[80%]",
                        "bg-no-repeat  bg-bottom"
                    )}
                    style={{
                        backgroundImage: `url(${imgYetiGirl01})`,
                        backgroundSize: "auto 100%",
                    }}
                ></div>
            </div>
            <div
                className={cn(
                    "relative min-h-screen lg:h-auto pt-[120px] lg:pt-[80px]",
                    "lg:w-1/2 z-20 lg:bg-primary-mint-lab lg:px-12",
                    "text-white flex flex-col flex-nowrap justify-center items-stretch px-8",
                    "bg-no-repeat "
                )}
                style={{
                    backgroundImage: mediaQuery.checkMatchMinWidth(1024)
                        ? ""
                        : `url(${imgArticleUniverse01Background})`,
                }}
            >
                <div
                    className={cn(
                        "lg:hidden ",
                        "absolute top-0 bottom-0 left-0 right-0 min-h-screen -z-[1]",
                        "bg-gradient-to-t from-primary-mint-lab via-primary-mint-lab-900/75 to-slate-900/5"
                    )}
                ></div>
                <div
                    className={cn(
                        "lg:hidden",
                        "absolute top-0 bottom-0 left-0 right-0 min-h-screen -z-[1] ",
                        "bg-gradient-to-b from-primary-mint-lab via-primary-mint-lab-900/75 to-slate-900/5"
                    )}
                ></div>
                <h1 className="mb-4 md:mb-8 last:mb-0 font-bold text-3xl lg:text-6xl">
                    The Legendary <p className="inline-block lg:block">Universe</p>
                </h1>
                <div className="mb-8 last:mb-0 lg:max-w-[600px]">
                    <p className="lg:opacity-75 text-paragraph lg:!text-lg ">
                        Bringing all legendary creators into the Cosmos. The immersive mintlab for
                        all significant NFT projects. Focused on Cosmos, powered by Secret Network
                        and Secret NFTs. Legendao is a play-to-mint NFT platform. The platform is
                        set as its own universe, providing users with a gamified experience allowing
                        them to obtain unique and exclusive NFT content, while enriching the
                        DAO&apos;s treasury.
                    </p>
                </div>
                <div className="mb-8 last:mb-0 flex flex-col flex-wrap lg:flex-row lg:flex-nowrap items-stretch lg:items-center justify-between lg:justify-start h-[200px] lg:h-auto">
                    <Button
                        bigness={mediaQuery.checkMatchMinWidth(1020) ? "lg" : "sm"}
                        onClick={handleOnGetLGNDBtnClicked}
                    >
                        Get $LGND
                    </Button>
                    <Button
                        bigness={mediaQuery.checkMatchMinWidth(1020) ? "lg" : "sm"}
                        className="!ml-0 lg:!ml-8 "
                        bTransparent
                        onClick={handleOnContactUsBtnClicked}
                    >
                        Creator? Contact Us
                    </Button>
                    <div className="flex justify-center lg:ml-8 ">
                        <div
                            className="ml-8 first:ml-0 w-icon h-icon grow-0 shrink-0 opacity-80"
                            onClick={() => {
                                window.open(SOCIAL_NETWORK_URL.discord, "_blank");
                            }}
                        >
                            <DiscordIcon />
                        </div>
                        <div
                            className="ml-8 first:ml-0 w-icon h-icon grow-0 shrink-0 opacity-80"
                            onClick={() => {
                                window.open(SOCIAL_NETWORK_URL.twitter, "_blank");
                            }}
                        >
                            <TwitterIcon />
                        </div>
                    </div>
                </div>
            </div>
        </Article>
    );
}
