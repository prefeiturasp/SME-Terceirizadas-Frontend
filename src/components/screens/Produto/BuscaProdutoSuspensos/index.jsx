import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getFormValues } from "redux-form";
import { Field, reduxForm } from "redux-form";
import { AAutoComplete } from "components/Shareable/MakeField";
import { Input } from "antd";
import "antd/dist/antd.css";
import { Modal } from "antd";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
  BUTTON_ICON
} from "components/Shareable/Botao/constants";
import {
  getNomesProdutos,
  getNomesMarcas,
  getNomesFabricantes,
  getProdutosSuspensos
} from "../../../../services/produto.service";
import { InputComData } from "components/Shareable/DatePicker";
import {
  DATA_MAXIMA,
  DATA_MINIMA,
  DATA_INICIAL,
  DATA_FINAL,
  ehFiltroDeData,
  retornaDataMinima,
  condicaoDeDatas,
  retornaUltimaHomologacao,
  retornUltimoLog,
  retornaData,
  ultimoLogItem
} from "./helpers";
import "./styles.scss";
import { getRelatorioProdutosSuspensos } from "services/relatorios";

class BuscaProdutoSuspensos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nomesProdutos: null,
      optionsProdutos: [],
      nomesMarcas: null,
      optionsMarcas: [],
      nomesFabricantes: null,
      optionsFabricantes: [],
      dataMinima: null,
      dataMaxima: null,
      payload: null,
      ehPorData: false,
      visible: false,
      payload_auxiliar: {
        eh_por_data: false,
        data_inicio: null,
        data_fim: null,
        response: null
      }
    };
  }

  onSubmit = async payload => {
    const { payload_auxiliar } = this.state;
    delete payload["filtro_por_data"];
    delete payload["condicao"];
    const keys = Object.keys(payload);
    const [filtroPorData, condicao] = ehFiltroDeData(keys);
    let ehPorData = false;
    if (filtroPorData) {
      payload["filtro_por_data"] = true;
      payload["condicao"] = condicao;
      ehPorData = true;
    } else {
      payload["filtro_por_data"] = false;
      payload["condicao"] = condicaoDeDatas(keys);
      ehPorData = false;
    }
    const response = await getProdutosSuspensos(payload);

    if (filtroPorData) {
      payload_auxiliar["eh_por_data"] = true;
      payload_auxiliar["response"] = response.data;
      payload_auxiliar["data_inicio"] = payload["data_inicial"] || DATA_INICIAL;
      payload_auxiliar["data_fim"] = payload["data_final"] || DATA_FINAL;
      this.setState({
        payload: response.data,
        ehPorData,
        payload_auxiliar
      });
    } else {
      payload_auxiliar["response"] = response.data;
      payload_auxiliar["eh_por_data"] = false;
      this.setState({
        payload: response.data,
        ehPorData,
        payload_auxiliar
      });
    }

    if (response.data.length > 0) {
      this.showModal();
    }
    delete payload["filtro_por_data"];
    delete payload["condicao"];
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  retornaListaDeNomes = arrayObjetos => {
    let arrayNomes = [];
    arrayObjetos.forEach(objeto => {
      arrayNomes.push(objeto.nome);
    });
    return arrayNomes;
  };

  componentDidMount = async () => {
    const { nomesProdutos, nomesMarcas, nomesFabricantes } = this.state;
    if (
      nomesProdutos === null &&
      nomesMarcas === null &&
      nomesFabricantes === null
    ) {
      const produtos = await getNomesProdutos();
      const marcas = await getNomesMarcas();
      const fabricantes = await getNomesFabricantes();

      this.setState({
        nomesProdutos: this.retornaListaDeNomes(produtos.data.results),
        nomesMarcas: this.retornaListaDeNomes(marcas.data.results),
        nomesFabricantes: this.retornaListaDeNomes(fabricantes.data.results)
      });
    }
  };

  onSearchProduto = searchText => {
    const { nomesProdutos } = this.state;
    let options = !searchText
      ? []
      : nomesProdutos.filter(element =>
          element.toUpperCase().includes(searchText.toUpperCase())
        );
    this.setState({
      optionsProdutos: options
    });
  };

  onSearchMarca = searchText => {
    const { nomesMarcas } = this.state;
    let options = !searchText
      ? []
      : nomesMarcas.filter(element =>
          element.toUpperCase().includes(searchText.toUpperCase())
        );
    this.setState({
      optionsMarcas: options
    });
  };

  onSearchFabricantes = searchText => {
    const { nomesFabricantes } = this.state;
    let options = !searchText
      ? []
      : nomesFabricantes.filter(element =>
          element.toUpperCase().includes(searchText.toUpperCase())
        );
    this.setState({
      optionsFabricantes: options
    });
  };

  onClear = () => {
    const { change } = this.props;
    change("produto", "");
    change("marca", "");
    change("fabricante", "");
    change("data_inicial", "");
    change("data_final", "");
    this.setState({
      dataMinima: null,
      dataMaxima: null,
      payload: null
    });
  };

  setaDataInicial = value => {
    const dataMinima = retornaDataMinima(value);
    this.setState({ dataMinima });
  };

  setaDataFinal = value => {
    const dataMaxima = retornaDataMinima(value);
    this.setState({ dataMaxima });
  };

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    const {
      optionsProdutos,
      optionsMarcas,
      optionsFabricantes,
      dataMinima,
      dataMaxima,
      payload,
      visible,
      payload_auxiliar
    } = this.state;
    return (
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="formulario-busca-suspensos">
            <div className="row">
              <div className="col-md-6">
                <div>
                  <label>Nome do produto</label>
                  <Field
                    component={AAutoComplete}
                    name="produto"
                    onSearch={this.onSearchProduto}
                    dataSource={optionsProdutos}
                  >
                    <Input.Search size="large" />
                  </Field>
                </div>
              </div>

              <div className="col-md-6">
                <div>
                  <label>Marca do produto</label>
                  <Field
                    component={AAutoComplete}
                    name="marca"
                    onSearch={this.onSearchMarca}
                    dataSource={optionsMarcas}
                  >
                    <Input.Search size="large" />
                  </Field>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div>
                  <label>Fabricante do produto</label>
                  <Field
                    component={AAutoComplete}
                    name="fabricante"
                    onSearch={this.onSearchFabricantes}
                    dataSource={optionsFabricantes}
                  >
                    <Input.Search size="large" />
                  </Field>
                </div>
              </div>

              <div className="col-md-3">
                <label>Data de Suspensão</label>
                <Field
                  component={InputComData}
                  name="data_inicial"
                  minDate={DATA_MINIMA}
                  maxDate={dataMaxima ? dataMaxima : DATA_MAXIMA}
                  onChange={value => {
                    this.setaDataInicial(value);
                  }}
                />
              </div>

              <div className="input-data-sem-label col-md-3">
                <Field
                  component={InputComData}
                  name="data_final"
                  minDate={dataMinima === null ? DATA_MINIMA : dataMinima}
                  maxDate={DATA_MAXIMA}
                  onChange={value => {
                    this.setaDataFinal(value);
                  }}
                />
              </div>
            </div>

            <div className="botoes-submit-pesquisa">
              <Botao
                texto="Limpar Filtros"
                disabled={pristine || submitting}
                className="mr-3"
                type={BUTTON_TYPE.BUTTON}
                style={BUTTON_STYLE.GREEN_OUTLINE}
                onClick={() => {
                  this.onClear();
                }}
              />
              <Botao
                texto="Consultar"
                disabled={pristine || submitting}
                onClick={handleSubmit(values => this.onSubmit(values))}
                type={BUTTON_TYPE.SUBMIT}
                style={BUTTON_STYLE.OutlinePrimary}
              />
            </div>
          </form>

          <div className="margin-da-pagina">
            {payload === null
              ? ""
              : payload.length > 0
              ? ""
              : "Nenhum resultado encontrado"}
          </div>

          <Modal
            visible={visible}
            title="Relatório de análise de produtos suspensos"
            onCancel={this.handleCancel}
            width={"95%"}
            footer={[
              <Botao
                key={0}
                texto="Voltar"
                type={BUTTON_TYPE.BUTTON}
                style={BUTTON_STYLE.BLUE_OUTLINE}
                icon={BUTTON_ICON.ARROW_LEFT}
                onClick={this.handleCancel}
              />,
              <Botao
                key={1}
                type={BUTTON_TYPE.BUTTON}
                texto="Imprimir"
                style={BUTTON_STYLE.BLUE}
                icon={BUTTON_ICON.PRINT}
                onClick={() => {
                  getRelatorioProdutosSuspensos(payload_auxiliar);
                }}
              />
            ]}
          >
            <div className="body-modal">
              <div className="header-modal">
                Veja os resultados para a busca
              </div>
              <div className="section-produtos-itens">
                <div className="item-produto-modal">
                  <div className="item-header-produto-modal">
                    <div className="item-grid-produto">
                      <div>Nome do Produto</div>
                      <div>Marca</div>
                      <div>Fabricante</div>
                      <div>Data de cadastro</div>
                      <div>Data suspensão de produto</div>
                    </div>
                    {payload !== null &&
                      payload.map((item, index) => {
                        const ultimaHomologacao = retornaUltimaHomologacao(
                          item
                        );
                        const ultimoLog = retornUltimoLog(ultimaHomologacao);
                        const dataSuspensao = retornaData(ultimoLog);
                        const dataCadastro = retornaData(item.produto);
                        const UltimoLogComAnexos = ultimoLogItem(item);
                        return (
                          <Fragment key={index}>
                            <div className="item-grid-produto item-prod-detalhe">
                              <div>{item.produto.nome}</div>
                              <div>{item.produto.marca.nome}</div>
                              <div>{item.produto.fabricante.nome}</div>
                              <div>{dataCadastro}</div>
                              <div>{dataSuspensao}</div>
                            </div>
                            <div className="item-grid-detalhe-produto">
                              <div>
                                <label>Nome</label>
                                <p>{ultimoLog.usuario.nome}</p>
                                <p>
                                  RF: {ultimoLog.usuario.registro_funcional}
                                </p>
                              </div>
                              <div>
                                <label>Cargo</label>
                                <p>{ultimoLog.usuario.cargo}</p>
                              </div>
                              <div>
                                <label>
                                  Justificativa de suspensão de produto
                                </label>
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html: ultimoLog.justificativa
                                  }}
                                />
                              </div>
                            </div>
                            <hr />
                            <div className="item-grid-detalhe-produto">
                              <div>
                                <label>Anexo</label>
                                <p>
                                  {UltimoLogComAnexos.anexos.length > 0
                                    ? "Sim"
                                    : "Não"}
                                </p>
                              </div>
                            </div>
                            <hr />
                          </Fragment>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

BuscaProdutoSuspensos.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

const CBuscaProdutoSuspensosForm = reduxForm({
  form: "buscaProdutoSuspensosForm",
  enableReinitialize: true
})(BuscaProdutoSuspensos);

const mapStateToProps = state => ({
  values: getFormValues("buscaProdutoSuspensosForm")(state) || {}
});

export default connect(mapStateToProps)(CBuscaProdutoSuspensosForm);
