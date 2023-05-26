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
import { PERIODO_STATUS_DE_PROGRESSO } from "components/screens/LancamentoInicial/ConferenciaDosLancamentos/constants";

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
    if (ehGrupoETEC) {
      tipos_alimentacao = tipos_alimentacao.filter(
        alimentacao => alimentacao !== "Lanche Emergencial"
      );
    }
    alimentacoesFormatadas = tipos_alimentacao.map((alimentacao, key) => (
      <div key={key} className="mb-2">
        <span style={{ color: cor }}>
          <b>{quantidadeAlimentacao(alimentacao)}</b>
        </span>
        <span className="ml-1">- {alimentacao}</span>
        <br />
      </div>
    ));
  } else {
    alimentacoesFormatadas = tipos_alimentacao
      .filter(alimentacao => alimentacao.nome !== "Lanche Emergencial")
      .map((alimentacao, key) => (
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

  const statusPeriodo = () => {
    const obj = quantidadeAlimentacoesLancadas.find(
      each => each.nome_periodo_grupo === nomePeriodoGrupo()
    );
    if (obj) {
      return obj.status;
    } else {
      return solicitacaoMedicaoInicial.status;
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
            <div className="col-9 pl-0 mb-2 periodo-cabecalho">
              {grupo &&
                `${grupo} ${
                  ehGrupoSolicitacoesDeAlimentacao || ehGrupoETEC ? "" : " - "
                } `}
              {textoCabecalho}
            </div>
            <div className="col-3 pr-0">
              <div className="float-right status-card-periodo-grupo">
                {PERIODO_STATUS_DE_PROGRESSO[statusPeriodo()] &&
                  PERIODO_STATUS_DE_PROGRESSO[statusPeriodo()].nome}
              </div>
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
            <div className="col-8 alimentacoes-por-tipo">
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
            <div className="col-2 pr-0">
              {solicitacaoMedicaoInicial.status ===
              "MEDICAO_APROVADA_PELA_DRE" ? (
                <Botao
                  texto="Visualizar"
                  style={BUTTON_STYLE.GREEN_OUTLINE}
                  className="float-right ml-3 botao-editar-visualizar-card"
                  onClick={() => {}}
                />
              ) : (
                <Botao
                  texto="Editar"
                  style={BUTTON_STYLE.GREEN_OUTLINE}
                  className="float-right ml-3 botao-editar-visualizar-card"
                  onClick={() => handleClickEditar()}
                  disabled={desabilitarBotaoEditar()}
                />
              )}
            </div>
          </div>
        </div>
      )}
    />
  );
};
