import { Spin } from "antd";
import React, { useState, useEffect } from "react";

import { gerarParametrosConsulta } from "helpers/utilities";
import { getSolicitacaoDietaEspecialListagem } from "services/dietaEspecial.service";
import FormFiltros from "./components/FormFiltros";
import ModalRelatorioDietaEspecial from "./components/ModalRelatorioDietaEspecial";

const RelatorioDietaEspecial = () => {
  const [carregando, setCarregando] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResultados, setTotalResultados] = useState(0);
  const [exibirModal, setExibirModal] = useState(null);
  const [dadosRelatorio, setDadosRelatorio] = useState();
  const [filtros, setFiltros] = useState();

  useEffect(() => {
    if (!filtros) return;
    async function fetchData() {
      setCarregando(true);
      setDadosRelatorio(null);
      const params = gerarParametrosConsulta({
        ...filtros,
        page: page
      });
      const response = await getSolicitacaoDietaEspecialListagem(filtros, {
        ...params,
        escola: null
      });
      setDadosRelatorio(response.data.results);
      setTotalResultados(response.data.count);
      if (response.data.count > 0) setExibirModal(true);
      setCarregando(false);
    }
    fetchData();
  }, [filtros]);

  const getTodosStatus = () => {
    return ["CODAE_AUTORIZADO", "CODAE_NEGOU_PEDIDO", "CODAE_A_AUTORIZAR"];
  };

  const onSubmit = values => {
    setPage(1);
    let filtros = { ...values };
    if (!filtros.status) filtros.status = getTodosStatus();
    setFiltros(filtros);
  };

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card card-relatorio-reclamacao mt-3">
        <div className="card-body ">
          <FormFiltros
            onSubmit={onSubmit}
            carregando={carregando}
            setCarregando={setCarregando}
          />
          {dadosRelatorio && !dadosRelatorio.length && (
            <div className="text-center mt-5">
              Não foi encontrado dieta especial para filtragem realizada
            </div>
          )}
          {dadosRelatorio && (
            <ModalRelatorioDietaEspecial
              showModal={exibirModal}
              closeModal={() => setExibirModal(null)}
              dadosRelatorio={dadosRelatorio}
              setDadosRelatorio={setDadosRelatorio}
              filtros={filtros}
              totalResultados={totalResultados}
            />
          )}
        </div>
      </div>
    </Spin>
  );
};

export default RelatorioDietaEspecial;
