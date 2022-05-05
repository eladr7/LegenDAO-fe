import React from "react";
import cn from "classnames";
import Panel from "./commons/Panel";
import Button from "./commons/Button";

type Props = {
    apr: number;
    value: number;
    tvl: number;
    totalLGNDBalance: number;
    totalFiatBalance: number;
    rewardLGND: number;
    rewardFiat: number;
    onCloseBtnClicked?: React.MouseEventHandler<HTMLElement>;
};

export default function StakeFormPanel({
    apr,
    value,
    tvl,
    totalLGNDBalance,
    totalFiatBalance,
    rewardLGND,
    rewardFiat,
    onCloseBtnClicked,
}: Props): React.ReactElement {
    return (
        <Panel onCloseBtnClicked={onCloseBtnClicked}>
            <div className={cn("w-full text-white", "flex flex-col items-stretch justify-start")}>
                <h1 className="mb-6 last:mb-0 text-2xl font-bold">Stake LGND</h1>

                <div
                    className={cn(
                        "mb-4 last:mb-0 flex flex-col flex-nowrap items-stretch",
                        "bg-slate-900/50 p-4 rounded-lg"
                    )}
                >
                    <div className="flex flex-col tablet:flex-row flex-nowrap justify-around items-center">
                        <div className="flex flex-col flex-nowrap items-center tablet:items-start">
                            <div className="text-blue-300 text-lg font-emphasis">APR</div>
                            <div className="font-bold text-lg">{apr.toLocaleString()}%</div>
                        </div>
                        <div className="flex flex-col flex-nowrap items-center tablet:items-start">
                            <div className="text-blue-300 text-lg font-emphasis">Value</div>
                            <div className="font-bold text-lg">${value.toLocaleString()}</div>
                        </div>
                        <div className="flex flex-col flex-nowrap items-center tablet:items-start">
                            <div className="text-blue-300 text-lg font-emphasis">TVL</div>
                            <div className="font-bold text-lg">${tvl.toLocaleString()}</div>
                        </div>
                    </div>
                </div>

                <div className={cn("mb-4 last:mb-0 flex flex-col flex-nowrap")}>
                    <label className="mb-2 last:mb-0 opacity-75 font-emphasis">Total Staked Balance</label>
                    <div
                        className={cn(
                            "flex flex-row flex-nowrap items-end",
                            "bg-slate-900/50 p-4 tablet:py-5 rounded-lg"
                        )}
                    >
                        <div className="mr-2 last:m-0 leading-none font-bold text-lg">
                            {totalLGNDBalance.toLocaleString()}
                        </div>
                        <div className="mr-2 last:m-0 leading-none font-semibold">LGND</div>
                        <div className="mr-2 last:m-0 leading-none opacity-75 font-light">
                            (${totalFiatBalance.toLocaleString()})
                        </div>
                    </div>
                </div>

                <div className={cn("mb-4 last:mb-0 flex flex-col flex-nowrap")}>
                    <label className="mb-2 last:mb-0 opacity-75 font-emphasis">Rewards</label>
                    <div
                        className={cn(
                            "flex flex-row flex-nowrap items-end",
                            "bg-slate-900/50 p-4 tablet:py-5 rounded-lg"
                        )}
                    >
                        <div className="mr-2 last:m-0 leading-none font-bold text-lg">
                            {rewardLGND.toLocaleString()}
                        </div>
                        <div className="mr-2 last:m-0 leading-none font-semibold">LGND</div>
                        <div className="mr-2 last:m-0 leading-none opacity-75 font-light">
                            (${rewardFiat.toLocaleString()})
                        </div>
                    </div>
                </div>

                <div className={cn("mt-4 first:mb-0 flex flex-col flex-nowrap")}>
                    <Button bigness="lg">Claim</Button>
                </div>
            </div>
        </Panel>
    );
}
