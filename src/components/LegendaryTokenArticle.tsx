import React from "react";
import cn from "classnames";
import Article from "./commons/Article";

import imgTokens01 from "./../assets/images/tokens-01.png";

export default function LegendaryTokenArticle(): React.ReactElement {
    return (
        <Article className="flex-col flex-wrap lg:flex-row lg:flex-nowrap lg:min-h-[700px]">
            <div
                className={cn(
                    "absolute top-0 bottom-0 right-0 left-0",
                    "bg-no-repeat bg-cover bg-bottom"
                )}
            ></div>

            <div
                className={cn(
                    "hidden lg:block",
                    "absolute bottom-0 left-0 right-0 h-[200px] z-20",
                    "bg-gradient-to-t from-primary-mint-lab to-slate-900/0"
                )}
            ></div>

            <div
                className={cn(
                    "hidden lg:block",
                    "absolute top-0 left-0 right-0 h-[200px] z-20",
                    "bg-gradient-to-b from-primary-mint-lab to-slate-900/0"
                )}
            ></div>

            <div
                className={cn(
                    "lg:w-1/2 z-20 bg-primary-mint-lab px-5  lg:px-16",
                    "text-white flex flex-col flex-nowrap justify-center  lg:items-end"
                )}
            >
                <div className="flex flex-col flex-nowrap justify-center items-start">
                    <h1 className="mb-8 last:mb-0 font-bold text-3xl lg:text-5xl">
                        Legendary Tokens
                    </h1>
                    <div className="mb-8 last:mb-0 lg:max-w-xl">
                        <p className="mb-4 last:mb-0 opacity-75 text-paragraph text-justify">
                            A central element of Legendao’s universe is the $LGND (pronounced
                            Legend) native token. This token serves as a fundamental in-universe
                            currency, used to purchase avatars, loot boxes and NFTs. We’ll disclose
                            full tokenomics soon, but $LGND and the DAO more generally innovate on
                            top of existing mechanisms in several ways. Furthermore, to reach a wide
                            distribution and the entire Cosmos ecosystem, initially, most
                            circulating tokens would originate in an airdrop to $SCRT holders
                            (primarily), $OSMO and $LUNA holders.
                        </p>
                    </div>
                </div>
            </div>

            <div className="relative lg:w-1/2 z-10 ">
                <div
                    className={cn(
                        "hidden lg:block",
                        "absolute top-0 bottom-0 left-0 w-1/2",
                        "bg-gradient-to-r from-primary-mint-lab to-slate-900/0"
                    )}
                ></div>
                <div
                    className={cn(
                        "min-h-[300px] my-10 lg:h-auto ",
                        "lg:absolute lg:top-0 lg:bottom-0 lg:left-0 lg:right-0",
                        "bg-no-repeat bg-center bg-contain"
                    )}
                    style={{ backgroundImage: `url(${imgTokens01})` }}
                ></div>
            </div>
        </Article>
    );
}
