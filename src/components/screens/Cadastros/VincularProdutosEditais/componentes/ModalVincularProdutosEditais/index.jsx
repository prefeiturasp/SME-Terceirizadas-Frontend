import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Form, Field } from "react-final-form";
import { TextArea } from "components/Shareable/TextArea/TextArea";
import StatefulMultiSelect from "@khanacademy/react-multi-select";
import { formatarParaMultiselect } from "helpers/utilities";
import { ASelect } from "components/Shareable/MakeField";
import { Icon, TreeSelect, Spin } from "antd";
import "antd/dist/antd.css";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";
import {
  getListaProdutos,
  criarVinculoProdutosEditais
} from "services/produto.service";
import HTTP_STATUS from "http-status-codes";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import { formataEditais, formatarOpcoes, validatePayload } from "./helper";
import "./style.scss";

export default ({ closeModal, showModal, listaEditais, opcoesTipos }) => {
  const [carregando, setCarregando] = useState(false);
  const [opcoesEditaisOrigem, setOpcoesEditaisOrigem] = useState([]);
  const [opcoesEditaisDestino, setOpcoesEditaisDestino] = useState([]);
  const [opcoesProdutosEditais, setOpcoesProdutosEditais] = useState([]);
  const [
    produtosEditaisSelecionados,
    setProdutosEditaisSelecionados
  ] = useState([]);
  const [erros, setErros] = useState({
    editaisOrigem: false,
    editaisDestino: false,
    tipoProduto: false,
    produtos: false
  });

  const { SHOW_PARENT } = TreeSelect;

  const onSubmit = async formValues => {
    let payload = formValues;
    if (produtosEditaisSelecionados.length !== 0) {
      payload["produtos_editais"] = produtosEditaisSelecionados;
    }
    let resultadoValidacao = await validatePayload(payload);
    setErros(resultadoValidacao);
    let temErros = Object.keys(resultadoValidacao).find(
      k => resultadoValidacao[k] === true
    );
    if (temErros === undefined) {
      try {
        const response = await criarVinculoProdutosEditais(payload);
        if (response.status === HTTP_STATUS.CREATED) {
          toastSuccess("Produtos vinculados com sucesso!");
        }
      } catch (e) {
        toastError(`Houve um erro ao tentar vincular produtos: ${e}`);
      }
      closeModal();
    } else {
      toastError("Verifique os campos obrigatórios");
    }
  };

  const onChangeProdutosEditais = (_value, _label, extra) => {
    setErros({ ...erros, produtos: _value.length === 0 });
    let resultado = produtosEditaisSelecionados;
    if (extra.triggerNode && extra.triggerNode.props.todos) {
      let uuids = extra.triggerNode.props.children.map(pe => pe.key);
      if (extra.checked) {
        resultado = resultado.concat(uuids);
      } else {
        resultado = resultado.filter(uuid => !uuids.includes(uuid));
      }
    } else {
      if (extra.checked) {
        resultado = resultado.push(extra.triggerValue);
      } else {
        resultado = resultado.filter(
          uuid => !extra.triggerValue.includes(uuid)
        );
      }
    }
    setProdutosEditaisSelecionados(resultado);
  };

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
                    <span className="required-asterisk">*</span>
                    <label className="col-form-label pb-3">
                      Edital de origem
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
                        setErros({
                          ...erros,
                          editaisOrigem: values_.length === 0
                        });
                        setProdutosEditaisSelecionados([]);
                        setOpcoesProdutosEditais([]);
                        if (values_.length > 0) {
                          try {
                            const editaisString = formataEditais(values_);
                            const response = await getListaProdutos({
                              editais: editaisString
                            });
                            if (response.status === HTTP_STATUS.OK) {
                              setOpcoesProdutosEditais(response.data);
                            }
                          } catch (e) {
                            toastError(
                              "Houve um erro ao carregar opções dos produtos"
                            );
                          }
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
                    {erros.editaisOrigem && (
                      <div className="ant-form-explain">Campo obrigatório</div>
                    )}
                  </div>
                  <div className="col-8">
                    <span className="required-asterisk">*</span>
                    <label className="col-form-label pb-3">Produtos</label>
                    <Field
                      name="produtos_editais"
                      component={TreeSelect}
                      treeData={formatarOpcoes(opcoesProdutosEditais)}
                      value={produtosEditaisSelecionados}
                      onChange={onChangeProdutosEditais}
                      treeCheckable={true}
                      showCheckedStrategy={SHOW_PARENT}
                      searchPlaceholder="Selecione os produtos"
                      style={{ width: "100%" }}
                    />
                    {erros.produtos && (
                      <div className="ant-form-explain">Campo obrigatório</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-4">
                    <span className="required-asterisk">*</span>
                    <label className="col-form-label pb-3">
                      Tipo de Produto Novo Edital
                    </label>
                    <Field
                      component={ASelect}
                      className="input-busca-tipo-item"
                      suffixIcon={<Icon type="caret-down" />}
                      name="tipo_produto"
                      onChange={value => {
                        form.change("tipo_produto", value);
                        setErros({
                          ...erros,
                          tipoProduto: value && value.length > 0 ? false : true
                        });
                      }}
                      filterOption={(inputValue, option) =>
                        option.props.children
                          .toString()
                          .toLowerCase()
                          .includes(inputValue.toLowerCase())
                      }
                    >
                      {opcoesTipos}
                    </Field>
                    {erros.tipoProduto && (
                      <div className="ant-form-explain customError">
                        Campo obrigatório
                      </div>
                    )}
                  </div>
                  <div className="col-4 editais-destino">
                    <span className="required-asterisk">*</span>
                    <label className="col-form-label pb-3">
                      Edital de destino
                    </label>
                    <Field
                      component={StatefulMultiSelect}
                      name="editais_destino"
                      selected={values.editais_destino_selecionados || []}
                      options={formatarParaMultiselect(opcoesEditaisDestino)}
                      onSelectedChanged={values_ => {
                        form.change(`editais_destino_selecionados`, values_);
                        setErros({
                          ...erros,
                          editaisDestino: values_.length === 0
                        });
                      }}
                      disableSearch={true}
                      overrideStrings={{
                        selectSomeItems: "Selecione um edital",
                        allItemsAreSelected:
                          "Todos os itens estão selecionados",
                        selectAll: "Todos"
                      }}
                    />
                    {erros.editaisDestino && (
                      <div className="ant-form-explain">Campo obrigatório</div>
                    )}
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
