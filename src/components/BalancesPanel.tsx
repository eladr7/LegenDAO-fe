import React, { useCallback, useEffect } from "react";
import cn from "classnames";
import Panel from "./commons/Panel";
import Button from "./commons/Button";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
    accessibilityActions,
    toggleDepositPanel,
    toggleWithdrawPanel,
    turnOffAllPanel,
} from "../features/accessibility/accessibilitySlice";
import { useNavigate } from "react-router-dom";
import { walletActions } from "../features/wallet/walletSlice";
import { formatBalance } from "../helpers/format";

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
    const walletState = useAppSelector((state) => state.wallet);
    const networkState = useAppSelector((state) => state.network);

    const handleOnProfileBtnClicked = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            dispatch(turnOffAllPanel());
            if (onProfileBtnClicked) {
                onProfileBtnClicked(e);
                return;
            }
            dispatch(accessibilityActions.toggleBalanceMenu(false));
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
            dispatch(accessibilityActions.toggleBalanceMenu(false));
            window.open("https://app.osmosis.zone/?from=ATOM&to=OSMO", "_blank");
        },
        [dispatch, onGetLGNDBtnClicked]
    );

    const handleOnManageAssetBtnClicked = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            if (onManageAssetBtnClicked) {
                onManageAssetBtnClicked(e);
                return;
            }
            dispatch(accessibilityActions.toggleBalanceMenu(false));
            window.open("https://app.osmosis.zone/assets", "_blank");
        },
        [dispatch, onManageAssetBtnClicked]
    );

    const handleOnMyCollectionBtnClicked = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            dispatch(turnOffAllPanel());
            if (onMyCollectionBtnClicked) {
                onMyCollectionBtnClicked(e);
                return;
            }
            dispatch(accessibilityActions.toggleBalanceMenu(false));
            navigate("/collections");
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

    useEffect(() => {
        if (!networkState.bIsConnected) return;
        dispatch(walletActions.getBalance({denom: "lgnd"}));
    }, [dispatch, networkState.bIsConnected]);

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
                        <div className="font-semibold text-2xl leading-none uppercase">
                            {formatBalance(walletState.balance.amount) || "--"} {walletState.balance.denom}
                        </div>
                        <span className="ml-2 first:ml-0 opacity-50 font-light leading-none">
                            (${walletState.fiatBalance.amount.toFixed(2)})
                        </span>
                    </div>
                </div>

                <div className="mb-6 last:mb-0 flex flex-col flex-nowrap">
                    <div className="mb-2 last:mb-0 text-lg font-light text-white text-opacity-70">
                        Undelegate
                    </div>
                    <div className="flex flex-row flex-nowrap items-center">
                        <div className="font-semibold text-2xl leading-none uppercase">
                            {walletState.undelegate.amount || "--"} {walletState.undelegate.denom}
                        </div>
                        <span className="ml-2 first:ml-0 opacity-50 font-light leading-none">
                            (${walletState.fiatUndelegate.amount.toFixed(2)})
                        </span>

                        <div
                            className={cn(
                                "ml-4 first:ml-0 py-1 px-4 leading-none text-sm",
                                "border rounded-lg opacity-30"
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
                        <div className="font-semibold text-2xl leading-none uppercase">
                            {walletState.unclaim.amount || "--"} {walletState.unclaim.denom}
                        </div>
                        <span className="ml-2 first:ml-0 opacity-50 font-light leading-none">
                            (${walletState.fiatUnclaim.amount.toFixed(2)})
                        </span>
                    </div>
                </div>

                <div className="mb-6 last:mb-0 grid grid-cols-2 gap-4 justify-items-stretch">
                    <div className="grow flex">
                        <Button
                            bigness="sm"
                            className="grow font-normal"
                            bTransparent
                            bActivated={accessibilityState.bDepositPanelOn}
                            onClick={handleOnDepositBtnClicked}
                        >
                            Deposit
                        </Button>
                    </div>
                    <div className="grow flex">
                        <Button
                            bigness="sm"
                            className="grow font-normal"
                            bTransparent
                            onClick={handleOnWithdrawBtnClicked}
                        >
                            Withdraw
                        </Button>
                    </div>
                </div>

                <div className="mb-6 last:mb-0 flex flex-col flex-nowrap items-stretch">
                    <div className="mb-4 last:mb-0 flex flex-col">
                        <Button
                            className="font-normal"
                            bigness="lg"
                            onClick={handleOnGetLGNDBtnClicked}
                        >
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
