import React from "react";
import { useHistory } from "react-router-dom";
import { Form } from "react-final-form";
import { Botao } from "components/Shareable/Botao";
import { BUTTON_STYLE } from "components/Shareable/Botao/constants";
import { PERIODO_STATUS_DE_PROGRESSO } from "components/screens/LancamentoInicial/ConferenciaDosLancamentos/constants";
import {
  LANCAMENTO_INICIAL,
  LANCAMENTO_MEDICAO_INICIAL,
  PERIODO_LANCAMENTO_CEI
} from "configs/constants";
import "./styles.scss";

export default ({
  textoCabecalho = null,
  cor,
  solicitacaoMedicaoInicial,
  quantidadeAlimentacoesLancadas,
  periodoSelecionado
}) => {
  const history = useHistory();

  const qtdAlimentacaoPeriodoFiltrada = () => {
    return quantidadeAlimentacoesLancadas.filter(
      qtdAlimentacaoPeriodo =>
        qtdAlimentacaoPeriodo.nome_periodo_grupo === textoCabecalho
    );
  };

  const statusPeriodo = () => {
    const obj = quantidadeAlimentacoesLancadas.find(
      each => each.nome_periodo_grupo === textoCabecalho
    );
    if (obj) {
      return obj.status;
    } else if (
      solicitacaoMedicaoInicial.status ===
      "MEDICAO_EM_ABERTO_PARA_PREENCHIMENTO_UE"
    ) {
      return solicitacaoMedicaoInicial.status;
    } else {
      return "Não Preenchido";
    }
  };

  const handleClickEditar = () => {
    history.push({
      pathname: `/${LANCAMENTO_INICIAL}/${LANCAMENTO_MEDICAO_INICIAL}/${PERIODO_LANCAMENTO_CEI}`,
      search: `uuid=${solicitacaoMedicaoInicial.uuid}`,
      state: {
        periodo: textoCabecalho,
        mesAnoSelecionado: periodoSelecionado,
        status_periodo: statusPeriodo(),
        status_solicitacao: solicitacaoMedicaoInicial.status,
        ...location.state
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
            <div className="col-9 pl-0 mb-2 periodo-cabecalho">
              {textoCabecalho}
            </div>
            <div className="col-3 pr-0">
              <div className="float-right status-card-periodo-grupo">
                {PERIODO_STATUS_DE_PROGRESSO[statusPeriodo()]
                  ? PERIODO_STATUS_DE_PROGRESSO[statusPeriodo()].nome
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
            <div className="col-8 alimentacoes-por-tipo">
              <div className="row">
                <div className="col-8">
                  <div className="mt-4 mb-2">
                    <span style={{ color: cor }}>
                      <b>{quantidadeAlimentacoesLancadas[0].qtd_alunos}</b>
                    </span>
                    <span className="ml-1">
                      - alunos atendidos com{" "}
                      {quantidadeAlimentacoesLancadas[0].qtd_refeicoes_diarias}{" "}
                      refeições diárias
                    </span>
                    <br />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-2 pr-0">
              <Botao
                texto="Editar"
                style={BUTTON_STYLE.GREEN_OUTLINE}
                className="float-right ml-3 botao-editar-visualizar-card"
                onClick={() => handleClickEditar()}
                disabled={false}
              />
            </div>
          </div>
        </div>
      )}
    />
  );
};
