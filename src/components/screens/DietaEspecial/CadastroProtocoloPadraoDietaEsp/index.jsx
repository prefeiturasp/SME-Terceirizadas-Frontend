import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { InputText } from "components/Shareable/Input/InputText";
import HTTP_STATUS from "http-status-codes";
import { getError } from "helpers/utilities";
import { toastSuccess, toastError } from "components/Shareable/Toast/dialogs";
import ModalHistoricoProtocoloPadrao from "components/Shareable/ModalHistoricoProtocoloPadrao";
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
import ModalCancelaCopia from "./componentes/ModalCancelaCopia";
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
  const [visible, setVisible] = useState(false);
  const [showModalCancelaCopia, setShowModalCancelaCopia] = useState(false);
  const [historico, setHistorico] = useState([]);
  const [valoresIniciais, setValoresIniciais] = useState({
    substituicoes: [{}]
  });

  const history = useHistory();
  const location = useLocation();
  const ehCopia = location.pathname.includes("criar-copia");

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
      setValoresIniciais(getInitialValues(respProtocolo.data));
    }
    setCarregando(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  function getInitialValues(protocolo) {
    if (protocolo) {
      const substituicoes = protocolo.substituicoes.map(substituicao => {
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
        uuid: protocolo.uuid,
        nome_protocolo: protocolo.nome_protocolo,
        orientacoes_gerais: protocolo.orientacoes_gerais,
        status: protocolo.status === "Liberado" ? "LIBERADO" : "NAO_LIBERADO",
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
    await form.reset(getInitialValues(protocoloPadrao));
    await form.restart();
  }

  const onSubmit = async values => {
    if (protocoloPadrao) {
      if (ehCopia) {
        try {
          const response = await cadastraProtocoloPadraoDietaEspecial(values);
          if (response.status === HTTP_STATUS.CREATED) {
            toastSuccess(
              "Cópia do protocolo padrão da dieta especial salvo com sucesso"
            );
            history.push("/dieta-especial/consultar-protocolo-padrao-dieta");
          } else {
            toastError(
              "Houve um erro ao cadastrar cópia do protocolo de dieta especial"
            );
          }
        } catch (e) {
          if (e.response.status === HTTP_STATUS.BAD_REQUEST) {
            // setValoresIniciais(getInitialValues(values));
            toastError(getError(e.response));
          } else {
            toastError(
              "Houve um erro ao cadastrar cópia do protocolo de dieta especial"
            );
          }
        }
      } else {
        try {
          const response = await editaProtocoloPadraoDietaEspecial(values);
          if (response.status === HTTP_STATUS.OK) {
            toastSuccess(
              "Protocolo Padrão de dieta especial salvo com sucesso"
            );
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
      }
    } else {
      try {
        const response = await cadastraProtocoloPadraoDietaEspecial(values);
        if (response.status === HTTP_STATUS.CREATED) {
          toastSuccess("Protocolo Padrão de dieta especial criado com sucesso");
          history.push("/dieta-especial/consultar-protocolo-padrao-dieta");
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
                {!ehCopia && (
                  <Botao
                    texto="Histórico"
                    type={BUTTON_TYPE.BUTTON}
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                    className="float-right"
                    onClick={() => {
                      setHistorico(protocoloPadrao.historico);
                      setVisible(true);
                    }}
                  />
                )}
              </div>
            </div>
          )}
          <Form
            onSubmit={onSubmit}
            initialValues={valoresIniciais}
            mutators={{ ...arrayMutators }}
            render={({ form, handleSubmit, submitting, values }) => (
              <form
                onSubmit={event => {
                  const promise = handleSubmit(event);
                  promise &&
                    promise.then(() => {
                      // resetForm(form);
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
                    texto={ehCopia ? "Salvar cópia" : "Salvar"}
                    type={BUTTON_TYPE.SUBMIT}
                    style={BUTTON_STYLE.GREEN}
                    className="float-right ml-3"
                    disabled={
                      submitting || checaSeEditou(values, getInitialValues())
                    }
                  />
                  {ehCopia ? (
                    <Botao
                      texto={"Cancelar cópia"}
                      type={BUTTON_TYPE.BUTTON}
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                      className="float-right ml-3"
                      onClick={() => {
                        setShowModalCancelaCopia(true);
                      }}
                    />
                  ) : (
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
                  )}
                </div>
              </form>
            )}
          />
        </Spin>
        {historico && (
          <ModalHistoricoProtocoloPadrao
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            history={historico}
          />
        )}
        <ModalCancelaCopia
          showModal={showModalCancelaCopia}
          closeModal={() => setShowModalCancelaCopia(false)}
        />
      </div>
    </div>
  );
};
