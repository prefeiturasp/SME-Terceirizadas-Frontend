import React, { Component } from "react";
import { Collapse } from "react-collapse";
import { Field, reduxForm } from "redux-form";
import {
  TERCEIRIZADA,
  SOLICITACOES_AUTORIZADAS,
  SOLICITACOES_COM_QUESTIONAMENTO,
  SOLICITACOES_NEGADAS,
  SOLICITACOES_CANCELADAS
} from "../../../configs/constants";
import { FILTRO_VISAO } from "../../../constants/shared";
import { dataAtual } from "../../../helpers/utilities";
import {
  getSolicitacoesCanceladasTerceirizada,
  getSolicitacoesComQuestionamento,
  getSolicitacoesNegadasTerceirizada,
  getSolicitacoesAutorizadasTerceirizada,
  getSolicitacoesPendenteCienciaTerceirizada
} from "../../../services/painelTerceirizada.service";
import { meusDados as getMeusDados } from "../../../services/perfil.service";
import CardBody from "../../Shareable/CardBody";
import CardMatriculados from "../../Shareable/CardMatriculados";
import CardStatusDeSolicitacao, {
  ICON_CARD_TYPE_ENUM,
  CARD_TYPE_ENUM
} from "../../Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import TabelaHistoricoLotes from "../../Shareable/TabelaHistoricoLotes";
import { ajustarFormatoLog, LOG_PARA, slugify } from "../helper";
import { MENU_DASHBOARD_TERCEIRIZADAS } from "./constants";
import { FILTRO } from "../const";

class DashboardTerceirizada extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secao: null,
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

  filtrarNome(listaFiltro, value) {
    listaFiltro = listaFiltro.filter(function(item) {
      const wordToFilter = slugify(value.toLowerCase());
      return slugify(item.text.toLowerCase()).search(wordToFilter) !== -1;
    });
    return listaFiltro;
  }

  renderSecao(secao) {
    this.setState({ secao });
  }

  setfiltroPorVencimento(filtroPorVencimento) {
    this.setState({ filtroPorVencimento }, () => {
      this.carregaResumosQuestionamentos();
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
        this.carregaResumosQuestionamentos();
      }
    );
  }

  async carregaResumosQuestionamentos() {
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
    if (
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.botaoVoltar
    ) {
      this.setState({
        secao: MENU_DASHBOARD_TERCEIRIZADAS.GESTAO_DE_ALIMENTACAO
      });
    }
    getMeusDados().then(response => {
      minhaTerceirizada = response.vinculo_atual.instituicao.uuid;
      this.setState({ minhaTerceirizada });

      this.carregaResumosQuestionamentos();

      getSolicitacoesComQuestionamento(minhaTerceirizada).then(request => {
        let questionamentosListSolicitacao = ajustarFormatoLog(
          request.results,
          LOG_PARA.TERCEIRIZADA
        );
        this.setState({
          questionamentosListSolicitacao,
          questionamentosListFiltered: questionamentosListSolicitacao
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

  onPesquisaChanged(values) {
    if (values.titulo === undefined) values.titulo = "";
    const {
      questionamentosListSolicitacao,
      canceladasListSolicitacao,
      autorizadasListSolicitacao,
      negadasListSolicitacao
    } = this.state;

    this.setState({
      questionamentosListFiltered: this.filtrarNome(
        questionamentosListSolicitacao,
        values.titulo
      ),
      autorizadasListFiltered: this.filtrarNome(
        autorizadasListSolicitacao,
        values.titulo
      ),
      negadasListFiltered: this.filtrarNome(
        negadasListSolicitacao,
        values.titulo
      ),
      canceladasListFiltered: this.filtrarNome(
        canceladasListSolicitacao,
        values.titulo
      )
    });
  }

  render() {
    const { handleSubmit, meusDados } = this.props;

    const {
      collapsed,
      questionamentosListFiltered,
      canceladasListFiltered,
      negadasListFiltered,
      autorizadasListFiltered
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
                  cardTitle={"Questionamentos da CODAE"}
                  cardType={CARD_TYPE_ENUM.PENDENTE}
                  solicitations={questionamentosListFiltered}
                  icon={"fa-exclamation-triangle"}
                  href={`/${TERCEIRIZADA}/${SOLICITACOES_COM_QUESTIONAMENTO}`}
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
          </CardBody>
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
