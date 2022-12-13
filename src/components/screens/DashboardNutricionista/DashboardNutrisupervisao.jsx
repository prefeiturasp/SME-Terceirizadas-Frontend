import MeusDadosContext from "context/MeusDadosContext";
import React, { useContext, useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import {
  NUTRISUPERVISAO,
  SOLICITACOES_AUTORIZADAS,
  SOLICITACOES_CANCELADAS,
  SOLICITACOES_COM_QUESTIONAMENTO,
  SOLICITACOES_NEGADAS,
  SOLICITACOES_PENDENTES
} from "configs/constants";
import { dataAtual } from "helpers/utilities";
import CardBody from "components/Shareable/CardBody";
import CardMatriculados from "components/Shareable/CardMatriculados";
import CardStatusDeSolicitacao, {
  CARD_TYPE_ENUM,
  ICON_CARD_TYPE_ENUM
} from "components/Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import "./style.scss";
import {
  getSolicitacoesAutorizadasNutrisupervisao,
  getSolicitacoesCanceladasNutrisupervisao,
  getSolicitacoesComQuestionamentoNutrisupervisao,
  getSolicitacoesNegadasNutrisupervisao,
  getSolicitacoesPendentesAutorizacaoNutrisupervisaoSemFiltro
} from "services/painelNutricionista.service";
import { PAGINACAO_DASHBOARD_DEFAULT } from "constants/shared";
import { Spin } from "antd";
import { ajustarFormatoLog } from "../helper";

export const DashboardNutrisupervisao = () => {
  const [canceladas, setCanceladas] = useState(null);
  const [negadas, setNegadas] = useState(null);
  const [autorizadas, setAutorizadas] = useState(null);
  const [aguardandoAutorizacao, setAguardandoAutorizacao] = useState(null);
  const [aguardandoRespostaEmpresa, setAguardandoRespostaEmpresa] = useState(
    null
  );
  const [erro, setErro] = useState("");

  const { meusDados } = useContext(MeusDadosContext);

  const LOADING =
    !canceladas ||
    !negadas ||
    !autorizadas ||
    !aguardandoAutorizacao ||
    !aguardandoRespostaEmpresa;
  const PARAMS = { limit: PAGINACAO_DASHBOARD_DEFAULT, offset: 0 };

  const getSolicitacoesAsync = async (params = null) => {
    const response = await getSolicitacoesCanceladasNutrisupervisao(params);
    if (response.status === HTTP_STATUS.OK) {
      setCanceladas(ajustarFormatoLog(response.data.results));
    } else {
      setErro("Erro ao carregar solicitações canceladas");
    }

    const responseNegadas = await getSolicitacoesNegadasNutrisupervisao(params);
    if (responseNegadas.status === HTTP_STATUS.OK) {
      setNegadas(ajustarFormatoLog(responseNegadas.data.results));
    } else {
      setErro("Erro ao carregar solicitações negadas");
    }

    const responseAutorizadas = await getSolicitacoesAutorizadasNutrisupervisao(
      params
    );
    if (responseAutorizadas.status === HTTP_STATUS.OK) {
      setAutorizadas(ajustarFormatoLog(responseAutorizadas.data.results));
    } else {
      setErro("Erro ao carregar solicitações autorizadas");
    }

    const responseAguardandoAutorizacao = await getSolicitacoesPendentesAutorizacaoNutrisupervisaoSemFiltro(
      params
    );
    if (responseAguardandoAutorizacao.status === HTTP_STATUS.OK) {
      setAguardandoAutorizacao(
        ajustarFormatoLog(responseAguardandoAutorizacao.data.results)
      );
    } else {
      setErro("Erro ao carregar solicitações aguardando autorização");
    }

    const responseAguardandoRespostaEmpresa = await getSolicitacoesComQuestionamentoNutrisupervisao(
      params
    );
    if (responseAguardandoRespostaEmpresa.status === HTTP_STATUS.OK) {
      setAguardandoRespostaEmpresa(
        ajustarFormatoLog(responseAguardandoRespostaEmpresa.data.results)
      );
    } else {
      setErro("Erro ao carregar solicitações aguardando resposta da empresa");
    }
  };

  useEffect(() => {
    getSolicitacoesAsync(PARAMS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const prepararParametros = values => {
    const params = PARAMS;
    params["tipo_solicitacao"] = values.tipo_solicitacao;
    params["data_evento"] =
      values.data_evento &&
      values.data_evento
        .split("/")
        .reverse()
        .join("-");
    return params;
  };

  const onPesquisaChanged = values => {
    if (values.titulo && values.titulo.length > 2) {
      getSolicitacoesAsync({
        busca: values.titulo,
        ...prepararParametros(values)
      });
    } else {
      getSolicitacoesAsync(prepararParametros(values));
    }
  };

  return (
    <div>
      {erro && <div>{erro}</div>}
      {!erro && (
        <Spin tip="Carregando..." spinning={LOADING}>
          {meusDados && (
            <CardMatriculados
              meusDados={meusDados}
              numeroAlunos={
                meusDados.vinculo_atual.instituicao.quantidade_alunos
              }
            />
          )}
          {!LOADING && (
            <CardBody
              exibirFiltrosDataEventoETipoSolicitacao={true}
              titulo={"Acompanhamento solicitações"}
              dataAtual={dataAtual()}
              onChange={onPesquisaChanged}
            >
              <div className="row pb-3">
                <div className="col-6">
                  <CardStatusDeSolicitacao
                    cardTitle={"Aguardando Autorização"}
                    cardType={CARD_TYPE_ENUM.PENDENTE}
                    solicitations={aguardandoAutorizacao}
                    icon={"fa-exclamation-triangle"}
                    href={`/${NUTRISUPERVISAO}/${SOLICITACOES_PENDENTES}`}
                  />
                </div>
                <div className="col-6">
                  <CardStatusDeSolicitacao
                    cardTitle={"Aguardando Resposta da Empresa"}
                    cardType={CARD_TYPE_ENUM.PENDENTE}
                    solicitations={aguardandoRespostaEmpresa}
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
                    solicitations={autorizadas}
                    icon={ICON_CARD_TYPE_ENUM.AUTORIZADO}
                    href={`/${NUTRISUPERVISAO}/${SOLICITACOES_AUTORIZADAS}`}
                  />
                </div>
                <div className="col-6">
                  <CardStatusDeSolicitacao
                    cardTitle={"Negadas"}
                    cardType={CARD_TYPE_ENUM.NEGADO}
                    solicitations={negadas}
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
                    solicitations={canceladas}
                    icon={ICON_CARD_TYPE_ENUM.CANCELADO}
                    href={`/${NUTRISUPERVISAO}/${SOLICITACOES_CANCELADAS}`}
                  />
                </div>
              </div>
            </CardBody>
          )}
        </Spin>
      )}
    </div>
  );
};
