import React, { useCallback } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import svgLogo from "./../../assets/images/logo.png";

export function Branding(): React.ReactElement {
    const accessibilityState = useAppSelector((state) => state.accessibility);

    const renderContent = useCallback(() => {
        if (accessibilityState.bWithdrawPanelOn || accessibilityState.bDepositPanelOn) {
            return (
                <div
                    className={cn(
                        "flex flex-col flex-nowrap text-white grow-0",
                        "opacity-50 tablet-2:opacity-100"
                    )}
                >
                    <div className="w-32 tablet-2:w-52">
                        <picture>
                            <img src={svgLogo} className="w-full" alt="Legendao" />
                        </picture>
                    </div>
                </div>
            );
        }

        return (
            <div className={cn("flex flex-col flex-nowrap text-white grow-0")}>
                <Link to="/mint-lab" className="w-32 tablet-2:w-52">
                    <picture>
                        <img src={svgLogo} className="w-full" alt="Legendao" />
                    </picture>
                </Link>
            </div>
        );
    }, [accessibilityState.bDepositPanelOn, accessibilityState.bWithdrawPanelOn]);

    return renderContent();
}
