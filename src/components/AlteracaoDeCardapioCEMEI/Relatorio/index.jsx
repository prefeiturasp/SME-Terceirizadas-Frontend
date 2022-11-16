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
  BUTTON_ICON
} from "components/Shareable/Botao/constants";
import { useHistory } from "react-router-dom";
import "./style.scss";
import { CorpoRelatorio } from "./componentes/CorpoRelatorio";
import {
  justificativaAoNegarSolicitacao,
  visualizaBotoesDoFluxo
} from "helpers/utilities";
import { statusEnum, TIPO_PERFIL } from "constants/shared";
import { Form } from "react-final-form";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";

export const Relatorio = ({ ...props }) => {
  const history = useHistory();
  const {
    endpointAprovaSolicitacao,
    endpointNaoAprovaSolicitacao,
    motivosDREnaoValida,
    ModalNaoAprova,
    textoBotaoAprova,
    textoBotaoNaoAprova,
    tipoSolicitacao,
    toastAprovaMensagem,
    toastAprovaMensagemErro,
    visao
  } = props;

  const [solicitacao, setSolicitacao] = useState(undefined);
  const [matriculados, setMatriculados] = useState(undefined);
  const [dadosTabela, setDadosTabela] = useState([]);
  const [respostaSimNao, setRespostaSimNao] = useState(null);
  const [showNaoAprovaModal, setShowNaoAprovaModal] = useState(false);
  const [uuid, setUuid] = useState(null);

  const [
    justificativaCancelamentoEscola,
    setJustificativaCancelamentoEscola
  ] = useState(undefined);

  const getMatriculados = async codigo_eol => {
    const response = await getQuantidadeAlunosCEMEIporCEIEMEI(codigo_eol);
    if (response.status === HTTP_STATUS.OK) {
      setMatriculados(response.data);
    }
  };

  const getSolicitacao = async (uuid_ = uuid) => {
    const response = await getAlteracaoCEMEI(uuid_);
    if (response.status === HTTP_STATUS.OK) {
      setSolicitacao(response.data);
      setDadosTabela(formataDadosTabelaCEMEI(response.data));
      getMatriculados(response.data.escola.codigo_eol);
      const logCancelamentoEscola = response.data.logs.filter(
        log => log.status_evento_explicacao === "Escola cancelou"
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
      TIPO_PERFIL.TERCEIRIZADA
    ].includes(tipoPerfil) &&
      textoBotaoAprova) ||
    (solicitacao &&
      (solicitacao.prioridade === "REGULAR" ||
        [
          statusEnum.TERCEIRIZADA_RESPONDEU_QUESTIONAMENTO,
          statusEnum.CODAE_AUTORIZADO
        ].includes(solicitacao.status)) &&
      textoBotaoAprova);

  const onSubmit = async values => {
    endpointAprovaSolicitacao(uuid, values, tipoSolicitacao).then(
      response => {
        if (response.status === HTTP_STATUS.OK) {
          toastSuccess(toastAprovaMensagem);
          getSolicitacao();
        } else if (response.status === HTTP_STATUS.BAD_REQUEST) {
          toastError(toastAprovaMensagemErro);
        }
      },
      function() {
        toastError(toastAprovaMensagemErro);
      }
    );
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setUuid(urlParams.get("uuid"));
    getSolicitacao(urlParams.get("uuid"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Spin
      tip="Carregando..."
      spinning={!solicitacao || !dadosTabela || !matriculados}
    >
      {solicitacao && dadosTabela && matriculados && (
        <>
          <Form onSubmit={onSubmit}>
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <div className="row mt-3">
                  <div className="col-10">
                    <h1 className="page-title mt-0">
                      Alteração do Tipo de Alimentação - Solicitação #{" "}
                      {solicitacao.id_externo}
                    </h1>
                  </div>
                  <div className="col-2">
                    <Botao
                      texto="Voltar"
                      titulo="Voltar"
                      type={BUTTON_TYPE.BUTTON}
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                      icon={BUTTON_ICON.ARROW_LEFT}
                      className="float-right"
                      onClick={() => history.goBack()}
                    />
                  </div>
                </div>
                <div className="card style-padrao-inclusao-cei">
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
                          {EXIBIR_BOTAO_APROVAR &&
                            (textoBotaoAprova !== "Ciente" &&
                              (visao === CODAE &&
                              solicitacao.logs.filter(
                                log =>
                                  log.status_evento_explicacao ===
                                    "Terceirizada respondeu questionamento" &&
                                  !log.resposta_sim_nao
                              ).length > 0 ? null : (
                                <Botao
                                  texto={textoBotaoAprova}
                                  type={BUTTON_TYPE.SUBMIT}
                                  style={BUTTON_STYLE.GREEN}
                                  className="ml-3"
                                />
                              )))}
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
                        </div>
                      </div>
                    )}
                    {solicitacao &&
                      justificativaAoNegarSolicitacao(solicitacao.logs) && (
                        <div className="row">
                          <div className="col-12 report-label-value">
                            <p>Justificativa da negação</p>
                            <p
                              className="value"
                              dangerouslySetInnerHTML={{
                                __html: justificativaAoNegarSolicitacao(
                                  solicitacao.logs
                                )
                              }}
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
