import React, { useEffect, useReducer } from "react";
import { Form, Field } from "react-final-form";
import AutoCompleteField from "components/Shareable/AutoCompleteField";
import InputText from "components/Shareable/Input/InputText";
import { Modal } from "react-bootstrap";
import Botao from "components/Shareable/Botao";
import HTTP_STATUS from "http-status-codes";
import { getError } from "helpers/utilities";
import { toastSuccess, toastError } from "components/Shareable/Toast/dialogs";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";
import { required, textAreaRequired } from "helpers/fieldValidators";
import { TextAreaWYSIWYG } from "components/Shareable/TextArea/TextAreaWYSIWYG";
import { solicitarCadastroProdutoDieta } from "services/produto.service";
import { getNomesProdutos } from "services/produto.service";
import "./styles.scss";

const initialState = {
  produtos: []
};

function reducer(state, { type: actionType, payload }) {
  switch (actionType) {
    case "popularDados":
      return { ...state, dados: payload };
    case "atualizarFiltro": {
      if (!payload.searchText.length) {
        return { ...state, [payload.filtro]: [] };
      }
      const reg = new RegExp(payload.searchText, "i");
      const filtrado = state.dados[payload.filtro].filter(el => reg.test(el));
      return { ...state, [payload.filtro]: filtrado };
    }
    default:
      // eslint-disable-next-line no-console
      console.error("Invalid action type: ", actionType);
  }
}

const ModalSolicitacaoCadastroProduto = ({
  showModal,
  closeModal,
  dietaEspecial,
  setTemSolicitacaoCadastroProduto
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchData() {
      const produtos = await getNomesProdutos();
      dispatch({
        type: "popularDados",
        payload: {
          produtos: produtos.data.results.map(el => el.nome)
        }
      });
    }
    fetchData();
  }, []);

  const onSearch = (filtro, searchText) => {
    dispatch({
      type: "atualizarFiltro",
      payload: {
        filtro,
        searchText
      }
    });
  };

  const onSubmit = async values => {
    try {
      const response = await solicitarCadastroProdutoDieta({
        ...values,
        solicitacao_dieta_especial: dietaEspecial.uuid,
        aluno: dietaEspecial.aluno.uuid,
        escola: dietaEspecial.escola.uuid,
        terceirizada: dietaEspecial.escola.lote.terceirizada.uuid
      });
      if (response.status === HTTP_STATUS.CREATED) {
        setTemSolicitacaoCadastroProduto();
        closeModal();
        toastSuccess("Solicitação realizada com sucesso!");
      } else {
        closeModal();
        toastError("Houve um erro ao solicitar cadastro de produto");
      }
    } catch (e) {
      if (e.response.status && e.response.status === HTTP_STATUS.BAD_REQUEST) {
        toastError(getError(e.response));
      } else {
        closeModal();
        toastError("Houve um erro ao solicitar cadastro de produto");
      }
    }
  };

  return (
    <Modal dialogClassName="modal-90w" show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Solicitar cadastro de novo produto</Modal.Title>
      </Modal.Header>
      <Form
        onSubmit={onSubmit}
        validate={values => {
          const errors = {};
          if (!values.nome_produto) {
            errors.nome_produto = "Required";
          }
          return errors;
        }}
        render={({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <Modal.Body>
              <div className="form-row">
                <div className="col-md-4 col-xl-4 nome-produto ">
                  <Field
                    component={AutoCompleteField}
                    dataSource={state.produtos}
                    placeholder="Digite nome do produto"
                    label="* Nome do Produto"
                    className="input-busca-produto mt-1"
                    onSearch={v => onSearch("produtos", v)}
                    name="nome_produto"
                    // required
                    validate={required}
                  />
                </div>
                <div className="col-md-4 col-xl-4">
                  <Field
                    component={InputText}
                    className="input-busca-produto"
                    label="Marca do Produto"
                    placeholder="Digite marca do produto"
                    name="marca_produto"
                  />
                </div>
                <div className="col-md-4 col-xl-4">
                  <Field
                    component={InputText}
                    label="Fabricante do Produto"
                    placeholder="Digite fabricante do produto"
                    name="fabricante_produto"
                  />
                </div>
              </div>
              <div className="form-row mb-5">
                <div className="col-md-12 col-xl-12 mb-3">
                  <Field
                    component={TextAreaWYSIWYG}
                    label="Informações do Produto"
                    name="info_produto"
                    required
                    validate={textAreaRequired}
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <div className="row mt-4">
                <div className="col-12">
                  <Botao
                    key={0}
                    texto="Cancelar"
                    type={BUTTON_TYPE.BUTTON}
                    style={BUTTON_STYLE.BLUE_OUTLINE}
                    onClick={closeModal}
                    disabled={submitting}
                  />
                  <Botao
                    key={1}
                    type={BUTTON_TYPE.SUBMIT}
                    texto="Enviar"
                    style={BUTTON_STYLE.BLUE}
                    className="ml-3"
                    disabled={submitting}
                  />
                </div>
              </div>
            </Modal.Footer>
          </form>
        )}
      />
    </Modal>
  );
};

export default ModalSolicitacaoCadastroProduto;
