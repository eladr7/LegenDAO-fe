import React, { useCallback } from "react";
import cn from "classnames";
import { Branding } from "./Branding";
import MenuIcon from "../icons/MenuIcon";
import { Link, useNavigate } from "react-router-dom";
import DiscordIcon from "../icons/DiscordIcon";
import TwitterIcon from "../icons/TwitterIcon";
import Button from "./Button";
import WalletIcon from "../icons/WalletIcon";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    toggleBalanceMenu,
    toggleCreationFormPanel,
    toggleSidebar,
} from "../../features/accessibility/accessibilitySlice";
import { walletAsyncActions } from "../../features/wallet/walletSlice";
import BalancesPanel from "../BalancesPanel";
import { SOCIAL_NETWORK_URL } from "../../constants/linkSocial";

const HEADER_TYPES = ["intro", "general", "collection"] as const;
export type THeaderType = typeof HEADER_TYPES[number];

type Props = {
    type?: THeaderType;
    domainNode?: React.ReactNode;
};

export function Header({ type, domainNode }: Props): React.ReactElement {
    const navigate = useNavigate();
    const walletState = useAppSelector((state) => state.wallet);
    const accessibilityState = useAppSelector((state) => state.accessibility);
    const dispatch = useAppDispatch();

    const isWalletConnected = useCallback(() => {
        return Boolean(walletState.primary);
    }, [walletState.primary]);

    const handleOnMenuBtnClicked = useCallback(() => {
        dispatch(toggleSidebar());
    }, [dispatch]);

    const handleOnWalletBtnClicked = useCallback(() => {
        dispatch(toggleBalanceMenu());
    }, [dispatch]);

    const handleOnConnectWalletBtnClicked = useCallback(() => {        
        dispatch(walletAsyncActions.connect({ delay: 200 }));
    }, [dispatch]);

    const handleOnGetLGNDBtnClicked = useCallback(() => {
        window.open("https://app.osmosis.zone/?from=ATOM&to=OSMO", "_blank");
    }, []);

    const handleOnCollectionsBtnClicked = useCallback(() => {
        navigate("/profile/collected");
    }, [navigate]);

    const handleOnCreateBtnClicked = useCallback(() => {
        dispatch(toggleCreationFormPanel(true));
    }, [dispatch]);

    const renderDomain = useCallback(() => {
        return domainNode;
    }, [domainNode]);

    const renderActions = useCallback(() => {
        return (
            <div className="flex flex-row flex-nowrap justify-end items-center">
                <div
                    className="w-icon h-icon grow-0 shrink-0 mr-8 last:mr-0"
                    onClick={() => {
                        window.open(SOCIAL_NETWORK_URL.discord, "_blank");
                    }}
                >
                    <DiscordIcon />
                </div>
                <div
                    className="w-icon h-icon grow-0 shrink-0 mr-8 last:mr-0"
                    onClick={() => {
                        window.open(SOCIAL_NETWORK_URL.twitter, "_blank");
                    }}
                >
                    <TwitterIcon />
                </div>
            </div>
        );
    }, []);

    const renderMenuBtn = useCallback(() => {
        return (
            <div
                className="w-icon h-icon grow-0 shrink-0 mr-8 last:mr-0 cursor-pointer"
                onClick={handleOnMenuBtnClicked}
            >
                <MenuIcon />
            </div>
        );
    }, [handleOnMenuBtnClicked]);

    const renderWalletBtn = useCallback(() => {
        if (isWalletConnected()) {
            return (
                <Button
                    bigness="sm"
                    bTransparent
                    onClick={handleOnWalletBtnClicked}
                    bActivated={accessibilityState.bBalanceMenuOn}
                    className={`${accessibilityState.bBalanceMenuOn && "z-10"}`}
                >
                    <div className="flex flex-row flex-nowrap justify-center items-center">
                        <div className="w-icon h-icon grow-0 shrink-0 mr-2 last:mr-0">
                            <WalletIcon
                                className={cn(
                                    accessibilityState.bBalanceMenuOn
                                        ? "fill-purple-700"
                                        : "fill-white",
                                    "group-hover:fill-purple-700 transition-[fill]"
                                )}
                            />
                        </div>
                        <span className="truncate max-w-[200px]" title={walletState.primary?.address}>{walletState.primary?.address}</span>
                    </div>
                </Button>
            );
        }
        return (
            <Button bigness="sm" bTransparent onClick={handleOnConnectWalletBtnClicked}>
                <div className="flex flex-row flex-nowrap justify-center items-center">
                    <div className="w-icon h-icon grow-0 shrink-0 mr-2 last:mr-0">
                        <WalletIcon className="fill-white group-hover:fill-purple-700 transition-[fill]" />
                    </div>
                    <span>Connect Wallet</span>
                </div>
            </Button>
        );
    }, [
        accessibilityState.bBalanceMenuOn,
        handleOnConnectWalletBtnClicked,
        handleOnWalletBtnClicked,
        isWalletConnected,
        walletState.primary?.address,
    ]);

    const renderIntroHeader = useCallback(() => {
        return (
            <header
                className={cn(
                    "absolute top-0 left-0 right-0 p-8 z-50",
                    "flex flex-row flex-nowrap justify-between items-center",
                    "text-white"
                )}
            >
                <div className="flex flex-row flex-nowrap items-center">
                    {renderMenuBtn()}
                    <Branding />
                </div>
                <div className="flex flex-row flex-nowrap justify-end items-center">
                    <nav className={cn("flex flex-row flex-nowrap mr-12 last:mr-0")}>
                        <Link className="mr-8 last:mr-0" to="/about">
                            About
                        </Link>
                        <Link className="mr-8 last:mr-0" to="/docs">
                            Docs
                        </Link>
                        <Link className="mr-8 last:mr-0" to="/faq">
                            FAQ
                        </Link>
                        <Link className="mr-8 last:mr-0" to="/governance">
                            Governance
                        </Link>
                        <Link className="mr-8 last:mr-0" to="/community">
                            Community
                        </Link>
                    </nav>
                    {renderActions()}
                </div>
            </header>
        );
    }, [renderActions, renderMenuBtn]);

    const renderGeneralHeader = useCallback((): React.ReactElement => {
        return (
            <header
                className={cn(
                    "absolute top-0 left-0 right-0 p-8 z-50",
                    "flex flex-row flex-nowrap justify-between items-center",
                    "text-white"
                )}
            >
                <div className="flex flex-row flex-nowrap items-center">
                    {renderMenuBtn()}
                    <Branding />
                </div>
                {renderDomain()}
                <div className="flex flex-row flex-nowrap justify-end items-center">
                    {renderActions()}
                    <div className="ml-8 first:ml-0 flex flex-row flex-nowrap">
                        <Button bigness="sm" onClick={handleOnGetLGNDBtnClicked}>
                            Get $LGND
                        </Button>
                        <div className="relative ml-4 first:ml-0">
                            {renderWalletBtn()}
                            {accessibilityState.bBalanceMenuOn && (
                                <div className="absolute top-input-lg right-0">
                                    <div
                                        className={cn(
                                            "fixed w-full h-screen left-0 top-0",
                                            "bg-slate-900/70"
                                        )}
                                    ></div>
                                    <BalancesPanel />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>
        );
    }, [
        accessibilityState.bBalanceMenuOn,
        handleOnGetLGNDBtnClicked,
        renderActions,
        renderDomain,
        renderMenuBtn,
        renderWalletBtn,
    ]);

    const renderCollectionHeader = useCallback((): React.ReactElement => {
        return (
            <header
                className={cn(
                    "absolute top-0 left-0 right-0 p-8 z-50",
                    "flex flex-row flex-nowrap justify-between items-center",
                    "text-white"
                )}
            >
                <div className="flex flex-row flex-nowrap items-center">
                    {renderMenuBtn()}
                    <Branding />
                </div>
                <div className="ml-8 first:ml-0 grow flex flex-row flex-nowrap justify-between items-center">
                    {renderActions()}
                    <div className="ml-8 first:ml-0 flex flex-row flex-nowrap">
                        <Button bigness="sm" bTransparent onClick={handleOnGetLGNDBtnClicked}>
                            Get $LGND
                        </Button>
                        <Button bigness="sm" bTransparent onClick={handleOnCollectionsBtnClicked}>
                            Collections
                        </Button>
                        <Button bigness="sm" bTransparent onClick={handleOnCreateBtnClicked}>
                            Create
                        </Button>
                        <div className="relative ml-4 first:ml-0">
                            {renderWalletBtn()}
                            {accessibilityState.bBalanceMenuOn && (
                                <div className="absolute top-input-lg right-0">
                                    <div
                                        className={cn(
                                            "fixed w-full h-screen left-0 top-0",
                                            "bg-slate-900/70"
                                        )}
                                    ></div>
                                    <BalancesPanel />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>
        );
    }, [
        accessibilityState.bBalanceMenuOn,
        handleOnCollectionsBtnClicked,
        handleOnCreateBtnClicked,
        handleOnGetLGNDBtnClicked,
        renderActions,
        renderMenuBtn,
        renderWalletBtn,
    ]);

    const renderContent = useCallback((): React.ReactElement => {
        switch (type) {
            case "intro":
                return renderIntroHeader();

            case "general":
                return renderGeneralHeader();

            case "collection":
                return renderCollectionHeader();

            default:
                return renderIntroHeader();
        }
    }, [renderCollectionHeader, renderGeneralHeader, renderIntroHeader, type]);

    return renderContent();
}
