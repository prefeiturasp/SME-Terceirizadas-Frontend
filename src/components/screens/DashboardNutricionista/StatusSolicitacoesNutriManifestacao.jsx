import React, { Component } from "react";
import { connect } from "react-redux";
import { formValueSelector, reduxForm } from "redux-form";
import {
  getSolicitacoesAutorizadasNutrimanifestacao,
  getSolicitacoesCanceladasNutrisupervisao,
  getSolicitacoesNegadasNutrisupervisao
} from "../../../services/painelNutricionista.service";
import CardListarSolicitacoes from "../../Shareable/CardListarSolicitacoes";
import {
  CARD_TYPE_ENUM,
  ICON_CARD_TYPE_ENUM
} from "../../Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import { InputSearchPendencias } from "../../Shareable/InputSearchPendencias";
import { STATUS } from "../const";
import { ajustarFormatoLog, LOG_PARA } from "../helper";

export class StatusSolicitacoesNutriManifestacao extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      solicitacoes: [
        {
          text: "...",
          date: "...",
          link: "..."
        }
      ],
      solicitacoesFiltrados: [
        {
          text: "...",
          date: "...",
          link: "..."
        }
      ],
      titulo: "...",
      tipoCard: "...",
      icone: "..."
    };

    this.onPesquisarChanged = this.onPesquisarChanged.bind(this);
  }

  onPesquisarChanged(values) {
    const solicitacoesFiltrados = this.filtrarNome(values);
    this.setState({ solicitacoesFiltrados });
  }

  filtrarNome(values) {
    if (values["titulo"]) {
      const listaFiltro = this.state.solicitacoes.filter(function(item) {
        const wordToFilter = values["titulo"].toLowerCase();
        return item.text.toLowerCase().search(wordToFilter) !== -1;
      });
      return listaFiltro;
    }
    return this.state.solicitacoes;
  }

  async componentDidMount() {
    let solicitacoes = "";
    let tipoCard = "";
    let icone = "";
    let titulo = "";

    switch (this.props.tipoStatus) {
      case STATUS.AUTORIZADAS:
        tipoCard = CARD_TYPE_ENUM.AUTORIZADO;
        icone = ICON_CARD_TYPE_ENUM.AUTORIZADO;
        titulo = "Autorizadas";
        solicitacoes = await getSolicitacoesAutorizadasNutrimanifestacao();
        break;

      case STATUS.CANCELADAS:
        tipoCard = CARD_TYPE_ENUM.CANCELADO;
        icone = ICON_CARD_TYPE_ENUM.CANCELADO;
        titulo = "Canceladas";
        solicitacoes = await getSolicitacoesCanceladasNutrisupervisao();
        break;

      case STATUS.RECUSADAS:
        tipoCard = CARD_TYPE_ENUM.NEGADO;
        icone = ICON_CARD_TYPE_ENUM.NEGADO;
        titulo = "Negadas";
        solicitacoes = await getSolicitacoesNegadasNutrisupervisao();
        break;
      default:
        break;
    }

    solicitacoes = ajustarFormatoLog(solicitacoes, LOG_PARA.CODAE);
    this.setState({
      solicitacoes,
      tipoCard,
      icone,
      titulo,
      solicitacoesFiltrados: solicitacoes
    });
  }

  render() {
    const { solicitacoesFiltrados, titulo, tipoCard, icone } = this.state;
    return (
      <form onSubmit={this.props.handleSubmit}>
        <div className="card mt-3">
          <div className="card-body">
            <div className="pr-3">
              <InputSearchPendencias
                voltarLink={`/`}
                filterList={this.onPesquisarChanged}
              />
            </div>
            <div className="pb-3" />
            <CardListarSolicitacoes
              titulo={titulo}
              solicitacoes={solicitacoesFiltrados}
              tipo={tipoCard}
              icone={icone}
            />
          </div>
        </div>
      </form>
    );
  }
}

const StatusSolicitacoesNutriManifestacaoForm = reduxForm({
  form: "statusSolicitacoesNutriManifestacao",
  enableReinitialize: true
})(StatusSolicitacoesNutriManifestacao);

const selector = formValueSelector("statusSolicitacoesNutriManifestacaoForm");
const mapStateToProps = state => {
  return {
    selecionar_todos: selector(state, "selecionar_todos")
  };
};

export default connect(mapStateToProps)(
  StatusSolicitacoesNutriManifestacaoForm
);
