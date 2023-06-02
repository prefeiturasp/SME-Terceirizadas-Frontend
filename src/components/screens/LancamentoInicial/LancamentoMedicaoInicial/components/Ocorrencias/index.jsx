import React, { Fragment, useState } from "react";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";
import { OCORRENCIA_STATUS_DE_PROGRESSO } from "components/screens/LancamentoInicial/ConferenciaDosLancamentos/constants";
import { medicaoInicialExportarOcorrenciasPDF } from "services/relatorios";
import Botao from "components/Shareable/Botao";
import "./styles.scss";
import ModalHistorico from "components/Shareable/ModalHistorico";
import { ModalAtualizarOcorrencia } from "../ModalAtualizarOcorrencia";

export default ({
  solicitacaoMedicaoInicial,
  onClickInfoBasicas,
  setObjSolicitacaoMIFinalizada
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showModalHistorico, setShowModalHistorico] = useState(false);

  const visualizarModalHistorico = () => {
    setShowModalHistorico(true);
  };

  return (
    <>
      <ModalHistorico
        visible={showModalHistorico}
        onOk={() => setShowModalHistorico(false)}
        onCancel={() => setShowModalHistorico(false)}
        logs={solicitacaoMedicaoInicial.logs}
        solicitacaoMedicaoInicial={solicitacaoMedicaoInicial}
        titulo="Histórico do Formulário de Ocorrências"
      />
      <div className="row mb-3">
        <div className="col-12">
          <b className="section-title">Ocorrências</b>
        </div>
      </div>
      {solicitacaoMedicaoInicial && (
        <div className="row mb-3">
          <div className="col-12">
            <div className="content-section-ocorrencias">
              <div className="row">
                <div className="col-4">
                  <p className="mb-0">
                    Avaliação do Serviço:{" "}
                    <b
                      className={`${
                        solicitacaoMedicaoInicial.com_ocorrencias
                          ? "value-avaliacao-servico-red"
                          : "value-avaliacao-servico-green"
                      }`}
                    >
                      {solicitacaoMedicaoInicial.com_ocorrencias
                        ? "COM OCORRÊNCIAS"
                        : "SEM OCORRÊNCIAS"}
                    </b>
                  </p>
                </div>
                {solicitacaoMedicaoInicial.ocorrencia ? (
                  <div className="col-8 text-right">
                    <span className="status-ocorrencia text-center mr-3">
                      <b
                        className={
                          solicitacaoMedicaoInicial.ocorrencia.status ===
                          "MEDICAO_CORRECAO_SOLICITADA"
                            ? "red"
                            : ""
                        }
                      >
                        {OCORRENCIA_STATUS_DE_PROGRESSO[
                          solicitacaoMedicaoInicial.ocorrencia.status
                        ] &&
                          OCORRENCIA_STATUS_DE_PROGRESSO[
                            solicitacaoMedicaoInicial.ocorrencia.status
                          ].nome}
                      </b>
                    </span>
                    <span
                      className="download-ocorrencias"
                      onClick={() =>
                        medicaoInicialExportarOcorrenciasPDF(
                          solicitacaoMedicaoInicial.ocorrencia.ultimo_arquivo
                        )
                      }
                    >
                      <i className={`${BUTTON_ICON.DOWNLOAD} mr-2`} />
                      Formulário de Ocorrências
                    </span>
                  </div>
                ) : (
                  <div className="col-6" />
                )}
                {console.log(
                  solicitacaoMedicaoInicial,
                  "solicitacaoMedicaoInicial"
                )}
                {solicitacaoMedicaoInicial.status ===
                  "MEDICAO_CORRECAO_SOLICITADA" &&
                  solicitacaoMedicaoInicial.ocorrencia && (
                    <Fragment>
                      <div className="col-12 mt-4">
                        <p>Correções Solicitadas:</p>
                        <div className="justificativa-ocorrencia-medicao">
                          <p
                            dangerouslySetInnerHTML={{
                              __html: solicitacaoMedicaoInicial.ocorrencia.logs.find(
                                log =>
                                  log.status_evento_explicacao ===
                                  "Correção solicitada"
                              ).justificativa
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-12 mt-4">
                        <div className="float-right">
                          <Botao
                            className="ml-3"
                            texto="Histórico"
                            style={BUTTON_STYLE.GREEN_OUTLINE_WHITE}
                            onClick={() => {}}
                          />
                          <Botao
                            className="ml-3"
                            texto="Atualizar Formulário de Ocorrências"
                            style={BUTTON_STYLE.GREEN}
                            onClick={() => setShowModal(true)}
                          />
                        </div>
                      </div>
                    </Fragment>
                  )}
              </div>
              <div className="row ocorrencias-rodape">
                <Botao
                  texto="Histórico"
                  type={BUTTON_TYPE.BUTTON}
                  style={BUTTON_STYLE.GREEN_OUTLINE}
                  className="float-right m-3"
                  onClick={visualizarModalHistorico}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <ModalAtualizarOcorrencia
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        solicitacaoMedicaoInicial={solicitacaoMedicaoInicial}
        onClickInfoBasicas={onClickInfoBasicas}
        setObjSolicitacaoMIFinalizada={value =>
          setObjSolicitacaoMIFinalizada(value)
        }
      />
    </>
  );
};
