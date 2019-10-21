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

import {
  autorizaDeKitLancheAvulsoCodae,
  validaDeKitLancheAvulsoDiretoriaRegional,
  cienciaDeKitLancheAvulsoTerceirizadas,
  DREnaoValidarKitLancheAvulsoEscola,
  CODAENegaKitLancheAvulsoEscola
} from "../../services/solicitacaoDeKitLanche.service";

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
          negarEndpoint={this.props.negarEndpoint}
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
    HandleAprovaPedido={validaDeKitLancheAvulsoDiretoriaRegional}
    negarEndpoint={DREnaoValidarKitLancheAvulsoEscola}
    toastSucessoMensagem={
      "Solicitação de Kit Lanche Passeio validada com sucesso!"
    }
  />
);
// CODAE
export const RelatorioCODAE = () => (
  <RelatorioBase
    VISAO={CODAE}
    HandleAprovaPedido={autorizaDeKitLancheAvulsoCodae}
    negarEndpoint={CODAENegaKitLancheAvulsoEscola}
    toastSucessoMensagem={
      "Solicitação de Kit Lanche Passeio autorizada com sucesso!"
    }
  />
);
// TERCEIRIZADA
export const RelatorioTerceirizada = () => (
  <RelatorioBase
    VISAO={TERCEIRIZADA}
    HandleAprovaPedido={cienciaDeKitLancheAvulsoTerceirizadas}
    toastSucessoMensagem={
      "Ciência de Solicitação de Kit Lanche Passeio enviada com sucesso!"
    }
  />
);
