import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import AutoCompleteField from "components/Shareable/AutoCompleteField";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";
import { consultaTiposRecipiente } from "services/tipoRecipiente.service";
import HTTP_STATUS from "http-status-codes";
import { toastError } from "components/Shareable/Toast/dialogs";
import ModalCadastrarItem from "../ModalCadastrarItem";

export default ({
  setResultado,
  nomes,
  setCarregando,
  setTotal,
  setFiltros,
  setPage,
  changePage,
  initialValues,
}) => {
  const [showModal, setShowModal] = useState(false);

  const getNomesItemsFiltrado = (nomeItem) => {
    if (nomeItem) {
      const reg = new RegExp(nomeItem, "iu");
      return nomes.filter((a) => reg.test(a));
    }
    return [];
  };

  const onSubmit = async (formValues) => {
    try {
      setCarregando(true);
      const payload = {
        nome: formValues.nome_item,
        tipo: formValues.tipo,
      };
      const response = await consultaTiposRecipiente(payload);
      if (response.status === HTTP_STATUS.OK) {
        setResultado(response.data.results);
        setTotal(response.data.count);
        setFiltros(payload);
      }
    } catch (e) {
      toastError("Houve um erro ao tentar filtrar os Itens");
    }
    setCarregando(false);
  };

  return (
    <>
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        render={({ submitting, form, handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
            <div className="row mt-3 mb-3">
              <div className="col-6">
                <label className="col-form-label mb-1">Nome</label>
                <Field
                  component={AutoCompleteField}
                  dataSource={getNomesItemsFiltrado(values.nome_item)}
                  name="nome_item"
                  placeholder="Digite um nome"
                  className="input-busca-nome-item"
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-12">
                <Botao
                  texto="Cadastrar Item"
                  type={BUTTON_TYPE.BUTTON}
                  style={BUTTON_STYLE.GREEN}
                  className="float-start"
                  onClick={() => setShowModal(true)}
                />
                <Botao
                  texto="Pesquisar"
                  type={BUTTON_TYPE.SUBMIT}
                  style={BUTTON_STYLE.GREEN}
                  className="float-end ms-3"
                  disabled={submitting}
                />
                <Botao
                  texto="Limpar Filtros"
                  type={BUTTON_TYPE.BUTTON}
                  style={BUTTON_STYLE.GREEN_OUTLINE}
                  className="float-end ms-3"
                  onClick={() => {
                    form.reset(initialValues);
                    setResultado(undefined);
                    setPage(1);
                  }}
                />
              </div>
            </div>
          </form>
        )}
      />
      <ModalCadastrarItem
        closeModal={() => setShowModal(false)}
        showModal={showModal}
        changePage={() => changePage()}
      />
    </>
  );
};
