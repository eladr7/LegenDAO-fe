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

    const renderInput = useCallback(() => {
        return (
            <input
                ref={refV}
                className={cn(
                    getBignessClassNames(),
                    "focus:outline-none disabled:opacity-50",
                    "grow shrink px-4",
                    { "pr-12": rightIconNode },
                    bTransparent ? "bg-slate-900/25 text-white/90" : "bg-slate-900 text-white",
                    className
                )}
                {...props}
            />
        );
    }, [bTransparent, className, getBignessClassNames, props, refV, rightIconNode]);

    const renderContent = useCallback(() => {
        if (!rightIconNode) return renderInput();
        return (
            <div className="relative">
                {renderInput()}
                <div
                    className={cn(
                        "absolute right-4 top-0 bottom-0",
                        "flex justify-center items-center"
                    )}
                >
                    <div className="w-4 h-icon-sm grow-0 shrink-0 flex justify-center">
                        {rightIconNode}
                    </div>
                </div>
            </div>
        );
    }, [renderInput, rightIconNode]);

    return renderContent();
}
