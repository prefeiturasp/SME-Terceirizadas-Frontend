import React, { Component } from "react";
import { getTotalAlunos } from "../../../services/codae.service";
import { getLotes } from "../../../services/lote.service";
import { getSolicitacoesAprovadosCodae, getSolicitacoesCanceladasCodae, getSolicitacoesPendentesAprovacaoCodae, getSolicitacoesRevisaoAprovacaoCodae } from "../../../services/painelCODAE.service";
import { VENCIMENTO } from "./const";
import DashboardCODAE from "./DashboardCODAE";
import { ajustarFormaLotes, ajustarFormatoLog } from "./helper";

class DashboardCODAEContainer extends Component {
  async componentDidMount() {
    const enrolled = await getTotalAlunos();
    let solicitacoesAprovadas = await getSolicitacoesAprovadosCodae();
    let solicitacoesPendentesAprovacao = await getSolicitacoesPendentesAprovacaoCodae();
    let solicitacoesCanceladas = await getSolicitacoesCanceladasCodae();
    let solicitacoesRevisao = await getSolicitacoesRevisaoAprovacaoCodae();

    solicitacoesAprovadas = ajustarFormatoLog(solicitacoesAprovadas);
    solicitacoesPendentesAprovacao = ajustarFormatoLog(
      solicitacoesPendentesAprovacao
    );
    solicitacoesCanceladas = ajustarFormatoLog(solicitacoesCanceladas);
    let lotes = await getLotes();
    lotes = ajustarFormaLotes(lotes.results);

    this.setState({
      enrolled,
      solicitacoesAprovadas,
      solicitacoesPendentesAprovacao,
      solicitacoesCanceladas,
      solicitacoesRevisao,
      lotes
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      solicitacoesAprovadas: [],
      solicitacoesPendentesAprovacao: [],
      solicitacoesCanceladas: [],
      solicitacoesRevisao: [],
      enrolled: 0,
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
      lotes: [],
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
      vencimentoPara: [
        {
          nome: VENCIMENTO.SEM_FILTRO,
          uuid: ""
        },
        {
          nome: VENCIMENTO.SEMANA,
          uuid: "week"
        },
        {
          nome: VENCIMENTO.MES,
          uuid: "month"
        }
      ]
    };
  }

  render() {
    return <DashboardCODAE {...this.state} />;
  }
}

export default DashboardCODAEContainer;
