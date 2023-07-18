import React, { useEffect, useState } from "react";
import { Pagination, Spin } from "antd";
import Filtros from "./components/Filtros";
import ListagemEmbalagens from "./components/ListagemEmbalagens";
import { gerarParametrosConsulta } from "helpers/utilities";
import {
  getEmbalagens,
  getListaNomesEmbalagens,
  getListaAbreviacaoEmbalagens
} from "services/qualidade.service";

export default () => {
  const [carregando, setCarregando] = useState(false);
  const [embalagens, setEmbalagens] = useState();
  const [nomesEmbalagens, setNomesEmbalagens] = useState([]);
  const [abreviacaoEmbalagens, setAbreviacaoEmbalagens] = useState([]);
  const [filtros, setFiltros] = useState();
  const [page, setPage] = useState();
  const [total, setTotal] = useState();

  useEffect(() => {
    buscaDadosAutoComplete();
  }, []);

  useEffect(() => {
    if (filtros) {
      buscarEmbalagens(1);
      setPage(1);
    }
  }, [filtros]);

  const buscaDadosAutoComplete = async () => {
    const respNomes = await getListaNomesEmbalagens();
    const respAbreviacoes = await getListaAbreviacaoEmbalagens();
    setNomesEmbalagens(respNomes.data.results);
    setAbreviacaoEmbalagens(respAbreviacoes.data.results);
  };

  const buscarEmbalagens = async page => {
    setCarregando(true);

    const params = gerarParametrosConsulta({ page: page, ...filtros });
    const response = await getEmbalagens(params);
    if (response.data.count) {
      setEmbalagens(response.data.results);
      setTotal(response.data.count);
    } else {
      setTotal(response.data.count);
      setEmbalagens([]);
    }
    setCarregando(false);
  };

  const nextPage = page => {
    buscarEmbalagens(page);
    setPage(page);
  };

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 card-embalagens">
        <div className="card-body embalagens">
          <Filtros
            setFiltros={setFiltros}
            nomesEmbalagens={nomesEmbalagens}
            abreviacaoEmbalagens={abreviacaoEmbalagens}
            setTotal={setTotal}
            setEmbalagens={setEmbalagens}
          />

          {embalagens && (
            <>
              <hr />
              <ListagemEmbalagens embalagens={embalagens} />
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
              {total === 0 && (
                <div className="text-center mt-5">
                  Nenhum resultado encontrado
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Spin>
  );
};
