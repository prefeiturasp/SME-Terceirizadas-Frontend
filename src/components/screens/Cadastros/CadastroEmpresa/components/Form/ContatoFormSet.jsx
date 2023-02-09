import React from "react";
import { Field } from "react-final-form";
import InputText from "components/Shareable/Input/InputText";
import { required } from "helpers/fieldValidators";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";
import { OnChange } from "react-final-form-listeners";
import MaskedInputText from "components/Shareable/Input/MaskedInputText";
import { telefoneMask } from "constants/shared";

export const ContatoFormSet = ({
  ehDistribuidor,
  contatosPessoaEmpresaForm,
  setContatosPessoaEmpresaForm,
  contatosPessoaEmpresa,
  setContatosPessoaEmpresa
}) => {
  const nomeFormContatoPessoaEmpresa = () => {
    const indiceDoFormAtual = `contatoPessoaEmpresa_${
      contatosPessoaEmpresaForm.length
    }`;
    let contatosPessoaEmpresaFormArray = contatosPessoaEmpresaForm;
    contatosPessoaEmpresaFormArray.push(indiceDoFormAtual);
    setContatosPessoaEmpresaForm(contatosPessoaEmpresaFormArray);
  };

  const adicionaContatoPessoaEmpresa = () => {
    contatosPessoaEmpresa = contatosPessoaEmpresa.concat([
      {
        nome: "",
        telefone: "",
        email: ""
      }
    ]);
    setContatosPessoaEmpresa(contatosPessoaEmpresa);
  };

  const setaContatosPessoaEmpresa = (
    input,
    value,
    indice,
    contatosPessoaEmpresa
  ) => {
    contatosPessoaEmpresa[indice][input] = value ? value : "";
    setContatosPessoaEmpresa(contatosPessoaEmpresa);
  };

  return (
    <>
      {ehDistribuidor && (
        <>
          <hr className="linha-form" />
          <div className="card-body">
            <div className="card-title green">Contatos</div>
            <div className="container-fields row">
              <div className="col-11">
                {contatosPessoaEmpresaForm.map(
                  (contatoEmpresa, indiceEmpresa) => {
                    return (
                      <div key={indiceEmpresa}>
                        <div
                          className="fields-set-contatos"
                          key={indiceEmpresa}
                        >
                          <div>
                            <Field
                              id={`nome_contato_${indiceEmpresa}`}
                              name={`nome_contato_${indiceEmpresa}`}
                              component={InputText}
                              label="Nome"
                              validate={required}
                              required
                              maxlength="140"
                            />
                            <OnChange name={`nome_contato_${indiceEmpresa}`}>
                              {value => {
                                setaContatosPessoaEmpresa(
                                  "nome",
                                  value,
                                  indiceEmpresa,
                                  contatosPessoaEmpresa
                                );
                              }}
                            </OnChange>
                          </div>
                          <div>
                            <Field
                              component={MaskedInputText}
                              mask={telefoneMask}
                              name={`telefone_contato_${indiceEmpresa}`}
                              label="Telefone"
                              id={`telefone_contato_${indiceEmpresa}`}
                              indice={indiceEmpresa}
                              cenario="contatoEmpresa"
                              required
                              maxlength="140"
                            />
                            <OnChange
                              name={`telefone_contato_${indiceEmpresa}`}
                            >
                              {value => {
                                setaContatosPessoaEmpresa(
                                  "telefone",
                                  value,
                                  indiceEmpresa,
                                  contatosPessoaEmpresa
                                );
                              }}
                            </OnChange>
                          </div>
                          <div>
                            <Field
                              name={`email_contato_${indiceEmpresa}`}
                              component={InputText}
                              label="E-mail"
                              maxlength="140"
                            />
                            <OnChange name={`email_contato_${indiceEmpresa}`}>
                              {value => {
                                setaContatosPessoaEmpresa(
                                  "email",
                                  value,
                                  indiceEmpresa,
                                  contatosPessoaEmpresa
                                );
                              }}
                            </OnChange>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
              <div className={`col-1 mt-auto mb-1`}>
                <Botao
                  texto="+"
                  type={BUTTON_TYPE.BUTTON}
                  style={BUTTON_STYLE.GREEN_OUTLINE}
                  onClick={() => {
                    nomeFormContatoPessoaEmpresa();
                    adicionaContatoPessoaEmpresa();
                  }}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
