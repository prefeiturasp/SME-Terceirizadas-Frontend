import React, { useEffect, useState } from "react";
import { Spin, Pagination } from "antd";
import { getKitsLanche } from "../../../../services/kitLanche/shared.service";
import ListagemKits from "./components/ListagemKits";
import Filtros from "./components/Filtros";
import "./style.scss";
import { gerarParametrosConsulta } from "helpers/utilities";

export default () => {
  const [carregando, setCarregando] = useState(false);
  const [kits, setKits] = useState();
  const [filtros, setFiltros] = useState();
  const [ativos, setAtivos] = useState([]);
  const [total, setTotal] = useState();
  const [page, setPage] = useState();

  const buscarKits = async page => {
    setCarregando(true);
    const params = gerarParametrosConsulta({ page: page, ...filtros });
    const response = await getKitsLanche(params);
    if (response.data.count) {
      setKits(response.data.results);
      setTotal(response.data.count);
    } else {
      setTotal(response.data.count);
      setKits();
    }
    setAtivos([]);
    setCarregando(false);
  };

  useEffect(() => {
    if (filtros) {
      buscarKits(1);
      setPage(1);
    }
  }, [filtros]);

  const nextPage = page => {
    buscarKits(page);
    setPage(page);
  };

  const updatePage = () => {
    buscarKits(page);
  };

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 card-consulta-kits">
        <div className="card-body consulta-kits">
          <Filtros setFiltros={setFiltros} setKits={setKits} />
          {kits && (
            <>
              <br /> <hr /> <br />
              <ListagemKits
                kits={kits}
                ativos={ativos}
                setAtivos={setAtivos}
                updatePage={updatePage}
              />
              <div className="row">
                <div className="col">
                  <Pagination
                    current={page}
                    total={total}
                    showSizeChanger={false}
                    onChange={nextPage}
                    pageSize={10}
                    className="float-left mb-2"
                  />
                </div>
              </div>
            </>
          )}
          {total === 0 && (
            <div className="text-center mt-5">
              Não existe informação para os critérios de busca utilizados.
            </div>
          )}
        </div>
      </div>
    </Spin>
  );
};
