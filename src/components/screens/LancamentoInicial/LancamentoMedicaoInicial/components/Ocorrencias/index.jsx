import React, { useState } from "react";
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

export default ({ solicitacaoMedicaoInicial }) => {
  const anexoPdfOcorrencia = solicitacaoMedicaoInicial => {
    return solicitacaoMedicaoInicial.anexos.find(
      anexo => anexo.extensao === ".pdf"
    );
  };

  const [showModal, setShowModal] = useState(false);

  const visualizarModal = () => {
    setShowModal(true);
  };

  return (
    <>
      <ModalHistorico
        visible={showModal}
        onOk={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
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
                {solicitacaoMedicaoInicial.com_ocorrencias ? (
                  <div className="col-8 text-right">
                    <span className="status-ocorrencia text-center mr-3">
                      <b
                        className={
                          anexoPdfOcorrencia(solicitacaoMedicaoInicial)
                            .status === "MEDICAO_CORRECAO_SOLICITADA"
                            ? "red"
                            : ""
                        }
                      >
                        {OCORRENCIA_STATUS_DE_PROGRESSO[
                          anexoPdfOcorrencia(solicitacaoMedicaoInicial).status
                        ] &&
                          OCORRENCIA_STATUS_DE_PROGRESSO[
                            anexoPdfOcorrencia(solicitacaoMedicaoInicial).status
                          ].nome}
                      </b>
                    </span>
                    <span
                      className="download-ocorrencias"
                      onClick={() =>
                        medicaoInicialExportarOcorrenciasPDF(
                          anexoPdfOcorrencia(solicitacaoMedicaoInicial).arquivo
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
              </div>
              <div className="row ocorrencias-rodape">
                <Botao
                  texto="Histórico"
                  type={BUTTON_TYPE.BUTTON}
                  style={BUTTON_STYLE.GREEN_OUTLINE}
                  className="float-right m-3"
                  onClick={visualizarModal}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
