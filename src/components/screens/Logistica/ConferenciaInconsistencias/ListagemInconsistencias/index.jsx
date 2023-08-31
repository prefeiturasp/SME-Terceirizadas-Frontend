import React from "react";
import "./styles.scss";

const ListagemInconsistencias = ({ guias }) => {
  return (
    <>
      <section className="guias-inconsistencias">
        <header>Guias de Remessa com Inconsistência</header>
        <article>
          <div className="grid-table header-table">
            <div>Nº da Guia de Remessa</div>
            <div>Código CODAE</div>
            <div>Nome da UE</div>
          </div>
          {guias.map((guia) => {
            const bordas = "desativar-borda";
            return (
              <>
                <div className="grid-table body-table">
                  <div className={`${bordas}`}>{guia.numero_guia}</div>
                  <div className={`${bordas}`}>{guia.codigo_unidade}</div>
                  <div className={`${bordas}`}>{guia.nome_unidade}</div>
                </div>
              </>
            );
          })}
        </article>
      </section>
    </>
  );
};

export default ListagemInconsistencias;
