import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { QuestoesPorProduto } from "interfaces/recebimento.interface";
import Label from "components/Shareable/Label";
import {
  RECEBIMENTO,
  EDITAR_ATRIBUICAO_QUESTOES_CONFERENCIA,
} from "configs/constants";

import "./styles.scss";

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

  const renderizarAcoes = (questoes: QuestoesPorProduto) => {
    const botaoEditar = (
      <NavLink
        className="float-start"
        to={`/${RECEBIMENTO}/${EDITAR_ATRIBUICAO_QUESTOES_CONFERENCIA}?uuid=${questoes.uuid}`}
      >
        <span className="link-acoes px-2">
          <i title="Editar" className="fas fa-edit green" />
        </span>
      </NavLink>
    );

    return botaoEditar;
  };

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
          <div>Ações</div>
        </div>

        <div className="accordion accordion-flush" id="accordionQuestoes">
          {questoesPorProdutos.map((questoes, index) => (
            <div className="accordion-item" key={questoes.uuid}>
              <div
                className="grid-table body-table accordion-header"
                id={`heading${questoes.uuid}`}
              >
                <div>{questoes.numero_ficha}</div>
                <div>{questoes.nome_produto}</div>
                <div>
                  <span
                    className="botao-expandir-questoes collapsed"
                    onClick={() => toggleQuestoes(index)}
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${questoes.uuid}`}
                    aria-expanded="false"
                    aria-controls={`collapse${questoes.uuid}`}
                  >
                    {questoesAbertas === index
                      ? "Fechar Questões Atribuídas"
                      : "Ver Questões Atribuídas"}
                  </span>
                </div>
                <div>{renderizarAcoes(questoes)}</div>
              </div>

              <div
                id={`collapse${questoes.uuid}`}
                className="accordion-collapse collapse"
                aria-labelledby={`heading${questoes.uuid}`}
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
                      {questoes.questoes_primarias.map((e, index) => (
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
                      {questoes.questoes_secundarias.map((e, index) => (
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
