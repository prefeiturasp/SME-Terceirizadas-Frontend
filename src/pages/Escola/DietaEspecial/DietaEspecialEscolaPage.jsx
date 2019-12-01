import React from "react";
import DietaEspecialEscola from "../../../components/screens/DietaEspecial/Escola";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import Page from "../../../components/Shareable/Page/Page";
import { DIETA_ESPECIAL, ESCOLA } from "../../../configs/constants";
import { HOME } from "../constants";

const atual = {
  href: `/${ESCOLA}/${DIETA_ESPECIAL}`,
  titulo: "Solicitação de dieta especial"
};

export default () => (
  <Page titulo={atual.titulo} botaoVoltar voltarPara={HOME}>
    <Breadcrumb home={HOME} atual={atual} />
    <DietaEspecialEscola />
  </Page>
);
