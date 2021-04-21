import React, { useEffect, useState } from "react";
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
import {
  getAlimentos,
  cadastraProtocoloPadraoDietaEspecial
} from "services/dietaEspecial.service";
import { getSubstitutos } from "services/produto.service";
import SubstituicoesField from "./componentes/SubstituicoesField";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";
import "./style.scss";

const FORM_NAME = "cadastrarProtocoloPadrao";

export default () => {
  const [alimentos, setAlimentos] = useState([]);
  const [produtos, setProdutos] = useState([]);

  async function fetchData() {
    const respAlimentos = await getAlimentos({
      tipo: "E"
    });
    setAlimentos(respAlimentos.data);
    const respProdutos = await (await getSubstitutos()).data.results;
    setProdutos(respProdutos);
  }

  useEffect(() => {
    fetchData();
  }, []);

  function getInitialValues() {
    return {
      nome_protocolo: undefined,
      orientacoes_gerais: undefined,
      substituicoes: [{}]
    };
  }

  const onSubmit = async values => {
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
  };

  return (
    <div className="card mt-3 card-cadastro-protocolo-padrao">
      <div className="card-body">
        <Form
          onSubmit={onSubmit}
          initialValues={getInitialValues()}
          mutators={{ ...arrayMutators }}
          render={({ form, handleSubmit, submitting }) => (
            <form
              onSubmit={async event => {
                await handleSubmit(event);
                form.reset();
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
                  <SubstituicoesField
                    alimentos={alimentos}
                    produtos={produtos}
                    form={form}
                  />
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
                  disabled={submitting}
                />

                <Botao
                  texto="Limpar campos"
                  type={BUTTON_TYPE.BUTTON}
                  style={BUTTON_STYLE.GREEN_OUTLINE}
                  className="float-right ml-3"
                  onClick={() => {
                    form.reset({});
                  }}
                />
              </div>
            </form>
          )}
        />
      </div>
    </div>
  );
};
