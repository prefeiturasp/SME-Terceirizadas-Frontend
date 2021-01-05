import { isequal, get } from "lodash";
import moment from "moment";
import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import { OnBlur, OnChange } from "react-final-form-listeners";

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
import {
  validateFormLancamento,
  objectFlattener,
  tamanhoMaximoObsDiarias
} from "./helpers";
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
import ModalConfirmacao from "components/Shareable/ModalConfirmacao";
import Matriculados from "./TabelaLancamento/Matriculados";
import { transformaNullsEmUndefined } from "helpers/utilities";

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
  const [listagemAberta, setListagemAberta] = useState(false);
  const [initialValues, setInitialValues] = useState(
    panorama
      ? {
          escola_periodo_escolar: panorama.uuid_escola_periodo_escolar
        }
      : {}
  );

  // Usados no controle do ModalConfirmacao
  // e da confirmação do valor lançado em repetição de refeição e sobremesa
  const [showModalConfirmacao, setShowModalConfirmacao] = useState(false);
  const [mensagemModalConfirmacao, setMensagemModalConfirmacao] = useState("");
  const [campoSendoValidado, setCampoSendoValidado] = useState();
  const [dadosMatriculados, setDadosMatriculados] = useState();

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
      setDadosMatriculados(respostaDados.data.quantidade_alunos);
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
        transformaNullsEmUndefined(initialValues.convencional);
        if (initialValues.convencional.refeicoes) {
          initialValues.convencional.refeicoes.map(objRefeicoes =>
            transformaNullsEmUndefined(objRefeicoes)
          );
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

  const onSubmit = formValues => {
    setLoading(true);
    new Promise(async (resolve, reject) => {
      const resposta = await registraLancamentoDiario(formValues);
      setLoading(false);
      if (resposta.status === OK) {
        toastSuccess("Lançamento gravado com sucesso");
        resolve();
      } else {
        toastError(resposta.data.message);
        reject();
      }
    });
  };

  const CAMPO_OFERTA = {
    sob_repet: "sob_oferta",
    ref_repet: "ref_oferta"
  };

  const validaRepeticao = (formValues, campoAValidar) => {
    const nomeCampoRepeticao = campoAValidar.split(".")[3];
    const campoOferta = campoAValidar.replace(
      nomeCampoRepeticao,
      CAMPO_OFERTA[nomeCampoRepeticao]
    );

    const soma =
      parseInt(get(formValues, campoAValidar, 0)) +
      parseInt(get(formValues, campoOferta, 0));
    const qtdeAlunosNoPeriodo = get(panorama, "qtde_alunos", 0);

    if (soma > qtdeAlunosNoPeriodo) {
      const tipoOferta = nomeCampoRepeticao.startsWith("sob")
        ? "sobremesas"
        : "refeições";
      setShowModalConfirmacao(true);
      setMensagemModalConfirmacao(
        `Número de ${tipoOferta} 1ª oferta + número de repetições (${soma}) superior ao número de matriculados (${qtdeAlunosNoPeriodo}). Confirma?`
      );
      setCampoSendoValidado(campoAValidar);
    }
  };

  const onFecharModalConfirmacao = (botaoApertado, form) => {
    if (botaoApertado !== "Sim") {
      form.change(campoSendoValidado, undefined);
      form.focus(campoSendoValidado);
    }
    setShowModalConfirmacao(false);
  };
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      initialValuesEqual={isequal}
      validate={formValues =>
        validateFormLancamento(formValues, panorama, dadosMatriculados)
      }
      render={({
        form,
        handleSubmit,
        values,
        pristine,
        submitting,
        errors
      }) => (
        <Spin tip="Carregando..." spinning={loading}>
          <div
            className="lancamento-por-periodo-card mt-3"
            style={{ color: cor }}
          >
            <div className="row">
              <div className="col-10 periodo-cabecalho">{textoCabecalho}</div>
              <div className="col-2 link-abrir">
                <p
                  onClick={() => {
                    form.change("data_lancamento", undefined);
                    abreFechaLancamento();
                  }}
                >
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
                  {alimentacoesConvencionais || "000"} alimentações
                  convencionais
                </span>
                <span>
                  {alimentacoesDietaA || "00"} alimentações para dieta especial
                  A
                </span>
                <span>
                  {alimentacoesDietaB || "00"} alimentações para dieta especial
                  B
                </span>
              </div>
            </div>
            {lancamentoAberto && (
              <form
                onSubmit={event => {
                  const promise = handleSubmit(event);
                  promise &&
                    promise.then(() => {
                      form.reset();
                      resetInitialValues();
                      setListagemAberta(false);
                    });
                  return promise;
                }}
              >
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
                <OnBlur name="convencional.refeicoes.0.ref_repet">
                  {() =>
                    validaRepeticao(
                      values,
                      "convencional.refeicoes.0.ref_repet"
                    )
                  }
                </OnBlur>
                <OnBlur name="convencional.refeicoes.0.sob_repet">
                  {() =>
                    validaRepeticao(
                      values,
                      "convencional.refeicoes.0.sob_repet"
                    )
                  }
                </OnBlur>
                <OnBlur name="convencional.refeicoes.1.ref_repet">
                  {() =>
                    validaRepeticao(
                      values,
                      "convencional.refeicoes.1.ref_repet"
                    )
                  }
                </OnBlur>
                <OnBlur name="convencional.refeicoes.1.sob_repet">
                  {() =>
                    validaRepeticao(
                      values,
                      "convencional.refeicoes.1.sob_repet"
                    )
                  }
                </OnBlur>
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
                  {values.data_lancamento && dadosMatriculados && (
                    <div className="offset-1 col-8">
                      <Matriculados dadosMatriculados={dadosMatriculados} />
                    </div>
                  )}
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
                          desabilitarRefeicao={
                            get(values, "convencional.troca") === "RPL"
                          }
                          desabilitarLanche={
                            get(values, "convencional.troca") === "LPR"
                          }
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
                              validate={tamanhoMaximoObsDiarias}
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
                              validate={tamanhoMaximoObsDiarias}
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
                <ListagemLancamentos
                  {...{
                    panorama,
                    loading,
                    setLoading,
                    listagemAberta,
                    setListagemAberta
                  }}
                  setListagemAberta={value => {
                    if (value === false) {
                      form.change("mes_lancamento", undefined);
                    }
                    setListagemAberta(value);
                  }}
                />
              </form>
            )}
            <ModalConfirmacao
              closeModal={botaoApertado =>
                onFecharModalConfirmacao(botaoApertado, form)
              }
              mensagem={mensagemModalConfirmacao}
              showModal={showModalConfirmacao}
              modalTitle="Confirmação"
            />
          </div>
        </Spin>
      )}
    />
  );
};
