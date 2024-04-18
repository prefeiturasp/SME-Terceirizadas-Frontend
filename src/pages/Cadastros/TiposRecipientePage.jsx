import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Page from "../../components/Shareable/Page/Page";
import { TIPOS_RECIPIENTE } from "../../configs/constants";
import TiposRecipiente from "components/screens/Cadastros/TiposRecipiente";

const atual = {
  href: `/${TIPOS_RECIPIENTE}`,
  titulo: "Tipos de Recipiente",
};

export default () => (
  <Page titulo={atual.titulo} botaoVoltar>
    <Breadcrumb home={"/"} atual={atual} />
    <TiposRecipiente />
  </Page>
);