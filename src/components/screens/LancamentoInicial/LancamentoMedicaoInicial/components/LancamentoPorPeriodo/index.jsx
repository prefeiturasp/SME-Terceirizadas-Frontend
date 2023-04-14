import React, { useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { ModalFinalizarMedicao } from "../ModalFinalizarMedicao";
import CardLancamento from "./CardLancamento";
import Botao from "components/Shareable/Botao";
import { BUTTON_STYLE } from "components/Shareable/Botao/constants";
import { toastError } from "components/Shareable/Toast/dialogs";
import {
  getPeriodosInclusaoContinua,
  getSolicitacoesKitLanchesAutorizadasEscola,
  getSolicitacoesAlteracoesAlimentacaoAutorizadasEscola,
  getSolicitacoesInclusoesEtecAutorizadasEscola
} from "services/medicaoInicial/periodoLancamentoMedicao.service";
import { medicaoInicialExportarOcorrenciasPDF } from "services/relatorios";
import { getQuantidadeAlimentacoesLancadasPeriodoGrupo } from "services/medicaoInicial/solicitacaoMedicaoInicial.service";
import { CORES } from "./helpers";
import { usuarioEhEscolaTerceirizadaDiretor } from "helpers/utilities";
import { tiposAlimentacaoETEC } from "helpers/utilities";

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
  const [
    solicitacoesKitLanchesAutorizadas,
    setSolicitacoesKitLanchesAutorizadas
  ] = useState(undefined);
  const [
    solicitacoesAlteracaoLancheEmergencialAutorizadas,
    setSolicitacoesAlteracaoLancheEmergencialAutorizadas
  ] = useState(undefined);
  const [
    solicitacoesInclusoesEtecAutorizadas,
    setSolicitacoesInclusoesEtecAutorizadas
  ] = useState(undefined);
  const [
    quantidadeAlimentacoesLancadas,
    setQuantidadeAlimentacoesLancadas
  ] = useState(undefined);
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

  const getSolicitacoesKitLanchesAutorizadasAsync = async () => {
    const escola_uuid = escolaInstituicao.uuid;
    const tipo_solicitacao = "Kit Lanche";
    const response = await getSolicitacoesKitLanchesAutorizadasEscola({
      escola_uuid,
      mes,
      ano,
      tipo_solicitacao
    });
    if (response.status === HTTP_STATUS.OK) {
      setSolicitacoesKitLanchesAutorizadas(response.data.results);
    } else {
      setErroAPI(
        "Erro ao carregar Kit Lanches Autorizadas. Tente novamente mais tarde."
      );
    }
  };

  const getSolicitacoesAlteracaoLancheEmergencialAutorizadasAsync = async () => {
    const params = {};
    params["escola_uuid"] = escolaInstituicao.uuid;
    params["tipo_solicitacao"] = "Alteração";
    params["mes"] = mes;
    params["ano"] = ano;
    params["eh_lanche_emergencial"] = true;
    const response = await getSolicitacoesAlteracoesAlimentacaoAutorizadasEscola(
      params
    );
    if (response.status === HTTP_STATUS.OK) {
      setSolicitacoesAlteracaoLancheEmergencialAutorizadas(
        response.data.results
      );
    } else {
      setErroAPI(
        "Erro ao carregar Alteração de Lanche Emergencial Autorizadas. Tente novamente mais tarde."
      );
    }
  };

  const getSolicitacoesInclusoesEtecAutorizadasAsync = async () => {
    const escola_uuid = escolaInstituicao.uuid;
    const tipo_solicitacao = "Inclusão de";
    const response = await getSolicitacoesInclusoesEtecAutorizadasEscola({
      escola_uuid,
      mes,
      ano,
      tipo_solicitacao
    });
    if (response.status === HTTP_STATUS.OK) {
      setSolicitacoesInclusoesEtecAutorizadas(response.data.results);
    } else {
      setErroAPI(
        "Erro ao carregar Inclusões ETEC Autorizadas. Tente novamente mais tarde."
      );
    }
  };

  const getQuantidadeAlimentacoesLancadasPeriodoGrupoAsync = async () => {
    const params = { uuid_solicitacao: solicitacaoMedicaoInicial.uuid };
    const response = await getQuantidadeAlimentacoesLancadasPeriodoGrupo(
      params
    );
    if (response.status === HTTP_STATUS.OK) {
      setQuantidadeAlimentacoesLancadas(response.data.results);
    } else {
      toastError(
        "Erro ao carregar quantidades de alimentações lançadas. Tente novamente mais tarde."
      );
    }
  };

  useEffect(() => {
    getPeriodosInclusaoContinuaAsync();
    getSolicitacoesKitLanchesAutorizadasAsync();
    getSolicitacoesAlteracaoLancheEmergencialAutorizadasAsync();
    getSolicitacoesInclusoesEtecAutorizadasAsync();
    getQuantidadeAlimentacoesLancadasPeriodoGrupoAsync();
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
    return (
      solicitacaoMedicaoInicial.status ===
      "MEDICAO_EM_ABERTO_PARA_PREENCHIMENTO_UE"
    );
  };

  return (
    <div>
      {erroAPI && <div>{erroAPI}</div>}
      {!erroAPI && quantidadeAlimentacoesLancadas && (
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
              tipos_alimentacao={periodo.tipos_alimentacao}
              periodoSelecionado={periodoSelecionado}
              solicitacaoMedicaoInicial={solicitacaoMedicaoInicial}
              objSolicitacaoMIFinalizada={objSolicitacaoMIFinalizada}
              quantidadeAlimentacoesLancadas={quantidadeAlimentacoesLancadas}
            />
          ))}
          {periodosInclusaoContinua &&
            Object.keys(periodosInclusaoContinua).map((periodo, index) => {
              const vinculosDoPeriodo = periodosEscolaSimples.find(
                p => p.periodo_escolar.nome === periodo
              );
              const tiposAlimentacao = vinculosDoPeriodo
                ? vinculosDoPeriodo.tipos_alimentacao
                : [];

              return (
                <CardLancamento
                  key={index}
                  grupo="Programas e Projetos"
                  textoCabecalho={periodo}
                  cor={CORES[4]}
                  tipos_alimentacao={tiposAlimentacao}
                  periodoSelecionado={periodoSelecionado}
                  solicitacaoMedicaoInicial={solicitacaoMedicaoInicial}
                  objSolicitacaoMIFinalizada={objSolicitacaoMIFinalizada}
                  quantidadeAlimentacoesLancadas={
                    quantidadeAlimentacoesLancadas
                  }
                />
              );
            })}
          {((solicitacoesKitLanchesAutorizadas &&
            solicitacoesKitLanchesAutorizadas.length > 0) ||
            (solicitacoesAlteracaoLancheEmergencialAutorizadas &&
              solicitacoesAlteracaoLancheEmergencialAutorizadas.length >
                0)) && (
            <CardLancamento
              grupo="Solicitações de Alimentação"
              cor={CORES[5]}
              tipos_alimentacao={["Kit Lanche", "Lanche Emergencial"]}
              periodoSelecionado={periodoSelecionado}
              solicitacaoMedicaoInicial={solicitacaoMedicaoInicial}
              objSolicitacaoMIFinalizada={objSolicitacaoMIFinalizada}
              ehGrupoSolicitacoesDeAlimentacao={true}
              quantidadeAlimentacoesLancadas={quantidadeAlimentacoesLancadas}
            />
          )}
          {solicitacoesInclusoesEtecAutorizadas &&
            solicitacoesInclusoesEtecAutorizadas.length > 0 && (
              <CardLancamento
                grupo="ETEC"
                cor={CORES[6]}
                tipos_alimentacao={tiposAlimentacaoETEC()}
                periodoSelecionado={periodoSelecionado}
                solicitacaoMedicaoInicial={solicitacaoMedicaoInicial}
                objSolicitacaoMIFinalizada={objSolicitacaoMIFinalizada}
                ehGrupoETEC={true}
                quantidadeAlimentacoesLancadas={quantidadeAlimentacoesLancadas}
              />
            )}
          <div className="row mt-4">
            <div className="col">
              {renderBotaoFinalizar() ? (
                <Botao
                  texto="Finalizar"
                  style={BUTTON_STYLE.GREEN}
                  className="float-right"
                  disabled={!usuarioEhEscolaTerceirizadaDiretor()}
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
                        disabled={
                          !solicitacaoMedicaoInicial.anexos ||
                          solicitacaoMedicaoInicial.anexos.length === 0
                        }
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
