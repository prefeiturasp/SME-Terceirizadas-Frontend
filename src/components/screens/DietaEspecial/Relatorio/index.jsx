import React, { Component } from "react";
import HTTP_STATUS from "http-status-codes";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { reduxForm, formValueSelector } from "redux-form";

import {
  getDietaEspecial,
  getDietasEspeciaisVigentesDeUmAluno,
  CODAEAutorizaInativacaoDietaEspecial,
  CODAENegaInativacaoDietaEspecial,
  terceirizadaTomaCienciaInativacaoDietaEspecial
} from "../../../../services/dietaEspecial.service";
import { getProtocoloDietaEspecial } from "../../../../services/relatorios";
import "./style.scss";
import CorpoRelatorio from "./componentes/CorpoRelatorio";
import { TIPO_PERFIL, statusEnum } from "../../../../constants";
import Botao from "../../../Shareable/Botao";
import InformacoesCODAE from "./componentes/InformacoesCODAE";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
  BUTTON_ICON
} from "../../../Shareable/Botao/constants";
import { toastSuccess, toastError } from "../../../Shareable/Toast/dialogs";
import {
  converterDDMMYYYYparaYYYYMMDD,
  obtemIdentificacaoNutricionista,
  usuarioCODAEDietaEspecial,
  vizualizaBotoesDietaEspecial
} from "../../../../helpers/utilities";
import { formatarSolicitacoesVigentes } from "../Escola/helper";
import ModalAutorizaDietaEspecial from "./componentes/ModalAutorizaDietaEspecial";

const validaSubstituicoes = substituicoes => {
  for (let substituicao of substituicoes) {
    if (
      !substituicao.alimento ||
      !substituicao.tipo ||
      !substituicao.substitutos ||
      substituicao.substitutos.length === 0
    ) {
      return false;
    }
  }
  return true;
};

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

  handleSubmit = async values => {
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
      return;
    }
    const {
      alergias_intolerancias,
      classificacao,
      data_termino,
      informacoes_adicionais,
      nome_protocolo,
      registro_funcional_nutricionista,
      substituicoes
    } = values;
    let alergias = null;
    let payload = null;
    if (alergias_intolerancias) {
      alergias = alergias_intolerancias.filter(d => d !== "");
      payload = {
        uuid,
        classificacao,
        alergias_intolerancias: alergias,
        registro_funcional_nutricionista,
        nome_protocolo,
        informacoes_adicionais,
        substituicoes: substituicoes.map(s =>
          Object.assign({}, s, {
            tipo: s.tipo === "isento" ? "I" : "S"
          })
        )
      };
      if (data_termino) {
        payload.data_termino = converterDDMMYYYYparaYYYYMMDD(data_termino);
      }
    } else {
      payload = uuid;
    }
    this.closeAutorizarModal();
    const endpoint =
      dietaEspecial.status_solicitacao ===
      statusEnum.ESCOLA_SOLICITOU_INATIVACAO
        ? CODAEAutorizaInativacaoDietaEspecial
        : dietaEspecial.status_solicitacao ===
          statusEnum.CODAE_AUTORIZOU_INATIVACAO
        ? terceirizadaTomaCienciaInativacaoDietaEspecial
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
  };

  deveDesabilitarBotaoAprova() {
    const {
      classificacao,
      alergias_intolerancias,
      nome_protocolo,
      substituicoes
    } = this.props;
    const alergias_intolerancias_vazio =
      alergias_intolerancias.length === 1 && alergias_intolerancias[0] === "";
    return (
      usuarioCODAEDietaEspecial() &&
      (!alergias_intolerancias ||
        alergias_intolerancias_vazio ||
        !classificacao ||
        !nome_protocolo ||
        !validaSubstituicoes(substituicoes)) &&
      this.state.dietaEspecial.status_solicitacao ===
        statusEnum.CODAE_A_AUTORIZAR
    );
  }

  render() {
    const {
      textoBotaoNaoAprova,
      textoBotaoAprova,
      handleSubmit,
      ModalNaoAprova,
      endpointNaoAprovaSolicitacao,
      justificativa,
      motivo
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
          <form onSubmit={handleSubmit(this.handleSubmit)}>
            {ModalNaoAprova && (
              <ModalNaoAprova
                showModal={showNaoAprovaModal}
                closeModal={this.closeNaoAprovaModal}
                endpoint={
                  dietaEspecial.status_solicitacao ===
                  statusEnum.CODAE_A_AUTORIZAR
                    ? endpointNaoAprovaSolicitacao
                    : CODAENegaInativacaoDietaEspecial
                }
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
                {dietaEspecial.status_solicitacao ===
                  statusEnum.CODAE_AUTORIZADO ||
                dietaEspecial.status_solicitacao ===
                  statusEnum.TERCEIRIZADA_TOMOU_CIENCIA ||
                vizualizaBotoesDietaEspecial(dietaEspecial) ? (
                  <div className="form-group row float-right mt-4">
                    {dietaEspecial.status_solicitacao !==
                      statusEnum.CODAE_A_AUTORIZAR && (
                      <Link
                        to="route"
                        target="_blank"
                        onClick={event => {
                          event.preventDefault();
                          window.open(
                            getProtocoloDietaEspecial(dietaEspecial.uuid)
                          );
                        }}
                      >
                        <Botao
                          texto="Gerar Protocolo"
                          type={BUTTON_TYPE.BUTTON}
                          style={BUTTON_STYLE.BLUE_OUTLINE}
                          icon={BUTTON_ICON.PRINT}
                          className="ml-3"
                        />
                      </Link>
                    )}
                    {vizualizaBotoesDietaEspecial(dietaEspecial) &&
                      EXIBIR_BOTAO_NAO_APROVAR && (
                        <Botao
                          texto={textoBotaoNaoAprova}
                          className="ml-3"
                          onClick={() => this.showNaoAprovaModal("Não")}
                          type={BUTTON_TYPE.BUTTON}
                          style={BUTTON_STYLE.GREEN_OUTLINE}
                        />
                      )}
                    {vizualizaBotoesDietaEspecial(dietaEspecial) &&
                      textoBotaoAprova && (
                        <Botao
                          texto={textoBotaoAprova}
                          type={BUTTON_TYPE.SUBMIT}
                          style={BUTTON_STYLE.GREEN}
                          className="ml-3"
                          disabled={this.deveDesabilitarBotaoAprova}
                        />
                      )}
                  </div>
                ) : (
                  ""
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
    registro_funcional_nutricionista: obtemIdentificacaoNutricionista(),
    substituicoes: [{}]
  }
})(Relatorio);
const selector = formValueSelector(formName);
const mapStateToProps = state => {
  return {
    justificativa: selector(state, "justificativa_negacao"),
    motivo: selector(state, "motivo_negacao"),
    alergias_intolerancias: selector(state, "alergias_intolerancias"),
    substituicoes: selector(state, "substituicoes"),
    nome_protocolo: selector(state, "nome_protocolo"),
    classificacao: selector(state, "classificacao")
  };
};

export default connect(mapStateToProps)(RelatorioForm);
