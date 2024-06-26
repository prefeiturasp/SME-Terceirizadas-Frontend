import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import { ListaOcorrencias } from "components/screens/IMR/ListaOcorrencias";
import {
  LANCAMENTO_INICIAL,
  LANCAMENTO_MEDICAO_INICIAL,
  REGISTRAR_OCORRENCIAS,
} from "configs/constants";
import { HOME } from "constants/config";
import React from "react";

const atual = {
  href: `/${LANCAMENTO_INICIAL}/${LANCAMENTO_MEDICAO_INICIAL}/${REGISTRAR_OCORRENCIAS}`,
  titulo: "Registrar Ocorrências",
};

const anteriores = [
  {
    href: `/`,
    titulo: "Medição Inicial",
  },
  {
    navigate_to: -1,
    titulo: "Lançamento Medição Inicial",
  },
];

export const ListaOcorrenciasPage = () => (
  <Page botaoVoltar titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} anteriores={anteriores} />
    <ListaOcorrencias />
  </Page>
);
