import React, { Fragment, useState } from "react";
import ModalAtivarInativar from "../ModalAtivarInativar";
import { ReloadOutlined } from "@ant-design/icons";
import "./style.scss";

export default ({ resultado, changePage }) => {
  const [selecionado, setSelecionado] = useState(undefined);
  const [showModal, setShowModal] = useState(false);

  const openModal = (item) => {
    setSelecionado(item);
    setShowModal(true);
  };

  return (
    <>
      {resultado.length === 0 ? (
        <div className="row">
          <div className="col-12 text-center">
            Não existem dados para filtragem informada.
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-12">
            <p className="table-title">
              <b>Produtos vinculados aos editais:</b>
            </p>
          </div>
          <div className="col-12">
            <table className="table table-bordered table-items">
              <thead>
                <tr className="table-head-items">
                  <th className="produto">Produto</th>
                  <th className="marca">Marca</th>
                  <th className="tipo">Tipo de produto</th>
                  <th className="edital">Edital</th>
                  <th className="status">Status</th>
                  <th className="acoes">Ações</th>
                  <th className="collapses" />
                </tr>
              </thead>
              <tbody>
                {resultado.map((item, idx) => {
                  return (
                    <Fragment key={idx}>
                      <tr className="table-body-items">
                        <td>{item.produto.nome}</td>
                        <td>{item.marca.nome}</td>
                        <td>{item.tipo_produto}</td>
                        <td>{item.edital.numero}</td>
                        <td>{item.ativo ? "Ativo" : "Inativo"}</td>
                        <td className="acoes">
                          <button
                            className="botaoExcluir ms-2"
                            onClick={() => openModal(item)}
                          >
                            <ReloadOutlined className="me-1" />
                            {item.ativo ? "Inativar" : "Ativar"}
                          </button>
                        </td>
                        <td className="acoes text-center">
                          <button
                            className="botaoExcluir"
                            onClick={() => {
                              let e = document.getElementById(item.uuid);
                              let i = document.getElementById(
                                `${item.uuid}-angle`
                              );

                              if (e.classList.contains("d-none")) {
                                e.classList.remove("d-none");
                              } else {
                                e.classList.add("d-none");
                              }

                              if (i.classList.contains("fa-angle-down")) {
                                i.classList.remove("fa-angle-down");
                                i.classList.add("fa-angle-up");
                              } else {
                                i.classList.remove("fa-angle-up");
                                i.classList.add("fa-angle-down");
                              }
                            }}
                          >
                            <i
                              className="fa fa-angle-down"
                              id={`${item.uuid}-angle`}
                            />
                          </button>
                        </td>
                      </tr>
                      <tr className="table-body-items">
                        <td className="d-none p-3" id={item.uuid} colSpan="7">
                          <b>Outras informações: {item.outras_informacoes}</b>
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
      <ModalAtivarInativar
        closeModal={() => setShowModal(false)}
        showModal={showModal}
        item={selecionado}
        changePage={() => changePage()}
      />
    </>
  );
};
