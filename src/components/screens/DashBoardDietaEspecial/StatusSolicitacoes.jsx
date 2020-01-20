import React, { Component } from "react";
import { connect } from "react-redux";
import { formValueSelector, reduxForm } from "redux-form";
import { meusDados } from "../../../services/perfil.service";
import { getPaginacaoSolicitacoesDietaEspecial } from "../../../services/dashBoardDietaEspecial.service";
import { extrairStatusDaSolicitacaoURL } from "./helpers";
import {
  CODAE,
  TERCEIRIZADA,
  ESCOLA,
  DRE,
  SOLICITACOES_PENDENTES,
  SOLICITACOES_NEGADAS,
  SOLICITACOES_AUTORIZADAS,
  AUTORIZADOS_DIETA,
  PENDENTES_DIETA,
  NEGADOS_DIETA,
  DIETA_ESPECIAL_SOLICITACOES
} from "../../../configs/constants";
import {
  CARD_TYPE_ENUM,
  ICON_CARD_TYPE_ENUM
} from "../../Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import { ajustarFormatoLog } from "../helper";
import { InputSearchPendencias } from "../../Shareable/InputSearchPendencias";
import CardListarSolicitacoes from "../../Shareable/CardListarSolicitacoes";
import { Paginacao } from "../../Shareable/Paginacao";

export class StatusSolicitacoes extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      instituicao: null,
      count: 0,
      tipoSolicitacao: null,
      solicitacoes: null,
      tipoCard: null,
      icone: null,
      titulo: null,
      solicitacoesFiltrados: null,
      urlPaginacao: null,
      selecionarTodos: false
    };
    this.selecionarTodos = this.selecionarTodos.bind(this);
    this.onCheckClicked = this.onCheckClicked.bind(this);
    this.onPesquisarChanged = this.onPesquisarChanged.bind(this);
  }

  componentDidMount() {
    const url = window.location.href;
    let tipoSolicitacao = extrairStatusDaSolicitacaoURL(url);
    this.setState({ tipoSolicitacao });
    meusDados().then(response => {
      this.setState({
        instituicao: response.vinculo_atual.instituicao
      });
    });
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

  onPesquisarChanged(event) {
    let solicitacoesFiltrados = this.state.solicitacoes;
    solicitacoesFiltrados = this.filtrarNome(solicitacoesFiltrados, event);
    this.setState({ solicitacoesFiltrados });
  }

  filtrarNome(listaFiltro, event) {
    listaFiltro = listaFiltro.filter(function(item) {
      const wordToFilter = event.target.value.toLowerCase();
      return item.text.toLowerCase().search(wordToFilter) !== -1;
    });
    return listaFiltro;
  }

  retornaUrlPaginacao = (visao, statusDieta) => {
    switch (visao) {
      case ESCOLA:
        return `${DIETA_ESPECIAL_SOLICITACOES.ESCOLA}/${statusDieta}`;
      case TERCEIRIZADA:
        return `${DIETA_ESPECIAL_SOLICITACOES.TERCEIRIZADA}/${statusDieta}`;
      case CODAE:
        return `${DIETA_ESPECIAL_SOLICITACOES.CODAE}/${statusDieta}`;
      case DRE:
        return `${DIETA_ESPECIAL_SOLICITACOES.DRE}/${statusDieta}`;
      default:
        break;
    }
  };

  navegacaoPage = (multiploQuantidade, quantidadePorPagina) => {
    const { instituicao, urlPaginacao } = this.state;
    const offSet = quantidadePorPagina * (multiploQuantidade - 1);
    getPaginacaoSolicitacoesDietaEspecial(
      urlPaginacao,
      instituicao.uuid,
      offSet
    ).then(response => {
      this.setState({
        solicitacoesFiltrados: ajustarFormatoLog(response.results)
      });
    });
  };

  componentDidUpdate() {
    const visao = this.props.visao;
    const {
      solicitacoesFiltrados,
      tipoSolicitacao,
      instituicao,
      solicitacoes
    } = this.state;
    if (tipoSolicitacao && instituicao && !solicitacoes) {
      switch (tipoSolicitacao) {
        case SOLICITACOES_PENDENTES:
          this.props
            .getDietaEspecialPendenteAutorizacao(instituicao.uuid)
            .then(response => {
              this.setState({
                solicitacoes: ajustarFormatoLog(
                  response.results,
                  this.props.logPara
                ),
                count: response.count,
                tipoCard: CARD_TYPE_ENUM.PENDENTE,
                icone: ICON_CARD_TYPE_ENUM.PENDENTE,
                titulo: "Aguardando Autorização",
                urlPaginacao: this.retornaUrlPaginacao(visao, PENDENTES_DIETA)
              });
            });
          break;
        case SOLICITACOES_NEGADAS:
          this.props
            .getDietaEspecialNegadas(instituicao.uuid)
            .then(response => {
              this.setState({
                solicitacoes: ajustarFormatoLog(
                  response.results,
                  this.props.logPara
                ),
                count: response.count,
                tipoCard: CARD_TYPE_ENUM.NEGADO,
                icone: ICON_CARD_TYPE_ENUM.NEGADO,
                titulo: "Negadas",
                urlPaginacao: this.retornaUrlPaginacao(visao, NEGADOS_DIETA)
              });
            });
          break;
        case SOLICITACOES_AUTORIZADAS:
          this.props
            .getDietaEspecialAutorizadas(instituicao.uuid)
            .then(response => {
              this.setState({
                solicitacoes: ajustarFormatoLog(
                  response.results,
                  this.props.logPara
                ),
                count: response.count,
                tipoCard: CARD_TYPE_ENUM.AUTORIZADO,
                icone: ICON_CARD_TYPE_ENUM.AUTORIZADO,
                titulo: "Autorizadas",
                urlPaginacao: this.retornaUrlPaginacao(visao, AUTORIZADOS_DIETA)
              });
            });
          break;
        default:
          break;
      }
    }
    if (!solicitacoesFiltrados && solicitacoes) {
      this.setState({ solicitacoesFiltrados: solicitacoes });
    }
  }

  render() {
    const {
      solicitacoesFiltrados,
      titulo,
      tipoCard,
      icone,
      count
    } = this.state;
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
              solicitacoes={solicitacoesFiltrados ? solicitacoesFiltrados : []}
              tipo={tipoCard}
              icone={icone}
              selecionarTodos={this.selecionarTodos}
              onCheckClicked={this.onCheckClicked}
            />
            <Paginacao onChange={this.navegacaoPage} total={count} />
          </div>
        </div>
      </form>
    );
  }
}

const StatusSolicitacoesDietaEspecialForm = reduxForm({
  form: "statusSolicitacoesDietaEspecial",
  enableReinitialize: true
})(StatusSolicitacoes);

const selector = formValueSelector("statusSolicitacoesDietaEspecialForm");
const mapStateToProps = state => {
  return {
    selecionar_todos: selector(state, "selecionar_todos")
  };
};

export default connect(mapStateToProps)(StatusSolicitacoesDietaEspecialForm);
