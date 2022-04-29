import React from "react";
import cn from "classnames";
import Article from "./commons/Article";
import SecretCollectionCard from "./commons/SecretCollectionCard";

export default function SecretCollectionsArticle(): React.ReactElement {
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
                <h1 className="mb-8 last:mb-0 font-bold text-5xl">Collections</h1>
                <div className="mb-8 last:mb-0 max-w-[70%]">
                    <p className="mb-4 last:mb-0 opacity-75 text-paragraph text-center font-light">
                        Through a highly selective process, our goal is to bring the most legendary
                        NFT collections into Legendao.
                        <br />
                        We welcome all kinds of creators into the platform: brands, celebrities,
                        athletes, artists and forward-thinking creators, all of whom will create
                        better and more innovative collections through the use of Secret NFTs.
                    </p>
                </div>

                <div className="mt-8 w-full grid grid-cols-5 gap-8 justify-items-center items-center">
                    <SecretCollectionCard />
                    <SecretCollectionCard />
                    <SecretCollectionCard />
                    <SecretCollectionCard />
                    <SecretCollectionCard />
                </div>
            </div>
        </Article>
    );
}
