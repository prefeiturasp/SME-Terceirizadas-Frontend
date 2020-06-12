import React from "react";

import { HOME } from "../../constants/config";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Page from "../../components/Shareable/Page/Page";
import RelatorioProdutosHomologados from "components/screens/RelatorioProdutosHomologados";

const atual = {
  href: "/relatorio-produtos-homologados",
  titulo: "Relatório de Produto"
};

const RelatorioProdutosHomologadosPage = () => {
  return (
    <Page>
      <Breadcrumb home={HOME} atual={atual} />
      <RelatorioProdutosHomologados />
    </Page>
  );
};

export default RelatorioProdutosHomologadosPage;
