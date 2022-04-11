import React, { useCallback } from "react";
import cn from "classnames";
import Panel from "./commons/Panel";
import CheckBox from "./commons/CheckBox";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setAgent, setSuccessMessage, toggleAgreeTermOfService } from "../features/mint/mintSlice";
import Button from "./commons/Button";
import {
    toggleMintSuccessfulPanelOn,
    turnOffAllPanel,
} from "../features/accessibility/accessibilitySlice";

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
    const dispatch = useAppDispatch();

    const handleOnAgreeTermOfServiceBtnClicked = useCallback(() => {
        dispatch(toggleAgreeTermOfService());
    }, [dispatch]);

    const handleOnMintNowBtnClicked = useCallback(() => {
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
    }, [dispatch]);

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
                            <span className="opacity-75">(${priceInFiat})</span>
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
