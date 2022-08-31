import React from "react";
import { useHistory } from "react-router-dom";
import { Form } from "react-final-form";

import { Botao } from "components/Shareable/Botao";
import { BUTTON_STYLE } from "components/Shareable/Botao/constants";

import "./styles.scss";
import {
  LANCAMENTO_INICIAL,
  LANCAMENTO_MEDICAO_INICIAL,
  PERIODO_LANCAMENTO
} from "configs/constants";

export default ({
  textoCabecalho,
  cor,
  totalAlimentacoes,
  tipos_alimentacao,
  periodoSelecionado,
  solicitacaoMedicaoInicial,
  objSolicitacaoMIFinalizada
}) => {
  const history = useHistory();
  const alimentacoesFormatadas = tipos_alimentacao.map((alimentacao, key) => (
    <div key={key} className="mb-2">
      <span style={{ color: cor }}>
        <b>##</b>
      </span>
      <span className="ml-1">- {alimentacao.nome}</span>
      <br />
    </div>
  ));

  const desabilitarBotaoEditar = () => {
    if (solicitacaoMedicaoInicial) {
      return [
        String(solicitacaoMedicaoInicial.status),
        String(objSolicitacaoMIFinalizada.status)
      ].includes("MEDICAO_ENCERRADA_PELA_CODAE");
    }
    if (!solicitacaoMedicaoInicial) {
      return true;
    } else {
      return (
        String(objSolicitacaoMIFinalizada.status) ===
        "MEDICAO_ENCERRADA_PELA_CODAE"
      );
    }
  };

  const handleClickEditar = () => {
    history.push({
      pathname: `/${LANCAMENTO_INICIAL}/${LANCAMENTO_MEDICAO_INICIAL}/${PERIODO_LANCAMENTO}`,
      search: `uuid=${solicitacaoMedicaoInicial.uuid}`,
      state: {
        periodo: textoCabecalho,
        mesAnoSelecionado: periodoSelecionado,
        tipos_alimentacao: tipos_alimentacao
      }
    });
  };

  return (
    <Form
      onSubmit={() => {}}
      render={() => (
        <div
          className="lancamento-por-periodo-card mt-3"
          style={{ color: cor }}
        >
          <div className="row">
            <div className="col-10 pl-0 mb-2 periodo-cabecalho">
              {textoCabecalho}
            </div>
          </div>
          <div className="row">
            <div
              className="col-2 total-alimentacoes p-2"
              style={{ backgroundColor: cor }}
            >
              <span>{totalAlimentacoes || "0"}</span>
              <span>ALIMENTAÇÕES</span>
            </div>
            <div className="col-9 alimentacoes-por-tipo">
              <div className="row">
                <div className="col-4">
                  {alimentacoesFormatadas.slice(0, 3)}
                </div>
                <div className="col-4">
                  {alimentacoesFormatadas.slice(3, 6)}
                </div>
                <div className="col-4">
                  {alimentacoesFormatadas.slice(6, 9)}
                </div>
              </div>
            </div>
            <div className="col-1 pr-0">
              <Botao
                texto="Editar"
                style={BUTTON_STYLE.GREEN_OUTLINE}
                className="float-right ml-3 button-editar-card"
                onClick={() => handleClickEditar()}
                disabled={desabilitarBotaoEditar()}
              />
            </div>
          </div>
        </div>
      )}
    />
  );
};
