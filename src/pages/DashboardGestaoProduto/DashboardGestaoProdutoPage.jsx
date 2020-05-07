import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import DashboardGestaoProduto from "../../components/screens/DashboardGestaoProduto";
import Page from "../../components/Shareable/Page/Page";
import { getDashboardGestaoProdutos } from "../../services/produto.service";
import { PAINEL_PRODUTOS_CARDS_TERCEIRIZADA } from "./constants";

class DashboardGestaoProdutoBase extends React.Component {
  render() {
    return (
      <Page>
        <Breadcrumb home={"/"} />
        <DashboardGestaoProduto {...this.props} />
      </Page>
    );
  }
}

// Terceirizada
export const DashboardTerceirizada = () => (
  <DashboardGestaoProdutoBase
    fetchDataDashboard={getDashboardGestaoProdutos}
    cards={PAINEL_PRODUTOS_CARDS_TERCEIRIZADA}
  />
);

// CODAE
export const DashboardCODAE = () => (
  <DashboardGestaoProdutoBase
    fetchDataDashboard={getDashboardGestaoProdutos}
    cards={PAINEL_PRODUTOS_CARDS_TERCEIRIZADA}
  />
);
