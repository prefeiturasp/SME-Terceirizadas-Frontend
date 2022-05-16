import React, { useState } from "react";
import { Spin } from "antd";
import "./styles.scss";
import Filtros from "./components/Filtros";

const RelatorioDietaEspecial = () => {
  const [carregando, setCarregando] = useState(false);

  return (
    <>
      <div className="sub-titulo">Filtrar dietas</div>
      <Spin tip="Carregando..." spinning={carregando}>
        <div className="card mt-3">
          <div className="card-body">
            <Filtros setCarregando={setCarregando} />
          </div>
        </div>
      </Spin>
    </>
  );
};

export default RelatorioDietaEspecial;
