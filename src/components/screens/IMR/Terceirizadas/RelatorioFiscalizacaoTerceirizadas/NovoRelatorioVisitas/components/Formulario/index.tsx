import React from "react";

export const Formulario = () => {
  return (
    <div className="formulario">
      <div className="row mt-3 mb-3">
        <div className="col-12 text-center">
          <h2>
            ITENS AVALIADOS NA VISITA E DE RESPONSABILIDADE DA EMPRESA
            PRESTADORA DE SERVIÇO
          </h2>
          <div className="subtitle">
            Caso a prestação de serviços tenha apresentado ocorrências sinalize
            nos itens correspondentes abaixo
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <table>
            <tr className="row categoria">
              <th className="col-12" colSpan={3}>
                FUNCIONÁRIOS
              </th>
            </tr>
            <tr className="row tipo-ocorrencia">
              <td className="col-1 fw-bold text-center">1</td>
              <td className="col-9">
                UNIFORME DOS MANIPULADORES: Funcionários utilizavam uniforme
                completo? Se NÃO, detalhar qual item do uniforme faltou, o que
                estava utilizando em substituição aos itens previstos e nome
                completo do(s) funcionário(s). Penalidade: 10.7.41 Obrigação:
                Anexo I, itens 1.9.4 e 3.1.c; Anexo V, itens 5 e 7
              </td>
              <td className="col-2">Sim</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};
