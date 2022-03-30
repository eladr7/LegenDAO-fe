import React, { useCallback } from "react";
import cn from "classnames";
import Button from "./Button";
import Modal from "./Modal";

type Props = React.BaseHTMLAttributes<HTMLDivElement> & {
    bodyElement: HTMLBodyElement;
    okText?: string;
    cancelText?: string;
    onOkClick?: React.MouseEventHandler<HTMLElement>;
    onCancelClick?: React.MouseEventHandler<HTMLElement>;
};

export default function ModalPopup({
    bodyElement,
    children,
    okText,
    cancelText,
    onOkClick,
    onCancelClick,
}: Props) {
    const renderContent = useCallback(
        () =>
            children ? (
                <Modal bodyElement={bodyElement} onOuterClick={onCancelClick}>
                    <div
                        className={cn(
                            "p-4 min-w-full tablet-2:min-w-[360px] rounded-md",
                            "bg-gradient-to-br from-violet-500 via-pink-700 to-violet-700",
                            "border border-t-slate-400 border-l-slate-400 border-r-slate-700 border-b-slate-600"
                        )}
                    >
                        <div className="flex flex-col justify-center items-stretch text-center">
                            {children}
                        </div>
                        {okText && (
                            <div className="mt-4 flex justify-center">
                                <Button onClick={onOkClick}>{okText}</Button>
                            </div>
                        )}
                        {cancelText && (
                            <div className="mt-4 flex justify-center">
                                <Button onClick={onCancelClick}>{cancelText}</Button>
                            </div>
                        )}
                    </div>
                </Modal>
            ) : null,
        [bodyElement, cancelText, children, okText, onCancelClick, onOkClick]
    );

    return renderContent();
}
