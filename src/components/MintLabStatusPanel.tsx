import React from "react";

type Props = {
    price: number;
    apy: number;
    liquidity: number;
    volume: number;
};

export default function MintLabStatusPanel({price, apy, liquidity, volume}: Props): React.ReactElement {
    return (
        <div className="flex flex-row flex-nowrap justify-between items-center">
            <div className="ml-12 first:ml-0 flex flex-col justify-center items-center">
                <div className="text-blue-300 font-semibold">LGND Price</div>
                <div className="text-3xl font-bold">${price.toLocaleString()}</div>
            </div>
            <div className="ml-12 first:ml-0 flex flex-col justify-center items-center">
                <div className="text-blue-300 font-semibold">APY</div>
                <div className="text-3xl font-bold">{apy.toLocaleString()}%</div>
            </div>
            <div className="ml-12 first:ml-0 flex flex-col justify-center items-center">
                <div className="text-blue-300 font-semibold">Liquidity</div>
                <div className="text-3xl font-bold">${liquidity.toLocaleString()}M</div>
            </div>
            <div className="ml-12 first:ml-0 flex flex-col justify-center items-center">
                <div className="text-blue-300 font-semibold">Daily Volume</div>
                <div className="text-3xl font-bold">${volume.toLocaleString()}M</div>
            </div>
        </div>
    );
}
