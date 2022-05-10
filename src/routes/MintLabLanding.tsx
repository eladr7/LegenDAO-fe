import React, { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import { DefaultLayout } from "../components/layouts/DefaultLayout";
import LegendaryPlatformArticle from "../components/LegendaryPlatformArticle";
import LegendaryTokenArticle from "../components/LegendaryTokenArticle";
import LegendaryUniverseArticle from "../components/LegendaryUniverseArticle";
import MountainsOfSodArticle from "../components/MountainsOfSodArticle";
import RoadmapArticle from "../components/RoadmapArticle";
import SecretCollectionsArticle from "../components/SecretCollectionsArticle";
import TeamArticle from "../components/TeamArticle";
import { networkActions } from "../features/network/networkSlice";

export function MintLabLanding(): React.ReactElement {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(networkActions.tryConnecting());
    }, [dispatch]);

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
