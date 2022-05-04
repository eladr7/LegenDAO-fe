import React from "react";
import { Link } from "react-router-dom";
import svgLogo from "./../../assets/images/logo.png";

export function Branding(): React.ReactElement {
    return (
        <div className="flex flex-col flex-nowrap text-white grow-0">
            <Link to="/mint-lab" className="w-32 tablet-2:w-52">
                <picture>
                    <img src={svgLogo} className="w-full" alt="Legendao" />
                </picture>
            </Link>
        </div>
    );
}
