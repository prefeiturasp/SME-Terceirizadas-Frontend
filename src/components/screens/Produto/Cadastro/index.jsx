import React, { Component } from "react";
import { reduxForm } from "redux-form";
import Wizard from "../../../Shareable/Wizard";
import Step1 from "./Step1";
import Botao from "../../../Shareable/Botao";
import { BUTTON_TYPE, BUTTON_STYLE } from "../../../Shareable/Botao/constants";
import Step2 from "./Step2";
import Step3 from "./Step3";
import {
  getInformacoesNutricionais,
  getProtocolosDietaEspecial
} from "../../../../services/produto.service";
import BuscaProduto from "./BuscaProduto";

import { validaFormularioStep1 } from "./helpers";
import { toastError } from "../../../Shareable/Toast/dialogs";

class cadastroProduto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      protocolosDieta: [],
      currentStep: 0,
      wizardSteps: [
        {
          step: {
            nome: "Identificação"
          }
        },
        {
          step: {
            nome: "Informação Nutricional"
          }
        },
        {
          step: {
            nome: "Informação do Produto"
          }
        }
      ],
      informacoesAgrupadas: null,
      renderBuscaProduto: true,
      payload: {
        protocolos: [],
        marca: null,
        fabricante: null,
        imagens: [
          {
            nome: null,
            arquivo: null
          }
        ],
        informacoes_nutricionais: [
          {
            informacao_nutricional: null,
            quantidade_porcao: null,
            valor_diario: null
          }
        ],
        nome: null,
        eh_para_alunos_com_dieta: null,
        detalhes_da_dieta: null,
        componentes: null,
        tem_aditivos_alergenicos: false,
        aditivos: null,
        tipo: null,
        embalagem: null,
        prazo_validade: null,
        info_armazenamento: null,
        outras_informacoes: null,
        numero_registro: null,
        porcao: null,
        unidade_caseira: null
      },
      renderizaFormDietaEspecial: false,
      renderizaFormAlergenicos: false,
      arrayErrosStep1: []
    };
    this.exibeFormularioInicial = this.exibeFormularioInicial.bind(this);
    this.setaAtributosPrimeiroStep = this.setaAtributosPrimeiroStep.bind(this);
    this.mostrarFormDieta = this.mostrarFormDieta.bind(this);
    this.mostrarFormAlergenico = this.mostrarFormAlergenico.bind(this);
    this.setArrayErrosStep1 = this.setArrayErrosStep1.bind(this);
  }

  setArrayErrosStep1 = erros => {
    this.setState({
      arrayErrosStep1: erros
    });
  };

  getInformacoesAgrupadas = () => {
    getInformacoesNutricionais().then(response => {
      this.setState({ informacoesAgrupadas: response.data.results });
    });
  };

  componentDidMount = async () => {
    this.getInformacoesAgrupadas();

    const response = await getProtocolosDietaEspecial();
    this.setState({
      protocolosDieta: response.data.results
    });
  };

  exibeFormularioInicial = () => {
    this.setState({ renderBuscaProduto: false });
  };

  mostrarFormDieta = value => {
    this.setState({
      renderizaFormDietaEspecial: value
    });
  };

  mostrarFormAlergenico = value => {
    this.setState({
      renderizaFormAlergenicos: value
    });
  };

  setaAtributosPrimeiroStep = ({
    protocolos,
    marca,
    fabricante,
    eh_para_alunos_com_dieta,
    detalhes_da_dieta,
    nome,
    componentes,
    tem_aditivos_alergenicos,
    aditivos
  }) => {
    let { payload } = this.state;

    payload.protocolos = protocolos;
    payload.marca = marca;
    payload.fabricante = fabricante;
    payload.eh_para_alunos_com_dieta = eh_para_alunos_com_dieta;
    payload.detalhes_da_dieta = detalhes_da_dieta;
    payload.nome = nome;
    payload.componentes = componentes;
    payload.tem_aditivos_alergenicos = tem_aditivos_alergenicos;
    payload.aditivos = aditivos;

    this.setState({ payload });
  };

  validarFormulario = () => {
    const { payload, currentStep } = this.state;
    const erros = validaFormularioStep1(payload);
    if (erros.length > 0) {
      erros.forEach(erro => {
        toastError(erro);
      });
    } else {
      this.setState({ currentStep: currentStep + 1 });
    }
  };

  render() {
    const {
      wizardSteps,
      currentStep,
      informacoesAgrupadas,
      renderBuscaProduto,
      protocolosDieta,
      renderizaFormDietaEspecial,
      renderizaFormAlergenicos
    } = this.state;
    const { handleSubmit } = this.props;
    return (
      <div className="card">
        <div className="card-body">
          {renderBuscaProduto ? (
            <BuscaProduto
              exibeFormularioInicial={this.exibeFormularioInicial}
            />
          ) : (
            <form className="special-diet" onSubmit={handleSubmit}>
              <Wizard
                arrayOfObjects={wizardSteps}
                currentStep={currentStep}
                outerParam="step"
                nameItem="nome"
              />
              {currentStep === 0 && (
                <Step1
                  protocolosDieta={protocolosDieta}
                  setaAtributosPrimeiroStep={this.setaAtributosPrimeiroStep}
                  renderizaFormDietaEspecial={renderizaFormDietaEspecial}
                  mostrarFormDieta={this.mostrarFormDieta}
                  mostrarFormAlergenico={this.mostrarFormAlergenico}
                  renderizaFormAlergenicos={renderizaFormAlergenicos}
                  setArrayErrosStep1={this.setArrayErrosStep1}
                />
              )}
              {currentStep === 1 && (
                <Step2 informacoesAgrupadas={informacoesAgrupadas} />
              )}
              {currentStep === 2 && <Step3 />}
              <div className="row">
                <div className="col-12 text-right pt-3">
                  <Botao
                    texto={"Anterior"}
                    className="mr-3"
                    type={BUTTON_TYPE.BUTTON}
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                    disabled={currentStep === 0}
                    onClick={() =>
                      this.setState({ currentStep: currentStep - 1 })
                    }
                  />
                  <Botao
                    texto={"Salvar Rascunho"}
                    className="mr-3"
                    type={BUTTON_TYPE.BUTTON}
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                    disabled
                  />
                  {currentStep !== 2 && (
                    <Botao
                      texto={"Próximo"}
                      type={BUTTON_TYPE.SUBMIT}
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                      onClick={() => this.validarFormulario()}
                    />
                  )}
                  {currentStep === 2 && (
                    <Botao
                      texto={"Enviar"}
                      type={BUTTON_TYPE.SUBMIT}
                      style={BUTTON_STYLE.GREEN}
                    />
                  )}
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }
}

const componentNameForm = reduxForm({
  form: "cadastroProduto"
})(cadastroProduto);

export default componentNameForm;
