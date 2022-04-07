import React from "react";
import cn from "classnames";
import Panel from "./commons/Panel";
import Button from "./commons/Button";
import Input from "./commons/Input";
import Textarea from "./commons/Textarea";
import { useForm } from "react-hook-form";

type Props = {
    onCloseBtnClicked?: React.MouseEventHandler<HTMLElement>;
};

interface ICreationForms {
    name: string;
    email: string;
    createQuestion: string;
    shareQuestion: string;
}

export default function CreationFormPanel({
    onCloseBtnClicked,
}: Props): React.ReactElement {
    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors },
    } = useForm<ICreationForms>({
        mode: "onChange",
        defaultValues: {
        name: "",
        email: "",
        createQuestion: "",
        shareQuestion: "",
        },
    });

    const onSubmit = (data: ICreationForms) => {
        console.log(data);
    };

    return (
        <Panel onCloseBtnClicked={onCloseBtnClicked}>
            <div
                className={cn(
                    "w-[500px] text-white",
                    "flex flex-col items-stretch justify-start"
                )}
            >
                <h1 className="mb-6 last:mb-0 text-2xl font-bold">Creation Form</h1>
                <p className="mb-6 last:mb-0 opacity-100">
                    Legendao, the home of creators who want their content to reach a
                    global audience, welcomes you Discover new ways to{" "}
                    <span className="whitespace-nowrap">express your art</span>
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4 last:mb-0 flex flex-col flex-nowrap">
                        {
                            errors?.name?.type === "required" && (
                                <label className="mb-2 last:mb-0 pl-4 opacity-75">
                                    This field is required
                                </label>
                            )
                        }
                        <Input
                            type="text"
                            bigness="md"
                            placeholder="Name"
                            {...register("name", { 
                                required: true, 
                                onChange: (e) => {
                                    setValue("name", e.target.value);
                                } 
                            })}
                        />
                    </div>

                    <div className="mb-4 last:mb-0 flex flex-col flex-nowrap">
                        {
                            errors?.email?.type === "required" && (
                                <label className="mb-2 last:mb-0 pl-4 opacity-75">
                                    This field is required
                                </label>
                            )
                        }
                        <Input
                            type="email"
                            bigness="md"
                            placeholder="Email"
                            {...register("email", { 
                                required: true, 
                                onChange: (e) => {
                                    setValue("email", e.target.value);
                                } 
                            })}
                        />
                    </div>

                    <div className="mb-4 last:mb-0 flex flex-col flex-nowrap">
                        <Input
                            type="text"
                            bigness="md"
                            placeholder="What do you create?"
                            {...register("createQuestion", { 
                                onChange: (e) => {
                                    setValue("createQuestion", e.target.value);
                                } 
                            })}
                        />
                    </div>

                    <div className="mb-4 last:mb-0 flex flex-col flex-nowrap">
                        <Textarea
                            rows={5}
                            placeholder="Anything else you'd like to share?"
                            {...register("createQuestion", { 
                                onChange: (e) => {
                                    setValue("createQuestion", e.target.value);
                                } 
                            })}
                        />
                    </div>

                    <div className="mb-6 last:mb-0 flex flex-col flex-nowrap">
                        <Button className="font-bold" bigness="xl" type="submit">
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </Panel>
    );
}
