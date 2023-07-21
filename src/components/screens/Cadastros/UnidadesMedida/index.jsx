import React, { useEffect, useState } from "react";
import { Pagination, Spin } from "antd";
import Filtros from "./components/Filtros";
import ListagemUnidadesMedida from "./components/ListagemUnidadesMedida";
import { gerarParametrosConsulta } from "helpers/utilities";
import {
  getUnidadesMedida,
  getNomesEAbreviacoesUnidadesMedida
} from "services/logistica.service";

export default () => {
  const [carregando, setCarregando] = useState(false);
  const [unidadesMedida, setUnidadesMedida] = useState();
  const [nomesUnidadesMedida, setNomesUnidadesMedida] = useState([]);
  const [abreviacoesUnidadesMedida, setAbreviacoesUnidadesMedida] = useState(
    []
  );
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
    const nomesEAbreviacoes = await getNomesEAbreviacoesUnidadesMedida();
    const nomes = nomesEAbreviacoes.data.results.map(e => e.nome);
    const abreviacoes = nomesEAbreviacoes.data.results.map(e => e.abreviacao);
    setNomesUnidadesMedida(nomes);
    setAbreviacoesUnidadesMedida(abreviacoes);
  };

  const buscarEmbalagens = async pageNumber => {
    setCarregando(true);

    const params = gerarParametrosConsulta({ page: pageNumber, ...filtros });
    const response = await getUnidadesMedida(params);

    response.data.count
      ? setUnidadesMedida(response.data.results)
      : setUnidadesMedida([]);

    setTotal(response.data.count);

    setCarregando(false);
  };

  const nextPage = page => {
    buscarEmbalagens(page);
    setPage(page);
  };

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3">
        <div className="card-body">
          <Filtros
            setFiltros={setFiltros}
            nomesUnidadesMedida={nomesUnidadesMedida}
            abreviacoesUnidadesMedida={abreviacoesUnidadesMedida}
            setTotal={setTotal}
            setUnidadesMedida={setUnidadesMedida}
          />

          {unidadesMedida && (
            <>
              <ListagemUnidadesMedida unidadesMedida={unidadesMedida} />
              <div className="row">
                <div className="col">
                  <Pagination
                    current={page}
                    total={total}
                    showSizeChanger={false}
                    onChange={nextPage}
                    pageSize={10}
                    className="mb-2"
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
