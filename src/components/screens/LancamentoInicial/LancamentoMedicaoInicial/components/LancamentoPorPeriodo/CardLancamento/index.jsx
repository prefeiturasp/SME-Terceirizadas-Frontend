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
  tipos_alimentacao,
  periodoSelecionado,
  solicitacaoMedicaoInicial,
  ehGrupoSolicitacoesDeAlimentacao = false,
  ehGrupoETEC = false,
  quantidadeAlimentacoesLancadas
}) => {
  const history = useHistory();
  let alimentacoesFormatadas = [];

  const nomePeriodoGrupo = () => {
    let nome = "";
    if (grupo) {
      nome += `${grupo}${
        ehGrupoSolicitacoesDeAlimentacao || ehGrupoETEC ? "" : " - "
      }`;
    }
    if (textoCabecalho) {
      nome += textoCabecalho;
    }
    return nome.trim();
  };

  const qtdAlimentacaoPeriodoFiltrada = () => {
    return quantidadeAlimentacoesLancadas.filter(
      qtdAlimentacaoPeriodo =>
        qtdAlimentacaoPeriodo.nome_periodo_grupo === nomePeriodoGrupo()
    );
  };

  const quantidadeAlimentacao = nomeAlimentacao => {
    const alimentacao = nomeAlimentacao
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replaceAll(/ /g, "_");
    let quantidade = 0;
    if (qtdAlimentacaoPeriodoFiltrada().length > 0) {
      const qtdAlimentacaoFiltrada = qtdAlimentacaoPeriodoFiltrada()[0].valores.filter(
        v => v.nome_campo === alimentacao
      );
      if (qtdAlimentacaoFiltrada.length > 0) {
        quantidade = qtdAlimentacaoFiltrada[0].valor;
      }
    }
    return quantidade;
  };

  if (ehGrupoSolicitacoesDeAlimentacao || ehGrupoETEC) {
    alimentacoesFormatadas = tipos_alimentacao.map((item, key) => (
      <div key={key} className="mb-2">
        <span style={{ color: cor }}>
          <b>{quantidadeAlimentacao(item)}</b>
        </span>
        <span className="ml-1">- {item}</span>
        <br />
      </div>
    ));
  } else {
    alimentacoesFormatadas = tipos_alimentacao.map((alimentacao, key) => (
      <div key={key} className="mb-2">
        <span style={{ color: cor }}>
          <b>{quantidadeAlimentacao(alimentacao.nome)}</b>
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
              <span>
                {qtdAlimentacaoPeriodoFiltrada().length > 0
                  ? qtdAlimentacaoPeriodoFiltrada()[0].valor_total
                  : 0}
              </span>
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
