import React, { useCallback } from "react";
import cn from "classnames";
import { Branding } from "./Branding";
import MenuIcon from "../icons/MenuIcon";
import { Link } from "react-router-dom";
import DiscordIcon from "../icons/DiscordIcon";
import TwitterIcon from "../icons/TwitterIcon";
import Button from "./Button";
import WalletIcon from "../icons/WalletIcon";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toggleBalanceMenu, toggleSidebar } from "../../features/accessibility/accessibilitySlice";
import Wallet from "../../classes/Wallet";
import { setPrimaryAddress } from "../../features/wallet/walletSlice";

const HEADER_TYPES = ["intro", "general", "collection"] as const;
export type THeaderType = typeof HEADER_TYPES[number];

type Props = {
    type?: THeaderType;
};

export function Header({ type }: Props): React.ReactElement {
    const walletState = useAppSelector((state) => state.wallet);
    const dispatch = useAppDispatch();

    const isWalletConnected = useCallback(() => {
        const wallet = new Wallet(walletState.primary);
        return wallet.isConnected();
    }, [walletState.primary]);

    const handleOnMenuBtnClicked = useCallback(() => {
        dispatch(toggleSidebar());
    }, [dispatch]);

    const handleOnWalletBtnClicked = useCallback(() => {
        dispatch(toggleBalanceMenu());
    }, [dispatch]);

    const handleOnConnectWalletBtnClicked = useCallback(() => {
        dispatch(setPrimaryAddress("0x_wallet_address"));
    }, [dispatch]);

    const renderActions = useCallback(() => {
        return (
            <div className="flex flex-row flex-nowrap justify-end items-center">
                <div className="w-icon h-icon grow-0 shrink-0 mr-8 last:mr-0">
                    <DiscordIcon />
                </div>
                <div className="w-icon h-icon grow-0 shrink-0 mr-8 last:mr-0">
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
                <Button bigness="sm" bTransparent onClick={handleOnWalletBtnClicked}>
                    <div className="flex flex-row flex-nowrap justify-center items-center">
                        <div className="w-icon h-icon grow-0 shrink-0 mr-2 last:mr-0">
                            <WalletIcon />
                        </div>
                        <span>{walletState.primary.address}</span>
                    </div>
                </Button>
            );
        }
        return (
            <Button bigness="sm" bTransparent onClick={handleOnConnectWalletBtnClicked}>
                <div className="flex flex-row flex-nowrap justify-center items-center">
                    <div className="w-icon h-icon grow-0 shrink-0 mr-2 last:mr-0">
                        <WalletIcon />
                    </div>
                    <span>Connect Wallet</span>
                </div>
            </Button>
        );
    }, [
        handleOnConnectWalletBtnClicked,
        handleOnWalletBtnClicked,
        isWalletConnected,
        walletState.primary.address,
    ]);

    const renderIntroHeader = useCallback(() => {
        return (
            <header
                className={cn(
                    "p-8",
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
                        <Link className="mr-8 last:mr-0" to="/">
                            Docs
                        </Link>
                        <Link className="mr-8 last:mr-0" to="/">
                            FAQ
                        </Link>
                        <Link className="mr-8 last:mr-0" to="/">
                            Governance
                        </Link>
                        <Link className="mr-8 last:mr-0" to="/">
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
                    "p-8",
                    "flex flex-row flex-nowrap justify-between items-center",
                    "text-white"
                )}
            >
                <div className="flex flex-row flex-nowrap items-center">
                    {renderMenuBtn()}
                    <Branding />
                </div>
                <div className="flex flex-row flex-nowrap justify-end items-center">
                    {renderActions()}
                    <div className="ml-8 first:ml-0 flex flex-row flex-nowrap">
                        <Button bigness="sm">Get $LGND</Button>
                        {renderWalletBtn()}
                    </div>
                </div>
            </header>
        );
    }, [renderActions, renderMenuBtn, renderWalletBtn]);

    const renderCollectionHeader = useCallback((): React.ReactElement => {
        return (
            <header
                className={cn(
                    "p-8",
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
                        <Button bigness="sm" bTransparent>
                            Get $LGND
                        </Button>
                        <Button bigness="sm" bTransparent>
                            Collections
                        </Button>
                        <Button bigness="sm" bTransparent>
                            Create
                        </Button>
                        {renderWalletBtn()}
                    </div>
                </div>
            </header>
        );
    }, [renderActions, renderMenuBtn, renderWalletBtn]);

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
