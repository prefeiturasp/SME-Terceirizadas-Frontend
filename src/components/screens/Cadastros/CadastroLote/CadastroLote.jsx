import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Field, formValueSelector, reduxForm } from "redux-form";
import StatefulMultiSelect from "@khanacademy/react-multi-select";
import { ModalCadastroLote } from "./ModalCadastroLote";
import {
  LabelAndCombo,
  LabelAndInput
} from "../../../Shareable/labelAndInput/labelAndInput";
import BaseButton, { ButtonStyle, ButtonType } from "../../../Shareable/button";
import { required } from "../../../../helpers/fieldValidators";
import { getSchools } from "../../../../services/school.service";
import "../style.scss";

class CadastroLote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      escolas: [],
      escolasSelecionadas: []
    };
    this.fecharModal = this.fecharModal.bind(this);
  }

  componentDidMount() {
    getSchools().then(res => {
      let escolas = res.slice(0, 50);
      escolas.forEach(function(escola) {
        escola["label"] = escola["value"] =
          escola["_id"].toString() + " - " + escola["nome"];
      });
      this.setState({ escolas });
    }, error => {
      console.log(error);
    });
  }

  renderizarLabelEscola(selected, options) {
    if (selected.length === 0) {
      return "Selecione algumas escolas...";
    }
    if (selected.length === options.length) {
      return "Todas as escolas foram selecionadas";
    }
    if (selected.length === 1) {
      return `${selected.length} escola selecionada`;
    }
    return `${selected.length} escolas selecionadas`;
  }

  exibirModal() {
    this.setState({ exibirModal: true });
  }

  fecharModal(e) {
    this.setState({ exibirModal: false });
  }

  lidarComCampo() {}

  lidarComSelecionados(value) {
    this.setState({ escolasSelecionadas: value });
  }

  resetForm(event) {
    this.props.reset("cadastroLoteForm");
  }

  onSubmit(values) {
    this.exibirModal();
  }

  render() {
    const { handleSubmit, resumo } = this.props;
    const { escolas, escolasSelecionadas, exibirModal } = this.state;
    return (
      <div className="cadastro pt-3">
        <ModalCadastroLote
          closeModal={this.fecharModal}
          showModal={exibirModal}
          resumo={resumo}
          escolasSelecionadas={escolasSelecionadas}
        />
        <form onSubmit={handleSubmit}>
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-12">
                  <label className="font-weight-bold">Dados do Lote</label>
                </div>
              </div>
              <div className="row pt-3">
                <div className="col-12">
                  <Link to="/configuracoes/cadastros/lotes-cadastrados">
                    <BaseButton
                      label="Consulta de lotes cadastrados"
                      style={ButtonStyle.OutlinePrimary}
                    />
                  </Link>
                </div>
              </div>
              <div className="row pt-3">
                <div className="col-8">
                  <label className="label">
                    <span>* </span>DRE
                  </label>
                  <Field
                    component={LabelAndCombo}
                    name="dre"
                    onChange={value => this.lidarComCampo()}
                    options={[
                      {
                        value: null,
                        label: "Selecione"
                      },
                      {
                        value: "DRE Ipiranga",
                        label: "Ipiranga"
                      }
                    ]}
                    validate={required}
                  />
                </div>
              </div>
              <div className="row pt-3">
                <div className="col-8">
                  <label className="label">Subprefeitura</label>
                  <Field
                    component={LabelAndCombo}
                    name="subprefeitura"
                    onChange={value => this.lidarComCampo()}
                    options={[
                      {
                        value: null,
                        label: "Selecione"
                      },
                      {
                        value: "DRE Ipiranga",
                        label: "Ipiranga"
                      }
                    ]}
                  />
                </div>
              </div>
              <div className="row pt-3">
                <div className="col-8">
                  <label className="label">
                    <span>* </span>Nome do Lote
                  </label>
                  <Field
                    component={LabelAndInput}
                    className="form-control"
                    name="nome"
                    onChange={value => this.lidarComCampo()}
                    validate={required}
                  />
                </div>
                <div className="col-4">
                  <label className="label">
                    <span>* </span>Nº do Lote
                  </label>
                  <Field
                    component={LabelAndInput}
                    className="form-control"
                    name="numero"
                    onChange={value => this.lidarComCampo()}
                    validate={required}
                  />
                </div>
              </div>
              <div className="row pt-3">
                <div className="col-12">
                  <label className="label">Unidades Específicas do Lote</label>
                  {escolas.length ? (
                    <Field
                      component={StatefulMultiSelect}
                      name="escolas"
                      selected={escolasSelecionadas}
                      options={escolas}
                      valueRenderer={this.renderizarLabelEscola}
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
                    <div className="col-12">Carregando escolas..</div>
                  )}
                </div>
              </div>
              {escolasSelecionadas.length > 0 && (
                <div className="row pt-3">
                  <div className="col-12">
                    <label className="label-selected-unities">
                      Unidades Específicas do Lote Selecionadas
                    </label>
                    {escolasSelecionadas.map((escola, indice) => {
                      return (
                        <div className="value-selected-unities" key={indice}>
                          {escola}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              <div style={{marginTop: '100px'}} className="row float-right">
                <div className="col-12">
                  <BaseButton
                    label="Cancelar"
                    onClick={event => this.resetForm(event)}
                    style={ButtonStyle.OutlinePrimary}
                    noBorder
                  />
                  <BaseButton
                    label="Excluir"
                    onClick={event => this.resetForm(event)}
                    style={ButtonStyle.OutlinePrimary}
                  />
                  <BaseButton
                    label={"Salvar"}
                    onClick={handleSubmit(values =>
                      this.onSubmit({
                        ...values
                      })
                    )}
                    className="ml-3"
                    type={ButtonType.SUBMIT}
                    style={ButtonStyle.Primary}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const CadastroLoteForm = reduxForm({
  form: "cadastroLoteForm",
  enableReinitialize: true
})(CadastroLote);
const selector = formValueSelector("cadastroLoteForm");
const mapStateToProps = state => {
  return {
    resumo: {
      dre: selector(state, "dre"),
      subprefeitura: selector(state, "subprefeitura"),
      nome: selector(state, "nome"),
      numero: selector(state, "numero")
    }
  };
};

export default connect(mapStateToProps)(CadastroLoteForm);
