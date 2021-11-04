import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { InputText } from "components/Shareable/Input/InputText";
import HTTP_STATUS from "http-status-codes";
import { getError } from "helpers/utilities";
import { toastSuccess, toastError } from "components/Shareable/Toast/dialogs";
import FinalFormToRedux from "components/Shareable/FinalFormToRedux";
import Botao from "components/Shareable/Botao";
import CKEditorField from "components/Shareable/CKEditorField";
import SelectSelecione from "../../../Shareable/SelectSelecione";
import { required } from "../../../../helpers/fieldValidators";
import { Spin } from "antd";
import {
  getAlimentos,
  cadastraProtocoloPadraoDietaEspecial,
  editaProtocoloPadraoDietaEspecial,
  getProtocoloPadrao
} from "services/dietaEspecial.service";
import SubstituicoesField from "./componentes/SubstituicoesField";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";
import "./style.scss";

const FORM_NAME = "cadastrarProtocoloPadrao";

export default ({ uuid }) => {
  const [alimentos, setAlimentos] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [protocoloPadrao, setProcoloPadrao] = useState(undefined);

  const history = useHistory();

  async function fetchData() {
    const respAlimentos = await getAlimentos({
      tipo: "E"
    });
    setAlimentos(
      respAlimentos.data.filter(alimento =>
        ["AMBOS", "SO_ALIMENTOS"].includes(alimento.tipo_listagem_protocolo)
      )
    );
    setProdutos(
      respAlimentos.data.filter(alimento =>
        ["AMBOS", "SO_SUBSTITUTOS"].includes(alimento.tipo_listagem_protocolo)
      )
    );
    if (uuid) {
      const respProtocolo = await getProtocoloPadrao(uuid);
      setProcoloPadrao(respProtocolo.data);
    }
    setCarregando(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  function getInitialValues() {
    if (protocoloPadrao) {
      const substituicoes = protocoloPadrao.substituicoes.map(substituicao => {
        const alimentos_substitutos = substituicao.alimentos_substitutos.map(
          alimento => alimento.uuid
        );
        const substitutos = substituicao.substitutos.map(
          alimento => alimento.uuid
        );
        return {
          alimento: String(substituicao.alimento.id),
          tipo: substituicao.tipo === "Substituir" ? "S" : "I",
          substitutos: substitutos.concat(alimentos_substitutos)
        };
      });
      return {
        uuid: protocoloPadrao.uuid,
        nome_protocolo: protocoloPadrao.nome_protocolo,
        orientacoes_gerais: protocoloPadrao.orientacoes_gerais,
        status:
          protocoloPadrao.status === "Liberado" ? "LIBERADO" : "NAO_LIBERADO",
        substituicoes: substituicoes
      };
    } else {
      return {
        nome_protocolo: undefined,
        orientacoes_gerais: undefined,
        status: undefined,
        substituicoes: [{}]
      };
    }
  }

  function checaSeEditou(values, valoresIniciais) {
    return JSON.stringify(values) === JSON.stringify(valoresIniciais);
  }

  async function resetForm(form) {
    await form.reset({});
    await form.reset(getInitialValues());
    await form.restart();
  }

  const onSubmit = async values => {
    if (protocoloPadrao) {
      try {
        const response = await editaProtocoloPadraoDietaEspecial(values);
        if (response.status === HTTP_STATUS.OK) {
          toastSuccess("Protocolo Padrão de dieta especial salvo com sucesso");
          history.push("/dieta-especial/consultar-protocolo-padrao-dieta");
        } else {
          toastError("Houve um erro ao editar protocolo de dieta especial");
        }
      } catch (e) {
        if (e.response.status === HTTP_STATUS.BAD_REQUEST) {
          toastError(getError(e.response));
        } else {
          toastError("Houve um erro ao editar protocolo de dieta especial");
        }
      }
    } else {
      try {
        const response = await cadastraProtocoloPadraoDietaEspecial(values);
        if (response.status === HTTP_STATUS.CREATED) {
          toastSuccess("Protocolo Padrão de dieta especial criado com sucesso");
        } else {
          toastError("Houve um erro ao cadastrar protocolo de dieta especial");
        }
      } catch (e) {
        if (e.response.status === HTTP_STATUS.BAD_REQUEST) {
          toastError(getError(e.response));
        } else {
          toastError("Houve um erro ao cadastrar protocolo de dieta especial");
        }
      }
    }
  };

  return (
    <div className="card mt-3 card-cadastro-protocolo-padrao">
      <div className="card-body">
        <Spin tip="Carregando..." spinning={carregando}>
          {protocoloPadrao && (
            <div className="row">
              <div className="col-12">
                <Botao
                  texto="Histórico"
                  type={BUTTON_TYPE.BUTTON}
                  style={BUTTON_STYLE.GREEN_OUTLINE}
                  className="float-right"
                  onClick={() => {}}
                />
              </div>
            </div>
          )}
          <Form
            onSubmit={onSubmit}
            initialValues={getInitialValues()}
            mutators={{ ...arrayMutators }}
            render={({ form, handleSubmit, submitting, values }) => (
              <form
                onSubmit={event => {
                  const promise = handleSubmit(event);
                  promise &&
                    promise.then(() => {
                      resetForm(form);
                    });
                  return promise;
                }}
              >
                <FinalFormToRedux form={FORM_NAME} />
                <div className="row">
                  <div className="col-12">
                    <div className="mb-2 input title">
                      <span className="required-asterisk">*</span>
                      <label>Nome do protocolo</label>
                    </div>
                    <Field
                      component={InputText}
                      name="nome_protocolo"
                      validate={required}
                    />
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-12">
                    <Field
                      component={CKEditorField}
                      label="Orientações Gerais"
                      name="orientacoes_gerais"
                      validate={required}
                      required
                    />
                  </div>
                </div>
                {alimentos.length > 0 && produtos.length > 0 && (
                  <>
                    <div className="mt-2 mb-2 pt-2 input title titulo-substituicoes">
                      <span className="required-asterisk">*</span>
                      <label>Lista de Substituições</label>
                    </div>
                    {!carregando && (
                      <SubstituicoesField
                        alimentos={alimentos}
                        produtos={produtos}
                        form={form}
                      />
                    )}
                  </>
                )}
                <hr />
                <div className="row mt-2">
                  <div className="col-3">
                    <Field
                      component={SelectSelecione}
                      naoDesabilitarPrimeiraOpcao
                      options={[
                        {
                          uuid: "LIBERADO",
                          nome: "Liberado"
                        },
                        { uuid: "NAO_LIBERADO", nome: "Não liberado" }
                      ]}
                      label="Status"
                      name="status"
                      validate={required}
                      required
                    />
                  </div>
                </div>
                <div className="mt-4 mb-4">
                  <Botao
                    texto="Salvar"
                    type={BUTTON_TYPE.SUBMIT}
                    style={BUTTON_STYLE.GREEN}
                    className="float-right ml-3"
                    disabled={
                      submitting || checaSeEditou(values, getInitialValues())
                    }
                  />
                  <Botao
                    texto={
                      protocoloPadrao ? "Cancelar edição" : "Limpar campos"
                    }
                    type={BUTTON_TYPE.BUTTON}
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                    className="float-right ml-3"
                    onClick={() => {
                      resetForm(form);
                    }}
                  />
                </div>
              </form>
            )}
          />
        </Spin>
      </div>
    </div>
  );
};
