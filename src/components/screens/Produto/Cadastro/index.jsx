import React, { Component, Fragment } from "react";
import HTTP_STATUS from "http-status-codes";
import { reduxForm } from "redux-form";
import Wizard from "../../../Shareable/Wizard";
import Step1 from "./Step1";
import Botao from "../../../Shareable/Botao";
import { BUTTON_TYPE, BUTTON_STYLE } from "../../../Shareable/Botao/constants";
import { loadProduto } from "../../../../reducers/produto.reducer";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getProtocolosDietaEspecial,
  submitProduto,
  getInformacoesGrupo,
  updateProduto,
  getRascunhosDeProduto,
  excluirRascunhoDeProduto
} from "../../../../services/produto.service";
import BuscaProduto from "./BuscaProduto";

import { validaFormularioStep1, retornaPayloadDefault } from "./helpers";
import { toastError, toastSuccess } from "../../../Shareable/Toast/dialogs";
import { getError, deepCopy } from "../../../../helpers/utilities";
import { Rascunhos } from "./Rascunhos";

class cadastroProduto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rascunhos: [],
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
        uuid: null,
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
      renderBuscaProduto: true,
      blockProximoStep3: false
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
    this.removerRascunho = this.removerRascunho.bind(this);
    this.setBlockProximo = this.setBlockProximo.bind(this);
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

    this.setState({ payload, blockProximoStep3: false });
  };

  setArrayErrosStep1 = erros => {
    this.setState({
      arrayErrosStep1: erros
    });
  };

  getRascunhos() {
    getRascunhosDeProduto().then(response => {
      const rascunhos = response.results;
      this.setState({ rascunhos });
    });
  }

  setBlockProximo() {
    this.setState({ blockProximoStep3: true });
  }

  removerRascunho(id_externo, uuid) {
    if (window.confirm("Deseja remover este rascunho?")) {
      excluirRascunhoDeProduto(uuid).then(
        res => {
          if (res === HTTP_STATUS.NO_CONTENT) {
            toastSuccess(`Rascunho # ${id_externo} excluído com sucesso`);
            this.getRascunhos();
          } else {
            toastError(`Erro ao remover rascunho`);
          }
        },
        function() {
          toastError("Houve um erro ao excluir o rascunho");
        }
      );
    }
  }

  carregarRascunho(param) {
    const produtoRaw = deepCopy(param.produto);
    const produto = param.produto;
    this.props.reset("cadastroProduto");
    this.props.loadProduto(produto);
    produto.eh_para_alunos_com_dieta = produtoRaw.eh_para_alunos_com_dieta;
    produto.tem_aditivos_alergenicos = produtoRaw.tem_aditivos_alergenicos;
    produto.marca = produtoRaw.marca.uuid;
    produto.fabricante = produtoRaw.fabricante.uuid;
    let protocolos = [];
    produtoRaw.protocolos.forEach(protocolo => {
      protocolos.push(protocolo.uuid);
    });
    produto.protocolos = protocolos;
    let informacoes_nutricionais = [];
    produtoRaw.informacoes_nutricionais.forEach(informacaoNutricional => {
      informacoes_nutricionais.push({
        informacao_nutricional:
          informacaoNutricional.informacao_nutricional.uuid,
        valor_diario: informacaoNutricional.valor_diario,
        quantidade_porcao: informacaoNutricional.quantidade_porcao
      });
    });
    produto.informacoes_nutricionais = informacoes_nutricionais;
    this.setState({
      renderBuscaProduto: false,
      payload: produto,
      renderizaFormDietaEspecial: produtoRaw.eh_para_alunos_com_dieta,
      renderizaFormAlergenicos: produtoRaw.tem_aditivos_alergenicos
    });
    /*
    this.setState({
      status: inversaoDeDiaDeCardapio.status,
      title: `Inversão de dia de Cardápio # ${
        inversaoDeDiaDeCardapio.id_externo
      }`,
      salvarAtualizarLbl: "Atualizar"
    });
    */
  }

  componentDidMount = async () => {
    const infoAgrupada = await getInformacoesGrupo();

    const response = await getProtocolosDietaEspecial();
    this.setState({
      protocolosDieta: response.data.results,
      informacoesAgrupadas: infoAgrupada.data.results
    });
    this.getRascunhos();
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
    payload["embalagem"] = values.embalagem;
    payload["prazo_validade"] = values.prazo_validade;
    payload["info_armazenamento"] = values.info_armazenamento;
    payload["outras_informacoes"] = values.outras_informacoes;
    payload["numero_registro"] = values.numero_registro;
    payload["cadastro_finalizado"] = true;

    if (!payload["tem_aditivos_alergenicos"]) {
      delete payload["aditivos"];
    }

    return new Promise(async (resolve, reject) => {
      const endpoint = payload.uuid ? updateProduto : submitProduto;
      const response = await endpoint(payload);
      if (
        response.status === HTTP_STATUS.CREATED ||
        response.status === HTTP_STATUS.OK
      ) {
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
        this.getRascunhos();
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

  updateOrCreateProduto(values) {
    const { payload, currentStep } = this.state;
    payload["tipo"] = values.tipo;
    payload["embalagem"] = values.embalagem;
    payload["prazo_validade"] = values.prazo_validade;
    payload["info_armazenamento"] = values.info_armazenamento;
    payload["outras_informacoes"] = values.outras_informacoes;
    payload["numero_registro"] = values.numero_registro;
    if (!payload["porcao"]) {
      delete payload["porcao"];
    }
    if (!payload["unidade_caseira"]) {
      delete payload["unidade_caseira"];
    }
    if (!payload["tem_aditivos_alergenicos"]) {
      delete payload["aditivos"];
    }
    let erros = [];
    if (currentStep === 0) {
      erros = validaFormularioStep1(payload);
    }
    if (erros.length > 0) {
      toastError(erros[0]);
    } else {
      if (!payload.uuid) {
        submitProduto(payload).then(response => {
          if (response.status === HTTP_STATUS.CREATED) {
            toastSuccess("Rascunho salvo com sucesso.");
            payload.uuid = response.data.uuid;
            this.setState({ payload });
          } else if (response.status === HTTP_STATUS.BAD_REQUEST) {
            toastError(getError(response.data));
          } else {
            toastError(`Erro ao salvar rascunho: ${getError(response.data)}`);
          }
        });
      } else {
        return new Promise(async (resolve, reject) => {
          const response = await updateProduto(payload);
          if (response.status === HTTP_STATUS.OK) {
            toastSuccess("Rascunho atualizado com sucesso.");
            resolve();
          } else if (response.status === HTTP_STATUS.BAD_REQUEST) {
            toastError(getError(response.data));
            reject();
          } else {
            toastError(
              `Erro ao atualizar rascunho: ${getError(response.data)}`
            );
            reject();
          }
        });
      }
    }
  }

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
      defaultFabricanteStep1,
      rascunhos,
      blockProximoStep3
    } = this.state;
    const { handleSubmit } = this.props;
    return (
      <Fragment>
        {rascunhos.length > 0 && renderBuscaProduto && (
          <div className="mt-3">
            <span className="page-title">Rascunhos</span>
            <Rascunhos
              rascunhos={rascunhos}
              removerRascunho={this.removerRascunho}
              resetForm={() => this.resetForm()}
              carregarRascunho={params => this.carregarRascunho(params)}
            />
          </div>
        )}
        <div className="card mt-3">
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
                    setBlockProximo={this.setBlockProximo}
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
                    <Botao
                      texto={"Salvar Rascunho"}
                      className="mr-3"
                      type={BUTTON_TYPE.SUBMIT}
                      style={BUTTON_STYLE.GREEN}
                      onClick={handleSubmit(values =>
                        this.updateOrCreateProduto({
                          ...values
                        })
                      )}
                      disabled={
                        (currentStep === 1 &&
                          payload.informacoes_nutricionais.length === 0) ||
                        blockProximoStep3
                      }
                    />
                    {currentStep !== 2 &&
                      (currentStep === 1 ? (
                        payload.informacoes_nutricionais.length === 0 ||
                        blockProximoStep3 ? (
                          <Botao
                            texto={"Próximo"}
                            type={BUTTON_TYPE.BUTTON}
                            style={BUTTON_STYLE.GREEN_OUTLINE}
                            onClick={() => this.validarFormulario()}
                            disabled
                          />
                        ) : (
                          <Botao
                            texto={"Próximo"}
                            type={BUTTON_TYPE.BUTTON}
                            style={BUTTON_STYLE.GREEN_OUTLINE}
                            onClick={() => this.validarFormulario()}
                          />
                        )
                      ) : (
                        <Botao
                          texto={"Próximo"}
                          type={BUTTON_TYPE.BUTTON}
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
      </Fragment>
    );
  }
}

const componentNameForm = reduxForm({
  form: "cadastroProduto",
  enableReinitialize: true
})(cadastroProduto);

const mapStateToProps = state => {
  return {
    initialValues: state.cadastroProduto.data
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadProduto
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(componentNameForm);
