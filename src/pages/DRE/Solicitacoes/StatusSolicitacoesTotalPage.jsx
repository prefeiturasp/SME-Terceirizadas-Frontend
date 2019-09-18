import React from "react";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import StatusSolicitacoesTodos from "../../../components/screens/DashboardDRE/StatusSolicitacoesTodos";
import Page from "../../../components/Shareable/Page/Page";
import { HOME } from "../constants";

const atual = {
  href: "/dre/solicitacoes",
  titulo: "Painel de Status de Solicitações"
};

export const StatusSolicitacoesTotalPage = () => (
  <Page titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} />
    <StatusSolicitacoesTodos showPendentes showAutorizadas />
  </Page>
);
