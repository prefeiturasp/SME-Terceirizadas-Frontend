import React, { Component } from "react";
import { Field } from "redux-form";
import InputText from "../../../../Shareable/Input/InputText";
import { required } from "../../../../../helpers/fieldValidators";
import "./style.scss";
import { TextArea } from "../../../../Shareable/TextArea/TextArea";
import InputFile from "../../../../Shareable/Input/InputFile";

class Step3 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="cadastro-produto-step3">
        <div className="card-title">Informação do Produto (classificação)</div>
        <div className="row">
          <div className="col-6 pt-3">
            <Field
              component={InputText}
              label="N° de registro do produto no órgão competente"
              name="registro"
              type="text"
              placeholder="Registro no Ministério da Agricultura SP 000499-5.000060"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 pt-3">
            <Field
              component={InputText}
              label="Tipo"
              name="tipo"
              type="text"
              placeholder="Digite o tipo"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-6 pt-3">
            <Field
              component={InputText}
              label="Embalagem primária"
              name="embalagem_primaria"
              type="text"
              placeholder="Digite os dados"
              required
              validate={required}
            />
          </div>
          <div className="col-6 pt-3">
            <Field
              component={InputText}
              label="Prazo de Validade"
              name="prazo_validade"
              type="text"
              placeholder="Digite o prazo da validade"
              required
              validate={required}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 pt-3">
            <Field
              component={InputText}
              label="Condições de armazenamento, conservação e prazo máximo para consumo após a abertura da embalagem"
              name="condicoes"
              type="text"
              placeholder="Digite as informações necessárias"
              required
              validate={required}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 pb-5">
            <Field
              component={TextArea}
              placeholder="Digite as informações"
              label={"Outras informações que a empresa julgar necessário"}
              name="resumo_objeto"
            />
          </div>
        </div>

        <div className="row pt-3 pb-3">
          <div className="col-9 produto">
            <label>
              <span>* </span>Foto do produto
            </label>
            <div className="explicacao pt-2">
              Anexar uma ou mais fotos do produto.
            </div>
          </div>
          <div className="col-3 btn">
            <Field
              component={InputFile}
              className="inputfile"
              texto="Anexar"
              name="files"
              accept=".png, .doc, .pdf, .docx, .jpeg, .jpg"
              setFiles={this.props.setFiles}
              removeFile={this.props.removeFile}
              multiple
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Step3;
