import React from "react";
import { Link } from "react-router-dom";

export function Branding(): React.ReactElement {
    return (
        <div className="flex flex-col flex-nowrap text-white">
            <Link to="/">
                <div className="font-bold leading-none">The Legendao</div>
                <div className="text-2xl leading-none font-bold">Universe</div>
            </Link>
        </div>
    );
}
