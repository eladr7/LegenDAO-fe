import React from "react";
import cn from "classnames";

interface IInputAttrs extends React.InputHTMLAttributes<HTMLInputElement> {
    ref?: React.LegacyRef<HTMLInputElement>;
    bTransparent?: boolean;
}

export default function Input({
    ref,
    bTransparent,
    className,
    ...props
}: IInputAttrs): React.ReactElement {
    return (
        <input
            ref={ref}
            className={cn(
                "h-input",
                "disabled:opacity-50",
                "grow shrink",
                bTransparent
                    ? "px-0 bg-transparent border-b border-b-slate-200 rounded-none outline-none"
                    : "px-4 bg-slate-100 rounded-xl",
                className
            )}
            {...props}
        />
    );
}
