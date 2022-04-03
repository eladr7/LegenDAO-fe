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
                    "bg-no-repeat bg-cover bg-center bg-slate-900"
                )}
            ></div>

            <div
                className={cn(
                    "grow z-20 bg-slate-900 px-16",
                    "text-white flex flex-col flex-nowrap justify-center items-center"
                )}
            >
                <h1 className="mb-8 last:mb-0 font-bold text-5xl">Collections</h1>
                <div className="mb-8 last:mb-0 max-w-2xl">
                    <p className="mb-4 last:mb-0 opacity-75 text-lg text-center font-light">
                        The legendary collections are about to be released. Athletes, chefs, and
                        artists are bringing their art to the next generation. By utilizing the
                        unique features of secret NFTs, the collections are able to reveal unique
                        content to their owners.
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
