import React from "react";
import cn from "classnames";
import Panel from "./commons/Panel";

type Props = {
    onCloseBtnClicked?: React.MouseEventHandler<HTMLElement>;
};

export default function StakeFormPanel({ onCloseBtnClicked }: Props): React.ReactElement {
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
                            <div className="text-blue-300">APR</div>
                            <div className="font-bold text-2xl">55.27%</div>
                        </div>
                        <div className="flex flex-col flex-nowrap">
                            <div className="text-blue-300">Value</div>
                            <div className="font-bold text-2xl">$2.86</div>
                        </div>
                        <div className="flex flex-col flex-nowrap">
                            <div className="text-blue-300">TVL</div>
                            <div className="font-bold text-2xl">$15,839,485</div>
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
                        <div className="mr-2 last:m-0 leading-none font-bold text-2xl">40.2839</div>
                        <div className="mr-2 last:m-0 leading-none font-semibold">LGND</div>
                        <div className="mr-2 last:m-0 leading-none opacity-75 font-light">
                            ($80.37)
                        </div>
                    </div>
                </div>
            </div>
        </Panel>
    );
}
