import React, { useState } from "react";
import Botao from "components/Shareable/Botao";
import { BUTTON_STYLE } from "components/Shareable/Botao/constants";
import { ModalFinalizarMedicao } from "../ModalFinalizarMedicao";

import CardLancamento from "./CardLancamento";
import { CORES } from "./helpers";

export default ({
  escolaInstituicao,
  periodosEscolaSimples,
  solicitacaoMedicaoInicial,
  onClickInfoBasicas,
  periodoSelecionado
}) => {
  const [showModalFinalizarMedicao, setShowModalFinalizarMedicao] = useState(
    false
  );
  const [objSolicitacaoMIFinalizada, setObjSolicitacaoMIFinalizada] = useState({
    anexo: null,
    status: null
  });

  const getPathPlanilhaOcorr = () => {
    if (objSolicitacaoMIFinalizada.anexo)
      return objSolicitacaoMIFinalizada.anexo.arquivo;
    if (solicitacaoMedicaoInicial && solicitacaoMedicaoInicial.anexo)
      return solicitacaoMedicaoInicial.anexo.arquivo;
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
          textoCabecalho={periodo.nome}
          cor={CORES[index]}
          totalAlimentacoes={0}
          tipos_alimentacao={periodo.tipos_alimentacao}
          periodoSelecionado={periodoSelecionado}
          solicitacaoMedicaoInicial={solicitacaoMedicaoInicial}
          objSolicitacaoMIFinalizada={objSolicitacaoMIFinalizada}
        />
      ))}
      <div className="row mt-4">
        <div className="col">
          {renderBotaoFinalizar() ? (
            <Botao
              texto="Finalizar"
              style={BUTTON_STYLE.GREEN}
              className="float-right"
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
                <Botao
                  texto="Exportar PDF"
                  style={BUTTON_STYLE.GREEN_OUTLINE}
                  className="float-right"
                  onClick={() => {}}
                />
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
    </div>
  );
};
