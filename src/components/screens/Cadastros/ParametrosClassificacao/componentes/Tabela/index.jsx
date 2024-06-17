import React, { Fragment, useState } from "react";
import "./style.scss";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import ModalExcluirItem from "../ModalExcluirItem";
import { usuarioEhCoordenadorNutriSupervisao } from "helpers/utilities";
import ModalCadastrarItem from "../ModalCadastrarItem";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";
import Botao from "../../../../../Shareable/Botao";

export default ({ resultado, tipo, fetchData }) => {
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

  const resultadoTipo = (resultado ?? []).filter((i) => i.tipo === tipo.uuid);

  return (
    <>
      <div className="row">
        <div className="col">
          <p>
            <b>{tipo.nome}</b>
          </p>
        </div>
        <div className="col-auto">
          <Botao
            texto="Cadastrar Novo Parâmetro"
            type={BUTTON_TYPE.BUTTON}
            style={BUTTON_STYLE.GREEN}
            onClick={() => openModal()}
          />
        </div>
      </div>
      <div className="row">
        {resultadoTipo.length === 0 ? (
          <div className="col-12 text-center">Nenhum resultado encontrado</div>
        ) : (
          <div className="col-12 mt-3">
            <table className="table table-bordered table-items">
              <thead>
                <tr className="table-head-items">
                  <th className="nome">Descrição</th>
                  <th className="valor">Menor ou igual a</th>
                  <th className="acoes">Ações</th>
                </tr>
              </thead>
              <tbody>
                {resultadoTipo.map((item, idx) => {
                  return (
                    <Fragment key={idx}>
                      <tr className="table-body-items">
                        <td>{item.descricao}</td>
                        <td>{item.valor}</td>
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
        )}
        <ModalCadastrarItem
          closeModal={() => setShowModal(false)}
          showModal={showModal}
          item={selecionado}
          fetchData={fetchData}
          tipo={tipo}
        />
        <ModalExcluirItem
          closeModal={() => setShowModalExcluir(false)}
          showModal={showModalExcluir}
          item={selecionado}
          fetchData={fetchData}
          tipo={tipo}
        />
      </div>
    </>
  );
};
