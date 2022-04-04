import React, { useCallback } from "react";
import cn from "classnames";
import ReactDOM from "react-dom";
import { Branding } from "./Branding";
import CloseIcon from "../icons/CloseIcon";
import { useAppDispatch } from "../../app/hooks";
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
    const dispatch = useAppDispatch();

    const handleOnCloseBtnClicked = useCallback(() => {
        dispatch(toggleSidebar(false));
    }, [dispatch]);

    const handleOnHomeTabClicked = useCallback(() => {
        navigate("/");
    }, [navigate]);

    const handleOnStakeTabClicked = useCallback(() => {
        navigate("/stake");
    }, [navigate]);

    const handleOnCollectionsTabClicked = useCallback(() => {
        navigate("/collections");
    }, [navigate]);

    const handleOnAirdropTabClicked = useCallback(() => {
        navigate("/airdrop");
    }, [navigate]);

    return ReactDOM.createPortal(
        <div
            className={cn(
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
                        "px-12 flex flex-row justify-center items-center select-none cursor-pointer"
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
                        "px-12 flex flex-row justify-center items-center select-none cursor-pointer"
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
                        "px-12 flex flex-row justify-center items-center select-none cursor-pointer"
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
                        "px-12 flex flex-row justify-center items-center select-none cursor-pointer"
                    )}
                >
                    <div
                        className={cn("py-4 grow text-center", "border-b border-slate-800", {
                            "text-purple-400": activatingTab === "tab/governance",
                        })}
                    >
                        Governance
                    </div>
                </div>
                <div
                    className={cn(
                        "px-12 flex flex-row justify-center items-center select-none cursor-pointer"
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
                        "px-12 flex flex-row justify-center items-center select-none cursor-pointer"
                    )}
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
