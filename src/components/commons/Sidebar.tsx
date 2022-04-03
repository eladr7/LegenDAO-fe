import React, { useCallback } from "react";
import cn from "classnames";
import ReactDOM from "react-dom";
import { Branding } from "./Branding";
import CloseIcon from "../icons/CloseIcon";
import { useAppDispatch } from "../../app/hooks";
import { toggleSidebar } from "../../features/accessibility/accessibilitySlice";

type Props = React.BaseHTMLAttributes<HTMLDivElement> & {
    bodyElement: HTMLBodyElement;
};

export default function Sidebar({ bodyElement }: Props): React.ReactElement {
    const dispatch = useAppDispatch();

    const handleOnCloseBtnClicked = useCallback(() => {
        dispatch(toggleSidebar(false));
    }, [dispatch]);

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
                <div className="mr-6 last:mr-0 p-2 cursor-pointer" onClick={handleOnCloseBtnClicked}>
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
                >
                    <div
                        className={cn(
                            "py-4 grow text-center",
                            "border-t border-b border-slate-800"
                        )}
                    >
                        Home
                    </div>
                </div>
                <div
                    className={cn(
                        "px-12 flex flex-row justify-center items-center select-none cursor-pointer"
                    )}
                >
                    <div className={cn("py-4 grow text-center", "border-b border-slate-800")}>
                        Stake
                    </div>
                </div>
                <div
                    className={cn(
                        "px-12 flex flex-row justify-center items-center select-none cursor-pointer"
                    )}
                >
                    <div className={cn("py-4 grow text-center", "border-b border-slate-800")}>
                        Collections
                    </div>
                </div>
                <div
                    className={cn(
                        "px-12 flex flex-row justify-center items-center select-none cursor-pointer"
                    )}
                >
                    <div className={cn("py-4 grow text-center", "border-b border-slate-800")}>
                        Governance
                    </div>
                </div>
                <div
                    className={cn(
                        "px-12 flex flex-row justify-center items-center select-none cursor-pointer"
                    )}
                >
                    <div className={cn("py-4 grow text-center", "border-b border-slate-800")}>
                        Ardrop
                    </div>
                </div>
                <div
                    className={cn(
                        "px-12 flex flex-row justify-center items-center select-none cursor-pointer"
                    )}
                >
                    <div className={cn("py-4 grow text-center", "border-b border-slate-800")}>
                        Docs
                    </div>
                </div>
            </div>
        </div>,
        bodyElement
    );
}
