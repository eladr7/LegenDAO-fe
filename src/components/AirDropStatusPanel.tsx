import cn from "classnames";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setStatus } from "../features/airdrop/airdropSlice";
import validator from "../helpers/validator";
import Button from "./commons/Button";
import Input from "./commons/Input";
import Panel from "./commons/Panel";
import CheckIcon from "./icons/CheckIcon";

type Props = {
    onCloseBtnClicked?: React.MouseEventHandler<HTMLElement>;
};

interface IForm {
    walletAddress: string;
    twitterProfile: string;
    discordUserId: string;
}

export default function AirDropStatusPanel({ onCloseBtnClicked }: Props): React.ReactElement {
    const networkState = useAppSelector((state) => state.network);
    const transactionState = useAppSelector((state) => state.transaction);

    const airdropState = useAppSelector((state) => state.airdrop);
    const dispatch = useAppDispatch();

    const handleOnClaimAirdropBtnClicked = useCallback(() => {
        if (!networkState.bIsConnected) return;
        if (transactionState.bIsPending) return;
    }, [networkState.bIsConnected, transactionState.bIsPending]);

    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors, dirtyFields },
    } = useForm<IForm>({
        mode: "onChange",
        defaultValues: {
            walletAddress: "",
            twitterProfile: "",
            discordUserId: "",
        },
    });

    const onSubmit = useCallback(
        (data: IForm) => {
            if (data) {
                dispatch(setStatus("eligible"));
            }
        },
        [dispatch]
    );

    const renderCheckStatusForm = useCallback(() => {
        return (
            <Panel onCloseBtnClicked={onCloseBtnClicked}>
                <form
                    className={cn(
                        "w-[500px] text-white",
                        "flex flex-col items-stretch justify-start"
                    )}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <h1 className="mb-6 last:mb-0 text-2xl font-bold">LGND Airdrop Status</h1>

                    <div className="mb-4 last:mb-0">
                        {errors?.walletAddress && (
                            <div className="mb-2 last:mb-0 text-red-500">
                                {errors?.walletAddress.message}
                            </div>
                        )}
                        <Input
                            bigness="xl"
                            className="w-full"
                            rightIconNode={
                                !errors?.walletAddress && dirtyFields?.walletAddress ? (
                                    <CheckIcon className="fill-green-500" />
                                ) : null
                            }
                            placeholder="Wallet Address: Secret | Cosmos | Terra"
                            {...register("walletAddress", {
                                validate: validator.validateForm.walletAddress,
                                onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                    setValue("walletAddress", e.target.value);
                                },
                            })}
                        />
                    </div>

                    <div className="mb-4 last:mb-0">
                        {errors?.twitterProfile && (
                            <div className="mb-2 last:mb-0 text-red-500">
                                {errors?.twitterProfile.message}
                            </div>
                        )}
                        <Input
                            bigness="xl"
                            className="w-full"
                            rightIconNode={
                                !errors?.twitterProfile && dirtyFields?.twitterProfile ? (
                                    <CheckIcon className="fill-green-500" />
                                ) : null
                            }
                            placeholder="Twitter Profile"
                            {...register("twitterProfile", {
                                validate: validator.validateForm.twitterProfile,
                                onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                    setValue("twitterProfile", e.target.value);
                                },
                            })}
                        />
                    </div>

                    <div className="mb-4 last:mb-0">
                        {errors?.discordUserId && (
                            <div className="mb-2 last:mb-0 text-red-500">
                                {errors?.discordUserId.message}
                            </div>
                        )}
                        <Input
                            bigness="xl"
                            className="w-full"
                            rightIconNode={
                                !errors?.discordUserId && dirtyFields?.discordUserId ? (
                                    <CheckIcon className="fill-green-500" />
                                ) : null
                            }
                            placeholder="Discord User ID"
                            {...register("discordUserId", {
                                validate: validator.validateForm.discordUserId,
                                onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                    setValue("discordUserId", e.target.value);
                                },
                            })}
                        />
                    </div>

                    <div className="mb-6 last:mb-0 flex flex-col flex-nowrap">
                        <Button className="font-bold" bigness="xl" type="submit">
                            Check Airdrop
                        </Button>
                    </div>
                </form>
            </Panel>
        );
    }, [
        errors?.discordUserId,
        errors?.twitterProfile,
        errors?.walletAddress,
        handleSubmit,
        onCloseBtnClicked,
        onSubmit,
        register,
        setValue,
        dirtyFields,
    ]);

    const renderEligibleForm = useCallback(() => {
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
                        <Button
                            className="font-bold"
                            bigness="xl"
                            onClick={handleOnClaimAirdropBtnClicked}
                        >
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
    }, [handleOnClaimAirdropBtnClicked, onCloseBtnClicked]);

    const renderNotEligibleForm = useCallback(() => {
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
    }, [onCloseBtnClicked]);

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
