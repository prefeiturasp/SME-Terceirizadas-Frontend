import CardMatriculados from "components/Shareable/CardMatriculados";
import HTTP_STATUS from "http-status-codes";
import arrayMutators from "final-form-arrays";
import React, { useState } from "react";
import { useEffect } from "react";
import { Field, Form } from "react-final-form";
import { getRascunhosAlteracaoTipoAlimentacao } from "services/alteracaoDeCardapio";
import { TIPO_SOLICITACAO } from "constants/shared";
import { Rascunhos } from "../Rascunhos";
import Select from "components/Shareable/Select";
import moment from "moment";
import { InputComData } from "components/Shareable/DatePicker";
import {
  peloMenosUmCaractere,
  required,
  textAreaRequired
} from "helpers/fieldValidators";
import {
  agregarDefault,
  checaSeDataEstaEntre2e5DiasUteis,
  composeValidators
} from "helpers/utilities";
import ModalDataPrioritaria from "components/Shareable/ModalDataPrioritaria";
import { OnChange } from "react-final-form-listeners";
import { FieldArray } from "react-final-form-arrays";
import StatefulMultiSelect from "@khanacademy/react-multi-select";
import "./style.scss";
import CKEditorField from "components/Shareable/CKEditorField";

export const AlteracaoDoTipoDeAlimentacaoCEI = ({ ...props }) => {
  const {
    meusDados,
    motivos,
    periodos,
    proximosCincoDiasUteis,
    proximosDoisDiasUteis,
    vinculos
  } = props;

  const [rascunhos, setRascunhos] = useState([]);
  const [erroAPI, setErroAPI] = useState("");
  const [showModalDataPrioritaria, setShowModalDataPrioritaria] = useState(
    false
  );

  const getRascunhos = async () => {
    const response = await getRascunhosAlteracaoTipoAlimentacao(
      TIPO_SOLICITACAO.SOLICITACAO_CEI
    );
    if (response.status === HTTP_STATUS.OK) {
      setRascunhos(response.data.results);
    } else {
      setErroAPI("Erro ao carregar rascunhos");
    }
  };

  useEffect(() => {
    getRascunhos();
  }, []);

  const onAlterarDiaChanged = value => {
    if (
      value &&
      checaSeDataEstaEntre2e5DiasUteis(
        value,
        proximosDoisDiasUteis,
        proximosCincoDiasUteis
      )
    ) {
      setShowModalDataPrioritaria(true);
    }
  };

  const onSubmit = () => {};

  const getPeriodo = (values, indice) => {
    return values.substituicoes[indice];
  };

  const ehMotivoRPL = values => {
    return (
      motivos.find(
        motivo => motivo.nome.toUpperCase() === "RPL - REFEIÇÃO POR LANCHE"
      ) &&
      motivos.find(
        motivo => motivo.nome.toUpperCase() === "RPL - REFEIÇÃO POR LANCHE"
      ).uuid === values.motivo
    );
  };

  const ehMotivoLPR = values => {
    return (
      motivos.find(
        motivo => motivo.nome.toUpperCase() === "LPR - LANCHE POR REFEIÇÃO"
      ) &&
      motivos.find(
        motivo => motivo.nome.toUpperCase() === "LPR - LANCHE POR REFEIÇÃO"
      ).uuid === values.motivo
    );
  };

  const getTiposAlimentacaoDe = values => {
    const tipos_alimentacao_de = vinculos.find(
      vinculo => vinculo.periodo_escolar.nome === "INTEGRAL"
    ).tipos_alimentacao;
    if (ehMotivoRPL(values)) {
      return agregarDefault(
        tipos_alimentacao_de
          .filter(tipo_alimentacao =>
            ["Refeição da tarde", "Almoço"].includes(tipo_alimentacao.nome)
          )
          .map(tipo_alimentacao => ({
            nome: tipo_alimentacao.nome,
            uuid: tipo_alimentacao.uuid
          }))
      );
    } else if (ehMotivoLPR(values)) {
      return tipos_alimentacao_de
        .filter(tipo_alimentacao => ["Lanche"].includes(tipo_alimentacao.nome))
        .map(tipo_alimentacao => ({
          label: tipo_alimentacao.nome,
          value: tipo_alimentacao.uuid
        }));
    } else {
      return tipos_alimentacao_de.map(tipo_alimentacao => ({
        label: tipo_alimentacao.nome,
        value: tipo_alimentacao.uuid
      }));
    }
  };

  const getTiposAlimentacaoPara = values => {
    const tipos_alimentacao_de = vinculos.find(
      vinculo => vinculo.periodo_escolar.nome === "INTEGRAL"
    ).tipos_alimentacao;
    if (ehMotivoRPL(values)) {
      return agregarDefault(
        tipos_alimentacao_de
          .filter(tipo_alimentacao =>
            ["Lanche"].includes(tipo_alimentacao.nome)
          )
          .map(tipo_alimentacao => ({
            nome: tipo_alimentacao.nome,
            uuid: tipo_alimentacao.uuid
          }))
      );
    } else if (ehMotivoLPR(values)) {
      return agregarDefault(
        tipos_alimentacao_de
          .filter(tipo_alimentacao =>
            ["Refeição da tarde", "Almoço"].includes(tipo_alimentacao.nome)
          )
          .map(tipo_alimentacao => ({
            nome: tipo_alimentacao.nome,
            uuid: tipo_alimentacao.uuid
          }))
      );
    } else {
      return agregarDefault(
        tipos_alimentacao_de
          .filter(tipo_alimentacao =>
            values.tipos_alimentacao_de_selecionados
              ? !values.tipos_alimentacao_de_selecionados.includes(
                  tipo_alimentacao.uuid
                )
              : tipo_alimentacao.uuid !== values.tipo_alimentacao_para
          )
          .map(tipo_alimentacao => ({
            nome: tipo_alimentacao.nome,
            uuid: tipo_alimentacao.uuid
          }))
      );
    }
  };

  return (
    <>
      {erroAPI && <div>{erroAPI}</div>}
      {!erroAPI && (
        <div className="form-alteracao-cei mt-3">
          <CardMatriculados
            meusDados={meusDados}
            numeroAlunos={meusDados.vinculo_atual.instituicao.quantidade_alunos}
          />
          {rascunhos.length > 0 && (
            <section className="mt-3">
              <span className="page-title">Rascunhos</span>
              <Rascunhos
                alteracaoCardapioList={rascunhos}
                OnDeleteButtonClicked={this.OnDeleteButtonClicked}
                resetForm={event => this.resetForm(event)}
                OnEditButtonClicked={params => this.OnEditButtonClicked(params)}
              />
            </section>
          )}
          <div className="card mt-3 mh-60">
            <div className="card-body">
              <Form
                initialValues={{
                  substituicoes: periodos
                }}
                mutators={{
                  ...arrayMutators
                }}
                onSubmit={onSubmit}
              >
                {({ handleSubmit, form, values }) => (
                  <form onSubmit={handleSubmit}>
                    <Field component={"input"} type="hidden" name="uuid" />
                    <div className="card-title font-weight-bold descricao">
                      Descrição da Alteração do Tipo de Alimentação
                    </div>
                    <div className="row">
                      <div className="col-12 col-sm-8">
                        <Field
                          component={Select}
                          name="motivo"
                          label="Motivo"
                          options={motivos.filter(
                            ({ nome }) =>
                              nome.toUpperCase() !==
                              "Lanche emergencial".toUpperCase()
                          )}
                          validate={required}
                        />
                        <OnChange name="motivo">
                          {async value => {
                            if (value) {
                              const data_ = values.data;
                              form.reset();
                              form.change("motivo", value);
                              form.change("data", data_);
                            }
                          }}
                        </OnChange>
                      </div>
                      <div className="col-12 col-sm-4">
                        <Field
                          component={InputComData}
                          name="data"
                          minDate={proximosDoisDiasUteis}
                          maxDate={moment()
                            .endOf("year")
                            .toDate()}
                          label="Alterar dia"
                          required
                          validate={required}
                        />
                        <OnChange name="data">
                          {value => {
                            onAlterarDiaChanged(value);
                          }}
                        </OnChange>
                      </div>
                    </div>
                    {values.motivo && values.data && (
                      <>
                        <div className="row mt-3">
                          <div className="col-4">Período</div>
                          <div className="col-4">Alterar alimentação de</div>
                          <div className="col-4">Para alimentação</div>
                        </div>
                        <FieldArray name="substituicoes">
                          {({ fields }) =>
                            fields.map((name, indice) => (
                              <div className="mt-1" key={indice}>
                                <div className="row">
                                  <div className="col-4">
                                    <div
                                      className={`period-quantity number-${indice} pl-5 pt-2 pb-2`}
                                    >
                                      <label
                                        htmlFor="check"
                                        className="checkbox-label"
                                      >
                                        <Field
                                          component={"input"}
                                          type="checkbox"
                                          disabled={!values.data}
                                          name={`${name}.checked`}
                                        />
                                        <span
                                          onClick={async () => {
                                            await form.change(
                                              `${name}.checked`,
                                              !values.substituicoes[indice][
                                                `checked`
                                              ]
                                            );
                                            await form.change(
                                              `${name}.multiselect`,
                                              !values.substituicoes[indice][
                                                `checked`
                                              ]
                                                ? "multiselect-wrapper-enabled"
                                                : "multiselect-wrapper-disabled"
                                            );
                                          }}
                                          className="checkbox-custom"
                                          data-cy={`checkbox-${
                                            getPeriodo(values, indice).nome
                                          }`}
                                          validate={
                                            getPeriodo(values, indice)
                                              .checked && required
                                          }
                                          required={
                                            getPeriodo(values, indice).checked
                                          }
                                          disabled={
                                            !getPeriodo(values, indice).checked
                                          }
                                        />{" "}
                                        {getPeriodo(values, indice).nome}
                                      </label>
                                      <OnChange name={`${name}.checked`}>
                                        {value => {
                                          if (!value) {
                                            form.change(
                                              "tipos_alimentacao_de",
                                              undefined
                                            );
                                            form.change(
                                              "tipos_alimentacao_de_selecionados",
                                              undefined
                                            );
                                            form.change(
                                              "tipo_alimentacao_para",
                                              undefined
                                            );
                                          }
                                        }}
                                      </OnChange>
                                    </div>
                                  </div>
                                  {ehMotivoRPL(values) && (
                                    <div className="col-4">
                                      <Field
                                        component={Select}
                                        name="tipos_alimentacao_de"
                                        options={getTiposAlimentacaoDe(values)}
                                        validate={
                                          getPeriodo(values, indice).checked &&
                                          required
                                        }
                                        required={
                                          getPeriodo(values, indice).checked
                                        }
                                        disabled={
                                          !getPeriodo(values, indice).checked
                                        }
                                      />
                                    </div>
                                  )}
                                  {!ehMotivoRPL(values) && (
                                    <div className="col-4">
                                      <Field
                                        component={StatefulMultiSelect}
                                        name="tipos_alimentacao_de"
                                        selected={
                                          values.tipos_alimentacao_de_selecionados ||
                                          []
                                        }
                                        options={getTiposAlimentacaoDe(values)}
                                        onSelectedChanged={values_ => {
                                          form.change(
                                            `tipos_alimentacao_de_selecionados`,
                                            values_
                                          );
                                        }}
                                        disableSearch={true}
                                        overrideStrings={{
                                          selectSomeItems:
                                            "Selecione um tipo de alimentação",
                                          allItemsAreSelected:
                                            "Todos os tipos de alimentação estão selecionados",
                                          selectAll: "Todos"
                                        }}
                                      />
                                    </div>
                                  )}
                                  <div className="col-4">
                                    <Field
                                      component={Select}
                                      name="tipo_alimentacao_para"
                                      options={getTiposAlimentacaoPara(values)}
                                      validate={
                                        getPeriodo(values, indice).checked &&
                                        required
                                      }
                                      required={
                                        getPeriodo(values, indice).checked
                                      }
                                      disabled={
                                        !getPeriodo(values, indice).checked
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            ))
                          }
                        </FieldArray>
                      </>
                    )}
                    <div className="mt-3">
                      <Field
                        component={CKEditorField}
                        label="Observações"
                        name="observacao"
                        required
                        validate={composeValidators(
                          textAreaRequired,
                          peloMenosUmCaractere
                        )}
                      />
                    </div>
                    <ModalDataPrioritaria
                      showModal={showModalDataPrioritaria}
                      closeModal={() => setShowModalDataPrioritaria(false)}
                    />
                  </form>
                )}
              </Form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
