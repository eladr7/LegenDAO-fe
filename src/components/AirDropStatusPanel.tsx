import React, { useCallback, useRef, useState } from "react";
import cn from "classnames";
import Panel from "./commons/Panel";
import Button from "./commons/Button";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setStatus } from "../features/airdrop/airdropSlice";
import CheckIcon from "./icons/CheckIcon";
import Input from "./commons/Input";

type Props = {
    onCloseBtnClicked?: React.MouseEventHandler<HTMLElement>;
};

const REGEXP_TWITTER_PROFILE = "http(?:s)?://(?:www.)?twitter.com/([a-zA-Z0-9_]+)";
const REGEXP_DISCORD_USER_ID = "^.{3,32}#[0-9]{4}$";

export default function AirDropStatusPanel({ onCloseBtnClicked }: Props): React.ReactElement {
    const rfForm = useRef<HTMLFormElement>(null);
    const rfWalletAddressInput = useRef<HTMLInputElement>(null);
    const rfTwitterProfileInput = useRef<HTMLInputElement>(null);
    const rfDiscordUserIdInput = useRef<HTMLInputElement>(null);

    const [walletAddress, setWalletAddress] = useState<string>("");
    const [twitterProfile, setTwitterProfile] = useState<string>("");
    const [discordUserId, setDiscordUserId] = useState<string>("");

    const [walletAddressErrorMsg, setWalletAddressErrorMsg] = useState<string | undefined>(
        undefined
    );
    const [twitterProfileErrorMsg, setTwitterProfileErrorMsg] = useState<string | undefined>(
        undefined
    );
    const [discordUserIdErrorMsg, setDiscordUserIdErrorMsg] = useState<string | undefined>(
        undefined
    );

    const airdropState = useAppSelector((state) => state.airdrop);
    const dispatch = useAppDispatch();

    const validateWalletAddress = useCallback(() => {
        return Boolean(walletAddress);
    }, [walletAddress]);

    const validateTwitterProfile = useCallback(() => {
        const regexp = new RegExp(REGEXP_TWITTER_PROFILE);
        return regexp.test(twitterProfile);
    }, [twitterProfile]);

    const validateDiscordUserId = useCallback(() => {
        const regexp = new RegExp(REGEXP_DISCORD_USER_ID);
        return regexp.test(discordUserId);
    }, [discordUserId]);

    const handleOnWalletAddressChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (!rfWalletAddressInput.current) return;
        if (rfWalletAddressInput.current.checkValidity()) {
            setWalletAddressErrorMsg(undefined);
        }
        const value = e.target.value;
        setWalletAddress(value);
    }, []);

    const handleOnTwitterProfileChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (!rfTwitterProfileInput.current) return;
        if (rfTwitterProfileInput.current.checkValidity()) {
            setTwitterProfileErrorMsg(undefined);
        }
        const value = e.target.value;
        setTwitterProfile(value);
    }, []);

    const handleOnDiscordUserIdChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (!rfDiscordUserIdInput.current) return;
        if (rfDiscordUserIdInput.current.checkValidity()) {
            setDiscordUserIdErrorMsg(undefined);
        }
        const value = e.target.value;
        setDiscordUserId(value);
    }, []);

    const handleOnCheckBtnClicked = useCallback(() => {
        if (!rfForm.current) return;
        if (!rfForm.current.checkValidity()) {
            if (!rfWalletAddressInput.current?.reportValidity()) {
                setWalletAddressErrorMsg("Address not valid, please enter a valid address");
            } else {
                setWalletAddressErrorMsg(undefined);
            }

            if (!rfTwitterProfileInput.current?.reportValidity()) {
                setTwitterProfileErrorMsg(
                    "Twitter profile is not valid, please enter a valid profile"
                );
            } else {
                setTwitterProfileErrorMsg(undefined);
            }

            if (!rfDiscordUserIdInput.current?.reportValidity()) {
                setDiscordUserIdErrorMsg(
                    "Discord user ID is not valid, please enter a valid ID"
                );
            } else {
                setDiscordUserIdErrorMsg(undefined);
            }

            return;
        }
        dispatch(setStatus("eligible"));
    }, [dispatch]);

    const renderCheckStatusForm = useCallback(() => {
        return (
            <Panel onCloseBtnClicked={onCloseBtnClicked}>
                <form
                    ref={rfForm}
                    className={cn(
                        "w-[500px] text-white",
                        "flex flex-col items-stretch justify-start"
                    )}
                    onSubmit={(e: React.FormEvent) => {
                        e.preventDefault();
                    }}
                >
                    <h1 className="mb-6 last:mb-0 text-2xl font-bold">LGND Airdrop Status</h1>

                    <div className="mb-4 last:mb-0">
                        {walletAddressErrorMsg && (
                            <div className="mb-2 last:mb-0 text-red-500">
                                {walletAddressErrorMsg}
                            </div>
                        )}
                        <Input
                            refV={rfWalletAddressInput}
                            bigness="xl"
                            className="w-full"
                            rightIconNode={
                                validateWalletAddress() ? (
                                    <CheckIcon className="fill-green-500" />
                                ) : null
                            }
                            placeholder="Wallet Address: Secret | Cosmos | Terra"
                            value={walletAddress}
                            onChange={handleOnWalletAddressChanged}
                            required
                        />
                    </div>

                    <div className="mb-4 last:mb-0">
                        {twitterProfileErrorMsg && (
                            <div className="mb-2 last:mb-0 text-red-500">
                                {twitterProfileErrorMsg}
                            </div>
                        )}
                        <Input
                            refV={rfTwitterProfileInput}
                            bigness="xl"
                            className="w-full"
                            rightIconNode={
                                validateTwitterProfile() ? (
                                    <CheckIcon className="fill-green-500" />
                                ) : null
                            }
                            placeholder="Twitter Profile"
                            pattern={REGEXP_TWITTER_PROFILE}
                            value={twitterProfile}
                            onChange={handleOnTwitterProfileChanged}
                            required
                        />
                    </div>

                    <div className="mb-4 last:mb-0">
                        {discordUserIdErrorMsg && (
                            <div className="mb-2 last:mb-0 text-red-500">
                                {discordUserIdErrorMsg}
                            </div>
                        )}
                        <Input
                            refV={rfDiscordUserIdInput}
                            bigness="xl"
                            className="w-full"
                            rightIconNode={
                                validateDiscordUserId() ? (
                                    <CheckIcon className="fill-green-500" />
                                ) : null
                            }
                            placeholder="Discord User ID"
                            value={discordUserId}
                            onChange={handleOnDiscordUserIdChanged}
                            pattern={REGEXP_DISCORD_USER_ID}
                            required
                        />
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
                </form>
            </Panel>
        );
    }, [
        discordUserId,
        discordUserIdErrorMsg,
        handleOnCheckBtnClicked,
        handleOnDiscordUserIdChanged,
        handleOnTwitterProfileChanged,
        handleOnWalletAddressChanged,
        onCloseBtnClicked,
        twitterProfile,
        twitterProfileErrorMsg,
        validateDiscordUserId,
        validateTwitterProfile,
        validateWalletAddress,
        walletAddress,
        walletAddressErrorMsg,
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
    }, [onCloseBtnClicked]);

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
