import React, { Component } from "react";
import { getTotalAlunos } from "../../../services/codae.service";
import { getLotes } from "../../../services/lote.service";
import {
  getSolicitacoesAprovadosCodae,
  getSolicitacoesCanceladasCodae,
  getSolicitacoesPendentesAprovacaoCodae,
  getSolicitacoesRevisaoAprovacaoCodae
} from "../../../services/painelCODAE.service";
import { FILTRO, VENCIMENTO } from "./const";
import DashboardCODAE from "./DashboardCODAE";
import { ajustarFormaLotes, ajustarFormatoLog } from "./helper";

class DashboardCODAEContainer extends Component {
  async componentDidMount() {
    const totalAlunos = await getTotalAlunos();
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
      totalAlunos,
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
      totalAlunos: 0,
      lotes: [],
      vencimentoPara: [
        {
          nome: VENCIMENTO.SEM_FILTRO,
          uuid: FILTRO.SEM_FILTRO
        },
        {
          nome: VENCIMENTO.SEMANA,
          uuid: FILTRO.DAQUI_A_7_DIAS
        },
        {
          nome: VENCIMENTO.MES,
          uuid: FILTRO.DAQUI_A_30_DIAS
        }
      ]
    };
  }

  render() {
    return <DashboardCODAE {...this.state} />;
  }
}

export default DashboardCODAEContainer;
