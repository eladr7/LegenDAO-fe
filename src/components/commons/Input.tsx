import React, { useCallback } from "react";
import cn from "classnames";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
    ref?: React.LegacyRef<HTMLInputElement>;
    bigness?: "sm" | "md" | "lg" | "xl";
    bTransparent?: boolean;
}

export default function Input({
    ref,
    bigness,
    bTransparent,
    className,
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

    return (
        <input
            ref={ref}
            className={cn(
                getBignessClassNames(),
                "disabled:opacity-50",
                "grow shrink px-4",
                bTransparent ? "bg-slate-900/25 text-white/90" : "bg-slate-900 text-white",
                className
            )}
            {...props}
        />
    );
}
