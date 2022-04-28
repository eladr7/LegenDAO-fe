import React, { useCallback } from "react";
import cn from "classnames";
import ReactDOM from "react-dom";
import { Branding } from "./Branding";
import CloseIcon from "../icons/CloseIcon";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toggleSidebar } from "../../features/accessibility/accessibilitySlice";
import { useNavigate } from "react-router-dom";

export type TSidebarTab =
    | "tab/home"
    | "tab/stake"
    | "tab/collections"
    | "tab/governance"
    | "tab/airdrop"
    | "tab/docs";

type Props = React.BaseHTMLAttributes<HTMLDivElement> & {
    bodyElement: HTMLBodyElement;
    activatingTab?: TSidebarTab;
};

export default function Sidebar({ bodyElement, activatingTab }: Props): React.ReactElement {
    const navigate = useNavigate();
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
        navigate("/collections");
    }, [dispatch, navigate]);

    const handleOnAirdropTabClicked = useCallback(() => {
        dispatch(toggleSidebar(false));
        navigate("/airdrop");
    }, [dispatch, navigate]);

    const handleOnDocsTabClicked = useCallback(() => {
        dispatch(toggleSidebar(false));
        navigate("/docs");
    }, [dispatch, navigate]);

    return ReactDOM.createPortal(
        <div
            className={cn(
                "transition-transform font-body",
                { "-translate-x-full": !accessibilityState.bSidebarOn },
                "fixed top-0 left-0 py-8 z-[100]",
                "w-sidebar min-h-screen",
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
            <div className="flex flex-row justify-center items-center relative">
                <div
                    className="mr-6 last:mr-0 p-2 cursor-pointer"
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
                    "grow flex flex-col flex-nowrap justify-center items-stretch relative"
                )}
            >
                <div
                    className={cn(
                        "px-12 flex flex-row justify-center items-center select-none cursor-pointer hover:text-purple-400"
                    )}
                    onClick={handleOnHomeTabClicked}
                >
                    <div
                        className={cn(
                            "py-4 grow text-center",
                            "border-t border-b border-slate-800 text-lg",
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
                            "text-lg",
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
                            "text-lg",
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
                            "text-lg",
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
                    onClick={handleOnDocsTabClicked}
                >
                    <div
                        className={cn(
                            "py-4 grow text-center",
                            "border-b border-slate-800",
                            "text-lg",
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
