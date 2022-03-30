import React from "react";
import cn from "classnames";

interface IInputAttrs extends React.InputHTMLAttributes<HTMLInputElement> {
    refV?: React.LegacyRef<HTMLInputElement>;
    bTransparent?: boolean;
}

export default function Input({
    refV,
    bTransparent,
    className,
    ...props
}: IInputAttrs): React.ReactElement {
    return (
        <input
            ref={refV}
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
