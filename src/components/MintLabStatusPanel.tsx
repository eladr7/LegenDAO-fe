import React from "react";
import cn from "classnames";
import { shortenNumber } from "../helpers/format";

type Props = {
    price: number;
    apy: number;
    liquidity: number;
    volume: number;
};

export default function MintLabStatusPanel({
    price,
    apy,
    liquidity,
    volume,
}: Props): React.ReactElement {
    return (
        <div
            className={cn(
                "flex flex-col flex-nowrap justify-center",
                "tablet-2:flex-row tablet-2:justify-between tablet-2:items-center"
            )}
        >
            <div className="mb-12 tablet-2:mb-0 tablet-2:ml-12 first:ml-0 flex flex-col justify-center items-center">
                <div className="text-blue-300 font-semibold">LGND Price</div>
                <div className="text-3xl font-bold">${price.toLocaleString()}</div>
            </div>
            <div className="mb-12 tablet-2:mb-0 tablet-2:ml-12 first:ml-0 flex flex-col justify-center items-center">
                <div className="text-blue-300 font-semibold">APY</div>
                <div className="text-3xl font-bold">{apy.toLocaleString()}%</div>
            </div>
            <div className="mb-12 tablet-2:mb-0 tablet-2:ml-12 first:ml-0 flex flex-col justify-center items-center">
                <div className="text-blue-300 font-semibold">Liquidity</div>
                <div className="text-3xl font-bold">${shortenNumber(liquidity)}</div>
            </div>
            <div className="mb-12 tablet-2:mb-0 tablet-2:ml-12 first:ml-0 flex flex-col justify-center items-center">
                <div className="text-blue-300 font-semibold">Daily Volume</div>
                <div className="text-3xl font-bold">${shortenNumber(volume)}</div>
            </div>
        </div>
    );
}
