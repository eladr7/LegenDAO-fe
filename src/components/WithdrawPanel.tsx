import BigNumber from "bignumber.js";
import cn from "classnames";
import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { PLATFORM_ADDRESS, STAKING_ADDRESS } from "../constants/contractAddress";
import { DF_DENOM } from "../constants/defaults";
import { transactionActions } from "../features/transaction/transactionSlice";
import { formatBalance, formatIntBalance, parseBalance, shortenAddress } from "../helpers/format";
import validator from "../helpers/validator";
import Button from "./commons/Button";
import Input from "./commons/Input";
import Panel from "./commons/Panel";
import { IAmount } from "./DepositPanel";
import ArrowDownIcon from "./icons/ArrowDownIcon";

type Props = {
    onCloseBtnClicked?: React.MouseEventHandler<HTMLElement>;
};

export default function WithdrawPanel({ onCloseBtnClicked }: Props): React.ReactElement {
    const [inputAmount, setInputAmount] = useState<IAmount>({
        amount: "",
        error: "",
    });
    const [dataExpand, setDataExpand] = useState({
        unbonding: {
            amount: "0",
            denom: DF_DENOM.toUpperCase(),
        },
        unlocked: {
            amount: "0",
            denom: DF_DENOM.toUpperCase(),
        },
    });

    const walletState = useAppSelector((state) => state.wallet);
    const networkState = useAppSelector((state) => state.network);
    const transactionState = useAppSelector((state) => state.transaction);
    const [bIsExpanded, setIsExpanded] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const handleOnExpandBtnClicked = useCallback(() => {
        setIsExpanded(true);
    }, []);

    const handleOnCollapseBtnClicked = useCallback(() => {
        setIsExpanded(false);
    }, []);

    const handleOnWithdrawBtnClicked = useCallback(() => {
        if (!networkState.bIsConnected) return;
        if (transactionState.bIsPending) return;
        dispatch(
            transactionActions.withdrawFromPlatform({
                amount: parseBalance(inputAmount.amount) || "0",
            })
        );
    }, [dispatch, inputAmount, networkState.bIsConnected, transactionState.bIsPending]);

    const handleOnRedeemBtnClicked = useCallback(() => {
        if (!networkState.bIsConnected) return;
        if (transactionState.bIsPending) return;
        dispatch(
            transactionActions.claimPlatform({
                amountClaim: parseBalance(dataExpand.unlocked.amount) || "0",
            })
        );
    }, [dispatch, dataExpand.unlocked, networkState.bIsConnected, transactionState.bIsPending]);

    const handleOnWithdrawAmountChanged = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            let value = e.target.value;
            if (value.length > 1 && value[0] === "0" && value[1] !== ".") {
                value = value.substring(1, value.length);
            }
            const balance = formatBalance(
                walletState.balances[STAKING_ADDRESS as string]?.amount as string
            );
            const error = validator.inputAmount(value, balance);

            setInputAmount({
                amount: value,
                error,
            });
        },
        [walletState.balances]
    );

    const handleOnWithdrawAmountKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (!validator.inputingFloat(e, inputAmount.amount)) {
                e.preventDefault();
            }
        },
        [inputAmount]
    );

    const handleOnMaxBtnClicked = useCallback(() => {
        setInputAmount({
            amount: formatBalance(walletState.balances[STAKING_ADDRESS as string]?.amount || "0"),
            error: "",
        });
    }, [walletState.balances]);

    useEffect(() => {
        const unbondings =
            walletState.balances[PLATFORM_ADDRESS as string]?.pending_redeem?.unbondings;

        const unbonding = {
            amount: "0",
            denom: (
                walletState.balances[PLATFORM_ADDRESS as string]?.denom || DF_DENOM
            ).toUpperCase(),
        };

        if (unbondings) {
            const results = unbondings.reduce(
                (
                    preVal: string,
                    curVal: {
                        end_ts: string;
                        amount: string;
                    }
                ) => {
                    return new BigNumber(preVal).plus(curVal?.amount).toString();
                },
                "0"
            );

            unbonding["amount"] = formatIntBalance(formatBalance(results));
        }

        const unlocked = {
            amount:
                walletState.balances[PLATFORM_ADDRESS as string]?.pending_redeem?.claimable || "0",
            denom: (
                walletState.balances[PLATFORM_ADDRESS as string]?.denom || DF_DENOM
            ).toUpperCase(),
        };

        setDataExpand({
            unbonding,
            unlocked,
        });
    }, [walletState.balances]);

    return (
        <Panel onCloseBtnClicked={onCloseBtnClicked} className="grow">
            <div className={cn("w-full text-white", "flex flex-col items-stretch justify-start")}>
                <h1 className="mb-6 last:mb-0 text-2xl font-bold">Withdraw LGND</h1>
                <div className="mb-6 last:mb-0 flex flex-col flex-nowrap">
                    <label className="mb-2 last:mb-0 opacity-75 font-emphasis">From</label>
                    <Input
                        bTransparent
                        bigness="xl"
                        placeholder="Address"
                        value={PLATFORM_ADDRESS || ""}
                        disabled
                        className="hidden tablet:block truncate"
                    />
                    <Input
                        bTransparent
                        bigness="xl"
                        placeholder="Address"
                        value={shortenAddress(PLATFORM_ADDRESS, 13) || ""}
                        disabled
                        className="tablet:hidden truncate"
                    />
                </div>
                <div className="mb-6 last:mb-0 flex flex-col flex-nowrap">
                    <div className="mb-2 last:mb-0 flex flex-row justify-between items-center text-sm tablet-2:text-base">
                        <label className="opacity-75 font-emphasis">Amount to Withdraw</label>
                        <label className="opacity-75 font-emphasis">
                            Balance:{" "}
                            {formatIntBalance(
                                formatBalance(
                                    walletState.balances[STAKING_ADDRESS as string]?.amount || "0"
                                )
                            ) || "--"}{" "}
                            {walletState.balances[
                                STAKING_ADDRESS as string
                            ]?.denom?.toUpperCase() || DF_DENOM?.toUpperCase()}
                        </label>
                    </div>
                    <Input
                        rightButtonText="Max"
                        className="text-2xl"
                        bigness="xl"
                        value={inputAmount.amount}
                        onChange={handleOnWithdrawAmountChanged}
                        onKeyDown={handleOnWithdrawAmountKeyDown}
                        rightButtonOnClick={handleOnMaxBtnClicked}
                        rightButtonIsDisabled={new BigNumber(
                            walletState.balances[STAKING_ADDRESS as string]?.amount || "0"
                        ).isZero()}
                        placeholder="0.00"
                        autoFocus
                    />
                    {inputAmount.error && (
                        <label className="text-red-500/75 mt-2 font-emphasis">
                            {inputAmount.error}
                        </label>
                    )}
                </div>
                <div className="mb-6 last:mb-0 flex flex-col flex-nowrap">
                    <Button
                        className="font-bold"
                        bigness="lg"
                        onClick={handleOnWithdrawBtnClicked}
                        disabled={
                            !!inputAmount.error ||
                            !inputAmount.amount ||
                            transactionState.bIsPending
                        }
                    >
                        Withdraw
                    </Button>
                </div>

                {bIsExpanded ? (
                    <>
                        <div className="mb-6 tablet-2:mb-0 grid grid-cols-1 tablet-2:grid-cols-2 gap-0 tablet-2:gap-4">
                            <div className="mb-6 last:mb-0 flex flex-col flex-nowrap">
                                <div className="mb-2 last:mb-0 flex flex-row justify-between items-center text-sm tablet-2:text-base">
                                    <label className="opacity-75 font-emphasis">Unbounding</label>
                                </div>
                                <Input
                                    bTransparent
                                    bigness="xl"
                                    placeholder="Address"
                                    value={`${dataExpand.unbonding.amount} ${dataExpand.unbonding.denom}`}
                                    disabled
                                    className="truncate"
                                />
                            </div>
                            <div className="mb-6 last:mb-0 flex flex-col flex-nowrap">
                                <div className="mb-2 last:mb-0 flex flex-row justify-between items-center text-sm tablet-2:text-base">
                                    <label className="opacity-75 font-emphasis">Unlocked</label>
                                </div>
                                <Input
                                    rightButtonText="Redeem"
                                    bTransparent
                                    bigness="xl"
                                    placeholder="Address"
                                    value={`${dataExpand.unlocked.amount} ${dataExpand.unlocked.denom}`}
                                    disabled
                                    className="truncate"
                                    onClick={handleOnRedeemBtnClicked}
                                />
                            </div>
                        </div>
                        <div
                            className="flex flex-col justify-center items-center cursor-pointer"
                            onClick={handleOnCollapseBtnClicked}
                        >
                            <div className="w-icon h-icon grow-0 shrink-0 rotate-180">
                                <ArrowDownIcon />
                            </div>
                            <span className="mt-2 text-sm font-emphasis">Collapse</span>
                        </div>
                    </>
                ) : (
                    <div
                        className="flex flex-col justify-center items-center cursor-pointer"
                        onClick={handleOnExpandBtnClicked}
                    >
                        <div className="w-icon h-icon grow-0 shrink-0">
                            <ArrowDownIcon />
                        </div>
                        <span className="mt-2 text-sm font-emphasis">Expand</span>
                    </div>
                )}
            </div>
        </Panel>
    );
}
