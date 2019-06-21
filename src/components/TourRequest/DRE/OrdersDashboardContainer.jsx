import React, { Component } from "react";
import OrdersDashboard from "./OrdersDashboard";

class OrdersDashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <OrdersDashboard {...this.state} />;
  }
}

export default OrdersDashboardContainer;
