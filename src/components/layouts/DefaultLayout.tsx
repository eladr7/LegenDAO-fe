import React, { useCallback } from "react";
import cn from "classnames";
import { Header } from "../commons/Header";
import { Footer } from "../commons/Footer";

type Props = React.BaseHTMLAttributes<HTMLDivElement> & {
    headerNode?: React.ReactNode;
    footerNode?: React.ReactNode;
};

export function DefaultLayout({ children, headerNode, footerNode }: Props): React.ReactElement {
    const renderHeader = useCallback(() => {
        if (headerNode) return headerNode;
        return <Header />;
    }, [headerNode]);

    const renderFooter = useCallback(() => {
        if (footerNode) return footerNode;
        return <Footer />;
    }, [footerNode]);

    return (
        <div
            className={cn(
                "relative mx-auto p-8 w-full max-w-screen-desktop-4 min-h-screen",
                "flex flex-col justify-start items-stretch",
                "font-body font-medium text-slate-700",
                "bg-gradient-to-br from-purple-500 to-orange-500"
            )}
        >
            {renderHeader()}
            <main
                className={cn(
                    "relative grow py-0 pb-4 w-full",
                    "flex flex-col flex-nowrap justify-start items-stretch"
                )}
            >
                {children}
            </main>
            {renderFooter()}
        </div>
    );
}