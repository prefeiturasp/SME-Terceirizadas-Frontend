import React, { Component } from "react";
import { Field } from "redux-form";
import DiagnosticosField from "./componentes/Diagnosticos/Field";
import {
  getAlergiasIntolerancias,
  getClassificacoesDietaEspecial
} from "../../../../../../services/dietaEspecial.service";
import "./style.scss";
import { ClassificacaoDaDieta } from "./componentes/ClassificacaoDaDieta";
import ProtocolosField from "./componentes/ProtocolosField";
import InputText from "../../../../../Shareable/Input/InputText";

class InformacoesCODAE extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classificacaoDieta: "",
      diagnosticos: null,
      classificacoesDieta: null
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
    const classificacoesDieta = await getClassificacoesDietaEspecial();
    this.setState({
      diagnosticos: alergiasIntolerancias.results,
      classificacoesDieta: classificacoesDieta.results
    });
  };

  render() {
    const { diagnosticos, classificacoesDieta } = this.state;
    return (
      <div className="information-codae">
        <div className="title">Relação por Diagnóstico</div>
        {diagnosticos && (
          <Field
            component={DiagnosticosField}
            name="diagnosticosSelecionados"
            diagnosticos={diagnosticos}
            required
          />
        )}
        <div className="pt-2 title">Classificação da Dieta</div>
        {classificacoesDieta && (
          <ClassificacaoDaDieta
            name="classificacaoDieta"
            onClassificacaoChanged={this.onClassificacaoChanged}
            classificacoes={classificacoesDieta}
            required
          />
        )}
        <div className="pt-2 title">Protocolo da Dieta Especial</div>
        <Field component={ProtocolosField} name="protocolos" required />
        <div className="pt-2 title">Identificação do Nutricionista</div>
        <div className="row">
          <div className="col-9">
            <Field
              component={InputText}
              name="identificacaoNutricionista"
              disabled
            />
          </div>
        </div>
      </div>
    );
  }
}
export default InformacoesCODAE;
