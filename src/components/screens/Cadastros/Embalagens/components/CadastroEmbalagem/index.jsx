import React, { useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { Spin } from "antd";
import "./style.scss";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";
import { Field, Form } from "react-final-form";
import InputText from "components/Shareable/Input/InputText";
import { Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import {
  alphaNumericAndSingleSpaceBetweenCharacters,
  noSpaceStartOrEnd,
  required,
} from "helpers/fieldValidators";
import {
  cadastraEmbalagens,
  editaEmbalagem,
  getEmbalagem,
  getListaNomesEmbalagens,
} from "services/qualidade.service";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import { composeValidators } from "helpers/utilities";
import {
  CADASTROS,
  CONFIGURACOES,
  EMBALAGENS_CADASTRADAS,
} from "configs/constants";

let tituloModalSalvar = "Salvar Cadastro da Embalagem";
let tituloModalCancelarSalvar = "Cancelar Cadastro da Embalagem";
let tituloModalEditar = "Salvar Edição da Embalagem";
let tituloModalCancelarEditar = "Cancelar Edição da Embalagem";

let textoModalSalvar = "Confirma o cadastro da Embalagem?";
let textoModalCancelarSalvar = "Deseja cancelar o Cadastro?";
let textoModalEditar = "Confirma a edição do cadastro da Embalagem?";
let textoModalCancelarEditar = "Deseja cancelar a edição do Cadastro?";

export default () => {
  const [carregando, setCarregando] = useState(false);
  const [showModalSalvar, setShowModalSalvar] = useState(false);
  const [showModalCancelar, setShowModalCancelar] = useState(false);
  const [nomesEmbalagens, setNomesEmbalagens] = useState(null);
  const [edicao, setEdicao] = useState(false);
  const [uuid, setUuid] = useState(null);
  const [initialValues, setInitialValues] = useState({});
  const history = useHistory();

  const onSubmit = () => {
    setShowModalSalvar(true);
  };

  const salvarEmbalagem = async (values, form) => {
    setCarregando(true);
    let payload = montaPayload(values);

    try {
      let response = edicao
        ? await editaEmbalagem(payload, uuid)
        : await cadastraEmbalagens(payload);
      if (response.status === HTTP_STATUS.CREATED) {
        toastSuccess("Embalagem Cadastrada com sucesso!");
        setShowModalSalvar(false);
        form.restart(initialValues);
        setCarregando(false);
      } else if (response.status === HTTP_STATUS.OK) {
        history.push(
          `/${CONFIGURACOES}/${CADASTROS}/${EMBALAGENS_CADASTRADAS}`
        );
        toastSuccess("Edição do cadastro realizado com sucesso!");
        setCarregando(false);
        setShowModalSalvar(false);
      }
    } catch (error) {
      toastError("Ocorreu um erro ao salvar a embalagem");
      setCarregando(false);
      setShowModalSalvar(false);
    }
  };

  const montaPayload = (values) => {
    let payload = {};

    payload.nome = values.nome_embalagem;
    payload.abreviacao = values.abreviacao;

    return payload;
  };

  const validaNomeEmbalagem = (value) => {
    if (value !== initialValues.nome_embalagem) {
      if (nomesEmbalagens && nomesEmbalagens.includes(value))
        return "Embalagem já cadastrada";
      else return undefined;
    } else return undefined;
  };

  const buscaEmbalagem = async (value) => {
    let response;
    try {
      response = await getEmbalagem(value);
      if (response.status === HTTP_STATUS.OK) {
        setInitialValues({
          nome_embalagem: response.data.nome,
          abreviacao: response.data.abreviacao,
          data_cadastro: response.data.criado_em.slice(0, 10),
        });
        setCarregando(false);
      }
    } catch (e) {
      toastError("Ocorreu um erro ao carregar dados da embalagem");
      setCarregando(false);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");

    if (uuid) {
      setUuid(uuid);
      setCarregando(true);
      setEdicao(true);
      buscaEmbalagem(uuid);
    } else {
      setInitialValues({
        data_cadastro: new Date().toLocaleDateString(),
      });
    }

    const buscaListaNomesEmbalagens = async () => {
      const response = await getListaNomesEmbalagens();
      setNomesEmbalagens(response.data.results);
    };

    buscaListaNomesEmbalagens();
  }, []);

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 card-cadastro-embalagem">
        <div className="card-body cadastro-embalagem">
          <Form
            onSubmit={onSubmit}
            initialValues={initialValues}
            render={({ form, handleSubmit, values }) => (
              <form onSubmit={handleSubmit}>
                <div className="mt-4 card-title green">Dados da Embalagem</div>
                <div className="row">
                  <div className="col-6">
                    <Field
                      component={InputText}
                      label="Nome da Embalagem"
                      name="nome_embalagem"
                      placeholder="Digite o nome da Embalagem"
                      validate={composeValidators(
                        required,
                        validaNomeEmbalagem,
                        alphaNumericAndSingleSpaceBetweenCharacters,
                        noSpaceStartOrEnd
                      )}
                      required
                      toUppercaseActive
                    />
                  </div>
                  <div className="col-3">
                    <Field
                      component={InputText}
                      label="Abreviação"
                      name="abreviacao"
                      placeholder="Digite a Abreviação"
                      validate={composeValidators(required)}
                      required
                      toUppercaseActive
                      maxlength="3"
                      proibeNumeros
                    />
                  </div>
                  <div className="col-3">
                    <Field
                      component={InputText}
                      label="Data do Cadastro"
                      name="data_cadastro"
                      disabled={true}
                    />
                  </div>
                </div>

                <div className="mt-5 mb-4">
                  <Botao
                    texto="Salvar"
                    type={BUTTON_TYPE.SUBMIT}
                    style={BUTTON_STYLE.GREEN}
                    className="float-right ml-3"
                  />
                  <Botao
                    texto="Cancelar"
                    type={BUTTON_TYPE.BUTTON}
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                    className="float-right ml-3"
                    onClick={() => {
                      setShowModalCancelar(true);
                    }}
                  />
                </div>
                <Modal
                  show={showModalCancelar}
                  onHide={() => {
                    setShowModalCancelar(false);
                  }}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>
                      {edicao
                        ? tituloModalCancelarEditar
                        : tituloModalCancelarSalvar}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {edicao
                      ? textoModalCancelarEditar
                      : textoModalCancelarSalvar}
                  </Modal.Body>
                  <Modal.Footer>
                    <Botao
                      texto="Não"
                      type={BUTTON_TYPE.BUTTON}
                      onClick={() => {
                        setShowModalCancelar(false);
                      }}
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                      className="ml-3"
                    />
                    <Botao
                      texto="Sim"
                      type={BUTTON_TYPE.BUTTON}
                      onClick={() => {
                        setShowModalCancelar(false);
                        history.push(
                          `/${CONFIGURACOES}/${CADASTROS}/${EMBALAGENS_CADASTRADAS}`
                        );
                      }}
                      style={BUTTON_STYLE.GREEN}
                      className="ml-3"
                    />
                  </Modal.Footer>
                </Modal>
                <Modal
                  show={showModalSalvar}
                  onHide={() => {
                    setShowModalSalvar(false);
                  }}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>
                      {edicao ? tituloModalEditar : tituloModalSalvar}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {edicao ? textoModalEditar : textoModalSalvar}
                  </Modal.Body>
                  <Modal.Footer>
                    <Botao
                      texto="Não"
                      type={BUTTON_TYPE.BUTTON}
                      onClick={() => {
                        setShowModalSalvar(false);
                        setCarregando(false);
                      }}
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                      className="ml-3"
                    />
                    <Botao
                      texto="Sim"
                      type={BUTTON_TYPE.BUTTON}
                      onClick={() => {
                        salvarEmbalagem(values, form);
                      }}
                      style={BUTTON_STYLE.GREEN}
                      className="ml-3"
                    />
                  </Modal.Footer>
                </Modal>
              </form>
            )}
          />
        </div>
      </div>
    </Spin>
  );
};
