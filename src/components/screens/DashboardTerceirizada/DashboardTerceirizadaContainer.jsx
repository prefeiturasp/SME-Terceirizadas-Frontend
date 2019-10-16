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
        },
        {
          nome: "Lote",
          uuid: "lote"
        }
      ],
      filtro_por: [
        {
          nome: "Sem filtro",
          uuid: "sem_filtro"
        },
        {
          nome: "Semana",
          uuid: "daqui_a_7_dias"
        },
        {
          nome: "Mês",
          uuid: "daqui_a_30_dias"
        }
      ]
    };
  }

  render() {
    return <DashboardTerceirizada {...this.state} />;
  }
}

export default DashboardTerceirizadaContainer;
