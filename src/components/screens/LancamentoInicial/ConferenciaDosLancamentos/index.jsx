import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Field, Form } from "react-final-form";
import HTTP_STATUS from "http-status-codes";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Spin } from "antd";
import InputText from "components/Shareable/Input/InputText";
import { toastError } from "components/Shareable/Toast/dialogs";
import { BUTTON_ICON } from "components/Shareable/Botao/constants";
import { medicaoInicialExportarOcorrenciasPDF } from "services/relatorios";
import { getVinculosTipoAlimentacaoPorEscola } from "services/cadastroTipoAlimentacao.service";
import { getPeriodosInclusaoContinua } from "services/medicaoInicial/periodoLancamentoMedicao.service";
import { retrieveSolicitacaoMedicaoInicial } from "services/medicaoInicial/solicitacaoMedicaoInicial.service";
import { MEDICAO_STATUS_DE_PROGRESSO } from "./constants";
import "./style.scss";

export const ConferenciaDosLancamentos = () => {
  const location = useLocation();

  const [erroAPI, setErroAPI] = useState("");
  const [loading, setLoading] = useState(true);
  const [dadosIniciais, setDadosIniciais] = useState(null);
  const [solicitacao, setSolicitacao] = useState(null);
  const [periodosSimples, setPeriodosSimples] = useState(null);
  const [periodosInclusaoContinua, setPeriodosInclusaoContinua] = useState(
    null
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    const escolaUuid = location.state.escolaUuid;
    let dados_iniciais;
    let mes;
    let mesString;
    let ano;
    let escola;

    const getSolMedInicialAsync = async () => {
      const response = await retrieveSolicitacaoMedicaoInicial(uuid);
      if (response.status === HTTP_STATUS.OK) {
        setSolicitacao(response.data);
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
      } else {
        setErroAPI("Erro ao carregar Medição Inicial.");
      }
      dados_iniciais && setDadosIniciais(dados_iniciais);
      getPeriodosInclusaoContinuaAsync(mes, ano);
      setLoading(false);
    };

    const getVinculosTipoAlimentacaoPorEscolaAsync = async () => {
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

    const getPeriodosInclusaoContinuaAsync = async (mes, ano) => {
      const escola = escolaUuid;
      const response = await getPeriodosInclusaoContinua({
        mes,
        ano,
        escola
      });
      if (response.status === HTTP_STATUS.OK) {
        setPeriodosInclusaoContinua(response.data.periodos);
      } else {
        setErroAPI(
          "Erro ao carregar períodos de inclusão contínua. Tente novamente mais tarde."
        );
      }
    };

    getSolMedInicialAsync();
    getVinculosTipoAlimentacaoPorEscolaAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const downloadPdfOcorrencias = () => {
    if (solicitacao.anexos) {
      const pdfAnexo = solicitacao.anexos.find(anexo =>
        anexo.arquivo.includes(".pdf")
      );
      if (pdfAnexo) {
        medicaoInicialExportarOcorrenciasPDF(pdfAnexo.arquivo);
      } else {
        toastError("Arquivo PDF de ocorrências não encontrado");
      }
    }
  };

  return (
    <div className="conferencia-dos-lancamentos">
      {erroAPI && <div>{erroAPI}</div>}
      <Spin tip="Carregando..." spinning={loading}>
        {!erroAPI && dadosIniciais && periodosSimples && (
          <Form
            onSubmit={() => {}}
            initialValues={dadosIniciais}
            render={({ handleSubmit }) => (
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
                    <div>
                      <p className="section-title-conf-lancamentos">
                        Progresso de validação de refeições informadas
                      </p>
                      <p>
                        Status de progresso:{" "}
                        <b>
                          {MEDICAO_STATUS_DE_PROGRESSO[solicitacao.status].nome}
                        </b>
                      </p>
                    </div>
                    <hr />
                    <div>
                      <p className="section-title-conf-lancamentos">
                        Ocorrências
                      </p>
                      <div className="content-section-ocorrencias">
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
                        {solicitacao.com_ocorrencias ? (
                          <div
                            className="download-ocorrencias"
                            onClick={() => downloadPdfOcorrencias()}
                          >
                            <i className={`${BUTTON_ICON.DOWNLOAD} mr-2`} />
                            Download de Ocorrências
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <hr />
                    <div>
                      <p className="section-title-conf-lancamentos">
                        Acompanhamento do lançamento
                      </p>
                      {periodosSimples.map((periodo, index) => (
                        <div
                          key={index}
                          className="content-section-acompanhamento-lancamento mb-3"
                        >
                          <p className="mb-0">
                            <b>{periodo.periodo_escolar.nome}</b>
                          </p>
                          <div className="content-section-acompanhamento-lancamento-right">
                            <div className="acompanhamento-status-lancamento mr-3">
                              Pendente de Análise
                            </div>
                            <p
                              className="visualizar-lancamento mb-0"
                              onClick={() => {}}
                            >
                              <b>VISUALIZAR</b>
                            </p>
                          </div>
                        </div>
                      ))}
                      {periodosInclusaoContinua &&
                        Object.keys(periodosInclusaoContinua).map(
                          (periodo, index) => (
                            <div
                              key={index}
                              className="content-section-acompanhamento-lancamento mb-3"
                            >
                              <p className="mb-0">
                                <b>Programas e Projetos - {periodo}</b>
                              </p>
                              <div className="content-section-acompanhamento-lancamento-right">
                                <div className="acompanhamento-status-lancamento mr-3">
                                  Pendente de Análise
                                </div>
                                <p
                                  className="visualizar-lancamento mb-0"
                                  onClick={() => {}}
                                >
                                  <b>VISUALIZAR</b>
                                </p>
                              </div>
                            </div>
                          )
                        )}
                    </div>
                  </div>
                </div>
              </form>
            )}
          />
        )}
      </Spin>
    </div>
  );
};
