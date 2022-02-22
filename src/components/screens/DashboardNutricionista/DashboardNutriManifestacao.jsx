import React, { Component } from "react";
import { Collapse } from "react-collapse";
import { Field, reduxForm } from "redux-form";
import {
  SOLICITACOES_AUTORIZADAS,
  SOLICITACOES_NEGADAS,
  SOLICITACOES_CANCELADAS,
  NUTRIMANIFESTACAO
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
import "./style.scss";
import {
  getSolicitacoesCanceladasNutrimanifestacao,
  getSolicitacoesNegadasNutrimanifestacao,
  getSolicitacoesAutorizadasNutrimanifestacao
} from "../../../services/painelNutricionista.service";

class DashboardNutriManifestacao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: this.props.cards,
      canceladasListFiltered: [],
      negadasListFiltered: [],
      autorizadasListFiltered: [],

      lotes: [],
      resumo: [],

      collapsed: true,
      canceladasListSolicitacao: [],
      negadasListSolicitacao: [],
      autorizadasListSolicitacao: [],
      loadingPainelSolicitacoes: true,

      visao: FILTRO_VISAO.POR_TIPO_SOLICITACAO
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

  async componentDidMount() {
    getSolicitacoesCanceladasNutrimanifestacao().then(response => {
      let canceladasListSolicitacao = ajustarFormatoLog(response);
      this.setState({
        canceladasListSolicitacao,
        canceladasListFiltered: canceladasListSolicitacao
      });
    });

    getSolicitacoesNegadasNutrimanifestacao().then(response => {
      let negadasListSolicitacao = ajustarFormatoLog(response);
      this.setState({
        negadasListSolicitacao,
        negadasListFiltered: negadasListSolicitacao
      });
    });

    getSolicitacoesAutorizadasNutrimanifestacao().then(response => {
      let autorizadasListSolicitacao = ajustarFormatoLog(response);
      this.setState({
        autorizadasListSolicitacao,
        autorizadasListFiltered: autorizadasListSolicitacao
      });
    });
  }

  onPesquisaChanged(values) {
    if (values.titulo === undefined) values.titulo = "";
    const {
      canceladasListSolicitacao,
      autorizadasListSolicitacao,
      negadasListSolicitacao
    } = this.state;

    this.setState({
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
    const { handleSubmit, meusDados, lotesRaw } = this.props;
    const {
      collapsed,
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
                  cardTitle={"Autorizadas"}
                  cardType={CARD_TYPE_ENUM.AUTORIZADO}
                  solicitations={autorizadasListFiltered}
                  icon={ICON_CARD_TYPE_ENUM.AUTORIZADO}
                  href={`/${NUTRIMANIFESTACAO}/${SOLICITACOES_AUTORIZADAS}`}
                />
              </div>
              <div className="col-6">
                <CardStatusDeSolicitacao
                  cardTitle={"Negadas"}
                  cardType={CARD_TYPE_ENUM.NEGADO}
                  solicitations={negadasListFiltered}
                  icon={ICON_CARD_TYPE_ENUM.NEGADO}
                  href={`/${NUTRIMANIFESTACAO}/${SOLICITACOES_NEGADAS}`}
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
                  href={`/${NUTRIMANIFESTACAO}/${SOLICITACOES_CANCELADAS}`}
                />
              </div>
            </div>
          </CardBody>
        </form>
      </div>
    );
  }
}

const DashboardNutriManifestacaoForm = reduxForm({
  form: "DashboardNutriManifestacao",
  enableReinitialize: true
})(DashboardNutriManifestacao);

export default DashboardNutriManifestacaoForm;
