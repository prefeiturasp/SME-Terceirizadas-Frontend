import React, { Component } from "react";
import { meusDados as getMeusDados } from "../../../services/perfil.service";
import { getDiretoriaregionalSimplissima } from "../../../services/diretoriaRegional.service";
import { TIPOS_SOLICITACAO_LISTA } from "../../../constants/shared";
import { formatarLotesParaVisao } from "../../../helpers/utilities";
import DashboardCODAE from ".";
import { getLotesSimples } from "../../../services/lote.service";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vision_by: [
        {
          nome: "Tipo de Solicitação",
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
      ],
      meusDados: null,
      cards: TIPOS_SOLICITACAO_LISTA,
      tiposSolicitacao: TIPOS_SOLICITACAO_LISTA,
      diretoriasRegionais: null,
      lotes: null
    };
  }

  componentDidMount() {
    getMeusDados().then(response => {
      getLotesSimples().then(responseLotes => {
        getDiretoriaregionalSimplissima().then(responseDREs => {
          this.setState({
            meusDados: response,
            lotes: formatarLotesParaVisao(responseLotes.results),
            lotesRaw: responseLotes.results,
            diretoriasRegionais: formatarLotesParaVisao(
              responseDREs.data.results
            )
          });
        });
      });
    });
  }

  render() {
    return <DashboardCODAE {...this.state} {...this.props} />;
  }
}

export default Container;
