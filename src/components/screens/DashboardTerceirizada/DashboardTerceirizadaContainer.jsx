import React, { Component } from "react";
import DashboardTerceirizada from "./DashboardTerceirizada";
import { getTerceirizadaPedidosSolicitacoesUnificadas } from "../../../services/solicitacaoUnificada.service";
import { getSuspensoesDeAlimentacaoInformadas } from "../../../services/suspensaoDeAlimentacao.service";
import { FiltroEnum } from "../../../constants/filtroEnum";
import {
  filtraNoLimite,
  filtraPrioritarios,
  filtraRegular,
  filtrarTotalSolicitacoes
} from "./helper";

class DashboardTerceirizadaContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unificadas: {
        prioritaria: [],
        limite: [],
        regular: [],
        total: null
      },

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
      ],
      quantidade_suspensoes: null
    };
  }

  filtrarSolicitacoesUnificadas(filtro) {
    getTerceirizadaPedidosSolicitacoesUnificadas(filtro).then(response => {
      let unificadas = this.state.unificadas;
      unificadas.prioritaria = filtraPrioritarios(response.results);
      unificadas.limite = filtraNoLimite(response.results);
      unificadas.regular = filtraRegular(response.results);
      unificadas.total = filtrarTotalSolicitacoes(response.results);

      this.setState({
        unificadas
      });
    });
  }

  componentDidMount() {
    getSuspensoesDeAlimentacaoInformadas().then(response => {
      let quantidade_suspensoes = response.length;
      this.setState({ quantidade_suspensoes });
    });
    this.filtrarSolicitacoesUnificadas(FiltroEnum.SEM_FILTRO);
  }

  render() {
    return <DashboardTerceirizada {...this.state} />;
  }
}

export default DashboardTerceirizadaContainer;
