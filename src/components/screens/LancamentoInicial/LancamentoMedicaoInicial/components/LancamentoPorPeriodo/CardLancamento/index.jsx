import React from "react";
import { useHistory } from "react-router-dom";
import { Form } from "react-final-form";
import { Botao } from "components/Shareable/Botao";
import { BUTTON_STYLE } from "components/Shareable/Botao/constants";

import {
  LANCAMENTO_INICIAL,
  LANCAMENTO_MEDICAO_INICIAL,
  PERIODO_LANCAMENTO
} from "configs/constants";
import "./styles.scss";

export default ({
  textoCabecalho = null,
  grupo,
  cor,
  totalAlimentacoes = [],
  tipos_alimentacao,
  periodoSelecionado,
  solicitacaoMedicaoInicial,
  ehGrupoSolicitacoesDeAlimentacao = false,
  ehGrupoETEC = false
}) => {
  const history = useHistory();
  let alimentacoesFormatadas = [];
  if (ehGrupoSolicitacoesDeAlimentacao || ehGrupoETEC) {
    alimentacoesFormatadas = tipos_alimentacao.map((item, key) => (
      <div key={key} className="mb-2">
        <span style={{ color: cor }}>
          <b>0</b>
        </span>
        <span className="ml-1">- {item}</span>
        <br />
      </div>
    ));
  } else {
    alimentacoesFormatadas = tipos_alimentacao.map((alimentacao, key) => (
      <div key={key} className="mb-2">
        <span style={{ color: cor }}>
          <b>0</b>
        </span>
        <span className="ml-1">- {alimentacao.nome}</span>
        <br />
      </div>
    ));
  }

  const desabilitarBotaoEditar = () => {
    if (!solicitacaoMedicaoInicial) {
      return true;
    }
    return (
      solicitacaoMedicaoInicial.status !==
      "MEDICAO_EM_ABERTO_PARA_PREENCHIMENTO_UE"
    );
  };

  const handleClickEditar = () => {
    history.push({
      pathname: `/${LANCAMENTO_INICIAL}/${LANCAMENTO_MEDICAO_INICIAL}/${PERIODO_LANCAMENTO}`,
      search: `uuid=${
        solicitacaoMedicaoInicial.uuid
      }&ehGrupoSolicitacoesDeAlimentacao=${ehGrupoSolicitacoesDeAlimentacao}&ehGrupoETEC=${ehGrupoETEC}`,
      state: {
        periodo: textoCabecalho,
        grupo,
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
              {grupo &&
                `${grupo} ${
                  ehGrupoSolicitacoesDeAlimentacao || ehGrupoETEC ? "" : " - "
                } `}
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
