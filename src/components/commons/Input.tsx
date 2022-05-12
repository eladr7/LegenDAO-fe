import React, { useCallback } from "react";
import cn from "classnames";
import Button from "./Button";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
    refV?: React.LegacyRef<HTMLInputElement>;
    backgroundColor?: string;
    bigness?: "sm" | "md" | "lg" | "xl";
    rightIconNode?: React.ReactNode;
    rightIconOnClick?: React.MouseEventHandler<HTMLElement>;
    rightButtonText?: string;
    rightButtonOnClick?: React.MouseEventHandler<HTMLElement>;
    rightButtonIsDisabled?: boolean;
    bTransparent?: boolean;
}

export default function Input({
    refV,
    backgroundColor,
    bigness,
    bTransparent,
    className,
    rightIconNode,
    rightIconOnClick,
    rightButtonText,
    rightButtonOnClick,
    rightButtonIsDisabled,
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
                    "font-emphasis focus:outline-none disabled:opacity-75 min-w-0",
                    "grow shrink px-4",
                    { [getIconRightMargin()]: Boolean(rightIconNode) },
                    { "pr-24": Boolean(rightButtonText) },
                    backgroundColor
                        ? bTransparent
                            ? "backgroundColor text-white/90"
                            : "backgroundColor text-white"
                        : bTransparent
                        ? "bg-primary-input-bg text-white/90"
                        : "bg-primary-input-bg text-white",
                    className
                )}
                {...props}
                autoComplete="off"
            />
        );
    }, [
        bTransparent,
        backgroundColor,
        className,
        getBignessClassNames,
        getIconRightMargin,
        props,
        refV,
        rightButtonText,
        rightIconNode,
    ]);

    const renderContent = useCallback(() => {
        if (rightIconNode) {
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
                            onClick={rightIconOnClick}
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
        }

        if (rightButtonText) {
            return (
                <div className="relative flex">
                    {renderInput()}
                    <div
                        className={cn(
                            "absolute right-4 top-0 bottom-0",
                            "flex justify-center items-center"
                        )}
                    >
                        <Button
                            bTransparent
                            onClick={rightButtonOnClick}
                            bigness="sm"
                            className="px-4 opacity-50 hover:opacity-100"
                            disabled={rightButtonIsDisabled}
                        >
                            <span className="text-sm">{rightButtonText}</span>
                        </Button>
                    </div>
                </div>
            );
        }

        return <div className="relative flex">{renderInput()}</div>;
    }, [
        getIconBignessClassName,
        renderInput,
        rightButtonIsDisabled,
        rightButtonOnClick,
        rightButtonText,
        rightIconNode,
        rightIconOnClick,
    ]);

    return renderContent();
}
