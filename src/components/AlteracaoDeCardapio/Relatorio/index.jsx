import { Botao } from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";
import ModalAutorizarAposQuestionamento from "components/Shareable/ModalAutorizarAposQuestionamento";
import ModalMarcarConferencia from "components/Shareable/ModalMarcarConferencia";
import RelatorioHistoricoJustificativaEscola from "components/Shareable/RelatorioHistoricoJustificativaEscola";
import RelatorioHistoricoQuestionamento from "components/Shareable/RelatorioHistoricoQuestionamento";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import { CODAE, TERCEIRIZADA } from "configs/constants";
import { statusEnum, TIPO_PERFIL, TIPO_SOLICITACAO } from "constants/shared";
import {
  getError,
  prazoDoPedidoMensagem,
  visualizaBotoesDoFluxo,
} from "helpers/utilities";
import HTTP_STATUS from "http-status-codes";
import React, { Component } from "react";
import { connect } from "react-redux";
import { formValueSelector, reduxForm } from "redux-form";
import { getAlteracaoCardapio } from "services/alteracaoDeCardapio";
import { meusDados } from "services/perfil.service";
import CorpoRelatorio from "./componentes/CorpoRelatorio";
import ModalConfirmaAlteracaoDuplicada from "./ModalConfirmaAlteracaoDuplicada";
import { ModalAprovarSolicitacaoAlteracao } from "./ModalAprovarSolicitacaoAlteracao";

class Relatorio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: null,
      showNaoAprovaModal: false,
      showAutorizarModal: false,
      meusDados: null,
      showModal: false,
      alteracaoDecardapio: null,
      prazoDoPedidoMensagem: null,
      resposta_sim_nao: null,
      error: false,
      showModalConfirm: false,
      showModalMarcarConferencia: false,
      showModalObservacaoCodae: false,
    };

    this.closeQuestionamentoModal = this.closeQuestionamentoModal.bind(this);
    this.closeNaoAprovaModal = this.closeNaoAprovaModal.bind(this);
    this.closeAutorizarModal = this.closeAutorizarModal.bind(this);
    this.loadSolicitacao = this.loadSolicitacao.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeModalConfirm = this.closeModalConfirm.bind(this);
    this.closeModalMarcarConferencia =
      this.closeModalMarcarConferencia.bind(this);
    this.closeModalObservacaoCodae = this.closeModalObservacaoCodae.bind(this);
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const tipoSolicitacao = urlParams.get("tipoSolicitacao");
    const uuid = urlParams.get("uuid");
    meusDados().then((response) => {
      if (response) {
        this.setState({ meusDados: response });
      } else {
        this.setState({ erro: true });
        toastError("Erro ao carregar dados do usuário");
      }
    });
    if (uuid) {
      getAlteracaoCardapio(uuid, tipoSolicitacao).then((response) => {
        if (response.status === HTTP_STATUS.OK) {
          this.setState({
            alteracaoDeCardapio: response.data,
            uuid,
            tipoSolicitacao,
            prazoDoPedidoMensagem: prazoDoPedidoMensagem(
              response.data.prioridade
            ),
          });
        } else if (response.data.detail) {
          this.setState({ erro: true });
          toastError(getError(response.data));
        } else {
          this.setState({ erro: true });
          toastError(
            "Erro ao carregar relatório de Alteração do Tipo de Alimentação"
          );
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
    getAlteracaoCardapio(uuid, tipoSolicitacao).then((response) => {
      this.setState({
        alteracaoDeCardapio: response.data,
      });
    });
  }

  showModalConfirm() {
    this.setState({ showModalConfirm: true });
  }

  closeModalConfirm() {
    this.setState({ showModalConfirm: false });
  }

  showModalMarcarConferencia() {
    this.setState({ showModalMarcarConferencia: true });
  }

  closeModalMarcarConferencia() {
    this.setState({ showModalMarcarConferencia: false });
  }

  showModalObservacaoCodae() {
    this.setState({ showModalObservacaoCodae: true });
  }

  closeModalObservacaoCodae() {
    this.setState({ showModalObservacaoCodae: false });
    this.props.change("justificativa", "");
  }

  handleSubmit() {
    const { toastAprovaMensagem, toastAprovaMensagemErro } = this.props;
    const uuid = this.state.uuid;
    const tipoSolicitacao = this.state.tipoSolicitacao;
    this.props.endpointAprovaSolicitacao(uuid, {}, tipoSolicitacao).then(
      (response) => {
        if (response.status === HTTP_STATUS.OK) {
          toastSuccess(toastAprovaMensagem);
          this.closeAutorizarModal();
          this.loadSolicitacao(uuid, this.state.tipoSolicitacao);
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
      alteracaoDeCardapio,
      prazoDoPedidoMensagem,
      showQuestionamentoModal,
      meusDados,
      uuid,
      showAutorizarModal,
      erro,
      showModalConfirm,
      showModalMarcarConferencia,
      tipoSolicitacao,
      showModalObservacaoCodae,
    } = this.state;
    const {
      justificativa,
      motivo_cancelamento,
      textoBotaoNaoAprova,
      textoBotaoAprova,
      endpointAprovaSolicitacao,
      endpointNaoAprovaSolicitacao,
      endpointQuestionamento,
      ModalNaoAprova,
      ModalQuestionamento,
      visao,
      motivosDREnaoValida,
    } = this.props;
    const tipoPerfil = localStorage.getItem("tipo_perfil");
    const EXIBIR_BOTAO_NAO_APROVAR =
      tipoPerfil !== TIPO_PERFIL.TERCEIRIZADA ||
      (alteracaoDeCardapio &&
        alteracaoDeCardapio.prioridade !== "REGULAR" &&
        alteracaoDeCardapio.status === statusEnum.CODAE_QUESTIONADO &&
        textoBotaoNaoAprova);
    const EXIBIR_BOTAO_APROVAR =
      (![
        TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA,
        TIPO_PERFIL.TERCEIRIZADA,
      ].includes(tipoPerfil) &&
        textoBotaoAprova) ||
      (alteracaoDeCardapio &&
        (alteracaoDeCardapio.prioridade === "REGULAR" ||
          [
            statusEnum.TERCEIRIZADA_RESPONDEU_QUESTIONAMENTO,
            statusEnum.CODAE_AUTORIZADO,
          ].includes(alteracaoDeCardapio.status)) &&
        textoBotaoAprova);
    const EXIBIR_BOTAO_QUESTIONAMENTO =
      [
        TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA,
        TIPO_PERFIL.TERCEIRIZADA,
      ].includes(tipoPerfil) &&
      alteracaoDeCardapio &&
      (alteracaoDeCardapio.prioridade !== "REGULAR" ||
        (visao === CODAE && alteracaoDeCardapio.prioridade !== "REGULAR")) &&
      [statusEnum.DRE_VALIDADO, statusEnum.CODAE_QUESTIONADO].includes(
        alteracaoDeCardapio.status
      );
    const EXIBIR_MODAL_AUTORIZACAO =
      visao === CODAE &&
      alteracaoDeCardapio &&
      alteracaoDeCardapio.prioridade !== "REGULAR" &&
      !alteracaoDeCardapio.logs[alteracaoDeCardapio.logs.length - 1]
        .resposta_sim_nao;
    const EXIBIR_BOTAO_MARCAR_CONFERENCIA =
      visao === TERCEIRIZADA &&
      alteracaoDeCardapio &&
      [statusEnum.CODAE_AUTORIZADO, statusEnum.ESCOLA_CANCELOU].includes(
        alteracaoDeCardapio.status
      );

    const BotaoMarcarConferencia = () => {
      return (
        <Botao
          texto="Marcar Conferência"
          type={BUTTON_TYPE.BUTTON}
          style={BUTTON_STYLE.GREEN}
          className="ml-3"
          onClick={() => {
            this.showModalMarcarConferencia();
          }}
        />
      );
    };

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
            motivoCancelamento={motivo_cancelamento}
            resposta_sim_nao={resposta_sim_nao}
            uuid={uuid}
            tipoSolicitacao={tipoSolicitacao}
            motivosDREnaoValida={motivosDREnaoValida}
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
            tipoSolicitacao={tipoSolicitacao}
          />
        )}
        {alteracaoDeCardapio && (
          <ModalMarcarConferencia
            showModal={showModalMarcarConferencia}
            closeModal={() => this.closeModalMarcarConferencia()}
            onMarcarConferencia={() => {
              this.loadSolicitacao(uuid, tipoSolicitacao);
            }}
            uuid={alteracaoDeCardapio.uuid}
            endpoint={`alteracoes-cardapio${
              tipoSolicitacao === TIPO_SOLICITACAO.SOLICITACAO_CEI ? "-cei" : ""
            }`}
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
                tipoSolicitacao={tipoSolicitacao}
              />
            )}
            <span className="page-title">{`Alteração do Tipo de Alimentação - Solicitação # ${alteracaoDeCardapio.id_externo}`}</span>
            <div className="card mt-3">
              <div className="card-body">
                <CorpoRelatorio
                  alteracaoDeCardapio={alteracaoDeCardapio}
                  prazoDoPedidoMensagem={prazoDoPedidoMensagem}
                  tipoSolicitacao={tipoSolicitacao}
                  meusDados={meusDados}
                />
                <RelatorioHistoricoJustificativaEscola
                  solicitacao={alteracaoDeCardapio}
                />
                <RelatorioHistoricoQuestionamento
                  solicitacao={alteracaoDeCardapio}
                />
                {visualizaBotoesDoFluxo(alteracaoDeCardapio) && (
                  <div className="form-group d-flex justify-content-end mt-4">
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
                      textoBotaoAprova !== "Ciente" &&
                      (textoBotaoAprova === "Validar" ? (
                        alteracaoDeCardapio.eh_alteracao_com_lanche_repetida ? (
                          <Botao
                            texto={textoBotaoAprova}
                            type={BUTTON_TYPE.BUTTON}
                            onClick={() => this.showModalConfirm()}
                            style={BUTTON_STYLE.GREEN}
                            className="ml-3"
                          />
                        ) : (
                          <Botao
                            texto={textoBotaoAprova}
                            type={BUTTON_TYPE.BUTTON}
                            onClick={() =>
                              EXIBIR_MODAL_AUTORIZACAO
                                ? this.showAutorizarModal()
                                : tipoPerfil ===
                                  TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA
                                ? this.showModalObservacaoCodae()
                                : this.handleSubmit()
                            }
                            style={BUTTON_STYLE.GREEN}
                            className="ml-3"
                          />
                        )
                      ) : visao === CODAE &&
                        alteracaoDeCardapio.logs.filter(
                          (log) =>
                            log.status_evento_explicacao ===
                              "Terceirizada respondeu questionamento" &&
                            !log.resposta_sim_nao
                        ).length > 0 ? null : (
                        <Botao
                          texto={textoBotaoAprova}
                          type={BUTTON_TYPE.BUTTON}
                          onClick={() =>
                            EXIBIR_MODAL_AUTORIZACAO
                              ? this.showAutorizarModal()
                              : tipoPerfil ===
                                TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA
                              ? this.showModalObservacaoCodae()
                              : this.handleSubmit()
                          }
                          style={BUTTON_STYLE.GREEN}
                          className="ml-3"
                        />
                      ))}
                    {EXIBIR_BOTAO_QUESTIONAMENTO &&
                      (alteracaoDeCardapio.motivo.nome !==
                      "Lanche Emergencial" ? (
                        <Botao
                          texto={
                            tipoPerfil ===
                            TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA
                              ? "Questionar"
                              : "Sim"
                          }
                          type={BUTTON_TYPE.BUTTON}
                          onClick={() => this.showQuestionamentoModal("Sim")}
                          style={BUTTON_STYLE.GREEN}
                          className="ml-3"
                        />
                      ) : (
                        <Botao
                          texto="Autorizar"
                          type={BUTTON_TYPE.BUTTON}
                          onClick={() => {
                            tipoPerfil ===
                            TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA
                              ? this.showModalObservacaoCodae()
                              : tipoPerfil ===
                                TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA
                              ? this.showModalObservacaoCodae()
                              : this.handleSubmit();
                          }}
                          style={BUTTON_STYLE.GREEN}
                          className="ml-3"
                        />
                      ))}
                    {EXIBIR_BOTAO_MARCAR_CONFERENCIA && (
                      <div className="form-group float-end mt-4">
                        {alteracaoDeCardapio.terceirizada_conferiu_gestao ? (
                          <label className="ml-3 conferido">
                            <i className="fas fa-check mr-2" />
                            Solicitação Conferida
                          </label>
                        ) : (
                          <BotaoMarcarConferencia
                            uuid={alteracaoDeCardapio.uuid}
                          />
                        )}
                      </div>
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
            <ModalAprovarSolicitacaoAlteracao
              showModal={showModalObservacaoCodae}
              loadSolicitacao={() =>
                this.loadSolicitacao(uuid, tipoSolicitacao)
              }
              justificativa={justificativa}
              closeModal={() => this.closeModalObservacaoCodae()}
              endpoint={endpointAprovaSolicitacao}
              uuid={uuid}
              tipoSolicitacao={tipoSolicitacao}
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
  enableReinitialize: true,
})(Relatorio);

const selector = formValueSelector(formName);

const mapStateToProps = (state) => {
  return {
    justificativa: selector(state, "justificativa"),
    motivo_cancelamento: selector(state, "motivo_cancelamento"),
  };
};

export default connect(mapStateToProps)(RelatorioForm);
