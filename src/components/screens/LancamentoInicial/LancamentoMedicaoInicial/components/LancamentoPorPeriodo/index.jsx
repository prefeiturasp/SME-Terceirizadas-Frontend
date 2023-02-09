import React, { useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import Botao from "components/Shareable/Botao";
import { BUTTON_STYLE } from "components/Shareable/Botao/constants";
import { ModalFinalizarMedicao } from "../ModalFinalizarMedicao";

import CardLancamento from "./CardLancamento";
import { CORES } from "./helpers";
import { getPeriodosInclusaoContinua } from "services/medicaoInicial/periodoLancamentoMedicao.service";
import { medicaoInicialExportarOcorrenciasPDF } from "services/relatorios";
import { PERFIL } from "constants/shared";
import { toastError } from "components/Shareable/Toast/dialogs";

export default ({
  escolaInstituicao,
  periodosEscolaSimples,
  solicitacaoMedicaoInicial,
  onClickInfoBasicas,
  periodoSelecionado,
  mes,
  ano
}) => {
  const [showModalFinalizarMedicao, setShowModalFinalizarMedicao] = useState(
    false
  );
  const [objSolicitacaoMIFinalizada, setObjSolicitacaoMIFinalizada] = useState({
    anexo: null,
    status: null
  });
  const [periodosInclusaoContinua, setPeriodosInclusaoContinua] = useState(
    undefined
  );
  const [erroAPI, setErroAPI] = useState("");

  const getPeriodosInclusaoContinuaAsync = async () => {
    const response = await getPeriodosInclusaoContinua({
      mes,
      ano
    });
    if (response.status === HTTP_STATUS.OK) {
      setPeriodosInclusaoContinua(response.data.periodos);
    } else {
      setErroAPI(
        "Erro ao carregar períodos de inclusão contínua. Tente novamente mais tarde."
      );
    }
  };

  useEffect(() => {
    getPeriodosInclusaoContinuaAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [periodoSelecionado]);

  const getPathPlanilhaOcorr = () => {
    if (objSolicitacaoMIFinalizada.anexo)
      return objSolicitacaoMIFinalizada.anexo.arquivo;
    if (solicitacaoMedicaoInicial && solicitacaoMedicaoInicial.anexo)
      return solicitacaoMedicaoInicial.anexo.arquivo;
  };

  const pdfOcorrenciasMedicaoFinalizada = () => {
    if (solicitacaoMedicaoInicial.anexos) {
      const pdfAnexo = solicitacaoMedicaoInicial.anexos.find(anexo =>
        anexo.arquivo.includes(".pdf")
      );
      if (pdfAnexo) {
        medicaoInicialExportarOcorrenciasPDF(pdfAnexo.arquivo);
      } else {
        toastError("Arquivo PDF de ocorrências não encontrado");
      }
    }
  };

  const renderBotaoExportarPlanilha = () => {
    if (objSolicitacaoMIFinalizada.anexo) return true;
    if (solicitacaoMedicaoInicial && solicitacaoMedicaoInicial.anexo) {
      return true;
    } else {
      return false;
    }
  };

  const renderBotaoExportarPDF = () => {
    if (solicitacaoMedicaoInicial) {
      return true;
    }
    if (objSolicitacaoMIFinalizada.status) {
      return true;
    } else {
      return false;
    }
  };

  const renderBotaoFinalizar = () => {
    if (!solicitacaoMedicaoInicial) {
      return false;
    }
    if (solicitacaoMedicaoInicial) {
      return ![
        String(solicitacaoMedicaoInicial.status),
        String(objSolicitacaoMIFinalizada.status)
      ].includes("MEDICAO_ENCERRADA_PELA_CODAE");
    } else {
      return (
        String(objSolicitacaoMIFinalizada.status) !==
        "MEDICAO_ENCERRADA_PELA_CODAE"
      );
    }
  };

  return (
    <div>
      {erroAPI && <div>{erroAPI}</div>}
      {!erroAPI && (
        <>
          <div className="row pb-2">
            <div className="col">
              <b className="section-title">
                Selecione período para lançamento da Medição
              </b>
            </div>
          </div>
          {periodosEscolaSimples.map((periodo, index) => (
            <CardLancamento
              key={index}
              textoCabecalho={periodo.periodo_escolar.nome}
              cor={CORES[index]}
              totalAlimentacoes={0}
              tipos_alimentacao={periodo.tipos_alimentacao}
              periodoSelecionado={periodoSelecionado}
              solicitacaoMedicaoInicial={solicitacaoMedicaoInicial}
              objSolicitacaoMIFinalizada={objSolicitacaoMIFinalizada}
            />
          ))}
          {periodosInclusaoContinua &&
            Object.keys(periodosInclusaoContinua).map((periodo, index) => {
              return (
                <CardLancamento
                  key={index}
                  grupo="Programas e Projetos"
                  textoCabecalho={periodo}
                  cor={CORES[4]}
                  totalAlimentacoes={0}
                  tipos_alimentacao={
                    periodosEscolaSimples.find(
                      p => p.periodo_escolar.nome === periodo
                    ).tipos_alimentacao
                  }
                  periodoSelecionado={periodoSelecionado}
                  solicitacaoMedicaoInicial={solicitacaoMedicaoInicial}
                  objSolicitacaoMIFinalizada={objSolicitacaoMIFinalizada}
                />
              );
            })}
          <div className="row mt-4">
            <div className="col">
              {renderBotaoFinalizar() ? (
                <Botao
                  texto="Finalizar"
                  style={BUTTON_STYLE.GREEN}
                  className="float-right"
                  disabled={
                    ![PERFIL.DIRETOR, PERFIL.DIRETOR_CEI].includes(
                      localStorage.getItem("perfil")
                    )
                  }
                  onClick={() => setShowModalFinalizarMedicao(true)}
                />
              ) : (
                <>
                  {renderBotaoExportarPlanilha() && (
                    <a href={getPathPlanilhaOcorr()}>
                      <Botao
                        texto="Exportar Planilha de Ocorrências"
                        style={BUTTON_STYLE.GREEN_OUTLINE}
                        className="float-right ml-4"
                      />
                    </a>
                  )}
                  {renderBotaoExportarPDF() && (
                    <>
                      <Botao
                        texto="Exportar PDF"
                        style={BUTTON_STYLE.GREEN_OUTLINE}
                        className="float-right"
                        onClick={() => {}}
                      />
                      <Botao
                        texto="Exportar Ocorrências"
                        style={BUTTON_STYLE.GREEN_OUTLINE}
                        className="float-right mr-2"
                        onClick={() => pdfOcorrenciasMedicaoFinalizada()}
                      />
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          <ModalFinalizarMedicao
            showModal={showModalFinalizarMedicao}
            closeModal={() => setShowModalFinalizarMedicao(false)}
            setObjSolicitacaoMIFinalizada={setObjSolicitacaoMIFinalizada}
            escolaInstituicao={escolaInstituicao}
            solicitacaoMedicaoInicial={solicitacaoMedicaoInicial}
            onClickInfoBasicas={onClickInfoBasicas}
          />
        </>
      )}
    </div>
  );
};
