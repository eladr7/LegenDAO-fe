import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { DefaultLayout } from "../components/layouts/DefaultLayout";
import LegendaryPlatformArticle from "../components/LegendaryPlatformArticle";
import LegendaryTokenArticle from "../components/LegendaryTokenArticle";
import LegendaryUniverseArticle from "../components/LegendaryUniverseArticle";
import MountainsOfSodArticle from "../components/MountainsOfSodArticle";
import RoadmapArticle from "../components/RoadmapArticle";
import SecretCollectionsArticle from "../components/SecretCollectionsArticle";
import TeamArticle from "../components/TeamArticle";
import { networkActions } from "../features/network/networkSlice";
import { walletActions } from "../features/wallet/walletSlice";

export function MintLabLanding(): React.ReactElement {

    const walletState = useAppSelector((state) => state.wallet);
    const networkState = useAppSelector((state) => state.network);
    const transactionState = useAppSelector((state) => state.transaction);
    const dispatch = useAppDispatch();


    useEffect(() => {
        dispatch(networkActions.tryConnecting());
    }, [dispatch]);

    useEffect(() => {
        if (networkState.bIsConnected && !walletState.signature) {
            dispatch(walletActions.getAllCodeHash());
            dispatch(walletActions.getSigner());
        }
    }, [dispatch, walletState.signature, networkState.bIsConnected]);

    useEffect(() => {
        if (walletState.signature) {
            dispatch(walletActions.getBalance());
        }
    }, [dispatch, transactionState.tx?.txHash, walletState.signature]);
    
    return (
        <DefaultLayout headerType="general" sidebarTab="tab/home" bFooterOn bHeaderAlwaysOnTop>
            <LegendaryUniverseArticle />
            <LegendaryPlatformArticle />
            <MountainsOfSodArticle />
            <SecretCollectionsArticle />
            <LegendaryTokenArticle />
            <RoadmapArticle />
            <TeamArticle />
        </DefaultLayout>
    );
}
