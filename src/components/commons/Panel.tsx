import React, { useCallback } from "react";
import cn from "classnames";
import CloseIcon from "../icons/CloseIcon";

type Props = React.BaseHTMLAttributes<HTMLDivElement> & {
    className?: string;
    onCloseBtnClicked?: React.MouseEventHandler<HTMLElement>;
    color?: "darker" | "lighten";
    bBordered?: boolean;
};

export default function Panel({
    onCloseBtnClicked,
    children,
    className,
    color,
    bBordered = true,
}: Props): React.ReactElement {
    const renderCloseBtn = useCallback(() => {
        if (!onCloseBtnClicked) return null;
        return (
            <div className="p-2 absolute top-8 right-8 z-40">
                <div className="w-icon-sm h-icon-sm grow-0 shrink-0" onClick={onCloseBtnClicked}>
                    <CloseIcon />
                </div>
            </div>
        );
    }, [onCloseBtnClicked]);

    const renderPanel = useCallback(() => {
        if (color === "darker") {
            return (
                <div className={cn("relative p-8 z-10", "group", className)}>
                    {renderCloseBtn()}
                    <div
                        className={cn(
                            { "p-[2px] rounded-xl": bBordered },
                            "absolute top-0 left-0 bottom-0 right-0 -z-10",
                            "bg-gradient-to-br from-white/40 via-white/5 to-white/0",
                            "group-hover:from-white/60 group-hover:via-white/5 group-hover:to-white/0 group-hover:shadow-xl",
                            "transition300ms"
                        )}
                    >
                        <div
                            className={cn(
                                { "m-[2px] rounded-xl": bBordered },
                                "absolute overflow-hidden top-0 left-0 bottom-0 right-0 z-20 bg-primary-mint-lab"
                            )}
                        >
                            <div
                                className={cn(
                                    "absolute -translate-x-1/2 w-1/4 left-1/2 -top-1/3 -bottom-1/3 rotate-[38deg] ",
                                    // "bg-gradient-to-br from-white/100 to-white/50 mix-blend-overlay",
                                    "rounded-xl ",
                                    "blur-xl"
                                )}
                            >
                                <div
                                    className={cn(
                                        "bg-[#4771A1]/60 w-full h-full blur-2xl",
                                        "group-hover:bg-[#CAB5E0]/[0.65]",
                                        "transition300ms"
                                    )}
                                ></div>
                            </div>
                            <div
                                className={cn(
                                    "absolute top-0 left-0 bottom-0 right-0 ",
                                    "bg-[#B235FF]/10 blur-xl "
                                )}
                            ></div>
                        </div>
                    </div>
                    <div className="relative z-30">{children}</div>
                </div>
            );
        }
        return (
            <div className={cn("relative p-8 z-10", className)}>
                {renderCloseBtn()}
                <div
                    className={cn(
                        { "p-[2px] rounded-xl": bBordered },
                        "absolute top-0 left-0 bottom-0 right-0 -z-10",
                        "bg-gradient-to-br from-white/40 via-white/5 to-white/0",
                        "backdrop-filter backdrop-blur-sm"
                    )}
                >
                    <div
                        className={cn(
                            { "m-[2px] rounded-xl": bBordered },
                            "absolute overflow-hidden top-0 left-0 bottom-0 right-0 z-20 bg-[#001B47]/25"
                        )}
                    >
                        <div
                            className={cn(
                                "absolute -translate-x-1/2 w-1/4 left-1/2 -top-1/3 -bottom-1/3 rotate-[38deg] ",
                                "bg-gradient-to-br from-white/50 to-white/0 mix-blend-overlay ",
                                "rounded-xl blur-2xl"
                            )}
                        >
                            <div className="bg-[#4771A1]/50 w-full h-full"></div>
                        </div>
                        <div
                            className={cn(
                                "absolute top-0 left-0 bottom-0 right-0 ",
                                "bg-[#341D65]/50"
                            )}
                        ></div>
                    </div>
                </div>
                <div className="relative z-30">{children}</div>
            </div>
        );
    }, [color, className, renderCloseBtn, bBordered, children]);

    const renderContent = useCallback(() => {
        return renderPanel();
    }, [renderPanel]);

    return renderContent();
}
