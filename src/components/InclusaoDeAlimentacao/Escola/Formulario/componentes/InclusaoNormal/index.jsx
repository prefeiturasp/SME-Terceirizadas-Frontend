import StatefulMultiSelect from "@khanacademy/react-multi-select";
import { TextArea } from "components/Shareable/TextArea/TextArea";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";
import { InputComData } from "components/Shareable/DatePicker";
import InputText from "components/Shareable/Input/InputText";
import CKEditorField from "components/Shareable/CKEditorField";
import {
  dataDuplicada,
  maxLength,
  maxValue,
  naoPodeSerZero,
  numericInteger,
  required
} from "helpers/fieldValidators";
import { composeValidators, formatarParaMultiselect } from "helpers/utilities";
import moment from "moment";
import React from "react";
import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import { OnChange } from "react-final-form-listeners";
import "../../style.scss";

export const DataInclusaoNormal = ({ ...props }) => {
  const {
    index,
    form,
    proximosDoisDiasUteis,
    name,
    values,
    onDataChanged
  } = props;

  return (
    <>
      <div className="col-6">
        <div className="row">
          <div className={`col-${index > 0 ? "9" : "12"}`}>
            <Field
              component={InputComData}
              name={`${name}.data`}
              minDate={proximosDoisDiasUteis}
              maxDate={moment()
                .endOf("year")
                .toDate()}
              label="Dia"
              required
              validate={composeValidators(
                required,
                dataDuplicada(values.inclusoes)
              )}
            />
            <OnChange name={`${name}.data`}>
              {value => {
                if (value) {
                  onDataChanged(value);
                }
              }}
            </OnChange>
          </div>
          {index > 0 && (
            <div className="col-3 mt-auto mb-1">
              <Botao
                texto="Remover dia"
                type={BUTTON_TYPE.BUTTON}
                onClick={() =>
                  form.change(
                    "inclusoes",
                    values.inclusoes.filter((_, i) => i !== index)
                  )
                }
                style={BUTTON_STYLE.BLUE_OUTLINE}
                icon={BUTTON_ICON.TRASH}
                className="botao-remover-dia"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export const AdicionarDia = ({ push }) => {
  return (
    <Botao
      className="col-3 mb-3"
      texto="Adicionar dia"
      onClick={() => push("inclusoes")}
      style={BUTTON_STYLE.GREEN_OUTLINE}
      type={BUTTON_TYPE.BUTTON}
    />
  );
};

export const OutroMotivo = ({ name }) => {
  return (
    <div className="mb-3">
      <Field
        component={TextArea}
        label="Qual o motivo?"
        name={`${name}.outro_motivo`}
        required
        validate={composeValidators(required, maxLength(500))}
      />
    </div>
  );
};

export const PeriodosInclusaoNormal = ({
  form,
  values,
  periodos,
  meusDados,
  ehETEC
}) => {
  const getPeriodo = indice => {
    return values.quantidades_periodo[indice];
  };

  const onTiposAlimentacaoChanged = (values_, indice) => {
    if (ehETEC) {
      const LANCHE_4H_UUID = periodos[0].tipos_alimentacao.find(
        ta => ta.nome === "Lanche 4h"
      ).uuid;
      const NOT_LANCHE_4H_UUID_ARRAY = periodos[0].tipos_alimentacao
        .filter(ta => ta.uuid !== LANCHE_4H_UUID)
        .map(ta => ta.uuid);
      if (values_.at(-1) === LANCHE_4H_UUID) {
        form.change(
          `quantidades_periodo[
        ${indice}].tipos_alimentacao_selecionados`,
          [LANCHE_4H_UUID]
        );
      } else {
        form.change(
          `quantidades_periodo[
        ${indice}].tipos_alimentacao_selecionados`,
          NOT_LANCHE_4H_UUID_ARRAY
        );
      }
    } else {
      form.change(
        `quantidades_periodo[
            ${indice}].tipos_alimentacao_selecionados`,
        values_
      );
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-3">Período</div>
        <div className="col-6">Tipo de Alimentação</div>
        <div className="col-3">Nº de Alunos</div>
      </div>
      <FieldArray name="quantidades_periodo">
        {({ fields }) =>
          fields.map((name, indice) => (
            <div className="mt-1" key={indice}>
              <div className="row">
                <div className="col-3">
                  <div
                    className={`period-quantity number-${indice} pl-5 pt-2 pb-2`}
                  >
                    <label htmlFor="check" className="checkbox-label">
                      <Field
                        component={"input"}
                        type="checkbox"
                        name={`${name}.checked`}
                      />
                      <span
                        onClick={async () => {
                          await form.change(
                            `${name}.checked`,
                            !values.quantidades_periodo[indice][`checked`]
                          );
                          await form.change(
                            `${name}.multiselect`,
                            !values.quantidades_periodo[indice][`checked`]
                              ? "multiselect-wrapper-enabled"
                              : "multiselect-wrapper-disabled"
                          );
                        }}
                        className="checkbox-custom"
                        data-cy={`checkbox-${getPeriodo(indice).nome}`}
                      />{" "}
                      {getPeriodo(indice).nome}
                    </label>
                  </div>
                </div>
                <div className="col-6">
                  <div className={getPeriodo(indice).multiselect}>
                    <Field
                      component={StatefulMultiSelect}
                      name="tipos_alimentacao"
                      selected={
                        getPeriodo(indice).tipos_alimentacao_selecionados || []
                      }
                      options={formatarParaMultiselect(
                        getPeriodo(indice).tipos_alimentacao
                      )}
                      onSelectedChanged={values_ =>
                        onTiposAlimentacaoChanged(values_, indice)
                      }
                      disableSearch={true}
                      hasSelectAll={!ehETEC}
                      overrideStrings={{
                        selectSomeItems: "Selecione",
                        allItemsAreSelected:
                          "Todos os itens estão selecionados",
                        selectAll: "Todos"
                      }}
                    />
                  </div>
                </div>
                <div className="col-3">
                  <Field
                    component={InputText}
                    disabled={!getPeriodo(indice).checked}
                    type="number"
                    name={`${name}.numero_alunos`}
                    min="0"
                    className="form-control quantidade-aluno"
                    required={getPeriodo(indice).checked}
                    validate={
                      meusDados.vinculo_atual.instituicao
                        .tipo_unidade_escolar_iniciais !== "CEU GESTAO"
                        ? getPeriodo(indice).checked &&
                          composeValidators(
                            naoPodeSerZero,
                            numericInteger,
                            maxValue(
                              periodos.find(
                                p => p.uuid === getPeriodo(indice).uuid
                              ) &&
                                periodos.find(
                                  p => p.uuid === getPeriodo(indice).uuid
                                ).maximo_alunos
                            )
                          )
                        : false
                    }
                  />
                </div>
              </div>
              {ehETEC && (
                <Field
                  component={CKEditorField}
                  label="Observações"
                  validate={maxLength(1000)}
                  name={`${name}.observacao`}
                />
              )}
            </div>
          ))
        }
      </FieldArray>
    </>
  );
};
