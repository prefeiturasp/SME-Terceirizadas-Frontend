import React, { Component } from "react";
import { meusDados as getMeusDados } from "../../../services/perfil.service";
import DashboardTerceirizada from "./DashboardTerceirizada";

class DashboardTerceirizadaContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      ],
      meusDados: null
    };
  }

  async componentDidMount() {
    this.setState({ meusDados: await getMeusDados() });
  }

  render() {
    return <DashboardTerceirizada {...this.state} />;
  }
}

export default DashboardTerceirizadaContainer;
