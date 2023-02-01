import React from "react";
import { Field } from "react-final-form";
import InputText from "components/Shareable/Input/InputText";
import { required } from "helpers/fieldValidators";
import { InputComData } from "components/Shareable/DatePicker";
import { Tooltip } from "antd";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";

const contratosEstadoInicial = {
  numero_processo: null,
  numero_contrato: null,
  vigencia_de: null,
  vigencia_ate: null
};

export const ContratosFormSet = ({
  ehDistribuidor,
  contratos,
  setContratos,
  terceirizada
}) => {
  const adicionaContrato = () => {
    contratos = contratos.concat([contratosEstadoInicial]);
    setContratos(contratos);
  };

  const removeContrato = index => {
    let newContratos = [...contratos];
    newContratos.splice(index, 1);
    setContratos(newContratos);
  };

  return (
    <>
      {ehDistribuidor && (
        <div>
          <hr className="linha-form my-3" />
          <div>
            <div className="card-body">
              <div className="card-title green">Contratos</div>
              {contratos.map((contrato, index) => {
                return (
                  <>
                    <div className="row">
                      <div className="col-6">
                        <Field
                          name={`numero_processo_${index}`}
                          component={InputText}
                          label="Nº do Processo Administrativo do Contrato"
                          required
                          validate={required}
                          apenasNumeros
                        />
                      </div>
                      <div className="col-6">
                        <Field
                          name={`numero_contrato_${index}`}
                          component={InputText}
                          label="Nº do Contrato"
                          required
                          validate={required}
                        />
                      </div>
                      <div className="col-3">
                        <Field
                          component={InputComData}
                          label="Vigência do Contrato"
                          name={`vigencia_de_${index}`}
                          placeholder="De"
                          writable={false}
                        />
                      </div>
                      <div className="col-3">
                        <Field
                          component={InputComData}
                          label="&nbsp;"
                          name={`vigencia_ate_${index}`}
                          placeholder="Até"
                          writable={false}
                        />
                      </div>
                      {terceirizada &&
                        (contrato.encerrado ? (
                          <div className="col-6">
                            <div className="aviso-encerramento">
                              <strong>Aviso:</strong> Contrato encerrado em{" "}
                              {contrato.data_hora_encerramento}
                            </div>
                          </div>
                        ) : (
                          <div className="col-3">
                            <Botao
                              className="btn-encerrar-contrato"
                              texto="Encerrar Contrato"
                              type={BUTTON_TYPE.BUTTON}
                              style={BUTTON_STYLE.RED_OUTLINE}
                            />
                          </div>
                        ))}
                    </div>
                    <div className="flex-center my-3">
                      <Botao
                        texto="+ Adicionar"
                        className="mr-4"
                        type={BUTTON_TYPE.BUTTON}
                        style={BUTTON_STYLE.GREEN_OUTLINE}
                        onClick={() => adicionaContrato()}
                      />

                      {index > 0 && (
                        <Tooltip title="Remover Contrato">
                          <span>
                            <Botao
                              texto="Remover Contrato"
                              icon="fas fa-trash"
                              type={BUTTON_TYPE.BUTTON}
                              style={BUTTON_STYLE.RED_OUTLINE}
                              onClick={() => {
                                removeContrato(index);
                              }}
                            />
                          </span>
                        </Tooltip>
                      )}
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
