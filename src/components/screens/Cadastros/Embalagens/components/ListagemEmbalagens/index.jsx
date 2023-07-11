import {
  CADASTROS,
  CONFIGURACOES,
  EDITAR,
  CADASTRO_EMBALAGEM
} from "configs/constants";
import React from "react";
import { NavLink } from "react-router-dom";

import "./styles.scss";

const ListagemEmbalagens = ({ embalagens }) => {
  return (
    <section className="resultado-embalagens">
      <div className="titulo-verde">Embalagens Cadastradas</div>
      <article>
        <div className="grid-table header-table">
          <div>Nome da Embalagem</div>
          <div>Abreviação</div>
          <div>Data do Cadastro</div>
          <div>Ações</div>
        </div>
        {embalagens.map(embalagem => {
          return (
            <>
              <div key={embalagem.uuid} className="grid-table body-table">
                <div>{embalagem.nome}</div>
                <div>{embalagem.abreviacao}</div>
                <div>{embalagem.criado_em.slice(0, 10)}</div>
                <div>
                  <NavLink
                    to={`/${CONFIGURACOES}/${CADASTROS}/${CADASTRO_EMBALAGEM}/${EDITAR}?uuid=${
                      embalagem.uuid
                    }`}
                  >
                    <span className="link-acoes px-2">
                      <i title="Editar" className="verde fas fa-edit" />
                    </span>
                  </NavLink>
                </div>
              </div>
            </>
          );
        })}
      </article>
    </section>
  );
};

export default ListagemEmbalagens;
