import React, { Component } from "react";
import { Field } from "redux-form";
import DiagnosticosField from "./componentes/Diagnosticos/Field";
import {
  getAlergiasIntolerancias,
  getAlimentos,
  getClassificacoesDietaEspecial
} from "../../../../../../services/dietaEspecial.service";
import "./style.scss";
import { ClassificacaoDaDieta } from "./componentes/ClassificacaoDaDieta";
import SubstituicoesField from "./componentes/SubstituicoesField";
import InputText from "../../../../../Shareable/Input/InputText";
import CKEditorField from "./componentes/CKEditorField";

class InformacoesCODAE extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classificacaoDieta: "",
      diagnosticos: null,
      classificacoesDieta: null,
      alimentos: []
    };
    this.onClassificacaoChanged = this.onClassificacaoChanged.bind(this);
  }

  onClassificacaoChanged(event) {
    this.setState({
      classificacaoDieta: event.target.value
    });
  }

  componentDidMount = async () => {
    const alergiasIntolerancias = await getAlergiasIntolerancias();
    const alimentos = await getAlimentos();
    const classificacoesDieta = await getClassificacoesDietaEspecial();
    this.setState({
      diagnosticos: alergiasIntolerancias.results,
      classificacoesDieta: classificacoesDieta.results,
      alimentos: alimentos.data
    });
  };

  render() {
    const { alimentos, classificacoesDieta, diagnosticos } = this.state;
    return (
      <div className="information-codae">
        <div className="pt-2 title">Relação por Diagnóstico</div>
        {diagnosticos && (
          <Field
            component={DiagnosticosField}
            name="alergias_intolerancias"
            diagnosticos={diagnosticos}
            required
          />
        )}
        <div className="pt-2 title">Classificação da Dieta</div>
        {classificacoesDieta && (
          <ClassificacaoDaDieta
            name="classificacao"
            onClassificacaoChanged={this.onClassificacaoChanged}
            classificacoes={classificacoesDieta}
            required
          />
        )}
        <div className="card mt-3">
          <div className="card-body">
            <div className="pt-2 title">
              Nome do Protocolo de Dieta Especial
            </div>
            <Field component={InputText} name="nome_protocolo" required />
            <div className="pt-2 title">Substituições de Alimentos</div>
            <Field
              component={SubstituicoesField}
              name="substituicoes"
              required
              alimentos={alimentos}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-9">
            <Field
              component={CKEditorField}
              label="Informações Adicionais"
              name="informacoes_adicionais"
              config={{
                removePlugins: ["Heading", "Link", "BlockQuote"],
                toolbar: [
                  "bold",
                  "italic",
                  "|",
                  "bulletedList",
                  "numberedList",
                  "|",
                  "insertTable",
                  "|",
                  "undo",
                  "redo"
                ]
              }}
            />
          </div>
        </div>
        <div className="pt-2 title">Identificação do Nutricionista</div>
        <div className="row">
          <div className="col-9">
            <Field
              component={InputText}
              name="registro_funcional_nutricionista"
              disabled
            />
          </div>
        </div>
      </div>
    );
  }
}
export default InformacoesCODAE;
