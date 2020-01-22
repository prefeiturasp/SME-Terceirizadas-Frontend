import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { getDietaEspecial } from "../../../../services/dietaEspecial";
import "./style.scss";
import CorpoRelatorio from "./componentes/CorpoRelatorio";

class Relatorio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dietaEspecial: null,
      uuid: null
    };
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    if (uuid) {
      getDietaEspecial(uuid).then(response => {
        this.setState({
          dietaEspecial: response.data,
          uuid
        });
      });
    }
  }

  render() {
    const { dietaEspecial } = this.state;
    return (
      <div>
        {!dietaEspecial ? (
          <div>Carregando...</div>
        ) : (
          <form onSubmit={this.props.handleSubmit}>
            <span className="page-title">{`Dieta Especial - Solicitação # ${
              dietaEspecial.id_externo
            }`}</span>
            <div className="card mt-3">
              <div className="card-body">
                <CorpoRelatorio dietaEspecial={dietaEspecial} />
              </div>
            </div>
          </form>
        )}
      </div>
    );
  }
}

const formName = "relatorioDietaEspecial";
const RelatorioForm = reduxForm({
  form: formName,
  enableReinitialize: true
})(Relatorio);

export default RelatorioForm;
