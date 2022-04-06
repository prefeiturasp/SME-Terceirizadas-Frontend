import React from "react";
import { Form, Field } from "react-final-form";
import AutoCompleteField from "components/Shareable/AutoCompleteField";
import Botao from "components/Shareable/Botao";
import { useHistory } from "react-router-dom";
import { DIETA_ESPECIAL, PROTOCOLO_PADRAO_DIETA } from "configs/constants";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";
import { consultaProtocoloPadrao } from "services/dietaEspecial.service";
import HTTP_STATUS from "http-status-codes";
import { toastError } from "components/Shareable/Toast/dialogs";

export default ({
  setResultado,
  nomes,
  status,
  setCarregando,
  setTotal,
  setFiltros,
  setPage
}) => {
  const history = useHistory();

  const getNomesProtocolosFiltrado = nomeProtocolo => {
    if (nomeProtocolo) {
      return nomes.filter(nome =>
        nome.toUpperCase().includes(nomeProtocolo.toUpperCase())
      );
    }
    return [];
  };

  const getStatusProtocolosFiltrado = statusProtocolo => {
    if (statusProtocolo) {
      return status.filter(status =>
        status.toUpperCase().includes(statusProtocolo.toUpperCase())
      );
    }
    return [];
  };

  const formatStatus = status => {
    if (status === "Liberado") {
      return "LIBERADO";
    }
    if (status === "Não liberado") {
      return "NAO_LIBERADO";
    }
    return status;
  };

  const onSubmit = async formValues => {
    try {
      setCarregando(true);
      const payload = {
        nome_protocolo: formValues.nome_protocolo,
        status: formatStatus(formValues.status)
      };
      const response = await consultaProtocoloPadrao(payload);
      if (response.status === HTTP_STATUS.OK) {
        setResultado(response.data);
        setTotal(response.data.count);
        setFiltros(payload);
      }
    } catch (e) {
      toastError("Houve um erro ao tentar filtrar os Protocolos");
    }
    setCarregando(false);
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{}}
      render={({ submitting, form, handleSubmit, values }) => (
        <form onSubmit={handleSubmit}>
          <div className="row mt-3 mb-3">
            <div className="col-6">
              <Field
                label="Nome do Protocolo Padrão"
                component={AutoCompleteField} //
                dataSource={getNomesProtocolosFiltrado(values.nome_protocolo)}
                name="nome_protocolo"
                placeholder="Insira o Nome do Protocolo Padrão"
                className="input-busca-nome-protocolo"
              />
            </div>
            <div className="col-6">
              <Field
                label="Status do Protocolo Padrão"
                component={AutoCompleteField}
                dataSource={getStatusProtocolosFiltrado(values.status)}
                name="status"
                placeholder="Insira o Status do Protocolo Padrão"
                className="input-busca-status-protocolo"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-8">
              <Botao
                texto="Criar Protocolo Padrão"
                type={BUTTON_TYPE.BUTTON}
                style={BUTTON_STYLE.GREEN}
                onClick={() =>
                  history.push(`/${DIETA_ESPECIAL}/${PROTOCOLO_PADRAO_DIETA}`)
                }
              />
            </div>
            <div className="col-4">
              <Botao
                texto="Consultar"
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
                  setResultado(undefined);
                  setPage(1);
                }}
              />
            </div>
          </div>
        </form>
      )}
    />
  );
};
