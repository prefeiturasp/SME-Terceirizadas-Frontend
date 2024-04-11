import React, { useEffect, useRef, useState } from "react";

import { QuestoesPorProduto } from "interfaces/recebimento.interface";

import "./styles.scss";
import Label from "components/Shareable/Label";

interface ListagemProps {
  questoesPorProdutos: QuestoesPorProduto[];
}

const Listagem = ({ questoesPorProdutos }: ListagemProps) => {
  const [collapseAberto, setCollapseAberto] = useState(-1);
  const accordionQuestoes = useRef<HTMLDivElement>();

  const trocarCollapseAberto = (index: number) =>
    collapseAberto === index ? setCollapseAberto(-1) : setCollapseAberto(index);

  useEffect(() => {
    setCollapseAberto(-1);
    fecharCollapsesQuestoes();
  }, [questoesPorProdutos]);

  const fecharCollapsesQuestoes = () => {
    const collapses = Array.from(accordionQuestoes.current.children);
    collapses.forEach((collapse) => {
      collapse.querySelector(".show")?.classList.toggle("show");
    });
  };

  const renderizarQuestoes = (questoes: string[]) =>
    questoes.map((e, index) => (
      <div className="p-1" key={index}>
        {e}
      </div>
    ));

  const labelQuestoesPrimarias = (
    <span>
      Questões Atribuídas a{" "}
      <span className="bold-verde">Embalagem Primária</span>
    </span>
  );

  const labelQuestoesSecundarias = (
    <span>
      Questões Atribuídas a{" "}
      <span className="bold-verde">Embalagem Secundária</span>
    </span>
  );

  return (
    <div className="listagem-questoes-por-produtos">
      <div className="titulo-verde mt-2 mb-3">
        Produtos com Questões Atribuídas
      </div>

      <article>
        <div className="grid-table header-table">
          <div>Ficha Técnica</div>
          <div>Produto</div>
          <div>Questões</div>
        </div>

        <div
          className="accordion accordion-flush"
          id="accordionQuestoes"
          ref={accordionQuestoes}
        >
          {questoesPorProdutos.map((questao, index) => (
            <div className="accordion-item" key={questao.numero_ficha}>
              <div
                className="grid-table body-table accordion-header"
                id={`heading${questao.numero_ficha}`}
              >
                <div>{questao.numero_ficha}</div>
                <div>{questao.nome_produto}</div>
                <div>
                  <span
                    className="botao-expandir-questoes collapsed"
                    onClick={() => trocarCollapseAberto(index)}
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${questao.numero_ficha}`}
                    aria-expanded="false"
                    aria-controls={`collapse${questao.numero_ficha}`}
                  >
                    {collapseAberto === index
                      ? "Fechar Questões Atribuídas"
                      : "Ver Questões Atribuídas"}
                  </span>
                </div>
              </div>

              <div
                id={`collapse${questao.numero_ficha}`}
                className="accordion-collapse collapse"
                aria-labelledby={`heading${questao.numero_ficha}`}
                data-bs-parent="#accordionQuestoes"
              >
                <div className="row container-questoes pt-4 pb-5 px-4 accordion-body">
                  <div className="col">
                    <Label content={labelQuestoesPrimarias} />
                    <div className="questoes">
                      {renderizarQuestoes(questao.questoes_primarias)}
                    </div>
                  </div>

                  <div className="col">
                    <Label content={labelQuestoesSecundarias} />
                    <div className="questoes">
                      {renderizarQuestoes(questao.questoes_secundarias)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
};

export default Listagem;
