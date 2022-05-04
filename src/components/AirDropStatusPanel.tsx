/* eslint-disable no-console */
import cn from "classnames";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Permission, Permit } from "secretjs";
import { StdSignature } from "secretjs/dist/wallet_amino";
import { getSigner } from "../app/client";
import { legendServices } from "../app/commons/legendServices";
import { useAppSelector } from "../app/hooks";
import { TAirDropStatus } from "../classes/AirDrop";
import { CHAIN_ID } from "../constants/chainId";
import { AIRDROP_BTN_NAME, CLAIM_STATUS, KEY } from "../constants/constant";
import { LGND_ADDRESS } from "../constants/contractAddress";
import { addPopup } from "../features/application/applicationSlice";
import validator from "../helpers/validator";
import Button from "./commons/Button";
import Input from "./commons/Input";
import Panel from "./commons/Panel";
import CheckIcon from "./icons/CheckIcon";
import LoadingIcon from "./icons/LoadingIcon";

type Props = {
    onCloseBtnClicked?: React.MouseEventHandler<HTMLElement>;
};

interface IForm {
    walletAddress: string;
    twitterProfile: string;
    discordUserId: string;
}

interface IDataAirdrop {
    amountClaim: string;
    buttonName: string;
    status?: TAirDropStatus;
}

const initialDataAirdrop = {
    amountClaim: "0",
    buttonName: AIRDROP_BTN_NAME.CLAIM_YOUR_AIRDROP,
    status: undefined,
};

export default function AirDropStatusPanel({ onCloseBtnClicked }: Props): React.ReactElement {
    const networkState = useAppSelector((state) => state.network);
    const walletState = useAppSelector((state) => state.wallet);
    const transactionState = useAppSelector((state) => state.transaction);

    const [dataAirdrop, setDataAirdrop] = useState<IDataAirdrop>(initialDataAirdrop);
    const [isChecking, setChecking] = useState<boolean>(false);

    const dispatch = useDispatch();

    const {
        handleSubmit,
        watch,
        register,
        setValue,
        reset,
        formState: { errors },
    } = useForm<IForm>({
        mode: "onChange",
        defaultValues: {
            walletAddress: "",
            twitterProfile: "",
            discordUserId: "",
        },
    });

    const handleCheckAirdropStatus = useCallback(async (data: IForm) => {
        try {
            setChecking(true);
            const res = await legendServices.checkStatus(data.walletAddress);
            if (res.status === 200) {
                const claimStatus = res.data.status[data.walletAddress];
                switch (claimStatus.status) {
                    case CLAIM_STATUS.NOT_CLAIMED:
                        setDataAirdrop({
                            amountClaim: claimStatus.amount.toString(),
                            buttonName: AIRDROP_BTN_NAME.CLAIM_YOUR_AIRDROP,
                            status: "eligible",
                        });
                        break;

                    case CLAIM_STATUS.NOT_WHITE_LISTED:
                        setDataAirdrop({
                            amountClaim: "0",
                            buttonName: AIRDROP_BTN_NAME.CLAIM_YOUR_AIRDROP,
                            status: "not/eligible",
                        });
                        break;

                    case CLAIM_STATUS.SUBMITTED:
                    case CLAIM_STATUS.CLAIMED:
                        setDataAirdrop({
                            amountClaim: claimStatus.amount.toString(),
                            buttonName: AIRDROP_BTN_NAME.CLAIMED,
                            status: "eligible",
                        });
                        break;

                    default:
                        setDataAirdrop(initialDataAirdrop);
                        break;
                }
            }
            setChecking(false);
        } catch (error) {
            setChecking(false);
            console.error(error);
        }
    }, []);

    const handleOnClaimAirdropBtnClicked = useCallback(async () => {
        if (!networkState.bIsConnected || !walletState.primary?.address) return;
        if (transactionState.bIsPending) return;
        try {
            const address = watch("walletAddress");
            const chain = Object.entries(CHAIN_ID).find((item) => {
                return address.indexOf(item[0]) === 0;
            });

            const chainId = (chain as string[])[1];
            const msg = {
                permit_name: KEY.PERMIT_NAME,
                allowed_tokens: [LGND_ADDRESS as string],
                permissions: ["owner"] as Permission[],
            };

            const signature = await getSigner(chainId, address, msg);

            if (signature) {
                const permit: Permit = {
                    params: {
                        ...msg,
                        chain_id: chainId,
                    },
                    signature: signature as StdSignature,
                };
                const address = watch("walletAddress");
                const res = await legendServices.submitClaim({
                    claims: [
                        {
                            address,
                            permit,
                        },
                    ],
                });
                if (res.status === 200) {
                    setDataAirdrop({
                        amountClaim: "0",
                        buttonName: AIRDROP_BTN_NAME.CLAIMED,
                    });
                    dispatch(
                        addPopup({
                            content: {
                                txn: {
                                    success: true,
                                    summary: "Claim your airdrop successfully",
                                },
                            },
                        })
                    );
                }
            }
        } catch (error) {
            console.error(error);
            dispatch(
                addPopup({
                    content: {
                        txn: {
                            success: false,
                            summary: "Claim your airdrop unsuccessfully",
                        },
                    },
                })
            );
        }
    }, [
        dispatch,
        networkState.bIsConnected,
        transactionState.bIsPending,
        walletState.primary?.address,
        watch,
    ]);

    const handleCheckAnotherAddress = useCallback(() => {
        reset();
        setDataAirdrop(initialDataAirdrop);
    }, [reset]);

    const renderCheckStatusForm = useCallback(() => {
        return (
            <Panel onCloseBtnClicked={onCloseBtnClicked}>
                <form
                    className={cn(
                        "w-full text-white",
                        "flex flex-col items-stretch justify-start"
                    )}
                    onSubmit={handleSubmit(handleCheckAirdropStatus)}
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
                                !errors?.walletAddress && watch("walletAddress") ? (
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
                                !errors?.twitterProfile && watch("twitterProfile") ? (
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
                                !errors?.discordUserId && watch("discordUserId") ? (
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
                    <div className="mb-6 last:mb-0 flex flex-row flex-nowrap justify-center">
                        <div className="w-icon h-icon grow-0 shrink-0 animate-spin">
                            {isChecking && <LoadingIcon />}
                        </div>
                    </div>
                </form>
            </Panel>
        );
    }, [
        onCloseBtnClicked,
        handleSubmit,
        handleCheckAirdropStatus,
        errors?.walletAddress,
        errors?.twitterProfile,
        errors?.discordUserId,
        watch,
        register,
        isChecking,
        setValue,
    ]);

    const renderEligibleForm = useCallback(() => {
        return (
            <Panel onCloseBtnClicked={onCloseBtnClicked}>
                <div
                    className={cn(
                        "w-full text-white",
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
                        <div className="font-light text-center">{`You won ${dataAirdrop.amountClaim} $LNGD`}</div>
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
                            disabled={dataAirdrop.buttonName === AIRDROP_BTN_NAME.CLAIMED}
                        >
                            {dataAirdrop.buttonName}
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
    }, [
        dataAirdrop.amountClaim,
        dataAirdrop.buttonName,
        handleOnClaimAirdropBtnClicked,
        onCloseBtnClicked,
    ]);

    const renderNotEligibleForm = useCallback(() => {
        return (
            <Panel onCloseBtnClicked={onCloseBtnClicked}>
                <div
                    className={cn(
                        "w-full text-white",
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
                        <Button
                            className="font-bold"
                            bigness="xl"
                            onClick={handleCheckAnotherAddress}
                        >
                            Check Another Address
                        </Button>
                    </div>
                </div>
            </Panel>
        );
    }, [handleCheckAnotherAddress, onCloseBtnClicked]);

    const renderContent = useCallback(() => {
        switch (dataAirdrop.status) {
            case "eligible":
                return renderEligibleForm();

            case "not/eligible":
                return renderNotEligibleForm();

            default:
                return renderCheckStatusForm();
        }
    }, [dataAirdrop.status, renderCheckStatusForm, renderEligibleForm, renderNotEligibleForm]);

    return renderContent();
}
