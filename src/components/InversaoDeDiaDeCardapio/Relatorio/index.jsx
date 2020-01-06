import HTTP_STATUS from "http-status-codes";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { formValueSelector, reduxForm } from "redux-form";
import { INVERSAO_CARDAPIO, CODAE } from "../../../configs/constants";
import { TIPO_PERFIL } from "../../../constants";
import { statusEnum } from "../../../constants";
import {
  visualizaBotoesDoFluxo,
  prazoDoPedidoMensagem,
  corDaMensagem
} from "../../../helpers/utilities";
import { getInversaoDeDiaDeCardapio } from "../../../services/inversaoDeDiaDeCardapio.service";
import Botao from "../../Shareable/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
  BUTTON_TYPE
} from "../../Shareable/Botao/constants";
import { FluxoDeStatus } from "../../Shareable/FluxoDeStatus";
import { toastError, toastSuccess } from "../../Shareable/Toast/dialogs";
import RelatorioHistoricoQuestionamento from "../../Shareable/RelatorioHistoricoQuestionamento";
import { ModalAutorizarAposQuestionamento } from "../../Shareable/ModalAutorizarAposQuestionamento";

class Relatorio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unifiedSolicitationList: [],
      uuid: null,
      redirect: false,
      showNaoAprovaModal: false,
      showModal: false,
      showAutorizarModal: false,
      InversaoCardapio: null,
      escolaDaInversao: null,
      prazoDoPedidoMensagem: null
    };
    this.closeQuestionamentoModal = this.closeQuestionamentoModal.bind(this);
    this.closeNaoAprovaModal = this.closeNaoAprovaModal.bind(this);
    this.closeAutorizarModal = this.closeAutorizarModal.bind(this);
    this.loadSolicitacao = this.loadSolicitacao.bind(this);
  }

  setRedirect() {
    this.setState({
      redirect: true
    });
  }

  renderizarRedirecionamentoParaInversoesDeCardapio = () => {
    if (this.state.redirect) {
      return <Redirect to={`/${this.props.VISAO}/${INVERSAO_CARDAPIO}`} />;
    }
  };

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    if (uuid) {
      getInversaoDeDiaDeCardapio(uuid).then(response => {
        const InversaoCardapio = response.data;
        this.setState({
          InversaoCardapio,
          uuid,
          escolaDaInversao: InversaoCardapio.escola,
          prazoDoPedidoMensagem: prazoDoPedidoMensagem(
            InversaoCardapio.prioridade
          )
        });
      });
    }
  }

  showQuestionamentoModal(resposta_sim_nao) {
    this.setState({ resposta_sim_nao, showQuestionamentoModal: true });
  }

  closeQuestionamentoModal() {
    this.setState({ showQuestionamentoModal: false });
  }

  showNaoAprovaModal(resposta_sim_nao) {
    this.setState({ resposta_sim_nao, showNaoAprovaModal: true });
  }

  closeNaoAprovaModal() {
    this.setState({ showNaoAprovaModal: false });
  }

  showAutorizarModal() {
    this.setState({ showAutorizarModal: true });
  }

  closeAutorizarModal() {
    this.setState({ showAutorizarModal: false });
  }

  loadSolicitacao(uuid) {
    getInversaoDeDiaDeCardapio(uuid).then(response => {
      this.setState({
        InversaoCardapio: response.data
      });
    });
  }

  handleSubmit() {
    const { toastAprovaMensagem, toastAprovaMensagemErro } = this.props;
    const uuid = this.state.uuid;
    this.props.endpointAprovaSolicitacao(uuid).then(
      response => {
        if (response.status === HTTP_STATUS.OK) {
          toastSuccess(toastAprovaMensagem);
          this.loadSolicitacao(uuid);
        } else if (response.status === HTTP_STATUS.BAD_REQUEST) {
          toastError(toastAprovaMensagemErro);
        }
      },
      function() {
        toastError(toastAprovaMensagemErro);
      }
    );
  }

  render() {
    const {
      InversaoCardapio,
      prazoDoPedidoMensagem,
      escolaDaInversao,
      uuid,
      resposta_sim_nao,
      showNaoAprovaModal,
      showQuestionamentoModal,
      showAutorizarModal
    } = this.state;
    const {
      visao,
      justificativa,
      textoBotaoNaoAprova,
      textoBotaoAprova,
      endpointAprovaSolicitacao,
      endpointNaoAprovaSolicitacao,
      endpointQuestionamento,
      ModalNaoAprova,
      ModalQuestionamento
    } = this.props;
    const tipoPerfil = localStorage.getItem("tipo_perfil");
    const EXIBIR_BOTAO_NAO_APROVAR =
      tipoPerfil !== TIPO_PERFIL.TERCEIRIZADA ||
      (InversaoCardapio &&
        InversaoCardapio.foi_solicitado_fora_do_prazo &&
        InversaoCardapio.status === statusEnum.CODAE_QUESTIONADO &&
        textoBotaoNaoAprova);
    const EXIBIR_BOTAO_APROVAR =
      (![
        TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA,
        TIPO_PERFIL.TERCEIRIZADA
      ].includes(tipoPerfil) &&
        textoBotaoAprova) ||
      (InversaoCardapio &&
        (!InversaoCardapio.foi_solicitado_fora_do_prazo ||
          [
            statusEnum.TERCEIRIZADA_RESPONDEU_QUESTIONAMENTO,
            statusEnum.CODAE_AUTORIZADO
          ].includes(InversaoCardapio.status)) &&
        textoBotaoAprova);
    const EXIBIR_BOTAO_QUESTIONAMENTO =
      [
        TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA,
        TIPO_PERFIL.TERCEIRIZADA
      ].includes(tipoPerfil) &&
      InversaoCardapio &&
      InversaoCardapio.foi_solicitado_fora_do_prazo &&
      [statusEnum.DRE_VALIDADO, statusEnum.CODAE_QUESTIONADO].includes(
        InversaoCardapio.status
      );
    const EXIBIR_MODAL_AUTORIZACAO =
      visao === CODAE &&
      InversaoCardapio &&
      InversaoCardapio.foi_solicitado_fora_do_prazo &&
      !InversaoCardapio.logs[InversaoCardapio.logs.length - 1].resposta_sim_nao;
    return (
      <div className="report">
        {ModalNaoAprova && (
          <ModalNaoAprova
            showModal={showNaoAprovaModal}
            closeModal={this.closeNaoAprovaModal}
            endpoint={endpointNaoAprovaSolicitacao}
            solicitacao={InversaoCardapio}
            loadSolicitacao={this.loadSolicitacao}
            justificativa={justificativa}
            resposta_sim_nao={resposta_sim_nao}
            uuid={uuid}
          />
        )}
        {ModalQuestionamento && (
          <ModalQuestionamento
            closeModal={this.closeQuestionamentoModal}
            showModal={showQuestionamentoModal}
            justificativa={justificativa}
            uuid={uuid}
            loadSolicitacao={this.loadSolicitacao}
            resposta_sim_nao={resposta_sim_nao}
            endpoint={endpointQuestionamento}
          />
        )}
        {!InversaoCardapio ? (
          <div>Carregando...</div>
        ) : (
          <form onSubmit={this.props.handleSubmit}>
            {endpointAprovaSolicitacao && (
              <ModalAutorizarAposQuestionamento
                showModal={showAutorizarModal}
                loadSolicitacao={this.loadSolicitacao}
                justificativa={justificativa}
                closeModal={this.closeAutorizarModal}
                endpoint={endpointAprovaSolicitacao}
                uuid={uuid}
              />
            )}
            <span className="page-title">{`Inversão de dia de cardápio - Pedido # ${
              InversaoCardapio.id_externo
            }`}</span>
            <Link to={`/${this.props.VISAO}/${INVERSAO_CARDAPIO}`}>
              <Botao
                texto="voltar"
                titulo="voltar"
                type={BUTTON_TYPE.BUTTON}
                style={BUTTON_STYLE.BLUE}
                icon={BUTTON_ICON.ARROW_LEFT}
                className="float-right"
              />
            </Link>
            <div className="card mt-3">
              <div className="card-body">
                <div className="row">
                  <p
                    className={`col-12 title-message ${corDaMensagem(
                      prazoDoPedidoMensagem
                    )}`}
                  >
                    {prazoDoPedidoMensagem}
                    <Botao
                      type={BUTTON_TYPE.BUTTON}
                      titulo="imprimir"
                      style={BUTTON_STYLE.BLUE}
                      icon={BUTTON_ICON.PRINT}
                      className="float-right"
                    />
                  </p>
                  <div className="col-2">
                    <span className="badge-sme badge-secondary-sme">
                      <span className="id-of-solicitation-dre">
                        # {InversaoCardapio.id_externo}
                      </span>
                      <br />{" "}
                      <span className="number-of-order-label">
                        ID DO PEDIDO
                      </span>
                    </span>
                  </div>
                  <div className="report-div-beside-order my-auto col-8">
                    <span className="requester">Escola Solicitante</span>
                    <br />
                    <span className="dre-name">
                      {InversaoCardapio.escola && InversaoCardapio.escola.nome}
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-2 report-label-value">
                    <p>DRE</p>
                    <p className="value-important">
                      {InversaoCardapio.escola &&
                        InversaoCardapio.escola.diretoria_regional &&
                        InversaoCardapio.escola.diretoria_regional.nome}
                    </p>
                  </div>
                  <div className="col-2 report-label-value">
                    <p>Lote</p>
                    <p className="value-important">
                      {escolaDaInversao.lote && escolaDaInversao.lote.nome}
                    </p>
                  </div>
                  <div className="col-2 report-label-value">
                    <p>Tipo de Gestão</p>
                    <p className="value-important">
                      {escolaDaInversao &&
                        escolaDaInversao.tipo_gestao &&
                        escolaDaInversao.tipo_gestao.nome}
                    </p>
                  </div>
                </div>
                <hr />
                {InversaoCardapio.logs && (
                  <div className="row">
                    <FluxoDeStatus listaDeStatus={InversaoCardapio.logs} />
                  </div>
                )}
                <hr />
                <div className="row">
                  <div className="report-students-div col-3">
                    <span>Nº de alunos matriculados total</span>
                    <span>{escolaDaInversao.quantidade_alunos}</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 report-label-value">
                    <p className="value">
                      Descrição da inversão de dias de cardápio
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-3 report-label-value">
                    <p>De:</p>
                    <p className="value">{InversaoCardapio.data_de}</p>
                  </div>
                  <div className="col-3 report-label-value">
                    <p>Para:</p>
                    <p className="value">{InversaoCardapio.data_para}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 report-label-value">
                    <p>Motivo</p>
                    <p
                      className="value"
                      dangerouslySetInnerHTML={{
                        __html: InversaoCardapio.motivo
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 report-label-value">
                    <p>Observações</p>
                    <p
                      className="value"
                      dangerouslySetInnerHTML={{
                        __html: InversaoCardapio.observacao
                      }}
                    />
                  </div>
                </div>
                <RelatorioHistoricoQuestionamento
                  solicitacao={InversaoCardapio}
                />
                {visualizaBotoesDoFluxo(InversaoCardapio) && (
                  <div className="form-group row float-right mt-4">
                    {EXIBIR_BOTAO_NAO_APROVAR && (
                      <Botao
                        texto={textoBotaoNaoAprova}
                        className="ml-3"
                        onClick={() => this.showNaoAprovaModal("Não")}
                        type={BUTTON_TYPE.BUTTON}
                        style={BUTTON_STYLE.GREEN_OUTLINE}
                      />
                    )}
                    {EXIBIR_BOTAO_APROVAR && (
                      <Botao
                        texto={textoBotaoAprova}
                        type={BUTTON_TYPE.SUBMIT}
                        onClick={() =>
                          EXIBIR_MODAL_AUTORIZACAO
                            ? this.showAutorizarModal()
                            : this.handleSubmit()
                        }
                        style={BUTTON_STYLE.GREEN}
                        className="ml-3"
                      />
                    )}
                    {EXIBIR_BOTAO_QUESTIONAMENTO && (
                      <Botao
                        texto={
                          tipoPerfil ===
                          TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA
                            ? "Questionar"
                            : "Sim"
                        }
                        type={BUTTON_TYPE.SUBMIT}
                        onClick={() => this.showQuestionamentoModal("Sim")}
                        style={BUTTON_STYLE.GREEN}
                        className="ml-3"
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </form>
        )}
      </div>
    );
  }
}

const formName = "relatorioInversaoDeDiaDeCardapio";
const RelatorioForm = reduxForm({
  form: formName,
  enableReinitialize: true
})(Relatorio);

const selector = formValueSelector(formName);

const mapStateToProps = state => {
  return {
    justificativa: selector(state, "justificativa"),
    motivo_cancelamento: selector(state, "motivo_cancelamento")
  };
};

export default connect(mapStateToProps)(RelatorioForm);
