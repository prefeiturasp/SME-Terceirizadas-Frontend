import React, { Component } from "react";
import OrdersDashboard from "./OrdersDashboard";
import {getCodaePedidosDeKitLanche} from '../services'
import { FiltroEnum } from "../../../constants/filtroEnum";
import {filtraNoLimite, filtraPrioritarios, filtraRegular} from '../helper'

const pedidos = [
  {
    id: "12083",
    escola: {
      cod_eol: "009148",
      nome: "EMEF CACILDA BECKER"
    },
    quantidade: "1705"
  },
  {
    id: "12084",
    escola: {
      cod_eol: "013528",
      nome: "EMEF ANTONIO CARLOS ROCHA, PROF."
    },
    quantidade: "150"
  },
  {
    id: "12085",
    escola: {
      cod_eol: "014699",
      nome: "EMEF ROSANGELA RODRIGUES VIEIRA, PROFA."
    },
    quantidade: "150"
  },
  {
    id: "12086",
    escola: {
      cod_eol: "097705",
      nome: "EMEF ABRAO DE MORAES, PROF."
    },
    quantidade: "150"
  },
  {
    id: "12083",
    escola: {
      cod_eol: "009148",
      nome: "EMEF CACILDA BECKER"
    },
    quantidade: "1705"
  },
  {
    id: "12084",
    escola: {
      cod_eol: "013528",
      nome: "EMEF ANTONIO CARLOS ROCHA, PROF."
    },
    quantidade: "150"
  },
  {
    id: "12085",
    escola: {
      cod_eol: "014699",
      nome: "EMEF ROSANGELA RODRIGUES VIEIRA, PROFA."
    },
    quantidade: "150"
  },
  {
    id: "12086",
    escola: {
      cod_eol: "097705",
      nome: "EMEF ABRAO DE MORAES, PROF."
    },
    quantidade: "150"
  },
  {
    id: "12083",
    escola: {
      cod_eol: "009148",
      nome: "EMEF CACILDA BECKER"
    },
    quantidade: "1705"
  },
  {
    id: "12084",
    escola: {
      cod_eol: "013528",
      nome: "EMEF ANTONIO CARLOS ROCHA, PROF."
    },
    quantidade: "150"
  },
  {
    id: "12085",
    escola: {
      cod_eol: "014699",
      nome: "EMEF ROSANGELA RODRIGUES VIEIRA, PROFA."
    },
    quantidade: "150"
  },
];

class OrdersDashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pedidosCarregados: 0,
      pedidosPrioritarios: [],
      pedidosNoPrazoLimite: [],
      pedidosNoPrazoRegular: [],
      pedidos: pedidos,
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
    getCodaePedidosDeKitLanche(filtro).then(resposta =>{
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
