import cn from "classnames";
import React, { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { PLATFORM_ADDRESS } from "../constants/contractAddress";
import { DF_DENOM } from "../constants/defaults";
import { transactionActions } from "../features/transaction/transactionSlice";
import { formatBalance, parseBalance } from "../helpers/format";
import validator from "../helpers/validator";
import Button from "./commons/Button";
import Input from "./commons/Input";
import Panel from "./commons/Panel";

type Props = {
    onCloseBtnClicked?: React.MouseEventHandler<HTMLElement>;
};

export default function WithdrawPanel({ onCloseBtnClicked }: Props): React.ReactElement {
    const [inputAmount, setInputAmount] = useState<string>("");
    const walletState = useAppSelector((state) => state.wallet);
    const networkState = useAppSelector((state) => state.network);
    const transactionState = useAppSelector((state) => state.transaction);
    const dispatch = useAppDispatch();

    const handleOnWithdrawBtnClicked = useCallback(() => {
        if (!networkState.bIsConnected) return;
        if (transactionState.bIsPending) return;
        dispatch(
            transactionActions.withdrawFromPlatform({
                amount: parseBalance(inputAmount) || "0",
            })
        );
    }, [dispatch, inputAmount, networkState.bIsConnected, transactionState.bIsPending]);

    const handleOnWithdrawAmountChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInputAmount(e.target.value);
    }, []);

    const handleOnWithdrawAmountKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (!validator.inputingFloat(e, inputAmount)) {
                e.preventDefault();
            }
        },
        [inputAmount]
    );

    const handleOnMaxBtnClicked = useCallback(() => {
        setInputAmount(
            formatBalance(walletState.balances[PLATFORM_ADDRESS as string]?.staked || "0")
        );
    }, [walletState.balances]);

    return (
        <Panel onCloseBtnClicked={onCloseBtnClicked} className="grow">
            <div
                className={cn("w-full text-white", "flex flex-col items-stretch justify-start")}
            >
                <h1 className="mb-6 last:mb-0 text-2xl font-bold">Withdraw LGND</h1>
                <div className="mb-6 last:mb-0 flex flex-col flex-nowrap">
                    <label className="mb-2 last:mb-0 opacity-75">To</label>
                    <Input
                        bTransparent
                        bigness="xl"
                        placeholder="Address"
                        value={walletState.primary?.address || ""}
                        disabled
                    />
                </div>
                <div className="mb-6 last:mb-0 flex flex-col flex-nowrap">
                    <div className="mb-2 last:mb-0 flex flex-row justify-between items-center">
                        <label className="opacity-75">Amount to Withdraw</label>
                        <label className="opacity-75">
                            Balance:{" "}
                            {formatBalance(
                                walletState.balances[PLATFORM_ADDRESS as string]?.staked || "0"
                            ) || "--"}{" "}
                            {walletState.balances[
                                PLATFORM_ADDRESS as string
                            ]?.denom?.toUpperCase() || DF_DENOM?.toUpperCase()}
                        </label>
                    </div>
                    <Input
                        rightButtonText="Max"
                        className="text-2xl"
                        bigness="xl"
                        value={inputAmount}
                        onChange={handleOnWithdrawAmountChanged}
                        onKeyDown={handleOnWithdrawAmountKeyDown}
                        rightButtonOnClick={handleOnMaxBtnClicked}
                        placeholder="Enter amount"
                    />
                </div>
                <div className="mb-6 last:mb-0 flex flex-col flex-nowrap">
                    <Button className="font-bold" bigness="xl" onClick={handleOnWithdrawBtnClicked}>
                        Withdraw
                    </Button>
                </div>
            </div>
        </Panel>
    );
}
