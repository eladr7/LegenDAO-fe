import React, { useCallback, useContext } from "react";
import cn from "classnames";
import { Header, THeaderType } from "../commons/Header";
import { Footer } from "../commons/Footer";
import Sidebar, { TSidebarTab } from "../commons/Sidebar";
import AppContext from "../../contexts/AppContext";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Modal from "../commons/Modal";
import CreationFormPanel from "../CreationFormPanel";
import { turnOffAllPanel } from "../../features/accessibility/accessibilitySlice";
import DepositPanel from "../DepositPanel";
import WithdrawPanel from "../WithdrawPanel";

type Props = React.BaseHTMLAttributes<HTMLDivElement> & {
    bHeaderAlwaysOnTop?: boolean;
    headerType?: THeaderType;
    headerDomainNode?: React.ReactNode;
    headerNode?: React.ReactNode;
    bFooterOn?: boolean;
    footerNode?: React.ReactNode;
    sidebarTab?: TSidebarTab;
};

export function DefaultLayout({
    children,
    bHeaderAlwaysOnTop,
    bFooterOn,
    headerType,
    headerDomainNode,
    headerNode,
    footerNode,
    sidebarTab,
}: Props): React.ReactElement {
    const accessibilityState = useAppSelector((state) => state.accessibility);
    const dispatch = useAppDispatch();
    const { state } = useContext(AppContext);

    const handleOnModalOuterClicked = useCallback(() => {
        dispatch(turnOffAllPanel());
    }, [dispatch]);

    const renderHeader = useCallback(() => {
        if (headerNode) return headerNode;
        return (
            <Header
                bAlwaysOnTop={bHeaderAlwaysOnTop}
                type={headerType}
                domainNode={headerDomainNode}
            />
        );
    }, [bHeaderAlwaysOnTop, headerDomainNode, headerNode, headerType]);

    const renderFooter = useCallback(() => {
        if (!bFooterOn) return null;
        if (footerNode) return footerNode;
        return <Footer />;
    }, [bFooterOn, footerNode]);

    const renderSidebar = useCallback(() => {
        if (!state.bodyElement) return null;
        return <Sidebar bodyElement={state.bodyElement} activatingTab={sidebarTab} />;
    }, [sidebarTab, state.bodyElement]);

    const renderModal = useCallback(() => {
        if (!state.bodyElement) return null;
        if (accessibilityState.bCreationFormPanelOn) {
            return (
                <Modal bodyElement={state.bodyElement} onOuterClick={handleOnModalOuterClicked}>
                    <CreationFormPanel onCloseBtnClicked={handleOnModalOuterClicked} />
                </Modal>
            );
        }

        if (accessibilityState.bDepositPanelOn) {
            return (
                <Modal bodyElement={state.bodyElement} onOuterClick={handleOnModalOuterClicked}>
                    <DepositPanel onCloseBtnClicked={handleOnModalOuterClicked} />
                </Modal>
            );
        }

        if (accessibilityState.bWithdrawPanelOn) {
            return (
                <Modal bodyElement={state.bodyElement} onOuterClick={handleOnModalOuterClicked}>
                    <WithdrawPanel onCloseBtnClicked={handleOnModalOuterClicked} />
                </Modal>
            );
        }
    }, [
        accessibilityState.bCreationFormPanelOn,
        accessibilityState.bDepositPanelOn,
        accessibilityState.bWithdrawPanelOn,
        handleOnModalOuterClicked,
        state.bodyElement,
    ]);

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
            {renderModal()}
        </div>
    );
}
