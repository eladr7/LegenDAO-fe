import React, { useCallback, useMemo } from "react";
import cn from "classnames";
import Panel from "./commons/Panel";

import imgSword01 from "./../assets/images/sword-01.png";
import imgPotion from "./../assets/images/potion.png";
import imgBookOfWisdom from "./../assets/images/book-of-wisdom.png";
import imgWealthOfEtemity from "./../assets/images/wealth-of-etemity.png";

export default function ProfileCollectedPanel(): React.ReactElement {
    const listItems = useMemo(() => {
        return [
            {
                name: "Potion",
                image: imgPotion,
            },
            {
                name: "Book of Wisdom",
                image: imgBookOfWisdom,
            },
            {
                name: "Ice Sword",
                image: imgSword01,
            },
            {
                name: "Wealth of Eternity",
                image: imgWealthOfEtemity,
            },
        ];
    }, []);

    const renderListItem = useCallback(() => {
        return listItems.map((item, index) => {
            return (
                <div className="flex flex-col justify-center items-center" key={index}>
                    <div
                        className={cn(
                            "w-[124px] h-[124px] bg-slate-900/75 rounded-lg hover:bg-slate-900 transition-colors",
                            "bg-contain bg-center bg-no-repeat cursor-pointer"
                        )}
                        style={{ backgroundImage: `url(${item.image})` }}
                    ></div>
                    <div className="mt-2 text-teal-200 font-normal text-sm">{item.name}</div>
                </div>
            );
        });
    }, [listItems]);

    return (
        <Panel color="lighten" className="min-h-[694px]">
            <div className="mb-4 last:mb-0 text-teal-200 text-xl">Collected</div>
            <div className="grid grid-cols-2 gap-4">{renderListItem()}</div>
        </Panel>
    );
}
