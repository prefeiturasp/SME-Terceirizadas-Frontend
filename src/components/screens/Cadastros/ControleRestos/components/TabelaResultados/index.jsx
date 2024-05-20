import React, { Fragment, useState } from "react";
import { EyeOutlined } from "@ant-design/icons";

import "./styles.scss";
import ModalCadastrarControleRestos from "components/Shareable/ModalCadastrarControleRestos";

const TabelaControleRestos = ({ list, nextPage }) => {
  const [showModal, setShowModal] = useState(false);
  const [selecionado, setSelecionado] = useState(undefined);

  if (list === undefined || list.length === 0) {
    return <div>Carregando...</div>;
  }

  const openModal = (item) => {
    setSelecionado(item);
    setShowModal(true);
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
              <b>Restos Cadastrados</b>
            </p>
          </div>
          <div className="col-12">
            <table className="table table-bordered table-items">
              <thead>
                <tr className="table-head-items">
                  <th className="criado_em">Data e Horário da Medição</th>
                  <th className="responsavel">Responsável pela Medição</th>
                  <th className="escola">Unidade Educacional</th>
                  <th className="tipo_alimentacao">Tipo de Refeição</th>
                  <th className="acoes-visualizar-apenas">Ações</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item, idx) => {
                  return (
                    <Fragment key={idx}>
                      <tr className="table-body-items">
                        <td>{item.data_hora_medicao}</td>
                        <td>{item.usuario?.nome}</td>
                        <td>{item.escola?.nome}</td>
                        <td>{item.tipo_alimentacao_nome}</td>
                        <td className="acoes-visualizar-apenas">
                          <button
                            className="botaoVisualizar"
                            onClick={() => openModal(item)}
                          >
                            <EyeOutlined className="me-1" />
                            <span>Visualizar</span>
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
      <ModalCadastrarControleRestos
        closeModal={() => setShowModal(false)}
        showModal={showModal}
        tipoUsuario={tipoUsuario}
        changePage={nextPage}
        selecionado={selecionado}
      />
    </>
  );
};

export default ({ list }) => {
  return <TabelaControleRestos list={list} />;
};
