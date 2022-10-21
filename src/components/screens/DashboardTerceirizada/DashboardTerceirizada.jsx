import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import {
  TERCEIRIZADA,
  SOLICITACOES_AUTORIZADAS,
  SOLICITACOES_COM_QUESTIONAMENTO,
  SOLICITACOES_NEGADAS,
  SOLICITACOES_CANCELADAS
} from "configs/constants";
import { PAGINACAO_DASHBOARD_DEFAULT } from "constants/shared";
import { dataAtual } from "helpers/utilities";
import {
  getSolicitacoesCanceladasTerceirizada,
  getSolicitacoesComQuestionamento,
  getSolicitacoesNegadasTerceirizada,
  getSolicitacoesAutorizadasTerceirizada,
  getSolicitacoesPendenteCienciaTerceirizada
} from "services/painelTerceirizada.service";
import CardBody from "components/Shareable/CardBody";
import CardMatriculados from "components/Shareable/CardMatriculados";
import CardStatusDeSolicitacao, {
  ICON_CARD_TYPE_ENUM,
  CARD_TYPE_ENUM
} from "components/Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import { ajustarFormatoLog, LOG_PARA } from "../helper";
import { MENU_DASHBOARD_TERCEIRIZADAS } from "./constants";
import { Spin } from "antd";

const PARAMS = { limit: PAGINACAO_DASHBOARD_DEFAULT, offset: 0 };
class DashboardTerceirizada extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secao: null,
      cards: this.props.cards,

      lotes: [],
      resumo: [],

      collapsed: true,
      questionamentosListSolicitacao: [],
      autorizadasListSolicitacao: [],
      canceladasListSolicitacao: [],
      negadasListSolicitacao: [],
      loadingPainelSolicitacoes: true,

      listaStatus: [
        { nome: "Conferência Status", uuid: "" },
        { nome: "Conferida", uuid: "1" },
        { nome: "Não Conferida", uuid: "0" }
      ]
    };
    this.alterarCollapse = this.alterarCollapse.bind(this);
    this.onPesquisaChanged = this.onPesquisaChanged.bind(this);
  }

  alterarCollapse() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  async carregaResumosQuestionamentos() {
    const { meusDados } = this.props;
    let minhaTerceirizada = meusDados.vinculo_atual.instituicao.uuid;
    const { visao, filtroPorVencimento } = this.state;
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

  async getSolicitacoesAsync(params = null) {
    getSolicitacoesComQuestionamento(params).then(request => {
      let questionamentosListSolicitacao = ajustarFormatoLog(
        request.data.results,
        LOG_PARA.TERCEIRIZADA
      );
      this.setState({
        questionamentosListSolicitacao
      });
    });

    getSolicitacoesCanceladasTerceirizada(params).then(request => {
      let canceladasListSolicitacao = ajustarFormatoLog(
        request.data.results,
        LOG_PARA.TERCEIRIZADA
      );
      this.setState({
        canceladasListSolicitacao
      });
    });

    getSolicitacoesNegadasTerceirizada(params).then(request => {
      let negadasListSolicitacao = ajustarFormatoLog(
        request.data.results,
        LOG_PARA.TERCEIRIZADA
      );
      this.setState({
        negadasListSolicitacao
      });
    });

    getSolicitacoesAutorizadasTerceirizada(params).then(request => {
      let autorizadasListSolicitacao = ajustarFormatoLog(
        request.data.results,
        LOG_PARA.TERCEIRIZADA
      );
      this.setState({
        autorizadasListSolicitacao
      });
    });
  }

  async componentDidMount() {
    if (
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.botaoVoltar
    ) {
      this.setState({
        secao: MENU_DASHBOARD_TERCEIRIZADAS.GESTAO_DE_ALIMENTACAO
      });
    }
    this.carregaResumosQuestionamentos();
    this.getSolicitacoesAsync(PARAMS);
  }

  onPesquisaChanged(values) {
    const params = PARAMS;
    if (values.titulo && values.titulo.length > 2) {
      params["busca"] = values.titulo;
    } else {
      delete params["busca"];
    }
    params["status"] = values.status;
    params["lote"] = values.lote;
    setTimeout(async () => {
      this.getSolicitacoesAsync(params);
    }, 500);
  }

  render() {
    const { handleSubmit, meusDados, listaLotes } = this.props;

    const {
      collapsed,
      questionamentosListSolicitacao,
      canceladasListSolicitacao,
      negadasListSolicitacao,
      autorizadasListSolicitacao,
      listaStatus
    } = this.state;

    const LOADING =
      !questionamentosListSolicitacao ||
      !canceladasListSolicitacao ||
      !negadasListSolicitacao ||
      !autorizadasListSolicitacao;

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
          />
          <Spin tip="Carregando..." spinning={LOADING}>
            <CardBody
              titulo={"Acompanhamento solicitações"}
              dataAtual={dataAtual()}
              onChange={this.onPesquisaChanged}
              listaLotes={listaLotes}
              listaStatus={listaStatus}
            >
              <div className="row pb-3">
                <div className="col-6">
                  <CardStatusDeSolicitacao
                    cardTitle={"Questionamentos da CODAE"}
                    cardType={CARD_TYPE_ENUM.PENDENTE}
                    solicitations={questionamentosListSolicitacao}
                    icon={"fa-exclamation-triangle"}
                    href={`/${TERCEIRIZADA}/${SOLICITACOES_COM_QUESTIONAMENTO}`}
                  />
                </div>
                <div className="col-6">
                  <CardStatusDeSolicitacao
                    cardTitle={"Autorizadas"}
                    cardType={CARD_TYPE_ENUM.AUTORIZADO}
                    solicitations={autorizadasListSolicitacao}
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
                    solicitations={negadasListSolicitacao}
                    icon={ICON_CARD_TYPE_ENUM.NEGADO}
                    href={`/${TERCEIRIZADA}/${SOLICITACOES_NEGADAS}`}
                  />
                </div>
                <div className="col-6">
                  <CardStatusDeSolicitacao
                    cardTitle={"Canceladas"}
                    cardType={CARD_TYPE_ENUM.CANCELADO}
                    solicitations={canceladasListSolicitacao}
                    icon={ICON_CARD_TYPE_ENUM.CANCELADO}
                    href={`/${TERCEIRIZADA}/${SOLICITACOES_CANCELADAS}`}
                  />
                </div>
              </div>
            </CardBody>
          </Spin>
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
