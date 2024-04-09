import React, { useEffect, useState } from "react";

import { QuestoesPorProduto } from "interfaces/recebimento.interface";

import "./styles.scss";
import Label from "components/Shareable/Label";

interface ListagemProps {
  questoesPorProdutos: QuestoesPorProduto[];
}

const Listagem = ({ questoesPorProdutos }: ListagemProps) => {
  const [questoesAbertas, setQuestoesAbertas] = useState(-1);

  const toggleQuestoes = (index: number) =>
    questoesAbertas === index
      ? setQuestoesAbertas(-1)
      : setQuestoesAbertas(index);

  useEffect(() => {
    setQuestoesAbertas(-1);
  }, [questoesPorProdutos]);

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

        <div className="accordion accordion-flush" id="accordionQuestoes">
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
                    onClick={() => toggleQuestoes(index)}
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${questao.numero_ficha}`}
                    aria-expanded="false"
                    aria-controls={`collapse${questao.numero_ficha}`}
                  >
                    {questoesAbertas === index
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
                    <Label
                      content={
                        <span>
                          Questões Atribuídas a{" "}
                          <span className="bold-verde">Embalagem Primária</span>
                        </span>
                      }
                    />
                    <div className="questoes">
                      {questao.questoes_primarias.map((e, index) => (
                        <div className="p-1" key={index}>
                          {e}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col">
                    <Label
                      content={
                        <span>
                          Questões Atribuídas a{" "}
                          <span className="bold-verde">
                            Embalagem Secundária
                          </span>
                        </span>
                      }
                    />
                    <div className="questoes">
                      {questao.questoes_secundarias.map((e, index) => (
                        <div className="p-1" key={index}>
                          {e}
                        </div>
                      ))}
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
