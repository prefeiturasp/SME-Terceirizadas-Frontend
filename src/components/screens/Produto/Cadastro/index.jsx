import React, { Component } from "react";
import HTTP_STATUS from "http-status-codes";
import { reduxForm } from "redux-form";
import Wizard from "../../../Shareable/Wizard";
import Step1 from "./Step1";
import Botao from "../../../Shareable/Botao";
import { BUTTON_TYPE, BUTTON_STYLE } from "../../../Shareable/Botao/constants";
import Step2 from "./Step2";
import Step3 from "./Step3";
import {
  getInformacoesNutricionais,
  getProtocolosDietaEspecial,
  submitProduto
} from "../../../../services/produto.service";
import BuscaProduto from "./BuscaProduto";

import { validaFormularioStep1, retornaPayloadDefault } from "./helpers";
import { toastError, toastSuccess } from "../../../Shareable/Toast/dialogs";
import { getError } from "../../../../helpers/utilities";

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

      payload: {
        protocolos: [],
        marca: null,
        fabricante: null,
        imagens: [],
        informacoes_nutricionais: [],
        nome: null,
        eh_para_alunos_com_dieta: null,
        componentes: null,
        tem_aditivos_alergenicos: null,
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
      arrayErrosStep1: [],
      concluidoStep1: false,
      defaultMarcaStep1: null,
      defaultFabricanteStep1: null,
      informacoesAgrupadas: null,
      renderBuscaProduto: true
    };
    this.exibeFormularioInicial = this.exibeFormularioInicial.bind(this);
    this.setaAtributosPrimeiroStep = this.setaAtributosPrimeiroStep.bind(this);
    this.mostrarFormDieta = this.mostrarFormDieta.bind(this);
    this.mostrarFormAlergenico = this.mostrarFormAlergenico.bind(this);
    this.setArrayErrosStep1 = this.setArrayErrosStep1.bind(this);
    this.setDefaultMarcaStep1 = this.setDefaultMarcaStep1.bind(this);
    this.setDefaultFabricanteStep1 = this.setDefaultFabricanteStep1.bind(this);
    this.setaValoresStep2 = this.setaValoresStep2.bind(this);
    this.removeFile = this.removeFile.bind(this);
    this.setFiles = this.setFiles.bind(this);
  }

  setaValoresStep2 = ({
    informacoes_nutricionais,
    porcao,
    unidade_caseira
  }) => {
    const { payload } = this.state;
    payload["informacoes_nutricionais"] = informacoes_nutricionais;
    payload["porcao"] = porcao;
    payload["unidade_caseira"] = unidade_caseira;

    this.setState({ payload });
  };

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

  setDefaultMarcaStep1 = value => {
    this.setState({
      defaultMarcaStep1: value
    });
  };

  setDefaultFabricanteStep1 = value => {
    this.setState({
      defaultFabricanteStep1: value
    });
  };

  removeFile(index) {
    let { payload } = this.state;
    payload.imagens.splice(index, 1);
    this.setState({ payload });
  }

  setFiles(imagens) {
    let { payload } = this.state;
    payload.imagens = imagens;
    this.setState({ payload });
  }

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

    this.setState({ payload, concluidoStep1: true });
  };

  onSubmit = values => {
    const { payload } = this.state;
    payload["tipo"] = values.tipo;

    payload["tipo"] = values.tipo;
    payload["embalagem"] = values.embalagem_primaria;
    payload["prazo_validade"] = values.prazo_validade;
    payload["info_armazenamento"] = values.condicoes;
    payload["outras_informacoes"] = values.resumo_objeto;
    payload["numero_registro"] = values.registro;

    return new Promise(async (resolve, reject) => {
      const response = await submitProduto(payload);
      if (response.status === HTTP_STATUS.CREATED) {
        toastSuccess("Produto cadastrado com sucesso.");
        this.setState({
          payload: retornaPayloadDefault(),
          renderizaFormDietaEspecial: false,
          arrayErrosStep1: [],
          concluidoStep1: false,
          defaultMarcaStep1: null,
          defaultFabricanteStep1: null,
          renderBuscaProduto: true,
          currentStep: 0
        });
        this.props.reset("cadastroProduto");

        resolve();
      } else if (response.status === HTTP_STATUS.BAD_REQUEST) {
        toastError(getError(response.data));
        reject();
      } else {
        toastError(`Erro ao criar produto: ${getError(response.data)}`);
        reject();
      }
    });
  };

  validarFormulario = () => {
    const { payload, currentStep } = this.state;

    let erros = [];
    if (currentStep === 0) {
      erros = validaFormularioStep1(payload);
    }

    if (erros.length > 0) {
      toastError("Preencha todos os campos corretamente");
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
      renderizaFormAlergenicos,
      payload,
      concluidoStep1,
      defaultMarcaStep1,
      defaultFabricanteStep1
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
                  payload={payload}
                  concluidoStep1={concluidoStep1}
                  setDefaultMarcaStep1={this.setDefaultMarcaStep1}
                  defaultMarcaStep1={defaultMarcaStep1}
                  setDefaultFabricanteStep1={this.setDefaultFabricanteStep1}
                  defaultFabricanteStep1={defaultFabricanteStep1}
                />
              )}
              {currentStep === 1 && (
                <Step2
                  informacoesAgrupadas={informacoesAgrupadas}
                  payload={payload}
                  setaValoresStep2={this.setaValoresStep2}
                />
              )}
              {currentStep === 2 && (
                <Step3
                  payload={payload}
                  removeFile={this.removeFile}
                  setFiles={this.setFiles}
                />
              )}
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
                  {currentStep !== 2 &&
                    (currentStep === 1 ? (
                      payload.informacoes_nutricionais.length === 0 ? (
                        <Botao
                          texto={"Próximo"}
                          type={BUTTON_TYPE.SUBMIT}
                          style={BUTTON_STYLE.GREEN_OUTLINE}
                          onClick={() => this.validarFormulario()}
                          disabled
                        />
                      ) : (
                        <Botao
                          texto={"Próximo"}
                          type={BUTTON_TYPE.SUBMIT}
                          style={BUTTON_STYLE.GREEN_OUTLINE}
                          onClick={() => this.validarFormulario()}
                        />
                      )
                    ) : (
                      <Botao
                        texto={"Próximo"}
                        type={BUTTON_TYPE.SUBMIT}
                        style={BUTTON_STYLE.GREEN_OUTLINE}
                        onClick={() => this.validarFormulario()}
                      />
                    ))}
                  {currentStep === 2 && (
                    <Botao
                      texto={"Enviar"}
                      type={BUTTON_TYPE.SUBMIT}
                      style={BUTTON_STYLE.GREEN}
                      onClick={handleSubmit(values =>
                        this.onSubmit({
                          ...values
                        })
                      )}
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
