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
                "transition-transform",
                { "-translate-x-full": !accessibilityState.bSidebarOn },
                "fixed top-0 left-0 py-8 z-50",
                "w-sidebar min-h-screen",
                "flex flex-col flex-nowrap justify-between items-stretch",
                "text-white bg-gradient-to-br from-slate-900 to-slate-800"
            )}
        >
            <div className="flex flex-row justify-center items-center">
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
            <div className={cn("grow flex flex-col flex-nowrap justify-center items-stretch")}>
                <div
                    className={cn(
                        "px-12 flex flex-row justify-center items-center select-none cursor-pointer hover:text-purple-400"
                    )}
                    onClick={handleOnHomeTabClicked}
                >
                    <div
                        className={cn(
                            "py-4 grow text-center",
                            "border-t border-b border-slate-800",
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
                        className={cn("py-4 grow text-center", "border-b border-slate-800", {
                            "text-purple-400": activatingTab === "tab/stake",
                        })}
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
                        className={cn("py-4 grow text-center", "border-b border-slate-800", {
                            "text-purple-400": activatingTab === "tab/collections",
                        })}
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
                        className={cn("py-4 grow text-center", "border-b border-slate-800", {
                            "text-purple-400": activatingTab === "tab/airdrop",
                        })}
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
                        className={cn("py-4 grow text-center", "border-b border-slate-800", {
                            "text-purple-400": activatingTab === "tab/docs",
                        })}
                    >
                        Docs
                    </div>
                </div>
            </div>
        </div>,
        bodyElement
    );
}
