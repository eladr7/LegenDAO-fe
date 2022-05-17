import cn from "classnames";
import React from "react";

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
                className="w-[230px] h-[180px] desktop-4:w-[250px] desktop-4:h-[200px] bg-no-repeat bg-contain bg-center mb-2 last:mb-0"
                style={{ backgroundImage: `url(${img})` }}
            ></div>
            <div className="text-center -mt-8">
                <div className="font-bold">{name}</div>
                <div className="font-light text-sm opacity-75">{position}</div>
            </div>
        </div>
    );
}
