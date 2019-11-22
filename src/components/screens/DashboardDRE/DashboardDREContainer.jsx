import React, { Component } from "react";
import { getDiretoriaregionalDetalhe } from "../../../services/diretoriaRegional.service";
import {
  getSolicitacoesAutorizadasDRE,
  getSolicitacoesCanceladasDRE,
  getSolicitacoesPendentesDRE,
  getSolicitacoesRecusadasDRE
} from "../../../services/painelDRE.service";
import { meusDados as getMeusDados } from "../../../services/perfil.service";
import { getSuspensoesDeAlimentacaoInformadas } from "../../../services/suspensaoDeAlimentacao.service";
import { ajustarFormatoLog, LOG_PARA } from "../helper";
import DashboardDRE from "./DashboardDRE";

class DashboardDREContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enrolled: null,
      autorizadasList: [],
      pendentesList: [],
      recusadasList: [],
      canceladasList: [],
      negadasList: [],

      resumoPendenciasDREAlteracoesDeCardapio: {},
      meusDados: [],
      loadingAutorizadas: true,
      loadingPendentes: true,
      solicitations: [],
      lotesDRE: [],
      quantidade_suspensoes: null,
      vision_by: [
        {
          nome: "Tipo de Solicitação",
          uuid: "tipo_solicitacao"
        },
        {
          nome: "Lote",
          uuid: "lote"
        }
      ],
      filtro_por: [
        {
          nome: "Sem filtro",
          uuid: "sem_filtro"
        },
        {
          nome: "Semana",
          uuid: "daqui_a_7_dias"
        },
        {
          nome: "Mês",
          uuid: "daqui_a_30_dias"
        }
      ]
    };
  }

  async componentDidMount() {
    const meusDados = await getMeusDados();
    const dreUuid = meusDados.vinculo_atual.instituicao.uuid;
    let autorizadas = await getSolicitacoesAutorizadasDRE(dreUuid);
    let pendentes = await getSolicitacoesPendentesDRE(dreUuid);
    let negadas = await getSolicitacoesRecusadasDRE(dreUuid);
    let canceladas = await getSolicitacoesCanceladasDRE(dreUuid);
    const minhaDRE = await getDiretoriaregionalDetalhe(dreUuid);
    const lotesDRE = (await minhaDRE).data.lotes;

    getSuspensoesDeAlimentacaoInformadas().then(response => {
      let quantidade_suspensoes = response.length;
      this.setState({ quantidade_suspensoes });
    });

    autorizadas = ajustarFormatoLog(autorizadas.results, LOG_PARA.DRE);
    pendentes = ajustarFormatoLog(pendentes.results, LOG_PARA.DRE);
    negadas = ajustarFormatoLog(negadas.results, LOG_PARA.DRE);
    canceladas = ajustarFormatoLog(canceladas.results, LOG_PARA.DRE);

    this.setState({
      autorizadasList: autorizadas,
      pendentesList: pendentes,
      negadasList: negadas,
      canceladasList: canceladas,

      meusDados,
      loadingAutorizadas: false,
      loadingPendentes: false,
      enrolled: meusDados.vinculo_atual.instituicao.quantidade_alunos,
      lotesDRE
    });
  }

  render() {
    return <DashboardDRE {...this.state} />;
  }
}

export default DashboardDREContainer;
