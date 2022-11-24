import MeusDadosContext from "context/MeusDadosContext";
import React, { useContext, useState } from "react";
import { Filtros } from "./componentes/Filtros";
import "./style.scss";

export const RelatorioSolicitacoesAlimentacao = () => {
  const { meusDados } = useContext(MeusDadosContext);

  const [erroAPI, setErroAPI] = useState("");

  return (
    <div className="card relatorio-solicitacoes-alimentacao mt-3">
      <div className="card-body">
        {erroAPI && <div>{erroAPI}</div>}
        {meusDados && (
          <Filtros
            erroAPI={erroAPI}
            setErroAPI={setErroAPI}
            meusDados={meusDados}
          />
        )}
      </div>
    </div>
  );
};
