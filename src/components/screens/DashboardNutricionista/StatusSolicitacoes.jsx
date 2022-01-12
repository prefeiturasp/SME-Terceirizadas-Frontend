import React, { Component } from "react";
import { connect } from "react-redux";
import { formValueSelector, reduxForm } from "redux-form";
import {
  getSolicitacoesAutorizadasNutrisupervisao,
  getSolicitacoesCanceladasNutrisupervisao,
  getSolicitacoesNegadasNutrisupervisao,
  getSolicitacoesPendentesAutorizacaoNutrisupervisao,
  getSolicitacoesComQuestionamentoNutrisupervisao
} from "../../../services/painelNutricionista.service";
import CardLegendas from "../../Shareable/CardLegendas";
import CardListarSolicitacoes from "../../Shareable/CardListarSolicitacoes";
import {
  CARD_TYPE_ENUM,
  ICON_CARD_TYPE_ENUM
} from "../../Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import { InputSearchPendencias } from "../../Shareable/InputSearchPendencias";
import { FILTRO, STATUS } from "../const";
import { ajustarFormatoLog, LOG_PARA } from "../helper";

export class StatusSolicitacoes extends Component {
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
      icone: "...",
      selecionarTodos: false
    };

    this.onPesquisarChanged = this.onPesquisarChanged.bind(this);
    this.selecionarTodos = this.selecionarTodos.bind(this);
    this.onCheckClicked = this.onCheckClicked.bind(this);
  }

  selecionarTodos(solicitacoes) {
    const selecionarTodos = !this.state.selecionarTodos;
    solicitacoes.forEach((_, key) => {
      this.props.change(`check_${key}`, selecionarTodos);
    });
    this.props.change("selecionar_todos", selecionarTodos);
    this.setState({ selecionarTodos });
  }

  onCheckClicked(solicitacoes, key) {
    solicitacoes[key].checked = !solicitacoes[key].checked;
    this.props.change(`check_${key}`, solicitacoes[key].checked);
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
    //TODO aguardando definicao de perfil

    switch (this.props.tipoStatus) {
      case STATUS.AUTORIZADAS:
        tipoCard = CARD_TYPE_ENUM.AUTORIZADO;
        icone = ICON_CARD_TYPE_ENUM.AUTORIZADO;
        titulo = "Autorizadas";
        solicitacoes = await getSolicitacoesAutorizadasNutrisupervisao();
        break;

      case STATUS.PENDENTES:
        tipoCard = CARD_TYPE_ENUM.PENDENTE;
        icone = ICON_CARD_TYPE_ENUM.PENDENTE;
        titulo = "Aguardando Autorização";
        solicitacoes = await getSolicitacoesPendentesAutorizacaoNutrisupervisao(
          FILTRO.SEM_FILTRO
        );
        break;

      case STATUS.QUESTIONADAS:
        tipoCard = CARD_TYPE_ENUM.PENDENTE;
        icone = ICON_CARD_TYPE_ENUM.PENDENTE;
        titulo = "Aguardando Resposta da Empresa";
        solicitacoes = await getSolicitacoesComQuestionamentoNutrisupervisao();
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
              selecionarTodos={this.selecionarTodos}
              onCheckClicked={this.onCheckClicked}
            />
            <CardLegendas />
          </div>
        </div>
      </form>
    );
  }
}

const StatusSolicitacoesForm = reduxForm({
  form: "statusSolicitacoes",
  enableReinitialize: true
})(StatusSolicitacoes);

const selector = formValueSelector("statusSolicitacoesForm");
const mapStateToProps = state => {
  return {
    selecionar_todos: selector(state, "selecionar_todos")
  };
};

export default connect(mapStateToProps)(StatusSolicitacoesForm);
