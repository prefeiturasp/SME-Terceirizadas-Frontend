import React from "react";
import "../../../../Shareable/style.scss";
import { comoTipo, ehInclusaoContinua } from "helpers/utilities";

export const Rascunhos = ({
  rascunhosInclusaoDeAlimentacao,
  removerRascunho,
  form,
  carregarRascunho,
  values
}) => {
  return (
    <div>
      {rascunhosInclusaoDeAlimentacao.map((inclusaoDeAlimentacao, key) => {
        const { id_externo, uuid } = inclusaoDeAlimentacao;
        let backgroundColor = "#DADADA";
        return (
          <div key={key} className="draft bg-white border rounded mt-1 p-2">
            <div className="mt-2">
              <label className="bold ml-3">
                {`Inclusão de Alimentação # ${id_externo}`}
              </label>
              <span
                className="ml-3 p-1 border rounded"
                style={{ background: backgroundColor }}
              >
                {inclusaoDeAlimentacao.status}
              </span>
            </div>
            <div className="icon-draft-card float-right">
              Criado em: {inclusaoDeAlimentacao.criado_em}
              <span
                onClick={() =>
                  removerRascunho(
                    id_externo,
                    uuid,
                    comoTipo(inclusaoDeAlimentacao),
                    form
                  )
                }
              >
                <i className="fas fa-trash" />
              </span>
              <span
                onClick={() =>
                  carregarRascunho(form, values, inclusaoDeAlimentacao)
                }
              >
                <i className="fas fa-edit" />
              </span>
            </div>
            <div className="ml-3">
              <p>
                {ehInclusaoContinua(inclusaoDeAlimentacao)
                  ? `${inclusaoDeAlimentacao.motivo.nome} -
                    (${inclusaoDeAlimentacao.data_inicial} - ${
                      inclusaoDeAlimentacao.data_final
                    })`
                  : `${
                      inclusaoDeAlimentacao.inclusoes
                        ? inclusaoDeAlimentacao.inclusoes.length
                        : 0
                    } dia(s)`}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
