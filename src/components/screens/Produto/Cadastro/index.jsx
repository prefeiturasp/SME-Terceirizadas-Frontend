import React, { Component } from "react";
import { reduxForm } from "redux-form";
import Wizard from "../../../Shareable/Wizard";
import Step1 from "./Step1";

class cadastroProduto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
      wizardSteps: [
        {
          step: {
            nome: "Identificação"
          }
        },
        {
          step: {
            nome: "Informação Nutricional"
          }
        },
        {
          step: {
            nome: "Informação do Produto"
          }
        }
      ]
    };
  }

  render() {
    const { wizardSteps, currentStep } = this.state;
    const { handleSubmit } = this.props;
    return (
      <div className="card">
        <div className="card-body">
          <form className="special-diet" onSubmit={handleSubmit}>
            <Wizard
              arrayOfObjects={wizardSteps}
              currentStep={currentStep}
              outerParam="step"
              nameItem="nome"
            />
            {currentStep === 0 && <Step1 />}
          </form>
        </div>
      </div>
    );
  }
}

const componentNameForm = reduxForm({
  form: "cadastroProduto"
})(cadastroProduto);

export default componentNameForm;
