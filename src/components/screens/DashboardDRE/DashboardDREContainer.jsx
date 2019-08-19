import React, { Component } from "react";
import DashboardDRE from "./DashboardDRE";
import { getPendentesAprovacaoList } from "../../../services/painelDRE.service";

class DashboardDREContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enrolled: 4050,
      pendentesAprovacaoList: [],
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
    getPendentesAprovacaoList().then(response => {
      this.setState({
        pendentesAprovacaoList: response
      });
    });

  }


  render() {
    return <DashboardDRE {...this.state} />;
  }
}

export default DashboardDREContainer;
