import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";

import DiagnosticosField from "../../components/screens/DietaEspecial/Relatorio/componentes/InformacoesCODAE/componentes/Diagnosticos/Field";
import ProtocolosField from "../../components/screens/DietaEspecial/Relatorio/componentes/InformacoesCODAE/componentes/ProtocolosField";
import { obtemIdentificacaoNutricionista } from "../../helpers/utilities";

import Botao from "../../components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "../../components/Shareable/Botao/constants";

import {
  toastSuccess,
  toastError
} from "../../components/Shareable/Toast/dialogs";
import InputText from "../../components/Shareable/Input/InputText";
import RadioboxGroup from "../../components/Shareable/RadioboxGroup";

import CabecalhoSolicitacao from "./Components/CabecalhoSolicitacao";
import LinhaSolicitacao from "./Components/LinhaSolicitacao";
import ModalNegaSolicitacao from "./ModalNegaSolicitacao";

import "./style.scss";

import {
  CODAEAutorizaDietaEspecial,
  getAlergiasIntolerancias,
  getClassificacoesDietaEspecial
} from "../../services/dietaEspecial.service";

class Relatorio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: null,
      classificacoesDieta: [],
      diagnosticos: []
    };
  }

  componentDidMount = async () => {
    const alergiasIntolerancias = await getAlergiasIntolerancias();
    const classificacoesDieta = await getClassificacoesDietaEspecial();
    this.setState({
      diagnosticos: alergiasIntolerancias.results,
      classificacoesDieta: classificacoesDieta.results
    });
  };

  render() {
    const {
      abreModalNegacao,
      dietaEspecial,
      handleSubmit,
      invalid
    } = this.props;
    const { classificacoesDieta, diagnosticos } = this.state;
    if (!dietaEspecial) return <div>Carregando...</div>;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <CabecalhoSolicitacao dietaEspecial={dietaEspecial} />
          <LinhaSolicitacao titulo="Relação por Diagnóstico" />
          <Field
            component={DiagnosticosField}
            name="diagnosticosSelecionados"
            diagnosticos={diagnosticos}
            required
          />
          <LinhaSolicitacao titulo="Classificação da Dieta">
            <div className="col-12">
              <RadioboxGroup
                name="classificacaoDieta"
                required
                options={classificacoesDieta.map(cd => {
                  return {
                    value: cd.id.toString(),
                    label: cd.nome
                  };
                })}
              />
            </div>
          </LinhaSolicitacao>
          <LinhaSolicitacao titulo="Protocolo da Dieta Especial" />
          <Field component={ProtocolosField} name="protocolos" required />
          <LinhaSolicitacao titulo="Identificação do Nutricionista">
            <div className="col-9" id="identificacaoNutricionista">
              <Field
                component={InputText}
                name="identificacaoNutricionista"
                disabled
              />
            </div>
          </LinhaSolicitacao>
          <div className="row">
            <div className="col-12">
              <Botao
                style={BUTTON_STYLE.GREEN_OUTLINE}
                className="float-right"
                texto="Autorizar"
                type={BUTTON_TYPE.SUBMIT}
                disabled={invalid}
              />
              <Botao
                style={BUTTON_STYLE.GREEN_OUTLINE}
                className="float-right"
                texto="Negar"
                onClick={abreModalNegacao}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
let RelatorioForm = reduxForm({
  form: "autorizacao-dieta-especial",
  enableReinitialize: true,
  initialValues: {
    identificacaoNutricionista: obtemIdentificacaoNutricionista()
  },
  validate: ({ protocolos, classificacaoDieta, diagnosticosSelecionados }) => {
    let errors = {};
    if (protocolos === undefined || protocolos.length === 0) {
      errors.protocolos = "Por favor anexe o protocolo da dieta.";
    }
    if (
      diagnosticosSelecionados === undefined ||
      diagnosticosSelecionados === "" ||
      (diagnosticosSelecionados.length === 1 &&
        diagnosticosSelecionados[0] === "")
    ) {
      errors.diagnosticosSelecionados =
        "Pelo menos um diagnóstico deve ser adicionado";
    }
    if (classificacaoDieta === undefined) {
      errors.classificacaoDieta = "Selecione a classificação da dieta";
    }
    return errors;
  }
})(Relatorio);

export default class EditarPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModalNegacao: false
    };
    this.abreModalNegacao = this.abreModalNegacao.bind(this);
    this.fechaModalNegacao = this.fechaModalNegacao.bind(this);
  }

  abreModalNegacao() {
    this.setState({ showModalNegacao: true });
  }
  fechaModalNegacao() {
    this.setState({ showModalNegacao: false });
  }

  submit = async formData => {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    const {
      classificacaoDieta,
      diagnosticosSelecionados,
      identificacaoNutricionista,
      protocolos
    } = formData;
    let diagnosticos = diagnosticosSelecionados.filter(d => d !== "");
    const resposta = await CODAEAutorizaDietaEspecial({
      uuid,
      classificacaoDieta,
      diagnosticosSelecionados: diagnosticos,
      identificacaoNutricionista,
      protocolos
    });
    if (resposta.status === 200) {
      toastSuccess(resposta.data.mensagem);
      this.props.onModificaSolicitacao();
    } else {
      toastError(`Erro ao autorizar solicitação: ${resposta}`);
    }
  };

  render() {
    return (
      <div>
        <ModalNegaSolicitacao
          show={this.state.showModalNegacao}
          onClose={this.fechaModalNegacao}
          onNegaSolicitacao={this.props.onModificaSolicitacao}
        />
        <RelatorioForm
          onSubmit={this.submit}
          dietaEspecial={this.props.dietaEspecial}
          abreModalNegacao={this.abreModalNegacao}
          {...this.props}
        />
      </div>
    );
  }
}
