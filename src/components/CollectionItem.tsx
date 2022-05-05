import React from "react";
import cn from "classnames";
import Panel from "./commons/Panel";

type Props = {
    coverImgUrl: string;
    name: string;
    description: string;
    startingDate: Date;
    totalItemNum: number;
    mintPrice: number;
};

export default function CollectionItem({
    coverImgUrl,
    name,
    description,
    startingDate,
    totalItemNum,
    mintPrice,
}: Props): React.ReactElement {
    return (
        <div className={cn("max-w-[320px] tablet-2:max-w-lg flex flex-col flex-nowrap rounded-xl overflow-hidden shrink-0")}>
            <div
                className={cn("h-[200px]  bg-cover bg-no-repeat bg-center")}
                style={{ backgroundImage: `url(${coverImgUrl})` }}
            ></div>
            <Panel bBordered={false} className="py-6">
                <div className={cn("flex flex-col flex-none items-stretch")}>
                    <div className="mb-2 last:mb-0 font-semibold text-xl opacity-80">{name}</div>
                    <div className="mb-4 last:mb-0 text-sm text-[#AFB7C6]">{description}</div>
                    <div className="mb-2 last:mb-0 flex flex-col tablet-2:flex-row flex-nowrap justify-between items-start tablet-2:items-center text-sm">
                        <div className="mb-4 tablet-2:mb-0 flex flex-col">
                            <div className="text-blue-300 font-emphasis">Starting Date</div>
                            <div className="font-bold">
                                {startingDate.toLocaleDateString("en-EN", {
                                    year: "numeric",
                                    month: "numeric",
                                    day: "2-digit",
                                })}
                            </div>
                        </div>
                        <div className="mb-4 tablet-2:mb-0 flex flex-col">
                            <div className="text-blue-300 font-emphasis">Total Items</div>
                            <div className="font-bold">{totalItemNum.toLocaleString()}</div>
                        </div>
                        <div className="mb-4 tablet-2:mb-0 flex flex-col">
                            <div className="text-blue-300 font-emphasis">Mint Price</div>
                            <div className="font-bold">{mintPrice.toLocaleString()} $LGND</div>
                        </div>
                    </div>
                </div>
            </Panel>
        </div>
    );
}
