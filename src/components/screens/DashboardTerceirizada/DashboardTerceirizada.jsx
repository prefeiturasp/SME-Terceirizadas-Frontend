import React, { Component } from "react";
import { Collapse } from "react-collapse";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import {
  ALTERACAO_CARDAPIO,
  INCLUSAO_ALIMENTACAO,
  INVERSAO_CARDAPIO,
  SOLICITACAO_KIT_LANCHE,
  SOLICITACAO_KIT_LANCHE_UNIFICADA,
  SUSPENSAO_ALIMENTACAO,
  TERCEIRIZADA,
  SOLICITACOES_AUTORIZADAS,
  SOLICITACOES_PENDENTES,
  SOLICITACOES_NEGADAS,
  SOLICITACOES_CANCELADAS
} from "../../../configs/constants";
import { dataAtual } from "../../../helpers/utilities";
import {
  getResumoPendenciasTerceirizadaAlteracoesDeCardapio,
  getResumoPendenciasTerceirizadaInclusaoDeAlimentacao,
  getResumoPendenciasTerceirizadaInversaoDeDiaDeCardapio,
  getResumoPendenciasTerceirizadaKitLanche,
  getResumoPendenciasTerceirizadaSolicitacoesUnificadas,
  getResumoPendenciasTerceirizadaSuspensaoDeAlimentacao,
  getSolicitacoesCanceladasTerceirizada,
  getSolicitacoesNegadasTerceirizada,
  getSolicitacoesPendentesTerceirizada,
  getSolicitacoesAutorizadasTerceirizada
} from "../../../services/painelTerceirizada.service";
import { meusDados as getMeusDados } from "../../../services/perfil.service";
import CardBody from "../../Shareable/CardBody";
import CardLegendas from "../../Shareable/CardLegendas";
import CardLogo from "../../Shareable/CardLogo/CardLogo";
import CardMatriculados from "../../Shareable/CardMatriculados";
import CardPendencia from "../../Shareable/CardPendencia/CardPendencia";
import CardStatusDeSolicitacao, {
  ICON_CARD_TYPE_ENUM,
  CARD_TYPE_ENUM
} from "../../Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import IconeDietaEspecial from "../../Shareable/Icones/IconeDietaEspecial";
import IconeFinancas from "../../Shareable/Icones/IconeFinancas";
import IconeGestaoDeAlimentacao from "../../Shareable/Icones/IconeGestaoDeAlimentacao";
import IconePD from "../../Shareable/Icones/IconePD";
import IconePlanejamentoCardapio from "../../Shareable/Icones/IconePlanejamentoCardapio";
import IconeSupervisao from "../../Shareable/Icones/IconeSupervisao";
import { LabelAndCombo } from "../../Shareable/labelAndInput/labelAndInput";
import TabelaHistoricoLotes from "../../Shareable/TabelaHistoricoLotes";
import { ajustarFormatoLog, LOG_PARA } from "../helper";

class DashboardTerceirizada extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pendentesListFiltered: [],
      canceladasListFiltered: [],
      negadasListFiltered: [],
      autorizadasListFiltered: [],

      collapsed: true,
      pendentesListSolicitacao: [],
      canceladasListSolicitacao: [],

      gestaoDeAlimentacao: props.gestaoDeAlimentacao,
      filtroPendencias: "sem_filtro",

      resumoPendenciasTerceirizadaAlteracoesDeCardapio: {},
      resumoPendenciasTerceirizadaInclusoesDeAlimentacao: {},
      resumoPendenciasTerceirizadaInversaoDeDiaDeCardapio: {},
      resumoPendenciasTerceirizadaKitLanche: {},
      resumoPendenciasTerceirizadaSuspensaoDeAlimentacao: {},
      resumoPendenciasTerceirizadaSolicitacoesUnificadas: {},
      loadingAutorizadas: true,
      loadingPendentes: true,
      loadingAlteracaoCardapio: true,
      loadingInclusoesAlimentacao: true,
      loadingInversoesCardapio: true,
      loadingKitLanche: true,
      loadingSuspensaoAlimentacao: true,
      loadingSolicitacoesUnificadas: true
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

  async carregaResumosPendencias(filtroPendencias, minhaTerceirizada) {
    this.setState({
      minhaTerceirizada,
      loadingAlteracaoCardapio: true,
      loadingInclusoesAlimentacao: true,
      loadingInversoesCardapio: true,
      loadingKitLanche: true,
      loadingSuspensaoAlimentacao: true,
      loadingSolicitacoesUnificadas: true
    });
    const resumoPendenciasTerceirizadaAlteracoesDeCardapio = await getResumoPendenciasTerceirizadaAlteracoesDeCardapio(
      minhaTerceirizada,
      filtroPendencias
    );
    const resumoPendenciasTerceirizadaInclusoesDeAlimentacao = await getResumoPendenciasTerceirizadaInclusaoDeAlimentacao(
      minhaTerceirizada,
      filtroPendencias
    );
    const resumoPendenciasTerceirizadaInversaoDeDiaDeCardapio = await getResumoPendenciasTerceirizadaInversaoDeDiaDeCardapio(
      minhaTerceirizada,
      filtroPendencias
    );
    const resumoPendenciasTerceirizadaKitLanche = await getResumoPendenciasTerceirizadaKitLanche(
      minhaTerceirizada,
      filtroPendencias
    );
    const resumoPendenciasTerceirizadaSuspensaoDeAlimentacao = await getResumoPendenciasTerceirizadaSuspensaoDeAlimentacao(
      minhaTerceirizada,
      filtroPendencias
    );
    const resumoPendenciasTerceirizadaSolicitacoesUnificadas = await getResumoPendenciasTerceirizadaSolicitacoesUnificadas(
      minhaTerceirizada,
      filtroPendencias
    );

    this.setState({
      resumoPendenciasTerceirizadaAlteracoesDeCardapio,
      resumoPendenciasTerceirizadaInclusoesDeAlimentacao,
      resumoPendenciasTerceirizadaInversaoDeDiaDeCardapio,
      resumoPendenciasTerceirizadaKitLanche,
      resumoPendenciasTerceirizadaSuspensaoDeAlimentacao,
      resumoPendenciasTerceirizadaSolicitacoesUnificadas,
      filtroPendencias,
      loadingAlteracaoCardapio: !resumoPendenciasTerceirizadaAlteracoesDeCardapio,
      loadingInclusoesAlimentacao: !resumoPendenciasTerceirizadaInclusoesDeAlimentacao,
      loadingInversoesCardapio: !resumoPendenciasTerceirizadaInversaoDeDiaDeCardapio,
      loadingKitLanche: !resumoPendenciasTerceirizadaKitLanche,
      loadingSuspensaoAlimentacao: !resumoPendenciasTerceirizadaSuspensaoDeAlimentacao,
      loadingSolicitacoesUnificadas: !resumoPendenciasTerceirizadaSolicitacoesUnificadas
    });
  }

  async componentDidMount() {
    const minhaTerceirizada = (await getMeusDados()).terceirizadas[0].uuid;
    this.carregaResumosPendencias(
      this.state.filtroPendencias,
      minhaTerceirizada
    );

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

    getSolicitacoesAutorizadasTerceirizada(minhaTerceirizada).then(request => {
      let autorizadasListSolicitacao = ajustarFormatoLog(
        request.results,
        LOG_PARA.TERCEIRIZADA
      );
      this.setState({
        autorizadasListSolicitacao: autorizadasListSolicitacao,
        autorizadasListFiltered: autorizadasListSolicitacao
      });
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
    const { enrolled, handleSubmit, vision_by } = this.props;

    const {
      collapsed,
      lotesTerceirizada,
      gestaoDeAlimentacao,
      pendentesListFiltered,
      canceladasListFiltered,
      negadasListFiltered,
      autorizadasListFiltered,

      resumoPendenciasTerceirizadaAlteracoesDeCardapio,
      resumoPendenciasTerceirizadaInclusoesDeAlimentacao,
      resumoPendenciasTerceirizadaInversaoDeDiaDeCardapio,
      resumoPendenciasTerceirizadaKitLanche,
      resumoPendenciasTerceirizadaSuspensaoDeAlimentacao,
      resumoPendenciasTerceirizadaSolicitacoesUnificadas,
      loadingAlteracaoCardapio,
      loadingInclusoesAlimentacao,
      loadingInversoesCardapio,
      loadingKitLanche,
      loadingSuspensaoAlimentacao,
      loadingSolicitacoesUnificadas
    } = this.state;

    return (
      <div>
        <form onSubmit={handleSubmit(this.props.handleSubmit)}>
          <Field component={"input"} type="hidden" name="uuid" />
          <CardMatriculados
            collapsed={collapsed}
            alterarCollapse={this.alterarCollapse}
            numeroAlunos={enrolled}
          >
            <Collapse isOpened={!collapsed}>
              <TabelaHistoricoLotes lotes={lotesTerceirizada} />
            </Collapse>
          </CardMatriculados>
          <CardBody
            titulo={"Acompanhamento solicitações"}
            dataAtual={dataAtual()}
            onChange={this.onPesquisaChanged}
          >
            <div className="row">
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
          {!gestaoDeAlimentacao ? (
            <div>
              <div className="row mt-3">
                <div
                  className="col-4"
                  onClick={() =>
                    this.setState({ gestaoDeAlimentacao: !gestaoDeAlimentacao })
                  }
                >
                  <CardLogo titulo={"Gestão de Alimentação"}>
                    <IconeGestaoDeAlimentacao />
                  </CardLogo>
                </div>
                <div className="col-4">
                  <CardLogo titulo={"Dieta Especial"} disabled>
                    <IconeDietaEspecial />
                  </CardLogo>
                </div>
                <div className="col-4">
                  <CardLogo titulo={"Finanças"} disabled>
                    <IconeFinancas />
                  </CardLogo>
                </div>
              </div>
              <div className="row mt-3">
                <div
                  className="col-4"
                  onClick={() =>
                    this.setState({ gestaoDeAlimentacao: !gestaoDeAlimentacao })
                  }
                >
                  <CardLogo titulo={"Pesquisa e Desenvolvimento P&D"} disabled>
                    <IconePD />
                  </CardLogo>
                </div>
                <div className="col-4">
                  <CardLogo titulo={"Supervisão"} disabled>
                    <IconeSupervisao />
                  </CardLogo>
                </div>
                <div className="col-4">
                  <CardLogo titulo={"Planejamento de Cardápio"} disabled>
                    <IconePlanejamentoCardapio />
                  </CardLogo>
                </div>
              </div>
            </div>
          ) : (
            <div className="card mt-3">
              <div className="card-body">
                <div className="card-title font-weight-bold dashboard-card-title">
                  <div className="row">
                    <div className="col-3 mt-3">
                      <i className="fas fa-lock" />
                      Pendências
                    </div>
                    <div className="offset-6 col-3 text-right my-auto">
                      <LabelAndCombo
                        onChange={() => {}}
                        placeholder={"Visão por"}
                        options={vision_by}
                      />
                    </div>
                  </div>
                </div>
                <div className="pt-3" />
                <div className="row pt-3">
                  <div className="col-6">
                    <Link to={`/${TERCEIRIZADA}/${INCLUSAO_ALIMENTACAO}`}>
                      <CardPendencia
                        cardTitle={"Inclusão de Alimentação"}
                        totalOfOrders={
                          resumoPendenciasTerceirizadaInclusoesDeAlimentacao.total
                        }
                        priorityOrders={
                          resumoPendenciasTerceirizadaInclusoesDeAlimentacao.prioritario
                        }
                        onLimitOrders={
                          resumoPendenciasTerceirizadaInclusoesDeAlimentacao.limite
                        }
                        regularOrders={
                          resumoPendenciasTerceirizadaInclusoesDeAlimentacao.regular
                        }
                        loading={loadingInclusoesAlimentacao}
                      />
                    </Link>
                  </div>
                  <div className="col-6">
                    <Link to={`/${TERCEIRIZADA}/${INVERSAO_CARDAPIO}`}>
                      <CardPendencia
                        cardTitle={"Inversão de dias de cardápio"}
                        totalOfOrders={
                          resumoPendenciasTerceirizadaInversaoDeDiaDeCardapio.total
                        }
                        priorityOrders={
                          resumoPendenciasTerceirizadaInversaoDeDiaDeCardapio.prioritario
                        }
                        onLimitOrders={
                          resumoPendenciasTerceirizadaInversaoDeDiaDeCardapio.limite
                        }
                        regularOrders={
                          resumoPendenciasTerceirizadaInversaoDeDiaDeCardapio.regular
                        }
                        loading={loadingInversoesCardapio}
                      />
                    </Link>
                  </div>
                </div>
                <div className="row pt-3">
                  <div className="col-6">
                    <Link to={`/${TERCEIRIZADA}/${ALTERACAO_CARDAPIO}`}>
                      <CardPendencia
                        cardTitle={"Alteração de Cardápio"}
                        totalOfOrders={
                          resumoPendenciasTerceirizadaAlteracoesDeCardapio.total
                        }
                        priorityOrders={
                          resumoPendenciasTerceirizadaAlteracoesDeCardapio.prioritario
                        }
                        onLimitOrders={
                          resumoPendenciasTerceirizadaAlteracoesDeCardapio.limite
                        }
                        regularOrders={
                          resumoPendenciasTerceirizadaAlteracoesDeCardapio.regular
                        }
                        loading={loadingAlteracaoCardapio}
                      />
                    </Link>
                  </div>
                  <div className="col-6">
                    <Link to={`/${TERCEIRIZADA}/${SOLICITACAO_KIT_LANCHE}`}>
                      <CardPendencia
                        cardTitle={"Kit Lanche Passeio"}
                        totalOfOrders={
                          resumoPendenciasTerceirizadaKitLanche.total
                        }
                        priorityOrders={
                          resumoPendenciasTerceirizadaKitLanche.prioritario
                        }
                        onLimitOrders={
                          resumoPendenciasTerceirizadaKitLanche.limite
                        }
                        regularOrders={
                          resumoPendenciasTerceirizadaKitLanche.regular
                        }
                        loading={loadingKitLanche}
                      />
                    </Link>
                  </div>
                </div>
                <div className="row pt-3">
                  <div className="col-6">
                    <Link
                      to={`/${TERCEIRIZADA}/${SOLICITACAO_KIT_LANCHE_UNIFICADA}`}
                    >
                      <CardPendencia
                        cardTitle={"Pedido Unificado"}
                        totalOfOrders={
                          resumoPendenciasTerceirizadaSolicitacoesUnificadas.total
                        }
                        priorityOrders={
                          resumoPendenciasTerceirizadaSolicitacoesUnificadas.prioritario
                        }
                        onLimitOrders={
                          resumoPendenciasTerceirizadaSolicitacoesUnificadas.limite
                        }
                        regularOrders={
                          resumoPendenciasTerceirizadaSolicitacoesUnificadas.regular
                        }
                        loading={loadingSolicitacoesUnificadas}
                      />
                    </Link>
                  </div>
                  <div className="col-6">
                    <Link to={`/${TERCEIRIZADA}/${SUSPENSAO_ALIMENTACAO}`}>
                      <CardPendencia
                        cardTitle={"Suspensão de Alimentação"}
                        totalOfOrders={
                          resumoPendenciasTerceirizadaSuspensaoDeAlimentacao.total
                        }
                        priorityOrders={
                          resumoPendenciasTerceirizadaSuspensaoDeAlimentacao.prioritario
                        }
                        onLimitOrders={
                          resumoPendenciasTerceirizadaSuspensaoDeAlimentacao.limite
                        }
                        regularOrders={
                          resumoPendenciasTerceirizadaSuspensaoDeAlimentacao.regular
                        }
                        loading={loadingSuspensaoAlimentacao}
                      />
                    </Link>
                  </div>
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
