import React, { useEffect, useState } from "react";
import { Spin } from "antd";

export default () => {
  const [carregando, setCarregando] = useState(true);

  async function fetchData() {
    setCarregando(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="card mt-3 card-cadastro-geral pl-3 pr-3">
      <Spin tip="Carregando..." spinning={carregando} />
    </div>
  );
};
