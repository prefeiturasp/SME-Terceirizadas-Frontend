import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import "./styles.scss";
import Filtros from "./components/Filtros";

export default () => {
  const [carregando, setCarregando] = useState(false);
  const [solicitacoes, setSolicitacoes] = useState();
  const [filtros, setFiltros] = useState();

  useEffect(() => {
    setCarregando(false);
  }, [filtros]);

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 card-gestao-solicitacao-alteracao">
        <div className="card-body gestao-solicitacao-alteracao">
          <Filtros
            setFiltros={setFiltros}
            setSolicitacoes={setSolicitacoes}
            solicitacoes={solicitacoes}
          />
        </div>
      </div>
    </Spin>
  );
};
