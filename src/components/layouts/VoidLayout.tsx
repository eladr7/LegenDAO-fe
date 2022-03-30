import React from "react";
import cn from "classnames";

type Props = React.BaseHTMLAttributes<HTMLDivElement> & {
    headerNode?: React.ReactNode;
    footerNode?: React.ReactNode;
};

export function VoidLayout({ children }: Props): React.ReactElement {
    return (
        <div
            className={cn(
                "relative mx-auto p-8 w-full max-w-screen-desktop-4 min-h-screen",
                "flex flex-col justify-start items-stretch",
                "font-body font-medium text-slate-700",
                "bg-gradient-to-br from-purple-500 to-orange-500"
            )}
        >
            <main
                className={cn(
                    "relative grow py-0 pb-4 w-full",
                    "flex flex-col flex-nowrap justify-start items-stretch"
                )}
            >
                {children}
            </main>
        </div>
    );
}
