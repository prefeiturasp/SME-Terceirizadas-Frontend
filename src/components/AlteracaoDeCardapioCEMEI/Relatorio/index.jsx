import { Spin } from "antd";
import HTTP_STATUS from "http-status-codes";
import React, { useEffect, useState } from "react";
import { getAlteracaoCEMEI } from "services/alteracaoDeCardapio";
import { getQuantidadeAlunosCEMEIporCEIEMEI } from "services/aluno.service";
import { FluxoDeStatus } from "components/Shareable/FluxoDeStatus";
import { fluxoPartindoEscola } from "components/Shareable/FluxoDeStatus/helper";
import { formataDadosTabelaCEMEI } from "../helpers";
import { ESCOLA } from "configs/constants";
import { Botao } from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
  BUTTON_ICON
} from "components/Shareable/Botao/constants";
import { useHistory } from "react-router-dom";
import "./style.scss";
import { toastInfo } from "components/Shareable/Toast/dialogs";
import { ModalEscolaCancela } from "./componentes/ModalEscolaCancela";

export const Relatorio = ({ ...props }) => {
  const history = useHistory();
  const { visao, endpointNaoAprovaSolicitacao } = props;
  const [solicitacao, setSolicitacao] = useState(undefined);
  const [matriculados, setMatriculados] = useState(undefined);
  const [dadosTabela, setDadosTabela] = useState([]);
  const [showModalEscolaCancela, setShowModalEscolaCancela] = useState(false);
  const [
    justificativaCancelamentoEscola,
    setJustificativaCancelamentoEscola
  ] = useState(undefined);

  const getMatriculados = async codigo_eol => {
    const response = await getQuantidadeAlunosCEMEIporCEIEMEI(codigo_eol);
    if (response.status === HTTP_STATUS.OK) {
      setMatriculados(response.data);
    }
  };

  const getSolicitacao = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    const response = await getAlteracaoCEMEI(uuid);
    if (response.status === HTTP_STATUS.OK) {
      setSolicitacao(response.data);
      setDadosTabela(formataDadosTabelaCEMEI(response.data));
      getMatriculados(response.data.escola.codigo_eol);
      const logCancelamentoEscola = response.data.logs.filter(
        log => log.status_evento_explicacao === "Escola cancelou"
      );
      setJustificativaCancelamentoEscola(logCancelamentoEscola);
    }
  };

  useEffect(() => {
    getSolicitacao();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalAlunosPorPeriodoCEI = (faixas, keyName) => {
    let totalAlunos = 0;
    return faixas.reduce(function(total, faixa) {
      return total + faixa[keyName];
    }, totalAlunos);
  };

  return (
    <Spin
      tip="Carregando..."
      spinning={!solicitacao && !dadosTabela && !matriculados}
    >
      {solicitacao && dadosTabela && matriculados && (
        <>
          <div className="row">
            <div className="col-10">
              <h1 className="page-title mt-0">
                Alteração do Tipo de Alimentação - Solicitação #{" "}
                {solicitacao.id_externo}
              </h1>
            </div>
            <div className="col-2">
              <Botao
                texto="Voltar"
                titulo="Voltar"
                type={BUTTON_TYPE.BUTTON}
                style={BUTTON_STYLE.GREEN_OUTLINE}
                icon={BUTTON_ICON.ARROW_LEFT}
                className="float-right"
                onClick={() => history.goBack()}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12">
              <div className="card style-padrao-inclusao-cei">
                <div className="card-body">
                  <div className="row">
                    <div className="col-11">
                      <p>
                        {solicitacao.foi_solicitado_fora_do_prazo
                          ? "Solicitação fora do prazo limite"
                          : "Solicitação no prazo limite"}
                      </p>
                    </div>
                    <div className="col-1">
                      <Botao
                        type={BUTTON_TYPE.BUTTON}
                        style={BUTTON_STYLE.GREEN}
                        icon={BUTTON_ICON.PRINT}
                        className="float-right"
                        onClick={() => toastInfo("Ainda não implementado")}
                      />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-3">
                      <div className="id-externo-style">
                        <p className="id-externo-font">
                          <b># {solicitacao.id_externo}</b>
                        </p>
                        <p>
                          <b>Nº da Solicitação</b>
                        </p>
                      </div>
                    </div>
                    <div className="col-3">
                      <p>Escola Solicitante:</p>
                      <p>
                        <b>{solicitacao.escola.nome}</b>
                      </p>
                    </div>
                    <div className="offset-3 col-3">
                      <p>EOL:</p>
                      <p>
                        <b>{solicitacao.escola.codigo_eol}</b>
                      </p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-3">
                      <p>DRE:</p>
                      <p>
                        <b>{solicitacao.escola.diretoria_regional.nome}</b>
                      </p>
                    </div>
                    <div className="col-3">
                      <p>Lote:</p>
                      <p>
                        <b>{solicitacao.escola.lote.nome}</b>
                      </p>
                    </div>
                    <div className="col-3">
                      <p>Tipo de Gestão</p>
                      <p>
                        <b>{solicitacao.escola.tipo_gestao.nome}</b>
                      </p>
                    </div>
                    <div className="col-3">
                      <p>Empresa:</p>
                      <p>
                        <b>
                          {solicitacao.escola.lote.terceirizada.nome_fantasia}
                        </b>
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row mx-3">
                    <FluxoDeStatus
                      listaDeStatus={solicitacao.logs}
                      fluxo={fluxoPartindoEscola}
                      eh_gestao_alimentacao={true}
                    />
                  </div>
                  <hr />
                  <div className="row mt-3">
                    <div className="col-12">
                      <p>
                        <b>Solicitação de Alteração</b>
                      </p>
                    </div>
                    <div className="col-4">
                      <p>Tipo de Alteração:</p>
                      <p>
                        <b>{solicitacao.motivo.nome}</b>
                      </p>
                    </div>
                    <div className="col-3">
                      <p>Alterar de:</p>
                      <p>
                        <b>
                          {solicitacao.data_inicial
                            ? solicitacao.data_inicial
                            : solicitacao.alterar_dia}
                        </b>
                      </p>
                    </div>

                    <div className="col-3">
                      {solicitacao.data_final && (
                        <>
                          <p>Até o dia:</p>
                          <p>
                            <b>{solicitacao.data_final}</b>
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  {dadosTabela.map((periodo, index) => {
                    let qtdMatriculadosNoPeriodo = matriculados.find(
                      p => p.nome === periodo.nome
                    );
                    const uuids = periodo.substituicoesCEI.faixas_etarias
                      .map(s => s.faixa_etaria)
                      .map(f => f.uuid);
                    const faixasCEI = qtdMatriculadosNoPeriodo.CEI.filter(f =>
                      uuids.includes(f.uuid)
                    );
                    return (
                      <div className="row" key={index}>
                        <div className="col-12">
                          <label
                            style={{
                              background: periodo.background,
                              border: `1px solid ${periodo.borderColor}`,
                              borderRadius: "5px",
                              margin: "1% 0px",
                              width: "100%",
                              padding: "8px 15px",
                              height: "40px"
                            }}
                          >
                            {periodo.nome}
                          </label>
                        </div>
                        <div className="col-12">
                          <div className="container-fluid pr-0">
                            {periodo.substituicoesCEI && (
                              <div className="row">
                                <div className="col-12">
                                  <label className="periodo-label-style">
                                    Alunos CEI
                                  </label>
                                </div>
                                <div className="col-12 substituicoes-font-style">
                                  <p>
                                    Alteração do tipo de Alimentação de:{" "}
                                    <b className="tipos-alimentacao-style">
                                      {periodo.substituicoesCEI.tipos_alimentacao_de
                                        .map(ta => ta.nome)
                                        .join(", ")}
                                    </b>
                                  </p>
                                  <p>
                                    Para o tipo de Alimentação:{" "}
                                    <b className="tipos-alimentacao-style">
                                      {periodo.substituicoesCEI.tipos_alimentacao_para
                                        .map(ta => ta.nome)
                                        .join(", ")}
                                    </b>
                                  </p>
                                </div>
                                <div className="col-12">
                                  <table className="table faixas-etarias-cei-alteracao">
                                    <thead>
                                      <tr>
                                        <th className="col-7">Faixa Etária</th>
                                        <th className="col-3 text-center">
                                          Alunos matriculados
                                        </th>
                                        <th className="col-2 text-center">
                                          Quantidade
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {periodo.substituicoesCEI.faixas_etarias.map(
                                        (faixa, idxFaixa) => {
                                          let qtdMatriculadosNaFaixa = matriculados.find(
                                            p => p.nome === periodo.nome
                                          );
                                          qtdMatriculadosNaFaixa = qtdMatriculadosNaFaixa.CEI.find(
                                            f =>
                                              f.uuid === faixa.faixa_etaria.uuid
                                          );
                                          qtdMatriculadosNaFaixa = qtdMatriculadosNaFaixa
                                            ? qtdMatriculadosNaFaixa.quantidade_alunos
                                            : "teste";
                                          return (
                                            <tr key={idxFaixa}>
                                              <td className="col-7">
                                                {faixa.faixa_etaria.__str__}
                                              </td>
                                              <td className="col-3 text-center">
                                                {qtdMatriculadosNaFaixa}
                                              </td>
                                              <td className="col-2 text-center">
                                                {faixa.quantidade}
                                              </td>
                                            </tr>
                                          );
                                        }
                                      )}
                                    </tbody>
                                    <thead>
                                      <tr>
                                        <th className="col-7">Total</th>
                                        <th className="col-3 text-center">
                                          {totalAlunosPorPeriodoCEI(
                                            faixasCEI,
                                            "quantidade_alunos"
                                          )}
                                        </th>
                                        <th className="col-2 text-center">
                                          {totalAlunosPorPeriodoCEI(
                                            periodo.substituicoesCEI
                                              .faixas_etarias,
                                            "quantidade"
                                          )}
                                        </th>
                                      </tr>
                                    </thead>
                                  </table>
                                </div>
                              </div>
                            )}
                            {periodo.substituicoesEMEI && (
                              <div className="row">
                                <div className="col-12">
                                  <label className="periodo-label-style">
                                    Alunos EMEI
                                  </label>
                                </div>
                                <div className="col-12 substituicoes-font-style">
                                  <p>
                                    Alteração do tipo de Alimentação de:{" "}
                                    <b className="tipos-alimentacao-style">
                                      {periodo.substituicoesEMEI.tipos_alimentacao_de
                                        .map(ta => ta.nome)
                                        .join(", ")}
                                    </b>
                                  </p>
                                  <p>
                                    Para o tipo de Alimentação:{" "}
                                    <b className="tipos-alimentacao-style">
                                      {periodo.substituicoesEMEI.tipos_alimentacao_para
                                        .map(ta => ta.nome)
                                        .join(", ")}
                                    </b>
                                  </p>
                                </div>
                                <div className="col-12">
                                  <table className="table faixas-etarias-cei-alteracao">
                                    <thead>
                                      <tr>
                                        <th className="col-7">
                                          <span className="ml-5">
                                            Alunos matriculados
                                          </span>
                                          <b className="ml-5">
                                            {
                                              matriculados.find(
                                                p => p.nome === periodo.nome
                                              ).EMEI
                                            }
                                          </b>
                                        </th>
                                        <th className="col-5">
                                          <span className="ml-5">
                                            Quantidade
                                          </span>
                                          <b className="ml-5">
                                            {
                                              periodo.substituicoesEMEI
                                                .qtd_alunos
                                            }
                                          </b>
                                        </th>
                                      </tr>
                                    </thead>
                                  </table>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div className="row mt-3">
                    <div className="col-12">
                      <div className="container-fluid">
                        <p>Observações:</p>
                        <p
                          className="observacao-alteracao-cardapio-cemei"
                          dangerouslySetInnerHTML={{
                            __html: solicitacao.observacao
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <hr />
                  {justificativaCancelamentoEscola &&
                    justificativaCancelamentoEscola.map((log, idx) => {
                      return (
                        <div className="row mt-3" key={idx}>
                          <div className="col-12">
                            <div className="container-fluid">
                              <p className="label-escola-cancela">
                                {log.criado_em} - Escola cancelou
                              </p>
                              <p
                                className="observacao-alteracao-cardapio-cemei"
                                dangerouslySetInnerHTML={{
                                  __html: log.justificativa
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  <hr />
                  <div className="row mt-3">
                    <div className="col-12">
                      {visao === ESCOLA &&
                        solicitacao.status === "DRE_A_VALIDAR" && (
                          <Botao
                            texto="Cancelar"
                            type={BUTTON_TYPE.BUTTON}
                            style={BUTTON_STYLE.GREEN_OUTLINE}
                            className="ml-3 float-right"
                            onClick={() => setShowModalEscolaCancela(true)}
                          />
                        )}
                    </div>
                  </div>
                  <ModalEscolaCancela
                    showModal={showModalEscolaCancela}
                    closeModal={() => setShowModalEscolaCancela(false)}
                    solicitacao={solicitacao}
                    endpoint={endpointNaoAprovaSolicitacao}
                    getSolicitacao={getSolicitacao}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Spin>
  );
};
