import React, { useCallback } from "react";
import cn from "classnames";
import Panel from "./commons/Panel";
import Button from "./commons/Button";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
    toggleDepositPanel,
    toggleWithdrawPanel,
    turnOffAllPanel,
} from "../features/accessibility/accessibilitySlice";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleOnProfileBtnClicked = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            dispatch(turnOffAllPanel());
            if (onProfileBtnClicked) {
                onProfileBtnClicked(e);
                return;
            }
            navigate("/profile");
        },
        [dispatch, navigate, onProfileBtnClicked]
    );

    const handleOnGetLGNDBtnClicked = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            if (onGetLGNDBtnClicked) {
                onGetLGNDBtnClicked(e);
                return;
            }
            window.open("https://app.osmosis.zone/?from=ATOM&to=OSMO", "_blank");
        },
        [onGetLGNDBtnClicked]
    );

    const handleOnManageAssetBtnClicked = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            if (onManageAssetBtnClicked) {
                onManageAssetBtnClicked(e);
                return;
            }
            window.open("https://app.osmosis.zone/?from=ATOM&to=OSMO", "_blank");
        },
        [onManageAssetBtnClicked]
    );

    const handleOnMyCollectionBtnClicked = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            dispatch(turnOffAllPanel());
            if (onMyCollectionBtnClicked) {
                onMyCollectionBtnClicked(e);
                return;
            }
            navigate("/profile/collected");
        },
        [dispatch, navigate, onMyCollectionBtnClicked]
    );

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
                className={cn("w-[274px] text-white", "flex flex-col items-stretch justify-start")}
            >
                <div className="mb-6 last:mb-0 flex flex-col flex-nowrap">
                    <div className="mb-2 last:mb-0 text-lg font-light text-white text-opacity-70">
                        Balance
                    </div>
                    <div className="flex flex-row flex-nowrap items-end">
                        <div className="font-semibold text-2xl leading-none">40.2839 LGND</div>
                        <span className="ml-2 first:ml-0 opacity-50 font-light leading-none">
                            ($80.37)
                        </span>
                    </div>
                </div>

                <div className="mb-6 last:mb-0 flex flex-col flex-nowrap">
                    <div className="mb-2 last:mb-0 text-lg font-light text-white text-opacity-70">
                        Undelegate
                    </div>
                    <div className="flex flex-row flex-nowrap items-center">
                        <div className="font-semibold text-2xl leading-none">15 LGND</div>
                        <span className="ml-2 first:ml-0 opacity-50 font-light leading-none">
                            ($30.47)
                        </span>

                        <div
                            className={cn(
                                "ml-4 first:ml-0 py-1 px-4 leading-none text-sm",
                                "border rounded-lg cursor-pointer opacity-30"
                            )}
                        >
                            Claim
                        </div>
                    </div>
                </div>

                <div className="mb-6 last:mb-0 flex flex-col flex-nowrap">
                    <div className="mb-2 last:mb-0 text-lg font-light text-white text-opacity-70">
                        Unclaimed
                    </div>
                    <div className="flex flex-row flex-nowrap items-end">
                        <div className="font-semibold text-2xl leading-none">25 LGND</div>
                        <span className="ml-2 first:ml-0 opacity-50 font-light leading-none">
                            ($50.37)
                        </span>
                    </div>
                </div>

                <div className="mb-6 last:mb-0 flex flex-row flex-nowrap justify-between">
                    <Button
                        bigness="sm"
                        className="grow font-normal"
                        bTransparent
                        bActivated={accessibilityState.bDepositPanelOn}
                        onClick={handleOnDepositBtnClicked}
                    >
                        Deposit
                    </Button>
                    <Button
                        bigness="sm"
                        className="grow font-normal"
                        bTransparent
                        onClick={handleOnWithdrawBtnClicked}
                    >
                        Withdraw
                    </Button>
                </div>

                <div className="mb-6 last:mb-0 flex flex-col flex-nowrap items-stretch">
                    <div className="mb-4 last:mb-0 flex flex-col">
                        <Button className="font-normal" bigness="lg" onClick={handleOnGetLGNDBtnClicked}>
                            Get $LGND
                        </Button>
                    </div>
                    <div className="mb-4 last:mb-0 flex flex-col">
                        <Button
                            className="font-normal"
                            bigness="lg"
                            bTransparent
                            onClick={handleOnManageAssetBtnClicked}
                        >
                            Manage Assets
                        </Button>
                    </div>
                    <div className="mb-4 last:mb-0 flex flex-col">
                        <Button
                            className="font-normal"
                            bigness="lg"
                            bTransparent
                            onClick={handleOnProfileBtnClicked}
                        >
                            Profile
                        </Button>
                    </div>
                    <div className="mb-4 last:mb-0 flex flex-col">
                        <Button
                            className="font-normal"
                            bigness="lg"
                            bTransparent
                            onClick={handleOnMyCollectionBtnClicked}
                        >
                            My Collections
                        </Button>
                    </div>
                </div>
            </div>
        </Panel>
    );
}
