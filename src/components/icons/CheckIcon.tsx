import React from "react";
import Icon from "../commons/Icon";

type Props = {
    className?: string;
};

export default function CheckIcon({ className }: Props): React.ReactElement {
    return (
        <Icon className={className}>
            <path d="M21 6.285l-11.16 12.733-6.84-6.018 1.319-1.49 5.341 4.686 9.865-11.196 1.475 1.285z" />
        </Icon>
    );
}
