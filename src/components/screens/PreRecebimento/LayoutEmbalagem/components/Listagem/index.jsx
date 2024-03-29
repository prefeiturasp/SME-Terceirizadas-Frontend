import React from "react";
import { NavLink } from "react-router-dom";

import {
  DETALHAR_LAYOUT_EMBALAGEM,
  CORRIGR_LAYOUT_EMBALAGEM,
  PRE_RECEBIMENTO,
  ATUALIZAR_LAYOUT_EMBALAGEM,
} from "configs/constants";

import "./styles.scss";

export default ({ objetos, perfilFornecedor = false }) => {
  const renderizarStatus = (status, perfilFornecedor) => {
    return perfilFornecedor && status === "Solicitado Correção" ? (
      <span className="orange">Pendente de Correção</span>
    ) : (
      status
    );
  };

  const renderizarAcoes = (objeto) => {
    const botaoDetalharVerde = (
      <NavLink
        className="float-start"
        to={`/${PRE_RECEBIMENTO}/${DETALHAR_LAYOUT_EMBALAGEM}?uuid=${objeto.uuid}`}
      >
        <span className="link-acoes px-2">
          <i title="Detalhar" className="fas fa-eye green" />
        </span>
      </NavLink>
    );

    const botaoCorrigirLaranja = (
      <NavLink
        className="float-start"
        to={`/${PRE_RECEBIMENTO}/${CORRIGR_LAYOUT_EMBALAGEM}?uuid=${objeto.uuid}`}
      >
        <span className="link-acoes px-2">
          <i title="Corrigir" className="fas fa-edit orange" />
        </span>
      </NavLink>
    );

    const botaoAtualizar = (
      <NavLink
        className="float-start"
        to={`/${PRE_RECEBIMENTO}/${ATUALIZAR_LAYOUT_EMBALAGEM}?uuid=${objeto.uuid}`}
      >
        <span className="link-acoes px-2">
          <i title="Atualizar Layout" className="fas fa-photo-video green" />
        </span>
      </NavLink>
    );

    return (
      <>
        {objeto.status === "Enviado para Análise" && botaoDetalharVerde}
        {objeto.status === "Solicitado Correção" && botaoCorrigirLaranja}
        {objeto.status === "Aprovado" && botaoAtualizar}
      </>
    );
  };

  return (
    <div className="listagem-layouts-embalagens">
      <div className="titulo-verde mt-4 mb-3">
        Layouts de Embalagens Cadastrados
      </div>

      <article>
        <div className="grid-table header-table">
          <div>Nº da Ficha Técnica</div>
          <div>Nome do Produto</div>
          <div>Nº do Pregão/Chamada Pública</div>
          <div>Status</div>
          <div>Data de Cadastro</div>
          <div>Ações</div>
        </div>

        {objetos.map((objeto) => {
          return (
            <>
              <div key={objeto.uuid} className="grid-table body-table">
                <div>{objeto.numero_ficha_tecnica}</div>
                <div>{objeto.nome_produto}</div>
                <div>{objeto.pregao_chamada_publica}</div>
                <div>{renderizarStatus(objeto.status, perfilFornecedor)}</div>
                <div>{objeto.criado_em.slice(0, 10)}</div>
                <div>{renderizarAcoes(objeto)}</div>
              </div>
            </>
          );
        })}
      </article>
    </div>
  );
};
