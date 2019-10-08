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
      enrolled: 4050,
      gestaoDeAlimentacao: false,
      vision_by: [
        {
          nome: "Tipo de Solicitação",
          uuid: "tipo_solicitacao"
        }
      ],
    };
  }

  render() {
    return <DashboardTerceirizada {...this.state} />;
  }
}

export default DashboardTerceirizadaContainer;
