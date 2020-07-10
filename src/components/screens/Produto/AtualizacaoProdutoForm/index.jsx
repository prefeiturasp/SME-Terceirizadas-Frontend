import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Select, Spin } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import WizardFormPrimeiraPagina from "./components/WizardFormPrimeiraPagina";
import WizardFormSegundaPagina from "./components/WizardFormSegundaPagina";
import WizardFormTerceiraPagina from "./components/WizardFormTerceiraPagina";
import Wizard from "components/Shareable/Wizard";
import MotivoDaRecusaDeHomologacao from "components/Shareable/MotivoDaRecusaDeHomologacao";
import {
  getProtocolosDietaEspecial,
  getHomologacao,
  getMarcasProdutos,
  getFabricantesProdutos,
  getInformacoesGrupo,
  getReclamacaoDeProduto
} from "../../../../services/produto.service";
import { connect } from "react-redux";
import { getFormValues } from "redux-form";
import { produtoEhReclamacao, retornaData } from "../Homologacao/helper";
import MotivoHomologacao from "components/Shareable/MotivoHomologacao";

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

  componentDidMount = async () => {
    let { produto, informacoesNutricionais, logs, verificado } = this.state;
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

    if (produto !== null && !verificado) {
      if (produtoEhReclamacao(produto)) {
        produto["eh_reclamacao"] = true;
        const { uuid } = produto.ultima_homologacao;
        let response = await getReclamacaoDeProduto(uuid);
        this.setState({ reclamacaoProduto: response.data });
      } else {
        produto["eh_reclamacao"] = false;
      }
      this.setState({ verificado: true, produto });
    }
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
      reclamacaoProduto,
      logs
    } = this.state;
    return (
      <div className="card">
        <div className="card-body">
          {!loading && !erro ? (
            <Fragment>
              {reclamacaoProduto !== null &&
                produto !== null &&
                produto.eh_reclamacao && (
                  <section className="descricao-reclamação">
                    <article className="motivo-data-reclamacao">
                      <div>Motivo da reclamação:</div>
                      <div>Data: {retornaData(reclamacaoProduto)}</div>
                    </article>
                    <article className="box-detalhe-reclamacao">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: reclamacaoProduto.reclamacao
                        }}
                      />
                    </article>
                  </section>
                )}
              {!!logs.length && (
                <Fragment>
                  <MotivoDaRecusaDeHomologacao logs={logs} />
                  <MotivoHomologacao logs={logs} />
                </Fragment>
              )}
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
