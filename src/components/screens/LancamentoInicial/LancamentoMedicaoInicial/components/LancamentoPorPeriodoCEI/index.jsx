import React, { useEffect, useState } from "react";
import Botao from "components/Shareable/Botao";
import { BUTTON_STYLE } from "components/Shareable/Botao/constants";
import { CORES } from "../LancamentoPorPeriodo/helpers";
import { usuarioEhEscolaTerceirizadaDiretor } from "helpers/utilities";
import CardLancamentoCEI from "./CardLancamentoCEI";
import { relatorioMedicaoInicialPDF } from "services/relatorios";
import HTTP_STATUS from "http-status-codes";
import { toastError } from "components/Shareable/Toast/dialogs";
import ModalSolicitacaoDownload from "components/Shareable/ModalSolicitacaoDownload";
import { ModalFinalizarMedicao } from "../ModalFinalizarMedicao";

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

  const quantidadeAlimentacoesLancadas = [
    {
      nome_periodo_grupo: "INTEGRAL",
      status: "MEDICAO_EM_ABERTO_PARA_PREENCHIMENTO_UE",
      qtd_alunos: 100,
      qtd_refeicoes_diarias: 5,
      valor_total: 500,
    },
    {
      nome_periodo_grupo: "PARCIAL",
      status: "MEDICAO_EM_ABERTO_PARA_PREENCHIMENTO_UE",
      qtd_alunos: 100,
      qtd_refeicoes_diarias: 3,
      valor_total: 300,
    },
    {
      nome_periodo_grupo: "MANHA",
      status: "MEDICAO_EM_ABERTO_PARA_PREENCHIMENTO_UE",
      qtd_alunos: 100,
      qtd_refeicoes_diarias: 2,
      valor_total: 200,
    },
    {
      nome_periodo_grupo: "TARDE",
      status: "MEDICAO_EM_ABERTO_PARA_PREENCHIMENTO_UE",
      qtd_alunos: 100,
      qtd_refeicoes_diarias: 2,
      valor_total: 200,
    },
  ];

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

  return (
    <div>
      {solicitacaoMedicaoInicial && (
        <>
          <div className="row pb-2">
            <div className="col">
              <b className="section-title">Períodos</b>
            </div>
          </div>
          <ModalSolicitacaoDownload
            show={exibirModalCentralDownloads}
            setShow={setExibirModalCentralDownloads}
          />

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
        </>
      )}
    </div>
  );
};
