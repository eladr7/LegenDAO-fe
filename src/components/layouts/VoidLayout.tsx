import React, { useCallback, useContext } from "react";
import cn from "classnames";
import { useAppSelector } from "../../app/hooks";
import Sidebar from "../commons/Sidebar";
import AppContext from "../../contexts/AppContext";

type Props = React.BaseHTMLAttributes<HTMLDivElement> & {
    headerNode?: React.ReactNode;
    footerNode?: React.ReactNode;
};

export function VoidLayout({ children }: Props): React.ReactElement {
    const accessibilityState = useAppSelector((state) => state.accessibility);
    const { state } = useContext(AppContext);

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
                "font-body text-slate-700",
                "bg-gradient-to-br from-indigo-900 to-slate-900"
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
            {renderSidebar()}
        </div>
    );
}
