import React from "react";
import { useHistory } from "react-router-dom";
import { Form } from "react-final-form";
import { Botao } from "components/Shareable/Botao";
import { PERIODO_STATUS_DE_PROGRESSO } from "components/screens/LancamentoInicial/ConferenciaDosLancamentos/constants";
import {
  desabilitarBotaoEditar,
  justificativaPeriodo,
  statusPeriodo,
  styleBotaoCardLancamento,
  textoBotaoCardLancamento,
} from "../../LancamentoPorPeriodo/helpers";
import { ehEscolaTipoCEMEI } from "../../../../../../../helpers/utilities";
import {
  LANCAMENTO_INICIAL,
  LANCAMENTO_MEDICAO_INICIAL,
  PERIODO_LANCAMENTO_CEI,
} from "configs/constants";
import "./styles.scss";
import {
  ehEmeiDaCemei,
  numeroRefeicoesDiarias,
  textoCabecalhoFormatado,
} from "../helpers";

export const CardLancamentoCEI = ({
  textoCabecalho = null,
  cor,
  solicitacaoMedicaoInicial,
  escolaInstituicao,
  quantidadeAlimentacoesLancadas,
  periodoSelecionado,
  periodosEscolaCemeiComAlunosEmei,
  tiposAlimentacao,
  uuidPeriodoEscolar,
}) => {
  const history = useHistory();

  let alimentacoesFormatadas = [];

  const qtdAlimentacaoPeriodoFiltrada = () => {
    return quantidadeAlimentacoesLancadas.filter(
      (qtdAlimentacaoPeriodo) =>
        qtdAlimentacaoPeriodo.nome_periodo_grupo === textoCabecalho
    );
  };

  const quantidadeAlimentacao = (nomeAlimentacao) => {
    const alimentacao = nomeAlimentacao
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replaceAll(/ /g, "_");
    let quantidade = 0;
    if (qtdAlimentacaoPeriodoFiltrada().length > 0) {
      const qtdAlimentacaoFiltrada =
        qtdAlimentacaoPeriodoFiltrada()[0].valores.filter(
          (v) => v.nome_campo === alimentacao
        );
      if (qtdAlimentacaoFiltrada.length > 0) {
        quantidade = qtdAlimentacaoFiltrada[0].valor;
      }
    }
    return quantidade;
  };

  if (
    ehEscolaTipoCEMEI(escolaInstituicao) &&
    periodosEscolaCemeiComAlunosEmei.includes(textoCabecalho)
  ) {
    alimentacoesFormatadas = tiposAlimentacao.map((tipoAlimentacao, key) => (
      <div key={key} className="mb-2">
        <span style={{ color: cor }}>
          <b>{quantidadeAlimentacao(tipoAlimentacao.nome)}</b>
        </span>
        <span className="ml-1">- {tipoAlimentacao.nome}</span>
        <br />
      </div>
    ));
  }

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
        ehEmeiDaCemei: ehEmeiDaCemei(
          escolaInstituicao,
          periodosEscolaCemeiComAlunosEmei,
          textoCabecalho
        ),
        uuidPeriodoEscolar: uuidPeriodoEscolar,
        tiposAlimentacao: tiposAlimentacao,
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
          <div className="wraper-periodo-status mb-2">
            <div className="periodo-cabecalho">
              {textoCabecalhoFormatado(textoCabecalho)}
            </div>
            <div>
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
          <div className="wraper-contadores-alimentacao">
            <div
              className="total-alimentacoes p-2"
              style={{ backgroundColor: cor }}
            >
              <span>
                {qtdAlimentacaoPeriodoFiltrada().length > 0
                  ? qtdAlimentacaoPeriodoFiltrada()[0].valor_total
                  : 0}
              </span>
              <span>ALIMENTAÇÕES</span>
            </div>
            <div className="alimentacoes-por-tipo">
              {ehEmeiDaCemei(
                escolaInstituicao,
                periodosEscolaCemeiComAlunosEmei,
                textoCabecalho
              ) ? (
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
              ) : (
                <div className="row">
                  <div className="col-8">
                    <div className="mt-4 mb-2">
                      <span style={{ color: cor }}>
                        <b>
                          {qtdAlimentacaoPeriodoFiltrada().length > 0
                            ? qtdAlimentacaoPeriodoFiltrada()[0]
                                .quantidade_alunos
                            : 0}
                        </b>
                      </span>
                      <span className="ml-1">
                        - alunos atendidos com{" "}
                        {numeroRefeicoesDiarias(textoCabecalho)} refeições
                        diárias
                      </span>
                      <br />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div>
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
