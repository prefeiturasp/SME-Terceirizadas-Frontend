import React, { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Field, Form } from "react-final-form";
import HTTP_STATUS from "http-status-codes";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Spin } from "antd";
import InputText from "components/Shareable/Input/InputText";
import { toastSuccess } from "components/Shareable/Toast/dialogs";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";
import { ModalOcorrencia } from "./components/ModalOcorrencia";
import { BUTTON_ICON } from "components/Shareable/Botao/constants";
import { TabelaLancamentosPeriodo } from "./components/TabelaLancamentosPeriodo";
import { medicaoInicialExportarOcorrenciasPDF } from "services/relatorios";
import { getVinculosTipoAlimentacaoPorEscola } from "services/cadastroTipoAlimentacao.service";
import {
  getPeriodosGruposMedicao,
  retrieveSolicitacaoMedicaoInicial,
  dreAprovaMedicao
} from "services/medicaoInicial/solicitacaoMedicaoInicial.service";
import {
  MEDICAO_STATUS_DE_PROGRESSO,
  OCORRENCIA_STATUS_DE_PROGRESSO
} from "./constants";
import "./style.scss";

export const ConferenciaDosLancamentos = () => {
  const location = useLocation();

  const [erroAPI, setErroAPI] = useState("");
  const [loading, setLoading] = useState(true);
  const [dadosIniciais, setDadosIniciais] = useState(null);
  const [solicitacao, setSolicitacao] = useState(null);
  const [periodosSimples, setPeriodosSimples] = useState(null);
  const [periodosGruposMedicao, setPeriodosGruposMedicao] = useState(null);
  const [mesSolicitacao, setMesSolicitacao] = useState(null);
  const [anoSolicitacao, setAnoSolicitacao] = useState(null);
  const [ocorrencia, setOcorrencia] = useState(null);
  const [ocorrenciaExpandida, setOcorrenciaExpandida] = useState(false);
  const [showModalSalvarOcorrencia, setShowModalSalvarOcorrencia] = useState(
    false
  );
  const [showModalAprovarOcorrencia, setShowModalAprovarOcorrencia] = useState(
    false
  );
  const [logCorrecaoOcorrencia, setLogCorrecaoOcorrencia] = useState(null);
  const [textoOcorrencia, setTextoOcorrencia] = useState("");

  const getPeriodosGruposMedicaoAsync = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    const params = { uuid_solicitacao: uuid };
    const response = await getPeriodosGruposMedicao(params);
    if (response.status === HTTP_STATUS.OK) {
      setPeriodosGruposMedicao(response.data.results);
    } else {
      setErroAPI(
        "Erro ao carregar períodos/grupos da solicitação de medição. Tente novamente mais tarde."
      );
    }
  };

  const getSolMedInicialAsync = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    const response = await retrieveSolicitacaoMedicaoInicial(uuid);
    let dados_iniciais;
    let mes;
    let mesString;
    let ano;
    let escola;
    if (response.status === HTTP_STATUS.OK) {
      mes = response.data.mes;
      ano = response.data.ano;
      const data = new Date(`${mes}/01/${ano}`);
      mesString = format(data, "LLLL", {
        locale: ptBR
      }).toString();
      mesString = mesString.charAt(0).toUpperCase() + mesString.slice(1);
      escola = response.data.escola;
      dados_iniciais = {
        mes_lancamento: `${mesString} / ${ano}`,
        unidade_educacional: escola
      };
      setSolicitacao(response.data);
      setMesSolicitacao(mes);
      setAnoSolicitacao(ano);
      if (response.data.com_ocorrencias) {
        const arquivosOcorrencia = response.data.anexos.find(
          anexo => anexo.extensao === ".pdf"
        );
        const logOcorrencia = arquivosOcorrencia.logs.find(log =>
          ["Correção solicitada", "Aprovado pela DRE"].includes(
            log.status_evento_explicacao
          )
        );
        setOcorrencia(arquivosOcorrencia);
        setLogCorrecaoOcorrencia(logOcorrencia);
        if (logOcorrencia) {
          setTextoOcorrencia(
            logOcorrencia.status_evento_explicacao === "Correção solicitada"
              ? "Solicitação de correção no Formulário de Ocorrências realizada em"
              : "Formulário de Ocorrências aprovado em"
          );
        }
      }
    } else {
      setErroAPI("Erro ao carregar Medição Inicial.");
    }
    dados_iniciais && setDadosIniciais(dados_iniciais);
    setLoading(false);
  };

  const getVinculosTipoAlimentacaoPorEscolaAsync = async () => {
    const escolaUuid = location.state.escolaUuid;
    const response_vinculos = await getVinculosTipoAlimentacaoPorEscola(
      escolaUuid
    );
    if (response_vinculos.status === HTTP_STATUS.OK) {
      setPeriodosSimples(response_vinculos.data.results);
    } else {
      setErroAPI(
        "Erro ao carregar períodos simples. Tente novamente mais tarde."
      );
    }
  };

  useEffect(() => {
    getSolMedInicialAsync();
    getVinculosTipoAlimentacaoPorEscolaAsync();
    getPeriodosGruposMedicaoAsync();
  }, []);

  const aprovarPeriodo = async (periodoGrupo, nomePeridoFormatado) => {
    setLoading(true);
    const response = await dreAprovaMedicao(
      periodoGrupo.uuid_medicao_periodo_grupo
    );
    if (response.status === HTTP_STATUS.OK) {
      toastSuccess(`Período ${nomePeridoFormatado} aprovado com sucesso!`);
    } else {
      setErroAPI(
        `Erro ao aprovar Período ${nomePeridoFormatado}. Tente novamente mais tarde.`
      );
    }
    getSolMedInicialAsync();
    getVinculosTipoAlimentacaoPorEscolaAsync();
    getPeriodosGruposMedicaoAsync();
  };

  return (
    <div className="conferencia-dos-lancamentos">
      {erroAPI && <div>{erroAPI}</div>}
      <Spin tip="Carregando..." spinning={loading}>
        {!erroAPI && dadosIniciais && periodosGruposMedicao && (
          <Form
            onSubmit={() => {}}
            initialValues={dadosIniciais}
            render={({ handleSubmit, form, values }) => (
              <form onSubmit={handleSubmit}>
                <div className="card mt-3">
                  <div className="card-body">
                    <div className="row pb-2">
                      <div className="col-3">
                        <b className="pb-2 mb-2">Mês do Lançamento</b>
                        <Field
                          component={InputText}
                          name="mes_lancamento"
                          disabled={true}
                          placeholder="Mês do Lançamento"
                        />
                      </div>
                      <div className="col-9">
                        <b className="pb-2">Unidade Educacional</b>
                        <Field
                          component={InputText}
                          name="unidade_educacional"
                          disabled={true}
                          placeholder="Unidade Educacional"
                        />
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-12">
                        <p className="section-title-conf-lancamentos">
                          Progresso de validação de refeições informadas
                        </p>
                      </div>
                      <div className="col-12">
                        <p>
                          Status de progresso:{" "}
                          <b>
                            {
                              MEDICAO_STATUS_DE_PROGRESSO[solicitacao.status]
                                .nome
                            }
                          </b>
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-12">
                        <p className="section-title-conf-lancamentos">
                          Ocorrências
                        </p>
                      </div>
                    </div>
                    <div className="row content-section-ocorrencias">
                      <div className="col-6">
                        <p className="mb-0">
                          Avaliação do Serviço:{" "}
                          <b
                            className={`${
                              solicitacao.com_ocorrencias
                                ? "value-avaliacao-servico-red"
                                : "value-avaliacao-servico-green"
                            }`}
                          >
                            {solicitacao.com_ocorrencias
                              ? "COM OCORRÊNCIAS"
                              : "SEM OCORRÊNCIAS"}
                          </b>
                        </p>
                      </div>
                      {solicitacao.com_ocorrencias ? (
                        <Fragment>
                          <div className="col-6 text-right">
                            <span className="status-ocorrencia text-center mr-2 p-1">
                              <b
                                className={
                                  ocorrencia.status ===
                                  "MEDICAO_CORRECAO_SOLICITADA"
                                    ? "red"
                                    : ""
                                }
                              >
                                {OCORRENCIA_STATUS_DE_PROGRESSO[
                                  ocorrencia.status
                                ] &&
                                  OCORRENCIA_STATUS_DE_PROGRESSO[
                                    ocorrencia.status
                                  ].nome}
                              </b>
                            </span>
                            {ocorrencia ? (
                              ocorrenciaExpandida ? (
                                <span
                                  className="download-ocorrencias"
                                  onClick={() =>
                                    medicaoInicialExportarOcorrenciasPDF(
                                      ocorrencia.arquivo
                                    )
                                  }
                                >
                                  <i
                                    className={`${BUTTON_ICON.DOWNLOAD} mr-2`}
                                  />
                                  Download de Ocorrências
                                </span>
                              ) : (
                                <label
                                  className="green"
                                  onClick={() => setOcorrenciaExpandida(true)}
                                >
                                  <b>VISUALIZAR</b>
                                </label>
                              )
                            ) : null}
                          </div>
                        </Fragment>
                      ) : (
                        <div className="col-6" />
                      )}
                      {ocorrenciaExpandida && ocorrencia && (
                        <Fragment>
                          <div className="col-5 mt-3 ">
                            {logCorrecaoOcorrencia &&
                              `${textoOcorrencia} ${
                                logCorrecaoOcorrencia.criado_em
                              }`}
                          </div>
                          <div className="col-7 text-right mt-3">
                            <Botao
                              className="mr-3"
                              texto="Solicitar correção no formulário"
                              type={BUTTON_TYPE.BUTTON}
                              style={BUTTON_STYLE.GREEN_OUTLINE_WHITE}
                              disabled={false}
                              onClick={() => setShowModalSalvarOcorrencia(true)}
                            />
                            <Botao
                              texto="Aprovar formulário"
                              type={BUTTON_TYPE.BUTTON}
                              style={BUTTON_STYLE.GREEN}
                              disabled={false}
                              onClick={() =>
                                setShowModalAprovarOcorrencia(true)
                              }
                            />
                          </div>
                        </Fragment>
                      )}
                    </div>
                    <hr />
                    <div>
                      <p className="section-title-conf-lancamentos">
                        Acompanhamento do lançamento
                      </p>
                      {periodosGruposMedicao.map((periodoGrupo, index) => {
                        return (
                          <TabelaLancamentosPeriodo
                            key={index}
                            periodoGrupo={periodoGrupo}
                            periodosSimples={periodosSimples}
                            mesSolicitacao={mesSolicitacao}
                            anoSolicitacao={anoSolicitacao}
                            form={form}
                            aprovarPeriodo={(
                              periodoGrupo,
                              nomePeridoFormatado
                            ) =>
                              aprovarPeriodo(periodoGrupo, nomePeridoFormatado)
                            }
                            values={values}
                            getPeriodosGruposMedicaoAsync={() =>
                              getPeriodosGruposMedicaoAsync()
                            }
                            setOcorrenciaExpandida={() =>
                              setOcorrenciaExpandida(false)
                            }
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </form>
            )}
          />
        )}
        <ModalOcorrencia
          showModal={showModalSalvarOcorrencia}
          setShowModal={value => setShowModalSalvarOcorrencia(value)}
          ocorrencia={ocorrencia}
          atualizarDados={() => getSolMedInicialAsync()}
          titulo={"Solicitar correção no formulário de ocorrências"}
          descricao={
            "Informe quais os pontos necessários de correção no Formulário de Ocorrências"
          }
          temJustificativa={true}
          ehCorrecao={true}
          tituloBotoes={["Cancelar", "Salvar"]}
        />
        <ModalOcorrencia
          showModal={showModalAprovarOcorrencia}
          setShowModal={value => setShowModalAprovarOcorrencia(value)}
          ocorrencia={ocorrencia}
          atualizarDados={() => getSolMedInicialAsync()}
          titulo={"Aprovar Formulário de Ocorrências"}
          descricao={"Deseja aprovar o Formulário de Ocorrências?"}
          temJustificativa={false}
          ehCorrecao={false}
          tituloBotoes={["Não", "Sim"]}
        />
      </Spin>
    </div>
  );
};
