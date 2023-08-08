import React, { useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { Spin } from "antd";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import {
  criarEditarNotificacao,
  enviarNotificacao,
  getNotificacao
} from "services/logistica.service";
import { Field, Form } from "react-final-form";
import InputText from "components/Shareable/Input/InputText";
import ModalDetalharGuia from "../CadastroNotificacao/components/ModalDetalharGuia";
import "./styles.scss";
import { TextArea } from "components/Shareable/TextArea/TextArea";
import { TIPOS_OCORRENCIAS_OPTIONS } from "constants/shared";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";
import ModalConfirmarEnvio from "./components/ModalConfirmarEnvio";
import { GUIAS_NOTIFICACAO, LOGISTICA } from "configs/constants";
import { useHistory } from "react-router-dom";
import ModalCancelarEnvio from "./components/ModalCancelarEnvio";
import BotaoVoltar from "components/Shareable/Page/BotaoVoltar";

export default ({ naoEditavel = false, botaoVoltar, voltarPara }) => {
  const history = useHistory();
  const [carregando, setCarregando] = useState(false);
  const [notificacao, setNotificacao] = useState({});
  const [initialValues, setInitialValues] = useState({});
  const [guiaModal, setGuiaModal] = useState();
  const [modalConfirmacao, setModalConfirmacao] = useState(false);
  const [modalCancelar, setModalCancelar] = useState(false);

  useEffect(() => {
    const carregarNotificacao = async uuid => {
      let response;
      try {
        setCarregando(true);
        response = await getNotificacao(uuid);
        let notificacao = organizaOcorrencias(response.data);
        setNotificacao(notificacao);
        let previsoes_contratuais = getPrevisoesContratuais(
          response.data.previsoes_contratuais,
          notificacao.lista_ocorrencias
        );

        setInitialValues({
          numero_notificacao: notificacao.numero,
          nome_empresa: notificacao.empresa.nome_fantasia,
          processo_sei: notificacao.processo_sei,
          ...previsoes_contratuais
        });

        setCarregando(false);
      } catch (e) {
        toastError(e.response.data.detail);
        setCarregando(false);
      }
    };

    const queryString = window.location.search;

    if (queryString) {
      const urlParams = new URLSearchParams(window.location.search);
      const uuidParametro = urlParams.get("uuid");
      carregarNotificacao(uuidParametro);
    }
  }, []);

  const labelOcorrencia = id =>
    TIPOS_OCORRENCIAS_OPTIONS.find(x => x.value === id).label;

  const getPrevisoesContratuais = (previsoes, ocorrencias) => {
    let values = {};
    previsoes.forEach(prev => {
      let index = Object.keys(ocorrencias).findIndex(
        x => x === prev.motivo_ocorrencia
      );
      values[`previsao_contratual_${index}`] = prev.previsao_contratual;
    });
    return values;
  };

  const organizaOcorrencias = notificacao => {
    let guias = notificacao.guias_notificadas;

    let ocorrencias = {};

    guias.forEach(guia => {
      guia.conferencias.map(c =>
        c.conferencia_dos_alimentos.forEach(conf => {
          conf.ocorrencia.forEach(ocorrencia => {
            if (ocorrencias[ocorrencia]) {
              if (!ocorrencias[ocorrencia].includes(guia)) {
                ocorrencias[ocorrencia].push(guia);
              }
            } else {
              ocorrencias[ocorrencia] = [guia];
            }
          });
        })
      );
    });

    notificacao.lista_ocorrencias = ocorrencias;

    return notificacao;
  };

  const montaPayload = values => {
    let payload = {};
    payload.processo_sei = values.processo_sei;
    payload.previsoes = [];

    Object.keys(notificacao.lista_ocorrencias).forEach((occ, index) => {
      if (values[`previsao_contratual_${index}`]) {
        let prev = {
          motivo_ocorrencia: occ,
          previsao_contratual: values[`previsao_contratual_${index}`]
        };
        payload.previsoes.push(prev);
      }
    });

    return payload;
  };

  const salvarNotificacao = async values => {
    setCarregando(true);
    let payload = montaPayload(values);
    let response = await criarEditarNotificacao(notificacao.uuid, payload);
    if (response.status === HTTP_STATUS.OK) {
      toastSuccess("Notificação criada com sucesso!");
      setCarregando(false);
    } else {
      toastError("Erro ao salvar Notificação");
    }
  };

  const voltarPagina = () => history.push(`/${LOGISTICA}/${GUIAS_NOTIFICACAO}`);

  const salvarEnviarNotificacao = async values => {
    setCarregando(true);
    let payload = montaPayload(values);
    let response = await enviarNotificacao(notificacao.uuid, payload);
    if (response.status === HTTP_STATUS.OK) {
      toastSuccess(
        "Notificação enviada para assinatura do Fiscal de Contrato com sucesso!"
      );
      setCarregando(false);
      voltarPagina();
    } else {
      toastError("Erro ao enviar Notificação");
    }
  };
  const validaForm = values => {
    let processosIncompletos = false;

    if (notificacao.lista_ocorrencias) {
      Object.keys(notificacao.lista_ocorrencias).forEach((occ, index) => {
        if (!values[`previsao_contratual_${index}`]) {
          processosIncompletos = true;
        }
      });
    }

    return !values.processo_sei || processosIncompletos;
  };

  const handleClickVoltar = () => {
    voltarPara ? history.push(voltarPara) : history.goBack();
  };

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <ModalDetalharGuia
        guia={guiaModal}
        handleClose={() => setGuiaModal(false)}
        botaoAcao={() => {}}
      />
      <ModalConfirmarEnvio
        values={modalConfirmacao}
        handleClose={() => setModalConfirmacao(false)}
        enviarNotificacao={salvarEnviarNotificacao}
      />
      <ModalCancelarEnvio
        show={modalCancelar}
        handleClose={() => setModalCancelar(false)}
        voltarPagina={voltarPagina}
      />
      <div className="card mt-3 card-notificar-empresa">
        <div className="card-body notificar-empresa">
          <Form
            onSubmit={() => {}}
            initialValues={initialValues}
            validate={() => {}}
            render={({ handleSubmit, values }) => (
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-6">
                    <Field
                      component={InputText}
                      label="Nº da Notificação"
                      name="numero_notificacao"
                      className="input-busca-produto"
                      disabled
                    />
                  </div>
                  <div className="col-6">
                    <Field
                      component={InputText}
                      label="Empresa"
                      name="nome_empresa"
                      className="input-busca-produto"
                      disabled={naoEditavel}
                    />
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-6">
                    <Field
                      component={InputText}
                      label="Nº do Processo SEI"
                      name="processo_sei"
                      placeholder="Digite o Nº do Processo SEI"
                      className="input-busca-produto"
                      required
                      disabled={naoEditavel}
                    />
                  </div>
                  <div className="col-6 align-self-end pb-2">
                    Acesso ao Processo SEI:&nbsp;
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://processos.prefeitura.sp.gov.br/Forms/consultarProcessos.aspx#"
                    >
                      Clique aqui
                    </a>
                  </div>
                </div>

                {notificacao.lista_ocorrencias &&
                  Object.keys(notificacao.lista_ocorrencias).map(
                    (ocorrencia, index) => {
                      return (
                        <>
                          {index !== 0 && <hr />}
                          <div className="ocorrencia" key={index}>
                            <div className="titulo-verde">
                              {labelOcorrencia(ocorrencia)}
                            </div>
                            <div className="subtitulo">
                              Guias com Notificações
                            </div>
                            <div className="flex-container">
                              {notificacao.lista_ocorrencias[ocorrencia].map(
                                (guia, index) => (
                                  <div
                                    key={index}
                                    onClick={() => setGuiaModal(guia)}
                                    className="numero-guia"
                                  >
                                    {guia.numero_guia}
                                  </div>
                                )
                              )}
                            </div>
                            <Field
                              component={TextArea}
                              label="Previsão Contratual"
                              name={`previsao_contratual_${index}`}
                              className="input-busca-produto"
                              placeholder="Descreva a Previsão contratual"
                              required
                              disabled={naoEditavel}
                            />
                          </div>
                        </>
                      );
                    }
                  )}

                <div className="row float-right mt-4">
                  {botaoVoltar && <BotaoVoltar onClick={handleClickVoltar} />}
                  {naoEditavel === false && (
                    <div className="col-12">
                      <Botao
                        texto="Cancelar"
                        type={BUTTON_TYPE.BUTTON}
                        onClick={() => {
                          setModalCancelar(true);
                        }}
                        style={BUTTON_STYLE.GREEN_OUTLINE}
                        className="ml-3"
                      />
                      <Botao
                        texto="Salvar Notificação"
                        className="ml-3"
                        onClick={() => {
                          salvarNotificacao(values);
                        }}
                        type={BUTTON_TYPE.BUTTON}
                        style={BUTTON_STYLE.GREEN_OUTLINE}
                      />
                      <Botao
                        texto="Salvar e Enviar Notificação"
                        type={BUTTON_TYPE.BUTTON}
                        onClick={() => {
                          setModalConfirmacao(values);
                        }}
                        disabled={validaForm(values)}
                        style={BUTTON_STYLE.GREEN}
                        className="ml-3"
                      />
                    </div>
                  )}
                </div>
              </form>
            )}
          />
        </div>
      </div>
    </Spin>
  );
};
