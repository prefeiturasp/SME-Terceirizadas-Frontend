import React, { Component } from "react";
import OrdersDashboard from "./OrdersDashboard";
import { FiltroEnum } from "../../../constants/filtroEnum";
import { getDiretoriaRegionalPedidosDeKitLanche } from "../services";
import {filtraNoLimite, filtraPrioritarios, filtraRegular} from '../helper'


class OrdersDashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pedidosCarregados: 0,
      pedidosPrioritarios: [],
      pedidosNoPrazoLimite: [],
      pedidosNoPrazoRegular: [],
      vision_by: [
        {
          nome: "Sem Filtro",
          uuid: "sem_filtro"
        },
        {
          nome: "Hoje",
          uuid: "hoje"
        },
        {
          nome: "Daqui a 7 dias",
          uuid: "daqui_a_7_dias"
        },
        {
          nome: "Daqui a 30 dias",
          uuid: "daqui_a_30_dias"
        },
      ]
    };
  }

  filtrar(filtro) {
    this.setState({ pedidosCarregados: 0 });
    getDiretoriaRegionalPedidosDeKitLanche(filtro).then(resposta =>{
      let pedidosPrioritarios = filtraPrioritarios(resposta.results);
      let pedidosNoPrazoLimite = filtraNoLimite(resposta.results);
      let pedidosNoPrazoRegular = filtraRegular(resposta.results);
      this.setState({
        pedidosPrioritarios,
        pedidosNoPrazoLimite,
        pedidosNoPrazoRegular
      });
    });
  }

  componentDidMount(){
    this.filtrar(FiltroEnum.SEM_FILTRO)
  }

  render() {
    return <OrdersDashboard {...this.state} />;
  }
}

export default OrdersDashboardContainer;
