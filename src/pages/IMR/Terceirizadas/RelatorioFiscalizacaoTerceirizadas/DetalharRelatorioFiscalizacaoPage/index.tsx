import React from "react";
import { HOME } from "constants/config";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import {
  SUPERVISAO,
  TERCEIRIZADAS,
  DETALHAR_RELATORIO_FISCALIZACAO,
  RELATORIO_FISCALIZACAO_TERCEIRIZADAS,
  PAINEL_RELATORIOS_FISCALIZACAO,
} from "configs/constants";
import { NovoRelatorioVisitas } from "components/screens/IMR/Terceirizadas/RelatorioFiscalizacaoTerceirizadas/NovoRelatorioVisitas";

export const DetalharRelatorioFiscalizacaoPage = () => {
  const atual = {
    href: `/${SUPERVISAO}/${TERCEIRIZADAS}/${RELATORIO_FISCALIZACAO_TERCEIRIZADAS}/${DETALHAR_RELATORIO_FISCALIZACAO}`,
    titulo: "Detalhar Relatório de Fiscalização Terceirizadas",
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
    {
      href: `/${SUPERVISAO}/${TERCEIRIZADAS}/${PAINEL_RELATORIOS_FISCALIZACAO}`,
      titulo: "Painel de Acompanhamento dos Relatórios",
    },
  ];
  return (
    <Page botaoVoltar titulo={atual.titulo}>
      <Breadcrumb home={HOME} atual={atual} anteriores={anteriores} />
      <NovoRelatorioVisitas somenteLeitura />
    </Page>
  );
};
