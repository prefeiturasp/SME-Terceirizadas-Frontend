import React, { Component } from "react";
import { Collapse } from "react-collapse";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import {
  ALTERACAO_CARDAPIO,
  INCLUSAO_ALIMENTACAO,
  TERCEIRIZADA,
  SOLICITACAO_KIT_LANCHE,
  SOLICITACAO_KIT_LANCHE_UNIFICADA,
  SUSPENSAO_ALIMENTACAO,
  INVERSAO_CARDAPIO
} from "../../../configs/constants";
import {
  getResumoPendenciasTerceirizadaAlteracoesDeCardapio,
  getResumoPendenciasTerceirizadaInclusaoDeAlimentacao,
  getResumoPendenciasTerceirizadaInversaoDeDiaDeCardapio,
  getResumoPendenciasTerceirizadaKitLanche,
  getResumoPendenciasTerceirizadaSolicitacoesUnificadas,
  getResumoPendenciasTerceirizadaSuspensaoDeAlimentacao,
  getResumoPendenciasTerceirizadaPorLote,
  getResumoPendenciasTerceirizadaEscolas,
  getSolicitacoesPendentesTerceirizada,
  getSolicitacoesCanceladasTerceirizada,
} from "../../../services/painelTerceirizada.service";
import { meusDados as getMeusDados } from "../../../services/perfil.service";
import CardLogo from "../../Shareable/CardLogo/CardLogo";
import CardMatriculados from "../../Shareable/CardMatriculados";
import CardPendencia from "../../Shareable/CardPendencia/CardPendencia";
import CardStatusDeSolicitacao from "../../Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import IconeDietaEspecial from "../../Shareable/Icones/IconeDietaEspecial";
import IconeFinancas from "../../Shareable/Icones/IconeFinancas";
import IconeGestaoDeAlimentacao from "../../Shareable/Icones/IconeGestaoDeAlimentacao";
import IconePD from "../../Shareable/Icones/IconePD";
import IconePlanejamentoCardapio from "../../Shareable/Icones/IconePlanejamentoCardapio";
import IconeSupervisao from "../../Shareable/Icones/IconeSupervisao";
import { LabelAndCombo } from "../../Shareable/labelAndInput/labelAndInput";
import TabelaHistoricoLotes from "../../Shareable/TabelaHistoricoLotes";

class DashboardTerceirizada extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autorizadasList: [],
      autorizadasListFiltered: [],
      pendentesList: [],
      pendentesListFiltered: [],
      recusadasListFiltered: [],
      canceladasListFiltered: [],
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
      resumoPendenciasTerceirizadaEscolas: {},
      resumoPendenciasTerceirizadaLotes: {},
      loadingAutorizadas: true,
      loadingPendentes: true,
      loadingAlteracaoCardapio: true,
      loadingInclusoesAlimentacao: true,
      loadingInversoesCardapio: true,
      loadingKitLanche: true,
      loadingSuspensaoAlimentacao: true,
      loadingSolicitacoesUnificadas: true,
      loadingEscolas: true,
      loadingLotes: true
    };
    this.alterarCollapse = this.alterarCollapse.bind(this);
  }

  alterarCollapse() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  async carregaResumosPendencias(filtroPendencias, minhaTerceirizada) {
    this.setState({
      minhaTerceirizada,
      loadingAlteracaoCardapio: true,
      loadingInclusoesAlimentacao: true,
      loadingInversoesCardapio: true,
      loadingKitLanche: true,
      loadingSuspensaoAlimentacao: true,
      loadingSolicitacoesUnificadas: true,
      loadingEscolas: true,
      loadingLotes: true
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

    let resumoPendenciasTerceirizadaLotes = await getResumoPendenciasTerceirizadaPorLote(
      minhaTerceirizada,
      filtroPendencias
    );

    let resumoPendenciasTerceirizadaEscolas = await getResumoPendenciasTerceirizadaEscolas(
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
      resumoPendenciasTerceirizadaEscolas,
      resumoPendenciasTerceirizadaLotes,
      filtroPendencias,
      loadingAlteracaoCardapio: !resumoPendenciasTerceirizadaAlteracoesDeCardapio,
      loadingInclusoesAlimentacao: !resumoPendenciasTerceirizadaInclusoesDeAlimentacao,
      loadingInversoesCardapio: !resumoPendenciasTerceirizadaInversaoDeDiaDeCardapio,
      loadingKitLanche: !resumoPendenciasTerceirizadaKitLanche,
      loadingSuspensaoAlimentacao: !resumoPendenciasTerceirizadaSuspensaoDeAlimentacao,
      loadingSolicitacoesUnificadas: !resumoPendenciasTerceirizadaSolicitacoesUnificadas,
      loadingEscolas: !resumoPendenciasTerceirizadaEscolas,
      loadingLotes: !resumoPendenciasTerceirizadaLotes
    });
  }

  async componentDidMount() {
    const minhaTerceirizada = (await getMeusDados()).terceirizadas[0].uuid;
    this.carregaResumosPendencias(this.state.filtroPendencias, minhaTerceirizada);

    getSolicitacoesPendentesTerceirizada(
      minhaTerceirizada).then(pendentesListSolicitacao => {
        this.setState({ pendentesListSolicitacao: pendentesListSolicitacao.results });
      });

    getSolicitacoesCanceladasTerceirizada(
      minhaTerceirizada).then(canceladasListSolicitacao => {
        this.setState({ canceladasListSolicitacao: canceladasListSolicitacao.results });
      })

  }

  render() {
    const {
      enrolled,
      handleSubmit,
      vision_by,
    } = this.props;

    const {
      collapsed,
      lotesTerceirizada,
      gestaoDeAlimentacao,
      pendentesListSolicitacao,
      canceladasListSolicitacao,

      resumoPendenciasTerceirizadaAlteracoesDeCardapio,
      resumoPendenciasTerceirizadaInclusoesDeAlimentacao,
      resumoPendenciasTerceirizadaInversaoDeDiaDeCardapio,
      resumoPendenciasTerceirizadaKitLanche,
      resumoPendenciasTerceirizadaSuspensaoDeAlimentacao,
      resumoPendenciasTerceirizadaSolicitacoesUnificadas,
      resumoPendenciasTerceirizadaEscolas,
      resumoPendenciasTerceirizadaLotes,
      loadingAlteracaoCardapio,
      loadingInclusoesAlimentacao,
      loadingInversoesCardapio,
      loadingKitLanche,
      loadingSuspensaoAlimentacao,
      loadingSolicitacoesUnificadas,
      loadingEscolas,
      loadingLotes
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
          <div className="card mt-3">
            <div className="card-body">
              <div className="card-title font-weight-bold dashboard-card-title">
                <span>
                  <i className="fas fa-thumbtack" />
                  Acompanhamento de solicitações
                  <i className="fas fa-pen" />
                </span>
                <span className="float-right">
                  <input className="input-search" placeholder="Pesquisar" />
                  <i className="fas fa-search" />
                </span>
              </div>
              <div>
                <p className="current-date">
                  Data: <span>28 de março de 2019</span>
                </p>
              </div>
              <div className="row pt-3">
                <div className="col-6">
                  <CardStatusDeSolicitacao
                    cardTitle={"Aguardando Aprovação"}
                    cardType={"card-pending"}
                    solicitations={pendentesListSolicitacao}
                    icon={"fa-exclamation-triangle"}
                    href={`${TERCEIRIZADA}/solicitacoes`}
                  />
                </div>
                <div className="col-6">
                  <CardStatusDeSolicitacao
                    cardTitle={"Canceladas"}
                    cardType={"card-cancelled"}
                    solicitations={canceladasListSolicitacao}
                    icon={"fa-times-circle"}
                    href={`/${TERCEIRIZADA}/solicitacoes`}
                  />
                </div>
              </div>
              <p className="caption">Legenda</p>
              <div className="caption-choices">
                <span />
                <span>
                  <i className="fas fa-exclamation-triangle" />
                  Solicitação Aguardando Aprovação
                </span>
                <span />
                <span>
                  <i className="fas fa-times-circle" />
                  Solicitação Cancelada
                </span>
              </div>
            </div>
          </div>
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
                    <CardPendencia
                      cardTitle={"Escolas"}
                      totalOfOrders={resumoPendenciasTerceirizadaEscolas.total}
                      priorityOrders={
                        resumoPendenciasTerceirizadaEscolas.prioritario
                      }
                      onLimitOrders={resumoPendenciasTerceirizadaEscolas.limite}
                      regularOrders={
                        resumoPendenciasTerceirizadaEscolas.regular
                      }
                      loading={loadingEscolas}
                    />
                  </div>
                  <div className="col-6">
                    <CardPendencia
                      cardTitle={"Lotes"}
                      totalOfOrders={resumoPendenciasTerceirizadaLotes.total}
                      priorityOrders={
                        resumoPendenciasTerceirizadaLotes.prioritario
                      }
                      onLimitOrders={resumoPendenciasTerceirizadaLotes.limite}
                      regularOrders={resumoPendenciasTerceirizadaLotes.regular}
                      loading={loadingLotes}
                    />
                  </div>
                </div>
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
