import React, { Component, Fragment } from "react";
import FormContrato from "./FormContrato";

class SectionFormContratos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forms: ["form_contrato_1"],
      numeroForm: 2
    };
    this.renderizaFormContrato = this.renderizaFormContrato.bind(this);
  }

  renderizaFormContrato = numeroFormulario => {
    let nomeForm = `form_contrato_${numeroFormulario}`;
    this.state.forms.push(nomeForm);
    this.setState({ numeroForm: numeroFormulario + 1 });
    return nomeForm;
  };

  render() {
    const { forms, numeroForm } = this.state;
    return (
      <Fragment>
        <div className="article-contratos">
          <nav className="titulo">Contratos relacionados</nav>
        </div>

        {forms.map(form => {
          return (
            <Fragment>
              <article className="card-body article-contratos">
                <FormContrato nome_formulario={form} />
              </article>
              <hr />
            </Fragment>
          );
        })}

        <button
          type="button"
          onClick={value => this.renderizaFormContrato(numeroForm)}
        >
          novo formulario
        </button>
      </Fragment>
    );
  }
}

export default SectionFormContratos;
