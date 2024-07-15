import React, { Fragment, useState } from "react";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";

import "./styles.scss";
import ModalCadastrarControleSobras from "components/Shareable/ModalCadastrarControleSobras";
import { PERIODO_DESPERDICIO } from "../../../../../../constants/shared";
import ModalExcluirItem from "../ModalExcluirItem";

const TabelaControleSobras = ({ list, nextPage }) => {
  const [showModal, setShowModal] = useState(false);
  const [selecionado, setSelecionado] = useState(undefined);
  const [showModalExcluir, setShowModalExcluir] = useState(false);

  if (list === undefined || list.length === 0) {
    return <div>Carregando...</div>;
  }

  const openModal = (item) => {
    setSelecionado(item);
    setShowModal(true);
  };

  const openModalExcluir = (item) => {
    setSelecionado(item);
    setShowModalExcluir(true);
  };

  const tipoUsuario = localStorage.getItem("tipo_perfil");

  return (
    <>
      {list.length === 0 ? (
        <div className="row">
          <div className="col-12 text-center">Nenhum resultado encontrado</div>
        </div>
      ) : (
        <div className="row">
          <div className="col-12">
            <p>
              <b>Sobras Cadastradas</b>
            </p>
          </div>
          <div className="col-12">
            <table className="table table-bordered table-items">
              <thead>
                <tr className="table-head-items">
                  <th className="criado_em">Data da Medição</th>
                  <th className="periodo">Período</th>
                  <th className="responsavel">Responsável pela Medição</th>
                  <th className="tipo_alimentacao">Tipo de Refeição</th>
                  <th className="escola">Unidade Educacional</th>
                  <th className="acoes">Ações</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item, idx) => {
                  return (
                    <Fragment key={idx}>
                      <tr className="table-body-items">
                        <td>{item.data_medicao}</td>
                        <td>
                          {item.periodo &&
                            PERIODO_DESPERDICIO.find(
                              (p) => p.uuid === item.periodo
                            ).nome}
                        </td>
                        <td>{item.usuario?.nome}</td>
                        <td>{item.tipo_alimentacao_nome}</td>
                        <td>{item.escola?.nome}</td>
                        <td className="acoes">
                          <button
                            className="botaoEditar me-2"
                            onClick={() => openModal(item)}
                          >
                            <FormOutlined className="me-1" />
                            Editar
                          </button>
                          |
                          <button
                            className="botaoExcluir ms-2"
                            onClick={() => openModalExcluir(item)}
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
      <ModalCadastrarControleSobras
        closeModal={() => setShowModal(false)}
        showModal={showModal}
        tipoUsuario={tipoUsuario}
        changePage={nextPage}
        selecionado={selecionado}
      />
      <ModalExcluirItem
        closeModal={() => setShowModalExcluir(false)}
        showModal={showModalExcluir}
        item={selecionado}
        changePage={nextPage}
      />
    </>
  );
};

export default ({ list, nextPage }) => {
  return <TabelaControleSobras list={list} nextPage={nextPage} />;
};
