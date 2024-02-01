import { Botao } from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";
import { InputComData } from "components/Shareable/DatePicker";
import { InputText } from "components/Shareable/Input/InputText";
import { TextArea } from "components/Shareable/TextArea/TextArea";
import { required } from "helpers/fieldValidators";
import React from "react";
import { Field, Form } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";
import "./style.scss";

const onSubmit = () => {};

export const EditaisContratosRefatorado = () => {
  return (
    <div className="form-editais-contratos">
      <div className="card mt-3">
        <div className="card-body">
          <div className="row mt-3 mb-3">
            <div className="col-6">
              <div className="title">Novo Cadastro de Editais e Contratos</div>
            </div>
            <div className="col-6 text-end">
              <Botao
                texto="Editais e Contratos Cadastrados"
                type={BUTTON_TYPE.SUBMIT}
                style={BUTTON_STYLE.GREEN_OUTLINE}
              />
            </div>
          </div>
          <Form
            mutators={{
              ...arrayMutators,
            }}
            initialValues={{
              contratos: [
                {
                  processo_administrativo: undefined,
                  data_proposta: undefined,
                  vigencias: [
                    {
                      numero_contrato: undefined,
                      data_inicial: undefined,
                      data_final: undefined,
                    },
                  ],
                },
              ],
            }}
            onSubmit={onSubmit}
          >
            {({
              handleSubmit,
              form,
              submitting,
              form: {
                mutators: { push },
              },
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-4">
                    <Field
                      component={InputText}
                      label="Tipo de contratação"
                      name="tipo_contratacao"
                      placeholder="Digite o tipo de contratação"
                      required
                      validate={required}
                      max={50}
                    />
                  </div>
                  <div className="col-4">
                    <Field
                      component={InputText}
                      className="form-control"
                      label="N° do Edital"
                      name="edital_numero"
                      placeholder="Digite o número do edital"
                      required
                      validate={required}
                      max={50}
                    />
                  </div>
                  <div className="col-4">
                    <Field
                      component={InputText}
                      label="Nº do processo administrativo"
                      name="processo_administrativo"
                      placeholder="Digite o número do processo"
                      required
                      validate={required}
                      max={50}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <Field
                      component={TextArea}
                      label="Objeto resumido"
                      name="resumo_objeto"
                      required
                      validate={required}
                      height="120"
                    />
                  </div>
                </div>
                <div className="row mt-3 mb-3">
                  <div className="col-12">
                    <div className="title">
                      <span>Contratos Relacionados</span>
                    </div>
                  </div>
                </div>
                <FieldArray name="contratos">
                  {({ fields }) =>
                    fields.map((name_contratos, index_contratos) => (
                      <div key={name_contratos}>
                        <div className="row">
                          <div className="col-8">
                            <Field
                              name={`${name_contratos}.processo_administrativo`}
                              label="Processo administrativo do contrato"
                              placeholder="Digite o processo administrativo"
                              component={InputText}
                              required
                              validate={required}
                              max={50}
                            />
                          </div>
                          <div className="col-4">
                            <Field
                              name={`${name_contratos}.data_proposta`}
                              label="Data da proposta"
                              placeholder="Selecione a data da proposta"
                              component={InputComData}
                              validate={required}
                              minDate={null}
                              required
                            />
                          </div>
                        </div>
                        <FieldArray name={`${name_contratos}.vigencias`}>
                          {({ fields }) =>
                            fields.map((name_vigencias, index) => (
                              <div key={name_vigencias}>
                                <div className="row">
                                  {index === 0 && (
                                    <div className="col-4">
                                      <Field
                                        name={`${name_vigencias}.numero_contrato`}
                                        component={InputText}
                                        label="Nº do Contrato"
                                        placeholder="Digite o número do contrato"
                                        required
                                        validate={required}
                                      />
                                    </div>
                                  )}
                                  <div className="col-4">
                                    <Field
                                      component={InputComData}
                                      label="Vigência"
                                      name={`${name_vigencias}.data_inicial`}
                                      placeholder="DE"
                                      writable={false}
                                      minDate={null}
                                      required
                                    />
                                  </div>
                                  <div className="col-4">
                                    <Field
                                      component={InputComData}
                                      label="&nbsp;"
                                      name={`${name_vigencias}.data_final`}
                                      placeholder="ATÉ"
                                      writable={false}
                                      maxDate={null}
                                    />
                                  </div>
                                  {index > 0 && (
                                    <div className="col-2 mt-auto mb-2">
                                      <Botao
                                        texto="Remover"
                                        type={BUTTON_TYPE.BUTTON}
                                        onClick={() => {
                                          form.change(
                                            `contratos[${index_contratos}].vigencias`,
                                            values.contratos[
                                              index_contratos
                                            ].vigencias.filter(
                                              (_, i) => i !== index
                                            )
                                          );
                                        }}
                                        style={BUTTON_STYLE.RED_OUTLINE}
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))
                          }
                        </FieldArray>
                        <div className="row mt-3">
                          <div className="col-12">
                            <Botao
                              texto="Adicionar Vigência"
                              onClick={() =>
                                push(`${name_contratos}.vigencias`)
                              }
                              style={BUTTON_STYLE.GREEN_OUTLINE}
                              type={BUTTON_TYPE.BUTTON}
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </FieldArray>
                <div className="row">
                  <div className="col-12 text-end">
                    <Botao
                      texto="Salvar"
                      disabled={submitting}
                      type={BUTTON_TYPE.SUBMIT}
                      style={BUTTON_STYLE.GREEN}
                    />
                  </div>
                </div>
              </form>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};
