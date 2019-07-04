import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import StatefulMultiSelect from "@khanacademy/react-multi-select";
import { LabelAndCombo } from "../../../Shareable/labelAndInput/labelAndInput";
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
  }

  componentDidMount() {
    getSchools().then(res => {
      let escolas = res.slice(0, 50);
      escolas.forEach(function(escola) {
        escola["label"] = escola["_id"].toString() + " - " + escola["nome"];
        escola["value"] = escola["_id"].toString();
      });
      this.setState({ escolas });
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

  render() {
    const { escolas, escolasSelecionadas } = this.state;
    return (
      <div className="cadastro pt-3">
        <form onSubmit={this.props.handleSubmit}>
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-12">
                  <label className="font-weight-bold">Dados do Lote</label>
                </div>
              </div>
              <div className="row pt-3">
                <div className="col-12">
                  <Link to="#">
                    <label className="link">
                      Consulta de lotes cadastrados
                    </label>
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
                    onChange={value => this.handleField()}
                    options={[
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
                    onChange={value => this.handleField()}
                    options={[
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
                  <label className="label">
                    <span>* </span>Nome do Lote
                  </label>
                  <Field
                    component={"input"}
                    className="form-control"
                    name="nome"
                    onChange={value => this.handleField()}
                    validate={required}
                  />
                </div>
                <div className="col-4">
                  <label className="label">
                    <span>* </span>Nº do Lote
                  </label>
                  <Field
                    component={"input"}
                    className="form-control"
                    name="numero"
                    onChange={value => this.handleField()}
                    validate={required}
                  />
                </div>
              </div>
              <div className="row pt-3">
                <div className="col-12">
                  <label>Unidades Específicas do Lote</label>
                  {escolas.length ? (
                    <Field
                      component={StatefulMultiSelect}
                      name="escolas"
                      selected={escolasSelecionadas}
                      options={escolas}
                      valueRenderer={this.renderizarLabelEscola}
                      onSelectedChanged={value =>
                        this.setState({ escolasSelecionadas: value })
                      }
                      disableSearch={true}
                      overrideStrings={{
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
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const CadastroLoteForm = reduxForm({
  form: "foodInclusion",
  enableReinitialize: true
})(CadastroLote);

export default CadastroLoteForm;
