import React from "react";
import cn from "classnames";
import Panel from "./commons/Panel";
import Button from "./commons/Button";
import Input from "./commons/Input";
import Textarea from "./commons/Textarea";
import { useForm } from "react-hook-form";
import validator from "../helpers/validator";
import { legenServices } from "../app/commons/legendServices";

type Props = {
    onCloseBtnClicked?: React.MouseEventHandler<HTMLElement>;
};

interface ICreationForms {
    name: string;
    email: string;
    title: string;
    details: string;
}

export default function CreationFormPanel({ onCloseBtnClicked }: Props): React.ReactElement {
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
            title: "",
            details: "",
        },
    });

    const onSubmit = async (data: ICreationForms) => {
        try {
            const res = await legenServices.creationForm(data);
            if (res.status === 200) {
                // eslint-disable-next-line no-console
                console.log("success");
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        }
    };

    return (
        <Panel onCloseBtnClicked={onCloseBtnClicked}>
            <div
                className={cn("w-[500px] text-white", "flex flex-col items-stretch justify-start")}
            >
                <h1 className="mb-6 last:mb-0 text-2xl font-bold">Creation Form</h1>
                <p className="mb-6 last:mb-0 opacity-100">
                    Legendao, the home of creators who want their content to reach a global
                    audience, welcomes you Discover new ways to{" "}
                    <span className="whitespace-nowrap">express your art</span>
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4 last:mb-0 flex flex-col flex-nowrap">
                        {errors?.name && (
                            <label className="mb-2 last:mb-0 pl-4 opacity-75 text-red-500">
                                {errors?.name.message}
                            </label>
                        )}
                        <Input
                            type="text"
                            bigness="md"
                            placeholder="Name"
                            {...register("name", {
                                onChange: (e) => {
                                    setValue("name", e.target.value);
                                },
                                validate: {
                                    ...validator.validateForm.requireField,
                                },
                            })}
                        />
                    </div>

                    <div className="mb-4 last:mb-0 flex flex-col flex-nowrap">
                        {errors?.email && (
                            <label className="mb-2 last:mb-0 pl-4 opacity-75 text-red-500">
                                {errors.email.message}
                            </label>
                        )}
                        <Input
                            type="email"
                            bigness="md"
                            placeholder="Email"
                            {...register("email", {
                                onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                    setValue("email", e.target.value);
                                },
                                validate: {
                                    ...validator.validateForm.email,
                                    ...validator.validateForm.requireField,
                                },
                            })}
                        />
                    </div>

                    <div className="mb-4 last:mb-0 flex flex-col flex-nowrap">
                        {errors?.title && (
                            <label className="mb-2 last:mb-0 pl-4 opacity-75 text-red-500">
                                {errors.title.message}
                            </label>
                        )}
                        <Input
                            type="text"
                            bigness="md"
                            placeholder="What do you create?"
                            {...register("title", {
                                onChange: (e) => {
                                    setValue("title", e.target.value);
                                },
                                validate: validator.validateForm.requireField,
                            })}
                        />
                    </div>

                    <div className="mb-4 last:mb-0 flex flex-col flex-nowrap">
                        {errors?.details && (
                            <label className="mb-2 last:mb-0 pl-4 opacity-75 text-red-500">
                                {errors.details.message}
                            </label>
                        )}
                        <Textarea
                            rows={5}
                            placeholder="Anything else you'd like to share?"
                            {...register("details", {
                                onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                    setValue("details", e.target.value);
                                },
                                validate: validator.validateForm.requireField,
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
