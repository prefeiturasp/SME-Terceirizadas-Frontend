import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { getInclusaoCEMEI } from "services/inclusaoDeAlimentacao";
import { CorpoRelatorio } from "./componentes/CorpoRelatorio";
import { getVinculosTipoAlimentacaoPorEscola } from "services/cadastroTipoAlimentacao.service";
import { visualizaBotoesDoFluxo } from "helpers/utilities";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";
import { statusEnum, TIPO_PERFIL } from "constants/shared";
import { CODAE, TERCEIRIZADA } from "configs/constants";
import RelatorioHistoricoJustificativaEscola from "components/Shareable/RelatorioHistoricoJustificativaEscola";
import { Form } from "react-final-form";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";

export const RelatorioInclusaoDeAlimentacaoCEMEI = ({ ...props }) => {
  const [uuid, setUuid] = useState(null);
  const [solicitacao, setSolicitacao] = useState(null);
  const [vinculos, setVinculos] = useState(null);
  const [respostaSimNao, setRespostaSimNao] = useState(null);
  const [showNaoAprovaModal, setShowNaoAprovaModal] = useState(false);

  const {
    endpointAprovaSolicitacao,
    endpointNaoAprovaSolicitacao,
    motivosDREnaoValida,
    ModalNaoAprova,
    textoBotaoAprova,
    textoBotaoNaoAprova,
    visao,
    tipoSolicitacao,
    toastAprovaMensagem,
    toastAprovaMensagemErro
  } = props;

  const getVinculosTipoAlimentacaoPorEscolaAsync = async escola => {
    const response = await getVinculosTipoAlimentacaoPorEscola(escola.uuid);
    if (response.status === HTTP_STATUS.OK) {
      setVinculos(response.data.results);
    }
  };

  const getInclusaoCEMEIAsync = async (uuid_ = uuid) => {
    const response = await getInclusaoCEMEI(uuid_);
    if (response.status === HTTP_STATUS.OK) {
      setSolicitacao(response.data);
      if (!vinculos) {
        getVinculosTipoAlimentacaoPorEscolaAsync(response.data.escola);
      }
    }
  };

  const onSubmit = values => {
    endpointAprovaSolicitacao(uuid, values.justificativa, tipoSolicitacao).then(
      response => {
        if (response.status === HTTP_STATUS.OK) {
          toastSuccess(toastAprovaMensagem);
          getInclusaoCEMEIAsync();
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
    getInclusaoCEMEIAsync(urlParams.get("uuid"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const EXIBIR_BOTAO_NAO_APROVAR =
    visao !== TERCEIRIZADA ||
    (solicitacao &&
      solicitacao.prioridade !== "REGULAR" &&
      solicitacao.status === statusEnum.CODAE_QUESTIONADO &&
      textoBotaoNaoAprova);

  const tipoPerfil = localStorage.getItem("tipo_perfil");
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

  return (
    <Spin tip="Carregando..." spinning={!solicitacao || !vinculos}>
      {solicitacao && vinculos && (
        <Form onSubmit={onSubmit}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className="report">
                <span className="page-title">{`Inclusão de Alimentação - Solicitação # ${
                  solicitacao.id_externo
                }`}</span>
                <div className="card mt-3">
                  <div className="card-body">
                    <CorpoRelatorio
                      solicitacao={solicitacao}
                      vinculos={vinculos}
                    />
                    {visualizaBotoesDoFluxo(solicitacao) && (
                      <>
                        <div className="form-group row float-right mt-4">
                          {EXIBIR_BOTAO_NAO_APROVAR && (
                            <Botao
                              texto={textoBotaoNaoAprova}
                              className="float-right"
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
                              loadSolicitacao={getInclusaoCEMEIAsync}
                              tipoSolicitacao={tipoSolicitacao}
                            />
                          )}
                        </div>
                      </>
                    )}
                    {solicitacao.dias_motivos_da_inclusao_cemei.find(
                      inclusao => inclusao.cancelado
                    ) && (
                      <>
                        <hr />
                        <p>
                          <strong>Histórico de cancelamento parcial</strong>
                          {solicitacao.dias_motivos_da_inclusao_cemei
                            .filter(inclusao => inclusao.cancelado)
                            .map((inclusao, key) => {
                              return (
                                <div key={key}>
                                  {inclusao.data}
                                  {" - "}
                                  {inclusao.cancelado_justificativa}
                                </div>
                              );
                            })}
                        </p>
                      </>
                    )}
                    <RelatorioHistoricoJustificativaEscola
                      solicitacao={solicitacao}
                    />
                  </div>
                </div>
              </div>
            </form>
          )}
        </Form>
      )}
    </Spin>
  );
};
