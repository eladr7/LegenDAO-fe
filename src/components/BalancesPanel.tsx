import BigNumber from "bignumber.js";
import cn from "classnames";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { STAKING_ADDRESS } from "../constants/contractAddress";
import { DF_DENOM } from "../constants/defaults";
import {
    accessibilityActions,
    toggleDepositPanel,
    toggleWithdrawPanel,
    turnOffAllPanel,
} from "../features/accessibility/accessibilitySlice";
import { profileActions } from "../features/profile/profileSlice";
import { formatBalance, formatIntBalance } from "../helpers/format";
import Button from "./commons/Button";
import Panel from "./commons/Panel";

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

    const handleOnProfileBtnClicked = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            dispatch(turnOffAllPanel());
            if (onProfileBtnClicked) {
                onProfileBtnClicked(e);
                return;
            }
            dispatch(profileActions.setTab("/profile/general"));
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
            dispatch(profileActions.setTab("/profile/collected"));
            navigate("/profile");
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
                className={cn(
                    "w-full tablet-2:w-64 text-white",
                    "flex flex-col items-stretch justify-start"
                )}
            >
                <div className="mb-6 last:mb-0 flex flex-col flex-nowrap">
                    <div className="mb-2 last:mb-0 text-lg font-light text-white text-opacity-70">
                        Balance
                    </div>
                    <div className="flex flex-row flex-nowrap items-end">
                        <div className="font-semibold text-2xl leading-none uppercase">
                            {formatIntBalance(
                                formatBalance(
                                    walletState.balances[STAKING_ADDRESS as string]?.amount || "0"
                                )
                            )}{" "}
                            {(
                                walletState.balances[STAKING_ADDRESS as string]?.denom || DF_DENOM
                            ).toUpperCase()}
                        </div>
                        <span className="ml-2 first:ml-0 opacity-50 font-light leading-none">
                            ($
                            {formatIntBalance(
                                formatBalance(
                                    new BigNumber(
                                        walletState.balances[STAKING_ADDRESS as string]?.amount ||
                                            "0"
                                    )
                                        .times(walletState.tokenData?.price || "0")
                                        .toFixed()
                                )
                            )}
                            )
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
                            bActivated={accessibilityState.bWithdrawPanelOn}
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
