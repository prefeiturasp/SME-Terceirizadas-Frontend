import React, { Component } from "react";
import HTTP_STATUS from "http-status-codes";
import { reduxForm } from "redux-form";
import { getDietaEspecial } from "../../../../services/dietaEspecial.service";
import "./style.scss";
import CorpoRelatorio from "./componentes/CorpoRelatorio";
import { TIPO_PERFIL } from "../../../../constants";
import Botao from "../../../Shareable/Botao";
import InformacoesCODAE from "./componentes/InformacoesCODAE";
import { BUTTON_TYPE, BUTTON_STYLE } from "../../../Shareable/Botao/constants";
import { toastSuccess, toastError } from "../../../Shareable/Toast/dialogs";
import { obtemIdentificacaoNutricionista } from "../../../../helpers/utilities";

class Relatorio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dietaEspecial: null,
      uuid: null
    };
    this.loadSolicitacao = this.loadSolicitacao.bind(this);
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    if (uuid) {
      getDietaEspecial(uuid).then(response => {
        this.setState({
          dietaEspecial: response.data,
          uuid
        });
      });
    }
  }

  loadSolicitacao(uuid) {
    getDietaEspecial(uuid).then(response => {
      this.setState({
        dietaEspecial: response.data
      });
    });
  }

  handleSubmit(values) {
    console.log(values);
    const { toastAprovaMensagem, toastAprovaMensagemErro } = this.props;
    const uuid = this.state.uuid;
    const {
      classificacaoDieta,
      diagnosticosSelecionados,
      identificacaoNutricionista,
      protocolos
    } = values;
    let diagnosticos = diagnosticosSelecionados.filter(d => d !== "");
    this.props
      .endpointAprovaSolicitacao({
        uuid,
        classificacaoDieta,
        diagnosticosSelecionados: diagnosticos,
        identificacaoNutricionista,
        protocolos
      })
      .then(
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
    const { textoBotaoNaoAprova, textoBotaoAprova, handleSubmit } = this.props;
    const { dietaEspecial } = this.state;
    const tipoPerfil = localStorage.getItem("tipo_perfil");
    const EXIBIR_BOTAO_NAO_APROVAR = tipoPerfil !== TIPO_PERFIL.TERCEIRIZADA;
    const EXIBIR_BOTAO_APROVAR =
      [TIPO_PERFIL.DIETA_ESPECIAL, TIPO_PERFIL.TERCEIRIZADA].includes(
        tipoPerfil
      ) && textoBotaoAprova;
    return (
      <div>
        {!dietaEspecial ? (
          <div>Carregando...</div>
        ) : (
          <form onSubmit={this.props.handleSubmit}>
            <span className="page-title">{`Dieta Especial - Solicitação # ${
              dietaEspecial.id_externo
            }`}</span>
            <div className="card mt-3">
              <div className="card-body">
                <CorpoRelatorio dietaEspecial={dietaEspecial} />
                <InformacoesCODAE />
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
                      onClick={handleSubmit(values =>
                        this.handleSubmit(values)
                      )}
                      style={BUTTON_STYLE.GREEN}
                      className="ml-3"
                    />
                  )}
                </div>
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

export default RelatorioForm;
