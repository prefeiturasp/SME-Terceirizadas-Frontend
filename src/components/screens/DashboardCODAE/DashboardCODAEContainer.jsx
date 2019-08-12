import React, { Component } from "react";
import DashboardCODAE from './DashboardCODAE';

class DashboardCODAEContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enrolled: 31500,
      dres: [
        {
          id: 1,
          nome: "Butantã",
          pedidos: 20
        },
        {
          id: 2,
          nome: "Campo Limpo",
          pedidos: 22
        },
        {
          id: 3,
          nome: "Capela do Socorro",
          pedidos: 10
        },
        {
          id: 4,
          nome: "Freguesia/Brasilândia",
          pedidos: 11
        },
        {
          id: 5,
          nome: "Guaianases",
          pedidos: 7
        },
        {
          id: 6,
          nome: "Ipiranga",
          pedidos: 56
        },
        {
          id: 7,
          nome: "Itaquera",
          pedidos: 35
        },
        {
          id: 8,
          nome: "Jaçanã/Tremembé",
          pedidos: 5
        },
        {
          id: 9,
          nome: "Penha",
          pedidos: 15
        },
        {
          id: 10,
          nome: "Pirituba/Jaraguá",
          pedidos: 10
        },
        {
          id: 11,
          nome: "Santo Amaro",
          pedidos: 9
        },
        {
          id: 12,
          nome: "São Mateus",
          pedidos: 30
        },
        {
          id: 13,
          nome: "São Miguel",
          pedidos: 43
        }
      ],
      lotes: [
        {
          id: 1,
          lote: "1 BT",
          dre: "BUTANTÃ",
          tipo: "MISTA"
        },
        {
          id: 2,
          lote: "2 CLI",
          dre: "CAMPO LIMPO",
          tipo: "MISTA"
        },
        {
          id: 3,
          lote: "3 CLII",
          dre: "CAMPO LIMPO",
          tipo: "MISTA"
        },
        {
          id: 4,
          lote: "4 CS",
          dre: "CAPELA DO SOCORRO",
          tipo: "TERC TOTAL"
        },
        {
          id: 5,
          lote: "5 FO",
          dre: "FREGUESIA do Ó",
          tipo: "TERC TOTAL"
        },
        {
          id: 6,
          lote: "6 G",
          dre: "GUAIANASES",
          tipo: "TERC TOTAL"
        },
        {
          id: 7,
          lote: "7A IPI I",
          dre: "IPIRANGA",
          tipo: "TERC TOTAL"
        },
        {
          id: 7,
          lote: "7B IPI II",
          dre: "IPIRANGA",
          tipo: "TERC TOTAL"
        }
      ],
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
          nome: "DRE",
          uuid: "dre"
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
    return < DashboardCODAE {...this.state} />;
  }
}

export default DashboardCODAEContainer;
