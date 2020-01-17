import React, { Component } from "react";
import { connect } from "react-redux";
import { formValueSelector, reduxForm } from "redux-form";
import { meusDados } from "../../../services/perfil.service";
import { extrairStatusDaSolicitacaoURL } from "./helpers";
import {
  SOLICITACOES_PENDENTES,
  SOLICITACOES_NEGADAS,
  SOLICITACOES_AUTORIZADAS
} from "../../../configs/constants";
import {
  CARD_TYPE_ENUM,
  ICON_CARD_TYPE_ENUM
} from "../../Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import { ajustarFormatoLog } from "../helper";
import { InputSearchPendencias } from "../../Shareable/InputSearchPendencias";
import CardListarSolicitacoes from "../../Shareable/CardListarSolicitacoes";
import CardLegendas from "../../Shareable/CardLegendas";

export class StatusSolicitacoes extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      instituicao: null,
      tipoSolicitacao: null,
      solicitacoes: null,
      tipoCard: null,
      icone: null,
      titulo: null,
      solicitacoesFiltrados: null
    };
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

  componentDidUpdate() {
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
                tipoCard: CARD_TYPE_ENUM.PENDENTE,
                icone: ICON_CARD_TYPE_ENUM.PENDENTE,
                titulo: "Aguardando Autorização"
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
                tipoCard: CARD_TYPE_ENUM.NEGADO,
                icone: ICON_CARD_TYPE_ENUM.NEGADO,
                titulo: "Negadas"
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
                tipoCard: CARD_TYPE_ENUM.AUTORIZADO,
                icone: ICON_CARD_TYPE_ENUM.AUTORIZADO,
                titulo: "Autorizadas"
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
              solicitacoes={solicitacoesFiltrados ? solicitacoesFiltrados : []}
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
