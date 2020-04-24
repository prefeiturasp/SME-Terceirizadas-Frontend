import React, { Component } from "react";
import { Field } from "redux-form";
import InputText from "../../../../Shareable/Input/InputText";
import { required } from "../../../../../helpers/fieldValidators";
import { TextArea } from "../../../../Shareable/TextArea/TextArea";
import "./style.scss";

class Step1 extends Component {
  render() {
    return (
      <div className="cadastro-produto-step1">
        <div className="card-title">Identificação do Produto</div>
        <div className="link-with-student">
          <div className="label">
            <span className="required-asterisk">*</span>O produto se destina ao
            atendimento de alunos com dieta especial?
          </div>
          <div className="row">
            <div className="col-3">
              <label className="container-radio">
                Sim
                <Field
                  component={"input"}
                  type="radio"
                  value="1"
                  name="tp_pessoa_responsavel"
                />
                <span className="checkmark" />
              </label>
            </div>
            <div className="col-3">
              <label className="container-radio">
                Não
                <Field
                  component={"input"}
                  type="radio"
                  value="2"
                  name="tp_pessoa_responsavel"
                />
                <span className="checkmark" />
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6 pt-3">
            <Field
              component={InputText}
              label="Nome do protocolo de Dieta Especial"
              name="nome_protocolo"
              type="text"
              placeholder="Digite o nome do protocolo"
              required
              validate={required}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 pb-5">
            <Field
              component={TextArea}
              label={"Detalhes da Dieta Especial"}
              name="resumo_objeto"
              required
              validate={required}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 pt-3">
            <Field
              component={InputText}
              label="Nome do produto"
              name="nome"
              type="text"
              placeholder="Digite o nome do produto"
              required
              validate={required}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6 pt-3">
            <Field
              component={InputText}
              label="Nome da marca"
              name="marca"
              type="text"
              placeholder="Digite o nome da marca"
              required
              validate={required}
            />
          </div>
          <div className="col-6 pt-3">
            <Field
              component={InputText}
              label="Nome do fabricante"
              name="fabricante"
              type="text"
              placeholder="Digite o nome do fabricante"
              required
              validate={required}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 pt-3">
            <Field
              component={InputText}
              label="Nome dos componentes do produto"
              name="componentes"
              type="text"
              placeholder="Digite o nome dos componentes"
              required
              validate={required}
            />
          </div>
        </div>
        <div className="link-with-student">
          <div className="label">
            <span className="required-asterisk">*</span>O produto contém ou pode
            conter ingredientes/aditivos alergênicos?
          </div>
          <div className="row">
            <div className="col-3">
              <label className="container-radio">
                Sim
                <Field
                  component={"input"}
                  type="radio"
                  value="1"
                  name="pode_conter_patogenicos"
                />
                <span className="checkmark" />
              </label>
            </div>
            <div className="col-3">
              <label className="container-radio">
                Não
                <Field
                  component={"input"}
                  type="radio"
                  value="2"
                  name="pode_conter_patogenicos"
                />
                <span className="checkmark" />
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-5">
            <div className="card-warning mt-3">
              <strong>IMPORTANTE:</strong> Relacioná-los conforme dispõe a RDC
              nº 26 de 02/07/15
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Step1;
