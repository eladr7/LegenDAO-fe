import React from "react";
import { DefaultLayout } from "../components/layouts/DefaultLayout";
import LegendaryPlatformArticle from "../components/LegendaryPlatformArticle";
import LegendaryTokenArticle from "../components/LegendaryTokenArticle";
import LegendaryUniverseArticle from "../components/LegendaryUniverseArticle";
import MountainsOfSodArticle from "../components/MountainsOfSodArticle";
import RoadmapArticle from "../components/RoadmapArticle";
import SecretCollectionsArticle from "../components/SecretCollectionsArticle";
import SnowFall from "../components/SnowFall";
import TeamArticle from "../components/TeamArticle";

export function MintLabLanding(): React.ReactElement {
    return (
        <DefaultLayout headerType="general" sidebarTab="tab/home" bFooterOn bHeaderAlwaysOnTop>
            <SnowFall />
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
