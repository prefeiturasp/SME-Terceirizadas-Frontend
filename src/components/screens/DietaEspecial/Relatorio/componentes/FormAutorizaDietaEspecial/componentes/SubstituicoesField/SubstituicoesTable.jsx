import React from "react";

const SubstituicoesTable = substituicoes => {
  return (
    <div className="row">
      <div className="col-md-12">
        <p className="mt-3 label">Lista de Substituições</p>
        <table className="table table-bordered table-alimentacao">
          <thead>
            <tr className="table-head-alimentacao">
              <th>Alimento</th>
              <th>Tipo</th>
              <th>Isenções/Substituições</th>
            </tr>
          </thead>
          <tbody>
            {substituicoes.substituicoes.map(
              (substituicao, idxSubstituição) => {
                return (
                  <tr key={idxSubstituição} className="table-body-alimentacao">
                    <td>{substituicao.alimento.nome}</td>
                    <td>
                      {substituicao.tipo === "I" ? "Isento" : "Substituir"}
                    </td>
                    <td>
                      <ul>
                        {substituicao.alimentos_substitutos.map(
                          (alimento, idxAlimento) => {
                            return <li key={idxAlimento}>{alimento.nome}</li>;
                          }
                        )}
                        {substituicao.substitutos.map(
                          (alimento, idxAlimento) => {
                            return <li key={idxAlimento}>{alimento.nome}</li>;
                          }
                        )}
                      </ul>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubstituicoesTable;
