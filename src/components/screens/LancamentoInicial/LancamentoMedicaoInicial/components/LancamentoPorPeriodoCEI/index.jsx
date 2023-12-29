import React, { useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import ModalSolicitacaoDownload from "components/Shareable/ModalSolicitacaoDownload";
import { ModalPadraoSimNao } from "components/Shareable/ModalPadraoSimNao";
import { CardLancamentoCEI } from "./CardLancamentoCEI";
import { ModalFinalizarMedicao } from "../ModalFinalizarMedicao";
import {
  CORES,
  renderBotaoEnviarCorrecao,
  verificaSeEnviarCorrecaoDisabled,
} from "../LancamentoPorPeriodo/helpers";
import {
  ehEscolaTipoCEMEI,
  getError,
  usuarioEhEscolaTerceirizadaDiretor,
} from "helpers/utilities";
import { ehEmeiDaCemei } from "./helpers";
import { relatorioMedicaoInicialPDF } from "services/relatorios";
import {
  escolaEnviaCorrecaoMedicaoInicialCODAE,
  escolaEnviaCorrecaoMedicaoInicialDRE,
  getQuantidadeAlimentacoesLancadasPeriodoGrupo,
  getSolicitacaoMedicaoInicial,
} from "services/medicaoInicial/solicitacaoMedicaoInicial.service";
import {
  getSolicitacoesAlteracoesAlimentacaoAutorizadasEscola,
  getSolicitacoesKitLanchesAutorizadasEscola,
} from "services/medicaoInicial/periodoLancamentoMedicao.service";

export const LancamentoPorPeriodoCEI = ({
  mes,
  ano,
  periodoSelecionado,
  escolaInstituicao,
  periodosEscolaSimples,
  periodosEscolaCemeiComAlunosEmei,
  solicitacaoMedicaoInicial,
  onClickInfoBasicas,
  setObjSolicitacaoMIFinalizada,
  setSolicitacaoMedicaoInicial,
  setFinalizandoMedicao,
  naoPodeFinalizar,
}) => {
  const [periodosComAlunos, setPeriodosComAlunos] = useState([]);
  const [exibirModalCentralDownloads, setExibirModalCentralDownloads] =
    useState(false);
  const [showModalFinalizarMedicao, setShowModalFinalizarMedicao] =
    useState(false);
  const [quantidadeAlimentacoesLancadas, setQuantidadeAlimentacoesLancadas] =
    useState(undefined);
  const [showModalEnviarCorrecao, setShowModalEnviarCorrecao] = useState(false);
  const [desabilitaSim, setDesabilitaSim] = useState(false);
  const [
    solicitacoesKitLanchesAutorizadas,
    setSolicitacoesKitLanchesAutorizadas,
  ] = useState(undefined);
  const [
    solicitacoesAlteracaoLancheEmergencialAutorizadas,
    setSolicitacoesAlteracaoLancheEmergencialAutorizadas,
  ] = useState(undefined);
  const [erroAPI, setErroAPI] = useState("");
  const [errosAoSalvar, setErrosAoSalvar] = useState([]);

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

  useEffect(() => {
    let periodos = escolaInstituicao.periodos_escolares
      .filter((periodo) => periodo.possui_alunos_regulares)
      .map((periodo) => periodo.nome);
    if (solicitacaoMedicaoInicial?.ue_possui_alunos_periodo_parcial) {
      periodos.splice(1, 0, "PARCIAL");
    }

    if (ehEscolaTipoCEMEI(escolaInstituicao)) {
      periodos = periodos
        .filter((periodo) => !["MANHA", "TARDE"].includes(periodo))
        .concat(periodosEscolaCemeiComAlunosEmei);
    }

    setPeriodosComAlunos(periodos);
  }, [escolaInstituicao, solicitacaoMedicaoInicial]);

  const renderBotaoFinalizar = () => {
    if (!solicitacaoMedicaoInicial) {
      return false;
    }
    return (
      solicitacaoMedicaoInicial.status ===
      "MEDICAO_EM_ABERTO_PARA_PREENCHIMENTO_UE"
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
      getSolicitacaoMedicaoInicialAsync();
      setShowModalEnviarCorrecao(false);
    } else {
      toastError(getError(response.data));
    }
    setDesabilitaSim(false);
  };

  const getSolicitacaoMedicaoInicialAsync = async () => {
    const payload = {
      escola: escolaInstituicao.uuid,
      mes: mes,
      ano: ano,
    };

    const solicitacao = await getSolicitacaoMedicaoInicial(payload);
    setSolicitacaoMedicaoInicial(solicitacao.data[0]);
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

  const getSolicitacoesKitLanchesAutorizadasAsync = async () => {
    if (ehEscolaTipoCEMEI(escolaInstituicao)) {
      const escola_uuid = escolaInstituicao.uuid;
      const tipo_solicitacao = "Kit Lanche Passeio de CEMEI";
      const response = await getSolicitacoesKitLanchesAutorizadasEscola({
        escola_uuid,
        mes,
        ano,
        tipo_solicitacao,
      });
      if (response.status === HTTP_STATUS.OK) {
        setSolicitacoesKitLanchesAutorizadas(response.data.results);
      } else {
        setErroAPI(
          "Erro ao carregar Kit Lanches CEMEI Autorizadas. Tente novamente mais tarde."
        );
      }
    }
  };

  const getSolicitacoesAlteracaoLancheEmergencialAutorizadasAsync =
    async () => {
      if (ehEscolaTipoCEMEI(escolaInstituicao)) {
        const params = {};
        params["escola_uuid"] = escolaInstituicao.uuid;
        params["tipo_solicitacao"] = "Alteração";
        params["mes"] = mes;
        params["ano"] = ano;
        params["eh_lanche_emergencial"] = true;
        const response =
          await getSolicitacoesAlteracoesAlimentacaoAutorizadasEscola(params);
        if (response.status === HTTP_STATUS.OK) {
          setSolicitacoesAlteracaoLancheEmergencialAutorizadas(
            response.data.results
          );
        } else {
          setErroAPI(
            "Erro ao carregar Alteração de Lanche Emergencial CEMEI Autorizadas. Tente novamente mais tarde."
          );
        }
      }
    };

  useEffect(() => {
    getSolicitacoesKitLanchesAutorizadasAsync();
    getSolicitacoesAlteracaoLancheEmergencialAutorizadasAsync();
    solicitacaoMedicaoInicial &&
      getQuantidadeAlimentacoesLancadasPeriodoGrupoAsync();
  }, [periodoSelecionado, solicitacaoMedicaoInicial]);

  const tiposAlimentacaoPeriodosEmei = (nomePeriodo) => {
    let tiposAlimentacao = [];

    if (
      ehEmeiDaCemei(
        escolaInstituicao,
        periodosEscolaCemeiComAlunosEmei,
        nomePeriodo
      )
    ) {
      const periodo = periodosEscolaSimples.find(
        (p) =>
          `Infantil ${p.periodo_escolar.nome}` === nomePeriodo &&
          p.tipo_unidade_escolar.iniciais === "EMEI"
      );
      tiposAlimentacao = periodo?.tipos_alimentacao.filter(
        (alimentacao) => alimentacao.nome !== "Lanche Emergencial"
      );
    }

    return tiposAlimentacao;
  };

  const uuidPeriodoEscolar = (nomePeriodo) => {
    let uuidPeriodo = null;
    if (
      ehEmeiDaCemei(
        escolaInstituicao,
        periodosEscolaCemeiComAlunosEmei,
        nomePeriodo
      )
    ) {
      const periodo = periodosEscolaSimples.find(
        (p) =>
          `Infantil ${p.periodo_escolar.nome}` === nomePeriodo &&
          p.tipo_unidade_escolar.iniciais === "EMEI"
      );
      uuidPeriodo = periodo?.periodo_escolar?.uuid;
    }

    return uuidPeriodo;
  };

  return (
    <div>
      {erroAPI && <div>{erroAPI}</div>}
      {solicitacaoMedicaoInicial &&
        !erroAPI &&
        quantidadeAlimentacoesLancadas && (
          <>
            <div className="row pb-2">
              <div className="col">
                <b className="section-title">Períodos</b>
              </div>
            </div>
            {periodosComAlunos.map((nomePeriodo, index) => (
              <CardLancamentoCEI
                key={index}
                textoCabecalho={nomePeriodo}
                cor={CORES[index % CORES.length]}
                solicitacaoMedicaoInicial={solicitacaoMedicaoInicial}
                escolaInstituicao={escolaInstituicao}
                quantidadeAlimentacoesLancadas={quantidadeAlimentacoesLancadas}
                periodoSelecionado={periodoSelecionado}
                periodosEscolaCemeiComAlunosEmei={
                  periodosEscolaCemeiComAlunosEmei
                }
                tiposAlimentacao={tiposAlimentacaoPeriodosEmei(nomePeriodo)}
                uuidPeriodoEscolar={uuidPeriodoEscolar(nomePeriodo)}
                errosAoSalvar={errosAoSalvar}
              />
            ))}
            {((solicitacoesKitLanchesAutorizadas &&
              solicitacoesKitLanchesAutorizadas.length > 0) ||
              (solicitacoesAlteracaoLancheEmergencialAutorizadas &&
                solicitacoesAlteracaoLancheEmergencialAutorizadas.length >
                  0)) && (
              <CardLancamentoCEI
                key={periodosComAlunos.length + 1}
                textoCabecalho={"Solicitações de Alimentação"}
                cor={CORES[periodosComAlunos.length + 1]}
                solicitacaoMedicaoInicial={solicitacaoMedicaoInicial}
                escolaInstituicao={escolaInstituicao}
                quantidadeAlimentacoesLancadas={quantidadeAlimentacoesLancadas}
                periodoSelecionado={periodoSelecionado}
                periodosEscolaCemeiComAlunosEmei={
                  periodosEscolaCemeiComAlunosEmei
                }
                tiposAlimentacao={[
                  { nome: "Kit Lanche" },
                  { nome: "Lanche Emergencial" },
                ]}
                errosAoSalvar={errosAoSalvar}
              />
            )}
            <div className="mt-4">
              {renderBotaoFinalizar() ? (
                <Botao
                  texto="Finalizar"
                  style={BUTTON_STYLE.GREEN}
                  className="float-end"
                  disabled={
                    !usuarioEhEscolaTerceirizadaDiretor() || naoPodeFinalizar
                  }
                  onClick={() => setShowModalFinalizarMedicao(true)}
                />
              ) : (
                <div className="row">
                  <div className="col-12 text-end">
                    <Botao
                      texto="Exportar PDF"
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                      onClick={() => gerarPDFMedicaoInicial()}
                    />
                    {renderBotaoEnviarCorrecao(solicitacaoMedicaoInicial) && (
                      <Botao
                        texto="Enviar Correção"
                        type={BUTTON_TYPE.BUTTON}
                        style={BUTTON_STYLE.GREEN}
                        className="ms-3"
                        onClick={() => setShowModalEnviarCorrecao(true)}
                        disabled={verificaSeEnviarCorrecaoDisabled(
                          quantidadeAlimentacoesLancadas,
                          solicitacaoMedicaoInicial
                        )}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
            <ModalFinalizarMedicao
              showModal={showModalFinalizarMedicao}
              setErrosAoSalvar={(value) => setErrosAoSalvar(value)}
              closeModal={() => setShowModalFinalizarMedicao(false)}
              setObjSolicitacaoMIFinalizada={setObjSolicitacaoMIFinalizada}
              escolaInstituicao={escolaInstituicao}
              solicitacaoMedicaoInicial={solicitacaoMedicaoInicial}
              onClickInfoBasicas={onClickInfoBasicas}
              setFinalizandoMedicao={setFinalizandoMedicao}
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
