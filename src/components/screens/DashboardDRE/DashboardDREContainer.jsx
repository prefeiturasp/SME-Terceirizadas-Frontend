import React, { Component } from "react";
import DashboardDRE from "./DashboardDRE";
import { getSolicitacoesAutorizadasPelaDRE } from "../../../services/painelDRE.service";

class DashboardDREContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enrolled: 4050,
      autorizadasList: [],
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
        },
        {
          text: "12083 - 7A IP I - Solicitação Unificada",
          date: "Qua 10:07"
        },
        {
          text: "12083 - 7A IP I - Solicitação Unificada",
          date: "Qua 10:07"
        }
      ],
      vision_by: [
        {
          nome: "Visão por",
          uuid: ""
        },
        {
          nome: "Dia",
          uuid: "day"
        },
        {
          nome: "Semana",
          uuid: "week"
        },
        {
          nome: "Mês",
          uuid: "month"
        },
        {
          nome: "Lote",
          uuid: "lote"
        }
      ]
    };
  }

  componentDidMount() {
    getSolicitacoesAutorizadasPelaDRE("5a702b2c-0e3b-468a-a97a-5904d0061ff0").then(autorizadasList => {
      this.setState({
        autorizadasList:autorizadasList.results
      });
    });

  }


  render() {
    return <DashboardDRE {...this.state} />;
  }
}

export default DashboardDREContainer;
