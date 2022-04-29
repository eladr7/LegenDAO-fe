import React from "react";
import cn from "classnames";

interface IProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    ref?: React.LegacyRef<HTMLTextAreaElement>;
    bigness?: "sm" | "md" | "lg" | "xl";
    bTransparent?: boolean;
}

export default function Textarea({
    ref,
    bTransparent,
    className,
    ...props
}: IProps): React.ReactElement {
    

    return (
        <textarea
            ref={ref}
            className={cn(
                "disabled:opacity-50 focus:outline-none",
                "grow shrink px-4 py-2 scrollbar-thin resize-none rounded-lg",
                bTransparent ? "bg-slate-900/25 text-white/90" : "bg-slate-900 text-white",
                className
            )}
            {...props}
        />
    );
}
