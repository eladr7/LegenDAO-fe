import React, { useCallback } from "react";
import cn from "classnames";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    ref?: React.LegacyRef<HTMLButtonElement>;
    bigness?: "sm" | "md" | "lg" | "xl";
    bTransparent?: boolean;
    bPlaceholder?: boolean;
    bActivated?: boolean;
}

export default function Button({
    ref,
    bigness,
    bTransparent,
    bPlaceholder,
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

    const getDisabledClassNames = useCallback(() => {
        if (bPlaceholder) return "disabled:bg-white/25 disabled:text disabled:border-0 opacity-50";
        
        return "disabled:bg-slate-500/50 disabled:text-slate-300 disabled:hover:bg-slate-600";
    }, [bPlaceholder]);

    const getTransparentClassNames = useCallback(() => {
        if (bActivated) return "bg-white text-purple-700 border border-transparent";
        if (bPlaceholder) return null;
        return [
            "bg-transparent border border-white",
            "hover:bg-white/80 hover:text-purple-700",
            "active:bg-white active:text-purple-700",
        ];
    }, [bActivated, bPlaceholder]);

    return (
        <button
            ref={ref}
            className={cn(
                getBignessClassNames(),
                "relative group ml-8 first:ml-0",
                "flex flex-row flex-nowrap justify-center items-center shrink-0",
                "text-white whitespace-nowrap select-none transition-colors",
                !bTransparent
                    ? [
                          "bg-gradient-to-b from-btn-from to-btn-to",
                          "hover:from-purple-400 hover:to-purple-600 active:from-purple-500 active:to-purple-700",
                      ]
                    : getTransparentClassNames(),
                getDisabledClassNames(),
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
