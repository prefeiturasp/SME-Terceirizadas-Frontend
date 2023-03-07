import React, { useEffect, useState } from "react";
import { Spin, Pagination } from "antd";
import { gerarParametrosConsulta } from "helpers/utilities";
import { getListagemSolicitacaoAlteracaoCronograma } from "../../../../services/cronograma.service.js";
import Filtros from "./components/Filtros/index.jsx";
import ListagemAlteracoesCronogramas from "./components/ListagemAlteracoesCronogramas/index.jsx";
import { remove_filtros_nulos } from "./helper.js";

export default () => {
  const [carregando, setCarregando] = useState(false);
  const [alteracoesCronogramas, setAlteracoesCronogramas] = useState();
  const [filtros, setFiltros] = useState();
  const [total, setTotal] = useState();
  const [page, setPage] = useState();
  const [buscaPorParametro, setBuscaPorParametro] = useState(false);

  const buscarSolicitacoesCronograma = async page => {
    setCarregando(true);
    setFiltros(remove_filtros_nulos(filtros));
    const params = gerarParametrosConsulta({ page: page, ...filtros });
    const response = await getListagemSolicitacaoAlteracaoCronograma(params);
    if (response.data.count) {
      setAlteracoesCronogramas(response.data.results);
      setTotal(response.data.count);
    } else {
      setTotal(response.data.count);
      setAlteracoesCronogramas();
    }
    setCarregando(false);
    if (response.data.count === 1 && buscaPorParametro) {
      setBuscaPorParametro(false);
    }
  };

  useEffect(() => {
    if (filtros) {
      buscarSolicitacoesCronograma(1);
      setPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtros]);

  const nextPage = page => {
    buscarSolicitacoesCronograma(page);
    setPage(page);
  };

  const updatePage = () => {
    buscarSolicitacoesCronograma(page);
  };

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 card-cronograma-entrega">
        <div className="card-body cronograma-entrega">
          <Filtros
            setFiltros={setFiltros}
            setAlteracoesCronogramas={setAlteracoesCronogramas}
            setTotal={setTotal}
            alteracoesCronogramas={alteracoesCronogramas}
            page={page}
          />
          {alteracoesCronogramas && (
            <>
              <ListagemAlteracoesCronogramas
                alteracoesCronogramas={alteracoesCronogramas}
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
            <div className="text-center mt-5 pt-5">
              Não existe informação para os critérios de busca utilizados.
            </div>
          )}
        </div>
      </div>
    </Spin>
  );
};
