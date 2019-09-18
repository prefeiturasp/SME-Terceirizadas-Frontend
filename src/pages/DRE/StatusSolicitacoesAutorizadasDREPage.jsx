import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import StatusSolicitacoes from "../../components/screens/DashboardDRE/StatusSolicitacoes";
import Page from "../../components/Shareable/Page/Page";
import { HOME } from "./constants";

const atual = {
  href: "/dre/solicitacoes-autorizadas",
  titulo: "Solicitações Autorizadas"
};

export default props => (
  <Page titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} />
    <StatusSolicitacoes showAutorizadas={true}/>
  </Page>
);
