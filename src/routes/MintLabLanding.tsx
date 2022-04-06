import React from "react";
import { DefaultLayout } from "../components/layouts/DefaultLayout";
import LegendaryUniverseArticle from "../components/LegendaryUniverseArticle";
import LegendaryPlatformArticle from "../components/LegendaryPlatformArticle";
import MountainsOfSodArticle from "../components/MountainsOfSodArticle";
import SecretCollectionsArticle from "../components/SecretCollectionsArticle";
import LegendaryTokenArticle from "../components/LegendaryTokenArticle";
import TeamArticle from "../components/TeamArticle";
import RoadmapArticle from "../components/RoadmapArticle";

export function MintLabLanding(): React.ReactElement {
  return (
    <DefaultLayout headerType="general" bFooterOn>
      <LegendaryUniverseArticle />
      <LegendaryPlatformArticle />
      <MountainsOfSodArticle />
      <SecretCollectionsArticle />
      <RoadmapArticle />
      <LegendaryTokenArticle />
      <TeamArticle />
    </DefaultLayout>
  );
}
