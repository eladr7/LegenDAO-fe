import React, { useCallback, useContext, useState } from "react";
import Button from "../components/commons/Button";
import { Header } from "../components/commons/Header";
import ModalPopup from "../components/commons/ModalPopup";
import { VoidLayout } from "../components/layouts/VoidLayout";
import AppContext from "../contexts/AppContext";

export default function UI(): React.ReactElement {
    const { state } = useContext(AppContext);
    const [bModalOn, setModalOn] = useState<boolean>(false);

    const handleOnShowModalBtnClicked = useCallback(() => {
        setModalOn((pre: boolean) => !pre);
    }, []);

    const handleModalOnOuterClicked = useCallback(() => {
        setModalOn(false);
    }, []);

    return (
        <VoidLayout>
            <div className="mb-8 last:mb-0">
                <Header type="intro" />
            </div>
            <div className="mb-8 last:mb-0">
                <Header type="general" />
            </div>
            <div className="mb-8 last:mb-0">
                <Header type="collection" />
            </div>
            <div className="mb-8 last:mb-0 flex flex-row flex-nowrap items-end">
                <Button size="sm">Small Button</Button>
                <Button>Normal Button</Button>
                <Button size="md">Medium Button</Button>
                <Button size="lg">Large Button</Button>
                <Button size="xl">X Large Button</Button>
            </div>
            <div className="mb-8 last:mb-0">
                <Button onClick={handleOnShowModalBtnClicked}>Show Modal</Button>
            </div>
            {bModalOn && state.bodyElement && (
                <div className="mb-8 last:mb-0">
                    <ModalPopup
                        bodyElement={state.bodyElement}
                        onCancelClick={handleModalOnOuterClicked}
                    >
                        <div className="text-white">MODAL</div>
                    </ModalPopup>
                </div>
            )}
        </VoidLayout>
    );
}
