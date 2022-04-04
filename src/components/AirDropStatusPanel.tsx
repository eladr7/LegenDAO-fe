import React, { useCallback } from "react";
import cn from "classnames";
import Panel from "./commons/Panel";
import Button from "./commons/Button";
import LoadingIcon from "./icons/LoadingIcon";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setStatus } from "../features/airdrop/airdropSlice";
import CheckIcon from "./icons/CheckIcon";

type Props = {
    onCloseBtnClicked?: React.MouseEventHandler<HTMLElement>;
};

export default function AirDropStatusPanel({ onCloseBtnClicked }: Props): React.ReactElement {
    const airdropState = useAppSelector((state) => state.airdrop);
    const dispatch = useAppDispatch();

    const handleOnCheckBtnClicked = useCallback(() => {
        dispatch(setStatus("eligible"));
    }, [dispatch]);

    const renderCheckStatusForm = useCallback(() => {
        return (
            <Panel onCloseBtnClicked={onCloseBtnClicked}>
                <div
                    className={cn(
                        "w-[500px] text-white",
                        "flex flex-col items-stretch justify-start"
                    )}
                >
                    <h1 className="mb-6 last:mb-0 text-2xl font-bold">LGND Airdrop Status</h1>

                    <div
                        className={cn(
                            "relative mb-4 last:mb-0 flex flex-col flex-nowrap",
                            "bg-slate-900/50 p-4 rounded-lg"
                        )}
                    >
                        <div className="flex flex-row flex-nowrap items-end">
                            Wallet Address: Secret | Cosmos | Terra
                        </div>
                        <div className="absolute right-4">
                            <div className="w-icon h-icon grow-0 shrink-0">
                                <CheckIcon className="fill-green-500" />
                            </div>
                        </div>
                    </div>

                    <div
                        className={cn(
                            "relative mb-4 last:mb-0 flex flex-col flex-nowrap",
                            "bg-slate-900/50 p-4 rounded-lg"
                        )}
                    >
                        <div className="flex flex-row flex-nowrap items-end">
                            Twitter Profile
                        </div>
                        <div className="absolute right-4">
                            <div className="w-icon h-icon grow-0 shrink-0">
                                <CheckIcon className="fill-green-500" />
                            </div>
                        </div>
                    </div>

                    <div
                        className={cn(
                            "relative mb-4 last:mb-0 flex flex-col flex-nowrap",
                            "bg-slate-900/50 p-4 rounded-lg"
                        )}
                    >
                        <div className="flex flex-row flex-nowrap items-end">
                            Discord User ID
                        </div>
                        <div className="absolute right-4">
                            <div className="w-icon h-icon grow-0 shrink-0">
                                <CheckIcon className="fill-green-500" />
                            </div>
                        </div>
                    </div>

                    <div className="mb-6 last:mb-0 flex flex-col flex-nowrap">
                        <Button
                            className="font-bold"
                            bigness="xl"
                            onClick={handleOnCheckBtnClicked}
                        >
                            Check AirDrop
                        </Button>
                    </div>

                    <div className="mb-6 last:mb-0 flex flex-row flex-nowrap justify-center">
                        <div className="w-icon h-icon grow-0 shrink-0 animate-spin">
                            <LoadingIcon />
                        </div>
                    </div>
                </div>
            </Panel>
        );
    }, [handleOnCheckBtnClicked, onCloseBtnClicked]);

    const renderEligibleForm = useCallback(() => {
        return (
            <Panel>
                <div
                    className={cn(
                        "w-[500px] text-white",
                        "flex flex-col items-stretch justify-start"
                    )}
                >
                    <h1 className="mb-6 last:mb-0 text-2xl font-bold">LGND Airdrop Status</h1>

                    <div
                        className={cn(
                            "mb-4 last:mb-0 flex flex-col flex-nowrap items-stretch",
                            "bg-lime-500/50 p-4 rounded-lg"
                        )}
                    >
                        <div className="font-bold text-center">Eligible!</div>
                        <div className="font-light text-center">You won 5,000 $LNGD</div>
                    </div>

                    <div className="mb-6 last:mb-0 flex flex-col flex-nowrap">
                        <div className="text-center font-light opacity-75">
                            Read about the{" "}
                            <span className="text-purple-200 underline cursor-pointer">
                                airdrop criteria
                            </span>
                        </div>
                    </div>

                    <div className="mb-6 last:mb-0 flex flex-col flex-nowrap">
                        <Button className="font-bold" bigness="xl">
                            Claim Your AirDrop
                        </Button>
                    </div>

                    <div className="mb-6 last:mb-0 flex flex-col flex-nowrap items-stretch">
                        <div className="text-center opacity-75 font-light">
                            Airdrop snapshot date: 04/12/2022
                        </div>
                        <div className="text-center opacity-75 font-light">
                            SCRT Staker (15 SCRT min): 1,500 LGND
                        </div>
                    </div>
                </div>
            </Panel>
        );
    }, []);

    const renderNotEligibleForm = useCallback(() => {
        return (
            <Panel>
                <div
                    className={cn(
                        "w-[500px] text-white",
                        "flex flex-col items-stretch justify-start"
                    )}
                >
                    <h1 className="mb-6 last:mb-0 text-2xl font-bold">LGND Airdrop Status</h1>

                    <div
                        className={cn(
                            "mb-4 last:mb-0 flex flex-col flex-nowrap items-stretch",
                            "bg-orange-500/50 p-4 rounded-lg"
                        )}
                    >
                        <div className="font-bold text-center">Not Eligible!</div>
                    </div>

                    <div className="mb-6 last:mb-0 flex flex-col flex-nowrap">
                        <div className="text-center font-light opacity-75">
                            Read about the{" "}
                            <span className="text-purple-200 underline cursor-pointer">
                                airdrop criteria
                            </span>
                        </div>
                    </div>

                    <div className="mb-6 last:mb-0 flex flex-col flex-nowrap">
                        <Button className="font-bold" bigness="xl">
                            Check Another Address
                        </Button>
                    </div>

                    <div className="mb-6 last:mb-0 flex flex-col flex-nowrap items-stretch">
                        <div className="text-center opacity-75 font-light">
                            Airdrop snapshot date: 04/12/2022
                        </div>
                        <div className="text-center opacity-75 font-light">
                            SCRT Staker (15 SCRT min): 1,500 LGND
                        </div>
                    </div>
                </div>
            </Panel>
        );
    }, []);

    const renderContent = useCallback(() => {
        switch (airdropState.status) {
            case "eligible":
                return renderEligibleForm();

            case "not/eligible":
                return renderNotEligibleForm();

            default:
                return renderCheckStatusForm();
        }
    }, [airdropState.status, renderCheckStatusForm, renderEligibleForm, renderNotEligibleForm]);

    return renderContent();
}
