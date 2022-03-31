import React, { useCallback } from "react";
import cn from "classnames";
import { Branding } from "./Branding";
import MenuIcon from "../icons/MenuIcon";
import { Link } from "react-router-dom";
import DiscordIcon from "../icons/DiscordIcon";
import TwitterIcon from "../icons/TwitterIcon";
import Button from "./Button";
import WalletIcon from "../icons/WalletIcon";

type Props = {
    type?: "intro" | "general" | "collection";
};

export function Header({ type }: Props): React.ReactElement {
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
            <div className="w-icon h-icon grow-0 shrink-0 mr-8 last:mr-0">
                <MenuIcon />
            </div>
        );
    }, []);

    const renderIntroHeader = useCallback(() => {
        return (
            <header
                className={cn(
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
                        <Link className="mr-8 last:mr-0" to="about">
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
                        <Button size="sm">Get $LGND</Button>
                        <Button size="sm" bTransparent>
                            <div className="flex flex-row flex-nowrap justify-center items-center">
                                <div className="w-icon h-icon grow-0 shrink-0 mr-2 last:mr-0">
                                    <WalletIcon />
                                </div>
                                <span>Connect Wallet</span>
                            </div>
                        </Button>
                    </div>
                </div>
            </header>
        );
    }, [renderActions, renderMenuBtn]);

    const renderCollectionHeader = useCallback((): React.ReactElement => {
        return (
            <header
                className={cn(
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
                        <Button size="sm" bTransparent>Get $LGND</Button>
                        <Button size="sm" bTransparent>Collections</Button>
                        <Button size="sm" bTransparent>Create</Button>
                        <Button size="sm" bTransparent>
                            <div className="flex flex-row flex-nowrap justify-center items-center">
                                <div className="w-icon h-icon grow-0 shrink-0 mr-2 last:mr-0">
                                    <WalletIcon />
                                </div>
                                <span>wallet_address</span>
                            </div>
                        </Button>
                    </div>
                </div>
            </header>
        );
    }, [renderActions, renderMenuBtn]);

    const renderContent = useCallback((): React.ReactElement => {
        switch (type) {
            case "intro":
                return renderIntroHeader();

            case "general":
                return renderGeneralHeader();

            case "collection":
                return renderCollectionHeader();

            default:
                return renderCollectionHeader();
        }
    }, [renderCollectionHeader, renderGeneralHeader, renderIntroHeader, type]);

    return renderContent();
}
