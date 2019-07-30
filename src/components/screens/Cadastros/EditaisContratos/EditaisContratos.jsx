import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm, FieldArray } from "redux-form";
import { LabelAndInput } from "../../../Shareable/labelAndInput/labelAndInput";
import { Link } from "react-router-dom";
import BaseButton, { ButtonStyle, ButtonType } from "../../../Shareable/button";

import "../style.scss";

class EditaisContratos extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <section className="cadastro pt-3">
        <form onSubmit={handleSubmit}>
          <div className="card">
            <div className="card-body direction">
              <h6>Dados do Edital e contratos</h6>
              <Link to="/configuracoes/cadastros/lotes-cadastrados">
                <BaseButton
                    className="header-button"
                  label="Contratos cadastrados"
                  style={ButtonStyle.OutlinePrimary}
                />
              </Link>
            </div>
          </div>
        </form>
      </section>
    );
  }
}

export default EditaisContratos;
