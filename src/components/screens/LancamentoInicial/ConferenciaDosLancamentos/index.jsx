import React, { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Field, Form } from "react-final-form";
import HTTP_STATUS from "http-status-codes";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Spin } from "antd";
import InputText from "components/Shareable/Input/InputText";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";
import { ModalOcorrencia } from "./components/ModalOcorrencia";
import { BUTTON_ICON } from "components/Shareable/Botao/constants";
import { TabelaLancamentosPeriodo } from "./components/TabelaLancamentosPeriodo";
import {
  medicaoInicialExportarOcorrenciasPDF,
  relatorioMedicaoInicialPDF
} from "services/relatorios";
import { getVinculosTipoAlimentacaoPorEscola } from "services/cadastroTipoAlimentacao.service";
import {
  getPeriodosGruposMedicao,
  retrieveSolicitacaoMedicaoInicial,
  dreAprovaMedicao,
  dreAprovaSolicitacaoMedicao,
  dreSolicitaCorrecaoUE
} from "services/medicaoInicial/solicitacaoMedicaoInicial.service";
import {
  MEDICAO_STATUS_DE_PROGRESSO,
  OCORRENCIA_STATUS_DE_PROGRESSO
} from "./constants";
import "./style.scss";
import ModalSolicitacaoDownload from "components/Shareable/ModalSolicitacaoDownload";
import { ModalEnviarParaCodae } from "./components/ModalEnviarParaCodae";
import { ModalSolicitarCorrecaoUE } from "./components/ModalSolicitarCorrecaoUE";
import ModalHistorico from "components/Shareable/ModalHistorico";

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
  const [showModalEnviarParaCodae, setShowModalEnviarParaCodae] = useState(
    false
  );
  const [
    showModalSolicitarCorrecaoUE,
    setShowModalSolicitarCorrecaoUE
  ] = useState(false);
  const [logCorrecaoOcorrencia, setLogCorrecaoOcorrencia] = useState(null);
  const [
    exibirModalCentralDownloads,
    setExibirModalCentralDownloads
  ] = useState(false);
  const [textoOcorrencia, setTextoOcorrencia] = useState("");
  const [desabilitarEnviarParaCodae, setDesabilitarEnviarParaCodae] = useState(
    true
  );
  const [
    desabilitarSolicitarCorrecao,
    setDesabilitarSolicitarCorrecao
  ] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const visualizarModal = () => {
    setShowModal(true);
  };
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
        const arquivoPdfOcorrencia = response.data.ocorrencia;
        const logOcorrencia = arquivoPdfOcorrencia.logs.find(log =>
          ["Correção solicitada", "Aprovado pela DRE"].includes(
            log.status_evento_explicacao
          )
        );
        setOcorrencia(arquivoPdfOcorrencia);
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

  useEffect(() => {
    if (solicitacao && periodosGruposMedicao) {
      const todosPeriodosGruposAprovados = !periodosGruposMedicao.some(
        periodoGrupo => periodoGrupo.status !== "MEDICAO_APROVADA_PELA_DRE"
      );
      if (solicitacao.status !== "MEDICAO_APROVADA_PELA_DRE") {
        if (solicitacao.com_ocorrencias) {
          if (
            ocorrencia &&
            ocorrencia.status === "MEDICAO_APROVADA_PELA_DRE" &&
            todosPeriodosGruposAprovados
          ) {
            setDesabilitarEnviarParaCodae(false);
          } else {
            setDesabilitarEnviarParaCodae(true);
          }
        } else if (todosPeriodosGruposAprovados) {
          setDesabilitarEnviarParaCodae(false);
        } else {
          setDesabilitarEnviarParaCodae(true);
        }
      } else {
        setDesabilitarEnviarParaCodae(true);
      }

      const statusPermitidosSolicitarCorrecao = [
        "MEDICAO_CORRECAO_SOLICITADA",
        "MEDICAO_APROVADA_PELA_DRE"
      ];
      const algumPeriodoGrupoParaCorrigir = periodosGruposMedicao.some(
        periodoGrupo => periodoGrupo.status === "MEDICAO_CORRECAO_SOLICITADA"
      );

      if (!statusPermitidosSolicitarCorrecao.includes(solicitacao.status)) {
        if (solicitacao.com_ocorrencias) {
          if (
            ocorrencia &&
            (ocorrencia.status === "MEDICAO_CORRECAO_SOLICITADA" ||
              algumPeriodoGrupoParaCorrigir)
          ) {
            setDesabilitarSolicitarCorrecao(false);
          } else {
            setDesabilitarSolicitarCorrecao(true);
          }
        } else if (algumPeriodoGrupoParaCorrigir) {
          setDesabilitarSolicitarCorrecao(false);
        } else {
          setDesabilitarSolicitarCorrecao(true);
        }
      } else {
        setDesabilitarSolicitarCorrecao(true);
      }
    }
  }, [ocorrencia, solicitacao, periodosGruposMedicao]);

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

  const aprovarSolicitacaoMedicao = async () => {
    setLoading(true);
    const response = await dreAprovaSolicitacaoMedicao(solicitacao.uuid);
    if (response.status === HTTP_STATUS.OK) {
      toastSuccess("Medição aprovada pela DRE e enviada para análise de CODAE");
    } else {
      setErroAPI("Erro ao aprovar Medição. Tente novamente mais tarde.");
    }
    getSolMedInicialAsync();
    getVinculosTipoAlimentacaoPorEscolaAsync();
    getPeriodosGruposMedicaoAsync();
  };

  const dreSolicitaCorrecaoMedicao = async () => {
    setLoading(true);
    const response = await dreSolicitaCorrecaoUE(solicitacao.uuid);
    if (response.status === HTTP_STATUS.OK) {
      toastSuccess(
        "Solicitação de correção enviada para a unidade com sucesso"
      );
    } else {
      setErroAPI(
        "Erro ao solicitar correção da Medição. Tente novamente mais tarde."
      );
    }
    getSolMedInicialAsync();
    getVinculosTipoAlimentacaoPorEscolaAsync();
    getPeriodosGruposMedicaoAsync();
  };

  const handleClickDownload = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const uuidSolicitacaoMedicao = urlParams.get("uuid");
    const response = await relatorioMedicaoInicialPDF(uuidSolicitacaoMedicao);
    if (response.status === HTTP_STATUS.OK) {
      setExibirModalCentralDownloads(true);
    } else {
      toastError("Erro ao exportar pdf. Tente novamente mais tarde.");
    }
  };

  return (
    <div className="conferencia-dos-lancamentos">
      {solicitacao && (
        <ModalHistorico
          visible={showModal}
          onOk={() => setShowModal(false)}
          onCancel={() => setShowModal(false)}
          logs={solicitacao.ocorrencia.logs}
          solicitacaoMedicaoInicial={solicitacao.ocorrencia}
          titulo="Histórico do Formulário de Ocorrências yyy"
          getHistorico={() => solicitacao.ocorrencia.logs}
        />
      )}
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
                    <div className="row">
                      <div className="col-12">
                        <div className="content-section-ocorrencias">
                          <div className="row">
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
                                  <span className="status-ocorrencia text-center mr-3">
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
                                          className={`${
                                            BUTTON_ICON.DOWNLOAD
                                          } mr-2`}
                                        />
                                        Download de Ocorrências
                                      </span>
                                    ) : (
                                      <label
                                        className="green visualizar-ocorrencias"
                                        onClick={() =>
                                          setOcorrenciaExpandida(true)
                                        }
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
                          </div>
                          <div className="row">
                            {ocorrenciaExpandida && ocorrencia && (
                              <Fragment>
                                <div className="col-5 mt-3">
                                  {logCorrecaoOcorrencia &&
                                    `${textoOcorrencia} ${
                                      logCorrecaoOcorrencia.criado_em
                                    }`}
                                </div>
                                <div className="col-7 text-right mt-3">
                                  <Botao
                                    texto="Histórico"
                                    type={BUTTON_TYPE.BUTTON}
                                    style={BUTTON_STYLE.GREEN_OUTLINE}
                                    className="mr-3"
                                    onClick={visualizarModal}
                                  />
                                  <Botao
                                    className="mr-3"
                                    texto="Solicitar correção no formulário"
                                    type={BUTTON_TYPE.BUTTON}
                                    style={BUTTON_STYLE.GREEN_OUTLINE_WHITE}
                                    disabled={[
                                      "MEDICAO_APROVADA_PELA_DRE",
                                      "MEDICAO_CORRECAO_SOLICITADA"
                                    ].includes(solicitacao.status)}
                                    onClick={() =>
                                      setShowModalSalvarOcorrencia(true)
                                    }
                                  />
                                  <Botao
                                    texto="Aprovar formulário"
                                    type={BUTTON_TYPE.BUTTON}
                                    style={BUTTON_STYLE.GREEN}
                                    disabled={
                                      (logCorrecaoOcorrencia &&
                                        logCorrecaoOcorrencia.status_evento_explicacao ===
                                          "Aprovado pela DRE") ||
                                      [
                                        "MEDICAO_APROVADA_PELA_DRE",
                                        "MEDICAO_CORRECAO_SOLICITADA"
                                      ].includes(solicitacao.status)
                                    }
                                    onClick={() =>
                                      setShowModalAprovarOcorrencia(true)
                                    }
                                  />
                                </div>
                              </Fragment>
                            )}
                          </div>
                        </div>
                      </div>
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
                            solicitacao={solicitacao}
                          />
                        );
                      })}
                    </div>
                    <div className="float-right">
                      <Botao
                        texto="Exportar PDF"
                        style={BUTTON_STYLE.GREEN_OUTLINE_WHITE}
                        onClick={() => handleClickDownload()}
                      />
                      {![
                        "MEDICAO_APROVADA_PELA_DRE",
                        "MEDICAO_CORRECAO_SOLICITADA"
                      ].includes(solicitacao.status) && (
                        <>
                          <Botao
                            className="ml-3"
                            texto="Solicitar Correção"
                            style={BUTTON_STYLE.GREEN_OUTLINE_WHITE}
                            onClick={() =>
                              setShowModalSolicitarCorrecaoUE(true)
                            }
                            disabled={desabilitarSolicitarCorrecao}
                          />
                          <Botao
                            className="ml-3"
                            texto="Enviar para CODAE"
                            style={BUTTON_STYLE.GREEN}
                            onClick={() => setShowModalEnviarParaCodae(true)}
                            disabled={desabilitarEnviarParaCodae}
                          />
                        </>
                      )}
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
        <ModalSolicitacaoDownload
          show={exibirModalCentralDownloads}
          setShow={setExibirModalCentralDownloads}
        />
        <ModalEnviarParaCodae
          showModal={showModalEnviarParaCodae}
          setShowModal={value => setShowModalEnviarParaCodae(value)}
          aprovarSolicitacaoMedicao={() => {
            aprovarSolicitacaoMedicao();
          }}
        />
        <ModalSolicitarCorrecaoUE
          showModal={showModalSolicitarCorrecaoUE}
          setShowModal={value => setShowModalSolicitarCorrecaoUE(value)}
          endpoint={() => {
            dreSolicitaCorrecaoMedicao();
          }}
        />
      </Spin>
    </div>
  );
};
