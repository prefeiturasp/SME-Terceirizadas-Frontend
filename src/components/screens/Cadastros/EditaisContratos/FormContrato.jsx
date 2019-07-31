import React, { Component, Fragment } from "react";
import { LabelAndInput } from "../../../Shareable/labelAndInput/labelAndInput";
import { Field } from "redux-form";
import { required } from "../../../../helpers/fieldValidators";
import { InputContratoVigencia } from "./InputContratoVigencia";

class FormContrato extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { nome_formulario } = this.props;
    return (
      <Fragment>
        <div className="container-input">
          <InputContratoVigencia nome_formulario={nome_formulario} />
          <div className="botao-add">
            <button>+</button>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default FormContrato;