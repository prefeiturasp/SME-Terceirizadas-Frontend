import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import "./style.scss";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";
import { Field, Form } from "react-final-form";
import InputText from "components/Shareable/Input/InputText";
import { Modal } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import {
  alphaNumericAndSingleSpaceBetweenCharacters,
  noSpaceStartOrEnd,
  required
} from "helpers/fieldValidators";
import {
  cadastraEmbalagens,
  getListaEmbalagens
} from "services/qualidade.service";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import { composeValidators } from "helpers/utilities";
import {
  CADASTROS,
  CONFIGURACOES,
  EMBALAGENS_CADASTRADAS
} from "configs/constants";

const initialValues = {
  data_cadastro: new Date().toLocaleDateString()
};

export default () => {
  const [carregando, setCarregando] = useState(false);
  const [showModalSalvar, setShowModalSalvar] = useState(false);
  const [showModalCancelar, setShowModalCancelar] = useState(false);
  const [embalagens, setEmbalagens] = useState(null);
  const history = useHistory();

  const onSubmit = () => {
    setShowModalSalvar(true);
  };

  const salvarEmbalagem = async (values, form) => {
    setCarregando(true);
    let payload = montaPayload(values);

    try {
      let response = await cadastraEmbalagens(payload);
      if (response.status === 201) {
        toastSuccess("Embalagem Cadastrada com sucesso!");
        setShowModalSalvar(false);
        form.restart(initialValues);
        setCarregando(false);
      } else {
        toastError("Ocorreu um erro ao salvar a embalagem");
        setCarregando(false);
      }
    } catch (error) {
      toastError("Ocorreu um erro ao salvar a embalagem");
      setCarregando(false);
    }
  };

  const montaPayload = values => {
    let payload = {};

    payload.nome = values.nome_embalagem;
    payload.abreviacao = values.abreviacao;

    return payload;
  };

  const validaNomeEmbalagem = value => {
    if (embalagens.includes(value.toUpperCase()))
      return "Embalagem já cadastrada";
    else return undefined;
  };

  useEffect(() => {
    const buscaListaEmbalagens = async () => {
      const response = await getListaEmbalagens();
      setEmbalagens(response.data.results);
    };

    buscaListaEmbalagens();
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
                <div className="mb-4">
                  <Link
                    to={`/${CONFIGURACOES}/${CADASTROS}/${EMBALAGENS_CADASTRADAS}`}
                  >
                    <Botao
                      texto="Embalagens Cadastradas"
                      type={BUTTON_TYPE.BUTTON}
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                      className="float-right"
                      onClick={() => {}}
                    />
                  </Link>
                </div>
                <div className="row">
                  <div className="card-title green">Dados das Embalagens</div>
                </div>

                <div className="row">
                  <div className="col-6">
                    <Field
                      component={InputText}
                      label="Nome da Embalagem"
                      name="nome_embalagem"
                      placeholder="Digite o Nome da Embalagem"
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
                      placeholder="Digite o Nome da Abreviação"
                      validate={composeValidators(required)}
                      required
                      toUppercaseActive
                    />
                  </div>
                  <div className="col-3">
                    <Field
                      component={InputText}
                      label="Data de Cadastro"
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
                    <Modal.Title>Cancelar Cadastro da Embalagem</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Deseja cancelar o Cadastro?</Modal.Body>
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
                        history.push("/");
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
                    <Modal.Title>Salvar Cadastro da Embalagem</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Confirma o cadastro da Embalagem?</Modal.Body>
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
