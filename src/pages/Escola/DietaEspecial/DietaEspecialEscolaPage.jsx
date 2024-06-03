import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import DietaEspecialEscola from "components/screens/DietaEspecial/Escola";
import { DIETA_ESPECIAL, ESCOLA } from "configs/constants";
import React from "react";
import { HOME } from "../constants";

const atual = {
  href: `/${ESCOLA}/${DIETA_ESPECIAL}`,
  titulo: "Solicitação de dieta especial",
};

export const DietaEspecialEscolaPage = () => (
  <Page titulo={atual.titulo} botaoVoltar>
    <Breadcrumb home={HOME} atual={atual} />
    <DietaEspecialEscola />
  </Page>
);
