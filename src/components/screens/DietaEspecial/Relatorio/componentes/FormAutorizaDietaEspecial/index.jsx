import moment from "moment";
import React, { Component } from 'react'
import { Form, Field } from 'react-final-form'
import arrayMutators from "final-form-arrays"

import {
  getAlergiasIntolerancias,
  getAlimentos,
  getClassificacoesDietaEspecial
} from "../../../../../../services/dietaEspecial.service";

import { required } from "../../../../../../helpers/fieldValidators"
import {
  converterDDMMYYYYparaYYYYMMDD,
  obtemIdentificacaoNutricionista,
  usuarioCODAEDietaEspecial,
  vizualizaBotoesDietaEspecial
} from "../../../../../../helpers/utilities";

import Botao from "../../../../../Shareable/Botao";
import InputText from "../../../../../Shareable/Input/InputText";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
  BUTTON_ICON
} from "../../../../../Shareable/Botao/constants";

import DiagnosticosField from "../InformacoesCODAE/componentes/Diagnosticos/Field";
import ClassificacaoDaDieta from "../InformacoesCODAE/componentes/ClassificacaoDaDieta";
import SubstituicoesField from "../InformacoesCODAE/componentes/SubstituicoesField";
import DataOpcional from "../InformacoesCODAE/componentes/DataOpcional";
import ModalNegaDietaEspecial from "../ModalNegaDietaEspecial";
import CKEditorField from "../../../../../Shareable/CKEditorField";

export default class FormAutorizaDietaEspecial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classificacaoDieta: "",
      diagnosticos: null,
      classificacoesDieta: null,
      alimentos: []
    };
    this.showNaoAprovaModal = this.showNaoAprovaModal.bind(this)
    this.showAutorizarModal = this.showAutorizarModal.bind(this)
    this.closeNaoAprovaModal = this.closeNaoAprovaModal.bind(this)
    this.closeAutorizarModal = this.closeAutorizarModal.bind(this)
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

  showNaoAprovaModal() {
    this.setState({ showNaoAprovaModal: true });
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

  render(){
    const { diagnosticos, classificacoesDieta, alimentos, showNaoAprovaModal } = this.state;
    const { dietaEspecial } = this.props;
    return(
      <div>
        <Form
          mutators={{...arrayMutators}}
          onSubmit={(values) => setTimeout(() => console.log('onSubmit.values', values), 2000)}
          initialValues={{
            registro_funcional_nutricionista: obtemIdentificacaoNutricionista(),
            substituicoes: [{}]
          }}
          render={({ handleSubmit, errors, submitting, values }) => (
            <form onSubmit={handleSubmit}>
              <div className="information-codae">
                <div className="pt-2 title">Relação por Diagnóstico</div>
                {diagnosticos && (
                  <Field
                    component={DiagnosticosField}
                    name="alergias_intolerancias"
                    diagnosticos={diagnosticos}
                    validate={required}
                  />
                )}
                <div className="pt-2 title">Classificação da Dieta</div>
                {classificacoesDieta && (
                  <Field
                    component={ClassificacaoDaDieta}
                    name="classificacao"
                    onClassificacaoChanged={this.onClassificacaoChanged}
                    classificacoes={classificacoesDieta}
                    validate={required}
                  />
                )}
                <div className="card mt-3">
                <div className="card-body">
                  <div className="pt-2 title">
                    Nome do Protocolo de Dieta Especial
                  </div>
                  <Field component={InputText} name="nome_protocolo" validate={required} />
                  <div className="pt-2 title">Substituições de Alimentos</div>
                  <SubstituicoesField
                    alimentos={alimentos}
                  />
                  <div className="row">
                    <div className="col-12">
                      <Field
                        component={DataOpcional}
                        label="Data de Término"
                        labelLigado="Com data de término"
                        labelDesligado="Sem data de término"
                        minDate={moment().add(1, "day")["_d"]}
                        name="data_termino"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-9">
                      <Field
                        component={CKEditorField}
                        label="Informações Adicionais"
                        name="informacoes_adicionais"
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
              </div>
                <Botao
                  texto="Negar"
                  type={BUTTON_TYPE.BUTTON}
                  style={BUTTON_STYLE.GREEN_OUTLINE}
                  onClick={() => this.showNaoAprovaModal("Não")}
                  className="ml-3"
                  disabled={submitting}
                />
                <Botao
                  texto="Autorizar"
                  type={BUTTON_TYPE.SUBMIT}
                  style={BUTTON_STYLE.GREEN}
                  className="ml-3"
                  disabled={submitting}
                />
              </div>
            </form>
          )}
        />
        <ModalNegaDietaEspecial
          showModal={showNaoAprovaModal}
          closeModal={this.closeNaoAprovaModal}
          onNaoAprova={this.loadSolicitacao}
          uuid={dietaEspecial.uuid}
        />
      </div>
    )
  }
}