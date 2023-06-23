import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { toastError } from "components/Shareable/Toast/dialogs";
import { getNotificacao } from "services/logistica.service";
import { Field, Form } from "react-final-form";
import InputText from "components/Shareable/Input/InputText";
import ModalDetalharGuia from "../CadastroNotificacao/components/ModalDetalharGuia";
import "./styles.scss";
import { TextArea } from "components/Shareable/TextArea/TextArea";
import { TIPOS_OCORRENCIAS_OPTIONS } from "constants/shared";

export default () => {
  const [carregando, setCarregando] = useState(false);
  const [notificacao, setNotificacao] = useState({});
  const [initialValues, setInitialValues] = useState({});
  const [guiaModal, setGuiaModal] = useState();

  useEffect(() => {
    const carregarNotificacao = async uuid => {
      let response;
      try {
        setCarregando(true);
        response = await getNotificacao(uuid);
        console.log(response.data);
        setNotificacao(organizaOcorrencias(response.data));
        setInitialValues({
          nome_empresa: response.data.empresa.nome_fantasia
        });

        setCarregando(false);
      } catch (e) {
        console.log(e);
        toastError(e.response.data.detail);
        setCarregando(false);
      }
      console.log(notificacao);
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

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <ModalDetalharGuia
        guia={guiaModal}
        handleClose={() => setGuiaModal(false)}
        botaoAcao={() => {}}
      />
      <div className="card mt-3 card-notificar-empresa">
        <div className="card-body notificar-empresa">
          <Form
            onSubmit={() => {}}
            initialValues={initialValues}
            validate={() => {}}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-6">
                    <Field
                      component={InputText}
                      label="Empresa"
                      name="nome_empresa"
                      className="input-busca-produto"
                      disabled
                    />
                  </div>
                  <div className="col-6">
                    <Field
                      component={InputText}
                      label="Nº do Processo SEI"
                      name="processo_sei"
                      className="input-busca-produto"
                      placeholder="Digite o Nº do Processo SEI"
                    />
                  </div>
                  <div className="col-6">
                    Link do Processo SEI: Clique &nbsp;
                    <a href="https://processos.prefeitura.sp.gov.br/Forms/consultarProcessos.aspx#">
                      aqui
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
                              required
                            />
                          </div>
                        </>
                      );
                    }
                  )}
              </form>
            )}
          />
        </div>
      </div>
    </Spin>
  );
};
