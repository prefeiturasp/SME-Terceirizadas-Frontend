import React, { useEffect, useState } from "react";
import { Spin, Pagination } from "antd";
import "./styles.scss";
import { gerarParametrosConsulta } from "helpers/utilities";
import ListagemPlanilhas from "./components/ListagemPlanilhas";
import Filtros from "./components/Filtros";
import {
  getPlanilhasNaoServidor,
  getPlanilhasServidor
} from "services/cargaUsuario.service";
import { OPTIONS_STATUS } from "./constants";

export default () => {
  const [carregando, setCarregando] = useState(false);
  const [planilhas, setPlanilhas] = useState([]);
  const [filtros, setFiltros] = useState();
  const [totalPlanilhas, setTotalPlanilhas] = useState(0);
  const [page, setPage] = useState(1);

  const buscarVinculos = async page => {
    setCarregando(true);
    let payload = gerarParametrosConsulta({ page, ...filtros });
    let data;
    if (filtros.modelo === "SERVIDOR") {
      data = await getPlanilhasServidor(payload);
    } else if (filtros.modelo === "NAO_SERVIDOR") {
      data = await getPlanilhasNaoServidor(payload);
    }

    setPlanilhas(data.results);
    setTotalPlanilhas(data.count);
    setCarregando(false);
  };

  const nextPage = page => {
    buscarVinculos(page);
    setPage(page);
  };

  useEffect(() => {
    if (filtros) {
      buscarVinculos(1);
      setPage(1);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtros]);

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 card-cargas-usuarios">
        <div className="card-body cargas-usuarios">
          <Filtros
            setFiltros={setFiltros}
            setPlanilhas={setPlanilhas}
            optionsStatus={OPTIONS_STATUS}
          />
          {planilhas && planilhas.length > 0 && (
            <>
              <hr className="mt-4" />
              <ListagemPlanilhas planilhas={planilhas} filtros={filtros} />
              <div className="row">
                <div className="col">
                  <Pagination
                    current={page}
                    total={totalPlanilhas}
                    showSizeChanger={false}
                    onChange={nextPage}
                    pageSize={10}
                    className="float-left mb-2"
                  />
                </div>
              </div>
              {totalPlanilhas === 0 && (
                <div className="text-center mt-5">
                  Não existem acessos para os critérios de busca utilizados.
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Spin>
  );
};
