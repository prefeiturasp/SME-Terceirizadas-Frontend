import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Field, formValueSelector, reduxForm, FieldArray } from "redux-form";
import StatefulMultiSelect from "@khanacademy/react-multi-select";
import { LabelAndInput } from "../../../Shareable/labelAndInput/labelAndInput";
import BaseButton, { ButtonStyle, ButtonType } from "../../../Shareable/button";
import {
  required,
  email,
  phoneNumber
} from "../../../../helpers/fieldValidators";
import "../style.scss";
import { getLotes } from "../../../../services/diretoriaRegional.service";
import {
  transformaObjetos,
  fieldCnpj,
  fieldCep,
  fieldTel,
  resetForm
} from "./helper";
import { toastSuccess } from "../../../Shareable/dialogs";
import { ContatosEmpresa } from "./ContatosEmpresa";
import { ContatosTerceirizada } from "./ContatosTerceirizada";
import { EditalInput } from "./EditalInputForm";

class CadastroEmpresa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lotes: "",
      lotesSelecionados: [],
      formValido: false
    };
  }

  componentDidMount() {
    getLotes()
      .then(response => {
        let lotes = transformaObjetos(response);
        this.setState({ lotes });
      })
      .catch(error => {
        console.log(error)
      })    
  };

  renderizarLabelLote(selected, options) {
    if (selected.length === 0) {
      return "Selecione um ou mais lotes...";
    }
    if (selected.length === options.length) {
      return "Todos os lotes foram selecionados";
    }
    if (selected.length === 1) {
      return `${selected.length} lote selecionado`;
    }
    return `${selected.length} lotes selecionados`;
  }

  lidarComSelecionados(value) {
    this.setState({ lotesSelecionados: value });
  }

  resetForm() {
    this.props.reset();
    this.props.change("razão_social", "");
    this.props.change("cnpj", "");
    this.props.change("nome_fantasia", "");
    this.props.change("endereco", "");
    this.props.change("cep", "");
    this.props.change("telefone_empresa", "");
    this.props.change("email_empresa", "");
    this.props.change("representante_legal", "");
    this.props.change("contato", "");
    this.props.change("nutricionista", "");
    this.props.change("crn", "");
    this.props.change("telefone_nutricionista", "");
    this.props.change("email_nutricionista", "");
    this.props.change("edital", "");
    this.props.change("contrato", "");
  }

  salvaFormulario() {
    this.resetForm();
    this.setState({ lotesSelecionados: [] });
    toastSuccess("Empresa adicionada com sucesso!");
  }

  render() {
    const { handleSubmit } = this.props;
    const { lotes } = this.state;
    return (
      <div className="cadastro pt-3">
        <form onSubmit={this.props.handleSubmit}>
          <div className="card">
            <div>
              <div className="card-body">
                <div className="row">
                  <div className="col-12">
                    <label className="font-weight-bold">Dados da Empresa</label>
                  </div>
                </div>
                <div className="row pt-3">
                  <div className="col-12">
                    <Link to="/configuracoes/cadastros/empresas-cadastradas">
                      <BaseButton
                        label="Consulta de empresas cadastradas"
                        style={ButtonStyle.OutlinePrimary}
                      />
                    </Link>
                  </div>
                </div>
                <div className="row pt-3">
                  <div className="col-9">
                    <label className="label">
                      <span>* </span>Razão social
                    </label>
                    <Field
                      component={LabelAndInput}
                      name="razão_social"
                      validate={required}
                    />
                  </div>
                  <div className="col-3">
                    <label className="label">
                      <span>* </span>CNPJ
                    </label>
                    <Field
                      component={LabelAndInput}
                      name="cnpj"
                      {...fieldCnpj}
                      validate={required}
                    />
                  </div>
                </div>
                <div className="row pt-3">
                  <div className="col-9">
                    <label className="label">Nome Fantasia</label>
                    <Field component={LabelAndInput} name="nome_fantasia" />
                  </div>
                </div>

                <div className="row pt-3">
                  <div className="col-10">
                    <label className="label">
                      <span>* </span>Endereço
                    </label>
                    <Field
                      component={LabelAndInput}
                      name="endereco"
                      validate={required}
                    />
                  </div>
                  <div className="col-2">
                    <label className="label">
                      <span>* </span>CEP
                    </label>
                    <Field
                      component={LabelAndInput}
                      name="cep"
                      {...fieldCep}
                      validate={required}
                    />
                  </div>
                </div>

                <FieldArray
                  name="contatos-empresa"
                  component={ContatosEmpresa}
                />
              </div>

              <hr className="linha-form" />

              <div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-7">
                      <label className="label">
                        <span>* </span>Representante Legal
                      </label>
                      <Field
                        component={LabelAndInput}
                        name="representante_legal"
                        validate={required}
                      />
                    </div>
                    <div className="col-5">
                      <label className="label">Telefone</label>
                      <Field
                        component={LabelAndInput}
                        name="telefone_representante_legal"
                        {...fieldTel}
                        validate={required}
                      />
                    </div>
                  </div>
                  <div className="row pt-3">
                    <div className="col-7">
                      <label className="label">
                        <span>* </span>Email
                      </label>
                      <Field
                        component={LabelAndInput}
                        name="email_representante_legal"
                        validate={required}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <hr className="linha-form" />

              <div>
                <div className="card-body">
                  <FieldArray
                    name="contatos-terceirizada"
                    component={ContatosTerceirizada}
                  />
                </div>
              </div>

              <hr className="linha-form" />

              <div>
                <div className="card-body">


                  <FieldArray name="edital" component={EditalInput} />



                  <div className="row pt-3">
                    <div className="col-12">
                      <label className="label">Lotes de atendimento</label>

                      {this.state.lotes.length ? (
                        <Field
                          component={StatefulMultiSelect}
                          name="lotes"
                          selected={this.state.lotesSelecionados}
                          options={this.state.lotes}
                          valueRenderer={this.renderizarLabelLote}
                          onSelectedChanged={value =>
                            this.lidarComSelecionados(value)
                          }
                          overrideStrings={{
                            search: "Busca",
                            selectSomeItems: "Selecione",
                            allItemsAreSelected:
                              "Todos os itens estão selecionados",
                            selectAll: "Todos"
                          }}
                        />
                      ) : (
                        <div className="col-6">Carregando lotes..</div>
                      )}
                    </div>
                    <div className="col-12">
                      {this.state.lotesSelecionados.length > 0 && (
                        <div className="row pt-3">
                          <div className="col-12">
                            <label className="label-selected-unities">
                              Lotes Selecionados
                            </label>
                            {this.state.lotesSelecionados.map(
                              (lote, indice) => {
                                return (
                                  <div
                                    className="value-selected-unities"
                                    key={indice}
                                  >
                                    {lote}
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="button-container">
                    <div className="button-submit">
                      <BaseButton
                        label="Cancelar"
                        onClick={event => this.resetForm(event)}
                        style={ButtonStyle.OutlinePrimary}
                      />
                      <BaseButton
                        label={"Salvar"}
                        onClick={handleSubmit(values => this.salvaFormulario())}
                        className="ml-3"
                        type={ButtonType.SUBMIT}
                        style={ButtonStyle.Primary}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const CadastroEmpresaForm = reduxForm({
  form: "cadastroEmpresaForm"
})(CadastroEmpresa);

const selector = formValueSelector("cadastroEmpresaForm");

const mapStateToProps = state => {
  return {
    resumo: {
      razão_social: selector(state, "razão_social"),
      cnpj: selector(state, "cnpj"),
      nome_fantasia: selector(state, "nome_fantasia"),
      endereco: selector(state, "endereco"),
      cep: selector(state, "cep"),
      telefone_empresa: selector(state, "telefone_empresa"),
      email_empresa: selector(state, "email_empresa"),
      representante_legal: selector(state, "representante_legal"),
      contato: selector(state, "contato"),
      nutricionista: selector(state, "nutricionista"),
      crn: selector(state, "crn"),
      telefone_nutricionista: selector(state, "telefone_nutricionista"),
      email_nutricionista: selector(state, "email_nutricionista"),
      edital: selector(state, "edital"),
      contrato: selector(state, "contrato"),
      lotes: selector(state, "lotes")
    }
  };
};

export default connect(mapStateToProps)(CadastroEmpresaForm);
