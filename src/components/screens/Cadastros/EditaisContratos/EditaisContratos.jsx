import React, { Component } from "react";
import { reduxForm, FormSection } from "redux-form";
import { Link } from "react-router-dom";
import BaseButton, { ButtonStyle, ButtonType } from "../../../Shareable/button";
import {
  getLotes,
  getDiretoriaregional
} from "../../../../services/diretoriaRegional.service";
import { normalizaLabelValueLote, normalizaLabelValueDRE } from "./helper";
import { SectionFormEdital } from "./SectionFormEdital";
import ContratosRelacionados from "./ContratosRelacionados";
import "../style.scss";

class EditaisContratos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lotes: [],
      diretoriasRegionais: [],
      empresas: [
        {
          label: "SINGULAR GESTÃO DE SERVIÇOS LTDA",
          value: "SINGULAR GESTÃO DE SERVIÇOS LTDA",
          uuid: "24B20725-17B1-4E83-8EE9-1B0CAD5C4F51"
        },
        {
          label: "APETECE SISTEMAS DE ALIMENTAÇÃO S/A.",
          value: "APETECE SISTEMAS DE ALIMENTAÇÃO S/A.",
          uuid: "366270C1-3156-4792-920C-399B1973C58D"
        },
        {
          label: "S.H.A COMÉRCIO DE ALIMENTOS LTDA",
          value: "S.H.A COMÉRCIO DE ALIMENTOS LTDA",
          uuid: "F5CB749C-A1A8-4D4D-8276-AAD2EF3D9269"
        },
        {
          label: "P.R.M. SERVIÇOS E MÃO DE OBRA ESPECIALIZADA EIRELI ",
          value: "P.R.M. SERVIÇOS E MÃO DE OBRA ESPECIALIZADA EIRELI ",
          uuid: "3FA6EB36-7456-4274-824E-A4809494412A"
        },
        {
          label: "COMERCIAL MILANO BRASIL",
          value: "COMERCIAL MILANO BRASIL",
          uuid: "097783FB-FEC6-4DD2-98EC-832138F294F9"
        }
      ],
      forms: ["secaoEdital0"]
    };
  }

  nomeFormAtual() {
    const indiceDoFormAtual = `secaoEdital${this.state.forms.length - 1}`;
    let forms = this.state.forms;
    forms.push(indiceDoFormAtual);
    this.setState({ forms });
  }

  componentDidMount() {
    getLotes().then(response => {
      this.setState({ lotes: normalizaLabelValueLote(response.results) });
    });

    getDiretoriaregional().then(response => {
      this.setState({
        diretoriasRegionais: normalizaLabelValueDRE(response.data)
      });
    });
  }

  render() {
    const { handleSubmit } = this.props;
    const { lotes, forms, diretoriasRegionais, empresas } = this.state;
    return (
      <section className="cadastro pt-3">
        <div className="card">
          <form onSubmit={handleSubmit}>
            <header className="header-form">
              <nav>Dados do Edital e contrato</nav>
              <Link to="#">
                <BaseButton
                  className="header-button"
                  label="Consulta de lotes cadastrados"
                  style={ButtonStyle.OutlinePrimary}
                />
              </Link>
            </header>
            <SectionFormEdital />
            <hr />
            <nav className="titulo">Contratos relacionados</nav>
            {forms.map((formEdital, indice) => {
              return (
                <FormSection
                  component={ContratosRelacionados}
                  lotes={lotes}
                  name={`secaoEdital${indice}`}
                  nomeForm={formEdital}
                  diretoriasRegionais={diretoriasRegionais}
                  empresas={empresas}
                />
              );
            })}

            <article className="card-body dados-editais">
              <BaseButton
                className="header-button"
                label="+ Adicionar outro contrato relacionado"
                style={ButtonStyle.OutlinePrimary}
                onClick={() => {
                  this.nomeFormAtual();
                }}
              />
            </article>

            <footer className="card-body">
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
            </footer>
          </form>
        </div>
      </section>
    );
  }
}

export default reduxForm({
  form: "cadastroEditaisForm"
})(EditaisContratos);
