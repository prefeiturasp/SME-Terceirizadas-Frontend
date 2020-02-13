import React, { Component } from "react";
import { Collapse } from "react-collapse";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import {
  DRE,
  SOLICITACOES_AUTORIZADAS,
  SOLICITACOES_PENDENTES,
  SOLICITACOES_NEGADAS,
  SOLICITACOES_CANCELADAS
} from "../../../configs/constants";
import { FILTRO_VISAO } from "../../../constants";
import { dataAtual } from "../../../helpers/utilities";
import CardBody from "../../Shareable/CardBody";
import CardMatriculados from "../../Shareable/CardMatriculados";
import CardPendencia from "../../Shareable/CardPendencia/CardPendencia";
import CardStatusDeSolicitacao, {
  ICON_CARD_TYPE_ENUM,
  CARD_TYPE_ENUM
} from "../../Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import TabelaHistoricoLotes from "../../Shareable/TabelaHistoricoLotes";
import { ajustarFormatoLog } from "../helper";
import Select from "../../Shareable/Select";
import { FILTRO } from "../const";
import {
  getSolicitacoesPendentesValidacaoDRE,
  getSolicitacoesNegadasDRE,
  getSolicitacoesPendentesDRE,
  getSolicitacoesCanceladasDRE,
  getSolicitacoesAutorizadasDRE
} from "../../../services/painelDRE.service";
import Botao from "../../Shareable/Botao";
import { BUTTON_TYPE, BUTTON_STYLE } from "../../Shareable/Botao/constants";
import "./style.scss";

class DashboardDRE extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: this.props.cards,
      questionamentosListFiltered: [],
      canceladasListFiltered: [],
      negadasListFiltered: [],
      autorizadasListFiltered: [],

      lotes: [],
      resumo: [],

      collapsed: true,
      questionamentosListSolicitacao: [],
      canceladasListSolicitacao: [],
      loadingPainelSolicitacoes: true,

      visao: FILTRO_VISAO.TIPO_SOLICITACAO,
      filtroPorVencimento: FILTRO.SEM_FILTRO
    };
    this.alterarCollapse = this.alterarCollapse.bind(this);
    this.onPesquisaChanged = this.onPesquisaChanged.bind(this);
  }

  alterarCollapse() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  filtrarNome(listaFiltro, event) {
    listaFiltro = listaFiltro.filter(function(item) {
      const wordToFilter = event.target.value.toLowerCase();
      return item.text.toLowerCase().search(wordToFilter) !== -1;
    });
    return listaFiltro;
  }

  setfiltroPorVencimento(filtroPorVencimento) {
    this.setState({ filtroPorVencimento }, () => {
      this.carregaResumoPendencias();
    });
  }

  setVisao(visao) {
    const { tiposSolicitacao, lotes } = this.props;
    this.setState(
      {
        visao,
        cards:
          visao === FILTRO_VISAO.TIPO_SOLICITACAO ? tiposSolicitacao : lotes
      },
      () => {
        this.carregaResumoPendencias();
      }
    );
  }

  async carregaResumoPendencias() {
    const { visao, filtroPorVencimento } = this.state;
    this.setState({ loadingPainelSolicitacoes: true });
    const resumo = await getSolicitacoesPendentesValidacaoDRE(
      filtroPorVencimento,
      visao
    );
    this.setState({
      resumo: resumo.results,
      loadingPainelSolicitacoes: false
    });
  }

  async componentDidMount() {
    this.carregaResumoPendencias();

    getSolicitacoesPendentesDRE().then(request => {
      let questionamentosListSolicitacao = ajustarFormatoLog(request.results);
      this.setState({
        questionamentosListSolicitacao,
        questionamentosListFiltered: questionamentosListSolicitacao
      });
    });

    getSolicitacoesCanceladasDRE().then(request => {
      let canceladasListSolicitacao = ajustarFormatoLog(request.results);
      this.setState({
        canceladasListSolicitacao,
        canceladasListFiltered: canceladasListSolicitacao
      });
    });

    getSolicitacoesNegadasDRE().then(request => {
      let negadasListSolicitacao = ajustarFormatoLog(request.results);
      this.setState({
        negadasListSolicitacao,
        negadasListFiltered: negadasListSolicitacao
      });
    });

    getSolicitacoesAutorizadasDRE().then(request => {
      let autorizadasListSolicitacao = ajustarFormatoLog(request.results);
      this.setState({
        autorizadasListSolicitacao: autorizadasListSolicitacao,
        autorizadasListFiltered: autorizadasListSolicitacao
      });
    });
  }

  onPesquisaChanged(event) {
    if (event === undefined) event = { target: { value: "" } };
    const {
      questionamentosListSolicitacao,
      canceladasListSolicitacao,
      autorizadasListSolicitacao,
      negadasListSolicitacao
    } = this.state;

    this.setState({
      questionamentosListFiltered: this.filtrarNome(
        questionamentosListSolicitacao,
        event
      ),
      autorizadasListFiltered: this.filtrarNome(
        autorizadasListSolicitacao,
        event
      ),
      negadasListFiltered: this.filtrarNome(negadasListSolicitacao, event),
      canceladasListFiltered: this.filtrarNome(canceladasListSolicitacao, event)
    });
  }

  render() {
    const { handleSubmit, vision_by, filtro_por, meusDados } = this.props;

    const {
      cards,
      collapsed,
      visao,
      questionamentosListFiltered,
      canceladasListFiltered,
      negadasListFiltered,
      autorizadasListFiltered,
      resumo,
      loadingPainelSolicitacoes
    } = this.state;

    return (
      <div>
        <form onSubmit={handleSubmit(this.props.handleSubmit)}>
          <Field component={"input"} type="hidden" name="uuid" />
          <CardMatriculados
            collapsed={collapsed}
            alterarCollapse={this.alterarCollapse}
            numeroAlunos={
              (meusDados &&
                meusDados.vinculo_atual.instituicao.quantidade_alunos) ||
              0
            }
          >
            {meusDados && (
              <Collapse isOpened={!collapsed}>
                <TabelaHistoricoLotes
                  lotes={meusDados.vinculo_atual.instituicao.lotes}
                  tipoPerfil={"Terceirizada"}
                />
              </Collapse>
            )}
          </CardMatriculados>
          <CardBody
            titulo={"Acompanhamento solicitações"}
            dataAtual={dataAtual()}
            onChange={this.onPesquisaChanged}
          >
            <div className="row pb-3">
              <div className="col-6">
                <CardStatusDeSolicitacao
                  cardTitle={"Pendentes Autorização"}
                  cardType={CARD_TYPE_ENUM.PENDENTE}
                  solicitations={questionamentosListFiltered}
                  icon={"fa-exclamation-triangle"}
                  href={`/${DRE}/${SOLICITACOES_PENDENTES}`}
                />
              </div>
              <div className="col-6">
                <CardStatusDeSolicitacao
                  cardTitle={"Autorizadas"}
                  cardType={CARD_TYPE_ENUM.AUTORIZADO}
                  solicitations={autorizadasListFiltered}
                  icon={ICON_CARD_TYPE_ENUM.AUTORIZADO}
                  href={`/${DRE}/${SOLICITACOES_AUTORIZADAS}`}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <CardStatusDeSolicitacao
                  cardTitle={"Negadas"}
                  cardType={CARD_TYPE_ENUM.NEGADO}
                  solicitations={negadasListFiltered}
                  icon={ICON_CARD_TYPE_ENUM.NEGADO}
                  href={`/${DRE}/${SOLICITACOES_NEGADAS}`}
                />
              </div>
              <div className="col-6">
                <CardStatusDeSolicitacao
                  cardTitle={"Canceladas"}
                  cardType={CARD_TYPE_ENUM.CANCELADO}
                  solicitations={canceladasListFiltered}
                  icon={ICON_CARD_TYPE_ENUM.CANCELADO}
                  href={`/${DRE}/${SOLICITACOES_CANCELADAS}`}
                />
              </div>
            </div>
          </CardBody>
          <div className="card mt-3">
            <div className="card-body">
              <div className="card-title font-weight-bold dashboard-card-title">
                <div className="row">
                  <div className="col-3 mt-3 color-black">Pendências</div>
                  <div className="offset-3 col-3 text-right my-auto">
                    <Select
                      naoDesabilitarPrimeiraOpcao
                      onChange={event =>
                        this.setfiltroPorVencimento(event.target.value)
                      }
                      placeholder={"Filtro por"}
                      options={filtro_por}
                    />
                  </div>
                  <div className="col-3 text-right my-auto">
                    <Select
                      naoDesabilitarPrimeiraOpcao
                      disabled={resumo.length === 0}
                      onChange={event => this.setVisao(event.target.value)}
                      placeholder={"Visão por"}
                      options={vision_by}
                    />
                  </div>
                </div>
              </div>
              <div className="pt-3" />
              <div className="row pt-3">
                {cards.map((card, key) => {
                  return resumo[card.titulo] ? (
                    <div key={key} className="col-6 pb-3">
                      <Link
                        to={
                          visao === FILTRO_VISAO.TIPO_SOLICITACAO
                            ? `/${DRE}/${card.link}`
                            : "/"
                        }
                      >
                        <CardPendencia
                          cardTitle={card.titulo}
                          totalOfOrders={resumo[card.titulo]["TOTAL"] || 0}
                          priorityOrders={
                            resumo[card.titulo]["PRIORITARIO"] || 0
                          }
                          onLimitOrders={resumo[card.titulo]["LIMITE"] || 0}
                          regularOrders={resumo[card.titulo]["REGULAR"] || 0}
                          loading={loadingPainelSolicitacoes}
                        />
                      </Link>
                    </div>
                  ) : (
                    <div key={key} className="col-6 pb-3">
                      <Link
                        to={
                          visao === FILTRO_VISAO.TIPO_SOLICITACAO
                            ? `/${DRE}/${card.link}`
                            : "/"
                        }
                      >
                        <CardPendencia
                          cardTitle={card.titulo}
                          totalOfOrders={0}
                          priorityOrders={0}
                          onLimitOrders={0}
                          regularOrders={0}
                          loading={loadingPainelSolicitacoes}
                        />
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="card card-shortcut-to-form mt-3">
            <div className="card-body">
              <div className="card-title font-weight-bold">
                Faça uma Solicitação Unificada
              </div>
              <p>Acesse o formulário para fazer uma Solicitação Unificada</p>
              <Link to="/dre/solicitacao-unificada">
                <Botao
                  texto="Solicitação Unificada"
                  type={BUTTON_TYPE.BUTTON}
                  style={BUTTON_STYLE.BLUE_OUTLINE}
                />
              </Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const DashboardDREForm = reduxForm({
  form: "DashboardDRE",
  enableReinitialize: true
})(DashboardDRE);

export default DashboardDREForm;
