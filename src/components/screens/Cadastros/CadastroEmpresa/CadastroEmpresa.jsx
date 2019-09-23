import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Field, reduxForm, FormSection } from "redux-form";
import StatefulMultiSelect from "@khanacademy/react-multi-select";
import { LabelAndInput } from "../../../Shareable/labelAndInput/labelAndInput";
import BaseButton, { ButtonStyle, ButtonType } from "../../../Shareable/button";
import { required } from "../../../../helpers/fieldValidators";
import "../style.scss";
import { getLotes } from "../../../../services/diretoriaRegional.service";
import { transformaObjetos, fieldCnpj, fieldCep } from "./helper";
import { toastSuccess } from "../../../Shareable/Toast/dialogs";
import TelefoneOuCelular from "./InputTelefone";

const ENTER = 13;
class CadastroEmpresa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lotes: "",
      lotesSelecionados: [],
      formValido: false,
      contatosEmpresaForm: ["contatoEmpresa_0"],
      contatosTerceirizadaForm: ["contatoTerceirizada_0"],
      editaisContratosForm: ["editalContrato_0"],

      contatosEmpresa: [
        {
          telefone: null,
          email: null
        }
      ],

      contatosNutricionista: [
        {
          telefone: null,
          responsavel: null,
          contato: null,
          email: null
        }
      ],

      telefoneRepresentante: null
    };
    this.setaContatosEmpresa = this.setaContatosEmpresa.bind(this);
    this.setaContatoRepresentante = this.setaContatoRepresentante.bind(this);
    this.setaContatosNutricionista = this.setaContatosNutricionista.bind(this);
  }

  nomeFormContatoEmpresa() {
    const indiceDoFormAtual = `contatoEmpresa_${
      this.state.contatosEmpresaForm.length
    }`;
    let contatosEmpresaForm = this.state.contatosEmpresaForm;
    contatosEmpresaForm.push(indiceDoFormAtual);
    this.setState({ contatosEmpresaForm });
  }

  nomeFormContatoTerceirizada() {
    const indiceDoFormAtual = `contatoTerceirizada_${
      this.state.contatosTerceirizadaForm.length
    }`;
    let contatosTerceirizadaForm = this.state.contatosTerceirizadaForm;
    contatosTerceirizadaForm.push(indiceDoFormAtual);
    this.setState({ contatosTerceirizadaForm });
  }

  nomeFormContatoEdital() {
    const indiceDoFormAtual = `editalContrato_${
      this.state.editaisContratosForm.length
    }`;
    let editaisContratosForm = this.state.editaisContratosForm;
    editaisContratosForm.push(indiceDoFormAtual);
    this.setState({ editaisContratosForm });
  }

  setaContatosEmpresa(input, event, indice) {
    let contatosEmpresa = this.state.contatosEmpresa;
    contatosEmpresa[indice][input] = event;
    this.setState({ contatosEmpresa });
  }

  setaContatosNutricionista(input, event, indice) {
    let contatosNutricionista = this.state.contatosNutricionista;
    contatosNutricionista[indice][input] = event;
    this.setState({ contatosNutricionista });
  }

  setaContatoRepresentante(event) {
    let telefoneRepresentante = this.state.telefoneRepresentante;
    telefoneRepresentante = event;
    this.setState({ telefoneRepresentante });
  }

  adicionaContatoEmpresa() {
    this.setState({
      contatosEmpresa: this.state.contatosEmpresa.concat([
        {
          telefone: null,
          email: null
        }
      ])
    });
  }

  adicionaContatoNutricionista() {
    this.setState({
      contatosNutricionista: this.state.contatosNutricionista.concat([
        {
          telefone: null,
          responsavel: null,
          contato: null,
          email: null
        }
      ])
    });
  }

  componentDidMount() {
    getLotes()
      .then(response => {
        let lotes = transformaObjetos(response);
        this.setState({ lotes });
      })
      .catch(error => {
        console.log(error);
      });
  }

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

  salvaFormulario(values) {
    //this.resetForm();
    // this.setState({ lotesSelecionados: [] });
    toastSuccess("Empresa adicionada com sucesso!");
  }

  onKeyPress(event) {
    if (event.which === ENTER) {
      event.preventDefault();
    }
  }

  render() {
    const { handleSubmit } = this.props;
    const {
      contatosEmpresaForm,
      contatosTerceirizadaForm,
      editaisContratosForm,
      lotes,
      lotesSelecionados
    } = this.state;
    return (
      <div className="cadastro pt-3">
        <form onSubmit={handleSubmit} onKeyPress={this.onKeyPress}>
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

                <div className="container-fields pt-3">
                  <div className="fields">
                    {contatosEmpresaForm.map(
                      (contatoEmpresa, indiceEmpresa) => {
                        return (
                          <FormSection
                            nomeForm={`contatoEmpresa_${indiceEmpresa}`}
                            name={contatoEmpresa}
                          >
                            <div className="fields-set pt-2">
                              <div>
                                <label className="label">
                                  <span>* </span>Telefone
                                </label>
                                <TelefoneOuCelular
                                  setaContatosEmpresa={this.setaContatosEmpresa}
                                  indice={indiceEmpresa}
                                  cenario="contatoEmpresa"
                                />
                              </div>
                              <div>
                                <label className="label">
                                  <span>* </span>E-mail
                                </label>
                                <Field
                                  name={`email_empresa_${indiceEmpresa}`}
                                  component={LabelAndInput}
                                  validate={required}
                                  onChange={event =>
                                    this.setaContatosEmpresa(
                                      "email",
                                      event.target.value,
                                      indiceEmpresa
                                    )
                                  }
                                />
                              </div>
                            </div>
                          </FormSection>
                        );
                      }
                    )}
                  </div>
                  <div className="button-field">
                    <button
                      type="button"
                      className="btn btn-outline-info"
                      onClick={() => {
                        this.nomeFormContatoEmpresa();
                        this.adicionaContatoEmpresa();
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
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
                      <TelefoneOuCelular
                        setaContatoRepresentante={this.setaContatoRepresentante}
                        cenario="contatoRepresentante"
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
                  <div className="container-fields">
                    <div className="fields">
                      {contatosTerceirizadaForm.map(
                        (contatoTerceirizada, indiceTerceirizada) => {
                          return (
                            <FormSection
                              nomeForm={`contatoTerceirizada_${indiceTerceirizada}`}
                              name={contatoTerceirizada}
                            >
                              <div className="form-section-terceirizada">
                                <div className="section-nutri-crn pt-3">
                                  <div>
                                    <label className="label">
                                      <span>* </span>Nutricionista Responsável
                                      Técnico
                                    </label>
                                    <Field
                                      name={`nutricionista_nome_${indiceTerceirizada}`}
                                      component={LabelAndInput}
                                      validate={required}
                                      onChange={event =>
                                        this.setaContatosNutricionista(
                                          "responsavel",
                                          event.target.value,
                                          indiceTerceirizada
                                        )
                                      }
                                    />
                                  </div>
                                  <div>
                                    <label className="label">
                                      <span>* </span>CRN
                                    </label>
                                    <Field
                                      name={`nutricionista_crn_${indiceTerceirizada}`}
                                      component={LabelAndInput}
                                      onChange={event =>
                                        this.setaContatosNutricionista(
                                          "contato",
                                          event.target.value,
                                          indiceTerceirizada
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="section-nutri-contato pt-2">
                                  <div>
                                    <label className="label">
                                      <span>* </span>Telefone/Celular Técnico
                                    </label>
                                    <TelefoneOuCelular
                                      setaContatosNutricionista={
                                        this.setaContatosNutricionista
                                      }
                                      indice={indiceTerceirizada}
                                    />
                                  </div>
                                  <div>
                                    <label className="label">
                                      <span>* </span>Email
                                    </label>
                                    <Field
                                      name={`email_terceirizada_${indiceTerceirizada}`}
                                      component={LabelAndInput}
                                      validate={required}
                                      onChange={event =>
                                        this.setaContatosNutricionista(
                                          "email",
                                          event.target.value,
                                          indiceTerceirizada
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </FormSection>
                          );
                        }
                      )}
                    </div>
                    <div className="button-field">
                      <button
                        type="button"
                        className="btn btn-outline-info"
                        onClick={() => {
                          this.nomeFormContatoTerceirizada();
                          this.adicionaContatoNutricionista();
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="linha-form" />

              <div>
                <div className="card-body">
                  <div className="container-fields">
                    <div className="fields">
                      {editaisContratosForm.map(
                        (editalContrato, indiceContratos) => {
                          return (
                            <FormSection
                              nomeForm={`editaisEContratos_${indiceContratos}`}
                              name={editalContrato}
                            >
                              <div className="fields-set-edital">
                                <div>
                                  <label className="label">
                                    <span>* </span>Edital de Pregão n°
                                  </label>
                                  <Field
                                    name={`edital_${indiceContratos}`}
                                    component={LabelAndInput}
                                    validate={required}
                                  />
                                </div>
                                <div>
                                  <label className="label">
                                    <span>* </span>Contrato n°
                                  </label>
                                  <Field
                                    name={`contrato_${indiceContratos}`}
                                    component={LabelAndInput}
                                    validate={required}
                                  />
                                </div>
                              </div>
                            </FormSection>
                          );
                        }
                      )}
                    </div>
                    <div className="button-field">
                      <button
                        type="button"
                        className="btn btn-outline-info"
                        onClick={() => this.nomeFormContatoEdital()}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="row pt-3">
                    <div className="col-12">
                      <label className="label">Lotes de atendimento</label>

                      {this.state.lotes.length ? (
                        <Field
                          component={StatefulMultiSelect}
                          name="lotes"
                          selected={lotesSelecionados}
                          options={lotes}
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
                        onClick={handleSubmit(values =>
                          this.salvaFormulario(values)
                        )}
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

export default CadastroEmpresaForm;
