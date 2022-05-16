import React, { useCallback, useState } from "react";
import imgYetiHead01 from "../../assets/images/yeti-head-01.png";
import DiscordIcon from "../icons/DiscordIcon";
import TwitterIcon from "../icons/TwitterIcon";
import Input from "./Input";
import { SOCIAL_NETWORK_URL } from "../../constants/linkSocial";
import Button from "./Button";
import { useForm } from "react-hook-form";
import validator from "../../helpers/validator";
import { useDispatch } from "react-redux";
import { addPopup } from "../../features/application/applicationSlice";

interface IFormEmail {
    email: string;
}

export function Footer(): React.ReactElement {
    const dispatch = useDispatch();
    const [showInputEmail, setShowInputEmail] = useState<boolean>(false);
    const {
        handleSubmit,
        register,
        setValue,
        reset,
        watch,
        formState: { errors },
    } = useForm<IFormEmail>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        defaultValues: {
            email: "",
        },
    });

    const handleSubmitEmail = useCallback(
        (data: IFormEmail) => {
            if (data?.email) {
                dispatch(
                    addPopup({
                        content: {
                            txn: {
                                success: true,
                                summary:
                                    "Thanks for contacting us! We will be in touch with you shortly.",
                            },
                        },
                    })
                );
                reset();
            }
        },
        [dispatch, reset]
    );

    const handleShowInputEmail = useCallback(() => {
        setShowInputEmail(true);
    }, []);

    return (
        <div className="text-white flex flex-col justify-between items-stretch">
            <div className="p-8 tablet-2:p-0 tablet-2:h-footer bg-[#08152a] flex flex-col tablet-2:flex-row justify-around items-center">
                <div className="mb-8 tablet-2:mb-0 flex flex-row flex-nowrap justify-start items-center">
                    <div
                        className="bg-cover bg-center bg-no-repeat w-[120px] h-[100px] tablet-2:w-[150px] tablet-2:h-[120px] mr-4 tablet-2:mr-8 last:mr-0"
                        style={{ backgroundImage: `url(${imgYetiHead01})` }}
                    ></div>
                    <div className="flex flex-col flex-nowrap">
                        <div className="font-semibold text-sm tablet-2:text-2xl whitespace-nowrap">
                            The Legendao
                        </div>
                        <div className="font-bold text-2xl tablet-2:text-4xl leading-none">
                            Universe
                        </div>
                    </div>
                </div>
                {showInputEmail === false && (
                    <div className="tablet-2:hidden mb-8 w-full">
                        <Button
                            onClick={handleShowInputEmail}
                            className="!w-full"
                            bigness="sm"
                            bTransparent
                        >
                            Contact Us
                        </Button>
                    </div>
                )}
                <div className="flex flex-col flex-nowrap items-center">
                    <div className="font-normal tablet:font-bold mb-4 last:mb-0">
                        Join our community
                    </div>
                    <div className="flex flex-row flex-nowrap items-center">
                        <div
                            className="w-icon h-icon tablet:w-icon-lg tablet:h-iconw-icon-lg grow-0 shrink-0 mr-10 last:mr-0 opacity-80"
                            onClick={() => {
                                window.open(SOCIAL_NETWORK_URL.discord, "_blank");
                            }}
                        >
                            <DiscordIcon className="fill-slate-300" />
                        </div>
                        <div
                            className="w-icon h-icon tablet:w-icon-lg tablet:h-iconw-icon-lg grow-0 shrink-0 mr-10 last:mr-0 opacity-80"
                            onClick={() => {
                                window.open(SOCIAL_NETWORK_URL.twitter, "_blank");
                            }}
                        >
                            <TwitterIcon className="fill-slate-300" />
                        </div>
                        {/* <div
                            className="w-icon-lg h-iconw-icon-lg grow-0 shrink-0 mr-10 last:mr-0"
                            onClick={() => {
                                window.open(SOCIAL_NETWORK_URL.instagram, "_blank");
                            }}
                        >
                            <InstagramIcon className="fill-slate-300" />
                        </div>
                        <div
                            className="w-icon-lg h-iconw-icon-lg grow-0 shrink-0 mr-10 last:mr-0"
                            onClick={() => {
                                window.open(SOCIAL_NETWORK_URL.telegram, "_blank");
                            }}
                        >
                            <TelegramIcon className="fill-slate-300" />
                        </div> */}
                    </div>
                </div>
                <div className="hidden tablet-2:flex flex-col flex-nowrap items-stretch">
                    <div className="font-bold mb-1 last:mb-0">Stay in the loop</div>
                    <div className="opacity-50 max-w-[450px] font-light mb-3 last:mb-0 text-sm">
                        Join our mailing list to be the first one to hear about{" "}
                        <span className="whitespace-nowrap">new collection</span>, feature releases
                        tips and tricks.
                    </div>
                    <form onSubmit={handleSubmit(handleSubmitEmail)}>
                        <div className="flex justify-between items-center">
                            <div className="grow flex flex-col items-stretch">
                                <Input
                                    className="text-slate-700"
                                    backgroundColor="bg-white"
                                    type="text"
                                    placeholder="Your email"
                                    value={watch("email")}
                                    {...register("email", {
                                        validate: validator.validateForm.email,
                                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                                            setValue("email", e.target.value);
                                        },
                                    })}
                                />
                            </div>
                            <div className="ml-2 first:mr-0">
                                <Button type="submit">
                                    <span className="px-4">Submit</span>
                                </Button>
                            </div>
                        </div>
                        {errors?.email && (
                            <label className="leading-8 text-red-500">
                                {errors?.email.message}
                            </label>
                        )}
                    </form>
                </div>
                {showInputEmail === true && (
                    <div className="tablet-2:hidden mt-4 flex flex-col flex-wrap items-center">
                        <div className="font-normal tablet:font-bold mb-4 last:mb-0">
                            Stay in the loop
                        </div>
                        <div className="opacity-50 max-w-[300px] tablet:max-w-[400px] font-light mb-3 last:mb-0 text-sm">
                            Join our mailing list to be the first one to hear about{" "}
                            <span className="whitespace-nowrap">new collection</span>, feature
                            releases tips and tricks.
                        </div>
                        <form onSubmit={handleSubmit(handleSubmitEmail)}>
                            <div className="flex justify-between flex-col items-center ">
                                <div className="grow flex flex-col items-stretch w-[300px] tablet:w-[400px] mb-2">
                                    <Input
                                        className="text-slate-700"
                                        backgroundColor="#FFFFFF"
                                        type="text"
                                        placeholder="Your email"
                                        value={watch("email")}
                                        {...register("email", {
                                            validate: validator.validateForm.email,
                                            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                                                setValue("email", e.target.value);
                                            },
                                        })}
                                    />
                                </div>
                                <div className="ml-0 first:mr-0">
                                    <Button type="submit">
                                        <span className="px-4 w-[264px] tablet:w-[364px]">
                                            Submit
                                        </span>
                                    </Button>
                                </div>
                            </div>
                            {errors?.email && (
                                <label className="leading-8 text-red-500">
                                    {errors?.email.message}
                                </label>
                            )}
                        </form>
                    </div>
                )}
            </div>

            <div className="bg-[#020c20] h-20 flex justify-center items-center">
                <span className="opacity-50 font-light">Copyright 2022, SCRT Labs</span>
            </div>
        </div>
    );
}
