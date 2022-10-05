import React from "react";
import "antd/dist/antd.css";
import "./styles.scss";
import { OPTIONS_STATUS } from "../../constants";

const ListagemPlanilhas = ({ planilhas, filtros }) => {
  const formataNomeArquivo = url => {
    return url.split("/").pop();
  };

  const formataStatus = uuid => {
    let obj = OPTIONS_STATUS.find(el => el.uuid === uuid);
    return obj ? obj.nome : "";
  };

  return (
    <section className="tabela-gestao-acesso">
      <header>
        {filtros.modelo === "SERVIDOR"
          ? "Usuários Servidores"
          : "Usuários Não Servidores"}
      </header>
      <article>
        <div className="grid-table header-table">
          <div>Nome do Arquivo</div>
          <div>Data de Inserção</div>
          <div>Status</div>
          <div>Última Execução</div>
        </div>
        {planilhas.map((planilha, index) => {
          return (
            <div className="grid-table body-table" key={index}>
              <div>{formataNomeArquivo(planilha.conteudo)}</div>
              <div>{planilha.criado_em}</div>
              <div>{formataStatus(planilha.status)}</div>
              <div>{planilha.alterado_em}</div>
            </div>
          );
        })}
      </article>
    </section>
  );
};

export default ListagemPlanilhas;
