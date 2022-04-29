import React from "react";
import cn from "classnames";
import Panel from "./commons/Panel";

type Props = {
    apr: number;
    value: number;
    tvl: number;
    totalLGNDBalance: number;
    totalFiatBalance: number;
    onCloseBtnClicked?: React.MouseEventHandler<HTMLElement>;
};

export default function StakeFormPanel({
    apr,
    value,
    tvl,
    totalLGNDBalance,
    totalFiatBalance,
    onCloseBtnClicked,
}: Props): React.ReactElement {
    return (
        <Panel onCloseBtnClicked={onCloseBtnClicked}>
            <div
                className={cn("w-[500px] text-white", "flex flex-col items-stretch justify-start")}
            >
                <h1 className="mb-6 last:mb-0 text-2xl font-bold">Stake LGND</h1>

                <div
                    className={cn(
                        "mb-4 last:mb-0 flex flex-col flex-nowrap items-stretch",
                        "bg-slate-900/50 p-4 rounded-lg"
                    )}
                >
                    <div className="flex flex-row flex-nowrap justify-around">
                        <div className="flex flex-col flex-nowrap">
                            <div className="text-blue-300 text-xl">APR</div>
                            <div className="font-bold text-2xl">{apr.toLocaleString()}%</div>
                        </div>
                        <div className="flex flex-col flex-nowrap">
                            <div className="text-blue-300 text-xl">Value</div>
                            <div className="font-bold text-2xl">${value.toLocaleString()}</div>
                        </div>
                        <div className="flex flex-col flex-nowrap">
                            <div className="text-blue-300 text-xl">TVL</div>
                            <div className="font-bold text-2xl">${tvl.toLocaleString()}</div>
                        </div>
                    </div>
                </div>

                <div
                    className={cn(
                        "mb-4 last:mb-0 flex flex-col flex-nowrap",
                        "bg-slate-900/50 p-4 rounded-lg"
                    )}
                >
                    <label className="mb-2 last:mb-0 opacity-75">Total Staked Balance</label>
                    <div className="flex flex-row flex-nowrap items-end">
                        <div className="mr-2 last:m-0 leading-none font-bold text-2xl">
                            {totalLGNDBalance.toLocaleString()}
                        </div>
                        <div className="mr-2 last:m-0 leading-none font-semibold">LGND</div>
                        <div className="mr-2 last:m-0 leading-none opacity-75 font-light">
                            (${totalFiatBalance.toLocaleString()})
                        </div>
                    </div>
                </div>
            </div>
        </Panel>
    );
}
