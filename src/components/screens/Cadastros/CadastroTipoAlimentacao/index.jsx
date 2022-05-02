import React, { useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";

import {
  getVinculosTipoAlimentacaoPorTipoUnidadeEscolar,
  updateVinculosTipoAlimentacaoPorTipoUnidadeEscolar,
  getTiposDeAlimentacao
} from "services/cadastroTipoAlimentacao.service";

import { Form, Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";

import { ASelect } from "components/Shareable/MakeField";
import { Icon, Select as SelectAntd } from "antd";

import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";

import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import { Spin } from "antd";
import "./style.scss";

export default ({ tiposUnidadesEscolar }) => {
  const { Option } = SelectAntd;
  const opcoesTiposUnidades = tiposUnidadesEscolar
    ? tiposUnidadesEscolar.map(tipo => {
        return <Option key={tipo.uuid}>{tipo.iniciais}</Option>;
      })
    : undefined;

  const [tiposDeAlimentacao, setTiposDeAlimentacao] = useState(undefined);
  const [vinculos, setVinculos] = useState(undefined);
  const [tipoUnidade, setTipoUnidade] = useState(undefined);
  const [carregando, setCarregando] = useState(undefined);

  async function fetchData() {
    setCarregando(true);
    await getTiposDeAlimentacao().then(response => {
      setTiposDeAlimentacao(response.results);
    });
    setCarregando(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async formValues => {
    if (formValues.tipos_alimentacao.length) {
      setCarregando(true);
      showHideBody(formValues.periodo_escolar);
      await updateVinculosTipoAlimentacaoPorTipoUnidadeEscolar(formValues).then(
        async response => {
          if (response.status === HTTP_STATUS.OK) {
            toastSuccess("Tipos de alimentação atualizados com sucesso");
            await getPeriodosEscolares(response.tipo_unidade_escolar);
          } else {
            toastError("Erro ao atualizar tipos de alimentação");
          }
        }
      );
      setCarregando(false);
    } else {
      toastError("Selecione um tipo de alimentação para atualizar");
    }
  };

  const setInitialValues = vinculo => {
    let tipos_alimentacao = vinculo.tipos_alimentacao.map(
      tipo_alimentacao => tipo_alimentacao.uuid
    );
    return {
      tipos_alimentacao: tipos_alimentacao,
      uuid: vinculo.uuid,
      periodo_escolar: vinculo.periodo_escolar.uuid,
      tipo_unidade_escolar: vinculo.tipo_unidade_escolar.uuid
    };
  };

  const getPeriodosEscolares = async uuid => {
    setCarregando(true);
    await getVinculosTipoAlimentacaoPorTipoUnidadeEscolar(uuid).then(
      response => {
        if (response.results.length === 0) {
          setTipoUnidade(undefined);
          toastError(
            "Nenhum período escolar está associado ao tipo de unidade escolar selecionado"
          );
        } else {
          setVinculos(response.results);
        }
      }
    );
    setCarregando(false);
  };

  const showHideBody = periodo => {
    let element = document.getElementsByClassName(periodo)[0];
    let card = document.getElementsByClassName(`card-${periodo}`)[0];
    if (element.classList.contains("d-none")) {
      element.classList.remove("d-none");
      card.style.backgroundColor = "#F2FBFE";
    } else {
      element.classList.add("d-none");
      card.style.backgroundColor = "#FFFFFF";
    }
  };

  return (
    <Spin tip="Carregando..." spinning={carregando || !opcoesTiposUnidades}>
      <div className="card mt-3">
        <div className="card-body formulario-tipo-alimentacao">
          {tiposUnidadesEscolar && (
            <Form
              onSubmit={() => {}}
              initialValues={{}}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <section className="tipos-de-unidade">
                    <header>Tipos de Unidades</header>
                    <article>
                      <Field
                        component={ASelect}
                        suffixIcon={<Icon type="caret-down" />}
                        showSearch
                        name="tipo_unidade_escolar"
                        filterOption={(inputValue, option) =>
                          option.props.children
                            .toString()
                            .toLowerCase()
                            .includes(inputValue.toLowerCase())
                        }
                        disabled={tipoUnidade ? true : false}
                      >
                        {opcoesTiposUnidades}
                      </Field>
                      <OnChange name="tipo_unidade_escolar">
                        {value => {
                          setTipoUnidade(value);
                          getPeriodosEscolares(value);
                        }}
                      </OnChange>
                    </article>
                  </section>
                </form>
              )}
            />
          )}
          {vinculos &&
            vinculos.map((vinculo, indice) => {
              return (
                <section key={indice}>
                  <div
                    className={`card mb-1 card-${vinculo.periodo_escolar.uuid}`}
                  >
                    <div
                      onClick={() => showHideBody(vinculo.periodo_escolar.uuid)}
                      className="card-header"
                    >
                      <div className="row">
                        <div className="col-11">
                          <p className="title-periodo">
                            {vinculo.periodo_escolar.nome}
                          </p>
                        </div>
                        <div className="col-1 icon-arrow">
                          <i className="fas fa-chevron-down" />
                        </div>
                      </div>
                    </div>
                    <div
                      className={`card-body ${
                        vinculo.periodo_escolar.uuid
                      } d-none`}
                    >
                      <Form
                        onSubmit={onSubmit}
                        initialValues={setInitialValues(vinculo)}
                        render={({ submitting, handleSubmit, pristine }) => (
                          <form onSubmit={handleSubmit}>
                            <div className="row mb-3">
                              <div className="p-0 col-12 mb-3">
                                <p className="title-tipos-alimentacao">
                                  Tipos de alimentação
                                </p>
                              </div>
                              {tiposDeAlimentacao &&
                                tiposDeAlimentacao.map(
                                  (tipoAlimentacao, idx) => {
                                    return (
                                      <div
                                        className="custom-control custom-checkbox col-4 mb-2"
                                        key={idx}
                                      >
                                        <Field
                                          name="tipos_alimentacao"
                                          component="input"
                                          type="checkbox"
                                          value={tipoAlimentacao.uuid}
                                          className="custom-control-input"
                                          id={`${
                                            vinculo.periodo_escolar.nome
                                          }-${tipoAlimentacao.uuid}`}
                                        />
                                        <label
                                          className="custom-control-label"
                                          htmlFor={`${
                                            vinculo.periodo_escolar.nome
                                          }-${tipoAlimentacao.uuid}`}
                                        >
                                          {tipoAlimentacao.nome}
                                        </label>
                                      </div>
                                    );
                                  }
                                )}
                            </div>
                            <div className="row mb-3">
                              <div className="offset-10 col-2">
                                <Botao
                                  texto="Salvar"
                                  type={BUTTON_TYPE.SUBMIT}
                                  style={`${BUTTON_STYLE.GREEN} w-100`}
                                  disabled={pristine || submitting}
                                />
                              </div>
                            </div>
                          </form>
                        )}
                      />
                    </div>
                  </div>
                </section>
              );
            })}
        </div>
      </div>
    </Spin>
  );
};
