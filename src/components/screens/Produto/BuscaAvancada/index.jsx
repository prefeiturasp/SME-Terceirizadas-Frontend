import React, { Component, Fragment } from "react";
import { Field, reduxForm } from "redux-form";
import { InputComData } from "../../../Shareable/DatePicker";
import { SelectWithHideOptions } from "../../../Shareable/SelectWithHideOptions";
import "antd/dist/antd.css";
import "./style.scss";
import CheckboxField from "components/Shareable/Checkbox/Field";
import { InputText } from "components/Shareable/Input/InputText";
import Botao from "components/Shareable/Botao";
import { AAutoComplete } from "components/Shareable/MakeField";
import { BUTTON_STYLE } from "components/Shareable/Botao/constants";
import { tranformaEmobjetoDeBusca } from "./helpers";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  buscaProdutos,
  buscaNomesProduto,
  buscaNomesMarcas,
  buscaNomesFabricantes
} from "./produtoAction";
import "antd/dist/antd.css";
import { Spin } from "antd";

class BuscaAvancada extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusOptions: [
        "Homologado",
        "Não homologado",
        "Aguardando análise sensorial",
        "Pendente de homologação",
        "Suspenso",
        "Correção"
      ],
      tipos_produto: [
        { nome: "comum", check: false, label: "Comum" },
        { nome: "dieta_especial", check: false, label: "Dieta especial" }
      ],
      produtoComum: false,
      produtoDieta: false,
      produto_alergenico: false,
      selectedItems: [],
      loading: true
    };
    this.handleChange = this.handleChange.bind(this);
  }

  checkTipoProduto = (indice, check, nome) => {
    let { tipos_produto } = this.state;
    tipos_produto[indice].check = !check;
    this.setState({ tipos_produto });
    if (nome === "comum") {
      this.setState({ produtoComum: !check });
    } else {
      this.setState({ produtoDieta: !check });
    }
  };

  checkProdutoAlergenico = () => {
    const { produto_alergenico } = this.state;
    this.setState({ produto_alergenico: !produto_alergenico });
  };

  onSearch = values => {
    const {
      selectedItems,
      produtoComum,
      produtoDieta,
      produto_alergenico
    } = this.state;

    values["status"] = tranformaEmobjetoDeBusca(selectedItems);
    values["check_comum"] = produtoComum;
    values["check_dieta_especial"] = produtoDieta;
    values["produtos_alergenicos"] = produto_alergenico;
  };

  onClear = () => {
    const { change } = this.props;
    let { tipos_produto } = this.state;

    tipos_produto.forEach(tipo => {
      tipo.check = false;
    });

    change("data-de", null);
    change("data-ate", null);
    change("aditivos", null);
    change("nome", null);
    change("marca", null);
    change("fabricante", null);

    this.setState({
      tipos_produto,
      selectedItems: [],
      produto_alergenico: false,
      produtoComum: false,
      produtoDieta: false
    });
  };

  handleChange = selectedItems => {
    this.setState({ selectedItems });
  };

  componentDidMount() {
    this.props.buscaNomesProduto();
    this.props.buscaNomesMarcas();
    this.props.buscaNomesFabricantes();
    this.props.buscaProdutos();

    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  render() {
    const {
      handleSubmit,
      nomesMarcas,
      nomesFabricantes,
      nomesProdutos
    } = this.props;
    const {
      statusOptions,
      tipos_produto,
      produto_alergenico,
      selectedItems,
      loading
    } = this.state;
    return (
      <div className="card">
        <div className="card-body">
          {!loading ? (
            <Fragment>
              <form>
                <div className="descricao-topo-busca-produto">
                  Consulte por produtos no sistema
                </div>
                <div className="tipo-status-barra-busca">
                  <label>Data cadastro</label>
                  <label>Status</label>
                  <label>Tipo de produto</label>

                  <div className="input-datas-inicio-termino">
                    <Field
                      className="input-data"
                      component={InputComData}
                      name="data-de"
                    />
                    <Field
                      className="input-data"
                      component={InputComData}
                      name="data-ate"
                    />
                  </div>
                  <div>
                    <Field
                      component={SelectWithHideOptions}
                      options={statusOptions}
                      name="status"
                      handleChange={this.handleChange}
                      selectedItems={selectedItems}
                    />
                  </div>
                  <div className="check-tipos-prod">
                    {tipos_produto.map((tipo, indice) => {
                      return (
                        <Field
                          key={indice}
                          className="check-tipo-produto"
                          component={CheckboxField}
                          name={`check_${tipo.nome}`}
                          check={tipo.check}
                          nomeInput={`${tipo.label}`}
                          onChange={() => {
                            this.checkTipoProduto(
                              indice,
                              tipo.check,
                              tipo.nome
                            );
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
                <div className="grid-produtos-alergenicos">
                  <label>Ingredientes/aditivos alegênicos?</label>
                  <label>Quais?</label>
                  <div className="check-produto_alergenico">
                    <Field
                      component={CheckboxField}
                      name={`produtos_alergenicos`}
                      check={produto_alergenico}
                      nomeInput={"Sim"}
                      onChange={() => {
                        this.checkProdutoAlergenico();
                      }}
                    />
                  </div>
                  <div>
                    <Field component={InputText} name="aditivos" />
                  </div>
                </div>
                <div className="produto-input">
                  <label>Nome do Produto</label>
                </div>
                <div>
                  <Field
                    name="nome"
                    component={AAutoComplete}
                    dataSource={nomesProdutos}
                    filterOption
                  />
                </div>

                <div className="marca-fabricante-produto">
                  <label>Marca do produto</label>
                  <label>Fabricante do produto</label>
                  <Field
                    name="marca"
                    component={AAutoComplete}
                    dataSource={nomesMarcas}
                    filterOption
                  />
                  <Field
                    name="fabricante"
                    component={AAutoComplete}
                    dataSource={nomesFabricantes}
                    filterOption
                  />
                </div>

                <div className="botoes-de-pesquisa-produto">
                  <Botao
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                    texto="Cancelar"
                    onClick={() => {
                      this.onClear();
                    }}
                  />
                  <Botao
                    style={BUTTON_STYLE.GREEN}
                    texto="Consultar"
                    onClick={handleSubmit(values =>
                      this.onSearch({
                        ...values
                      })
                    )}
                  />
                </div>
              </form>
              <div>fdkjsflgjlfgdsjlfdgjdgf</div>
            </Fragment>
          ) : (
            <Spin tip="Carregando...">
              <div className="background-loading" />
            </Spin>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  produtos: state.produtos.list,
  nomesProdutos: state.produtos.nomesProdutos,
  nomesMarcas: state.produtos.nomesMarcas,
  nomesFabricantes: state.produtos.nomesFabricantes
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      buscaProdutos,
      buscaNomesProduto,
      buscaNomesMarcas,
      buscaNomesFabricantes
    },
    dispatch
  );

BuscaAvancada = reduxForm({
  form: "buscaAvancadaDeProduto"
})(BuscaAvancada);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuscaAvancada);
