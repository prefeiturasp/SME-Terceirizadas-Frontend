import React from "react";
import { HOME } from "constants/config";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import { FICHA_TECNICA, PRE_RECEBIMENTO } from "configs/constants";
import FichaTecnica from "components/screens/PreRecebimento/FichaTecnica";

const atual = {
  href: `/${PRE_RECEBIMENTO}/${FICHA_TECNICA}`,
  titulo: "Ficha Técnica do Produto",
};

const anteriores = [
  {
    href: `/`,
    titulo: "Pré-Recebimento",
  },
];

export default () => (
  <Page botaoVoltar voltarPara="/" titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} anteriores={anteriores} />
    <FichaTecnica />
  </Page>
);
