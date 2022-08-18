import React from "react";
import { Form } from "react-final-form";

import { Botao } from "components/Shareable/Botao";
import { BUTTON_STYLE } from "components/Shareable/Botao/constants";

import "./styles.scss";

export default ({
  textoCabecalho,
  cor,
  totalAlimentacoes,
  alimentacoes,
  solicitacaoMedicaoInicial,
  objSolicitacaoMIFinalizada
}) => {
  const NOMES_ALIMENTACOES = {
    refeicoes: "Refeições",
    sobremesas: "Sobremesas",
    lanches: "Lanches",
    lanches_4h: "Lanches 4h",
    lanches_5h: "Lanches 5h",
    lanches_emergenciais: "Lanches Emergenciais",
    kit_lanches: "Kits Lanches"
  };

  const alimentacoesFormatadas = Object.keys(alimentacoes)
    .filter(alimentacao => alimentacao !== "total")
    .map((alimentacao, key) => (
      <div key={key} className="mb-2">
        <span style={{ color: cor }}>
          <b>{alimentacoes[alimentacao]}</b>
        </span>
        <span className="ml-1">- {NOMES_ALIMENTACOES[alimentacao]}</span>
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
      return false;
    } else {
      return (
        String(objSolicitacaoMIFinalizada.status) ===
        "MEDICAO_ENCERRADA_PELA_CODAE"
      );
    }
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
            <div className="col-8 alimentacoes-por-tipo">
              <div className="row">
                <div className="col-5">
                  {alimentacoesFormatadas.slice(0, 3)}
                </div>
                <div className="col-5">
                  {alimentacoesFormatadas.slice(3, 6)}
                </div>
              </div>
            </div>
            <div className="col-2 pr-0">
              <Botao
                texto="Editar"
                style={BUTTON_STYLE.GREEN_OUTLINE}
                className="float-right ml-3 button-editar-card"
                onClick={() => {}}
                disabled={desabilitarBotaoEditar()}
              />
            </div>
          </div>
        </div>
      )}
    />
  );
};
