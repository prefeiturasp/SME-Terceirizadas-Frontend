import React, { useState } from "react";
import { Spin } from "antd";
import "./styles.scss";
import ListagemDietas from "./components/ListagemDietas";
import Filtros from "./components/Filtros";

const RelatorioDietaEspecial = () => {
  const [carregando, setCarregando] = useState(false);
  const [dietasFiltradas, setDietasFiltradas] = useState([]);
  const [statusSelecionado, setStatusSelecionado] = useState(false);
  const [filtragemRealizada, setFiltragemRealizada] = useState(false);

  return (
    <>
      <div className="sub-titulo">Filtrar dietas</div>
      <Spin tip="Carregando..." spinning={carregando}>
        <div className="card mt-3">
          <div className="card-body">
            <Filtros
              setCarregando={setCarregando}
              setDietasFiltradas={setDietasFiltradas}
              setStatusSelecionado={setStatusSelecionado}
              setFiltragemRealizada={setFiltragemRealizada}
            />
            {dietasFiltradas.length ? (
              <ListagemDietas dietasFiltradas={dietasFiltradas} />
            ) : null}
            {!dietasFiltradas.length && !statusSelecionado ? (
              <div className="text-center mt-5">Selecione um Status</div>
            ) : null}
            {!dietasFiltradas.length && filtragemRealizada ? (
              <div className="text-center mt-5">
                Não existem dietas para os filtros selecionados
              </div>
            ) : null}
          </div>
        </div>
      </Spin>
    </>
  );
};

export default RelatorioDietaEspecial;
