import React, { Component } from "react";
import { reduxForm, FormSection } from "redux-form";
import { Link } from "react-router-dom";
import BaseButton, { ButtonStyle, ButtonType } from "../../../Shareable/button";
import {
  getLotes,
  getDiretoriaregional
} from "../../../../services/diretoriaRegional.service";
import { getTerceirizada } from "../../../../services/terceirizada.service";
import {
  normalizaLabelValueLote,
  normalizaLabelValueDRE,
  normalizaLabelValueEmpresa
} from "./helper";
import { SectionFormEdital } from "./SectionFormEdital";
import ContratosRelacionados from "./ContratosRelacionados";
import "../style.scss";

class EditaisContratos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lotes: [],
      diretoriasRegionais: [],
      empresas: [],
      forms: ["secaoEdital0"],

      contratos_relacionados: [
        {
          vigencias: [
            {
              data_inicio: null,
              data_fim: null
            }
          ],
          numero_contrato: null,
          processo_administrativo: null,
          data_proposta: null,
          lotes: null,
          dres: null,
          empresas: null
        }
      ]
    };
    this.obtemDadosParaSubmit = this.obtemDadosParaSubmit.bind(this);
    this.adicionaVigenciaContrato = this.adicionaVigenciaContrato.bind(this);
    this.adicionaNumeroContrato = this.adicionaNumeroContrato.bind(this);
  }

  adicionaNumeroContrato(indice, numero_contrato){
    const contratos_relacionados = this.state.contratos_relacionados;
    contratos_relacionados[indice].numero_contrato = numero_contrato;
    this.setState({
      contratos_relacionados
    });
  }

  salvaFormulario(values) {
    console.log(values);
    console.log(this.state.contratos_relacionados)
  }

  obtemDadosParaSubmit(field, value, key) {
    let contratos_relacionados = this.state.contratos_relacionados;
    contratos_relacionados[key][field] = value;
    this.setState({
      ...this.state,
      contratos_relacionados: contratos_relacionados
    });
  }

  adicionaVigenciaContrato(indice, vigencias) {
    const contratos_relacionados = this.state.contratos_relacionados;
    contratos_relacionados[indice].vigencias = vigencias;
    this.setState({
      contratos_relacionados
    });
  }

  adicionaContratosRelacionados() {
    this.setState({
      contratos_relacionados: this.state.contratos_relacionados.concat([
        {
          vigencias: [
            {
              data_inicio: null,
              data_fim: null
            }
          ],
          numero_contrato: null,
          processo_administrativo: null,
          data_proposta: null,
          lotes: null,
          dres: null,
          empresas: null
        }
      ])
    });
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

    getTerceirizada().then(response => {
      this.setState({
        empresas: normalizaLabelValueEmpresa(response.data.results)
      });
    });
  }

  render() {
    const { handleSubmit } = this.props;
    const { lotes, forms, diretoriasRegionais, empresas } = this.state;
    {console.log(this.state.contratos_relacionados)}
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
            {forms.map((formEdital, key) => {
              return (
                <FormSection
                  component={ContratosRelacionados}
                  lotes={lotes}
                  name={`secaoEdital${key}`}
                  nomeForm={formEdital}
                  diretoriasRegionais={diretoriasRegionais}
                  empresas={empresas}
                  obtemDadosParaSubmit={this.obtemDadosParaSubmit}
                  obtemLotesDresouEmpresas={this.obtemLotesDresouEmpresas}
                  indice={key}
                  adicionaVigenciaContrato={this.adicionaVigenciaContrato}
                  adicionaNumeroContrato={this.adicionaNumeroContrato}
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
                  this.adicionaContratosRelacionados();
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
                    onClick={handleSubmit(values =>
                      this.salvaFormulario(values)
                    )}
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
