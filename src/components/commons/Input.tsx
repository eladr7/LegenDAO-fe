import React, { useCallback } from "react";
import cn from "classnames";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
    refV?: React.LegacyRef<HTMLInputElement>;
    bigness?: "sm" | "md" | "lg" | "xl";
    rightIconNode?: React.ReactNode;
    bTransparent?: boolean;
}

export default function Input({
    refV,
    bigness,
    bTransparent,
    className,
    rightIconNode,
    ...props
}: IProps): React.ReactElement {
    const getBignessClassNames = useCallback(() => {
        switch (bigness) {
            case "sm":
                return "h-input-sm rounded-lg";
            case "md":
                return "h-input-md rounded-lg";
            case "lg":
                return "h-input-lg rounded-lg";
            case "xl":
                return "h-input-xl rounded-lg";

            default:
                return "h-input rounded-lg";
        }
    }, [bigness]);

    const getIconBignessClassName = useCallback(() => {
        switch (bigness) {
            case "xl":
                return "w-6 h-icon";

            default:
                return "w-4 h-icon-sm";
        }
    }, [bigness]);

    const getIconRightMargin = useCallback(() => {
        switch (bigness) {
            case "xl":
                return "pr-14";

            default:
                return "pr-12";
        }
    }, [bigness]);

    const renderInput = useCallback(() => {
        return (
            <input
                ref={refV}
                className={cn(
                    getBignessClassNames(),
                    "focus:outline-none disabled:opacity-50",
                    "grow shrink px-4",
                    { [getIconRightMargin()]: rightIconNode },
                    bTransparent ? "bg-slate-900/50 text-white/90" : "bg-slate-900 text-white",
                    className
                )}
                {...props}
            />
        );
    }, [
        bTransparent,
        className,
        getBignessClassNames,
        getIconRightMargin,
        props,
        refV,
        rightIconNode,
    ]);

    const renderContent = useCallback(() => {
        if (!rightIconNode) return <div className="relative flex">{renderInput()}</div>;
        return (
            <div className="relative flex">
                {renderInput()}
                <div
                    className={cn(
                        "absolute right-4 top-0 bottom-0",
                        "flex justify-center items-center"
                    )}
                >
                    <div
                        className={cn(
                            "grow-0 shrink-0 flex justify-center",
                            getIconBignessClassName()
                        )}
                    >
                        {rightIconNode}
                    </div>
                </div>
            </div>
        );
    }, [getIconBignessClassName, renderInput, rightIconNode]);

    return renderContent();
}
