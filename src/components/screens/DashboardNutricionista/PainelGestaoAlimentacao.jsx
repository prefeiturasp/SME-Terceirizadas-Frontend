import React, { Component } from "react";
import { Collapse } from "react-collapse";
import { Field, reduxForm } from "redux-form";
import {
  SOLICITACOES_AUTORIZADAS,
  SOLICITACOES_PENDENTES,
  SOLICITACOES_NEGADAS,
  SOLICITACOES_CANCELADAS,
  SOLICITACOES_COM_QUESTIONAMENTO,
  NUTRISUPERVISAO
} from "../../../configs/constants";
import { FILTRO_VISAO } from "../../../constants/shared";
import { dataAtual } from "../../../helpers/utilities";
import CardBody from "../../Shareable/CardBody";
import CardMatriculados from "../../Shareable/CardMatriculados";
import CardStatusDeSolicitacao, {
  ICON_CARD_TYPE_ENUM,
  CARD_TYPE_ENUM
} from "../../Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import TabelaHistoricoLotesDREs from "../../Shareable/TabelaHistoricoLotesDREs";
import { ajustarFormatoLog, slugify } from "../helper";
import { FILTRO } from "../const";
import "./style.scss";
import {
  getSolicitacoesAutorizadasNutrisupervisao,
  getSolicitacoesCanceladasNutrisupervisao,
  getSolicitacoesNegadasNutrisupervisao,
  getSolicitacoesPendentesAutorizacaoNutrisupervisao,
  getSolicitacoesPendentesAutorizacaoNutrisupervisaoSecaoPendencias,
  getSolicitacoesComQuestionamentoNutrisupervisao
} from "../../../services/painelNutricionista.service";
import { toastError } from "../../Shareable/Toast/dialogs";
import corrigeResumo from "../../../helpers/corrigeDadosDoDashboard";

class PainelGestaoAlimentacao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: this.props.cards,
      pendentesAutorizacaoListFiltered: [],
      questionamentosListFiltered: [],
      canceladasListFiltered: [],
      negadasListFiltered: [],
      autorizadasListFiltered: [],

      lotes: [],
      resumo: [],

      collapsed: true,
      pendentesAutorizacaoListSolicitacao: [],
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
    const resumo = await getSolicitacoesPendentesAutorizacaoNutrisupervisaoSecaoPendencias(
      filtroPorVencimento,
      visao
    );

    // TODO melhorar essas duas linhas abaixo
    resumo["Kit Lanche Unificado"] = resumo["Kit Lanche Passeio Unificado"];
    delete resumo["Kit Lanche Passeio Unificado"];

    const correcaoOk = corrigeResumo(resumo);
    if (!correcaoOk) toastError("Erro na inclusão de dados da CEI");
    this.setState({
      resumo,
      loadingPainelSolicitacoes: false
    });
  }

  async componentDidMount() {
    this.carregaResumoPendencias();

    getSolicitacoesPendentesAutorizacaoNutrisupervisao("sem_filtro").then(
      response => {
        let pendentesAutorizacaoListSolicitacao = ajustarFormatoLog(response);
        this.setState({
          pendentesAutorizacaoListSolicitacao,
          pendentesAutorizacaoListFiltered: pendentesAutorizacaoListSolicitacao
        });
      }
    );

    getSolicitacoesCanceladasNutrisupervisao().then(response => {
      let canceladasListSolicitacao = ajustarFormatoLog(response);
      this.setState({
        canceladasListSolicitacao,
        canceladasListFiltered: canceladasListSolicitacao
      });
    });

    getSolicitacoesNegadasNutrisupervisao().then(response => {
      let negadasListSolicitacao = ajustarFormatoLog(response);
      this.setState({
        negadasListSolicitacao,
        negadasListFiltered: negadasListSolicitacao
      });
    });

    getSolicitacoesAutorizadasNutrisupervisao().then(response => {
      let autorizadasListSolicitacao = ajustarFormatoLog(response);
      this.setState({
        autorizadasListSolicitacao: autorizadasListSolicitacao,
        autorizadasListFiltered: autorizadasListSolicitacao
      });
    });

    getSolicitacoesComQuestionamentoNutrisupervisao().then(response => {
      let questionamentosListSolicitacao = ajustarFormatoLog(response);
      this.setState({
        questionamentosListSolicitacao: questionamentosListSolicitacao,
        questionamentosListFiltered: questionamentosListSolicitacao
      });
    });
  }

  onPesquisaChanged(values) {
    if (values.titulo === undefined) values.titulo = "";
    const {
      questionamentosListSolicitacao,
      pendentesAutorizacaoListSolicitacao,
      canceladasListSolicitacao,
      autorizadasListSolicitacao,
      negadasListSolicitacao
    } = this.state;

    this.setState({
      pendentesAutorizacaoListFiltered: this.filtrarNome(
        pendentesAutorizacaoListSolicitacao,
        values.titulo
      ),
      autorizadasListFiltered: this.filtrarNome(
        autorizadasListSolicitacao,
        values.titulo
      ),
      questionamentosListFiltered: this.filtrarNome(
        questionamentosListSolicitacao,
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
    const { handleSubmit, meusDados, lotesRaw } = this.props;
    const {
      collapsed,
      questionamentosListFiltered,
      pendentesAutorizacaoListFiltered,
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
                <TabelaHistoricoLotesDREs lotes={lotesRaw} />
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
                  solicitations={pendentesAutorizacaoListFiltered}
                  icon={"fa-exclamation-triangle"}
                  href={`/${NUTRISUPERVISAO}/${SOLICITACOES_PENDENTES}`}
                />
              </div>
              <div className="col-6">
                <CardStatusDeSolicitacao
                  cardTitle={"Aguardando Resposta da Empresa"}
                  cardType={CARD_TYPE_ENUM.PENDENTE}
                  solicitations={questionamentosListFiltered}
                  icon={"fa-exclamation-triangle"}
                  href={`/${NUTRISUPERVISAO}/${SOLICITACOES_COM_QUESTIONAMENTO}`}
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
                  href={`/${NUTRISUPERVISAO}/${SOLICITACOES_AUTORIZADAS}`}
                />
              </div>
              <div className="col-6">
                <CardStatusDeSolicitacao
                  cardTitle={"Negadas"}
                  cardType={CARD_TYPE_ENUM.NEGADO}
                  solicitations={negadasListFiltered}
                  icon={ICON_CARD_TYPE_ENUM.NEGADO}
                  href={`/${NUTRISUPERVISAO}/${SOLICITACOES_NEGADAS}`}
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
                  href={`/${NUTRISUPERVISAO}/${SOLICITACOES_CANCELADAS}`}
                />
              </div>
            </div>
          </CardBody>
        </form>
      </div>
    );
  }
}

const PainelGestaoAlimentacaoForm = reduxForm({
  form: "PainelGestaoAlimentacao",
  enableReinitialize: true
})(PainelGestaoAlimentacao);

export default PainelGestaoAlimentacaoForm;
