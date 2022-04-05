import React from "react";
import cn from "classnames";

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
        <div
            className={cn(
                "w-[300px] flex flex-col flex-nowrap rounded-xl overflow-hidden",
                "bg-gradient-to-br from-white/25 to-violet-900/75"
            )}
        >
            <div
                className={cn("h-[150px] bg-cover bg-no-repeat bg-center")}
                style={{ backgroundImage: `url(${coverImgUrl})` }}
            ></div>
            <div
                className={cn(
                    "flex flex-col flex-none items-stretch py-4",
                    "bg-gradient-to-br from-violet-900/75 via-violet-700/25 to-violet-700/25"
                )}
            >
                <div className="mb-2 last:mb-0 px-6 font-semibold">{name}</div>
                <div className="mb-2 last:mb-0 px-6 text-sm">{description}</div>
                <div className="mb-2 last:mb-0 px-6 flex flex-row flex-nowrap justify-between items-center text-sm">
                    <div className="flex flex-col">
                        <div className="text-blue-300">Starting Date</div>
                        <div className="font-bold">{startingDate.toLocaleDateString("en-EN", {
                            year: "numeric",
                            month: "numeric",
                            day: "2-digit",
                        })}</div>
                    </div>
                    <div className="flex flex-col">
                        <div className="text-blue-300">Total Items</div>
                        <div className="font-bold">{totalItemNum.toLocaleString()}</div>
                    </div>
                    <div className="flex flex-col">
                        <div className="text-blue-300">Mint Price</div>
                        <div className="font-bold">{mintPrice.toLocaleString()} $LGND</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
