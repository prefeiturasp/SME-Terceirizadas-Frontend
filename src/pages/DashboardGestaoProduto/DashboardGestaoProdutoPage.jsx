import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import DashboardGestaoProduto from "../../components/screens/DashboardGestaoProduto";
import Page from "../../components/Shareable/Page/Page";
import { HOME } from "../../constants/config";
import { getHomologacoesCODAE } from "../../services/produto.service";

class DashboardGestaoProdutoBase extends React.Component {
  render() {
    return (
      <Page>
        <Breadcrumb home={HOME} />
        <DashboardGestaoProduto {...this.props} />
      </Page>
    );
  }
}

// CODAE
export const DashboardCODAE = () => (
  <DashboardGestaoProdutoBase endpointGetHomologacoes={getHomologacoesCODAE} />
);
