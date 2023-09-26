import React from "react";

import "./styles.scss";

const Listagem = ({ objetos }) => {
  return (
    <div className="listagem-layouts-embalagens">
      <div className="titulo-verde mt-4 mb-3">
        Layouts de Embalagens Cadastrados
      </div>
      <article>
        <div className="grid-table header-table">
          <div>Nº do Cronograma</div>
          <div>Nº do Pregão/Chamada Pública</div>
          <div>Nome do Produto</div>
          <div>Status</div>
          <div>Data de Cadastro</div>
        </div>
        {objetos.map((objeto) => {
          return (
            <>
              <div key={objeto.uuid} className="grid-table body-table">
                <div>{objeto.numero_cronograma}</div>
                <div>{objeto.pregao_chamada_publica}</div>
                <div>{objeto.nome_produto}</div>
                <div>{objeto.status}</div>
                <div>{objeto.criado_em.slice(0, 10)}</div>
              </div>
            </>
          );
        })}
      </article>
    </div>
  );
};

export default Listagem;
