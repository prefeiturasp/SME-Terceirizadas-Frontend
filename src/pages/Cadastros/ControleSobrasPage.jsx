import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Page from "../../components/Shareable/Page/Page";
import { CONTROLE_SOBRAS } from "../../configs/constants";
import ControleSobras from "components/screens/Cadastros/ControleSobras";

const atual = {
  href: `/${CONTROLE_SOBRAS}`,
  titulo: "Controle de Sobras",
};

export default () => (
  <Page titulo={atual.titulo} botaoVoltar>
    <Breadcrumb home={"/"} atual={atual} />
    <ControleSobras />
  </Page>
);
