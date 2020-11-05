import { isequal, get } from "lodash";
import moment from "moment";
import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";

import { Botao } from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";
import { InputComData } from "components/Shareable/DatePicker";
import DietaConvencional from "./TabelaLancamento/DietaConvencional";
import DietaConvencionalFrequencia from "./TabelaLancamento/DietaConvencionalFrequencia";
import ObservacoesDiarias from "./TabelaLancamento/ObservacoesDiarias";
import DietaEspecial from "./TabelaLancamento/DietaEspecial";

import "./styles.scss";
import { validateFormLancamento, objectFlattener } from "./helpers";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import RefeicaoEnteralInput from "./TabelaLancamento/RefeicaoEnteralInput";
import {
  getDadosDeUmDia,
  getLancamentosDeUmDia,
  registraLancamentoDiario
} from "services/lancamentoInicial.service";
import { OK } from "http-status-codes";

import ListagemLancamentos from "./ListagemLancamentos";
import { Spin } from "antd";

export default ({
  textoCabecalho,
  cor,
  totalAlimentacoes,
  alimentacoesConvencionais,
  alimentacoesDietaA,
  alimentacoesDietaB,
  panorama
}) => {
  const [lancamentoAberto, setLancamentoAberto] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState(
    panorama
      ? {
          escola_periodo_escolar: panorama.uuid_escola_periodo_escolar
        }
      : {}
  );
  const abreFechaLancamento = () => {
    setLancamentoAberto(!lancamentoAberto);
  };
  const atualizaInitialValues = async dia => {
    setLoading(true);
    const promiseDados = getDadosDeUmDia(
      dia,
      panorama.uuid_escola_periodo_escolar
    );
    const promiseLancamentos = await getLancamentosDeUmDia(
      dia,
      panorama.uuid_escola_periodo_escolar
    );
    const [respostaDados, respostaLancamentos] = await Promise.all([
      promiseDados,
      promiseLancamentos
    ]);
    if (respostaLancamentos.status === OK && respostaDados.status === OK) {
      const initialValues = {
        data_lancamento: dia,
        escola_periodo_escolar: panorama.uuid_escola_periodo_escolar
      };
      respostaLancamentos.data.results.forEach(dadosDoGrupo => {
        let grupo;
        switch (dadosDoGrupo.tipo_dieta) {
          case null:
            grupo = "convencional";
            if (
              dadosDoGrupo.merenda_seca === null &&
              dadosDoGrupo.merenda_seca_solicitada > 0
            ) {
              dadosDoGrupo.merenda_seca = dadosDoGrupo.merenda_seca_solicitada;
            }
            break;
          case "Tipo A":
            grupo = "grupoA";
            break;
          case "Tipo B":
            grupo = "grupoB";
            break;
          case "Tipo C":
            grupo = "grupoC";
            break;
          default:
            // eslint-disable-next-line no-console
            console.log("Nâo era pra chegar aqui...", dadosDoGrupo.tipo_dieta);
        }
        if (grupo === "convencional") {
          initialValues[grupo] = Object.assign(
            {},
            respostaDados.data,
            dadosDoGrupo
          );
        } else {
          initialValues[grupo] = dadosDoGrupo;
        }
      });
      if (initialValues.convencional === undefined) {
        initialValues.convencional = respostaDados.data;
      }
      // remover nulls
      if (initialValues.convencional) {
        for (let chave of Object.keys(initialValues.convencional)) {
          if (initialValues.convencional[chave] === null)
            initialValues.convencional[chave] = undefined;
        }
      }
      setInitialValues(initialValues);
    } else {
      toastError("Houve um erro ao obter os lançamentos do dia");
    }
    setLoading(false);
  };

  const resetInitialValues = () => {
    setInitialValues(
      panorama
        ? {
            escola_periodo_escolar: panorama.uuid_escola_periodo_escolar
          }
        : {}
    );
  };

  const onSubmit = formValues =>
    new Promise(async (resolve, reject) => {
      const resposta = await registraLancamentoDiario(formValues);
      if (resposta.status === OK) {
        toastSuccess("Lançamento gravado com sucesso");
        resolve();
      } else {
        toastError(resposta.data.message);
        reject();
      }
    });
  return (
    <Spin tip="Carregando..." spinning={loading}>
      <div className="lancamento-por-periodo-card mt-3" style={{ color: cor }}>
        <div className="row">
          <div className="col-10 periodo-cabecalho">{textoCabecalho}</div>
          <div className="col-2 link-abrir">
            <p onClick={abreFechaLancamento}>
              {lancamentoAberto ? "Fechar" : "Abrir"}
            </p>
          </div>
        </div>
        <div className="row">
          <div
            className="col-2 total-alimentacoes"
            style={{ backgroundColor: cor }}
          >
            <span>{totalAlimentacoes || "0000"}</span>
            <span>TOTAL ALIMENTAÇÕES</span>
          </div>
          <div className="col-10 alimentacoes-por-tipo">
            <span>
              {alimentacoesConvencionais || "000"} alimentações convencionais
            </span>
            <span>
              {alimentacoesDietaA || "00"} alimentações para dieta especial A
            </span>
            <span>
              {alimentacoesDietaB || "00"} alimentações para dieta especial B
            </span>
          </div>
        </div>
        {lancamentoAberto && (
          <>
            <Form
              onSubmit={onSubmit}
              initialValues={initialValues}
              initialValuesEqual={isequal}
              validate={formValues =>
                validateFormLancamento(formValues, panorama)
              }
              render={({
                form,
                handleSubmit,
                values,
                pristine,
                submitting,
                errors
              }) => (
                <form
                  onSubmit={event => {
                    const promise = handleSubmit(event);
                    promise &&
                      promise.then(() => {
                        form.reset();
                        resetInitialValues();
                      });
                    return promise;
                  }}
                >
                  <pre>{JSON.stringify(values, null, 4)}</pre>
                  <OnChange name="data_lancamento">
                    {data_lancamento => {
                      data_lancamento !== "" &&
                        atualizaInitialValues(data_lancamento);
                    }}
                  </OnChange>
                  <OnChange name="convencional.eh_dia_de_sobremesa_doce">
                    {value => {
                      if (value) {
                        form.change(
                          "convencional.refeicoes.0.sob_repet",
                          undefined
                        );
                        form.change(
                          "convencional.refeicoes.1.sob_repet",
                          undefined
                        );
                      }
                    }}
                  </OnChange>
                  <div className="row">
                    <div className="col report-label-value">
                      <p className="value">Inserir novo lançamento</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-3 data-lancamento-container">
                      <Field
                        component={InputComData}
                        name="data_lancamento"
                        label="Data do lançamento"
                        required
                        minDate={null}
                        maxDate={moment().subtract(1, "days")._d}
                      />
                      <Field
                        component="input"
                        type="hidden"
                        name="escola_periodo_escolar"
                      />
                    </div>
                  </div>
                  {values.data_lancamento && (
                    <>
                      <div className="row">
                        <div className="col">
                          <label className="col-form-label">
                            Alimentação convencional
                          </label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <DietaConvencional formValues={values} />
                        </div>
                        <div className="col-8">
                          <DietaConvencionalFrequencia
                            panorama={panorama}
                            deveDesabilitarRepeticaoSobremesa={get(
                              values,
                              "convencional.eh_dia_de_sobremesa_doce"
                            )}
                          />
                        </div>
                      </div>
                      {panorama.qtde_tipo_a > 0 && (
                        <>
                          <div className="row">
                            <div className="col">
                              <label className="col-form-label">
                                Dieta especial <span>Grupo A</span>
                              </label>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-4">
                              <DietaEspecial
                                formValues={values}
                                prefix="grupoA"
                                panorama={panorama}
                              />
                            </div>
                            <div className="col-2">
                              <RefeicaoEnteralInput
                                label="Refeição (somente dieta enteral)"
                                name="grupoA.ref_enteral"
                              />
                            </div>
                            <div className="col-6">
                              <ObservacoesDiarias
                                label="Observações diárias"
                                name="grupoA.observacoes"
                              />
                            </div>
                          </div>
                        </>
                      )}
                      {panorama.qtde_tipo_b > 0 && (
                        <>
                          <div className="row">
                            <div className="col">
                              <label className="col-form-label">
                                Dieta especial <span>Grupo B</span>
                              </label>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-4">
                              <DietaEspecial
                                formValues={values}
                                prefix="grupoB"
                                panorama={panorama}
                              />
                            </div>
                            <div className="col-8">
                              <ObservacoesDiarias
                                label="Observações diárias"
                                name="grupoB.observacoes"
                              />
                            </div>
                          </div>
                        </>
                      )}
                      <div className="row mt-3">
                        <div className="col-7 erros-formulario">
                          {errors &&
                            !pristine &&
                            [...new Set(objectFlattener(errors))].map(
                              (error, index) => <p key={index}>{error}</p>
                            )}
                        </div>
                        <div className="col-5 botoes-envio">
                          <Botao
                            texto="Lançar"
                            className="ml-3"
                            type={BUTTON_TYPE.SUBMIT}
                            disabled={pristine || submitting}
                            style={BUTTON_STYLE.GREEN}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </form>
              )}
            />
            <ListagemLancamentos panorama={panorama} />
          </>
        )}
      </div>
    </Spin>
  );
};
