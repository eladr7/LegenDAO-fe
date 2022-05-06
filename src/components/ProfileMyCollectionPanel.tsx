import React, { useCallback, useMemo } from "react";
import cn from "classnames";
import Panel from "./commons/Panel";

import imgTheLostRings from "./../assets/images/the-lost-rings.png";
import imgEternity from "./../assets/images/eternity.png";

export default function ProfileMyCollectionPanel(): React.ReactElement {
    const listItems = useMemo(() => {
        return [
            {
                name: "The Lost Rings",
                image: imgTheLostRings,
            },
            {
                name: "Eternity",
                image: imgEternity,
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
        <Panel className="lg:min-h-[694px]">
            <div className="mb-4 last:mb-0  text-teal-200 text-xl">My Collection</div>
            <div className="grid grid-cols-2 gap-4">{renderListItem()}</div>
        </Panel>
    );
}
