import React from "react";
import { HOME } from "constants/config";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import { CENTRAL_DOWNLOADS } from "configs/constants";
import CentralDownloads from "components/screens/CentralDownloads";

const atual = {
  href: `/${CENTRAL_DOWNLOADS}`,
  titulo: "Central de Downloads"
};

export default () => (
  <Page botaoVoltar voltarPara="/" titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} />
    <CentralDownloads />
  </Page>
);
