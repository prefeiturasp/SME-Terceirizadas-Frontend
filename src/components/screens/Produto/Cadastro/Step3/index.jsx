import React, { Component } from "react";
import { Field } from "redux-form";
import InputText from "../../../../Shareable/Input/InputText";
import { required } from "../../../../../helpers/fieldValidators";
import "./style.scss";
import { TextArea } from "../../../../Shareable/TextArea/TextArea";
import ManagedInputFileField from "components/Shareable/Input/InputFile/ManagedField";

class Step3 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  maxLengthCaracteres = max => value =>
    value && value.length > max
      ? `Limite máximo de ${max} caracteres`
      : undefined;

  ehRascunho = ({ ultima_homologacao }) => {
    return ultima_homologacao && ultima_homologacao.status === "RASCUNHO";
  };

  temImagensSalvas = ({ imagens_salvas }) => {
    return imagens_salvas && imagens_salvas.length > 0;
  };

  validateEmbalagem = [required, this.maxLengthCaracteres(500)];

  render() {
    const { payload } = this.props;
    return (
      <div className="cadastro-produto-step3">
        <div className="card-title">Informação do Produto (classificação)</div>
        <div className="row">
          <div className="col-6 pt-3">
            <Field
              component={InputText}
              label="N° de registro do produto no órgão competente"
              name="numero_registro"
              type="text"
              placeholder="Registro no Ministério da Agricultura SP 000499-5.000060"
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
              label="Tipo"
              name="tipo"
              type="text"
              placeholder="Digite o tipo"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12 pb-5">
            <Field
              component={TextArea}
              label="Embalagem primária"
              name="embalagem"
              placeholder="Digite os dados"
              required
              validate={this.validateEmbalagem}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 pt-5">
            <Field
              component={InputText}
              label="Condições de armazenamento, conservação e prazo máximo para consumo após a abertura da embalagem"
              name="info_armazenamento"
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
              name="outras_informacoes"
            />
          </div>
        </div>

        <section className="row attachments">
          <div className="col-9">
            <div className="card-title font-weight-bold cinza-escuro mt-4">
              * Imagens do Produto
            </div>
            <div className="text">Anexe uma ou mais imagens do produto.</div>
            <div className="card-warning mt-2">
              <strong>IMPORTANTE:</strong> Envie um arquivo formato .doc, .docx,
              .pdf, .png, .jpg ou .jpeg, com até 10Mb. <br />
            </div>
          </div>
          <div className="col-3 btn">
            <Field
              component={ManagedInputFileField}
              concatenarNovosArquivos
              className="inputfile"
              texto="Anexar"
              name="anexos"
              accept=".png, .doc, .pdf, .docx, .jpeg, .jpg"
              onChange={this.props.setFiles}
              removeFile={this.props.removeFile}
              validate={payload && this.ehRascunho(payload) ? [] : [required]}
              toastSuccessMessage="Imagem do produto inclusa com sucesso"
            />
          </div>
        </section>
        {payload && this.ehRascunho(payload) && (
          <div className="row pt-3 pb-3">
            {payload.imagens_salvas !== null &&
              payload.imagens_salvas.length > 0 && (
                <div className="section-cards-imagens">
                  {payload.imagens_salvas
                    .filter(anexo => anexo.arquivo.includes("media"))
                    .map((anexo, key) => {
                      return (
                        <div key={key} className="pt-2">
                          <a
                            rel="noopener noreferrer"
                            target="_blank"
                            href={anexo.arquivo}
                            className="link"
                          >
                            {anexo.nome}
                          </a>
                          <span
                            onClick={() =>
                              this.props.removerAnexo(anexo.uuid, key)
                            }
                            className="delete"
                          >
                            x
                          </span>
                        </div>
                      );
                    })}
                </div>
              )}
          </div>
        )}
      </div>
    );
  }
}

export default Step3;
