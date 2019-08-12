import React, { Component } from "react";
import OrdersDashboard from "./OrdersDashboard";

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
  {
    id: "12086",
    escola: {
      cod_eol: "097705",
      nome: "EMEF ABRAO DE MORAES, PROF."
    },
    quantidade: "150"
  }
];

class OrdersDashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pedidos: pedidos,
      vision_by: [
        {
          nome: "Visão por dia",
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
  render() {
    return <OrdersDashboard {...this.state} />;
  }
}

export default OrdersDashboardContainer;
