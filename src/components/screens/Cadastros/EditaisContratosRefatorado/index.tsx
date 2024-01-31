import React from "react";
import { Botao } from "components/Shareable/Botao";
import { InputText } from "components/Shareable/Input/InputText";
import { TextArea } from "components/Shareable/TextArea/TextArea";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";
import "./style.scss";
import { Field, Form } from "react-final-form";
import { required } from "helpers/fieldValidators";

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
          <Form onSubmit={onSubmit}>
            {({ handleSubmit }) => (
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
              </form>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};
