import React from "react";
import { HOME } from "constants/config";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import {
  SUPERVISAO,
  TERCEIRIZADAS,
  RELATORIO_FISCALIZACAO_TERCEIRIZADAS,
} from "configs/constants";
import { ListaRelatorios } from "components/screens/IMR/Terceirizadas/RelatorioFiscalizacaoTerceirizadas/ListaRelatorios";

const atual = {
  href: `/${SUPERVISAO}/${TERCEIRIZADAS}/${RELATORIO_FISCALIZACAO_TERCEIRIZADAS}`,
  titulo: "Relatório de Fiscalização Terceirizadas",
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

export const ListaRelatoriosFiscalizacaoTerceirizadasPage = () => (
  <Page botaoVoltar titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} anteriores={anteriores} />
    <ListaRelatorios />
  </Page>
);
