import BigNumber from "bignumber.js";
import cn from "classnames";
import { useCallback, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { removePopup, TContentPopup } from "../../features/application/applicationSlice";
import CloseIcon from "../icons/CloseIcon";
import TransactionMsg from "./TransactionMsg";

const ToastMessage = ({
    removeAfterMs,
    content,
    popKey,
    idPreItem,
}: {
    removeAfterMs: number | null;
    content: TContentPopup;
    popKey: string;
    idPreItem?: string;
}) => {
    const dispatch = useDispatch();
    const removeThisPopup = useCallback(() => dispatch(removePopup({ key: popKey })), [dispatch, popKey]);

    useEffect(() => {
        if (removeAfterMs === null) return undefined;

        const timeout = setTimeout(() => {
            removeThisPopup();
        }, removeAfterMs);

        return () => {
            clearTimeout(timeout);
        };
    }, [removeAfterMs, removeThisPopup]);

    const renderCloseBtn = useCallback(() => {
        if (!removeThisPopup) return null;
        return (
            <div className="absolute right-3 top-3 hover:cursor-pointer">
                <div className="w-icon-xs h-icon-xs grow-0 shrink-0" onClick={removeThisPopup}>
                    <CloseIcon />
                </div>
            </div>
        );
    }, [removeThisPopup]);

    const renderTransactionMsg = useCallback(() => {
        if (content.txn) {
            const {
                txn: { success, summary },
            } = content;
            return <TransactionMsg success={success} summary={summary} />;
        }
    }, [content]);

    const renderBottom = useMemo(() => {
        const height = idPreItem ? document.getElementById(idPreItem)?.clientHeight : 0;
        if (height) {
            const cal = new BigNumber(40).plus(20).plus(height).toNumber();
            return `${cal}px`;
        } else {
            return "40px";
        }
    }, [idPreItem]);

    return (
        <div
            className={cn(
                "fixed right-4 max-w-sm w-full z-[9999] rounded-xl",
                "bg-gradient-to-br from-white/40 via-white/5 to-white/0",
            )}
            style={{
                bottom: renderBottom,
            }}
            id={popKey}
        >
            <div
                className={cn(
                    "m-[2px]",
                    "overflow-hidden top-0 left-0 bottom-0 right-0 bg-[#001B47]/25 rounded-xl"
                )}
            >
                <div
                    className={cn(
                        "absolute -translate-x-1/2 -translate-y-1/2 w-1/4 left-1/2 right-1/2 top-1/2 bottom-1/2",
                        "bg-gradient-to-br from-white/50 to-white/0 mix-blend-overlay ",
                        "rounded-xl blur-2xl"
                    )}
                >
                    <div className="bg-[#4771A1]/50 w-full h-full"></div>
                </div>
                <div
                    className={cn("absolute top-0 left-0 bottom-0 right-0 rounded-xl", "bg-[#341D65]/50")}
                ></div>
                <div className={cn("inline-block w-full", "relative p-5 pr-9 overflow-hidden")}>
                    {renderCloseBtn()}
                    {renderTransactionMsg()}
                </div>
            </div>
        </div>
    );
};

export default ToastMessage;
