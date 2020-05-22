import React, { Component } from "react";
import "./style.scss";

class Wizard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { currentStep, arrayOfObjects, nameItem, outerParam } = this.props;
    return (
      <ul className="wizard">
        {arrayOfObjects &&
          arrayOfObjects.map((item, index) => {
            return (
              <li
                key={index}
                className={
                  index === currentStep
                    ? "current-step"
                    : index < currentStep
                    ? "past-step"
                    : index === currentStep + 1
                    ? "next next-step"
                    : "next-step"
                }
              >
                <div>{item[outerParam][`${nameItem}`]}</div>
              </li>
            );
          })}
      </ul>
    );
  }
}

export default Wizard;
