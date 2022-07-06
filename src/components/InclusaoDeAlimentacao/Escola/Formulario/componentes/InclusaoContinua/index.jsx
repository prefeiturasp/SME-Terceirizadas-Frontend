import StatefulMultiSelect from "@khanacademy/react-multi-select";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";
import { InputComData } from "components/Shareable/DatePicker";
import InputText from "components/Shareable/Input/InputText";
import Select from "components/Shareable/Select";
import { TextAreaWYSIWYG } from "components/Shareable/TextArea/TextAreaWYSIWYG";
import Weekly from "components/Shareable/Weekly/Weekly";
import { required } from "helpers/fieldValidators";
import {
  agregarDefault,
  deepCopy,
  formatarParaMultiselect,
  getDataObj
} from "helpers/utilities";
import moment from "moment";
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
      <div className="col-4">
        <div className="row">
          <div className="col-6">
            <Field
              component={InputComData}
              name={`${name}.data_inicial`}
              label="De"
              required
              validate={required}
              minDate={proximosDoisDiasUteis}
              maxDate={moment()
                .endOf("year")
                .toDate()}
            />
            <OnChange name={`${name}.data_inicial`}>
              {value => {
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
              maxDate={moment()
                .endOf("year")
                .toDate()}
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

export const Recorrencia = ({ form, values, periodos, push }) => {
  const handleWeekly = async value => {
    const dias_semana = values.dias_semana || [];
    if (dias_semana.includes(value)) {
      dias_semana.splice(dias_semana.indexOf(value), 1);
    } else {
      dias_semana.push(value);
    }
    await form.change(`dias_semana`, dias_semana);
    form.change("reload", !values.reload);
  };

  return (
    <div className="recorrencia-e-detalhes">
      <div className="card-title">Recorrência e detalhes</div>
      <div className="row">
        <div className="col-2">Repetir</div>
        <div className="col-4">Período</div>
        <div className="col-4">Tipo de Alimentação</div>
        <div className="col-2">Nº de Alunos</div>
      </div>

      <div className="row">
        <div className="col-2">
          {values && (
            <Field
              component={Weekly}
              name={`dias_semana`}
              required
              validate={required}
              arrayDiasSemana={values.dias_semana}
              handleWeekly={handleWeekly}
            />
          )}
        </div>
        <div className="col-4">
          <Field
            component={Select}
            name={`periodo`}
            options={agregarDefault(periodos)}
            required
            validate={required}
            naoDesabilitarPrimeiraOpcao
          />
        </div>
        <div
          className={`col-4 multiselect-wrapper-${
            values.periodo ? "enabled" : "disabled"
          }`}
        >
          <Field
            component={StatefulMultiSelect}
            name="tipos_alimentacao"
            selected={values.tipos_alimentacao_selecionados || []}
            options={
              values.periodo
                ? formatarParaMultiselect(
                    periodos.find(p => p.uuid === values.periodo)
                      .tipos_alimentacao
                  )
                : []
            }
            onSelectedChanged={values_ => {
              form.change(`tipos_alimentacao_selecionados`, values_);
            }}
            disableSearch={true}
            overrideStrings={{
              selectSomeItems: "Selecione",
              allItemsAreSelected: "Todos os itens estão selecionados",
              selectAll: "Todos"
            }}
          />
        </div>
        <div className="col-2">
          <Field
            component={InputText}
            name={`numero_alunos`}
            min="0"
            className="form-control quantidade-aluno"
            disabled={!values.periodo}
            required
          />
        </div>
      </div>
      <Field
        component={TextAreaWYSIWYG}
        label="Observações"
        name={`observacoes`}
      />
      <div className="row mt-3">
        <div className="col-12 text-right">
          <Botao
            texto="Adicionar recorrência"
            onClick={async () => {
              if (!values.quantidades_periodo) {
                form.change("quantidades_periodo", [
                  { dias_semana: deepCopy(values.dias_semana) }
                ]);
              } else {
                await push("quantidades_periodo");
                await form.change(
                  `quantidades_periodo[${
                    values.quantidades_periodo.length
                  }].dias_semana`,
                  deepCopy(values.dias_semana)
                );
              }
            }}
            type={BUTTON_TYPE.BUTTON}
            style={BUTTON_STYLE.GREEN_OUTLINE}
          />
        </div>
      </div>
    </div>
  );
};

export const RecorrenciaTabela = ({ values }) => {
  const week = [
    {
      label: "D",
      value: "6"
    },
    {
      label: "S",
      value: "0"
    },
    {
      label: "T",
      value: "1"
    },
    {
      label: "Q",
      value: "2"
    },
    {
      label: "Q",
      value: "3"
    },
    {
      label: "S",
      value: "4"
    },
    {
      label: "S",
      value: "5"
    }
  ];
  return (
    <div className="recorrencia-e-detalhes">
      <table>
        <thead>
          <tr className="row">
            <th className="col-2">Repetir</th>
            <th className="col-2">Período</th>
            <th className="col-4">Tipos de Alimentação</th>
            <th className="col-2">Nº de Alunos</th>
            <th className="col-2">Observações</th>
          </tr>
        </thead>
        <tbody>
          <FieldArray name="quantidades_periodo">
            {({ fields }) =>
              fields.map(
                (name, indice) =>
                  values.quantidades_periodo[indice] && (
                    <tr key={indice} className="row">
                      <td className="col-3 weekly">
                        {week.map((day, key) => {
                          return (
                            <span
                              key={key}
                              className={
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
