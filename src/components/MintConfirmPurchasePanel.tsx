import BigNumber from "bignumber.js";
import cn from "classnames";
import React, { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { TRANSACTION_KEY } from "../constants/constant";
import {
    toggleMintSuccessfulPanelOn,
    turnOffAllPanel
} from "../features/accessibility/accessibilitySlice";
import { setAgent, setSuccessMessage, toggleAgreeTermOfService } from "../features/mint/mintSlice";
import { transactionActions } from "../features/transaction/transactionSlice";
import Button from "./commons/Button";
import CheckBox from "./commons/CheckBox";
import Panel from "./commons/Panel";

type Props = {
    priceInLGND: number;
    priceInFiat: number;
    itemCoverUrl: string;
    onCloseBtnClicked?: React.MouseEventHandler<HTMLElement>;
};

export default function MintConfirmPurchasePanel({
    priceInLGND,
    priceInFiat,
    itemCoverUrl,
    onCloseBtnClicked,
}: Props): React.ReactElement {
    const mintState = useAppSelector((state) => state.mint);
    const transactionState = useAppSelector((state) => state.transaction);
    const networkState = useAppSelector((state) => state.network);
    const dispatch = useAppDispatch();

    const handleOnAgreeTermOfServiceBtnClicked = useCallback(() => {
        dispatch(toggleAgreeTermOfService());
    }, [dispatch]);

    const handleOnMintNowBtnClicked = useCallback(() => {
        if (!networkState.bIsConnected) return;
        const amountToMint = 1;
        const tokenPrice = process.env.REACT_APP_TOKEN_PRICE || "1000000";
        dispatch(transactionActions.startTransaction());
        dispatch(
            transactionActions.sendTokenFromPlatformToContract({
                amountToMint,
                sendAmount: new BigNumber(amountToMint).times(tokenPrice).toFixed(),
                mintingContractAddress: process.env.REACT_APP_ADDRESS_NFT_MINTING,
            })
        );
    }, [dispatch, networkState.bIsConnected]);

    useEffect(() => {
        if (
            transactionState.txStatus &&
            !transactionState.bIsPending &&
            transactionState.txName === TRANSACTION_KEY.MINT_NFT
        ) {
            dispatch(turnOffAllPanel());
            dispatch(toggleMintSuccessfulPanelOn(true));
            dispatch(
                setAgent({
                    name: "Agent #4322",
                    description: "Agent #4322",
                    publicAttributes: ["Head", "Skin", "Eyes", "Bear", "Hair", "Shape"],
                    privateAttributes: ["High Res"],
                    token: "secret12hakz7t8z5ks4fucwzn92rg24muxcs4uvzyz2w",
                    royalties: 5,
                })
            );
            dispatch(setSuccessMessage("Congratulations, you've successfully minted an NFT!"));
        }
    }, [dispatch, transactionState.txStatus, transactionState.bIsPending, transactionState.txName]);

    return (
        <Panel onCloseBtnClicked={onCloseBtnClicked}>
            <div className={cn("text-white", "flex flex-col items-stretch justify-start")}>
                <h1 className="mb-6 last:mb-0 text-2xl font-bold">Confirm Purchase</h1>
                <div className="mb-6 last:mb-0 flex flex-row flex-nowrap items-start">
                    <div
                        className="w-[150px] h-[100px] bg-no-repeat bg-cover bg-center"
                        style={{ backgroundImage: `url(${itemCoverUrl})` }}
                    ></div>
                    <div className="ml-8 first:ml-0 flex flex-col flex-nowrap">
                        <div className="text-blue-300">Item Price</div>
                        <div className="">
                            <span className="font-bold text-lg">{priceInLGND} $LGND</span>
                            <span className="ml-4 opacity-75">(${priceInFiat})</span>
                        </div>
                    </div>
                </div>
                <div
                    className="mb-6 last:mb-0 flex flex-row flex-nowrap items-center cursor-pointer"
                    onClick={handleOnAgreeTermOfServiceBtnClicked}
                >
                    <CheckBox bChecked={mintState.bAgreeTermOfService} />
                    <span className="ml-2 whitespace-nowrap">
                        By checking this box, I agree to{" "}
                        <span className="text-blue-300 cursor-pointer">
                            Legendao&apos;s Terms of Service
                        </span>
                    </span>
                </div>

                <div className="flex flex-row">
                    <Button
                        bigness="xl"
                        onClick={handleOnMintNowBtnClicked}
                        bTransparent={!mintState.bAgreeTermOfService}
                        disabled={!mintState.bAgreeTermOfService}
                        className="grow font-bold"
                    >
                        Mint Now
                    </Button>
                </div>
            </div>
        </Panel>
    );
}
