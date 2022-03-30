import React, { useCallback } from "react";
import cn from "classnames";

interface IButtonAttrs extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    refV?: React.LegacyRef<HTMLButtonElement>;
    size?: "sm" | "md" | "lg" | "xl";
    bTransparent?: boolean;
}

export default function Button({
    refV,
    size,
    bTransparent,
    children,
    className,
    ...props
}: IButtonAttrs): React.ReactElement {
    const getSizeClassnames = useCallback(() => {
        switch (size) {
            case "sm":
                return "h-input-sm rounded";
            case "md":
                return "h-input-md rounded";
            case "lg":
                return "h-input-lg font-semibold rounded-md";
            case "xl":
                return "h-input-xl font-bold rounded-lg";

            default:
                return "h-input rounded";
        }
    }, [size]);

    return (
        <button
            ref={refV}
            className={cn(
                getSizeClassnames(),
                "ml-4 first:ml-0 px-4",
                "flex flex-row flex-nowrap justify-center items-center shrink-0 grow-0",
                "text-white whitespace-nowrap select-none transition-colors",
                !bTransparent
                    ? "bg-gradient-to-br from-purple-500 to-purple-700 hover:from-purple-400 hover:to-purple-600 active:from-purple-500 active:to-purple-700"
                    : "bg-transparent border border-white",
                "disabled:bg-slate-500 disabled:text-slate-300 disabled:hover:bg-slate-600",
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
