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
    accessibilityActions,
    toggleBalanceMenu,
    toggleCreationFormPanel,
    toggleDepositPanel,
    toggleSidebar,
    toggleWithdrawPanel,
} from "../../features/accessibility/accessibilitySlice";
import { walletActions } from "../../features/wallet/walletSlice";
import BalancesPanel from "../BalancesPanel";
import { SOCIAL_NETWORK_URL } from "../../constants/linkSocial";
import { shortenAddress } from "../../helpers/format";
import ArrowDownIcon from "../icons/ArrowDownIcon";
import { networkActions } from "../../features/network/networkSlice";

const HEADER_TYPES = ["intro", "general", "collection"] as const;
export type THeaderType = typeof HEADER_TYPES[number];

type Props = {
    bAlwaysOnTop?: boolean;
    bMenuOn?: boolean;
    type?: THeaderType;
    domainNode?: React.ReactNode;
};

export function Header({
    bAlwaysOnTop,
    bMenuOn = true,
    type,
    domainNode,
}: Props): React.ReactElement {
    const navigate = useNavigate();
    const walletState = useAppSelector((state) => state.wallet);
    const networkState = useAppSelector((state) => state.network);
    const accessibilityState = useAppSelector((state) => state.accessibility);
    const dispatch = useAppDispatch();
    const isWalletConnected = useCallback(() => {
        return Boolean(walletState.primary);
    }, [walletState.primary]);

    const handleOnMenuBtnClicked = useCallback(() => {
        dispatch(toggleSidebar());
    }, [dispatch]);

    const handleOnWalletBtnClicked = useCallback(() => {
        if (accessibilityState.bWithdrawPanelOn || accessibilityState.bDepositPanelOn) {
            dispatch(toggleWithdrawPanel(false));
            dispatch(toggleDepositPanel(false));
            return;
        }
        dispatch(accessibilityActions.toggleCreationFormPanel(false));
        dispatch(toggleBalanceMenu());
    }, [accessibilityState.bDepositPanelOn, accessibilityState.bWithdrawPanelOn, dispatch]);

    const handleOnConnectWalletBtnClicked = useCallback(() => {
        if (!networkState.bIsConnected) {
            dispatch(networkActions.tryConnecting());
        } else {
            dispatch(walletActions.getSigner());
        }
    }, [dispatch, networkState.bIsConnected]);

    const handleOnGetLGNDBtnClicked = useCallback(() => {
        window.open("https://app.osmosis.zone/?from=ATOM&to=OSMO", "_blank");
    }, []);

    const handleOnCollectionsBtnClicked = useCallback(() => {
        navigate("/collections/o");
    }, [navigate]);

    const handleOnCreateBtnClicked = useCallback(() => {
        dispatch(toggleCreationFormPanel(true));
    }, [dispatch]);

    const handleOnBalancesPanelOuterClicked = useCallback(() => {
        dispatch(accessibilityActions.toggleBalanceMenu(false));
    }, [dispatch]);

    const renderDomain = useCallback(() => {
        return domainNode;
    }, [domainNode]);

    const renderActions = useCallback(() => {
        return (
            <div className="flex flex-row flex-nowrap justify-end items-center">
                <div
                    className="w-icon h-icon grow-0 shrink-0 mr-8 last:mr-0 opacity-80"
                    onClick={() => {
                        window.open(SOCIAL_NETWORK_URL.discord, "_blank");
                    }}
                >
                    <DiscordIcon />
                </div>
                <div
                    className="w-icon h-icon grow-0 shrink-0 mr-8 last:mr-0 opacity-80"
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
        if (!bMenuOn) return null;
        return (
            <div
                className="w-icon h-icon grow-0 shrink-0 mr-8 last:mr-0 cursor-pointer"
                onClick={handleOnMenuBtnClicked}
            >
                <MenuIcon />
            </div>
        );
    }, [bMenuOn, handleOnMenuBtnClicked]);

    const renderWalletBtn = useCallback(() => {
        let buttonContent: React.ReactNode = (
            <div className="flex flex-row flex-nowrap justify-center items-center">
                <div className="w-icon h-icon grow-0 shrink-0 mr-2 last:mr-0">
                    <WalletIcon
                        className={cn(
                            accessibilityState.bBalanceMenuOn ? "fill-purple-700" : "fill-white",
                            "group-hover:fill-purple-700 transition-[fill]"
                        )}
                    />
                </div>
                <span
                    className={cn("truncate max-w-[200px]", {
                        "hidden tablet-2:inline-block": !accessibilityState.bBalanceMenuOn,
                    })}
                    title={walletState.primary?.address}
                >
                    {shortenAddress(walletState.primary?.address)}
                </span>
                {!accessibilityState.bBalanceMenuOn && (
                    <span className="tablet-2:hidden">Wallet</span>
                )}
            </div>
        );

        if (accessibilityState.bWithdrawPanelOn) {
            buttonContent = (
                <div className="flex flex-row flex-nowrap justify-center items-center">
                    <div className="hidden tablet-2:block w-icon h-icon grow-0 shrink-0 mr-2 last:mr-0">
                        <WalletIcon
                            className={cn(
                                accessibilityState.bBalanceMenuOn
                                    ? "fill-purple-700"
                                    : "fill-white",
                                "group-hover:fill-purple-700 transition-[fill]"
                            )}
                        />
                    </div>
                    <div className="tablet-2:hidden w-icon-xs h-icon-xw-icon-xs grow-0 shrink-0 mr-2 last:mr-0 rotate-90">
                        <ArrowDownIcon
                            className={cn(
                                accessibilityState.bBalanceMenuOn
                                    ? "fill-purple-700"
                                    : "fill-white",
                                "group-hover:fill-purple-700 transition-[fill]"
                            )}
                        />
                    </div>
                    <span
                        className={cn("truncate max-w-[200px]", "hidden tablet-2:inline-block")}
                        title={walletState.primary?.address}
                    >
                        {shortenAddress(walletState.primary?.address)}
                    </span>
                    <span className="tablet-2:hidden">Withdraw</span>
                </div>
            );
        }

        if (accessibilityState.bDepositPanelOn) {
            buttonContent = (
                <div className="flex flex-row flex-nowrap justify-center items-center">
                    <div className="hidden tablet-2:block w-icon h-icon grow-0 shrink-0 mr-2 last:mr-0">
                        <WalletIcon
                            className={cn(
                                accessibilityState.bBalanceMenuOn
                                    ? "fill-purple-700"
                                    : "fill-white",
                                "group-hover:fill-purple-700 transition-[fill]"
                            )}
                        />
                    </div>
                    <div className="tablet-2:hidden w-icon-xs h-icon-xw-icon-xs grow-0 shrink-0 mr-2 last:mr-0 rotate-90">
                        <ArrowDownIcon
                            className={cn(
                                accessibilityState.bBalanceMenuOn
                                    ? "fill-purple-700"
                                    : "fill-white",
                                "group-hover:fill-purple-700 transition-[fill]"
                            )}
                        />
                    </div>
                    <span
                        className={cn("truncate max-w-[200px]", "hidden tablet-2:inline-block")}
                        title={walletState.primary?.address}
                    >
                        {shortenAddress(walletState.primary?.address)}
                    </span>
                    <span className="tablet-2:hidden">Deposit</span>
                </div>
            );
        }

        if (isWalletConnected()) {
            return (
                <Button
                    bigness="sm"
                    bTransparent
                    onClick={handleOnWalletBtnClicked}
                    bActivated={accessibilityState.bBalanceMenuOn}
                    className={cn(
                        { "z-10": accessibilityState.bBalanceMenuOn },
                        "!text-sm !h-8 !px-2 tablet-2:!h-input-sm tablet-2:!px-4 tablet-2:!text-base !border-[#B2BAC7] !opacity-80"
                    )}
                >
                    {buttonContent}
                </Button>
            );
        }

        return (
            <Button bigness="sm" bTransparent onClick={handleOnConnectWalletBtnClicked}>
                <div className="flex flex-row flex-nowrap justify-center items-center">
                    <div className="w-icon h-icon grow-0 shrink-0 mr-2 last:mr-0">
                        <WalletIcon className="fill-white group-hover:fill-purple-700 transition-[fill]" />
                    </div>

                    <span className="hidden tablet-2:inline-block">Connect Wallet</span>
                    <span className="tablet-2:hidden">Wallet</span>
                </div>
            </Button>
        );
    }, [
        accessibilityState.bBalanceMenuOn,
        accessibilityState.bDepositPanelOn,
        accessibilityState.bWithdrawPanelOn,
        handleOnConnectWalletBtnClicked,
        handleOnWalletBtnClicked,
        isWalletConnected,
        walletState.primary?.address,
    ]);

    const renderWalletZone = useCallback(() => {
        return (
            <div
                className={cn(
                    "static flex items-center tablet-2:block",
                    "tablet-2:relative tablet-2:ml-8 tablet-2:first:ml-0"
                )}
            >
                {renderWalletBtn()}
                {!accessibilityState.bBalanceMenuOn && (
                    <div className="ml-4 first:mr-0 tablet-2:hidden">{renderMenuBtn()}</div>
                )}
                {accessibilityState.bBalanceMenuOn && (
                    <div
                        className={cn(
                            "absolute top-header left-0 right-0 p-4 pt-0 tablet-2:pt-4",
                            "tablet-2:p-0 tablet:left-auto tablet-2:top-input-lg",
                            {
                                "hidden tablet-2:block":
                                    accessibilityState.bDepositPanelOn ||
                                    accessibilityState.bWithdrawPanelOn,
                            }
                        )}
                    >
                        <div
                            className={cn("fixed w-full h-screen left-0 top-0", "bg-slate-900/80")}
                            onClick={handleOnBalancesPanelOuterClicked}
                        ></div>
                        <BalancesPanel />
                    </div>
                )}
            </div>
        );
    }, [
        accessibilityState.bBalanceMenuOn,
        accessibilityState.bDepositPanelOn,
        accessibilityState.bWithdrawPanelOn,
        handleOnBalancesPanelOuterClicked,
        renderMenuBtn,
        renderWalletBtn,
    ]);

    const renderIntroHeader = useCallback(() => {
        return (
            <header
                className={cn(
                    "absolute top-0 left-0 right-0 p-4 tablet-2:py-8",
                    bAlwaysOnTop ? "z-[200] tablet-2:z-[100]" : "z-50",
                    "flex flex-col flex-nowrap justify-start items-start",
                    "text-white",
                    "tablet-2:px-16 tablet-2:flex-row tablet-2:justify-between tablet-2:items-center"
                )}
            >
                <div className="flex flex-row flex-nowrap items-center">
                    <Branding />
                </div>
                <div
                    className={cn(
                        "hidden flex-row flex-nowrap justify-end items-center",
                        "tablet-2:flex"
                    )}
                >
                    <nav
                        className={cn(
                            "flex flex-row flex-nowrap mr-12 last:mr-0",
                            "font-emphasis text-xl"
                        )}
                    >
                        <Link className="mr-8 last:mr-0 opacity-80 hover:opacity-100" to="/">
                            Home
                        </Link>
                        <Link className="mr-8 last:mr-0 opacity-80 hover:opacity-100" to="/about">
                            About
                        </Link>
                        <Link className="mr-8 last:mr-0 opacity-80 hover:opacity-100" to="/docs">
                            Docs
                        </Link>
                        <Link className="mr-8 last:mr-0 opacity-80 hover:opacity-100" to="/faq">
                            FAQ
                        </Link>
                        <Link
                            className="mr-8 last:mr-0 opacity-80 hover:opacity-100"
                            to="/governance"
                        >
                            Governance
                        </Link>
                        <Link
                            className="mr-8 last:mr-0 opacity-80 hover:opacity-100"
                            to="/community"
                        >
                            Community
                        </Link>
                    </nav>
                    {renderActions()}
                </div>
            </header>
        );
    }, [bAlwaysOnTop, renderActions]);

    const renderGeneralHeader = useCallback((): React.ReactElement => {
        return (
            <header
                className={cn(
                    "absolute top-0 left-0 right-0 p-4 tablet-2:py-8",
                    bAlwaysOnTop ? "z-[200] tablet-2:z-[100]" : "z-50",
                    "flex flex-row flex-nowrap justify-between items-center",
                    "text-white",
                    "tablet-2:px-16"
                )}
            >
                <div className="flex flex-row flex-nowrap items-center">
                    <div className="mr-8 last:mr-0 hidden tablet-2:block">{renderMenuBtn()}</div>
                    <Branding />
                </div>
                <div className="hidden desktop-2:block">{renderDomain()}</div>
                <div className="flex flex-row flex-nowrap justify-end items-center">
                    <div className="hidden tablet-2:block">{renderActions()}</div>
                    <div className="ml-2 tablet-2:ml-8 first:ml-0 flex flex-row flex-nowrap">
                        <Button
                            className="hidden tablet-2:flex"
                            bigness="sm"
                            onClick={handleOnGetLGNDBtnClicked}
                        >
                            Get $LGND
                        </Button>
                        {renderWalletZone()}
                    </div>
                </div>
            </header>
        );
    }, [
        bAlwaysOnTop,
        handleOnGetLGNDBtnClicked,
        renderActions,
        renderDomain,
        renderMenuBtn,
        renderWalletZone,
    ]);

    const renderCollectionHeader = useCallback((): React.ReactElement => {
        return (
            <header
                className={cn(
                    "absolute top-0 left-0 right-0 p-4 tablet-2:py-8",
                    bAlwaysOnTop ? "z-[200] tablet-2:z-[100]" : "z-50",
                    "flex flex-row flex-nowrap justify-between items-center",
                    "text-white bg-[#001b47] tablet-2:bg-transparent",
                    "tablet:px-16"
                )}
            >
                <div className="flex flex-row flex-nowrap items-center">
                    <div className="mr-8 last:mr-0 hidden tablet-2:block">{renderMenuBtn()}</div>
                    <Branding />
                </div>
                <div className="ml-2 tablet:ml-8 first:ml-0 grow flex flex-row flex-nowrap justify-end tablet:justify-between items-center">
                    <div className="hidden tablet:block">{renderActions()}</div>
                    <div className="ml-0 tablet:ml-8 first:ml-0 flex flex-row flex-nowrap">
                        <Button
                            className="hidden w-[124.38px] desktop:flex !border-[#B2BAC7] !opacity-80"
                            bigness="sm"
                            bTransparent
                            onClick={handleOnGetLGNDBtnClicked}
                        >
                            Get $LGND
                        </Button>
                        <Button
                            className="hidden w-[124.38px] desktop:flex !border-[#B2BAC7] !opacity-80"
                            bigness="sm"
                            bTransparent
                            onClick={handleOnCollectionsBtnClicked}
                        >
                            Collections
                        </Button>
                        <Button
                            className="hidden w-[124.38px] desktop:flex !border-[#B2BAC7] !opacity-80"
                            bigness="sm"
                            bTransparent
                            onClick={handleOnCreateBtnClicked}
                        >
                            Create
                        </Button>
                        {renderWalletZone()}
                    </div>
                </div>
            </header>
        );
    }, [
        bAlwaysOnTop,
        handleOnCollectionsBtnClicked,
        handleOnCreateBtnClicked,
        handleOnGetLGNDBtnClicked,
        renderActions,
        renderMenuBtn,
        renderWalletZone,
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
