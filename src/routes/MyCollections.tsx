import React from "react";
import cn from "classnames";
import Article from "../components/commons/Article";
import { DefaultLayout } from "../components/layouts/DefaultLayout";

import imgTopSecretCol01 from "./../assets/images/top-secret-col-01.png";
import imgTopSecretColBg01 from "./../assets/images/top-secret-col-background-01.png";
// import imgTopSecretColMintBg01 from "./../assets/images/top-secret-col-mint-background-01.png";
import DiscordIcon from "../components/icons/DiscordIcon";
import TwitterIcon from "../components/icons/TwitterIcon";
import Panel from "../components/commons/Panel";
import Button from "../components/commons/Button";

export default function MyCollections(): React.ReactElement {
    return (
        <DefaultLayout headerType="collection" bFooterOn sidebarTab="tab/collections">
            <Article bFullScreen>
                <div
                    className={cn(
                        "absolute top-0 bottom-0 right-0 left-0",
                        "bg-no-repeat bg-cover bg-bottom"
                    )}
                    style={{ backgroundImage: `url(${imgTopSecretColBg01})` }}
                ></div>

                <div className="absolute top-0 left-0 bottom-0 right-0 bg-blue-900/50"></div>
                <div className="absolute top-0 left-0 bottom-0 right-0 bg-slate-900/75"></div>

                <div className="grow flex flex-col flex-nowrap items-stretch z-10">
                    <div className="flex flex-row flex-nowrap">
                        <div
                            className={cn(
                                "w-1/2 px-8 mt-28",
                                "text-white flex flex-col flex-nowrap justify-start items-start"
                            )}
                        >
                            <div className="flex flex-col flex-nowrap">
                                <h1 className="mb-8 last:mb-0 font-bold text-5xl">
                                    Top Secret Collection
                                </h1>
                                <div className="mb-8 last:mb-0 max-w-xl">
                                    <p className="opacity-75 text-lg">
                                        The top secret collection contains things that should be
                                        kept secret. 5555 pieces of ancient Egyptian mythology
                                        symbols. The top secret collection contains things that
                                        should be kept secret. 5555 pieces of ancient Egyptian
                                        mythology symbols.
                                    </p>
                                </div>

                                <div className="mb-8 last:mb-0 flex flex-row flex-nowrap justify-start items-center">
                                    <div className="ml-8 first:ml-0 font-bold">
                                        Creators: XXXX XXXXX XXXX
                                    </div>
                                    <div className="ml-8 first:ml-0 w-icon h-icon grow-0 shrink-0">
                                        <DiscordIcon />
                                    </div>
                                    <div className="ml-8 first:ml-0 w-icon h-icon grow-0 shrink-0">
                                        <TwitterIcon />
                                    </div>
                                </div>

                                <div className="mb-8 last:mb-0 flex flex-row flex-nowrap">
                                    <Panel>
                                        <div className="flex flex-row flex-nowrap items-center">
                                            <div className="ml-20 first:ml-0 flex flex-col">
                                                <div className="text-blue-300">Starting Date</div>
                                                <div className="font-bold">4/18/2022</div>
                                            </div>
                                            <div className="ml-20 first:ml-0 flex flex-col">
                                                <div className="text-blue-300">Total Items</div>
                                                <div className="font-bold">5,555</div>
                                            </div>
                                            <div className="ml-20 first:ml-0 flex flex-col">
                                                <div className="text-blue-300">Mint Price</div>
                                                <div className="font-bold">25 $LGND</div>
                                            </div>
                                        </div>
                                    </Panel>
                                </div>

                                <div className="mb-8 last:mb-0">
                                    <Button>Get a Whitelist Spot</Button>
                                </div>
                            </div>
                        </div>

                        <div className={cn("w-1/2 z-10 px-8 mt-28")}>
                            <div
                                className="w-full h-[500px] bg-no-repeat container bg-center flex justify-center items-center"
                                style={{ backgroundImage: `url(${imgTopSecretCol01})` }}
                            >
                                <Button bigness="xl">
                                    <span className="font-bold">ENTER</span>
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="px-8 text-white flex flex-col flex-nowrap">
                        <div className="mb-4 last:mb-0 font-bold">Following Collections</div>
                        <div className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-4">
                            <div
                                className={cn(
                                    "w-[300px] flex flex-col flex-nowrap rounded-xl overflow-hidden",
                                    "bg-gradient-to-br from-white/25 to-violet-900/75"
                                )}
                            >
                                <div
                                    className={cn("h-[150px] bg-cover bg-no-repeat bg-center")}
                                    style={{ backgroundImage: `url(${imgTopSecretColBg01})` }}
                                ></div>
                                <div
                                    className={cn(
                                        "flex flex-col flex-none items-stretch py-4",
                                        "bg-gradient-to-br from-violet-900/75 via-violet-700/25 to-violet-700/25"
                                    )}
                                >
                                    <div className="mb-2 last:mb-0 px-6 font-semibold">
                                        Hall of Legend
                                    </div>
                                    <div className="mb-2 last:mb-0 px-6 text-sm">
                                        There is a hall, full of legends that being kept by
                                        mysteries creatures
                                    </div>
                                    <div className="mb-2 last:mb-0 px-6 flex flex-row flex-nowrap justify-between items-center text-sm">
                                        <div className="flex flex-col">
                                            <div className="text-blue-300">Starting Date</div>
                                            <div className="font-bold">4/18/2022</div>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="text-blue-300">Total Items</div>
                                            <div className="font-bold">5,555</div>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="text-blue-300">Mint Price</div>
                                            <div className="font-bold">25 $LGND</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div
                                className={cn(
                                    "w-[300px] flex flex-col flex-nowrap rounded-xl overflow-hidden",
                                    "bg-gradient-to-br from-white/25 to-violet-900/75"
                                )}
                            >
                                <div
                                    className={cn("h-[150px] bg-cover bg-no-repeat bg-center")}
                                    style={{ backgroundImage: `url(${imgTopSecretColBg01})` }}
                                ></div>
                                <div
                                    className={cn(
                                        "flex flex-col flex-none items-stretch py-4",
                                        "bg-gradient-to-br from-violet-900/75 via-violet-700/25 to-violet-700/25"
                                    )}
                                >
                                    <div className="mb-2 last:mb-0 px-6 font-semibold">
                                        Hall of Legend
                                    </div>
                                    <div className="mb-2 last:mb-0 px-6 text-sm">
                                        There is a hall, full of legends that being kept by
                                        mysteries creatures
                                    </div>
                                    <div className="mb-2 last:mb-0 px-6 flex flex-row flex-nowrap justify-between items-center text-sm">
                                        <div className="flex flex-col">
                                            <div className="text-blue-300">Starting Date</div>
                                            <div className="font-bold">4/18/2022</div>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="text-blue-300">Total Items</div>
                                            <div className="font-bold">5,555</div>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="text-blue-300">Mint Price</div>
                                            <div className="font-bold">25 $LGND</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Article>
        </DefaultLayout>
    );
}
