import React, { Component } from "react";
import DashboardDRE from "./DashboardDRE";

class DashboardDREContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enrolled: 4050,
      solicitations: [
        {
          text: "12083 - 7A IP I - Solicitação Unificada",
          date: "11:19"
        },
        {
          text: "12083 - 7A IP I - Solicitação de Kit Lanche",
          date: "Qua 11:07"
        },
        {
          text: "12083 - 7A IP I - Solicitação Unificada",
          date: "Qua 10:07"
        }
      ],
      vision_by: [
        {
          label: "Visão por",
          value: ""
        },
        {
          label: "Dia",
          value: "day"
        },
        {
          label: "Semana",
          value: "week"
        },
        {
          label: "Mês",
          value: "month"
        },
        {
          label: "Lote",
          value: "lote"
        }
      ]
    };
  }

  render() {
    return <DashboardDRE {...this.state} />;
  }
}

export default DashboardDREContainer;
