import React, { Component } from "react";
import HTTP_STATUS from "http-status-codes";
import { reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import {
  getDietaEspecial,
  getDietasEspeciaisVigentesDeUmAluno,
  CODAEAutorizaInativacaoDietaEspecial
} from "../../../../services/dietaEspecial.service";
import "./style.scss";
import CorpoRelatorio from "./componentes/CorpoRelatorio";
import { TIPO_PERFIL, statusEnum } from "../../../../constants";
import Botao from "../../../Shareable/Botao";
import InformacoesCODAE from "./componentes/InformacoesCODAE";
import { BUTTON_TYPE, BUTTON_STYLE } from "../../../Shareable/Botao/constants";
import { toastSuccess, toastError } from "../../../Shareable/Toast/dialogs";
import {
  obtemIdentificacaoNutricionista,
  usuarioCODAEDietaEspecial,
  vizualizaBotoesDietaEspecial
} from "../../../../helpers/utilities";
import { formatarSolicitacoesVigentes } from "../Escola/helper";
import ModalAutorizaDietaEspecial from "./componentes/ModalAutorizaDietaEspecial";

class Relatorio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dietaEspecial: null,
      solicitacoesVigentes: null,
      uuid: null,
      showNaoAprovaModal: false,
      ShowCancelaModal: false,
      showAutorizarModal: false
    };
    this.loadSolicitacao = this.loadSolicitacao.bind(this);
    this.closeNaoAprovaModal = this.closeNaoAprovaModal.bind(this);
    this.closeAutorizarModal = this.closeAutorizarModal.bind(this);
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    if (uuid) {
      getDietaEspecial(uuid).then(responseDietaEspecial => {
        getDietasEspeciaisVigentesDeUmAluno(
          responseDietaEspecial.data.aluno.codigo_eol
        ).then(responseDietasVigentes => {
          this.setState({
            solicitacoesVigentes: formatarSolicitacoesVigentes(
              responseDietasVigentes.data.results.filter(
                solicitacaoVigente => solicitacaoVigente.uuid !== uuid
              )
            ),
            dietaEspecial: responseDietaEspecial.data,
            uuid
          });
        });
      });
    }
  }

  loadSolicitacao(uuid) {
    getDietaEspecial(uuid).then(responseDietaEspecial => {
      getDietasEspeciaisVigentesDeUmAluno(
        responseDietaEspecial.data.aluno.codigo_eol
      ).then(responseDietasVigentes => {
        this.setState({
          solicitacoesVigentes: formatarSolicitacoesVigentes(
            responseDietasVigentes.data.results.filter(
              solicitacaoVigente => solicitacaoVigente.uuid !== uuid
            )
          ),
          dietaEspecial: responseDietaEspecial.data
        });
      });
    });
  }

  showNaoAprovaModal(resposta_sim_nao) {
    this.setState({ resposta_sim_nao, showNaoAprovaModal: true });
  }

  showAutorizarModal() {
    this.setState({ showAutorizarModal: true });
  }

  closeNaoAprovaModal() {
    this.setState({ showNaoAprovaModal: false });
  }

  closeAutorizarModal() {
    this.setState({ showAutorizarModal: false });
  }

  handleSubmit(values) {
    const { toastAprovaMensagem, toastAprovaMensagemErro } = this.props;
    const {
      uuid,
      solicitacoesVigentes,
      showAutorizarModal,
      dietaEspecial
    } = this.state;
    if (
      solicitacoesVigentes &&
      solicitacoesVigentes.length > 0 &&
      usuarioCODAEDietaEspecial() &&
      dietaEspecial.status_solicitacao === statusEnum.CODAE_A_AUTORIZAR &&
      !showAutorizarModal
    ) {
      this.showAutorizarModal();
    } else {
      const {
        classificacaoDieta,
        diagnosticosSelecionados,
        identificacaoNutricionista,
        protocolos
      } = values;
      let diagnosticos = null;
      let payload = null;
      if (diagnosticosSelecionados) {
        diagnosticos = diagnosticosSelecionados.filter(
          diagnostico => diagnostico !== ""
        );
        payload = {
          uuid,
          classificacaoDieta,
          diagnosticosSelecionados: diagnosticos,
          identificacaoNutricionista,
          protocolos
        };
      } else {
        payload = uuid;
      }
      this.closeAutorizarModal();
      const endpoint =
        dietaEspecial.status_solicitacao ===
        statusEnum.ESCOLA_SOLICITOU_INATIVACAO
          ? CODAEAutorizaInativacaoDietaEspecial
          : this.props.endpointAprovaSolicitacao;
      endpoint(payload).then(
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
  }

  render() {
    const {
      textoBotaoNaoAprova,
      textoBotaoAprova,
      handleSubmit,
      ModalNaoAprova,
      endpointNaoAprovaSolicitacao,
      justificativa,
      motivo,
      classificacaoDieta,
      protocolos,
      diagnosticosSelecionados
    } = this.props;
    const {
      dietaEspecial,
      showNaoAprovaModal,
      showAutorizarModal,
      uuid,
      solicitacoesVigentes
    } = this.state;
    const tipoPerfil = localStorage.getItem("tipo_perfil");
    const EXIBIR_BOTAO_NAO_APROVAR = tipoPerfil !== TIPO_PERFIL.TERCEIRIZADA;
    return (
      <div>
        {!dietaEspecial ? (
          <div>Carregando...</div>
        ) : (
          <form onSubmit={this.props.handleSubmit}>
            {ModalNaoAprova && (
              <ModalNaoAprova
                showModal={showNaoAprovaModal}
                closeModal={this.closeNaoAprovaModal}
                endpoint={endpointNaoAprovaSolicitacao}
                solicitacao={dietaEspecial}
                loadSolicitacao={this.loadSolicitacao}
                justificativa={justificativa}
                motivo={motivo}
                uuid={uuid}
              />
            )}
            <ModalAutorizaDietaEspecial
              closeModal={this.closeAutorizarModal}
              showModal={showAutorizarModal}
              dietaEspecial={dietaEspecial}
              handleSubmit={handleSubmit(values => this.handleSubmit(values))}
            />
            <span className="page-title">{`Dieta Especial - Solicitação # ${
              dietaEspecial.id_externo
            }`}</span>
            <div className="card mt-3">
              <div className="card-body">
                <CorpoRelatorio
                  uuid={uuid}
                  solicitacoesVigentes={solicitacoesVigentes}
                  dietaEspecial={dietaEspecial}
                />
                {usuarioCODAEDietaEspecial() &&
                  dietaEspecial.status_solicitacao ===
                    statusEnum.CODAE_A_AUTORIZAR && <InformacoesCODAE />}
                {vizualizaBotoesDietaEspecial(dietaEspecial) && (
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
                    {textoBotaoAprova && (
                      <Botao
                        texto={textoBotaoAprova}
                        type={BUTTON_TYPE.SUBMIT}
                        onClick={handleSubmit(values =>
                          this.handleSubmit(values)
                        )}
                        style={BUTTON_STYLE.GREEN}
                        className="ml-3"
                        disabled={
                          usuarioCODAEDietaEspecial()
                            ? (!diagnosticosSelecionados ||
                                !protocolos ||
                                !classificacaoDieta) &&
                              dietaEspecial.status_solicitacao ===
                                statusEnum.CODAE_A_AUTORIZAR
                            : false
                        }
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

const formName = "relatorioDietaEspecial";
const RelatorioForm = reduxForm({
  form: formName,
  enableReinitialize: true,
  initialValues: {
    identificacaoNutricionista: obtemIdentificacaoNutricionista()
  }
})(Relatorio);
const selector = formValueSelector(formName);
const mapStateToProps = state => {
  return {
    justificativa: selector(state, "justificativa_negacao"),
    motivo: selector(state, "motivo_negacao"),
    diagnosticosSelecionados: selector(state, "diagnosticosSelecionados"),
    protocolos: selector(state, "protocolos"),
    classificacaoDieta: selector(state, "classificacaoDieta")
  };
};

export default connect(mapStateToProps)(RelatorioForm);
