import React from "react";
import { HOME } from "constants/config";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import {
  LANCAMENTO_INICIAL,
  LANCAMENTO_MEDICAO_INICIAL,
  REGISTRAR_NOVA_OCORRENCIA,
  REGISTRAR_OCORRENCIAS,
} from "configs/constants";
import { RegistrarNovaOcorrencia } from "components/screens/IMR/RegistrarNovaOcorrencia";

const atual = {
  href: `/${LANCAMENTO_INICIAL}/${LANCAMENTO_MEDICAO_INICIAL}/${REGISTRAR_OCORRENCIAS}/${REGISTRAR_NOVA_OCORRENCIA}`,
  titulo: "Nova Ocorrência",
};

const anteriores = [
  {
    href: `/`,
    titulo: "Medição Inicial",
  },
  {
    navigate_to: -2,
    titulo: "Lançamento Medição Inicial",
  },
  {
    navigate_to: -1,
    titulo: "Registrar Ocorrências",
  },
];

export const RegistrarNovaOcorrenciaPage = () => (
  <Page botaoVoltar titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} anteriores={anteriores} />
    <RegistrarNovaOcorrencia />
  </Page>
);
