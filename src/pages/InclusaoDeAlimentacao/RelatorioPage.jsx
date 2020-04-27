import React, { Component } from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Relatorio from "../../components/InclusaoDeAlimentacao/Relatorio";
import Page from "../../components/Shareable/Page/Page";
import { HOME } from "../../constants/config.constants";
import { ESCOLA, DRE, CODAE, TERCEIRIZADA } from "../../configs/constants";
import { ModalCancelarSolicitacao } from "../../components/Shareable/ModalCancelarSolicitacao_";
import { ModalNaoValidarSolicitacao } from "../../components/Shareable/ModalNaoValidarSolicitacao";
import { ModalNegarSolicitacao } from "../../components/Shareable/ModalNegarSolicitacao";
import { ModalCODAEQuestiona } from "../../components/Shareable/ModalCODAEQuestiona";
import { ModalTerceirizadaRespondeQuestionamento } from "../../components/Shareable/ModalTerceirizadaRespondeQuestionamento";
import {
  escolaCancelaInclusaoDeAlimentacaoContinua,
  DREValidaInclusaoDeAlimentacaoContinua,
  DRENaoValidaInclusaoDeAlimentacaoContinua,
  CODAENegaInclusaoDeAlimentacaoContinua,
  CODAEAutorizaInclusaoDeAlimentacaoContinua,
  terceirizadaRespondeQuestionamentoInclusaoDeAlimentacaoContinua,
  TerceirizadaTomaCienciaInclusaoDeAlimentacaoContinua,
  CODAEQuestionaInclusaoDeAlimentacaoContinua
} from "../../services/inclusaoDeAlimentacaoContinua.service";
import {
  escolaCancelaInclusaoDeAlimentacaoAvulsa,
  DREValidaInclusaoDeAlimentacaoAvulsa,
  DRENaoValidaInclusaoDeAlimentacaoAvulsa,
  CODAENegaInclusaoDeAlimentacaoAvulsa,
  CODAEAutorizaInclusaoDeAlimentacaoAvulsa,
  CODAEQuestionaInclusaoDeAlimentacaoAvulsa,
  terceirizadaRespondeQuestionamentoInclusaoDeAlimentacaoAvulsa,
  TerceirizadaTomaCienciaInclusaoDeAlimentacaoAvulsa
} from "../../services/inclusaoDeAlimentacaoAvulsa.service";

import {
  DREValidaInclusaoDeAlimentacaoCei,
  DRENaoValidaInclusaoDeAlimentacaoCei
} from "../../services/inclusaoAlimentacaoDaCei.service";

class RelatorioBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ehInclusaoContinua: false
    };
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const ehInclusaoContinua = urlParams.get("ehInclusaoContinua") === "true";
    this.setState({
      ehInclusaoContinua
    });
  }
  render() {
    const atual = {
      href: "#",
      titulo: "Relatório"
    };

    return (
      <Page>
        <Breadcrumb home={HOME} atual={atual} />
        <Relatorio {...this.props} />
      </Page>
    );
  }
}

// Escola
export class RelatorioEscola extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ehInclusaoContinua: false
    };
  }
  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const ehInclusaoContinua = urlParams.get("ehInclusaoContinua") === "true";
    this.setState({
      ehInclusaoContinua
    });
  }

  render() {
    return (
      <RelatorioBase
        visao={ESCOLA}
        ModalNaoAprova={ModalCancelarSolicitacao}
        toastNaoAprovaMensagem={
          "Inclusão de Alimentação cancelada com sucesso!"
        }
        endpointNaoAprovaSolicitacao={
          !this.state.ehInclusaoContinua
            ? escolaCancelaInclusaoDeAlimentacaoAvulsa
            : escolaCancelaInclusaoDeAlimentacaoContinua
        }
        textoBotaoNaoAprova="Cancelar"
      />
    );
  }
}

// DRE
export class RelatorioDRE extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ehInclusaoContinua: false
    };
  }
  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const ehInclusaoContinua = urlParams.get("ehInclusaoContinua") === "true";
    const ehEscolaTipoCei = urlParams.get("escolaTipoCei") === "true";
    this.setState({
      ehInclusaoContinua,
      ehEscolaTipoCei
    });
  }

  render() {
    return (
      <RelatorioBase
        visao={DRE}
        ModalNaoAprova={ModalNaoValidarSolicitacao}
        toastAprovaMensagem={"Inclusão de Alimentação validada com sucesso!"}
        toastAprovaMensagemErro={
          "Houve um erro ao validar a Inclusão de Alimentação"
        }
        endpointAprovaSolicitacao={(() => {
          if (this.state.ehEscolaTipoCei)
            return DREValidaInclusaoDeAlimentacaoCei;
          return this.state.ehInclusaoContinua
            ? DREValidaInclusaoDeAlimentacaoContinua
            : DREValidaInclusaoDeAlimentacaoAvulsa;
        })()}
        endpointNaoAprovaSolicitacao={(() => {
          if (this.state.ehEscolaTipoCei)
            return DRENaoValidaInclusaoDeAlimentacaoCei;
          return this.state.ehInclusaoContinua
            ? DRENaoValidaInclusaoDeAlimentacaoContinua
            : DRENaoValidaInclusaoDeAlimentacaoAvulsa;
        })()}
        textoBotaoNaoAprova="Não Validar"
        textoBotaoAprova="Validar"
      />
    );
  }
}

// CODAE
export class RelatorioCODAE extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ehInclusaoContinua: false
    };
  }
  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const ehInclusaoContinua = urlParams.get("ehInclusaoContinua");
    this.setState({ ehInclusaoContinua: ehInclusaoContinua === "true" });
  }

  render() {
    return (
      <RelatorioBase
        visao={CODAE}
        ModalNaoAprova={ModalNegarSolicitacao}
        ModalQuestionamento={ModalCODAEQuestiona}
        toastAprovaMensagem={"Inclusão de Alimentação autorizada com sucesso!"}
        toastAprovaMensagemErro={
          "Houve um erro ao autorizar a Inclusão de Alimentação"
        }
        endpointNaoAprovaSolicitacao={
          this.state.ehInclusaoContinua
            ? CODAENegaInclusaoDeAlimentacaoContinua
            : CODAENegaInclusaoDeAlimentacaoAvulsa
        }
        endpointAprovaSolicitacao={
          this.state.ehInclusaoContinua
            ? CODAEAutorizaInclusaoDeAlimentacaoContinua
            : CODAEAutorizaInclusaoDeAlimentacaoAvulsa
        }
        endpointQuestionamento={
          this.state.ehInclusaoContinua
            ? CODAEQuestionaInclusaoDeAlimentacaoContinua
            : CODAEQuestionaInclusaoDeAlimentacaoAvulsa
        }
        textoBotaoNaoAprova="Negar"
        textoBotaoAprova="Autorizar"
      />
    );
  }
}

// Terceirizada
export class RelatorioTerceirizada extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ehInclusaoContinua: false
    };
  }
  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const ehInclusaoContinua = urlParams.get("ehInclusaoContinua");
    this.setState({ ehInclusaoContinua: ehInclusaoContinua === "true" });
  }

  render() {
    return (
      <RelatorioBase
        visao={TERCEIRIZADA}
        ModalNaoAprova={ModalTerceirizadaRespondeQuestionamento}
        ModalQuestionamento={ModalTerceirizadaRespondeQuestionamento}
        toastAprovaMensagem={
          "Ciência de Inclusão de Alimentação enviado com sucesso!"
        }
        toastAprovaMensagemErro={
          "Houve um erro ao tomar ciência da Inclusão de Alimentação"
        }
        endpointAprovaSolicitacao={
          this.state.ehInclusaoContinua
            ? TerceirizadaTomaCienciaInclusaoDeAlimentacaoContinua
            : TerceirizadaTomaCienciaInclusaoDeAlimentacaoAvulsa
        }
        endpointNaoAprovaSolicitacao={
          this.state.ehInclusaoContinua
            ? terceirizadaRespondeQuestionamentoInclusaoDeAlimentacaoContinua
            : terceirizadaRespondeQuestionamentoInclusaoDeAlimentacaoAvulsa
        }
        endpointQuestionamento={
          this.state.ehInclusaoContinua
            ? terceirizadaRespondeQuestionamentoInclusaoDeAlimentacaoContinua
            : terceirizadaRespondeQuestionamentoInclusaoDeAlimentacaoAvulsa
        }
        textoBotaoNaoAprova="Não"
        textoBotaoAprova="Ciente"
      />
    );
  }
}
