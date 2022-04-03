import React from "react";
import cn from "classnames";
import Article from "./commons/Article";

export default function RoadmapArticle(): React.ReactElement {
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
                <h1 className="mb-8 last:mb-0 font-bold text-5xl">The Legendary Roadmap</h1>
                
            </div>
        </Article>
    );
}
