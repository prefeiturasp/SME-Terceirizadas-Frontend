import React, { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import "./styles.scss";
import { FichaTecnica } from "interfaces/pre_recebimento.interface";
import {
  PRE_RECEBIMENTO,
  CADASTRO_FICHA_TECNICA,
} from "../../../../../../configs/constants";

interface Props {
  objetos: Array<FichaTecnica>;
}

const Listagem: React.FC<Props> = ({ objetos }) => {
  const renderizarAcoes = (objeto: FichaTecnica): ReactElement => {
    const botaoContinuarCadastro = (
      <NavLink
        className="float-left"
        to={`/${PRE_RECEBIMENTO}/${CADASTRO_FICHA_TECNICA}?uuid=${objeto.uuid}`}
      >
        <span className="link-acoes px-2">
          <i title="Continuar Cadastro" className="fas fa-edit green" />
        </span>
      </NavLink>
    );

    return <>{objeto.status === "Rascunho" && botaoContinuarCadastro}</>;
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
                <div>{objeto.status}</div>
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
