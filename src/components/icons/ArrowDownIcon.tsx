import React from "react";
import Icon from "../commons/Icon";

export default function ArrowDownIcon({ className }: { className?: string }): React.ReactElement {
    return (
        <Icon className={className}>
            <path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z" />
        </Icon>
    );
}
