import React, { useContext, useEffect } from "react";
import cn from "classnames";
import Article from "../components/commons/Article";
import { DefaultLayout } from "../components/layouts/DefaultLayout";

import imgArticleUniverse01Background from "./../assets/images/article-universe-01-background.png";
import Modal from "../components/commons/Modal";
import AppContext from "../contexts/AppContext";
import StakeFormPanel from "../components/StakeFormPanel";
import { useAppSelector } from "../app/hooks";
import { useDispatch } from "react-redux";
import { walletActions } from "../features/wallet/walletSlice";
import { STAKING_ADDRESS } from "../constants/contractAddress";

export default function Stake(): React.ReactElement {
    const { state } = useContext(AppContext);
    const depositPanel = useAppSelector((state) => state.accessibility.bDepositPanelOn);
    const withdrawPanel = useAppSelector((state) => state.accessibility.bWithdrawPanelOn);
    const walletState = useAppSelector((state) => state.wallet);
    const balance = walletState.balances[STAKING_ADDRESS as string]?.amount;

    const dispatch = useDispatch();

    useEffect(() => {
        if (balance) {
            dispatch(walletActions.getRewardsStaking());
        }
    }, [dispatch, balance]);

    return (
        <DefaultLayout headerType="general" bHeaderAlwaysOnTop sidebarTab="tab/stake">
            <Article className="grow">
                <div
                    className={cn(
                        "absolute top-0 bottom-0 right-0 left-0",
                        "bg-no-repeat bg-cover bg-bottom"
                    )}
                    style={{ backgroundImage: `url(${imgArticleUniverse01Background})` }}
                ></div>
                <div className="absolute top-0 left-0 bottom-0 right-0 bg-slate-900/75"></div>
                {state.bodyElement && depositPanel === false && withdrawPanel === false && (
                    <Modal bodyElement={state.bodyElement}>
                        <StakeFormPanel
                            dataStaking={walletState.dataStaking}
                        />
                    </Modal>
                )}
            </Article>
        </DefaultLayout>
    );
}
