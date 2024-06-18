import React from "react";
import { HOME } from "constants/config";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import {
  SUPERVISAO,
  TERCEIRIZADAS,
  RELATORIO_FISCALIZACAO,
  RELATORIO_FISCALIZACAO_TERCEIRIZADAS,
  PAINEL_RELATORIOS_FISCALIZACAO,
  EDITAR,
} from "configs/constants";
import { NovoRelatorioVisitas } from "components/screens/IMR/Terceirizadas/RelatorioFiscalizacaoTerceirizadas/NovoRelatorioVisitas";
import { useLocation } from "react-router-dom";

export const RelatorioFiscalizacaoPage = () => {
  const location = useLocation();
  const uuid = location.pathname.split("/")[5];

  const atual = {
    href: `/${SUPERVISAO}/${TERCEIRIZADAS}/${RELATORIO_FISCALIZACAO_TERCEIRIZADAS}/${RELATORIO_FISCALIZACAO}/${uuid}/${EDITAR}`,
    titulo: "Relatório de Fiscalização",
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
      <NovoRelatorioVisitas />
    </Page>
  );
};
