import React, { Fragment } from "react";
import "antd/dist/antd.css";
import "./styles.scss";

const ListagemDietas = ({ dietasFiltradas }) => {
  return (
    <section className="tabela-dietas-especiais">
      <article>
        <div className="grid-table-rel-dietas header-table">
          <div>Cód. EOL do aluno</div>
          <div>Nome do aluno</div>
          <div>Cód. EOL da escola</div>
          <div>Classificação da dieta</div>
          <div>Protocolo padrão</div>
        </div>
        {dietasFiltradas.map((dietaEspecial, index) => {
          return (
            <Fragment key={index}>
              <div className="grid-table-rel-dietas body-table">
                <div>{dietaEspecial.cod_eol_aluno}</div>
                <div>{dietaEspecial.nome_aluno}</div>
                <div>{dietaEspecial.cod_eol_escola}</div>
                <div>{dietaEspecial.classificacao.nome}</div>
                <div>
                  {(dietaEspecial.protocolo_padrao &&
                    dietaEspecial.protocolo_padrao.nome) ||
                    dietaEspecial.nome_protocolo}
                </div>
              </div>
            </Fragment>
          );
        })}
      </article>
    </section>
  );
};

export default ListagemDietas;
