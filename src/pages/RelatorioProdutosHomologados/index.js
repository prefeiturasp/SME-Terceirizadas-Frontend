import React from "react";

import { HOME } from "../../constants/config";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Page from "../../components/Shareable/Page/Page";

const atual = {
  href: "/relatorio-produtos-homologados",
  titulo: "Relatório de Produto"
};

const RelatorioProdutosHomologados = () => {
  return (
    <Page>
      <Breadcrumb home={HOME} atual={atual} />
      <div>conteudo</div>
    </Page>
  );
};

export default RelatorioProdutosHomologados;
