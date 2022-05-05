import React, { useCallback } from "react";
import ReactDOM from "react-dom";
import cn from "classnames";

type Props = React.BaseHTMLAttributes<HTMLDivElement> & {
    zIndex?: string;
    bodyElement: HTMLBodyElement;
    onOuterClick?: React.MouseEventHandler<HTMLElement>;
};

export default function Modal({
    children,
    zIndex,
    bodyElement,
    onOuterClick,
}: Props): React.ReactElement | null {
    const renderContent = useCallback(
        () =>
            children
                ? ReactDOM.createPortal(
                      <div
                          className={cn(
                              "w-full h-full py-8 fixed top-0 left-0 flex flex-row items-center justify-center select-none overflow-hidden",
                              zIndex ? zIndex : "z-50"
                          )}
                      >
                          <div
                              onClick={onOuterClick}
                              className={cn(
                                  "absolute top-0 left-0 w-full h-[200vh]",
                                  "select-none cursor-pointer",
                                  //   "backdrop-filter backdrop-blur-sm bg-slate-900/50"
                                  "bg-slate-900/95 tablet-2:bg-slate-900/50"
                              )}
                          ></div>
                          <div
                              className={cn(
                                  "px-4 tablet-2:px-0 w-full max-w-[600px] max-h-full overflow-hidden overflow-y-auto scrollbar-thin",
                                  "z-10 relative max-h-screen flex justify-center items-start"
                              )}
                          >
                              {children}
                          </div>
                      </div>,
                      bodyElement
                  )
                : null,
        [bodyElement, children, onOuterClick]
    );

    return renderContent();
}
