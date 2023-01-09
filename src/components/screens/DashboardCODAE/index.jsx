import React, { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import StatefulMultiSelect from "@khanacademy/react-multi-select";
import { Link } from "react-router-dom";
import CardMatriculados from "../../Shareable/CardMatriculados";
import CardPendencia from "../../Shareable/CardPendencia/CardPendencia";
import CardBodySemRedux from "../../Shareable/CardBodySemRedux";
import CardStatusDeSolicitacao, {
  ICON_CARD_TYPE_ENUM,
  CARD_TYPE_ENUM
} from "../../Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import {
  FILTRO_VISAO,
  PAGINACAO_DASHBOARD_DEFAULT
} from "../../../constants/shared";
import { FILTRO } from "../const";
import {
  CODAE,
  SOLICITACOES_AUTORIZADAS,
  SOLICITACOES_PENDENTES,
  SOLICITACOES_NEGADAS,
  SOLICITACOES_CANCELADAS,
  SOLICITACOES_COM_QUESTIONAMENTO
} from "../../../configs/constants";
import { ajustarFormatoLog } from "../helper";
import {
  getSolicitacoesCanceladasCodae,
  getSolicitacoesNegadasCodae,
  getSolicitacoesAutorizadasCodae,
  getSolicitacoesPendentesAutorizacaoCODAESecaoPendencias,
  getSolicitacoesComQuestionamentoCodae,
  getSolicitacoesPendentesAutorizacaoCodaeSemFiltro
} from "../../../services/painelCODAE.service";
import corrigeResumo from "../../../helpers/corrigeDadosDoDashboard";
import { toastError } from "../../Shareable/Toast/dialogs";
import { dataAtual } from "../../../helpers/utilities";
import "./style.scss";

export const DashboardCODAE = ({
  cards,
  lotes,
  diretoriasRegionais,
  handleSubmit,
  meusDados
}) => {
  const PARAMS = { limit: PAGINACAO_DASHBOARD_DEFAULT, offset: 0 };
  const filtroPorVencimento = FILTRO.SEM_FILTRO;
  const visao = FILTRO_VISAO.POR_TIPO_SOLICITACAO;

  const [collapsed, setCollapsed] = useState(true);
  const [filtros, setFiltros] = useState({});
  const [resumo, setResumo] = useState([]);
  const [loadingPainelSolicitacoes, setLoadingPainelSolicitacoes] = useState(
    false
  );

  const [solicitacoesFiltradas, setSolicitacoesFiltradas] = useState({
    pendentes: [],
    questionadas: [],
    autorizadas: [],
    negadas: [],
    canceladas: []
  });

  const getSolicitacoesAsync = async (params = null) => {
    let pendentesAutorizacaoListSolicitacao = [];
    let canceladasListSolicitacao = [];
    let negadasListSolicitacao = [];
    let autorizadasListSolicitacao = [];
    let questionamentosListSolicitacao = [];

    await getSolicitacoesPendentesAutorizacaoCodaeSemFiltro(params).then(
      response => {
        pendentesAutorizacaoListSolicitacao = ajustarFormatoLog(
          response.data.results
        );
      }
    );

    await getSolicitacoesCanceladasCodae(params).then(response => {
      canceladasListSolicitacao = ajustarFormatoLog(response.data.results);
    });

    await getSolicitacoesNegadasCodae(params).then(response => {
      negadasListSolicitacao = ajustarFormatoLog(response.data.results);
    });

    await getSolicitacoesAutorizadasCodae(params).then(response => {
      autorizadasListSolicitacao = ajustarFormatoLog(response.data.results);
    });

    await getSolicitacoesComQuestionamentoCodae(params).then(response => {
      questionamentosListSolicitacao = ajustarFormatoLog(response.data.results);
    });

    setSolicitacoesFiltradas({
      pendentes: pendentesAutorizacaoListSolicitacao,
      questionadas: canceladasListSolicitacao,
      autorizadas: negadasListSolicitacao,
      negadas: autorizadasListSolicitacao,
      canceladas: questionamentosListSolicitacao
    });
  };

  const carregaResumoPendencias = async (values = {}) => {
    setLoadingPainelSolicitacoes(true);
    await getSolicitacoesPendentesAutorizacaoCODAESecaoPendencias(
      filtroPorVencimento,
      visao,
      prepararParametros(values)
    ).then(response => {
      const resumo = response.data.results;
      // // TODO melhorar essas duas linhas abaixo
      resumo["Kit Lanche Unificado"] = resumo["Kit Lanche Passeio Unificado"];
      delete resumo["Kit Lanche Passeio Unificado"];
      const correcaoOk = corrigeResumo(resumo);
      if (!correcaoOk) toastError("Erro na inclusão de dados da CEI");
      setResumo(resumo);
    });
    setLoadingPainelSolicitacoes(false);
  };

  const onPesquisaChanged = values => {
    carregaResumoPendencias(values);
    if (values.titulo && values.titulo.length > 2) {
      setTimeout(async () => {
        getSolicitacoesAsync({
          busca: values.titulo,
          ...prepararParametros(values)
        });
      }, 500);
    } else {
      setTimeout(async () => {
        getSolicitacoesAsync(prepararParametros(values));
      }, 500);
    }
  };

  const linkTo = link => {
    let url =
      visao === FILTRO_VISAO.POR_TIPO_SOLICITACAO ? `/${CODAE}/${link}` : "/";

    return {
      pathname: url,
      state: {
        prevPath: window.location.pathname,
        filtros: filtros
      }
    };
  };

  const prepararParametros = values => {
    setFiltros(values);
    const params = PARAMS;
    params["tipo_solicitacao"] = values.tipo_solicitacao;
    params["data_evento"] =
      values.data_evento &&
      values.data_evento
        .split("/")
        .reverse()
        .join("-");
    params["diretorias_regionais"] = values.diretorias_regionais;
    params["lotes"] = values.lotes;
    return params;
  };

  useEffect(() => {
    carregaResumoPendencias();
    getSolicitacoesAsync(PARAMS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Form
        onSubmit={() => handleSubmit}
        initialValues={{}}
        render={({ handleSubmit, values, form }) => (
          <form onSubmit={handleSubmit}>
            <Field component={"input"} type="hidden" name="uuid" />
            <CardMatriculados
              collapsed={collapsed}
              alterarCollapse={() => setCollapsed(!collapsed)}
              meusDados={meusDados}
              numeroAlunos={
                (meusDados &&
                  meusDados.vinculo_atual.instituicao.quantidade_alunos) ||
                0
              }
            />
            <div className="card mt-3">
              <div className="card-body">
                <div className="card-title font-weight-bold dashboard-card-title">
                  <div className="row">
                    <div className="col-3 mt-3 color-black">Pendências</div>
                    <div className="offset-3 col-3 my-auto">
                      <Field
                        component={StatefulMultiSelect}
                        name="diretorias_regionais"
                        selected={values.diretorias_regionais || []}
                        options={diretoriasRegionais}
                        onSelectedChanged={values_ => {
                          form.change(`diretorias_regionais`, values_);
                          onPesquisaChanged(form.getState().values);
                        }}
                        hasSelectAll
                        overrideStrings={{
                          selectSomeItems: "Filtrar por DRE",
                          allItemsAreSelected: "Todos as DREs",
                          selectAll: "Todas"
                        }}
                      />
                    </div>
                    <div className="col-3 my-auto">
                      <Field
                        component={StatefulMultiSelect}
                        name="lotes"
                        selected={values.lotes || []}
                        options={lotes}
                        onSelectedChanged={values_ => {
                          form.change(`lotes`, values_);
                          onPesquisaChanged(form.getState().values);
                        }}
                        hasSelectAll
                        overrideStrings={{
                          selectSomeItems: "Filtrar por Lote",
                          allItemsAreSelected: "Todos os lotes",
                          selectAll: "Todos"
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="pt-3" />
                <div className="row pt-3">
                  {cards.map((card, key) => {
                    return resumo[card.titulo] ? (
                      <div key={key} className="col-6 pb-3">
                        <Link to={linkTo(card.link)}>
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
                        <Link to={linkTo(card.link)}>
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
            <CardBodySemRedux
              exibirFiltrosDataEventoETipoSolicitacao={false}
              titulo={"Acompanhamento solicitações"}
              dataAtual={dataAtual()}
              onChange={() => onPesquisaChanged(values)}
              values={values}
            >
              <div className="row pb-3">
                <div className="col-6">
                  <CardStatusDeSolicitacao
                    cardTitle={"Aguardando Autorização"}
                    cardType={CARD_TYPE_ENUM.PENDENTE}
                    solicitations={solicitacoesFiltradas.pendentes}
                    icon={"fa-exclamation-triangle"}
                    href={`/${CODAE}/${SOLICITACOES_PENDENTES}`}
                  />
                </div>
                <div className="col-6">
                  <CardStatusDeSolicitacao
                    cardTitle={"Aguardando Resposta da Empresa"}
                    cardType={CARD_TYPE_ENUM.PENDENTE}
                    solicitations={solicitacoesFiltradas.questionadas}
                    icon={"fa-exclamation-triangle"}
                    href={`/${CODAE}/${SOLICITACOES_COM_QUESTIONAMENTO}`}
                  />
                </div>
              </div>
              <div className="row pb-3">
                <div className="col-6">
                  <CardStatusDeSolicitacao
                    cardTitle={"Autorizadas"}
                    cardType={CARD_TYPE_ENUM.AUTORIZADO}
                    solicitations={solicitacoesFiltradas.autorizadas}
                    icon={ICON_CARD_TYPE_ENUM.AUTORIZADO}
                    href={`/${CODAE}/${SOLICITACOES_AUTORIZADAS}`}
                  />
                </div>
                <div className="col-6">
                  <CardStatusDeSolicitacao
                    cardTitle={"Negadas"}
                    cardType={CARD_TYPE_ENUM.NEGADO}
                    solicitations={solicitacoesFiltradas.negadas}
                    icon={ICON_CARD_TYPE_ENUM.NEGADO}
                    href={`/${CODAE}/${SOLICITACOES_NEGADAS}`}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <CardStatusDeSolicitacao
                    cardTitle={"Canceladas"}
                    cardType={CARD_TYPE_ENUM.CANCELADO}
                    solicitations={solicitacoesFiltradas.canceladas}
                    icon={ICON_CARD_TYPE_ENUM.CANCELADO}
                    href={`/${CODAE}/${SOLICITACOES_CANCELADAS}`}
                  />
                </div>
              </div>
            </CardBodySemRedux>
          </form>
        )}
      />
    </div>
  );
};

export default DashboardCODAE;
