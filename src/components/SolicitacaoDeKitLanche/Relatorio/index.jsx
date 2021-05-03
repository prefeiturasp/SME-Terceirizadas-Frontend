import React, { Component } from "react";
import { Link } from "react-router-dom";
import HTTP_STATUS from "http-status-codes";
import { Botao } from "../../Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
  BUTTON_ICON
} from "../../Shareable/Botao/constants";
import { reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { getDetalheKitLancheAvulsa } from "../../../services/kitLanche";
import { visualizaBotoesDoFluxo } from "../../../helpers/utilities";
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
      solicitacaoKitLanche: null,
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
    const tipoSolicitacao = urlParams.get("tipoSolicitacao");

    if (uuid) {
      getDetalheKitLancheAvulsa(uuid, tipoSolicitacao).then(response => {
        this.setState({
          solicitacaoKitLanche: response,
          uuid,
          tipoSolicitacao,
          prazoDoPedidoMensagem: prazoDoPedidoMensagem(response.prioridade)
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
    getDetalheKitLancheAvulsa(uuid, this.state.tipoSolicitacao).then(
      response => {
        this.setState({
          solicitacaoKitLanche: response
        });
      }
    );
  }

  handleSubmit() {
    const {
      toastAprovaMensagem,
      toastAprovaMensagemErro,
      justificativa
    } = this.props;
    const uuid = this.state.uuid;
    const tipoSolicitacao = this.state.tipoSolicitacao;
    this.props
      .endpointAprovaSolicitacao(uuid, justificativa, tipoSolicitacao)
      .then(
        response => {
          if (response.status === HTTP_STATUS.OK) {
            toastSuccess(toastAprovaMensagem);
            this.loadSolicitacao(uuid, tipoSolicitacao);
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
      solicitacaoKitLanche,
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
      (solicitacaoKitLanche &&
        solicitacaoKitLanche.foi_solicitado_fora_do_prazo &&
        solicitacaoKitLanche.status === statusEnum.CODAE_QUESTIONADO &&
        textoBotaoNaoAprova);
    // TODO:  Rever se essa lógica ainda está sendo usada
    const EXIBIR_BOTAO_APROVAR =
      (![
        TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA,
        TIPO_PERFIL.TERCEIRIZADA
      ].includes(tipoPerfil) &&
        textoBotaoAprova) ||
      (solicitacaoKitLanche &&
        (!solicitacaoKitLanche.foi_solicitado_fora_do_prazo ||
          [
            statusEnum.TERCEIRIZADA_RESPONDEU_QUESTIONAMENTO,
            statusEnum.CODAE_AUTORIZADO
          ].includes(solicitacaoKitLanche.status)) &&
        textoBotaoAprova);
    const EXIBIR_BOTAO_QUESTIONAMENTO =
      [
        TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA,
        TIPO_PERFIL.TERCEIRIZADA
      ].includes(tipoPerfil) &&
      solicitacaoKitLanche &&
      (solicitacaoKitLanche.foi_solicitado_fora_do_prazo || visao === CODAE) &&
      [statusEnum.DRE_VALIDADO, statusEnum.CODAE_QUESTIONADO].includes(
        solicitacaoKitLanche.status
      );
    const EXIBIR_MODAL_AUTORIZACAO =
      visao === CODAE &&
      solicitacaoKitLanche &&
      solicitacaoKitLanche.foi_solicitado_fora_do_prazo &&
      !solicitacaoKitLanche.logs[solicitacaoKitLanche.logs.length - 1]
        .resposta_sim_nao;
    return (
      <div className="report">
        {ModalNaoAprova && (
          <ModalNaoAprova
            showModal={showNaoAprovaModal}
            closeModal={this.closeNaoAprovaModal}
            endpoint={endpointNaoAprovaSolicitacao}
            solicitacao={solicitacaoKitLanche}
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
        {!solicitacaoKitLanche ? (
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
                tipoSolicitacao={this.state.tipoSolicitacao}
              />
            )}
            <span className="page-title">{`Kit Lanche Passeio - Solicitação # ${
              solicitacaoKitLanche.id_externo
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
                  solicitacaoKitLanche={solicitacaoKitLanche}
                  prazoDoPedidoMensagem={prazoDoPedidoMensagem}
                  tipoSolicitacao={this.state.tipoSolicitacao}
                />
                <RelatorioHistoricoJustificativaEscola
                  solicitacao={solicitacaoKitLanche}
                />
                <RelatorioHistoricoQuestionamento
                  solicitacao={solicitacaoKitLanche}
                />
                {visualizaBotoesDoFluxo(solicitacaoKitLanche) && (
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
                        solicitacaoKitLanche.logs.filter(
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

const formName = "relatorioKitLanchePasseio";
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
