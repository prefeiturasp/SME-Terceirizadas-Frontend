import React from "react";
import { useHistory } from "react-router-dom";
import { Form } from "react-final-form";
import { Botao } from "components/Shareable/Botao";
import { PERIODO_STATUS_DE_PROGRESSO } from "components/screens/LancamentoInicial/ConferenciaDosLancamentos/constants";
import {
  LANCAMENTO_INICIAL,
  LANCAMENTO_MEDICAO_INICIAL,
  PERIODO_LANCAMENTO_CEI,
} from "configs/constants";
import "./styles.scss";
import {
  desabilitarBotaoEditar,
  justificativaPeriodo,
  statusPeriodo,
  styleBotaoCardLancamento,
  textoBotaoCardLancamento,
} from "../../LancamentoPorPeriodo/helpers";

export default ({
  textoCabecalho = null,
  cor,
  solicitacaoMedicaoInicial,
  quantidadeAlimentacoesLancadas,
  periodoSelecionado,
}) => {
  const history = useHistory();

  const qtdAlimentacaoPeriodoFiltrada = () => {
    return quantidadeAlimentacoesLancadas.filter(
      (qtdAlimentacaoPeriodo) =>
        qtdAlimentacaoPeriodo.nome_periodo_grupo === textoCabecalho
    );
  };

  const textoCabecalhoFormatado = (textoCabecalho) => {
    switch (textoCabecalho) {
      case "MANHA":
        return "Infantil Manhã";
      case "TARDE":
        return "Infantil Tarde";
      case "PARCIAL":
        return "Período Parcial";
      case "INTEGRAL":
        return "Período Integral";
    }
  };

  const numeroRefeicoesDiarias = (textoCabecalho) => {
    switch (textoCabecalho) {
      case "PARCIAL":
        return 3;
      case "INTEGRAL":
        return 5;
      default:
        return 2;
    }
  };

  const getStatusPeriodo = () => {
    return statusPeriodo(
      quantidadeAlimentacoesLancadas,
      solicitacaoMedicaoInicial,
      null,
      textoCabecalho
    );
  };

  const handleClickEditar = () => {
    history.push({
      pathname: `/${LANCAMENTO_INICIAL}/${LANCAMENTO_MEDICAO_INICIAL}/${PERIODO_LANCAMENTO_CEI}`,
      search: `uuid=${solicitacaoMedicaoInicial.uuid}`,
      state: {
        periodo: textoCabecalho,
        mesAnoSelecionado: periodoSelecionado,
        status_periodo: getStatusPeriodo(),
        status_solicitacao: solicitacaoMedicaoInicial.status,
        justificativa_periodo: justificativaPeriodo(
          quantidadeAlimentacoesLancadas,
          null,
          textoCabecalho
        ),
        ...location.state,
      },
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
            <div className="col-9 pl-0 mb-2 periodo-cabecalho">
              {textoCabecalhoFormatado(textoCabecalho)}
            </div>
            <div className="col-3 pr-0">
              <div
                className={`float-right status-card-periodo-grupo ${
                  [
                    "MEDICAO_CORRECAO_SOLICITADA",
                    "MEDICAO_CORRECAO_SOLICITADA_CODAE",
                  ].includes(getStatusPeriodo())
                    ? "red"
                    : [
                        "MEDICAO_CORRIGIDA_PELA_UE",
                        "MEDICAO_CORRIGIDA_PARA_CODAE",
                      ].includes(getStatusPeriodo())
                    ? "blue"
                    : ""
                }`}
              >
                {PERIODO_STATUS_DE_PROGRESSO[getStatusPeriodo()]
                  ? PERIODO_STATUS_DE_PROGRESSO[getStatusPeriodo()].nome
                  : "Não Preenchido"}
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
            <div className="col-7 alimentacoes-por-tipo">
              <div className="row">
                <div className="col-8">
                  <div className="mt-4 mb-2">
                    <span style={{ color: cor }}>
                      <b>
                        {qtdAlimentacaoPeriodoFiltrada().length > 0
                          ? qtdAlimentacaoPeriodoFiltrada()[0].quantidade_alunos
                          : 0}
                      </b>
                    </span>
                    <span className="ml-1">
                      - alunos atendidos com{" "}
                      {numeroRefeicoesDiarias(textoCabecalho)} refeições diárias
                    </span>
                    <br />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="row" style={{ height: "100%" }}>
                <div className="col-8 d-flex flex-column" />
                <div className="col-4 pr-0 d-flex flex-column">
                  <Botao
                    texto={textoBotaoCardLancamento(
                      quantidadeAlimentacoesLancadas,
                      solicitacaoMedicaoInicial,
                      null,
                      textoCabecalho
                    )}
                    style={styleBotaoCardLancamento(
                      quantidadeAlimentacoesLancadas,
                      solicitacaoMedicaoInicial,
                      null,
                      textoCabecalho
                    )}
                    className="mt-auto"
                    onClick={() => handleClickEditar()}
                    disabled={desabilitarBotaoEditar(
                      quantidadeAlimentacoesLancadas,
                      solicitacaoMedicaoInicial,
                      null,
                      textoCabecalho
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    />
  );
};
