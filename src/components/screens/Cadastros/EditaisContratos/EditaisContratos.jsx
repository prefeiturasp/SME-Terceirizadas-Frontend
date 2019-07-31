import React, { Component } from "react";
import { connect } from "react-redux";
import { formValueSelector, FieldArray, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import BaseButton, { ButtonStyle } from "../../../Shareable/button";

import { SectionFormEdital } from "./SectionFormEdital";
import  SectionFormContratos from "./SectionFormContratos";
import "../style.scss";

class EditaisContratos extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }



  render() {
    const { handleSubmit } = this.props;
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
            <hr/>
            <FieldArray name={`teste`} component={SectionFormContratos} />
          </form>
        </div>
      </section>
    );
  }
}

const CadastroEditaisForm = reduxForm({
  form: "cadastroEditaisForm",
  enableReinitialize: true
})(EditaisContratos);
const selector = formValueSelector("cadastroEditaisForm");
const mapStateToProps = state => {
  return {
    resumo: {
      nome: selector(state, "nome")
    }
  };
};

export default connect(mapStateToProps)(CadastroEditaisForm);

/*


<Field
  component={LabelAndInput}
  className="form-control"
  name="nome"
/> 

*/
