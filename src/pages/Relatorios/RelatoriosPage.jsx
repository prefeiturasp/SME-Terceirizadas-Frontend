import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Relatorios from "../../components/screens/Relatorios";
import Page from "../../components/Shareable/Page/Page";
import { HOME } from "../../constants/config.constants";
import { ESCOLA } from "../../configs/constants";

class RelatoriosBase extends React.Component {
  render() {
    const atual = {
      href: "#",
      titulo: "Relatórios"
    };

    return (
      <Page titulo={atual.titulo} botaoVoltar voltarPara={`/`}>
        <Breadcrumb home={HOME} atual={atual} />
        <Relatorios {...this.props} />
      </Page>
    );
  }
}

// Escola
export const RelatoriosEscola = () => <RelatoriosBase visao={ESCOLA} />;
