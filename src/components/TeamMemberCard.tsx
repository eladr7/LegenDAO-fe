import React from "react";
import imgYetiHead01 from "./../assets/images/yeti-head-01.png";

type Props = {
    name: string;
    position: string;
};

export default function TeamMemberCard({ name, position }: Props): React.ReactElement {
    return (
        <div className="flex flex-col flex-nowrap justify-between items-center">
            <div
                className="w-[170px] h-[130px] bg-no-repeat bg-contain bg-center mb-2 last:mb-0"
                style={{ backgroundImage: `url(${imgYetiHead01})` }}
            ></div>
            <div className="font-bold">{name}</div>
            <div className="font-light text-sm opacity-75">{position}</div>
        </div>
    );
}
