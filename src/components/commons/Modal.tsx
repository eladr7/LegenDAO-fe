import React, { useCallback } from "react";
import ReactDOM from "react-dom";
import cn from "classnames";

type Props = React.BaseHTMLAttributes<HTMLDivElement> & {
    bodyElement: HTMLBodyElement;
    onOuterClick?: React.MouseEventHandler<HTMLElement>;
};

export default function Modal({
    children,
    bodyElement,
    // onOuterClick,
}: Props): React.ReactElement | null {
    const renderContent = useCallback(
        () =>
            children
                ? ReactDOM.createPortal(
                      <div className="w-full h-full fixed top-0 left-0 z-50 flex flex-row items-center justify-center select-none overflow-visible">
                          <div
                            //   onClick={onOuterClick}
                              className={cn(
                                  "absolute top-0 left-0 w-full h-[200vh]",
                                  "select-none cursor-pointer",
                                //   "backdrop-filter backdrop-blur-sm bg-slate-900/50"
                                  "bg-slate-900/50"
                              )}
                          ></div>
                          <div
                              className={cn(
                                  "w-full max-w-[480px]",
                                  "z-10 relative max-h-screen flex justify-center items-center"
                              )}
                          >
                              {children}
                          </div>
                      </div>,
                      bodyElement
                  )
                : null,
        [bodyElement, children]
    );

    return renderContent();
}
