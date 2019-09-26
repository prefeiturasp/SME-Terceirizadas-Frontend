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
      enrolled: 4050,
      autorizadasList: [],
      pendentesList: [],
      recusadasList: [],
      canceladasList: [],
      autorizadasListFiltered: [],
      pendentesListFiltered: [],
      recusadasListFiltered: [],
      canceladasListFiltered: [],
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
    const dreUuid = meusDados.diretorias_regionais[0].uuid;
    let autorizadas = await getSolicitacoesAutorizadasDRE(dreUuid);
    let pendentes = await getSolicitacoesPendentesDRE(dreUuid);
    let recusadas = await getSolicitacoesRecusadasDRE(dreUuid);
    let canceladas = await getSolicitacoesCanceladasDRE(dreUuid);

    const minhaDRE = await getDiretoriaregionalDetalhe(dreUuid);
    const lotesDRE = (await minhaDRE).data.lotes;

    getSuspensoesDeAlimentacaoInformadas().then(response => {
      let quantidade_suspensoes = response.length;
      this.setState({ quantidade_suspensoes });
    });

    autorizadas = ajustarFormatoLog(autorizadas.results, LOG_PARA.DRE);
    pendentes = ajustarFormatoLog(pendentes.results, LOG_PARA.DRE);
    recusadas = ajustarFormatoLog(recusadas.results, LOG_PARA.DRE);
    canceladas = ajustarFormatoLog(canceladas.results, LOG_PARA.DRE);

    this.setState({
      autorizadasList: autorizadas,
      pendentesList: pendentes,
      recusadasList: recusadas,
      canceladasList: canceladas,

      autorizadasListFiltered: autorizadas,
      pendentesListFiltered: pendentes,
      recusadasListFiltered: recusadas,
      canceladasListFiltered: canceladas,

      meusDados,
      loadingAutorizadas: false,
      loadingPendentes: false,
      enrolled: meusDados.diretorias_regionais[0].quantidade_alunos,
      lotesDRE
    });
  }

  render() {
    return <DashboardDRE {...this.state} />;
  }
}

export default DashboardDREContainer;
