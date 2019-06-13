import React, { Component } from "react";
import DashboardDRE from "./DashboardDRE";

class DashboardDREContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enrolled: 4050
    };
  }

  render() {
    return <DashboardDRE {...this.state} />;
  }
}

export default DashboardDREContainer;
