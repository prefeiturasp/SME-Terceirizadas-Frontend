import React, { Component } from "react";
import DashboardTerceirizada from "./DashboardTerceirizada";

class DashboardTerceirizadaContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enrolled: 4050,
      gestaoDeAlimentacao: false,
      vision_by: [
        {
          nome: "Tipo de Solicitação",
          uuid: "tipo_solicitacao"
        }
      ]
    };
  }

  render() {
    return <DashboardTerceirizada {...this.state} />;
  }
}

export default DashboardTerceirizadaContainer;
