import React, { Component } from "react";
import { Collapse } from "react-collapse";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import {
  TERCEIRIZADA,
  SOLICITACOES_AUTORIZADAS,
  SOLICITACOES_PENDENTES,
  SOLICITACOES_NEGADAS,
  SOLICITACOES_CANCELADAS
} from "../../../configs/constants";
import { FILTRO_VISAO } from "../../../constants/filtroVisao";
import { dataAtual } from "../../../helpers/utilities";
import {
  getSolicitacoesCanceladasTerceirizada,
  getSolicitacoesNegadasTerceirizada,
  getSolicitacoesPendentesTerceirizada,
  getSolicitacoesAutorizadasTerceirizada,
  getSolicitacoesPendenteCienciaTerceirizada
} from "../../../services/painelTerceirizada.service";
import { meusDados as getMeusDados } from "../../../services/perfil.service";
import CardBody from "../../Shareable/CardBody";
import CardLegendas from "../../Shareable/CardLegendas";
import CardMatriculados from "../../Shareable/CardMatriculados";
import CardPendencia from "../../Shareable/CardPendencia/CardPendencia";
import CardStatusDeSolicitacao, {
  ICON_CARD_TYPE_ENUM,
  CARD_TYPE_ENUM
} from "../../Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import TabelaHistoricoLotes from "../../Shareable/TabelaHistoricoLotes";
import { ajustarFormatoLog, LOG_PARA } from "../helper";
import Select from "../../Shareable/Select";
import { MenuIcones } from "./components/MenuIcones";
import { MENU_DASHBOARD_TERCEIRIZADAS } from "./constants";
import { FILTRO } from "../const";

class DashboardTerceirizada extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secao: null,
      cards: this.props.cards,
      pendentesListFiltered: [],
      canceladasListFiltered: [],
      negadasListFiltered: [],
      autorizadasListFiltered: [],

      lotes: [],
      resumo: [],

      collapsed: true,
      pendentesListSolicitacao: [],
      canceladasListSolicitacao: [],
      loadingPainelSolicitacoes: true,

      visao: FILTRO_VISAO.TIPO_SOLICITACAO,
      filtroPorVencimento: FILTRO.SEM_FILTRO,

      minhaTerceirizada: null
    };
    this.alterarCollapse = this.alterarCollapse.bind(this);
    this.onPesquisaChanged = this.onPesquisaChanged.bind(this);
    this.renderSecao = this.renderSecao.bind(this);
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

  renderSecao(secao) {
    this.setState({ secao });
  }

  setfiltroPorVencimento(filtroPorVencimento) {
    this.setState({ filtroPorVencimento }, () => {
      this.carregaResumosPendencias();
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
        this.carregaResumosPendencias();
      }
    );
  }

  async carregaResumosPendencias() {
    const { minhaTerceirizada, visao, filtroPorVencimento } = this.state;
    this.setState({ loadingPainelSolicitacoes: true });
    const resumo = await getSolicitacoesPendenteCienciaTerceirizada(
      minhaTerceirizada,
      filtroPorVencimento,
      visao
    );
    this.setState({
      resumo: resumo.results,
      loadingPainelSolicitacoes: false
    });
  }

  async componentDidMount() {
    let minhaTerceirizada = null;
    getMeusDados().then(response => {
      minhaTerceirizada = response.vinculo_atual.instituicao.uuid;
      this.setState({ minhaTerceirizada });

      this.carregaResumosPendencias();

      getSolicitacoesPendentesTerceirizada(minhaTerceirizada).then(request => {
        let pendentesListSolicitacao = ajustarFormatoLog(
          request.results,
          LOG_PARA.TERCEIRIZADA
        );
        this.setState({
          pendentesListSolicitacao,
          pendentesListFiltered: pendentesListSolicitacao
        });
      });

      getSolicitacoesCanceladasTerceirizada(minhaTerceirizada).then(request => {
        let canceladasListSolicitacao = ajustarFormatoLog(
          request.results,
          LOG_PARA.TERCEIRIZADA
        );
        this.setState({
          canceladasListSolicitacao,
          canceladasListFiltered: canceladasListSolicitacao
        });
      });

      getSolicitacoesNegadasTerceirizada(minhaTerceirizada).then(request => {
        let negadasListSolicitacao = ajustarFormatoLog(
          request.results,
          LOG_PARA.TERCEIRIZADA
        );
        this.setState({
          negadasListSolicitacao,
          negadasListFiltered: negadasListSolicitacao
        });
      });

      getSolicitacoesAutorizadasTerceirizada(minhaTerceirizada).then(
        request => {
          let autorizadasListSolicitacao = ajustarFormatoLog(
            request.results,
            LOG_PARA.TERCEIRIZADA
          );
          this.setState({
            autorizadasListSolicitacao: autorizadasListSolicitacao,
            autorizadasListFiltered: autorizadasListSolicitacao
          });
        }
      );
    });
  }

  onPesquisaChanged(event) {
    if (event === undefined) event = { target: { value: "" } };
    const {
      pendentesListSolicitacao,
      canceladasListSolicitacao,
      autorizadasListSolicitacao,
      negadasListSolicitacao
    } = this.state;

    this.setState({
      pendentesListFiltered: this.filtrarNome(pendentesListSolicitacao, event),
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
      secao,
      visao,
      pendentesListFiltered,
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
                  lotes={meusDados.vinculo_atual.lotes}
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
                  cardTitle={"Aguardando Autorização"}
                  cardType={CARD_TYPE_ENUM.PENDENTE}
                  solicitations={pendentesListFiltered}
                  icon={"fa-exclamation-triangle"}
                  href={`/${TERCEIRIZADA}/${SOLICITACOES_PENDENTES}`}
                />
              </div>
              <div className="col-6">
                <CardStatusDeSolicitacao
                  cardTitle={"Autorizadas"}
                  cardType={CARD_TYPE_ENUM.AUTORIZADO}
                  solicitations={autorizadasListFiltered}
                  icon={ICON_CARD_TYPE_ENUM.AUTORIZADO}
                  href={`/${TERCEIRIZADA}/${SOLICITACOES_AUTORIZADAS}`}
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
                  href={`/${TERCEIRIZADA}/${SOLICITACOES_NEGADAS}`}
                />
              </div>
              <div className="col-6">
                <CardStatusDeSolicitacao
                  cardTitle={"Canceladas"}
                  cardType={CARD_TYPE_ENUM.CANCELADO}
                  solicitations={canceladasListFiltered}
                  icon={ICON_CARD_TYPE_ENUM.CANCELADO}
                  href={`/${TERCEIRIZADA}/${SOLICITACOES_CANCELADAS}`}
                />
              </div>
            </div>
            <CardLegendas />
          </CardBody>
          <div className="card mt-3" />
          {!secao && <MenuIcones renderSecao={this.renderSecao} />}
          {secao === MENU_DASHBOARD_TERCEIRIZADAS.GESTAO_DE_ALIMENTACAO && (
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
                              ? `/${TERCEIRIZADA}/${card.link}`
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
                              ? `/${TERCEIRIZADA}/${card.link}`
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
          )}
        </form>
      </div>
    );
  }
}

const DashboardTerceirizadaForm = reduxForm({
  form: "dashboardTerceirizada",
  enableReinitialize: true
})(DashboardTerceirizada);

export default DashboardTerceirizadaForm;
