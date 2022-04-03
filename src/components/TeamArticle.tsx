import React from "react";
import cn from "classnames";
import Article from "./commons/Article";
import TeamMemberCard from "./TeamMemberCard";

export default function TeamArticle(): React.ReactElement {
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
                <h1 className="mb-8 last:mb-0 font-bold text-5xl">The Legendary Team</h1>
                <div className="w-full grid grid-cols-4 gap-8 justify-items-center items-center">
                    <TeamMemberCard name="Guy" position="CEO" />
                    <TeamMemberCard name="Itzik" position="CTO" />
                    <TeamMemberCard name="Assaf" position="Developer" />
                    <TeamMemberCard name="Tom" position="Developer" />
                    <TeamMemberCard name="Reuven" position="Developer" />
                    <TeamMemberCard name="Yonatan" position="Product Manager" />
                    <TeamMemberCard name="Nir" position="Head of Business Development" />
                    <TeamMemberCard name="Shahar" position="Head of Marketing" />
                </div>
            </div>
        </Article>
    );
}
