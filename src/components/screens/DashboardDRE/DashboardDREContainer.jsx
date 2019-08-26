import React, { Component } from "react";
import DashboardDRE from "./DashboardDRE";
import { getSolicitacoesAutorizadasPelaDRE, getSolicitacoesPendentesParaDRE } from "../../../services/painelDRE.service";
import { meusDados as getMeusDados } from "../../../services/perfil.service";

class DashboardDREContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enrolled: 4050,
      autorizadasList: [],
      pendentesList: [],
      recusadasList: [],
      canceladasList:[],

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

  async componentDidMount() {
    const meusDados = await getMeusDados()
    const autorizadas = await getSolicitacoesAutorizadasPelaDRE(meusDados.diretorias_regionais[0].uuid)
    const pendentes = await getSolicitacoesPendentesParaDRE(meusDados.diretorias_regionais[0].uuid)
    this.setState({
      autorizadasList:autorizadas.results,
      pendentesList:pendentes.results
    });
  }


  render() {
    return <DashboardDRE {...this.state} />;
  }
}

export default DashboardDREContainer;
