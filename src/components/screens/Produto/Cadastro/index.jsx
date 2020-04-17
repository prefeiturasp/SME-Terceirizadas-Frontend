import React, { Component } from "react";
import { reduxForm } from "redux-form";
import Wizard from "../../../Shareable/Wizard";
import Step1 from "./Step1";
import Botao from "../../../Shareable/Botao";
import { BUTTON_TYPE, BUTTON_STYLE } from "../../../Shareable/Botao/constants";

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
            <div className="row">
              <div className="col-12 text-right pt-3">
                <Botao
                  texto={"Anterior"}
                  className="mr-3"
                  type={BUTTON_TYPE.BUTTON}
                  style={BUTTON_STYLE.GREEN_OUTLINE}
                  disabled={currentStep === 0}
                  onClick={() =>
                    this.setState({ currentStep: currentStep - 1 })
                  }
                />
                <Botao
                  texto={"Salvar Rascunho"}
                  className="mr-3"
                  type={BUTTON_TYPE.BUTTON}
                  style={BUTTON_STYLE.GREEN_OUTLINE}
                  disabled
                />
                <Botao
                  texto={"Próximo"}
                  type={BUTTON_TYPE.BUTTON}
                  style={BUTTON_STYLE.GREEN_OUTLINE}
                  onClick={() =>
                    this.setState({ currentStep: currentStep + 1 })
                  }
                />
              </div>
            </div>
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
