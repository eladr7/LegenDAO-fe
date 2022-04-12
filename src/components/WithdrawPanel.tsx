import React from "react";
import cn from "classnames";
import Panel from "./commons/Panel";
import Input from "./commons/Input";
import Button from "./commons/Button";

type Props = {
    onCloseBtnClicked?: React.MouseEventHandler<HTMLElement>;
};

export default function WithdrawPanel({ onCloseBtnClicked }: Props): React.ReactElement {
    return (
        <Panel onCloseBtnClicked={onCloseBtnClicked}>
            <div
                className={cn("w-[655px] text-white", "flex flex-col items-stretch justify-start")}
            >
                <h1 className="mb-6 last:mb-0 text-2xl font-bold">Withdraw LGND</h1>
                <div className="mb-6 last:mb-0 flex flex-col flex-nowrap">
                    <label className="mb-2 last:mb-0 opacity-75">To</label>
                    <Input bTransparent bigness="xl" placeholder="Address" />
                </div>
                <div className="mb-6 last:mb-0 flex flex-col flex-nowrap">
                    <div className="mb-2 last:mb-0 flex flex-row justify-between items-center">
                        <label className="opacity-75">Amount to Withdraw</label>
                        <label className="opacity-75">Balance: 40.2839 LGND</label>
                    </div>
                    <Input
                        rightButtonText="Max"
                        className="text-2xl"
                        bigness="xl"
                        value={"0.00"}
                        placeholder="Enter amount"
                    />
                </div>
                <div className="mb-6 last:mb-0 flex flex-col flex-nowrap">
                    <Button className="font-bold" bigness="xl">Withdraw</Button>
                </div>
            </div>
        </Panel>
    );
}
