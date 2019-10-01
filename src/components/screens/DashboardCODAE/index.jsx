import React, { Component } from "react";
import { Collapse } from "react-collapse";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { dataAtual } from "../../../helpers/utilities";
import CardMatriculados from "../../Shareable/CardMatriculados";
import {
  CardStatusDeSolicitacao,
  CARD_TYPE_ENUM
} from "../../Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import "../../Shareable/style.scss";
import TabelaHistoricoLotesDREs from "../../Shareable/TabelaHistoricoLotesDREs";
import {
  ALTERACAO_CARDAPIO,
  CODAE,
  INCLUSAO_ALIMENTACAO,
  INVERSAO_CARDAPIO,
  SOLICITACOES,
  SOLICITACAO_KIT_LANCHE,
  SOLICITACAO_KIT_LANCHE_UNIFICADA,
  SUSPENSAO_ALIMENTACAO
} from "../../../configs/constants";
import Select from "../../Shareable/Select";
import { FILTRO } from "../const";
import {
  getResumoPendenciasAlteracaoCardapio,
  getResumoPendenciasInclusaoAlimentacao,
  getResumoPendenciasInversoesCardapio,
  getResumoPendenciasKitLancheAvulso,
  getResumoPendenciasKitLancheUnificado,
  getResumoPendenciasSuspensaoCardapio,
  getResumoPendenciasCODAEporDRE,
  getResumoPendenciasCODAEporLote
} from "../../../services/painelCODAE.service.js";
import CardPendencia from "../../Shareable/CardPendencia/CardPendencia";
import { FILTRO_VISAO } from "../../../constants/filtroVisao";

class DashboardCODAE extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resumoPendenciasInversoesCardapio: {
        total: 0,
        limite: 0,
        prioritario: 0,
        regular: 0
      },
      resumoPendenciasInclusaoAlimentacao: {
        total: 0,
        limite: 0,
        prioritario: 0,
        regular: 0
      },
      resumoPendenciasKitLancheAvulsa: {
        total: 0,
        limite: 0,
        prioritario: 0,
        regular: 0
      },
      resumoPendenciasKitLancheUnificado: {
        total: 0,
        limite: 0,
        prioritario: 0,
        regular: 0
      },
      resumoPendenciasAlteracaoCardapio: {
        total: 0,
        limite: 0,
        prioritario: 0,
        regular: 0
      },
      resumoSuspensoesCardapio: {
        total: 0,
        informados: 0,
        ciencia: 0
      },
      collapsed: true,
      dre: false,
      filtro: FILTRO.SEM_FILTRO,
      visao: FILTRO_VISAO.TIPO_SOLICITACAO,

      solicitacoesAprovadasFiltradas: [],
      solicitacoesPendentesAprovacaoFiltradas: [],
      solicitacoesCanceladasFiltradas: [],
      solicitacoesRevisaoFiltradas: [],

      loadingPainelSolicitacoes: true,

      resumoPorDRE: [],
      resumoPorLote: []
    };
    this.alterarCollapse = this.alterarCollapse.bind(this);
    this.changeVisao = this.changeVisao.bind(this);
  }

  componentDidMount() {
    this.carregaResumosPendencias(FILTRO.SEM_FILTRO);
  }

  async carregaResumosPendencias(filtro) {
    this.setState({
      loadingPainelSolicitacoes: true
    });
    const resumoPendenciasInversoesCardapio = await getResumoPendenciasInversoesCardapio(
      filtro
    );
    const resumoPendenciasInclusaoAlimentacao = await getResumoPendenciasInclusaoAlimentacao(
      filtro
    );
    const resumoPendenciasKitLancheAvulsa = await getResumoPendenciasKitLancheAvulso(
      filtro
    );
    const resumoPendenciasKitLancheUnificado = await getResumoPendenciasKitLancheUnificado(
      filtro
    );
    const resumoPendenciasAlteracaoCardapio = await getResumoPendenciasAlteracaoCardapio(
      filtro
    );
    const resumoSuspensoesCardapio = await getResumoPendenciasSuspensaoCardapio(
      filtro
    );
    this.setState({
      resumoPendenciasInversoesCardapio,
      resumoPendenciasInclusaoAlimentacao,
      resumoPendenciasKitLancheAvulsa,
      resumoPendenciasKitLancheUnificado,
      resumoPendenciasAlteracaoCardapio,
      resumoSuspensoesCardapio
    });
    const resumoPorDRE = await getResumoPendenciasCODAEporDRE(filtro);
    const resumoPorLote = await getResumoPendenciasCODAEporLote(filtro);
    this.setState({
      resumoPorDRE,
      resumoPorLote,
      filtro,
      loadingPainelSolicitacoes: false
    });
  }

  onVencimentoPara(filtro) {
    this.setState({ filtro });
    this.carregaResumosPendencias(filtro);
  }

  changeVisao(visao) {
    this.setState({ visao });
  }

  alterarCollapse() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    const {
      totalAlunos,
      handleSubmit,
      solicitacoesAprovadas,
      solicitacoesPendentesAprovacao,
      solicitacoesCanceladas,
      vencimentoPara,
      diretoriasRegionais,
      lotes,
      visaoPor,
      quantidade_suspensoes
    } = this.props;
    const {
      collapsed,
      loadingPainelSolicitacoes,
      resumoPendenciasInclusaoAlimentacao,
      resumoPendenciasAlteracaoCardapio,
      resumoPendenciasKitLancheAvulsa,
      resumoPendenciasInversoesCardapio,
      resumoPendenciasKitLancheUnificado,
      resumoPorDRE,
      resumoPorLote
    } = this.state;
    return (
      <div>
        <form onSubmit={handleSubmit(this.props.handleSubmit)}>
          <Field component={"input"} type="hidden" name="uuid" />
          <CardMatriculados
            collapsed={collapsed}
            alterarCollapse={this.alterarCollapse}
            numeroAlunos={totalAlunos}
          >
            <Collapse isOpened={!collapsed}>
              <TabelaHistoricoLotesDREs lotes={lotes} />
            </Collapse>
          </CardMatriculados>
          <div className="card mt-3">
            <div className="card-body">
              <div className="card-title font-weight-bold dashboard-card-title">
                Acompanhamento de solicitações
                <span className="float-right">
                  <input
                    className="input-search"
                    placeholder="Pesquisar"
                    onChange={this.filterList}
                  />
                  <i className="fas fa-search" />
                </span>
              </div>
              <div>
                <p className="current-date">
                  Data: <span>{dataAtual()}</span>
                </p>
              </div>
              <div className="row">
                <div className="col-6">
                  <CardStatusDeSolicitacao
                    cardTitle={"Aguardando Aprovação"}
                    cardType={CARD_TYPE_ENUM.PENDENTE}
                    solicitations={solicitacoesPendentesAprovacao}
                    icon={"fa-exclamation-triangle"}
                    href={`/${CODAE}/${SOLICITACOES}`}
                    loading={loadingPainelSolicitacoes}
                  />
                </div>
                <div className="col-6">
                  <CardStatusDeSolicitacao
                    cardTitle={"Autorizadas"}
                    cardType={CARD_TYPE_ENUM.APROVADO}
                    solicitations={solicitacoesAprovadas}
                    icon={"fa-check"}
                    href={`/${CODAE}/${SOLICITACOES}`}
                    loading={loadingPainelSolicitacoes}
                  />
                </div>
              </div>
              <div className="row pt-3">
                <div className="col-6">
                  <CardStatusDeSolicitacao
                    cardTitle={"Negadas"}
                    cardType={CARD_TYPE_ENUM.NEGADO}
                    solicitations={solicitacoesCanceladas}
                    icon={"fa-times-circle"}
                    href={`/${CODAE}/${SOLICITACOES}`}
                    loading={loadingPainelSolicitacoes}
                  />
                </div>
                <div className="col-6">
                  <CardStatusDeSolicitacao
                    cardTitle={"Canceladas"}
                    cardType={CARD_TYPE_ENUM.CANCELADO}
                    solicitations={solicitacoesCanceladas}
                    icon={"fa-times-circle"}
                    href={`/${CODAE}/${SOLICITACOES}`}
                    loading={loadingPainelSolicitacoes}
                  />
                </div>
              </div>
              <p className="caption">Legenda</p>
              <div className="caption-choices">
                <span>
                  <i className="fas fa-check" />
                  Solicitação Autorizada
                </span>
                <span>
                  <i className="fas fa-exclamation-triangle" />
                  Solicitação Aguardando Aprovação{" "}
                </span>
                <span>
                  <i className="fas fa-ban" />
                  Solicitação Negadas
                </span>
                <span>
                  <i className="fas fa-times-circle" />
                  Solicitação Cancelada
                </span>
              </div>
            </div>
          </div>
          <div className="card mt-3">
            <div className="card-body">
              <div className="card-title font-weight-bold dashboard-card-title">
                <div className="row">
                  <div className="col-3 mt-3 color-black">Pendências</div>
                  <div className="offset-3 col-3 text-right my-auto">
                    <Select
                      naoDesabilitarPrimeiraOpcao
                      onChange={event =>
                        this.onVencimentoPara(event.target.value)
                      }
                      placeholder={"Vencimento para"}
                      options={vencimentoPara}
                    />
                  </div>
                  <div className="col-3 text-right my-auto">
                    <Select
                      naoDesabilitarPrimeiraOpcao
                      onChange={event => this.changeVisao(event.target.value)}
                      placeholder={"Visão por"}
                      options={visaoPor}
                    />
                  </div>
                </div>
              </div>
              <div className="pt-3" />
              {this.state.visao === "dre" && (
                <div className="row pt-3">
                  {diretoriasRegionais.map((dre, key) => {
                    return resumoPorDRE[dre.nome] ? (
                      <div key={key} className="col-6">
                        <CardPendencia
                          cardTitle={dre.nome}
                          totalOfOrders={resumoPorDRE[dre.nome]["TOTAL"]}
                          priorityOrders={resumoPorDRE[dre.nome]["PRIORITARIO"]}
                          onLimitOrders={resumoPorDRE[dre.nome]["LIMITE"]}
                          regularOrders={resumoPorDRE[dre.nome]["REGULAR"]}
                          loading={loadingPainelSolicitacoes}
                        />
                      </div>
                    ) : (
                      <div key={key} className="col-6">
                        <CardPendencia
                          cardTitle={dre.nome}
                          totalOfOrders={0}
                          priorityOrders={0}
                          onLimitOrders={0}
                          regularOrders={0}
                          loading={loadingPainelSolicitacoes}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
              {this.state.visao === "lote" && (
                <div className="row pt-3">
                  {lotes.map((lote, key) => {
                    return resumoPorLote[lote.lote] ? (
                      <div key={key} className="col-6 pb-3">
                        <CardPendencia
                          cardTitle={lote.lote}
                          totalOfOrders={resumoPorLote[lote.lote]["TOTAL"]}
                          priorityOrders={
                            resumoPorLote[lote.lote]["PRIORITARIO"]
                          }
                          onLimitOrders={resumoPorLote[lote.lote]["LIMITE"]}
                          regularOrders={resumoPorLote[lote.lote]["REGULAR"]}
                          loading={loadingPainelSolicitacoes}
                        />
                      </div>
                    ) : (
                      <div key={key} className="col-6">
                        <CardPendencia
                          cardTitle={lote.lote}
                          totalOfOrders={0}
                          priorityOrders={0}
                          onLimitOrders={0}
                          regularOrders={0}
                          loading={loadingPainelSolicitacoes}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
              {this.state.visao === "tipo_solicitacao" && (
                <div>
                  <div className="row">
                    <div className="col-6">
                      <Link to={`/${CODAE}/${INCLUSAO_ALIMENTACAO}`}>
                        <CardPendencia
                          cardTitle={"Inclusão de alimentação"}
                          totalOfOrders={
                            resumoPendenciasInclusaoAlimentacao.total
                          }
                          priorityOrders={
                            resumoPendenciasInclusaoAlimentacao.prioritario
                          }
                          onLimitOrders={
                            resumoPendenciasInclusaoAlimentacao.limite
                          }
                          regularOrders={
                            resumoPendenciasInclusaoAlimentacao.regular
                          }
                          loading={loadingPainelSolicitacoes}
                        />
                      </Link>
                    </div>
                    <div className="col-6">
                      <Link to={`/${CODAE}/${ALTERACAO_CARDAPIO}`}>
                        <CardPendencia
                          cardTitle={"Alteração de Cardápio"}
                          totalOfOrders={
                            resumoPendenciasAlteracaoCardapio.total
                          }
                          priorityOrders={
                            resumoPendenciasAlteracaoCardapio.prioritario
                          }
                          onLimitOrders={
                            resumoPendenciasAlteracaoCardapio.limite
                          }
                          regularOrders={
                            resumoPendenciasAlteracaoCardapio.regular
                          }
                          loading={loadingPainelSolicitacoes}
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="row pt-3">
                    <div className="col-6">
                      <Link to={`/${CODAE}/${SOLICITACAO_KIT_LANCHE}`}>
                        <CardPendencia
                          cardTitle={"Solicitação de Kit Lanche"}
                          totalOfOrders={resumoPendenciasKitLancheAvulsa.total}
                          priorityOrders={
                            resumoPendenciasKitLancheAvulsa.prioritario
                          }
                          onLimitOrders={resumoPendenciasKitLancheAvulsa.limite}
                          regularOrders={
                            resumoPendenciasKitLancheAvulsa.regular
                          }
                          loading={loadingPainelSolicitacoes}
                        />
                      </Link>
                    </div>
                    <div className="col-6">
                      <Link to={`/${CODAE}/${INVERSAO_CARDAPIO}`}>
                        <CardPendencia
                          cardTitle={"Inversão de dia de Cardápio"}
                          totalOfOrders={
                            resumoPendenciasInversoesCardapio.total
                          }
                          priorityOrders={
                            resumoPendenciasInversoesCardapio.prioritario
                          }
                          onLimitOrders={
                            resumoPendenciasInversoesCardapio.limite
                          }
                          regularOrders={
                            resumoPendenciasInversoesCardapio.regular
                          }
                          loading={loadingPainelSolicitacoes}
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="row pt-3">
                    <div className="col-6">
                      <Link to={`/${CODAE}/${SUSPENSAO_ALIMENTACAO}`}>
                        <CardPendencia
                          cardTitle={"Suspensão de Alimentação"}
                          totalOfOrders={quantidade_suspensoes}
                          priorityOrders={quantidade_suspensoes}
                          priorityOrdersOnly={true}
                          loading={loadingPainelSolicitacoes}
                        />
                      </Link>
                    </div>
                    <div className="col-6">
                      <Link
                        to={`/${CODAE}/${SOLICITACAO_KIT_LANCHE_UNIFICADA}`}
                      >
                        <CardPendencia
                          cardTitle={"Solicitação Unificada"}
                          totalOfOrders={
                            resumoPendenciasKitLancheUnificado.total
                          }
                          priorityOrders={
                            resumoPendenciasKitLancheUnificado.prioritario
                          }
                          onLimitOrders={
                            resumoPendenciasKitLancheUnificado.limite
                          }
                          regularOrders={
                            resumoPendenciasKitLancheUnificado.regular
                          }
                          loading={loadingPainelSolicitacoes}
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    );
  }
}
const DashboardCODAEForm = reduxForm({
  form: "dashboardCODAE",
  enableReinitialize: true
})(DashboardCODAE);

export default DashboardCODAEForm;
