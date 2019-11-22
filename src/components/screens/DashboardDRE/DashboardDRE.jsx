import React, { Component } from "react";
import { Collapse } from "react-collapse";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Field, formValueSelector, reduxForm } from "redux-form";
import {
  ALTERACAO_CARDAPIO,
  DRE,
  INCLUSAO_ALIMENTACAO,
  INVERSAO_CARDAPIO,
  SOLICITACAO_KIT_LANCHE,
  SOLICITACOES_AUTORIZADAS,
  SOLICITACOES_CANCELADAS,
  SOLICITACOES_PENDENTES,
  SOLICITACOES_RECUSADAS
} from "../../../configs/constants";
import { dataAtual } from "../../../helpers/utilities";
import {
  getResumoPendenciasDREAlteracoesDeCardapio,
  getResumoPendenciasDREInclusaoDeAlimentacao,
  getResumoPendenciasDREInversaoDeDiaDeCardapio,
  getResumoPendenciasDREKitLanche,
  getResumoPendenciasDRESuspensaoDeAlimentacao,
  getResumoPendenciasDREPorLote
} from "../../../services/painelDRE.service";
import { meusDados as getMeusDados } from "../../../services/perfil.service";
import { Botao } from "../../Shareable/Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "../../Shareable/Botao/constants";
import CardMatriculados from "../../Shareable/CardMatriculados";
import CardPendencia from "../../Shareable/CardPendencia/CardPendencia";
import CardStatusDeSolicitacao, {
  CARD_TYPE_ENUM
} from "../../Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import { Select } from "../../Shareable/Select";
import "../../Shareable/style.scss";
import TabelaHistoricoLotes from "../../Shareable/TabelaHistoricoLotes";
import "./style.scss";
class DashboardDRE extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autorizadasListFiltered: [],
      pendentesListFiltered: [],
      negadasListFiltered: [],
      canceladasListFiltered: [],

      collapsed: true,
      lotes: [
        {
          nome: "7A IP I IPIRANGA",
          tipo_de_gestao: "TERC TOTAL"
        },
        {
          nome: "7A IP II IPIRANGA",
          tipo_de_gestao: "TERC TOTAL"
        }
      ],
      resumoPendenciasDREAlteracoesDeCardapio: {},
      resumoPendenciasDREInclusoesDeAlimentacao: {},
      resumoPendenciasDREInversaoDeDiaDeCardapio: {},
      resumoPendenciasDREKitLanche: {},
      resumoPendenciasDRESuspensaoDeAlimentacao: {},
      filtroPendencias: "sem_filtro",
      meusDados: [],
      loadingAutorizadas: true,
      loadingPendentes: true,
      loadingAlteracaoCardapio: true,
      loadingInclusoesAlimentacao: true,
      loadingInversoesCardapio: true,
      loadingKitLanche: true,
      loadingSuspensaoAlimentacao: true,
      visao: "tipo_solicitacao",
      resumoPorLote: []
    };
    this.alterarCollapse = this.alterarCollapse.bind(this);
    this.filterList = this.filterList.bind(this);
    this.changeFiltroPendencias = this.changeFiltroPendencias.bind(this);
    this.changeVisao = this.changeVisao.bind(this);
  }

  async carregaResumosPendencias(filtroPendencias) {
    this.setState({
      loadingAlteracaoCardapio: true,
      loadingInclusoesAlimentacao: true,
      loadingInversoesCardapio: true,
      loadingKitLanche: true,
      loadingSuspensaoAlimentacao: true,
      loadingResumoLotes: true
    });
    const minhaDRE = (await getMeusDados()).vinculo_atual.instituicao.uuid;
    const resumoPendenciasDREAlteracoesDeCardapio = await getResumoPendenciasDREAlteracoesDeCardapio(
      filtroPendencias
    );
    const resumoPendenciasDREInclusoesDeAlimentacao = await getResumoPendenciasDREInclusaoDeAlimentacao(
      filtroPendencias
    );
    const resumoPendenciasDREInversaoDeDiaDeCardapio = await getResumoPendenciasDREInversaoDeDiaDeCardapio(
      filtroPendencias
    );
    const resumoPendenciasDREKitLanche = await getResumoPendenciasDREKitLanche(
      filtroPendencias
    );
    const resumoPendenciasDRESuspensaoDeAlimentacao = await getResumoPendenciasDRESuspensaoDeAlimentacao(
      filtroPendencias
    );

    let resumoPorLote = await getResumoPendenciasDREPorLote(
      minhaDRE,
      filtroPendencias
    );

    this.setState({
      resumoPendenciasDREAlteracoesDeCardapio,
      resumoPendenciasDREInclusoesDeAlimentacao,
      resumoPendenciasDREInversaoDeDiaDeCardapio,
      resumoPendenciasDREKitLanche,
      resumoPendenciasDRESuspensaoDeAlimentacao,
      filtroPendencias,
      resumoPorLote,
      loadingAlteracaoCardapio: !resumoPendenciasDREAlteracoesDeCardapio,
      loadingInclusoesAlimentacao: !resumoPendenciasDREInclusoesDeAlimentacao,
      loadingInversoesCardapio: !resumoPendenciasDREInversaoDeDiaDeCardapio,
      loadingKitLanche: !resumoPendenciasDREKitLanche,
      loadingSuspensaoAlimentacao: !resumoPendenciasDRESuspensaoDeAlimentacao,
      loadingResumoLotes: false
    });
  }

  componentDidMount() {
    this.carregaResumosPendencias("sem_filtro");
  }

  componentDidUpdate(prevProps) {
    if (prevProps.autorizadasList.length !== this.props.autorizadasList.length)
      this.setState({
        autorizadasListFiltered: this.props.autorizadasList
      });

    if (prevProps.pendentesList.length !== this.props.pendentesList.length)
      this.setState({
        pendentesListFiltered: this.props.pendentesList
      });

    if (prevProps.canceladasList.length !== this.props.canceladasList.length)
      this.setState({
        canceladasListFiltered: this.props.canceladasList
      });

    if (prevProps.negadasList.length !== this.props.negadasList.length)
      this.setState({
        negadasListFiltered: this.props.negadasList
      });

    if (prevProps.loadingAutorizadas !== this.props.loadingAutorizadas) {
      this.setState({ loadingAutorizadas: this.props.loadingAutorizadas });
    }

    if (prevProps.loadingPendentes !== this.props.loadingPendentes) {
      this.setState({ loadingPendentes: this.props.loadingPendentes });
    }

    if (prevProps.lotesDRE !== this.props.lotesDRE) {
      this.setState({ lotesDRE: this.props.lotesDRE });
    }
  }

  filterList(event) {
    if (event === undefined) event = { target: { value: "" } };

    const {
      autorizadasList,
      pendentesList,
      canceladasList,
      negadasList
    } = this.props;

    const autorizadasListFiltered = this.filtraTexto(autorizadasList, event);
    const pendentesListFiltered = this.filtraTexto(pendentesList, event);
    const canceladasListFiltered = this.filtraTexto(canceladasList, event);
    const negadasListFiltered = this.filtraTexto(negadasList, event);

    this.setState({
      autorizadasListFiltered,
      pendentesListFiltered,
      canceladasListFiltered,
      negadasListFiltered
    });
  }

  filtraTexto(lista, event) {
    lista = lista.filter(function(item) {
      const wordToFilter = event.target.value.toLowerCase();
      return item.text.toLowerCase().search(wordToFilter) !== -1;
    });
    return lista;
  }

  alterarCollapse() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  changeFiltroPendencias(filtro) {
    this.carregaResumosPendencias(filtro);
  }

  changeVisao(visao) {
    this.setState({ visao });
  }

  render() {
    const {
      enrolled,
      handleSubmit,
      vision_by,
      filtro_por,
      quantidade_suspensoes
    } = this.props;

    const {
      collapsed,
      lotesDRE,
      autorizadasListFiltered,
      pendentesListFiltered,
      negadasListFiltered,
      canceladasListFiltered,
      resumoPendenciasDREAlteracoesDeCardapio,
      resumoPendenciasDREInclusoesDeAlimentacao,
      resumoPendenciasDREInversaoDeDiaDeCardapio,
      resumoPendenciasDREKitLanche,
      loadingAutorizadas,
      loadingPendentes,
      loadingAlteracaoCardapio,
      loadingInclusoesAlimentacao,
      loadingInversoesCardapio,
      loadingSuspensaoAlimentacao,
      loadingKitLanche,
      resumoPorLote,
      loadingResumoLotes
    } = this.state;
    return (
      <div>
        <form onSubmit={handleSubmit(this.props.handleSubmit)}>
          <Field component={"input"} type="hidden" name="uuid" />
          <CardMatriculados
            collapsed={collapsed}
            alterarCollapse={this.alterarCollapse}
            numeroAlunos={enrolled ? enrolled : 0}
          >
            <Collapse isOpened={!collapsed}>
              <TabelaHistoricoLotes lotes={lotesDRE} />
            </Collapse>
          </CardMatriculados>
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
              <div className="row mb-3">
                <div className="col-6">
                  <CardStatusDeSolicitacao
                    cardTitle={"Aguardando Autorização"}
                    cardType={CARD_TYPE_ENUM.PENDENTE}
                    solicitations={pendentesListFiltered}
                    icon={"fa-exclamation-triangle"}
                    href={`/${DRE}/${SOLICITACOES_PENDENTES}`}
                    loading={loadingPendentes}
                  />
                </div>
                <div className="col-6">
                  <CardStatusDeSolicitacao
                    cardTitle={"Autorizadas"}
                    cardType={CARD_TYPE_ENUM.AUTORIZADO}
                    solicitations={autorizadasListFiltered}
                    icon={"fa-check"}
                    href={`/${DRE}/${SOLICITACOES_AUTORIZADAS}`}
                    loading={loadingAutorizadas}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <CardStatusDeSolicitacao
                    cardTitle={"Negadas"}
                    cardType={CARD_TYPE_ENUM.NEGADO}
                    solicitations={negadasListFiltered}
                    icon={"fa-ban"}
                    href={`/${DRE}/${SOLICITACOES_RECUSADAS}`}
                    loading={loadingPendentes}
                  />
                </div>
                <div className="col-6">
                  <CardStatusDeSolicitacao
                    cardTitle={"Canceladas"}
                    cardType={CARD_TYPE_ENUM.CANCELADO}
                    solicitations={canceladasListFiltered}
                    icon={"fa-times-circle"}
                    href={`/${DRE}/${SOLICITACOES_CANCELADAS}`}
                    loading={loadingAutorizadas}
                  />
                </div>
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
                        this.changeFiltroPendencias(event.target.value)
                      }
                      placeholder={"Filtro por"}
                      options={filtro_por}
                    />
                  </div>
                  <div className="col-3 text-right my-auto">
                    <Select
                      naoDesabilitarPrimeiraOpcao
                      disabled={!this.state.lotesDRE}
                      onChange={event => this.changeVisao(event.target.value)}
                      placeholder={"Visão por"}
                      options={vision_by}
                    />
                  </div>
                </div>
              </div>
              {/* Visão por Tipo de Solicitação */}
              {this.state.visao === "tipo_solicitacao" && (
                <div>
                  <div className="pt-3" />
                  <div className="row">
                    <div className="col-6">
                      <Link to={`/${DRE}/${INCLUSAO_ALIMENTACAO}`}>
                        <CardPendencia
                          cardTitle={"Inclusão de Alimentação"}
                          totalOfOrders={
                            resumoPendenciasDREInclusoesDeAlimentacao.total
                          }
                          priorityOrders={
                            resumoPendenciasDREInclusoesDeAlimentacao.prioritario
                          }
                          onLimitOrders={
                            resumoPendenciasDREInclusoesDeAlimentacao.limite
                          }
                          regularOrders={
                            resumoPendenciasDREInclusoesDeAlimentacao.regular
                          }
                          loading={loadingInclusoesAlimentacao}
                        />
                      </Link>
                    </div>
                    <div className="col-6">
                      <Link to={`/${DRE}/${INVERSAO_CARDAPIO}`}>
                        <CardPendencia
                          cardTitle={"Inversão de Dia de Cardápio"}
                          totalOfOrders={
                            resumoPendenciasDREInversaoDeDiaDeCardapio.total
                          }
                          priorityOrders={
                            resumoPendenciasDREInversaoDeDiaDeCardapio.prioritario
                          }
                          onLimitOrders={
                            resumoPendenciasDREInversaoDeDiaDeCardapio.limite
                          }
                          regularOrders={
                            resumoPendenciasDREInversaoDeDiaDeCardapio.regular
                          }
                          loading={loadingInversoesCardapio}
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="row pt-3">
                    <div className="col-6">
                      <Link to={`/${DRE}/${ALTERACAO_CARDAPIO}`}>
                        <CardPendencia
                          cardTitle={"Alteração de Cardápio"}
                          totalOfOrders={
                            resumoPendenciasDREAlteracoesDeCardapio.total
                          }
                          priorityOrders={
                            resumoPendenciasDREAlteracoesDeCardapio.prioritario
                          }
                          onLimitOrders={
                            resumoPendenciasDREAlteracoesDeCardapio.limite
                          }
                          regularOrders={
                            resumoPendenciasDREAlteracoesDeCardapio.regular
                          }
                          loading={loadingAlteracaoCardapio}
                        />
                      </Link>
                    </div>
                    <div className="col-6">
                      <Link to={`/${DRE}/${SOLICITACAO_KIT_LANCHE}`}>
                        <CardPendencia
                          cardTitle={"Kit Lanche Passeio"}
                          totalOfOrders={resumoPendenciasDREKitLanche.total}
                          priorityOrders={
                            resumoPendenciasDREKitLanche.prioritario
                          }
                          onLimitOrders={resumoPendenciasDREKitLanche.limite}
                          regularOrders={resumoPendenciasDREKitLanche.regular}
                          loading={loadingKitLanche}
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="row pt-3">
                    <div className="col-6">
                      <CardPendencia
                        priorityOrdersOnly={true}
                        cardTitle={"Suspensão de Alimentação"}
                        totalOfOrders={quantidade_suspensoes}
                        priorityOrders={quantidade_suspensoes}
                        loading={loadingSuspensaoAlimentacao}
                      />
                    </div>
                  </div>
                </div>
              )}
              {/* /Tipo de Solicitação */}

              {/* Visão por Lote */}
              {this.state.visao === "lote" && (
                <div className="row pt-3">
                  {this.state.lotesDRE.map((lote, key) => {
                    return resumoPorLote[lote.nome] ? (
                      <div key={key} className="col-6">
                        <CardPendencia
                          cardTitle={lote.nome}
                          totalOfOrders={resumoPorLote[lote.nome]["TOTAL"]}
                          priorityOrders={
                            resumoPorLote[lote.nome]["PRIORITARIO"]
                          }
                          onLimitOrders={resumoPorLote[lote.nome]["LIMITE"]}
                          regularOrders={resumoPorLote[lote.nome]["REGULAR"]}
                          loading={loadingResumoLotes}
                        />
                      </div>
                    ) : (
                      <div key={key} className="col-6">
                        <CardPendencia
                          cardTitle={lote.nome}
                          totalOfOrders={0}
                          priorityOrders={0}
                          onLimitOrders={0}
                          regularOrders={0}
                          loading={loadingResumoLotes}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
              {/* /Lotes */}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const DashboardDREForm = reduxForm({
  form: "dashboardDRE",
  enableReinitialize: true
})(DashboardDRE);
const selector = formValueSelector("foodInclusion");
const mapStateToProps = state => {
  return {
    initialValues: state.foodInclusion.data,
    description_first_period: selector(state, "description_first_period"),
    description_second_period: selector(state, "description_second_period"),
    description_third_period: selector(state, "description_third_period"),
    description_fourth_period: selector(state, "description_fourth_period"),
    description_integrate: selector(state, "description_integrate")
  };
};

export default connect(mapStateToProps)(DashboardDREForm);
