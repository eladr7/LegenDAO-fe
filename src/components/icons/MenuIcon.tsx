import React from "react";
import Icon from "../commons/Icon";

type Props = {
    className?: string;
};

export default function MenuIcon({ className }: Props): React.ReactElement {
    return (
        <Icon className={className}>
            <path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z" />
        </Icon>
    );
}
