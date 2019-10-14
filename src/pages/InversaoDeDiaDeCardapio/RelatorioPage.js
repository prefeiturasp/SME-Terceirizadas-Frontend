import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Relatorio from "../../components/InversaoDeDiaDeCardapio/Relatorio";
import Page from "../../components/Shareable/Page/Page";
import { HOME } from "../../constants/config.constants";
import {
  INVERSAO_CARDAPIO,
  ESCOLA,
  DRE,
  CODAE,
  TERCEIRIZADA
} from "../../configs/constants";

import {
  CODAEAutorizaPedidoDRE,
  dreValidaPedidoEscola,
  terceirizadaTomaCiencia
} from "../../services/inversaoDeDiaDeCardapio.service";

class RelatorioBase extends React.Component {
  render() {
    const atual = {
      href: "#",
      titulo: "Relatório"
    };
    const anteriores = [
      {
        href: `/${this.props.VISAO}/${INVERSAO_CARDAPIO}`,
        titulo: "Solicitações de Inversao de Dia do Cardapio"
      }
    ];

    return (
      <Page>
        <Breadcrumb home={HOME} anteriores={anteriores} atual={atual} />
        <Relatorio
          VISAO={this.props.VISAO}
          HandleAprovaPedido={this.props.HandleAprovaPedido}
          toastSucessoMensagem={this.props.toastSucessoMensagem}
        />
      </Page>
    );
  }
}

// Escola
export const RelatorioEscola = () => <RelatorioBase VISAO={ESCOLA} />;
// DRE
export const RelatorioDRE = () => (
  <RelatorioBase
    VISAO={DRE}
    HandleAprovaPedido={dreValidaPedidoEscola}
    toastSucessoMensagem={"Inversão de dias de cardápio validada com sucesso!"}
  />
);
// CODAE
export const RelatorioCODAE = () => (
  <RelatorioBase
    VISAO={CODAE}
    HandleAprovaPedido={CODAEAutorizaPedidoDRE}
    toastSucessoMensagem={
      "Inversão de dias de cardápio autorizada com sucesso!"
    }
  />
);
// TERCEIRIZADA
export const RelatorioTerceirizada = () => (
  <RelatorioBase
    VISAO={TERCEIRIZADA}
    HandleAprovaPedido={terceirizadaTomaCiencia}
    toastSucessoMensagem={
      "Ciência de Inversão de dias de cardápio enviada com sucesso!"
    }
  />
);
