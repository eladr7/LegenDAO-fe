import React, { useCallback, useContext } from "react";
import cn from "classnames";
import { Header } from "../commons/Header";
import { Footer } from "../commons/Footer";
import Sidebar from "../commons/Sidebar";
import AppContext from "../../contexts/AppContext";
import { useAppSelector } from "../../app/hooks";

type Props = React.BaseHTMLAttributes<HTMLDivElement> & {
    headerNode?: React.ReactNode;
    footerNode?: React.ReactNode;
};

export function DefaultLayout({ children, headerNode, footerNode }: Props): React.ReactElement {
    const accessibilityState = useAppSelector((state) => state.accessibility);
    const { state } = useContext(AppContext);

    const renderHeader = useCallback(() => {
        if (headerNode) return headerNode;
        return <Header />;
    }, [headerNode]);

    const renderFooter = useCallback(() => {
        if (footerNode) return footerNode;
        return <Footer />;
    }, [footerNode]);

    const renderSidebar = useCallback(() => {
        if (!state.bodyElement) return null;
        if (!accessibilityState.bSidebarOn) return;
        return <Sidebar bodyElement={state.bodyElement} />;
    }, [accessibilityState.bSidebarOn, state.bodyElement]);

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
            {renderSidebar()}
        </div>
    );
}
