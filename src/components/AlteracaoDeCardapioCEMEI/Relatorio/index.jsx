import { Spin } from "antd";
import HTTP_STATUS from "http-status-codes";
import React, { useEffect, useState } from "react";
import { getAlteracaoCEMEI } from "services/alteracaoDeCardapio";
import { getQuantidadeAlunosCEMEIporCEIEMEI } from "services/aluno.service";
import { formataDadosTabelaCEMEI } from "../helpers";
import { CODAE, TERCEIRIZADA } from "configs/constants";
import { Botao } from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";
import "./style.scss";
import { CorpoRelatorio } from "./componentes/CorpoRelatorio";
import { visualizaBotoesDoFluxo } from "helpers/utilities";
import { statusEnum, TIPO_PERFIL } from "constants/shared";
import { Form } from "react-final-form";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import ModalMarcarConferencia from "components/Shareable/ModalMarcarConferencia";
import { ModalAprovarSolicitacaoAlteracao } from "./componentes/ModalAprovarSolicitacaoAlteracao";

export const Relatorio = ({ ...props }) => {
  const {
    endpointAprovaSolicitacao,
    endpointNaoAprovaSolicitacao,
    endpointQuestionamento,
    motivosDREnaoValida,
    ModalNaoAprova,
    ModalQuestionamento,
    textoBotaoAprova,
    textoBotaoNaoAprova,
    tipoSolicitacao,
    toastAprovaMensagem,
    toastAprovaMensagemErro,
    visao,
  } = props;

  const [solicitacao, setSolicitacao] = useState(undefined);
  const [matriculados, setMatriculados] = useState(undefined);
  const [dadosTabela, setDadosTabela] = useState([]);
  const [respostaSimNao, setRespostaSimNao] = useState(null);
  const [showNaoAprovaModal, setShowNaoAprovaModal] = useState(false);
  const [showQuestionamentoModal, setShowQuestionamentoModal] = useState(false);
  const [showModalMarcarConferencia, setShowModalMarcarConferencia] =
    useState(false);
  const [uuid, setUuid] = useState(null);

  const [justificativaCancelamentoEscola, setJustificativaCancelamentoEscola] =
    useState(undefined);

  const getMatriculados = async (codigo_eol) => {
    const response = await getQuantidadeAlunosCEMEIporCEIEMEI(codigo_eol);
    if (response.status === HTTP_STATUS.OK) {
      setMatriculados(response.data);
    }
  };

  const [showModalObservacaoCodae, setShowModalObservacaoCodae] =
    useState(false);

  const getSolicitacao = async (uuid_ = uuid) => {
    const response = await getAlteracaoCEMEI(uuid_);
    if (response.status === HTTP_STATUS.OK) {
      setSolicitacao(response.data);
      setDadosTabela(formataDadosTabelaCEMEI(response.data));
      getMatriculados(response.data.escola.codigo_eol);
      const logCancelamentoEscola = response.data.logs.filter(
        (log) => log.status_evento_explicacao === "Escola cancelou"
      );
      setJustificativaCancelamentoEscola(logCancelamentoEscola);
    }
  };

  const tipoPerfil = localStorage.getItem("tipo_perfil");
  const EXIBIR_BOTAO_NAO_APROVAR =
    visao !== TERCEIRIZADA ||
    (solicitacao &&
      solicitacao.prioridade !== "REGULAR" &&
      solicitacao.status === statusEnum.CODAE_QUESTIONADO &&
      textoBotaoNaoAprova);

  const EXIBIR_BOTAO_APROVAR =
    (![
      TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA,
      TIPO_PERFIL.TERCEIRIZADA,
    ].includes(tipoPerfil) &&
      textoBotaoAprova) ||
    (solicitacao &&
      (solicitacao.prioridade === "REGULAR" ||
        [
          statusEnum.TERCEIRIZADA_RESPONDEU_QUESTIONAMENTO,
          statusEnum.CODAE_AUTORIZADO,
        ].includes(solicitacao.status)) &&
      textoBotaoAprova);

  const EXIBIR_BOTAO_QUESTIONAMENTO =
    [
      TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA,
      TIPO_PERFIL.TERCEIRIZADA,
    ].includes(tipoPerfil) &&
    solicitacao &&
    (solicitacao.prioridade !== "REGULAR" ||
      (visao === CODAE && solicitacao.prioridade !== "REGULAR")) &&
    [statusEnum.DRE_VALIDADO, statusEnum.CODAE_QUESTIONADO].includes(
      solicitacao.status
    );

  const EXIBIR_BOTAO_MARCAR_CONFERENCIA =
    visao === TERCEIRIZADA &&
    solicitacao &&
    [statusEnum.CODAE_AUTORIZADO, statusEnum.ESCOLA_CANCELOU].includes(
      solicitacao.status
    );

  const onSubmit = async (values) => {
    endpointAprovaSolicitacao(uuid, values, tipoSolicitacao).then(
      (response) => {
        if (response.status === HTTP_STATUS.OK) {
          toastSuccess(toastAprovaMensagem);
          getSolicitacao();
        } else if (response.status === HTTP_STATUS.BAD_REQUEST) {
          toastError(toastAprovaMensagemErro);
        }
      },
      function () {
        toastError(toastAprovaMensagemErro);
      }
    );
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setUuid(urlParams.get("uuid"));
    getSolicitacao(urlParams.get("uuid"));
  }, []);

  return (
    <Spin
      tip="Carregando..."
      spinning={!solicitacao || !dadosTabela || !matriculados}
    >
      {solicitacao && dadosTabela && matriculados && (
        <>
          <Form onSubmit={onSubmit}>
            {({ handleSubmit, form }) => (
              <form onSubmit={handleSubmit}>
                <span className="page-title">{`Alteração do Tipo de Alimentação - Solicitação # ${solicitacao.id_externo}`}</span>
                <div className="card style-padrao-inclusao-cei mt-3">
                  <div className="card-body">
                    <CorpoRelatorio
                      solicitacao={solicitacao}
                      dadosTabela={dadosTabela}
                      matriculados={matriculados}
                      justificativaCancelamentoEscola={
                        justificativaCancelamentoEscola
                      }
                    />
                    {visualizaBotoesDoFluxo(solicitacao) && (
                      <div className="row">
                        <div className="col-12 text-right">
                          {EXIBIR_BOTAO_NAO_APROVAR && (
                            <Botao
                              texto={textoBotaoNaoAprova}
                              type={BUTTON_TYPE.BUTTON}
                              style={BUTTON_STYLE.GREEN_OUTLINE}
                              onClick={() => {
                                setRespostaSimNao("Não");
                                setShowNaoAprovaModal(true);
                              }}
                            />
                          )}
                          {EXIBIR_BOTAO_QUESTIONAMENTO && (
                            <Botao
                              texto={
                                tipoPerfil ===
                                TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA
                                  ? "Questionar"
                                  : "Sim"
                              }
                              type={BUTTON_TYPE.BUTTON}
                              onClick={() => {
                                setRespostaSimNao("Sim");
                                setShowQuestionamentoModal(true);
                              }}
                              style={BUTTON_STYLE.GREEN}
                              className="ml-3"
                            />
                          )}
                          {EXIBIR_BOTAO_APROVAR &&
                            textoBotaoAprova !== "Ciente" &&
                            (visao === CODAE &&
                            solicitacao.logs.filter(
                              (log) =>
                                log.status_evento_explicacao ===
                                  "Terceirizada respondeu questionamento" &&
                                !log.resposta_sim_nao
                            ).length > 0 ? null : (
                              <Botao
                                texto={textoBotaoAprova}
                                type={BUTTON_TYPE.BUTTON}
                                style={BUTTON_STYLE.GREEN}
                                onClick={() => {
                                  tipoPerfil ===
                                  TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA
                                    ? setShowModalObservacaoCodae(true)
                                    : form.submit();
                                }}
                                className="ml-3"
                              />
                            ))}
                          {EXIBIR_BOTAO_MARCAR_CONFERENCIA && (
                            <div className="form-group float-end mt-4">
                              {solicitacao.terceirizada_conferiu_gestao ? (
                                <label className="ml-3 conferido">
                                  <i className="fas fa-check mr-2" />
                                  Solicitação Conferida
                                </label>
                              ) : (
                                <Botao
                                  texto="Marcar Conferência"
                                  type={BUTTON_TYPE.BUTTON}
                                  style={BUTTON_STYLE.GREEN}
                                  className="ml-3"
                                  onClick={() => {
                                    setShowModalMarcarConferencia(true);
                                  }}
                                />
                              )}
                            </div>
                          )}
                          <ModalMarcarConferencia
                            showModal={showModalMarcarConferencia}
                            closeModal={() =>
                              setShowModalMarcarConferencia(false)
                            }
                            onMarcarConferencia={() => {
                              getSolicitacao();
                            }}
                            uuid={solicitacao.uuid}
                            endpoint={"alteracoes-cardapio-cemei"}
                          />
                          {ModalNaoAprova && (
                            <ModalNaoAprova
                              showModal={showNaoAprovaModal}
                              closeModal={() => setShowNaoAprovaModal(false)}
                              motivosDREnaoValida={motivosDREnaoValida}
                              endpoint={endpointNaoAprovaSolicitacao}
                              uuid={solicitacao.uuid}
                              solicitacao={solicitacao}
                              resposta_sim_nao={respostaSimNao}
                              loadSolicitacao={getSolicitacao}
                              tipoSolicitacao={tipoSolicitacao}
                            />
                          )}
                          {ModalQuestionamento && (
                            <ModalQuestionamento
                              closeModal={() =>
                                setShowQuestionamentoModal(false)
                              }
                              showModal={showQuestionamentoModal}
                              loadSolicitacao={getSolicitacao}
                              resposta_sim_nao={respostaSimNao}
                              endpoint={endpointQuestionamento}
                              tipoSolicitacao={tipoSolicitacao}
                              solicitacao={solicitacao}
                            />
                          )}
                          <ModalAprovarSolicitacaoAlteracao
                            closeModal={() =>
                              setShowModalObservacaoCodae(false)
                            }
                            showModal={showModalObservacaoCodae}
                            loadSolicitacao={getSolicitacao}
                            endpoint={endpointAprovaSolicitacao}
                            tipoSolicitacao={tipoSolicitacao}
                            solicitacao={solicitacao}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </form>
            )}
          </Form>
        </>
      )}
    </Spin>
  );
};
