import React, { useCallback, useState } from "react";
import cn from "classnames";
import Panel from "./commons/Panel";
import Input from "./commons/Input";
import Button from "./commons/Button";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { transactionActions } from "../features/transaction/transactionSlice";
import validator from "../helpers/validator";
import { formatBalance, formatIntBalance, parseBalance, shortenAddress } from "../helpers/format";
import { LGND_ADDRESS, PLATFORM_ADDRESS } from "../constants/contractAddress";
import BigNumber from "bignumber.js";

type Props = {
    onCloseBtnClicked?: React.MouseEventHandler<HTMLElement>;
};

export interface IAmount {
    amount: string;
    error: string;
}

export default function DepositPanel({ onCloseBtnClicked }: Props): React.ReactElement {
    const [inputAmount, setInputAmount] = useState<IAmount>({
        amount: "",
        error: "",
    });
    const networkState = useAppSelector((state) => state.network);
    const walletState = useAppSelector((state) => state.wallet);
    const transactionState = useAppSelector((state) => state.transaction);
    const dispatch = useAppDispatch();

    const handleOnDepositBtnClicked = useCallback(() => {
        if (!networkState.bIsConnected) return;
        if (transactionState.bIsPending) return;
        dispatch(
            transactionActions.depositToPlatform({
                amount: parseBalance(inputAmount.amount) || "0",
            })
        );
    }, [dispatch, inputAmount, networkState.bIsConnected, transactionState.bIsPending]);

    const handleOnDepositAmountChanged = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            let value = e.target.value;
            if (value.length > 1 && value[0] === "0" && value[1] !== ".") {
                value = value.substring(1, value.length);
            }
            const balance = formatBalance(walletState.balances[LGND_ADDRESS as string].amount);
            const error = validator.inputAmount(value, balance);

            setInputAmount({
                amount: value,
                error,
            });
        },
        [walletState.balances]
    );

    const handleOnDepositAmountKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (!validator.inputingFloat(e, inputAmount.amount)) {
                e.preventDefault();
            }
        },
        [inputAmount]
    );

    const handleOnMaxBtnClicked = useCallback(() => {
        setInputAmount({
            amount: formatBalance(walletState.balances[LGND_ADDRESS as string].amount),
            error: "",
        });
    }, [walletState.balances]);

    return (
        <Panel onCloseBtnClicked={onCloseBtnClicked} className="grow">
            <div className={cn("w-full text-white", "flex flex-col items-stretch justify-start")}>
                <h1 className="mb-6 last:mb-0 text-2xl font-bold">Deposit LGND</h1>
                <div className="mb-6 last:mb-0 flex flex-col flex-nowrap">
                    <label className="mb-2 last:mb-0 opacity-75">To</label>
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
                    <div className="mb-2 last:mb-0 flex flex-row justify-between items-center">
                        <label className="opacity-75 text-sm tablet-2:text-base">Amount <span className="hidden tablet:inline">to Deposit</span></label>
                        <label className="opacity-75 text-xs tablet-2:text-base">
                            Balance:{" "}
                            {formatIntBalance(
                                formatBalance(walletState.balances[LGND_ADDRESS as string].amount)
                            )}{" "}
                            {walletState.balances[LGND_ADDRESS as string].denom.toUpperCase()}
                        </label>
                    </div>
                    <Input
                        rightButtonText="Max"
                        className="text-2xl"
                        bigness="xl"
                        value={inputAmount.amount}
                        onChange={handleOnDepositAmountChanged}
                        onKeyDown={handleOnDepositAmountKeyDown}
                        rightButtonOnClick={handleOnMaxBtnClicked}
                        rightButtonIsDisabled={new BigNumber(
                            walletState.balances[LGND_ADDRESS as string].amount
                        ).isZero()}
                        placeholder="0.00"
                        autoFocus
                    />
                    {inputAmount.error && (
                        <label className="text-red-500/75 mt-2">{inputAmount.error}</label>
                    )}
                </div>
                <div className="mb-6 last:mb-0 flex flex-col flex-nowrap">
                    <Button
                        className="font-bold"
                        bigness="lg"
                        onClick={handleOnDepositBtnClicked}
                        disabled={
                            !!inputAmount.error ||
                            !inputAmount.amount ||
                            transactionState.bIsPending
                        }
                    >
                        Deposit
                    </Button>
                </div>
            </div>
        </Panel>
    );
}
