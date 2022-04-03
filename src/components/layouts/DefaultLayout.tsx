import React, { useCallback, useContext } from "react";
import cn from "classnames";
import { Header, THeaderType } from "../commons/Header";
import { Footer } from "../commons/Footer";
import Sidebar from "../commons/Sidebar";
import AppContext from "../../contexts/AppContext";
import { useAppSelector } from "../../app/hooks";

type Props = React.BaseHTMLAttributes<HTMLDivElement> & {
    headerType?: THeaderType;
    headerNode?: React.ReactNode;
    bFooterOn?: boolean;
    footerNode?: React.ReactNode;
};

export function DefaultLayout({
    children,
    bFooterOn,
    headerType,
    headerNode,
    footerNode,
}: Props): React.ReactElement {
    const accessibilityState = useAppSelector((state) => state.accessibility);
    const { state } = useContext(AppContext);

    const renderHeader = useCallback(() => {
        if (headerNode) return headerNode;
        return <Header type={headerType} />;
    }, [headerNode, headerType]);

    const renderFooter = useCallback(() => {
        if (!bFooterOn) return null;
        if (footerNode) return footerNode;
        return <Footer />;
    }, [bFooterOn, footerNode]);

    const renderSidebar = useCallback(() => {
        if (!state.bodyElement) return null;
        if (!accessibilityState.bSidebarOn) return;
        return <Sidebar bodyElement={state.bodyElement} />;
    }, [accessibilityState.bSidebarOn, state.bodyElement]);

    return (
        <div
            className={cn(
                "relative mx-auto w-full max-w-screen-desktop-4 min-h-screen",
                "flex flex-col justify-start items-stretch",
                "font-body text-slate-700",
                "bg-gradient-to-br from-indigo-900 to-slate-900"
            )}
        >
            {renderHeader()}
            <main
                className={cn(
                    "relative grow py-0 w-full",
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
