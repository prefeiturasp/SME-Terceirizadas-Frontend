import React from "react";

import { RelatorioVisitaItemListagem } from "interfaces/imr.interface";

import "./styles.scss";

interface Props {
  objetos: RelatorioVisitaItemListagem[];
}

export const Listagem: React.FC<Props> = ({ objetos }) => {
  return (
    <div className="listagem-relatorios-visita">
      <div className="titulo-verde mt-5 mb-3">
        Relatórios das Visitas as Unidades Cadastrados
      </div>

      <article>
        <div className="grid-table header-table">
          <div>Diretoria Regional</div>
          <div>Unidade Educacional</div>
          <div>Data da Visita</div>
          <div>Status</div>
          <div>Ações</div>
        </div>

        {objetos.map((objeto) => {
          return (
            <>
              <div key={objeto.uuid} className="grid-table body-table">
                <div>{objeto.diretoria_regional}</div>
                <div>{objeto.unidade_educacional}</div>
                <div>{objeto.data}</div>
                <div>{objeto.status}</div>
                <div></div>
              </div>
            </>
          );
        })}
      </article>
    </div>
  );
};
