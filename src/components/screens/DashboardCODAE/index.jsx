import React, { Component } from "react";
import { Collapse } from "react-collapse";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import {
  CODAE,
  SOLICITACOES_AUTORIZADAS,
  SOLICITACOES_PENDENTES,
  SOLICITACOES_NEGADAS,
  SOLICITACOES_CANCELADAS
} from "../../../configs/constants";
import { FILTRO_VISAO } from "../../../constants/shared";
import { dataAtual } from "../../../helpers/utilities";
import CardBody from "../../Shareable/CardBody";
import CardMatriculados from "../../Shareable/CardMatriculados";
import CardPendencia from "../../Shareable/CardPendencia/CardPendencia";
import CardStatusDeSolicitacao, {
  ICON_CARD_TYPE_ENUM,
  CARD_TYPE_ENUM
} from "../../Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import TabelaHistoricoLotesDREs from "../../Shareable/TabelaHistoricoLotesDREs";
import { ajustarFormatoLog, slugify } from "../helper";
import Select from "../../Shareable/Select";
import { FILTRO } from "../const";
import "./style.scss";
import {
  getSolicitacoesPendentesAutorizacaoCodae,
  getSolicitacoesCanceladasCodae,
  getSolicitacoesNegadasCodae,
  getSolicitacoesAutorizadasCodae,
  getSolicitacoesPendentesAutorizacaoCODAESecaoPendencias
} from "../../../services/painelCODAE.service";
import { toastError } from "../../Shareable/Toast/dialogs";
import corrigeResumo from "../../../helpers/corrigeDadosDoDashboard";

class DashboardCODAE extends Component {
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

      visao: FILTRO_VISAO.POR_TIPO_SOLICITACAO,
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
      const wordToFilter = slugify(event.target.value.toLowerCase());
      return slugify(item.text.toLowerCase()).search(wordToFilter) !== -1;
    });
    return listaFiltro;
  }

  setfiltroPorVencimento(filtroPorVencimento) {
    this.setState({ filtroPorVencimento }, () => {
      this.carregaResumoPendencias();
    });
  }

  setVisao(visao) {
    const { tiposSolicitacao, lotes, diretoriasRegionais } = this.props;
    this.setState(
      {
        visao,
        cards:
          visao === FILTRO_VISAO.POR_TIPO_SOLICITACAO
            ? tiposSolicitacao
            : visao === FILTRO_VISAO.DRE
            ? diretoriasRegionais
            : lotes
      },
      () => {
        this.carregaResumoPendencias();
      }
    );
  }

  async carregaResumoPendencias() {
    const { visao, filtroPorVencimento } = this.state;
    this.setState({ loadingPainelSolicitacoes: true });
    const resumo = await getSolicitacoesPendentesAutorizacaoCODAESecaoPendencias(
      filtroPorVencimento,
      visao
    );
    const correcaoOk = corrigeResumo(resumo);
    if (!correcaoOk) toastError("Erro na inclusão de dados da CEI");
    this.setState({
      resumo,
      loadingPainelSolicitacoes: false
    });
  }

  async componentDidMount() {
    this.carregaResumoPendencias();

    getSolicitacoesPendentesAutorizacaoCodae("sem_filtro").then(response => {
      let questionamentosListSolicitacao = ajustarFormatoLog(response);
      this.setState({
        questionamentosListSolicitacao,
        questionamentosListFiltered: questionamentosListSolicitacao
      });
    });

    getSolicitacoesCanceladasCodae().then(response => {
      let canceladasListSolicitacao = ajustarFormatoLog(response);
      this.setState({
        canceladasListSolicitacao,
        canceladasListFiltered: canceladasListSolicitacao
      });
    });

    getSolicitacoesNegadasCodae().then(response => {
      let negadasListSolicitacao = ajustarFormatoLog(response);
      this.setState({
        negadasListSolicitacao,
        negadasListFiltered: negadasListSolicitacao
      });
    });

    getSolicitacoesAutorizadasCodae().then(response => {
      let autorizadasListSolicitacao = ajustarFormatoLog(response);
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
    const {
      handleSubmit,
      vision_by,
      filtro_por,
      meusDados,
      lotesRaw
    } = this.props;
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
                <TabelaHistoricoLotesDREs lotes={lotesRaw} />
              </Collapse>
            )}
          </CardMatriculados>
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
                          visao === FILTRO_VISAO.POR_TIPO_SOLICITACAO
                            ? `/${CODAE}/${card.link}`
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
                          visao === FILTRO_VISAO.POR_TIPO_SOLICITACAO
                            ? `/${CODAE}/${card.link}`
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
                  href={`/${CODAE}/${SOLICITACOES_PENDENTES}`}
                />
              </div>
              <div className="col-6">
                <CardStatusDeSolicitacao
                  cardTitle={"Autorizadas"}
                  cardType={CARD_TYPE_ENUM.AUTORIZADO}
                  solicitations={autorizadasListFiltered}
                  icon={ICON_CARD_TYPE_ENUM.AUTORIZADO}
                  href={`/${CODAE}/${SOLICITACOES_AUTORIZADAS}`}
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
                  href={`/${CODAE}/${SOLICITACOES_NEGADAS}`}
                />
              </div>
              <div className="col-6">
                <CardStatusDeSolicitacao
                  cardTitle={"Canceladas"}
                  cardType={CARD_TYPE_ENUM.CANCELADO}
                  solicitations={canceladasListFiltered}
                  icon={ICON_CARD_TYPE_ENUM.CANCELADO}
                  href={`/${CODAE}/${SOLICITACOES_CANCELADAS}`}
                />
              </div>
            </div>
          </CardBody>
        </form>
      </div>
    );
  }
}

const DashboardCODAEForm = reduxForm({
  form: "DashboardCODAE",
  enableReinitialize: true
})(DashboardCODAE);

export default DashboardCODAEForm;
