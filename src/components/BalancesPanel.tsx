import React, { useCallback } from "react";
import cn from "classnames";
import Panel from "./commons/Panel";
import Button from "./commons/Button";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
    toggleDepositPanel,
    toggleWithdrawPanel,
} from "../features/accessibility/accessibilitySlice";

type Props = {
    onCloseBtnClicked?: React.MouseEventHandler<HTMLElement>;
    onDepositBtnClicked?: React.MouseEventHandler<HTMLElement>;
    onWithdrawBtnClicked?: React.MouseEventHandler<HTMLElement>;
    onGetLGNDBtnClicked?: React.MouseEventHandler<HTMLElement>;
    onProfileBtnClicked?: React.MouseEventHandler<HTMLElement>;
    onManageAssetBtnClicked?: React.MouseEventHandler<HTMLElement>;
    onMyCollectionBtnClicked?: React.MouseEventHandler<HTMLElement>;
};

export default function BalancesPanel({
    onCloseBtnClicked,
    onDepositBtnClicked,
    onWithdrawBtnClicked,
    onGetLGNDBtnClicked,
    onProfileBtnClicked,
    onManageAssetBtnClicked,
    onMyCollectionBtnClicked,
}: Props): React.ReactElement {
    const accessibilityState = useAppSelector((state) => state.accessibility);
    const dispatch = useAppDispatch();

    const handleOnDepositBtnClicked = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            if (onDepositBtnClicked) {
                onDepositBtnClicked(e);
                return;
            }
            dispatch(toggleDepositPanel());
        },
        [dispatch, onDepositBtnClicked]
    );

    const handleOnWithdrawBtnClicked = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            if (onWithdrawBtnClicked) {
                onWithdrawBtnClicked(e);
                return;
            }
            dispatch(toggleWithdrawPanel());
        },
        [dispatch, onWithdrawBtnClicked]
    );

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
                    <Button
                        bigness="sm"
                        className="grow font-light"
                        bTransparent
                        bActivated={accessibilityState.bDepositPanelOn}
                        onClick={handleOnDepositBtnClicked}
                    >
                        Deposit
                    </Button>
                    <Button
                        bigness="sm"
                        className="grow font-light"
                        bTransparent
                        onClick={handleOnWithdrawBtnClicked}
                    >
                        Withdraw
                    </Button>
                </div>

                <div className="mb-6 last:mb-0 flex flex-col flex-nowrap items-stretch">
                    <div className="mb-4 last:mb-0 flex flex-col">
                        <Button className="font-light" bigness="lg" onClick={onGetLGNDBtnClicked}>
                            Get $LGND
                        </Button>
                    </div>
                    <div className="mb-4 last:mb-0 flex flex-col">
                        <Button
                            className="font-light"
                            bigness="lg"
                            bTransparent
                            onClick={onManageAssetBtnClicked}
                        >
                            Manage Assets
                        </Button>
                    </div>
                    <div className="mb-4 last:mb-0 flex flex-col">
                        <Button
                            className="font-light"
                            bigness="lg"
                            bTransparent
                            onClick={onProfileBtnClicked}
                        >
                            Profile
                        </Button>
                    </div>
                    <div className="mb-4 last:mb-0 flex flex-col">
                        <Button
                            className="font-light"
                            bigness="lg"
                            bTransparent
                            onClick={onMyCollectionBtnClicked}
                        >
                            My Collections
                        </Button>
                    </div>
                </div>
            </div>
        </Panel>
    );
}
