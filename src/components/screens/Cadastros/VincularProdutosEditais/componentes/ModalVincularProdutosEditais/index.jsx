import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Form, Field } from "react-final-form";
import { TextArea } from "components/Shareable/TextArea/TextArea";
import StatefulMultiSelect from "@khanacademy/react-multi-select";
import Multiselect from "multiselect-react-dropdown";
import { formatarParaMultiselect } from "helpers/utilities";
import { ASelect } from "components/Shareable/MakeField";
import { Icon } from "antd";
import { Spin } from "antd";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";
import { getListaProdutos } from "services/produto.service";
import HTTP_STATUS from "http-status-codes";
import { toastError } from "components/Shareable/Toast/dialogs";
import { formataEditais } from "./helper";
import "./style.scss";

export default ({ closeModal, showModal, listaEditais, opcoesTipos }) => {
  const [carregando, setCarregando] = useState(false);
  const [opcoesEditaisOrigem, setOpcoesEditaisOrigem] = useState([]);
  const [opcoesEditaisDestino, setOpcoesEditaisDestino] = useState([]);
  const [opcoesProdutosMarcas, setOpcoesProdutosMarcas] = useState([]);
  const [produtosSelecionado, setProdutosSelecionado] = useState([]);

  const onSubmit = async () => {};

  useEffect(() => {
    setCarregando(true);
    if (listaEditais) {
      let opcoes = listaEditais.map(edital => {
        return { nome: edital.edital__numero, uuid: edital.edital__uuid };
      });
      setOpcoesEditaisOrigem(opcoes);
      setCarregando(false);
    }
  }, [listaEditais]);

  return (
    <Modal
      dialogClassName="modal-produtos-editais"
      show={showModal}
      onHide={closeModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>Selecionar produtos provenientes de editais</Modal.Title>
      </Modal.Header>
      <Spin tip="Carregando..." spinning={carregando}>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, submitting, values, form }) => (
            <form onSubmit={handleSubmit}>
              <Modal.Body>
                <div className="row mb-3">
                  <div className="col-4">
                    <label className="col-form-label pb-3">
                      * Edital de origem
                    </label>
                    <Field
                      component={StatefulMultiSelect}
                      name="editais_origem"
                      selected={values.editais_origem_selecionados || []}
                      options={formatarParaMultiselect(opcoesEditaisOrigem)}
                      onSelectedChanged={async values_ => {
                        form.change(`editais_origem_selecionados`, values_);
                        let opcoesDestino = opcoesEditaisOrigem.filter(
                          opcao => !values_.includes(opcao.uuid)
                        );
                        setOpcoesEditaisDestino(opcoesDestino);
                        if (values_.length > 0) {
                          try {
                            const editaisString = formataEditais(values_);
                            const response = await getListaProdutos({
                              editais: editaisString
                            });
                            if (response.status === HTTP_STATUS.OK) {
                              setOpcoesProdutosMarcas(response.data);
                            }
                          } catch (e) {
                            toastError(
                              "Houve um erro ao carregar opções dos produtos"
                            );
                          }
                        } else {
                          setOpcoesProdutosMarcas([]);
                        }
                      }}
                      disableSearch={true}
                      overrideStrings={{
                        selectSomeItems: "Selecione um edital",
                        allItemsAreSelected:
                          "Todos os itens estão selecionados",
                        selectAll: "Todos"
                      }}
                    />
                  </div>
                  <div className="col-8">
                    <label className="col-form-label pb-3">* Produtos</label>
                    <Field
                      component={Multiselect}
                      displayValue="produto__marca__nome"
                      selectedValues={produtosSelecionado}
                      groupBy="produto__nome"
                      closeOnSelect={false}
                      options={opcoesProdutosMarcas}
                      onSelect={value => {
                        setProdutosSelecionado(value);
                      }}
                      placeholder="Selecione os produtos"
                      emptyRecordMsg="Selecione ao menos um edital"
                      showCheckbox
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-4">
                    <label className="col-form-label pb-3">
                      * Tipo de Produto Novo Edital
                    </label>
                    <Field
                      component={ASelect}
                      className="input-busca-tipo-item"
                      suffixIcon={<Icon type="caret-down" />}
                      name="tipo_produto"
                      filterOption={(inputValue, option) =>
                        option.props.children
                          .toString()
                          .toLowerCase()
                          .includes(inputValue.toLowerCase())
                      }
                    >
                      {opcoesTipos}
                    </Field>
                  </div>
                  <div className="col-4 editais-destino">
                    <label className="col-form-label pb-3">
                      * Edital de destino
                    </label>
                    <Field
                      component={StatefulMultiSelect}
                      name="editais_destino"
                      selected={values.editais_destino_selecionados || []}
                      options={formatarParaMultiselect(opcoesEditaisDestino)}
                      onSelectedChanged={values_ => {
                        form.change(`editais_destino_selecionados`, values_);
                      }}
                      disableSearch={true}
                      overrideStrings={{
                        selectSomeItems: "Selecione um edital",
                        allItemsAreSelected:
                          "Todos os itens estão selecionados",
                        selectAll: "Todos"
                      }}
                    />
                  </div>
                  <div className="col-4" />
                </div>
                <div className="row mb-3">
                  <div className="col-12 outras-informacoes">
                    <Field
                      component={TextArea}
                      placeholder="Descreva mais informações do produto ou edital..."
                      label={"Outras informações"}
                      name="outras_informacoes"
                    />
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <div className="row mb-3 mt-4">
                  <div className="col-12">
                    <Botao
                      texto="Cancelar"
                      type={BUTTON_TYPE.BUTTON}
                      onClick={closeModal}
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                      className="ml-3"
                    />
                    <Botao
                      texto="Vincular"
                      type={BUTTON_TYPE.SUBMIT}
                      style={BUTTON_STYLE.GREEN}
                      className="ml-3"
                      disabled={submitting}
                    />
                  </div>
                </div>
              </Modal.Footer>
            </form>
          )}
        />
      </Spin>
    </Modal>
  );
};
