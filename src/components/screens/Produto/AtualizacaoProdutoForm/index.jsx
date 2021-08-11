import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Select, Spin } from "antd";
import Botao from "../../../Shareable/Botao";
import ModalHistorico from "../../../Shareable/ModalHistorico";
import { BUTTON_TYPE, BUTTON_STYLE } from "../../../Shareable/Botao/constants";
import "antd/dist/antd.css";
import "./styles.scss";
import {
  STATUS_CODAE_SUSPENDEU,
  STATUS_CODAE_QUESTIONADO,
  STATUS_CODAE_AUTORIZOU_RECLAMACAO,
  STATUS_TERCEIRIZADA_CANCELOU_SOLICITACAO
} from "configs/constants";
import WizardFormPrimeiraPagina from "./components/WizardFormPrimeiraPagina";
import WizardFormSegundaPagina from "./components/WizardFormSegundaPagina";
import WizardFormTerceiraPagina from "./components/WizardFormTerceiraPagina";
import Wizard from "components/Shareable/Wizard";
import MotivoDaRecusaDeHomologacao from "components/Shareable/MotivoDaRecusaDeHomologacao";
import MotivoDaCorrecaoDeHomologacao from "components/Shareable/MotivoDaCorrecaoDeHomologacao";
import MotivoCacelamentoSolicitacao from "components/Shareable/MotivoCancelamentoSolicitacao";
import {
  getProtocolosDietaEspecial,
  getHomologacao,
  getMarcasProdutos,
  getFabricantesProdutos,
  getInformacoesGrupo
} from "../../../../services/produto.service";
import { connect } from "react-redux";
import { getFormValues } from "redux-form";
import MotivoHomologacao from "components/Shareable/MotivoHomologacao";
import MotivoSuspensao from "components/Shareable/MotivoSuspensao";
import InformativoReclamacao from "components/Shareable/InformativoReclamacao";

const { Option } = Select;

class AtualizacaoProdutoForm extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.limpaProtocolos = this.limpaProtocolos.bind(this);
    this.passouPrimeiroStep = this.passouPrimeiroStep.bind(this);
    this.passouSegundoStep = this.passouSegundoStep.bind(this);
    this.passouTerceiroStep = this.passouTerceiroStep.bind(this);
    this.state = {
      arrayProtocolos: [],
      arrayMarcas: [],
      arrayFabricantes: [],
      page: 0,
      uuid: null,
      loading: true,
      produto: null,
      logs: [],
      informacoesNutricionais: null,
      protocolos: [],
      erro: false,
      primeiroStep: false,
      segundoStep: false,
      terceiroStep: false,
      valoresPrimeiroForm: null,
      valoresSegundoForm: null,
      valoresterceiroForm: null,
      reclamacaoProduto: null,
      verificado: false,
      visible: false,
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
      ]
    };
  }

  limpaProtocolos() {
    this.setState({ protocolos: [] });
  }

  passouSegundoStep(values) {
    values["informacoes_nutricionais"] = [];
    const arrayKeys = Object.keys(values);
    let informacoes = [];
    arrayKeys.forEach(item => {
      item.includes("informacao=") && informacoes.push(item);
    });
    informacoes.forEach(informacao => {
      const uuid = informacao.split("=")[1];
      values["informacoes_nutricionais"].push({
        informacao_nutricional: uuid,
        quantidade_porcao: values[`${informacao}`].porcao,
        valor_diario: values[`${informacao}`].valor_diario
      });
    });

    this.setState({ valoresSegundoForm: values, segundoStep: true });
  }

  passouPrimeiroStep(valuesForm, produtoForm) {
    valuesForm["eh_para_alunos_com_dieta"] =
      produtoForm["eh_para_alunos_com_dieta"];
    valuesForm["tem_aditivos_alergenicos"] =
      produtoForm["tem_aditivos_alergenicos"];
    this.setState({ primeiroStep: true, valoresPrimeiroForm: valuesForm });
  }

  passouTerceiroStep(valuesForm) {
    this.setState({ terceiroStep: true, valoresterceiroForm: valuesForm });
  }

  montaOptions = options => {
    let optionsArray = [];
    options.map(option => {
      optionsArray.push(<Option key={option.uuid}>{`${option.nome}`}</Option>);
    });
    return optionsArray;
  };

  showModalHistorico = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({
      visible: false
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  componentDidMount = async () => {
    let { produto, informacoesNutricionais, logs } = this.state;
    let homologacao = null;
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    try {
      homologacao = await getHomologacao(uuid);
      produto = homologacao.data.produto;
      logs = homologacao.data.logs;
    } catch {
      this.setState({
        loading: false,
        erro: true
      });
    }
    let protocolos = await getProtocolosDietaEspecial();
    let marcas = await getMarcasProdutos();
    let fabricantes = await getFabricantesProdutos();
    let response = await getInformacoesGrupo();
    let arrayProtocolos = this.montaOptions(protocolos.data.results);
    let arrayMarcas = this.montaOptions(marcas.data.results);
    let arrayFabricantes = this.montaOptions(fabricantes.data.results);
    informacoesNutricionais = response.data.results.map(item => {
      item["ativo"] = false;
      return item;
    });
    this.setState({
      arrayProtocolos,
      arrayMarcas,
      arrayFabricantes,
      produto,
      logs,
      informacoesNutricionais
    });
  };

  componentDidUpdate() {
    const {
      arrayProtocolos,
      produto,
      erro,
      loading,
      protocolos,
      arrayMarcas,
      arrayFabricantes
    } = this.state;
    if (
      arrayProtocolos.length > 0 &&
      arrayMarcas.length > 0 &&
      arrayFabricantes.length > 0 &&
      produto !== null &&
      !erro &&
      loading
    ) {
      produto.protocolos.map(protocolo => {
        protocolos.push(`${protocolo.uuid}`);
      });

      this.setState({ loading: false, protocolos });
    }
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  getHistorico = () => {
    return this.state.logs;
  };

  render() {
    const { onSubmit, values } = this.props;
    const {
      page,
      wizardSteps,
      arrayProtocolos,
      loading,
      erro,
      produto,
      protocolos,
      arrayMarcas,
      arrayFabricantes,
      primeiroStep,
      informacoesNutricionais,
      valoresPrimeiroForm,
      valoresSegundoForm,
      segundoStep,
      valoresterceiroForm,
      terceiroStep,
      logs
    } = this.state;
    const status = produto ? produto.ultima_homologacao.status : null;

    return (
      <div className="card">
        <div className="card-body">
          {!loading && !erro ? (
            <Fragment>
              {!!logs.length &&
                !!status &&
                status === STATUS_CODAE_AUTORIZOU_RECLAMACAO && (
                  <InformativoReclamacao
                    homologacao={produto.ultima_homologacao}
                  />
                )}

              {!!logs.length &&
                !!status &&
                status === STATUS_CODAE_SUSPENDEU && (
                  <MotivoSuspensao logs={logs} />
                )}

              {!!logs.length &&
                !!status &&
                status === STATUS_CODAE_QUESTIONADO && (
                  <MotivoDaCorrecaoDeHomologacao logs={logs} />
                )}

              {!!logs.length &&
                !!status &&
                status !== STATUS_CODAE_SUSPENDEU &&
                status !== STATUS_CODAE_AUTORIZOU_RECLAMACAO && (
                  <Fragment>
                    <MotivoDaRecusaDeHomologacao logs={logs} />
                    <MotivoHomologacao logs={logs} />
                  </Fragment>
                )}

              {!!logs.length &&
                !!status &&
                status === STATUS_TERCEIRIZADA_CANCELOU_SOLICITACAO && (
                  <MotivoCacelamentoSolicitacao logs={logs} />
                )}

              <div className="row mb-2">
                <div className="col-12" style={{ alignItems: "flex-end" }}>
                  <Botao
                    type={BUTTON_TYPE.BUTTON}
                    texto="Histórico"
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                    onClick={this.showModalHistorico}
                    className="float-right"
                  />
                </div>
              </div>
              <ModalHistorico
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                logs={logs}
                getHistorico={this.getHistorico}
              />
              <Wizard
                arrayOfObjects={wizardSteps}
                currentStep={page}
                outerParam="step"
                nameItem="nome"
              />
              {page === 0 && (
                <WizardFormPrimeiraPagina
                  onSubmit={this.nextPage}
                  limpaProtocolos={this.limpaProtocolos}
                  passouPrimeiroStep={this.passouPrimeiroStep}
                  arrayProtocolos={arrayProtocolos}
                  arrayMarcas={arrayMarcas}
                  arrayFabricantes={arrayFabricantes}
                  protocolos={protocolos}
                  produto={produto}
                  loading={loading}
                  primeiroStep={primeiroStep}
                  valoresPrimeiroForm={valoresPrimeiroForm}
                  valuesForm={values}
                />
              )}
              {page === 1 && (
                <WizardFormSegundaPagina
                  previousPage={this.previousPage}
                  onSubmit={this.nextPage}
                  valuesForm={values}
                  produto={produto}
                  informacoes={informacoesNutricionais}
                  valoresSegundoForm={valoresSegundoForm}
                  segundoStep={segundoStep}
                  passouSegundoStep={this.passouSegundoStep}
                />
              )}
              {page === 2 && (
                <WizardFormTerceiraPagina
                  previousPage={this.previousPage}
                  onSubmit={onSubmit}
                  valuesForm={values}
                  produto={produto}
                  valoresSegundoForm={valoresSegundoForm}
                  valoresterceiroForm={valoresterceiroForm}
                  terceiroStep={terceiroStep}
                  passouTerceiroStep={this.passouTerceiroStep}
                />
              )}
            </Fragment>
          ) : !erro ? (
            <div className="carregando-conteudo">
              <Spin tip="Carregando..." />
            </div>
          ) : (
            <div>Erro ao carregar Produto</div>
          )}
        </div>
      </div>
    );
  }
}

AtualizacaoProdutoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  values: getFormValues("atualizacaoProduto")(state) || {}
});

export default connect(mapStateToProps)(AtualizacaoProdutoForm);
