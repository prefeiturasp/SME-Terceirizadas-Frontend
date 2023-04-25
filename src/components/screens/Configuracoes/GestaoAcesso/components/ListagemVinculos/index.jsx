import React from "react";
import "antd/dist/antd.min.css";
import "./styles.scss";
import { Tooltip } from "antd";

const ListagemVinculos = ({ vinculos, toggleEdicao, toggleExclusao }) => {
  return (
    <section className="tabela-gestao-acesso">
      <header>Usuários com Acesso Cadastrados</header>
      <article>
        <div className="grid-table header-table">
          <div>Nome Completo</div>
          <div>ID do Usuário</div>
          <div>Visão</div>
          <div>Perfil de Acesso</div>
          <div />
        </div>
        {vinculos.map((vinculo, index) => {
          return (
            <div className="grid-table body-table" key={index}>
              <div>{vinculo.nome_usuario}</div>
              <div>{vinculo.username}</div>
              <div>{vinculo.visao_perfil}</div>
              <div>{vinculo.nome_perfil}</div>
              <div className="flex-container">
                {vinculo.visao_perfil !== "EMPRESA" ? (
                  <Tooltip title="Excluir">
                    <button
                      className="verde"
                      onClick={() => toggleExclusao(true, vinculo)}
                    >
                      <i className="fas fa-trash" />
                    </button>
                  </Tooltip>
                ) : (
                  <Tooltip title="Editar">
                    <button
                      className="verde"
                      onClick={() => toggleEdicao(true, vinculo)}
                    >
                      <i className="fas fa-edit" />
                    </button>
                  </Tooltip>
                )}
              </div>
            </div>
          );
        })}
      </article>
    </section>
  );
};

export default ListagemVinculos;
