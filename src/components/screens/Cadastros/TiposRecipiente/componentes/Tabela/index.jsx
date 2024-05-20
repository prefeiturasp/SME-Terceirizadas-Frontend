import React, { Fragment, useState } from "react";
import "./style.scss";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import ModalExcluirItem from "../ModalExcluirItem";
import { usuarioEhCoordenadorNutriSupervisao } from "helpers/utilities";
import ModalCadastrarItem from "../ModalCadastrarItem";

export default ({ resultado, changePage }) => {
  const [selecionado, setSelecionado] = useState(undefined);
  const [showModal, setShowModal] = useState(false);
  const [showModalExcluir, setShowModalExcluir] = useState(false);

  const permissao = usuarioEhCoordenadorNutriSupervisao();

  const openModal = (item) => {
    setSelecionado(item);
    setShowModal(true);
  };

  const openModalExcluir = (item) => {
    setSelecionado(item);
    setShowModalExcluir(true);
  };

  return (
    <>
      {resultado.length === 0 ? (
        <div className="row">
          <div className="col-12 text-center">Nenhum resultado encontrado</div>
        </div>
      ) : (
        <div className="row">
          <div className="col-12">
            <p>
              <b>Tipos de Recipiente Cadastrados</b>
            </p>
          </div>
          <div className="col-12">
            <table className="table table-bordered table-items">
              <thead>
                <tr className="table-head-items">
                  <th className="nome">Nome</th>
                  <th className="acoes">Ações</th>
                </tr>
              </thead>
              <tbody>
                {resultado.map((item, idx) => {
                  return (
                    <Fragment key={idx}>
                      <tr className="table-body-items">
                        <td>{item.nome}</td>
                        <td className="acoes">
                          <button
                            className="botaoEditar me-2"
                            onClick={() => openModal(item)}
                            disabled={!permissao}
                          >
                            <FormOutlined className="me-1" />
                            Editar
                          </button>
                          |
                          <button
                            className="botaoExcluir ms-2"
                            onClick={() => openModalExcluir(item)}
                            disabled={!permissao}
                          >
                            <DeleteOutlined className="me-1" />
                            Excluir
                          </button>
                        </td>
                      </tr>
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <ModalCadastrarItem
        closeModal={() => setShowModal(false)}
        showModal={showModal}
        item={selecionado}
        changePage={() => changePage()}
      />
      <ModalExcluirItem
        closeModal={() => setShowModalExcluir(false)}
        showModal={showModalExcluir}
        item={selecionado}
        changePage={() => changePage()}
      />
    </>
  );
};
