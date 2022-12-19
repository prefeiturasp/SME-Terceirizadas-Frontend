import React, { Fragment, useEffect, useState } from "react";
import "antd/dist/antd.css";
import "./styles.scss";
import { Paginacao } from "components/Shareable/Paginacao";
import { STATUS_DIETAS } from "constants/shared";

const ListagemDietas = ({ dietasFiltradas, status }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dietasFiltradasCopy, setDietasFiltradasCopy] = useState([]);

  const pageSize = 10;

  const onChangePage = page => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setDietasFiltradasCopy(dietasFiltradas.slice(0, pageSize));
    setCurrentPage(1);
  }, [dietasFiltradas]);

  useEffect(() => {
    const dietasFiltradasPagina = dietasFiltradas.slice(
      currentPage * pageSize - pageSize,
      currentPage * pageSize
    );
    setDietasFiltradasCopy(dietasFiltradasPagina);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const ehStatusCanceladas = () => {
    return status === STATUS_DIETAS.CANCELADAS.toUpperCase();
  };

  return (
    <section className="tabela-dietas-especiais">
      <article>
        <div
          className={`grid-table-rel-dietas dietas-${
            ehStatusCanceladas() ? "canceladas" : "autorizadas"
          } header-table`}
        >
          <div>Cód. EOL do aluno</div>
          <div>Nome do aluno</div>
          <div>Nome da Escola</div>
          <div>Classificação da dieta</div>
          <div>Protocolo padrão</div>
          {ehStatusCanceladas() && <div>Data de cancelamento</div>}
        </div>
        {dietasFiltradasCopy.map((dietaEspecial, index) => {
          return (
            <Fragment key={index}>
              <div
                className={`grid-table-rel-dietas dietas-${
                  ehStatusCanceladas() ? "canceladas" : "autorizadas"
                } body-table`}
              >
                <div>{dietaEspecial.cod_eol_aluno || "--"}</div>
                <div>{dietaEspecial.nome_aluno}</div>
                <div>{dietaEspecial.nome_escola}</div>
                <div>
                  {dietaEspecial.classificacao
                    ? dietaEspecial.classificacao.nome
                    : "--"}
                </div>
                <div>
                  {(dietaEspecial.protocolo_padrao &&
                    dietaEspecial.protocolo_padrao.nome) ||
                    dietaEspecial.nome_protocolo}
                </div>
                {ehStatusCanceladas() && (
                  <div>{dietaEspecial.data_ultimo_log}</div>
                )}
              </div>
            </Fragment>
          );
        })}
      </article>
      <Paginacao
        onChange={onChangePage}
        total={dietasFiltradas.length}
        pageSize={pageSize}
        current={currentPage}
      />
    </section>
  );
};

export default ListagemDietas;
