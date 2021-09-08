import React from "react";
import "antd/dist/antd.css";
import "./styles.scss";

const ListagemKits = ({ kits }) => {
  return (
    <section className="resultado-consulta-kit">
      <article>
        <div className="grid-table header-table">
          <div>Nome do Kit</div>
          <div>Descrição</div>
          <div>Nº do Edital</div>
          <div>Status</div>
        </div>
        {kits.map(kit => {
          return (
            <>
              <div key={kit.uuid} className="grid-table body-table">
                <div>{kit.nome}</div>
                <div dangerouslySetInnerHTML={{ __html: kit.descricao }} />
                <div>{kit.edital ? kit.edital.numero : ""}</div>
                <div>{kit.status}</div>
              </div>
            </>
          );
        })}
      </article>
    </section>
  );
};

export default ListagemKits;
