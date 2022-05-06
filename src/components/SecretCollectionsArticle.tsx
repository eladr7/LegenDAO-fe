import React, { useCallback } from "react";
import cn from "classnames";
import Article from "./commons/Article";
import SecretCollectionCard from "./commons/SecretCollectionCard";
import { useMediaQuery } from "../app/hooks";

export default function SecretCollectionsArticle(): React.ReactElement {
    const mediaQuery = useMediaQuery();
    const renderSecretCollectionCard = useCallback(() => {
        if (!mediaQuery.checkMatchMinWidth(1024)) {
            return (
                <div className="w-full relative flex justify-center  min-h-[305px]">
                    <SecretCollectionCard
                        className={cn(
                            "!w-[160px] !h-[205px]",
                            "absolute left-[40%] top-0 -translate-x-1/2"
                        )}
                    />
                    <SecretCollectionCard
                        className={cn(
                            "!w-[160px] !h-[205px]",
                            "absolute left-[calc(40%+100px)] top-1/4 -translate-x-1/2 "
                        )}
                    />
                </div>
            );
        }
        return (
            <div className="mt-8 w-full grid grid-cols-5 gap-8 justify-items-center items-center">
                <SecretCollectionCard />
                <SecretCollectionCard />
                <SecretCollectionCard />
                <SecretCollectionCard />
                <SecretCollectionCard />
            </div>
        );
    }, [mediaQuery]);
    return (
        <Article>
            <div
                className={cn(
                    "absolute top-0 bottom-0 right-0 left-0 ",
                    "bg-no-repeat bg-cover bg-center bg-primary-mint-lab"
                )}
            ></div>

            <div
                className={cn(
                    "grow z-20 bg-primary-mint-lab px-5 lg:px-16",
                    "text-white flex flex-col flex-nowrap justify-center items-start lg:items-center"
                )}
            >
                <h1 className="mb-8 last:mb-0 font-bold text-2xl lg:text-5xl mt-10">Collections</h1>
                <div className="mb-8 last:mb-0 lg:max-w-[70%]">
                    <p className=" last:mb-0 opacity-75 text-paragraph lg:text-center font-light">
                        Through a highly selective process, our goal is to bring the most legendary
                        NFT collections into Legendao.
                    </p>
                    <p className="mb-4 last:mb-0 opacity-75 text-paragraph lg:text-center font-light">
                        We welcome all kinds of creators into the platform: brands, celebrities,
                        athletes, artists and forward-thinking creators, all of whom will create
                        better and more innovative collections through the use of Secret NFTs.
                    </p>
                </div>
                {renderSecretCollectionCard()}
            </div>
        </Article>
    );
}
