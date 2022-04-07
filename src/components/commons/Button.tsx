import React, { useCallback } from "react";
import cn from "classnames";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    ref?: React.LegacyRef<HTMLButtonElement>;
    bigness?: "sm" | "md" | "lg" | "xl";
    bTransparent?: boolean;
    bActivated?: boolean;
}

export default function Button({
    ref,
    bigness,
    bTransparent,
    bActivated,
    children,
    className,
    ...props
}: IProps): React.ReactElement {
    const getBignessClassNames = useCallback(() => {
        switch (bigness) {
            case "sm":
                return "h-input-sm rounded-lg px-4";
            case "md":
                return "h-input-md rounded-lg px-4";
            case "lg":
                return "h-input-lg rounded-lg px-4";
            case "xl":
                return "h-input-xl rounded-xl px-8";

            default:
                return "h-input rounded-lg px-4";
        }
    }, [bigness]);

    const getTransparentClassNames = useCallback(() => {
        if (bActivated) return "bg-white text-purple-700 border border-transparent";
        return ["bg-transparent border border-white", "hover:bg-white/80 hover:text-purple-700", "active:bg-white active:text-purple-700"];
    }, [bActivated]);

    return (
        <button
            ref={ref}
            className={cn(
                getBignessClassNames(),
                "relative group ml-4 first:ml-0",
                "flex flex-row flex-nowrap justify-center items-center shrink-0 grow-0",
                "text-white whitespace-nowrap select-none transition-colors",
                !bTransparent
                    ? [
                          "bg-gradient-to-br from-purple-500 to-purple-700",
                          "hover:from-purple-400 hover:to-purple-600 active:from-purple-500 active:to-purple-700",
                      ]
                    : getTransparentClassNames(),
                "disabled:bg-slate-500 disabled:text-slate-300 disabled:hover:bg-slate-600",
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
