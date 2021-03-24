import React, { useEffect, useState } from "react";
import { Spin, Pagination } from "antd";
import "./styles.scss";
import Filtros from "./components/Filtros";
import ListagemSolicitacoes from "./components/ListagemSolicitacoes";
import { getListagemSolicitacaoAlteracao } from "../../../../services/logistica.service.js";
import { gerarParametrosConsulta } from "helpers/utilities";

export default () => {
  const [carregando, setCarregando] = useState(false);
  const [solicitacoes, setSolicitacoes] = useState();
  const [filtros, setFiltros] = useState();
  const [total, setTotal] = useState();
  const [page, setPage] = useState();
  const [ativos, setAtivos] = useState([]);

  const buscarSolicitacoes = async page => {
    setCarregando(true);
    const params = gerarParametrosConsulta({ page: page, ...filtros });
    const response = await getListagemSolicitacaoAlteracao(params);
    setAtivos([]);

    const toDate = dateStr => {
      const [day, month, year] = dateStr.split("/");
      return new Date(year, month - 1, day);
    };

    if (response.data.count) {
      let x = response.data.results;
      x.sort((a, b) => {
        const data1 = new Date(toDate(a.data_entrega));
        const data2 = new Date(toDate(b.data_entrega));
        return data2 - data1;
      });
      
      setSolicitacoes(x);
      setTotal(response.data.count);
    } else {
      setTotal(response.data.count);
      setSolicitacoes();
    }
    setCarregando(false);
  };

  useEffect(() => {
    if (filtros) {
      buscarSolicitacoes(1);
      setPage(1);
    }
  }, [filtros]);

  const nextPage = page => {
    buscarSolicitacoes(page);
    setPage(page);
  };

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 card-gestao-solicitacao-alteracao">
        <div className="card-body gestao-solicitacao-alteracao">
          <Filtros
            setFiltros={setFiltros}
            setSolicitacoes={setSolicitacoes}
            solicitacoes={solicitacoes}
          />
          {solicitacoes && (
            <>
              <br />
              <hr />
              <br />
              <ListagemSolicitacoes
                solicitacoes={solicitacoes}
                ativos={ativos}
                setAtivos={setAtivos}
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
