import React, { Component } from "react";
import { montaArraySteps } from "./helper";
import "./style.scss";

class Wizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: null,
      stepsList: []
    };
  }

  componentDidMount() {}

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

  render() {
    return <section>dfdfd</section>;
  }
}

export default Wizard;
