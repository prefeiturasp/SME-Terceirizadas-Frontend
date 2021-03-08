import React from "react";
import "antd/dist/antd.css";
import "./styles.scss";
import TabelaDieta from "../TabelaDieta";

const ListagemDietas = ({ dietas, ativos, setAtivos, filtros, setFiltros }) => {
  const getTitulo = () => {
    if (filtros.nome_aluno) return `"${filtros.nome_aluno}"`;
    return "busca";
  };
  return (
    <section className="resultado-busca-produto-avancada">
      <header>Veja os resultado(s) para {getTitulo()}</header>
      <div className="listagem-tabela">
        <div className="grid-dieta-cancelamento-table header-table-produtos">
          <div>Número da Solicitação</div>
          <div>Nome do Aluno</div>
          <div>Tipo de Solicitação</div>
          <div />
        </div>
        {dietas.map(dieta => {
          const bordas =
            ativos && ativos.includes(dieta.uuid) ? "desativar-borda" : "";
          const icone =
            ativos && ativos.includes(dieta.uuid) ? "angle-up" : "angle-down";
          return (
            <>
              <TabelaDieta
                dieta={dieta}
                bordas={bordas}
                icone={icone}
                ativos={ativos}
                setAtivos={setAtivos}
                filtros={filtros}
                setFiltros={setFiltros}
              />
            </>
          );
        })}
      </div>
    </section>
  );
};

export default ListagemDietas;
