import React, { useCallback, useState } from "react";
import cn from "classnames";
import Panel from "./commons/Panel";
import Input from "./commons/Input";
import Button from "./commons/Button";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { transactionActions } from "../features/transaction/transactionSlice";
import validator from "../helpers/validator";
import { formatBalance, parseBalance } from "../helpers/format";
import { LGND_ADDRESS } from "../constants/contractAddress";

type Props = {
    onCloseBtnClicked?: React.MouseEventHandler<HTMLElement>;
};

export default function DepositPanel({ onCloseBtnClicked }: Props): React.ReactElement {
    const [inputAmount, setInputAmount] = useState<string>("");
    const networkState = useAppSelector((state) => state.network);
    const walletState = useAppSelector((state) => state.wallet);
    const transactionState = useAppSelector((state) => state.transaction);
    const dispatch = useAppDispatch();

    const handleOnDepositBtnClicked = useCallback(() => {
        if (!networkState.bIsConnected) return;
        if (transactionState.bIsPending) return;
        dispatch(
            transactionActions.depositToPlatform({
                amount: parseBalance(inputAmount) || "0",
            })
        );
    }, [dispatch, inputAmount, networkState.bIsConnected, transactionState.bIsPending]);

    const handleOnDepositAmountChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInputAmount(e.target.value);
    }, []);

    const handleOnDepositAmountKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (!validator.inputingFloat(e, inputAmount)) {
                e.preventDefault();
            }
        },
        [inputAmount]
    );

    const handleOnMaxBtnClicked = useCallback(() => {
        setInputAmount(formatBalance(walletState.balances[LGND_ADDRESS as string].amount));
    }, [walletState.balances]);

    return (
        <Panel onCloseBtnClicked={onCloseBtnClicked}>
            <div
                className={cn("w-[655px] text-white", "flex flex-col items-stretch justify-start")}
            >
                <h1 className="mb-6 last:mb-0 text-2xl font-bold">Deposit LGND</h1>
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
                        <label className="opacity-75">Amount to Deposit</label>
                        <label className="opacity-75">
                            Balance: {formatBalance(walletState.balances[LGND_ADDRESS as string].amount)}{" "}
                            {walletState.balances[LGND_ADDRESS as string].denom.toUpperCase()}
                        </label>
                    </div>
                    <Input
                        rightButtonText="Max"
                        className="text-2xl"
                        bigness="xl"
                        value={inputAmount}
                        onChange={handleOnDepositAmountChanged}
                        onKeyDown={handleOnDepositAmountKeyDown}
                        rightButtonOnClick={handleOnMaxBtnClicked}
                        placeholder="Enter amount"
                    />
                </div>
                <div className="mb-6 last:mb-0 flex flex-col flex-nowrap">
                    <Button className="font-bold" bigness="xl" onClick={handleOnDepositBtnClicked}>
                        Deposit
                    </Button>
                </div>
            </div>
        </Panel>
    );
}
