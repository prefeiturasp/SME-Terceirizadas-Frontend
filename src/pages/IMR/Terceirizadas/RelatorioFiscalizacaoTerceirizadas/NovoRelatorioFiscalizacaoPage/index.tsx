import React from "react";
import { HOME } from "constants/config";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import {
  SUPERVISAO,
  TERCEIRIZADAS,
  RELATORIO_FISCALIZACAO,
  RELATORIO_FISCALIZACAO_TERCEIRIZADAS,
} from "configs/constants";
import { NovoRelatorioVisitas } from "components/screens/IMR/Terceirizadas/RelatorioFiscalizacaoTerceirizadas/NovoRelatorioVisitas";

const atual = {
  href: `/${SUPERVISAO}/${TERCEIRIZADAS}/${RELATORIO_FISCALIZACAO_TERCEIRIZADAS}/${RELATORIO_FISCALIZACAO}`,
  titulo: "Novo Relatório de Fiscalização",
};

const anteriores = [
  {
    href: `/`,
    titulo: "Supervisão",
  },
  {
    href: `/`,
    titulo: "Terceirizadas",
  },
];

export const NovoRelatorioFiscalizacaoPage = () => (
  <Page botaoVoltar titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} anteriores={anteriores} />
    <NovoRelatorioVisitas />
  </Page>
);
