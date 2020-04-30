import React, { Component } from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Relatorio from "../../components/InclusaoDeAlimentacao/Relatorio";
import Page from "../../components/Shareable/Page/Page";
import { HOME } from "../../constants/config";
import { ESCOLA, DRE, CODAE, TERCEIRIZADA } from "../../configs/constants";
import { ModalCancelarSolicitacao } from "../../components/Shareable/ModalCancelarSolicitacao_";
import { ModalNaoValidarSolicitacao } from "../../components/Shareable/ModalNaoValidarSolicitacao";
import { ModalNegarSolicitacao } from "../../components/Shareable/ModalNegarSolicitacao";
import { ModalCODAEQuestiona } from "../../components/Shareable/ModalCODAEQuestiona";
import { ModalTerceirizadaRespondeQuestionamento } from "../../components/Shareable/ModalTerceirizadaRespondeQuestionamento";

import { 
  // escola
  escolaCancelarSolicitacaoDeInclusaoDeAlimentacao,
  // DRE
  dreValidarSolicitacaoDeInclusaoDeAlimentacao,
  dreReprovarSolicitacaoDeInclusaoDeAlimentacao,
  // CODAE
  codaeAutorizarSolicitacaoDeInclusaoDeAlimentacao,
  codaeNegarSolicitacaoDeInclusaoDeAlimentacao,
  codaeQuestionarSolicitacaoDeInclusaoDeAlimentacao,
  // terceirizada
  terceirizadaResponderQuestionamentoDeInclusaoDeAlimentacao,
} from "services/inclusaoDeAlimentacao";



class RelatorioBase extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const tipoSolicitacao = urlParams.get("tipoSolicitacao"); // 
    this.setState({
      tipoSolicitacao,
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
  }
  render() {
    return (
      <RelatorioBase
        visao={ESCOLA}
        ModalNaoAprova={ModalCancelarSolicitacao}
        toastNaoAprovaMensagem={
          "Inclusão de Alimentação cancelada com sucesso!"
        }
        endpointNaoAprovaSolicitacao={escolaCancelarSolicitacaoDeInclusaoDeAlimentacao}
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
  render() {
    return (
      <RelatorioBase
        visao={DRE}
        ModalNaoAprova={ModalNaoValidarSolicitacao}
        toastAprovaMensagem={"Inclusão de Alimentação validada com sucesso!"}
        toastAprovaMensagemErro={
          "Houve um erro ao validar a Inclusão de Alimentação"
        }
        endpointAprovaSolicitacao={dreValidarSolicitacaoDeInclusaoDeAlimentacao}
        endpointNaoAprovaSolicitacao={dreReprovarSolicitacaoDeInclusaoDeAlimentacao}
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
  }
  componentDidMount() {
    // TODO: Remove unused
    ///const urlParams = new URLSearchParams(window.location.search);
    //const ehInclusaoContinua = urlParams.get("ehInclusaoContinua");
    //this.setState({ ehInclusaoContinua: ehInclusaoContinua === "true" });
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
        endpointNaoAprovaSolicitacao={codaeNegarSolicitacaoDeInclusaoDeAlimentacao}
        endpointAprovaSolicitacao={codaeAutorizarSolicitacaoDeInclusaoDeAlimentacao}
        endpointQuestionamento={codaeQuestionarSolicitacaoDeInclusaoDeAlimentacao}
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
  }
  render() {
    return (
      <RelatorioBase
        visao={TERCEIRIZADA}
        ModalNaoAprova={ModalTerceirizadaRespondeQuestionamento}
        ModalQuestionamento={ModalTerceirizadaRespondeQuestionamento}
        endpointQuestionamento={terceirizadaResponderQuestionamentoDeInclusaoDeAlimentacao}
      />
    );
  }
}
