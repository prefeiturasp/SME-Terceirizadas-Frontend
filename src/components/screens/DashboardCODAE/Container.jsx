import React, { Component } from "react";
import DashboardCODAE from ".";
import { getTotalAlunos } from "../../../services/codae.service";
import { getDiretoriaregionalSimplissima } from "../../../services/diretoriaRegional.service";
import { getLotes } from "../../../services/lote.service";
import {
  getSolicitacoesAutorizadasCodae,
  getSolicitacoesCanceladasCodae,
  getSolicitacoesNegadasCodae,
  getSolicitacoesPendentesAutorizacaoCodae
} from "../../../services/painelCODAE.service";
import { getSuspensoesDeAlimentacaoInformadas } from "../../../services/suspensaoDeAlimentacao.service";
import { FILTRO, VENCIMENTO } from "../const";
import { ajustarFormaLotes, ajustarFormatoLog, LOG_PARA } from "../helper";

class DashboardCODAEContainer extends Component {
  async componentDidMount() {
    const totalAlunos = await getTotalAlunos();
    let solicitacoesAutorizadas = await getSolicitacoesAutorizadasCodae();
    let solicitacoesPendentes = await getSolicitacoesPendentesAutorizacaoCodae(
      FILTRO.SEM_FILTRO
    );
    let solicitacoesCanceladas = await getSolicitacoesCanceladasCodae();
    let solicitacoesNegadas = await getSolicitacoesNegadasCodae();

    let diretoriasRegionais = await getDiretoriaregionalSimplissima();

    if (solicitacoesAutorizadas.length)
      solicitacoesAutorizadas = ajustarFormatoLog(
        solicitacoesAutorizadas,
        LOG_PARA.CODAE
      );
    if (solicitacoesPendentes)
      solicitacoesPendentes = ajustarFormatoLog(
        solicitacoesPendentes,
        LOG_PARA.CODAE
      );

    if (solicitacoesCanceladas.length)
      solicitacoesCanceladas = ajustarFormatoLog(
        solicitacoesCanceladas,
        LOG_PARA.CODAE
      );

    if (solicitacoesNegadas.length)
      solicitacoesNegadas = ajustarFormatoLog(
        solicitacoesNegadas,
        LOG_PARA.CODAE
      );

    let lotes = await getLotes();
    lotes = ajustarFormaLotes(lotes.results);

    getSuspensoesDeAlimentacaoInformadas().then(response => {
      let quantidade_suspensoes = response.length;
      this.setState({ quantidade_suspensoes });
    });

    this.setState({
      totalAlunos,
      solicitacoesAutorizadas,
      solicitacoesPendentes,
      solicitacoesCanceladas,
      solicitacoesNegadas,
      lotes,
      diretoriasRegionais: diretoriasRegionais.data.results
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      solicitacoesAutorizadas: [],
      solicitacoesPendentes: [],
      solicitacoesCanceladas: [],
      solicitacoesNegadas: [],
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
