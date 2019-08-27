import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import StatusSolicitacoes from "../../components/screens/DashboardTerceirizada/StatusSolicitacoesTerceirizada";
import Page from "../../components/Shareable/Page/Page";
import { HOME } from "./constants";

const atual = {
  href: "/terceirizada/solicitacoes",
  titulo: "Status de Solicitações"
};

export default () => (
  <Page titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} />
    <StatusSolicitacoes />
  </Page>
);
