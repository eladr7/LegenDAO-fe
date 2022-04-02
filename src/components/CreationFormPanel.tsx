import React from "react";
import cn from "classnames";
import Panel from "./commons/Panel";
import Button from "./commons/Button";
import Input from "./commons/Input";
import Textarea from "./commons/Textarea";

type Props = {
    onCloseBtnClicked?: React.MouseEventHandler<HTMLElement>;
};

export default function CreationFormPanel({ onCloseBtnClicked }: Props): React.ReactElement {
    return (
        <Panel onCloseBtnClicked={onCloseBtnClicked}>
            <div
                className={cn("w-[500px] text-white", "flex flex-col items-stretch justify-start")}
            >
                <h1 className="mb-6 last:mb-0 text-2xl font-bold">Creation Form</h1>
                <p className="mb-6 last:mb-0 opacity-100">
                    Legendao, the home of creators who want their content to reach a global
                    audience, welcomes you Discover new ways to <span className="whitespace-nowrap">express your art</span>
                </p>

                <div className="mb-4 last:mb-0 flex flex-col flex-nowrap">
                    <label className="mb-2 last:mb-0 pl-4 opacity-75">This field is required</label>
                    <Input type="text" bigness="md" placeholder="Name" />
                </div>

                <div className="mb-4 last:mb-0 flex flex-col flex-nowrap">
                    <Input type="email" bigness="md" placeholder="Email" />
                </div>

                <div className="mb-4 last:mb-0 flex flex-col flex-nowrap">
                    <Input type="text" bigness="md" placeholder="What do you create?" />
                </div>

                <div className="mb-4 last:mb-0 flex flex-col flex-nowrap">
                    <Textarea rows={5} placeholder="Anything else you'd like to share?" />
                </div>
                
                <div className="mb-6 last:mb-0 flex flex-col flex-nowrap">
                    <Button className="font-bold" bigness="xl">
                        Submit
                    </Button>
                </div>
            </div>
        </Panel>
    );
}
