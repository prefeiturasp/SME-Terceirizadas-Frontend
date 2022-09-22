import React, { useEffect, useState } from "react";
import { Spin, Pagination } from "antd";
import "./styles.scss";
import { getVinculosAtivos } from "services/vinculos.service";
import { gerarParametrosConsulta } from "helpers/utilities";
import ListagemVinculos from "./components/ListagemVinculos";
import Filtros from "./components/Filtros";

export default () => {
  const [carregando, setCarregando] = useState(false);
  const [vinculos, setVinculos] = useState([]);
  const [filtros, setFiltros] = useState();
  const [totalVinculos, setTotalVinculos] = useState(0);

  const [page, setPage] = useState(1);

  const buscarVinculos = async page => {
    setCarregando(true);
    let payload = gerarParametrosConsulta({ page, ...filtros });
    let data = await getVinculosAtivos(payload);

    setVinculos(data.results);
    setTotalVinculos(data.count);
    setCarregando(false);
  };

  const nextPage = page => {
    buscarVinculos(page);
    setPage(page);
  };

  useEffect(() => {
    buscarVinculos(1);
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtros]);

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 card-gestao-acesso">
        <div className="card-body gestao-acesso">
          <Filtros setFiltros={setFiltros} />
          {vinculos && (
            <>
              <ListagemVinculos vinculos={vinculos} />
              <div className="row">
                <div className="col">
                  <Pagination
                    current={page}
                    total={totalVinculos}
                    showSizeChanger={false}
                    onChange={nextPage}
                    pageSize={10}
                    className="float-left mb-2"
                  />
                </div>
              </div>
            </>
          )}
          {totalVinculos === 0 && (
            <div className="text-center mt-5">
              Não existem acessos para os critérios de busca utilizados.
            </div>
          )}
        </div>
      </div>
    </Spin>
  );
};
