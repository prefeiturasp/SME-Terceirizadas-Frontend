import React, { Component } from "react";
import { getTotalAlunos } from "../../../services/codae.service";
import { getLotes } from "../../../services/lote.service";
import {
  getSolicitacoesAprovadosCodae,
  getSolicitacoesCanceladasCodae,
  getSolicitacoesPendentesAprovacaoCodae,
  getSolicitacoesRevisaoAprovacaoCodae
} from "../../../services/painelCODAE.service";
import { FILTRO, VENCIMENTO } from "../const";
import DashboardCODAE from ".";
import { ajustarFormaLotes, ajustarFormatoLog, LOG_PARA } from "../helper";
import { getSuspensoesDeAlimentacaoInformadas } from "../../../services/suspensaoDeAlimentacao.service";
import { getDiretoriaregionalSimplissima } from "../../../services/diretoriaRegional.service";

class DashboardCODAEContainer extends Component {
  async componentDidMount() {
    const totalAlunos = await getTotalAlunos();
    let solicitacoesAprovadas = await getSolicitacoesAprovadosCodae();
    let solicitacoesPendentesAprovacao = await getSolicitacoesPendentesAprovacaoCodae();
    let solicitacoesCanceladas = await getSolicitacoesCanceladasCodae();
    let solicitacoesRevisao = await getSolicitacoesRevisaoAprovacaoCodae();
    let diretoriasRegionais = await getDiretoriaregionalSimplissima();

    solicitacoesAprovadas = ajustarFormatoLog(
      solicitacoesAprovadas,
      LOG_PARA.CODAE
    );
    solicitacoesPendentesAprovacao = ajustarFormatoLog(
      solicitacoesPendentesAprovacao,
      LOG_PARA.CODAE
    );
    solicitacoesCanceladas = ajustarFormatoLog(solicitacoesCanceladas);
    let lotes = await getLotes();
    lotes = ajustarFormaLotes(lotes.results);

    getSuspensoesDeAlimentacaoInformadas().then(response => {
      let quantidade_suspensoes = response.length;
      this.setState({ quantidade_suspensoes });
    });

    this.setState({
      totalAlunos,
      solicitacoesAprovadas,
      solicitacoesPendentesAprovacao,
      solicitacoesCanceladas,
      solicitacoesRevisao,
      lotes,
      diretoriasRegionais: diretoriasRegionais.data.results,
      loadingPainelSolicitacoes: false
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
      quantidade_suspensoes: null,
      lotes: [],
      loadingPainelSolicitacoes: true,
      diretoriasRegionais: [],
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
      ],
      visaoPor: [
        {
          nome: "Tipo de solicitação",
          uuid: "tipo_solicitacao"
        },
        {
          nome: "DRE",
          uuid: "dre"
        },
        {
          nome: "Lote",
          uuid: "lote"
        }
      ]
    };
  }

  render() {
    return <DashboardCODAE {...this.state} />;
  }
}

export default DashboardCODAEContainer;
