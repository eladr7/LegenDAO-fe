import React from "react";
import cn from "classnames";
import Panel from "./commons/Panel";
import Button from "./commons/Button";

type Props = {
    onCloseBtnClicked?: React.MouseEventHandler<HTMLElement>;
};

export default function BalancesPanel({ onCloseBtnClicked }: Props): React.ReactElement {
    return (
        <Panel onCloseBtnClicked={onCloseBtnClicked}>
            <div
                className={cn("w-[320px] text-white", "flex flex-col items-stretch justify-start")}
            >
                <div className="mb-6 last:mb-0 flex flex-col flex-nowrap">
                    <div className="mb-2 last:mb-0 text-xl font-light">Balance</div>
                    <div className="flex flex-row flex-nowrap items-end">
                        <div className="font-semibold text-2xl leading-none">40.2839 LGND </div>
                        <span className="ml-2 first:ml-0 opacity-50 font-light leading-none">
                            ($80.37)
                        </span>
                    </div>
                </div>

                <div className="mb-6 last:mb-0 flex flex-col flex-nowrap">
                    <div className="mb-2 last:mb-0 text-xl font-light">Unclaimed</div>
                    <div className="flex flex-row flex-nowrap items-end">
                        <div className="font-semibold text-2xl leading-none">25 LGND </div>
                        <span className="ml-2 first:ml-0 opacity-50 font-light leading-none">
                            ($50.37)
                        </span>
                    </div>
                </div>

                <div className="mb-6 last:mb-0 flex flex-row flex-nowrap justify-between">
                    <Button bigness="sm" className="grow font-light" bTransparent>
                        Deposit
                    </Button>
                    <Button bigness="sm" className="grow font-light">
                        Withdraw
                    </Button>
                </div>

                <div className="mb-6 last:mb-0 flex flex-col flex-nowrap items-stretch">
                    <div className="mb-4 last:mb-0 flex flex-col">
                        <Button className="font-light" bigness="lg">Get $LGND</Button>
                    </div>
                    <div className="mb-4 last:mb-0 flex flex-col">
                        <Button className="font-light" bigness="lg" bTransparent>Manage Assets</Button>
                    </div>
                    <div className="mb-4 last:mb-0 flex flex-col">
                        <Button className="font-light" bigness="lg" bTransparent>Profile</Button>
                    </div>
                    <div className="mb-4 last:mb-0 flex flex-col">
                        <Button className="font-light" bigness="lg" bTransparent>My Collections</Button>
                    </div>
                </div>
            </div>
        </Panel>
    );
}
