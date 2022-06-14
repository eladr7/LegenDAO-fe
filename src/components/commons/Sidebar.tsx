import React, { useCallback } from "react";
import cn from "classnames";
import ReactDOM from "react-dom";
import { Branding } from "./Branding";
import CloseIcon from "../icons/CloseIcon";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    accessibilityActions,
    toggleSidebar,
} from "../../features/accessibility/accessibilitySlice";
import { useNavigate } from "react-router-dom";
import { collectionAtions } from "../../features/collection/collectionSlice";
// import { profileActions } from "../features/profile/profileSlice";
import Button from "./Button";
import WalletIcon from "../icons/WalletIcon";
import { walletActions } from "../../features/wallet/walletSlice";
import { networkActions } from "../../features/network/networkSlice";
import { profileActions } from "../../features/profile/profileSlice";

export type TSidebarTab =
    | "tab/home"
    | "tab/stake"
    | "tab/collections"
    | "tab/governance"
    | "tab/airdrop"
    | "tab/profile"
    | "tab/docs";

type Props = React.BaseHTMLAttributes<HTMLDivElement> & {
    bodyElement: HTMLBodyElement;
    activatingTab?: TSidebarTab;
};

export default function Sidebar({ bodyElement, activatingTab }: Props): React.ReactElement {
    const navigate = useNavigate();
    const walletState = useAppSelector((state) => state.wallet);
    const networkState = useAppSelector((state) => state.network);
    const accessibilityState = useAppSelector((state) => state.accessibility);
    const dispatch = useAppDispatch();

    const handleOnClickOutside = useCallback(() => {
        dispatch(toggleSidebar(false));
    }, [dispatch]);
    const handleOnCloseBtnClicked = useCallback(() => {
        dispatch(toggleSidebar(false));
    }, [dispatch]);

    const handleOnHomeTabClicked = useCallback(() => {
        dispatch(toggleSidebar(false));
        navigate("/mint-lab");
    }, [dispatch, navigate]);

    const handleOnStakeTabClicked = useCallback(() => {
        dispatch(toggleSidebar(false));
        navigate("/stake");
    }, [dispatch, navigate]);

    const handleOnCollectionsTabClicked = useCallback(() => {
        dispatch(toggleSidebar(false));
        dispatch(
            collectionAtions.toggleEnter({
                entered: false,
                collectionIndex: 0,
            })
        );
        navigate("/collections");
    }, [dispatch, navigate]);

    const handleOnAirdropTabClicked = useCallback(() => {
        dispatch(toggleSidebar(false));
        navigate("/airdrop");
    }, [dispatch, navigate]);

    const handleOnProfileTabClicked = useCallback(() => {
        dispatch(toggleSidebar(false));
        dispatch(profileActions.setTab("/profile/general"));
        navigate("/profile");
    }, [dispatch, navigate]);

    const handleOnDocsTabClicked = useCallback(() => {
        dispatch(toggleSidebar(false));
        navigate("/docs");
    }, [dispatch, navigate]);

    const handleOnWalletBtnClicked = useCallback(() => {
        if (walletState.primary && walletState.signature) {
            dispatch(accessibilityActions.toggleSidebar(false));
            dispatch(accessibilityActions.toggleBalanceMenu(true));
        } else {
            if (!networkState.bIsConnected) {
                dispatch(networkActions.tryConnecting());
            } else {
                dispatch(walletActions.getSigner());
            }
        }
    }, [dispatch, networkState.bIsConnected, walletState.primary, walletState.signature]);

    return ReactDOM.createPortal(
        <div
            className={cn(
                "transition-transform font-body",
                { "-translate-x-full": !accessibilityState.bSidebarOn },
                "fixed top-0 left-0 py-8 z-[200]",
                "w-full tablet:w-sidebar min-h-screen",
                "flex flex-col flex-nowrap justify-between items-stretch",
                "text-white bg-[#001B47]"
            )}
        >
            <div
                onClick={handleOnClickOutside}
                className={cn(
                    "fixed top-0 left-0 right-0 bottom-0 w-full h-[200vh]",
                    "select-none cursor-pointer",
                    "bg-slate-900/50"
                )}
            ></div>
            <div
                className={cn(
                    "px-8 flex flex-row-reverse justify-between items-center relative",
                    "tablet:px-0 tablet:flex-row tablet:justify-center"
                )}
            >
                <div
                    className="mr-0 tablet:mr-6 p-2 cursor-pointer"
                    onClick={handleOnCloseBtnClicked}
                >
                    <div className={cn("w-icon-sm h-icon-sm grow-0 shrink-0")}>
                        <CloseIcon />
                    </div>
                </div>
                <Branding />
            </div>
            <div
                className={cn(
                    "grow flex flex-col flex-nowrap justify-start tablet:justify-center items-stretch relative"
                )}
            >
                <div className="tablet:hidden flex flex-row justify-center my-8">
                    <Button
                        bigness="lg"
                        bTransparent
                        onClick={handleOnWalletBtnClicked}
                        className="px-20"
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
                            <span>Wallet</span>
                        </div>
                    </Button>
                </div>

                <div
                    className={cn(
                        "px-12 flex flex-row justify-center items-center select-none cursor-pointer hover:text-purple-400"
                    )}
                    onClick={handleOnHomeTabClicked}
                >
                    <div
                        className={cn(
                            "py-4 grow text-center",
                            "border-t border-b border-slate-800 text-xl",
                            { "text-purple-400": activatingTab === "tab/home" }
                        )}
                    >
                        Home
                    </div>
                </div>
                <div
                    className={cn(
                        "px-12 flex flex-row justify-center items-center select-none cursor-pointer hover:text-purple-400"
                    )}
                    onClick={handleOnStakeTabClicked}
                >
                    <div
                        className={cn(
                            "py-4 grow text-center",
                            "border-b border-slate-800",
                            "text-xl",
                            {
                                "text-purple-400": activatingTab === "tab/stake",
                            }
                        )}
                    >
                        Stake
                    </div>
                </div>
                <div
                    className={cn(
                        "px-12 flex flex-row justify-center items-center select-none cursor-pointer hover:text-purple-400"
                    )}
                    onClick={handleOnCollectionsTabClicked}
                >
                    <div
                        className={cn(
                            "py-4 grow text-center",
                            "border-b border-slate-800",
                            "text-xl",
                            {
                                "text-purple-400": activatingTab === "tab/collections",
                            }
                        )}
                    >
                        Collections
                    </div>
                </div>

                <div
                    className={cn(
                        "px-12 flex flex-row justify-center items-center select-none cursor-pointer hover:text-purple-400"
                    )}
                    onClick={handleOnAirdropTabClicked}
                >
                    <div
                        className={cn(
                            "py-4 grow text-center",
                            "border-b border-slate-800",
                            "text-xl",
                            {
                                "text-purple-400": activatingTab === "tab/airdrop",
                            }
                        )}
                    >
                        Airdrop
                    </div>
                </div>
                <div
                    className={cn(
                        "px-12 flex flex-row justify-center items-center select-none cursor-pointer hover:text-purple-400"
                    )}
                    onClick={handleOnProfileTabClicked}
                >
                    <div
                        className={cn(
                            "py-4 grow text-center",
                            "border-b border-slate-800",
                            "text-xl",
                            {
                                "text-purple-400": activatingTab === "tab/profile",
                            }
                        )}
                    >
                        Profile
                    </div>
                </div>
                <div
                    className={cn(
                        "px-12 flex flex-row justify-center items-center select-none cursor-pointer hover:text-purple-400"
                    )}
                    onClick={handleOnDocsTabClicked}
                >
                    <div
                        className={cn(
                            "py-4 grow text-center",
                            "border-b border-slate-800",
                            "text-xl",
                            {
                                "text-purple-400": activatingTab === "tab/docs",
                            }
                        )}
                    >
                        Docs
                    </div>
                </div>
            </div>
        </div>,
        bodyElement
    );
}
