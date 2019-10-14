import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Relatorio from "../../components/SolicitacaoDeKitLanche/Relatorio";
import Page from "../../components/Shareable/Page/Page";
import { HOME } from "../../constants/config.constants";
import {
  SOLICITACAO_KIT_LANCHE,
  ESCOLA,
  DRE,
  CODAE,
  TERCEIRIZADA
} from "../../configs/constants";

// import {
//   CODAEAutorizaPedidoDRE,
//   dreValidaPedidoEscola,
//   terceirizadaTomaCiencia
// } from "../../services/inversaoDeDiaDeCardapio.service";

class RelatorioBase extends React.Component {
  render() {
    const atual = {
      href: "#",
      titulo: "Relatório"
    };
    const anteriores = [
      {
        href: `/${this.props.VISAO}/${SOLICITACAO_KIT_LANCHE}`,
        titulo: "Solicitações de Kit Lanche Passeio"
      }
    ];

    return (
      <Page>
        <Breadcrumb home={HOME} anteriores={anteriores} atual={atual} />
        <Relatorio
          VISAO={this.props.VISAO}
          HandleAprovaPedido={this.props.HandleAprovaPedido}
          negarEndpoint={""}
        />
      </Page>
    );
  }
}

// Escola
export const RelatorioEscola = () => <RelatorioBase VISAO={ESCOLA} />;
// DRE
export const RelatorioDRE = () => (
  <RelatorioBase VISAO={DRE} HandleAprovaPedido={() => {}} />
);
// CODAE
export const RelatorioCODAE = () => (
  <RelatorioBase VISAO={CODAE} HandleAprovaPedido={() => {}} />
);
// TERCEIRIZADA
export const RelatorioTerceirizada = () => (
  <RelatorioBase VISAO={TERCEIRIZADA} HandleAprovaPedido={() => {}} />
);
