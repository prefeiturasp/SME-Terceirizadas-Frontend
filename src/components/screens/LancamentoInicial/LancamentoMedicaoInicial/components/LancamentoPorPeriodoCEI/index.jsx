import React, { useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import Botao from "components/Shareable/Botao";
import { BUTTON_STYLE } from "components/Shareable/Botao/constants";
import { toastError } from "components/Shareable/Toast/dialogs";
import ModalSolicitacaoDownload from "components/Shareable/ModalSolicitacaoDownload";
import CardLancamentoCEI from "./CardLancamentoCEI";
import { ModalFinalizarMedicao } from "../ModalFinalizarMedicao";
import { CORES } from "../LancamentoPorPeriodo/helpers";
import { usuarioEhEscolaTerceirizadaDiretor } from "helpers/utilities";
import { relatorioMedicaoInicialPDF } from "services/relatorios";
import { getQuantidadeAlimentacoesLancadasPeriodoGrupo } from "services/medicaoInicial/solicitacaoMedicaoInicial.service";

export default ({
  solicitacaoMedicaoInicial,
  escolaInstituicao,
  periodoSelecionado,
  onClickInfoBasicas,
  setObjSolicitacaoMIFinalizada,
  setFinalizandoMedicao,
}) => {
  const [periodosComAlunos, setPeriodosComAlunos] = useState([]);
  const [exibirModalCentralDownloads, setExibirModalCentralDownloads] =
    useState(false);
  const [showModalFinalizarMedicao, setShowModalFinalizarMedicao] =
    useState(false);
  const [quantidadeAlimentacoesLancadas, setQuantidadeAlimentacoesLancadas] =
    useState(undefined);

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
    const periodos = escolaInstituicao.periodos_escolares
      .filter((periodo) => periodo.possui_alunos_regulares)
      .map((periodo) => periodo.nome);

    if (solicitacaoMedicaoInicial?.ue_possui_alunos_periodo_parcial) {
      periodos.splice(1, 0, "PARCIAL");
    }
    setPeriodosComAlunos(periodos);
  }, [escolaInstituicao]);

  const renderBotaoFinalizar = () => {
    if (!solicitacaoMedicaoInicial) {
      return false;
    }
    return (
      solicitacaoMedicaoInicial.status ===
      "MEDICAO_EM_ABERTO_PARA_PREENCHIMENTO_UE"
    );
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
    solicitacaoMedicaoInicial &&
      getQuantidadeAlimentacoesLancadasPeriodoGrupoAsync();
  }, [periodoSelecionado, solicitacaoMedicaoInicial]);

  return (
    <div>
      {solicitacaoMedicaoInicial && quantidadeAlimentacoesLancadas && (
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
            />
          ))}
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
              <Botao
                texto="Exportar PDF"
                style={BUTTON_STYLE.GREEN_OUTLINE}
                className="float-right mr-3"
                onClick={() => gerarPDFMedicaoInicial()}
              />
            )}
          </div>
          <ModalFinalizarMedicao
            showModal={showModalFinalizarMedicao}
            closeModal={() => setShowModalFinalizarMedicao(false)}
            setObjSolicitacaoMIFinalizada={setObjSolicitacaoMIFinalizada}
            escolaInstituicao={escolaInstituicao}
            solicitacaoMedicaoInicial={solicitacaoMedicaoInicial}
            onClickInfoBasicas={onClickInfoBasicas}
            setErrosAoSalvar={() => {}}
            setFinalizandoMedicao={setFinalizandoMedicao}
          />
          <ModalSolicitacaoDownload
            show={exibirModalCentralDownloads}
            setShow={setExibirModalCentralDownloads}
          />
        </>
      )}
    </div>
  );
};
