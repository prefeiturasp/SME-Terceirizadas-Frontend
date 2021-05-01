import React, { Component } from "react";
import { Link } from "react-router-dom";
import HTTP_STATUS from "http-status-codes";
import { Botao } from "../../Shareable/Botao";
import { BUTTON_STYLE, BUTTON_TYPE, BUTTON_ICON } from "../../Shareable/Botao/constants";
import { reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { getSolicitacaoUnificada } from "../../../services/solicitacaoUnificada.service";
import { visualizaBotoesDoFluxoSolicitacaoUnificada } from "../../../helpers/utilities";
import CorpoRelatorio from "./componentes/CorpoRelatorio";
import { prazoDoPedidoMensagem } from "../../../helpers/utilities";
import { toastSuccess, toastError } from "../../Shareable/Toast/dialogs";
import { TIPO_PERFIL } from "../../../constants/shared";
import { statusEnum } from "../../../constants/shared";
import RelatorioHistoricoQuestionamento from "../../Shareable/RelatorioHistoricoQuestionamento";
import RelatorioHistoricoJustificativaEscola from "../../Shareable/RelatorioHistoricoJustificativaEscola";
import { CODAE } from "../../../configs/constants";
import { ModalAutorizarAposQuestionamento } from "../../Shareable/ModalAutorizarAposQuestionamento";

class Relatorio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: null,
      showNaoAprovaModal: false,
      showAutorizarModal: false,
      showModal: false,
      solicitacaoUnificada: null,
      prazoDoPedidoMensagem: null,
      resposta_sim_nao: null
    };
    this.closeQuestionamentoModal = this.closeQuestionamentoModal.bind(this);
    this.closeNaoAprovaModal = this.closeNaoAprovaModal.bind(this);
    this.closeAutorizarModal = this.closeAutorizarModal.bind(this);
    this.loadSolicitacao = this.loadSolicitacao.bind(this);
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    if (uuid) {
      getSolicitacaoUnificada(uuid).then(response => {
        this.setState({
          solicitacaoUnificada: response.data,
          uuid,
          prazoDoPedidoMensagem: prazoDoPedidoMensagem(response.data.prioridade)
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
    getSolicitacaoUnificada(uuid).then(response => {
      this.setState({
        solicitacaoUnificada: response.data
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
      function () {
        toastError(toastAprovaMensagemErro);
      }
    );
  }

  render() {
    const {
      resposta_sim_nao,
      showNaoAprovaModal,
      solicitacaoUnificada,
      prazoDoPedidoMensagem,
      showQuestionamentoModal,
      uuid,
      showAutorizarModal
    } = this.state;
    const {
      visao,
      endpointAprovaSolicitacao,
      justificativa,
      textoBotaoNaoAprova,
      textoBotaoAprova,
      endpointNaoAprovaSolicitacao,
      endpointQuestionamento,
      ModalNaoAprova,
      ModalQuestionamento
    } = this.props;
    const tipoPerfil = localStorage.getItem("tipo_perfil");
    const EXIBIR_BOTAO_NAO_APROVAR =
      tipoPerfil !== TIPO_PERFIL.TERCEIRIZADA ||
      (solicitacaoUnificada &&
        solicitacaoUnificada.foi_solicitado_fora_do_prazo &&
        solicitacaoUnificada.status === statusEnum.CODAE_QUESTIONADO &&
        textoBotaoNaoAprova);
    const EXIBIR_BOTAO_APROVAR =
      (![
        TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA,
        TIPO_PERFIL.TERCEIRIZADA
      ].includes(tipoPerfil) &&
        textoBotaoAprova) ||
      (solicitacaoUnificada &&
        (!solicitacaoUnificada.foi_solicitado_fora_do_prazo ||
          [
            statusEnum.TERCEIRIZADA_RESPONDEU_QUESTIONAMENTO,
            statusEnum.CODAE_AUTORIZADO
          ].includes(solicitacaoUnificada.status)) &&
        textoBotaoAprova);
    const EXIBIR_BOTAO_QUESTIONAMENTO =
      [
        TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA,
        TIPO_PERFIL.TERCEIRIZADA
      ].includes(tipoPerfil) &&
      solicitacaoUnificada &&
      (solicitacaoUnificada.foi_solicitado_fora_do_prazo || visao === CODAE) &&
      [statusEnum.CODAE_A_AUTORIZAR, statusEnum.CODAE_QUESTIONADO].includes(
        solicitacaoUnificada.status
      );
    const EXIBIR_MODAL_AUTORIZACAO =
      visao === CODAE &&
      solicitacaoUnificada &&
      solicitacaoUnificada.foi_solicitado_fora_do_prazo &&
      !solicitacaoUnificada.logs[solicitacaoUnificada.logs.length - 1]
        .resposta_sim_nao;
    return (
      <div className="report">
        {ModalNaoAprova && (
          <ModalNaoAprova
            showModal={showNaoAprovaModal}
            closeModal={this.closeNaoAprovaModal}
            endpoint={endpointNaoAprovaSolicitacao}
            solicitacao={solicitacaoUnificada}
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
        {!solicitacaoUnificada ? (
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
            <span className="page-title">{`Solicitação Unificada - Solicitação # ${solicitacaoUnificada.id_externo
              }`}</span>
            <Link to={`/`}>
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
                <CorpoRelatorio
                  solicitacaoUnificada={solicitacaoUnificada}
                  prazoDoPedidoMensagem={prazoDoPedidoMensagem}
                />
                <RelatorioHistoricoJustificativaEscola
                  solicitacao={solicitacaoUnificada}
                />
                <RelatorioHistoricoQuestionamento
                  solicitacao={solicitacaoUnificada}
                />
                {visualizaBotoesDoFluxoSolicitacaoUnificada(
                  solicitacaoUnificada
                ) && (
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
                      {EXIBIR_BOTAO_APROVAR &&
                        (textoBotaoAprova !== "Ciente" &&
                          (visao === CODAE &&
                            solicitacaoUnificada.logs.filter(
                              log =>
                                log.status_evento_explicacao ===
                                "Terceirizada respondeu questionamento" &&
                                !log.resposta_sim_nao
                            ).length > 0 ? null : (
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
                          )))}
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

const formName = "relatorioSolicitacaoUnificada";
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
