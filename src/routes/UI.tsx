import React, { useCallback, useContext, useState } from "react";
import AirDropStatusPanel from "../components/AirDropStatusPanel";
import BalancesPanel from "../components/BalancesPanel";
import Button from "../components/commons/Button";
import { Header } from "../components/commons/Header";
import Input from "../components/commons/Input";
import Modal from "../components/commons/Modal";
import Panel from "../components/commons/Panel";
import CreationFormPanel from "../components/CreationFormPanel";
import DepositPanel from "../components/DepositPanel";
import { VoidLayout } from "../components/layouts/VoidLayout";
import StakeFormPanel from "../components/StakeFormPanel";
import WithdrawPanel from "../components/WithdrawPanel";
import AppContext from "../contexts/AppContext";

export default function UI(): React.ReactElement {
    const { state } = useContext(AppContext);
    const [bModalOn, setModalOn] = useState<boolean>(false);
    const [bWithdrawPanelOn, setWithdrawPanelOn] = useState<boolean>(true);

    const handleOnShowModalBtnClicked = useCallback(() => {
        setModalOn((pre: boolean) => !pre);
    }, []);

    const handleModalOnOuterClicked = useCallback(() => {
        setModalOn(false);
    }, []);

    const handleOnWithdrawPanelCloseBtnClicked = useCallback(() => {
        setWithdrawPanelOn(false);
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
                <Button bigness="sm">Small Button</Button>
                <Button>Normal Button</Button>
                <Button bigness="md">Medium Button</Button>
                <Button bigness="lg">Large Button</Button>
                <Button bigness="xl">X Large Button</Button>
            </div>
            <div className="mb-8 last:mb-0">
                <Button onClick={handleOnShowModalBtnClicked}>Show Modal</Button>
            </div>
            {bModalOn && state.bodyElement && (
                <Modal bodyElement={state.bodyElement} onOuterClick={handleModalOnOuterClicked}>
                    <DepositPanel />
                </Modal>
            )}
            <div className="mb-8 last:mb-0 flex flex-row flex-nowrap items-end">
                <Input className="ml-4 first:ml-0" bigness="sm" placeholder="Small input" />
                <Input className="ml-4 first:ml-0" placeholder="Normal input" />
                <Input className="ml-4 first:ml-0" bigness="md" placeholder="Medium input" />
                <Input className="ml-4 first:ml-0" bigness="lg" placeholder="Large input" />
                <Input className="ml-4 first:ml-0" bigness="xl" placeholder="X Large input" />
                <Input
                    className="ml-4 first:ml-0"
                    bigness="xl"
                    bTransparent
                    placeholder="X Large input / Transparent"
                />
            </div>
            <div className="mb-8 last:mb-0 flex">
                <Panel>
                    <div className="text-white">Panel</div>
                </Panel>
            </div>
            {bWithdrawPanelOn && (
                <div className="mb-8 last:mb-0 flex">
                    <WithdrawPanel onCloseBtnClicked={handleOnWithdrawPanelCloseBtnClicked} />
                </div>
            )}

            <div className="mb-8 last:mb-0 flex">
                <DepositPanel />
            </div>

            <div className="mb-8 last:mb-0 flex">
                <BalancesPanel />
            </div>

            <div className="mb-8 last:mb-0 flex">
                <CreationFormPanel />
            </div>

            <div className="mb-8 last:mb-0 flex">
                <StakeFormPanel
                    apr={55.27}
                    value={2.86}
                    tvl={15839485}
                    totalLGNDBalance={40.2839}
                    totalFiatBalance={80.37}
                />
            </div>

            <div className="mb-8 last:mb-0 flex">
                <AirDropStatusPanel />
            </div>
        </VoidLayout>
    );
}
