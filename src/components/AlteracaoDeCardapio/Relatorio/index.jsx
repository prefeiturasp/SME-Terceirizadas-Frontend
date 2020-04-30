import React, { Component } from "react";
import HTTP_STATUS from "http-status-codes";
import { Botao } from "../../Shareable/Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "../../Shareable/Botao/constants";
import { reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { getAlteracaoCardapio } from "../../../services/alteracaoDeCardapio";
import { visualizaBotoesDoFluxo, getError } from "../../../helpers/utilities";
import CorpoRelatorio from "./componentes/CorpoRelatorio";
import { prazoDoPedidoMensagem } from "../../../helpers/utilities";
import { toastSuccess, toastError } from "../../Shareable/Toast/dialogs";
import { TIPO_PERFIL } from "../../../constants/shared";
import { statusEnum } from "../../../constants/shared";
import RelatorioHistoricoJustificativaEscola from "../../Shareable/RelatorioHistoricoJustificativaEscola";
import RelatorioHistoricoQuestionamento from "../../Shareable/RelatorioHistoricoQuestionamento";
import { CODAE } from "../../../configs/constants";
import { ModalAutorizarAposQuestionamento } from "../../Shareable/ModalAutorizarAposQuestionamento";
import ModalConfirmaAlteracaoDuplicada from "./ModalConfirmaAlteracaoDuplicada";

class Relatorio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: null,
      showNaoAprovaModal: false,
      showAutorizarModal: false,
      showModal: false,
      alteracaoDecardapio: null,
      prazoDoPedidoMensagem: null,
      resposta_sim_nao: null,
      error: false,
      showModalConfirm: false
    };
    this.closeQuestionamentoModal = this.closeQuestionamentoModal.bind(this);
    this.closeNaoAprovaModal = this.closeNaoAprovaModal.bind(this);
    this.closeAutorizarModal = this.closeAutorizarModal.bind(this);
    this.loadSolicitacao = this.loadSolicitacao.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeModalConfirm = this.closeModalConfirm.bind(this);
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const tipoSolicitacao = urlParams.get("tipoSolicitacao");
    const uuid = urlParams.get("uuid");
    if (uuid) {
      getAlteracaoCardapio(uuid, tipoSolicitacao).then(response => {
        if (response.status === HTTP_STATUS.OK) {
          this.setState({
            alteracaoDeCardapio: response.data,
            uuid,
            tipoSolicitacao,
            prazoDoPedidoMensagem: prazoDoPedidoMensagem(
              response.data.prioridade
            )
          });
        } else if (response.data.detail) {
          this.setState({ erro: true });
          toastError(getError(response.data));
        } else {
          this.setState({ erro: true });
          toastError("Erro ao carregar relatório de Alteração de Cardápio");
        }
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

  loadSolicitacao(uuid, tipoSolicitacao) {
    getAlteracaoCardapio(uuid, tipoSolicitacao).then(response => {
      this.setState({
        alteracaoDeCardapio: response.data
      });
    });
  }

  showModalConfirm() {
    this.setState({ showModalConfirm: true });
  }

  closeModalConfirm() {
    this.setState({ showModalConfirm: false });
  }

  handleSubmit() {
    const { toastAprovaMensagem, toastAprovaMensagemErro, justificativa } = this.props;
    const uuid = this.state.uuid;
    const tipoSolicitacao = this.state.tipoSolicitacao;
    this.props.endpointAprovaSolicitacao(
      uuid, 
      justificativa,
      tipoSolicitacao).then(
      response => {
        if (response.status === HTTP_STATUS.OK) {
          toastSuccess(toastAprovaMensagem);
          this.closeAutorizarModal();
          this.loadSolicitacao(uuid, this.state.tipoSolicitacao);
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
      resposta_sim_nao,
      showNaoAprovaModal,
      alteracaoDeCardapio,
      prazoDoPedidoMensagem,
      showQuestionamentoModal,
      uuid,
      showAutorizarModal,
      erro,
      showModalConfirm
    } = this.state;
    const {
      justificativa,
      textoBotaoNaoAprova,
      textoBotaoAprova,
      endpointAprovaSolicitacao,
      endpointNaoAprovaSolicitacao,
      endpointQuestionamento,
      ModalNaoAprova,
      ModalQuestionamento,
      visao
    } = this.props;
    const tipoPerfil = localStorage.getItem("tipo_perfil");
    const EXIBIR_BOTAO_NAO_APROVAR =
      tipoPerfil !== TIPO_PERFIL.TERCEIRIZADA ||
      (alteracaoDeCardapio &&
        alteracaoDeCardapio.foi_solicitado_fora_do_prazo &&
        alteracaoDeCardapio.status === statusEnum.CODAE_QUESTIONADO &&
        textoBotaoNaoAprova);
    const EXIBIR_BOTAO_APROVAR =
      (![
        TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA,
        TIPO_PERFIL.TERCEIRIZADA
      ].includes(tipoPerfil) &&
        textoBotaoAprova) ||
      (alteracaoDeCardapio &&
        (!alteracaoDeCardapio.foi_solicitado_fora_do_prazo ||
          [
            statusEnum.TERCEIRIZADA_RESPONDEU_QUESTIONAMENTO,
            statusEnum.CODAE_AUTORIZADO
          ].includes(alteracaoDeCardapio.status)) &&
        textoBotaoAprova);
    const EXIBIR_BOTAO_QUESTIONAMENTO =
      [
        TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA,
        TIPO_PERFIL.TERCEIRIZADA
      ].includes(tipoPerfil) &&
      alteracaoDeCardapio &&
      alteracaoDeCardapio.foi_solicitado_fora_do_prazo &&
      [statusEnum.DRE_VALIDADO, statusEnum.CODAE_QUESTIONADO].includes(
        alteracaoDeCardapio.status
      );
    const EXIBIR_MODAL_AUTORIZACAO =
      visao === CODAE &&
      alteracaoDeCardapio &&
      alteracaoDeCardapio.foi_solicitado_fora_do_prazo &&
      !alteracaoDeCardapio.logs[alteracaoDeCardapio.logs.length - 1]
        .resposta_sim_nao;
    return (
      <div className="report">
        {ModalNaoAprova && (
          <ModalNaoAprova
            showModal={showNaoAprovaModal}
            closeModal={this.closeNaoAprovaModal}
            endpoint={endpointNaoAprovaSolicitacao}
            solicitacao={alteracaoDeCardapio}
            loadSolicitacao={this.loadSolicitacao}
            justificativa={justificativa}
            resposta_sim_nao={resposta_sim_nao}
            uuid={uuid}
            tipoSolicitacao={this.state.tipoSolicitacao}
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
            tipoSolicitacao={this.state.tipoSolicitacao}
          />
        )}
        {erro && (
          <div>Opss... parece que ocorreu um erro ao carregar a página.</div>
        )}
        {!alteracaoDeCardapio && !erro && <div>Carregando...</div>}
        {alteracaoDeCardapio && (
          <form onSubmit={this.props.handleSubmit}>
            {endpointAprovaSolicitacao && (
              <ModalAutorizarAposQuestionamento
                showModal={showAutorizarModal}
                loadSolicitacao={this.loadSolicitacao}
                justificativa={justificativa}
                closeModal={this.closeAutorizarModal}
                endpoint={endpointAprovaSolicitacao}
                uuid={uuid}
                tipoSolicitacao={this.state.tipoSolicitacao}
              />
            )}
            <span className="page-title">{`Alteração de Cardápio - Solicitação # ${
              alteracaoDeCardapio.id_externo
            }`}</span>
            <div className="card mt-3">
              <div className="card-body">
                <CorpoRelatorio
                  alteracaoDeCardapio={alteracaoDeCardapio}
                  prazoDoPedidoMensagem={prazoDoPedidoMensagem}
                  tipoSolicitacao={this.state.tipoSolicitacao}
                />
                <RelatorioHistoricoJustificativaEscola
                  solicitacao={alteracaoDeCardapio}
                />
                <RelatorioHistoricoQuestionamento
                  solicitacao={alteracaoDeCardapio}
                />
                {visualizaBotoesDoFluxo(alteracaoDeCardapio) && (
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
                        (textoBotaoAprova === "Validar" ? (
                          alteracaoDeCardapio.eh_alteracao_com_lanche_repetida ? (
                            <Botao
                              texto={textoBotaoAprova}
                              type={BUTTON_TYPE.SUBMIT}
                              onClick={() => this.showModalConfirm()}
                              style={BUTTON_STYLE.GREEN}
                              className="ml-3"
                            />
                          ) : (
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
                          )
                        ) : (
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
            <ModalConfirmaAlteracaoDuplicada
              showModal={showModalConfirm}
              closeModal={this.closeModalConfirm}
              handleSubmit={this.handleSubmit}
            />
          </form>
        )}
      </div>
    );
  }
}

const formName = "relatorioAlteracaoDeCardapio";
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
