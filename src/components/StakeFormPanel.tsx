import React from "react";
import cn from "classnames";
import Panel from "./commons/Panel";
import Button from "./commons/Button";
import { Coin } from "secretjs";
import { formatBalance, formatIntBalance } from "../helpers/format";
import { IDataStaking, ITokenData } from "../features/wallet/walletSlice";
import BigNumber from "bignumber.js";

type Props = {
    dataStaking?: IDataStaking;
    tokenData?: ITokenData;
    onCloseBtnClicked?: React.MouseEventHandler<HTMLElement>;
};

export default function StakeFormPanel({
    dataStaking,
    tokenData,
    onCloseBtnClicked,
}: Props): React.ReactElement {
    const calculateTvl = () => {
        const tvl = new BigNumber(tokenData?.totalLocked || 0)
            .times(tokenData?.price || 0)
            .toFixed();
        const tvlFormatted = formatBalance(tvl);
        return formatIntBalance(tvlFormatted);
    };

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
                            <div className="font-bold text-lg">
                                {formatIntBalance(tokenData?.apr)}%
                            </div>
                        </div>
                        <div className="flex flex-col flex-nowrap items-center tablet:items-start">
                            <div className="text-blue-300 text-lg font-emphasis">Value</div>
                            <div className="font-bold text-lg">
                                ${formatIntBalance(tokenData?.price)}
                            </div>
                        </div>
                        <div className="flex flex-col flex-nowrap items-center tablet:items-start">
                            <div className="text-blue-300 text-lg font-emphasis">TVL</div>
                            <div className="font-bold text-lg">${calculateTvl()}</div>
                        </div>
                    </div>
                </div>

                <div className={cn("mb-4 last:mb-0 flex flex-col flex-nowrap")}>
                    <label className="mb-2 last:mb-0 opacity-75 font-emphasis">
                        Total Staked Balance
                    </label>
                    <div
                        className={cn(
                            "flex flex-row flex-nowrap items-end",
                            "bg-slate-900/50 p-4 tablet:py-5 rounded-lg"
                        )}
                    >
                        <div className="mr-2 last:m-0 leading-none font-bold text-lg">
                            {formatIntBalance(dataStaking?.totalStakedBalance)}
                        </div>
                        <div className="mr-2 last:m-0 leading-none font-semibold">LGND</div>
                        <div className="mr-2 last:m-0 leading-none opacity-75 font-light">
                            (${formatIntBalance(dataStaking?.priceStaked)})
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
                            {formatIntBalance((dataStaking?.rewards as Coin)?.amount || "0")}
                        </div>
                        <div className="mr-2 last:m-0 leading-none font-semibold">
                            {(dataStaking?.rewards as Coin)?.denom.toUpperCase()}
                        </div>
                        <div className="mr-2 last:m-0 leading-none opacity-75 font-light">
                            (${formatIntBalance(dataStaking?.priceReward)})
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
