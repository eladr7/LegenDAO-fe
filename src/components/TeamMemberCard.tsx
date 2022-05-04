import cn from "classnames";
import React from "react";
import imgYetiHead01 from "./../assets/images/yeti-head-01.png";

type Props = {
    classname: string;
    name: string;
    position: string;
    img: string;
};

export default function TeamMemberCard({
    name,
    position,
    img,
    classname,
}: Props): React.ReactElement {
    return (
        <div className={cn("flex flex-col flex-nowrap justify-between items-center", classname)}>
            <div
                className="min-w-[230px] min-h-[180px] bg-no-repeat bg-contain bg-center mb-2 last:mb-0"
                style={{ backgroundImage: `url(${img})` }}
            ></div>
            <div className="font-bold">{name}</div>
            <div className="font-light text-sm opacity-75">{position}</div>
        </div>
    );
}
