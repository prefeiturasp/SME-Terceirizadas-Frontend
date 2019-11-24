import React, { Component, Fragment } from "react";
import { montaArraySteps } from "./helper";
import "./style.scss";

class Wizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: null,
      stepsList: [],
      stepsNames: null,
      currentStep: 0
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { steps } = this.props;
    if (
      this.state.steps === prevState.steps &&
      this.state.stepsList.length === 0
    ) {
      const stepsList = montaArraySteps(steps);
      this.setState({ steps, stepsList });
    }
  }

  renderWithSetp(stepNumber) {
    const componentSteps = this.props.componentSteps;
    return componentSteps[stepNumber];
  }

  render() {
    const { currentStep } = this.state;
    const { stepsNames } = this.props;
    return (
      <Fragment>
        <section className="wizard-container">
          {stepsNames.map((step, index) => {
            return (
              <a
                key={index}
                href={`#${index}`}
                className={
                  index === currentStep
                    ? "current-step"
                    : index < currentStep
                    ? "passed-step"
                    : "next-step"
                }
                onClick={event => {
                  event.preventDefault();
                  this.setState({ currentStep: index });
                }}
              >
                <span>{stepsNames[index]}</span>
              </a>
            );
          })}
        </section>
        <section className="wizard-content">
          {this.renderWithSetp(currentStep)}
        </section>
      </Fragment>
    );
  }
}

export default Wizard;
