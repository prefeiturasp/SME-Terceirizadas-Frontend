import React, { ReactElement } from "react";
import { NavLink } from "react-router-dom";

import {
  PRE_RECEBIMENTO,
  CADASTRO_FICHA_TECNICA,
  DETALHAR_FICHA_TECNICA,
} from "configs/constants";
import { FichaTecnica } from "interfaces/pre_recebimento.interface";

import "./styles.scss";

interface Props {
  objetos: Array<FichaTecnica>;
}

const Listagem: React.FC<Props> = ({ objetos }) => {
  const renderizarStatus = (status: string) =>
    status === "Enviada para Correção" ? (
      <span className="orange">Solicitação de Alteração</span>
    ) : (
      status
    );

  const renderizarAcoes = (objeto: FichaTecnica): ReactElement => {
    const botaoContinuarCadastro = (
      <NavLink
        className="float-start"
        to={`/${PRE_RECEBIMENTO}/${CADASTRO_FICHA_TECNICA}?uuid=${objeto.uuid}`}
      >
        <span className="link-acoes px-2">
          <i title="Continuar Cadastro" className="fas fa-edit green" />
        </span>
      </NavLink>
    );

    const botaoDetalhar = (
      <NavLink
        className="float-start"
        to={`/${PRE_RECEBIMENTO}/${DETALHAR_FICHA_TECNICA}?uuid=${objeto.uuid}`}
      >
        <span className="link-acoes px-2">
          <i title="Detalhar" className="fas fa-eye green" />
        </span>
      </NavLink>
    );

    const botaoAlterar = (
      <NavLink
        className="float-start"
        to={`/${PRE_RECEBIMENTO}/?uuid=${objeto.uuid}`}
      >
        <span className="link-acoes px-2">
          <i title="Alterar" className="fas fa-edit orange" />
        </span>
      </NavLink>
    );

    return (
      <>
        {objeto.status === "Rascunho" && botaoContinuarCadastro}
        {["Enviada para Análise"].includes(objeto.status) && botaoDetalhar}
        {objeto.status === "Enviada para Correção" && botaoAlterar}
      </>
    );
  };

  return (
    <div className="listagem-fichas-tecnicas">
      <div className="titulo-verde mt-4 mb-3">Fichas Técnicas Cadastradas</div>

      <article>
        <div className="grid-table header-table">
          <div>Nº da Ficha</div>
          <div>Nome do Produto</div>
          <div>Nº Pregão/Chamada Pública</div>
          <div>Data do Cadastro</div>
          <div>Status</div>
          <div>Ações</div>
        </div>

        {objetos.map((objeto) => {
          return (
            <>
              <div key={objeto.uuid} className="grid-table body-table">
                <div>{objeto.numero}</div>
                <div>{objeto.nome_produto}</div>
                <div>{objeto.pregao_chamada_publica}</div>
                <div>{objeto.criado_em}</div>
                <div>{renderizarStatus(objeto.status)}</div>
                <div>{renderizarAcoes(objeto)}</div>
              </div>
            </>
          );
        })}
      </article>
    </div>
  );
};

export default Listagem;
