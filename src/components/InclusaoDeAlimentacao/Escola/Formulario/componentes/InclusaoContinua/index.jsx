import StatefulMultiSelect from "@khanacademy/react-multi-select";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";
import CKEditorField from "components/Shareable/CKEditorField";
import { InputComData } from "components/Shareable/DatePicker";
import InputText from "components/Shareable/Input/InputText";
import Select from "components/Shareable/Select";
import { toastError } from "components/Shareable/Toast/dialogs";
import Weekly from "components/Shareable/Weekly/Weekly";
import { WEEK } from "configs/constants";
import {
  maxLength,
  maxValue,
  naoPodeSerZero,
  numericInteger,
  required,
} from "helpers/fieldValidators";
import {
  agregarDefault,
  composeValidators,
  deepCopy,
  deepEqual,
  fimDoCalendario,
  formatarParaMultiselect,
  getDataObj,
} from "helpers/utilities";
import React from "react";
import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import { OnChange } from "react-final-form-listeners";
import "./style.scss";

export const DatasInclusaoContinua = ({ ...props }) => {
  const { values, proximosDoisDiasUteis, onDataChanged, name, index } = props;
  return (
    values.inclusoes &&
    index !== undefined && (
      <div className="col-6">
        <div className="row">
          <div className="col-6">
            <Field
              component={InputComData}
              name={`${name}.data_inicial`}
              label="De"
              required
              validate={required}
              minDate={proximosDoisDiasUteis}
              maxDate={fimDoCalendario()}
            />
            <OnChange name={`${name}.data_inicial`}>
              {(value) => {
                if (value) {
                  onDataChanged(value);
                }
              }}
            </OnChange>
          </div>
          <div className="col-6">
            <Field
              component={InputComData}
              minDate={
                values.inclusoes[index].data_inicial &&
                getDataObj(values.inclusoes[index].data_inicial)
              }
              maxDate={fimDoCalendario()}
              disabled={!values.inclusoes[index].data_inicial}
              name={`${name}.data_final`}
              label="Até"
              required
              validate={required}
            />
          </div>
        </div>
      </div>
    )
  );
};

const limpaRecorrencia = (form) => {
  form.change("dias_semana", undefined);
  form.change("tipos_alimentacao_selecionados", []);
  form.change("periodo_escolar");
  form.change("numero_alunos", undefined);
  form.change("observacao", undefined);
};

export const Recorrencia = ({
  form,
  values,
  periodos,
  push,
  meusDados,
  ehMotivoInclusaoEspecifico,
  uuid,
  idExterno,
}) => {
  form.change("uuid", uuid);
  form.change("id_externo", idExterno);
  const handleWeekly = async (value) => {
    const dias_semana = values.dias_semana || [];
    if (dias_semana.includes(value)) {
      dias_semana.splice(dias_semana.indexOf(value), 1);
    } else {
      dias_semana.push(value);
    }
    await form.change(`dias_semana`, dias_semana);
    form.change("reload", !values.reload);
  };

  const adicionarRecorrencia = async (form, values) => {
    const ehCEU =
      meusDados.vinculo_atual.instituicao.tipo_unidade_escolar_iniciais ===
      "CEU GESTAO";

    if (
      !values.dias_semana ||
      values.dias_semana.length === 0 ||
      !values.periodo_escolar ||
      !values.tipos_alimentacao_selecionados ||
      values.tipos_alimentacao_selecionados.length === 0 ||
      !values.numero_alunos
    ) {
      toastError(
        "Necessário selecionar ao menos um dia na recorrência, período, um tipo de alimentação e adicionar o número de alunos para adicionar recorrência"
      );
      return;
    } else if (
      !ehCEU &&
      (/\D/.test(values.numero_alunos) ||
        values.numero_alunos <= 0 ||
        (!ehMotivoInclusaoEspecifico &&
          values.numero_alunos >
            periodos.find((p) => p.uuid === values.periodo_escolar)
              ?.maximo_alunos))
    ) {
      toastError("Número de alunos inválido");
      return;
    } else if (
      values.quantidades_periodo &&
      values.quantidades_periodo.find(
        (qp) =>
          deepEqual(qp.dias_semana, values.dias_semana) &&
          deepEqual(qp.periodo_escolar, values.periodo_escolar) &&
          deepEqual(qp.tipos_alimentacao, values.tipos_alimentacao_selecionados)
      )
    ) {
      toastError(
        "Esse tipo de Alimentação já foi selecionado para o mesmo período e dia da semana"
      );
      return;
    }

    if (!values.quantidades_periodo) {
      form.change("quantidades_periodo", [
        {
          dias_semana: deepCopy(values.dias_semana),
          periodo_escolar: deepCopy(values.periodo_escolar),
          tipos_alimentacao: deepCopy(values.tipos_alimentacao_selecionados),
          numero_alunos: deepCopy(values.numero_alunos),
          observacao: values.observacao ? deepCopy(values.observacao) : "",
        },
      ]);
      limpaRecorrencia(form);
    } else {
      await push("quantidades_periodo");
      ["dias_semana", "periodo_escolar", "numero_alunos", "observacao"].forEach(
        async (item) => {
          await form.change(
            `quantidades_periodo[${values.quantidades_periodo.length}].${item}`,
            values[item] ? deepCopy(values[item]) : ""
          );
        }
      );
      await form.change(
        `quantidades_periodo[${values.quantidades_periodo.length}].tipos_alimentacao`,
        deepCopy(values.tipos_alimentacao_selecionados)
      );
      limpaRecorrencia(form);
    }
  };

  const validacaoNumeroAlunos = () => {
    return ehMotivoInclusaoEspecifico
      ? composeValidators(naoPodeSerZero, numericInteger)
      : periodos.find((p) => p.uuid === values.periodo_escolar)
      ? composeValidators(
          naoPodeSerZero,
          numericInteger,
          maxValue(
            periodos.find((p) => p.uuid === values.periodo_escolar)
              .maximo_alunos
          )
        )
      : null;
  };

  return (
    <div className="recorrencia-e-detalhes">
      <div className="card-title">Recorrência e detalhes</div>
      <div className="row">
        <div className="col-3">Repetir</div>
        <div className="col-3">Período</div>
        <div className="col-4">Tipo de Alimentação</div>
        <div className="col-2">Nº de Alunos</div>
      </div>

      <div className="row">
        <div className="col-3">
          {values && (
            <Field
              component={Weekly}
              name={`dias_semana`}
              arrayDiasSemana={values.dias_semana}
              handleWeekly={handleWeekly}
            />
          )}
        </div>
        <div className="col-3">
          <Field
            component={Select}
            name={`periodo_escolar`}
            options={agregarDefault(periodos)}
            naoDesabilitarPrimeiraOpcao
          />
        </div>
        <div
          className={`col-4 multiselect-wrapper-${
            values.periodo_escolar ? "enabled" : "disabled"
          }`}
        >
          <Field
            component={StatefulMultiSelect}
            name="tipos_alimentacao"
            selected={values.tipos_alimentacao_selecionados || []}
            options={
              values.periodo_escolar &&
              periodos.find((p) => p.uuid === values.periodo_escolar)
                ? formatarParaMultiselect(
                    periodos.find((p) => p.uuid === values.periodo_escolar)
                      .tipos_alimentacao
                  )
                : []
            }
            onSelectedChanged={(values_) => {
              form.change(`tipos_alimentacao_selecionados`, values_);
            }}
            disableSearch={true}
            overrideStrings={{
              selectSomeItems: "Selecione",
              allItemsAreSelected: "Todos os itens estão selecionados",
              selectAll: "Todos",
            }}
          />
        </div>
        <div className="col-2">
          <Field
            component={InputText}
            validate={
              meusDados.vinculo_atual.instituicao
                .tipo_unidade_escolar_iniciais !== "CEU GESTAO" &&
              values.numero_alunos &&
              values.periodo_escolar &&
              values.dias_semana &&
              validacaoNumeroAlunos()
            }
            name={`numero_alunos`}
            min="0"
            className="form-control quantidade-aluno"
            disabled={!values.periodo_escolar}
          />
        </div>
      </div>
      <Field
        component={CKEditorField}
        label="Observações"
        validate={maxLength(1000)}
        name={`observacao`}
      />
      <div className="row mt-3">
        <div className="col-12 text-end">
          <Botao
            texto="Adicionar recorrência"
            onClick={() => {
              adicionarRecorrencia(form, values);
            }}
            type={BUTTON_TYPE.BUTTON}
            style={BUTTON_STYLE.GREEN_OUTLINE}
          />
        </div>
      </div>
    </div>
  );
};

export const RecorrenciaTabela = ({ form, values, periodos }) => {
  return (
    <div className="recorrencia-e-detalhes">
      <table>
        <thead>
          <tr className="row">
            <th className="col-2">Repetir</th>
            <th className="col-2">Período</th>
            <th className="col-3">Tipos de Alimentação</th>
            <th className="col-1">Nº de Alunos</th>
            <th className="col-4">Observações</th>
          </tr>
        </thead>
        <tbody>
          <FieldArray name="quantidades_periodo">
            {({ fields }) =>
              fields.map(
                (name, indice) =>
                  values.quantidades_periodo[indice] && (
                    <tr key={indice} className="row">
                      <td className="col-2 weekly">
                        {WEEK.map((day, key) => {
                          return (
                            <span
                              key={key}
                              className={
                                values.quantidades_periodo[indice]
                                  .dias_semana &&
                                values.quantidades_periodo[
                                  indice
                                ].dias_semana.includes(day.value)
                                  ? "week-circle-clicked green"
                                  : "week-circle"
                              }
                              data-cy={`dia-${key}`}
                              value={day.value}
                            >
                              {day.label}
                            </span>
                          );
                        })}
                      </td>
                      <td className="col-2">
                        {values.quantidades_periodo[indice].periodo_escolar &&
                          periodos.find(
                            (periodo) =>
                              periodo.uuid ===
                              values.quantidades_periodo[indice].periodo_escolar
                          )?.nome}
                      </td>
                      <td className="col-3">
                        {values.quantidades_periodo[indice].tipos_alimentacao &&
                          values.quantidades_periodo[indice].periodo_escolar &&
                          periodos
                            .find(
                              (p) =>
                                p.uuid ===
                                values.quantidades_periodo[indice]
                                  .periodo_escolar
                            )
                            ?.tipos_alimentacao.filter((t) =>
                              values.quantidades_periodo[
                                indice
                              ].tipos_alimentacao.includes(t.uuid)
                            )
                            .map((t) => t.nome)
                            .join(", ")}
                      </td>
                      <td className="col-1">
                        {values.quantidades_periodo[indice].numero_alunos}
                      </td>
                      <td
                        dangerouslySetInnerHTML={{
                          __html: values.quantidades_periodo[indice].observacao,
                        }}
                        className="col-3"
                      />
                      <td className="col-1 text-center">
                        <Botao
                          onClick={() =>
                            form.change(
                              "quantidades_periodo",
                              values.quantidades_periodo.length > 1
                                ? values.quantidades_periodo.filter(
                                    (_, i) => i !== indice
                                  )
                                : undefined
                            )
                          }
                          type={BUTTON_TYPE.BUTTON}
                          style={BUTTON_STYLE.GREEN_OUTLINE}
                          icon={BUTTON_ICON.TRASH}
                        />
                      </td>
                    </tr>
                  )
              )
            }
          </FieldArray>
        </tbody>
      </table>
    </div>
  );
};
