import React, { Component } from "react";
import { Collapse } from "react-collapse";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import {
  DRE,
  SOLICITACOES_AUTORIZADAS,
  SOLICITACOES_PENDENTES,
  SOLICITACOES_NEGADAS,
  SOLICITACOES_CANCELADAS,
  SOLICITACOES_AGUARDADAS
} from "../../../configs/constants";
import { FILTRO_VISAO, PAGINACAO_DEFAULT } from "../../../constants/shared";
import { dataAtual } from "../../../helpers/utilities";
import CardBody from "../../Shareable/CardBody";
import CardMatriculados from "../../Shareable/CardMatriculados";
import CardPendencia from "../../Shareable/CardPendencia/CardPendencia";
import CardStatusDeSolicitacao, {
  ICON_CARD_TYPE_ENUM,
  CARD_TYPE_ENUM
} from "../../Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import TabelaHistoricoLotes from "../../Shareable/TabelaHistoricoLotes";
import { ajustarFormatoLog, slugify } from "../helper";
import Select from "../../Shareable/Select";
import { toastError } from "../../Shareable/Toast/dialogs";
import corrigeResumo from "../../../helpers/corrigeDadosDoDashboard";
import { FILTRO } from "../const";
import {
  getSolicitacoesPendentesValidacaoDRE,
  getSolicitacoesNegadasDRE,
  getSolicitacoesPendentesDRE,
  getSolicitacoesCanceladasDRE,
  getSolicitacoesAutorizadasDRE,
  getSolicitacoesAguardandoCODAE
} from "../../../services/painelDRE.service";
import Botao from "../../Shareable/Botao";
import { BUTTON_TYPE, BUTTON_STYLE } from "../../Shareable/Botao/constants";
import "./style.scss";

const PARAMS = { limit: PAGINACAO_DEFAULT, offset: 0 };
class DashboardDRE extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: this.props.cards,
      questionamentosListFiltered: [],
      canceladasListFiltered: [],
      negadasListFiltered: [],
      autorizadasListFiltered: [],
      aguardandoCODAEListFiltered: [],

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

  filtrarNome(listaFiltro, value) {
    listaFiltro = listaFiltro.filter(function(item) {
      const wordToFilter = slugify(value.toLowerCase());
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
    const { tiposSolicitacao, lotes } = this.props;
    this.setState(
      {
        visao,
        cards:
          visao === FILTRO_VISAO.POR_TIPO_SOLICITACAO ? tiposSolicitacao : lotes
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
    const correcaoOk = corrigeResumo(resumo.results);
    if (!correcaoOk) toastError("Erro na inclusão de dados da CEI");
    this.setState({
      resumo: resumo.results,
      loadingPainelSolicitacoes: false
    });
  }

  async componentDidMount() {
    this.carregaResumoPendencias();
    this.getSolicitacoesAsync(PARAMS);
  }

  async getSolicitacoesAsync(params = null) {
    getSolicitacoesPendentesDRE(params).then(request => {
      let questionamentosListSolicitacao = ajustarFormatoLog(
        request.data.results
      );
      this.setState({
        questionamentosListSolicitacao,
        questionamentosListFiltered: questionamentosListSolicitacao
      });
    });

    getSolicitacoesCanceladasDRE(params).then(request => {
      let canceladasListSolicitacao = ajustarFormatoLog(request.data.results);
      this.setState({
        canceladasListSolicitacao,
        canceladasListFiltered: canceladasListSolicitacao
      });
    });

    getSolicitacoesNegadasDRE(params).then(request => {
      let negadasListSolicitacao = ajustarFormatoLog(request.data.results);
      this.setState({
        negadasListSolicitacao,
        negadasListFiltered: negadasListSolicitacao
      });
    });

    getSolicitacoesAutorizadasDRE(params).then(request => {
      let autorizadasListSolicitacao = ajustarFormatoLog(request.data.results);
      this.setState({
        autorizadasListSolicitacao: autorizadasListSolicitacao,
        autorizadasListFiltered: autorizadasListSolicitacao
      });
    });

    getSolicitacoesAguardandoCODAE(params).then(request => {
      let aguardandoCODAEListSolicitacao = ajustarFormatoLog(request.data.results);
      this.setState({
        aguardandoCODAEListFiltered: aguardandoCODAEListSolicitacao
      })
    })
  }

  onPesquisaChanged(values) {
    if (values.titulo && values.titulo.length > 2) {
      this.getSolicitacoesAsync({
        busca: values.titulo,
        ...PARAMS
      });
    } else {
      this.getSolicitacoesAsync(PARAMS);
    }
  }

  render() {
    const { handleSubmit, visaoPor, filtroPor, meusDados } = this.props;

    const {
      cards,
      collapsed,
      visao,
      questionamentosListFiltered,
      canceladasListFiltered,
      negadasListFiltered,
      autorizadasListFiltered,
      aguardandoCODAEListFiltered,
      resumo,
      loadingPainelSolicitacoes,
    } = this.state;

    return (
      <div>
        <form onSubmit={handleSubmit(this.props.handleSubmit)}>
          <Field component={"input"} type="hidden" name="uuid" />
          <CardMatriculados
            collapsed={collapsed}
            meusDados={meusDados}
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
                />
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
                      options={filtroPor}
                    />
                  </div>
                  <div className="col-3 text-right my-auto">
                    <Select
                      naoDesabilitarPrimeiraOpcao
                      disabled={resumo.length === 0}
                      onChange={event => this.setVisao(event.target.value)}
                      placeholder={"Visão por"}
                      options={visaoPor}
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
                          visao === FILTRO_VISAO.POR_TIPO_SOLICITACAO
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
          <CardBody
            titulo={"Acompanhamento solicitações"}
            dataAtual={dataAtual()}
            onChange={this.onPesquisaChanged}
          >
            <div className="row pb-3">
              <div className="col-6">
                <CardStatusDeSolicitacao
                  cardTitle={"Aguardando Validação da DRE"}
                  cardType={CARD_TYPE_ENUM.PENDENTE}
                  solicitations={questionamentosListFiltered}
                  icon={"fa-exclamation-triangle"}
                  href={`/${DRE}/${SOLICITACOES_PENDENTES}`}
                />
              </div>
              <div className="col-6">
                <CardStatusDeSolicitacao
                  cardTitle={"Aguardando Retorno de CODAE"}
                  cardType={CARD_TYPE_ENUM.AGUARDANDO_CODAE}
                  solicitations={aguardandoCODAEListFiltered}
                  icon={"fa-history"}
                  href={`/${DRE}/${SOLICITACOES_AGUARDADAS}`}
                />
              </div>
            </div>
            <div className="row pb-3">
              <div className="col-6">
                <CardStatusDeSolicitacao
                  cardTitle={"Autorizadas"}
                  cardType={CARD_TYPE_ENUM.AUTORIZADO}
                  solicitations={autorizadasListFiltered}
                  icon={ICON_CARD_TYPE_ENUM.AUTORIZADO}
                  href={`/${DRE}/${SOLICITACOES_AUTORIZADAS}`}
                />
              </div>
              <div className="col-6">
                <CardStatusDeSolicitacao
                  cardTitle={"Negadas"}
                  cardType={CARD_TYPE_ENUM.NEGADO}
                  solicitations={negadasListFiltered}
                  icon={ICON_CARD_TYPE_ENUM.NEGADO}
                  href={`/${DRE}/${SOLICITACOES_NEGADAS}`}
                />
              </div>
            </div>
            <div className="row">
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
