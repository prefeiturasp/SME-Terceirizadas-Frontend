import React from "react";
import { HOME } from "constants/config";
import {
  MEDICAO_INICIAL,
  RELATORIOS,
  RELATORIO_ADESAO,
} from "configs/constants";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import RelatorioAdesao from "components/screens/LancamentoInicial/Relatorios/RelatorioAdesao";

const anteriores = [
  {
    href: "#",
    titulo: "Medição Inicial",
  },
  {
    href: "#",
    titulo: "Relatórios",
  },
];

const atual = {
  href: `/${MEDICAO_INICIAL}/${RELATORIOS}/${RELATORIO_ADESAO}`,
  titulo: "Relatório de Adesão",
};

export const RelatorioAdesaoPage = () => (
  <Page botaoVoltar titulo={"Relatório de Adesão"}>
    <Breadcrumb home={HOME} anteriores={anteriores} atual={atual} />
    <RelatorioAdesao />
  </Page>
);
