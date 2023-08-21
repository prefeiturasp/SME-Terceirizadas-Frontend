import React, { useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { ModalFinalizarMedicao } from "../ModalFinalizarMedicao";
import CardLancamento from "./CardLancamento";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import {
  getPeriodosInclusaoContinua,
  getSolicitacoesKitLanchesAutorizadasEscola,
  getSolicitacoesAlteracoesAlimentacaoAutorizadasEscola,
  getSolicitacoesInclusoesEtecAutorizadasEscola,
  getCEUGESTAOPeriodosSolicitacoesAutorizadasEscola
} from "services/medicaoInicial/periodoLancamentoMedicao.service";
import { relatorioMedicaoInicialPDF } from "services/relatorios";
import {
  escolaEnviaCorrecaoMedicaoInicialCODAE,
  escolaEnviaCorrecaoMedicaoInicialDRE,
  getQuantidadeAlimentacoesLancadasPeriodoGrupo,
  getSolicitacaoMedicaoInicial
} from "services/medicaoInicial/solicitacaoMedicaoInicial.service";
import { CORES, removeObjetosDuplicados } from "./helpers";
import {
  ehEscolaTipoCEUGESTAO,
  getError,
  usuarioEhDiretorUE,
  usuarioEhEscolaTerceirizadaDiretor
} from "helpers/utilities";
import { tiposAlimentacaoETEC } from "helpers/utilities";
import { ENVIRONMENT } from "constants/config";
import ModalSolicitacaoDownload from "components/Shareable/ModalSolicitacaoDownload";
import { ModalPadraoSimNao } from "components/Shareable/ModalPadraoSimNao";

export default ({
  escolaInstituicao,
  periodosEscolaSimples,
  solicitacaoMedicaoInicial,
  onClickInfoBasicas,
  periodoSelecionado,
  mes,
  ano,
  objSolicitacaoMIFinalizada,
  setObjSolicitacaoMIFinalizada,
  setSolicitacaoMedicaoInicial
}) => {
  const [showModalFinalizarMedicao, setShowModalFinalizarMedicao] = useState(
    false
  );
  const [showModalEnviarCorrecao, setShowModalEnviarCorrecao] = useState(false);
  const [desabilitaSim, setDesabilitaSim] = useState(false);
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
  const [periodosCEUGESTAO, setPeriodosCEUGESTAO] = useState(undefined);
  const [
    quantidadeAlimentacoesLancadas,
    setQuantidadeAlimentacoesLancadas
  ] = useState(undefined);
  const [erroAPI, setErroAPI] = useState("");
  const [
    exibirModalCentralDownloads,
    setExibirModalCentralDownloads
  ] = useState(false);

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

  const getPeriodosCEUGESTAOAsync = async () => {
    const escola_uuid = escolaInstituicao.uuid;
    const response = await getCEUGESTAOPeriodosSolicitacoesAutorizadasEscola({
      escola_uuid,
      mes,
      ano
    });
    if (response.status === HTTP_STATUS.OK) {
      setPeriodosCEUGESTAO(response.data);
    } else {
      setErroAPI(
        "Erro ao carregar períodos de escolas CEU GESTÃO. Tente novamente mais tarde."
      );
    }
  };

  useEffect(() => {
    getPeriodosInclusaoContinuaAsync();
    getSolicitacoesKitLanchesAutorizadasAsync();
    getSolicitacoesAlteracaoLancheEmergencialAutorizadasAsync();
    getSolicitacoesInclusoesEtecAutorizadasAsync();
    getQuantidadeAlimentacoesLancadasPeriodoGrupoAsync();
    solicitacaoMedicaoInicial &&
      ehEscolaTipoCEUGESTAO(solicitacaoMedicaoInicial.escola) &&
      getPeriodosCEUGESTAOAsync();
  }, [periodoSelecionado, solicitacaoMedicaoInicial]);

  const getPathPlanilhaOcorr = () => {
    if (objSolicitacaoMIFinalizada.anexo)
      return objSolicitacaoMIFinalizada.anexo.arquivo;
    if (solicitacaoMedicaoInicial && solicitacaoMedicaoInicial.anexo)
      return solicitacaoMedicaoInicial.anexo.arquivo;
  };

  const gerarPDFMedicaoInicial = async () => {
    const response = await relatorioMedicaoInicialPDF(
      solicitacaoMedicaoInicial.uuid
    );
    if (response.status === HTTP_STATUS.OK) {
      setExibirModalCentralDownloads(true);
    } else {
      toastError("Erro ao exportar pdf. Tente novamente mais tarde.");
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

  const getSolicitacaoMedicalInicial = async () => {
    const payload = {
      escola: escolaInstituicao.uuid,
      mes: mes,
      ano: ano
    };

    const solicitacao = await getSolicitacaoMedicaoInicial(payload);
    setSolicitacaoMedicaoInicial(solicitacao.data[0]);
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

  const renderBotaoEnviarCorrecao = () => {
    return (
      solicitacaoMedicaoInicial &&
      [
        "MEDICAO_CORRECAO_SOLICITADA",
        "MEDICAO_CORRECAO_SOLICITADA_CODAE"
      ].includes(solicitacaoMedicaoInicial.status) &&
      usuarioEhDiretorUE()
    );
  };

  const escolaEnviaCorrecaoDreCodae = async () => {
    setDesabilitaSim(true);
    const endpoint =
      solicitacaoMedicaoInicial.status === "MEDICAO_CORRECAO_SOLICITADA_CODAE"
        ? escolaEnviaCorrecaoMedicaoInicialCODAE
        : escolaEnviaCorrecaoMedicaoInicialDRE;
    const response = await endpoint(solicitacaoMedicaoInicial.uuid);
    if (response.status === HTTP_STATUS.OK) {
      toastSuccess("Correção da Medição Inicial enviada com sucesso!");
      getQuantidadeAlimentacoesLancadasPeriodoGrupoAsync();
      getSolicitacaoMedicalInicial();
      setShowModalEnviarCorrecao(false);
    } else {
      toastError(getError(response.data));
    }
    setDesabilitaSim(false);
  };

  const verificaSeEnviarCorrecaoDisabled = () => {
    return (
      quantidadeAlimentacoesLancadas.some(
        periodo =>
          ![
            "MEDICAO_APROVADA_PELA_DRE",
            "MEDICAO_APROVADA_PELA_CODAE",
            "MEDICAO_CORRIGIDA_PELA_UE",
            "MEDICAO_CORRIGIDA_PARA_CODAE"
          ].includes(periodo.status)
      ) ||
      (solicitacaoMedicaoInicial.com_ocorrencias &&
        ![
          "MEDICAO_APROVADA_PELA_DRE",
          "MEDICAO_APROVADA_PELA_CODAE",
          "MEDICAO_CORRIGIDA_PELA_UE",
          "MEDICAO_CORRIGIDA_PARA_CODAE"
        ].includes(solicitacaoMedicaoInicial.ocorrencia.status))
    );
  };

  const tiposAlimentacaoProgramasEProjetos = () => {
    let tiposAlimentacao = [];
    Object.keys(periodosInclusaoContinua).forEach(periodo => {
      const tipos = periodosEscolaSimples.find(
        p => p.periodo_escolar.nome === periodo
      ).tipos_alimentacao;
      tiposAlimentacao = [...tiposAlimentacao, ...tipos];
    });

    return removeObjetosDuplicados(tiposAlimentacao, "nome");
  };

  return (
    <div>
      {erroAPI && <div>{erroAPI}</div>}
      {!erroAPI && quantidadeAlimentacoesLancadas && (
        <>
          <div className="row pb-2">
            <div className="col">
              <b className="section-title">Períodos</b>
            </div>
          </div>
          {!ehEscolaTipoCEUGESTAO(solicitacaoMedicaoInicial.escola) &&
            periodosEscolaSimples.map((periodo, index) => (
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
          {ehEscolaTipoCEUGESTAO(solicitacaoMedicaoInicial.escola) &&
            periodosCEUGESTAO &&
            periodosCEUGESTAO.map((periodo, index) => (
              <CardLancamento
                key={index}
                textoCabecalho={periodo.nome}
                cor={CORES[index]}
                tipos_alimentacao={periodo.tipos_alimentacao}
                periodoSelecionado={periodoSelecionado}
                solicitacaoMedicaoInicial={solicitacaoMedicaoInicial}
                objSolicitacaoMIFinalizada={objSolicitacaoMIFinalizada}
                quantidadeAlimentacoesLancadas={quantidadeAlimentacoesLancadas}
              />
            ))}
          {periodosInclusaoContinua && (
            <CardLancamento
              grupo="Programas e Projetos"
              cor={CORES[4]}
              tipos_alimentacao={tiposAlimentacaoProgramasEProjetos()}
              periodoSelecionado={periodoSelecionado}
              solicitacaoMedicaoInicial={solicitacaoMedicaoInicial}
              objSolicitacaoMIFinalizada={objSolicitacaoMIFinalizada}
              quantidadeAlimentacoesLancadas={quantidadeAlimentacoesLancadas}
              periodosInclusaoContinua={periodosInclusaoContinua}
            />
          )}
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
          <div className="mt-4">
            {renderBotaoFinalizar() ? (
              <Botao
                texto="Finalizar"
                style={BUTTON_STYLE.GREEN}
                className="float-right"
                disabled={!usuarioEhEscolaTerceirizadaDiretor()}
                onClick={() => setShowModalFinalizarMedicao(true)}
              />
            ) : (
              <div className="row">
                <div className="col-12 text-right">
                  {renderBotaoExportarPlanilha() && (
                    <a href={getPathPlanilhaOcorr()}>
                      <Botao
                        texto="Exportar Planilha de Ocorrências"
                        style={BUTTON_STYLE.GREEN_OUTLINE}
                        className="mr-3"
                      />
                    </a>
                  )}
                  {renderBotaoExportarPDF() && (
                    <Botao
                      texto="Exportar PDF"
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                      className="mr-3"
                      onClick={() => gerarPDFMedicaoInicial()}
                      disabled={ENVIRONMENT === "production"}
                    />
                  )}
                  {renderBotaoEnviarCorrecao() && (
                    <Botao
                      texto="Enviar Correção"
                      type={BUTTON_TYPE.BUTTON}
                      style={BUTTON_STYLE.GREEN}
                      onClick={() => setShowModalEnviarCorrecao(true)}
                      disabled={verificaSeEnviarCorrecaoDisabled()}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
          <ModalFinalizarMedicao
            showModal={showModalFinalizarMedicao}
            closeModal={() => setShowModalFinalizarMedicao(false)}
            setObjSolicitacaoMIFinalizada={setObjSolicitacaoMIFinalizada}
            escolaInstituicao={escolaInstituicao}
            solicitacaoMedicaoInicial={solicitacaoMedicaoInicial}
            onClickInfoBasicas={onClickInfoBasicas}
          />
          <ModalSolicitacaoDownload
            show={exibirModalCentralDownloads}
            setShow={setExibirModalCentralDownloads}
          />
          <ModalPadraoSimNao
            showModal={showModalEnviarCorrecao}
            closeModal={() => setShowModalEnviarCorrecao(false)}
            tituloModal={`Enviar Correção para ${
              solicitacaoMedicaoInicial.status ===
              "MEDICAO_CORRECAO_SOLICITADA_CODAE"
                ? "CODAE"
                : "DRE"
            }`}
            descricaoModal={
              <p className="col-12 my-3 p-0">
                Deseja enviar a correção para{" "}
                {solicitacaoMedicaoInicial.status ===
                "MEDICAO_CORRECAO_SOLICITADA_CODAE"
                  ? "CODAE"
                  : "DRE"}
                ?
              </p>
            }
            funcaoSim={escolaEnviaCorrecaoDreCodae}
            desabilitaSim={desabilitaSim}
          />
        </>
      )}
    </div>
  );
};
