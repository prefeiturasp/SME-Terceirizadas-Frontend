import React, { useEffect, useState } from "react";
import { Spin, Pagination } from "antd";
import { getRequisicoesListagem } from "../../../../services/logistica.service.js";
import ListagemSolicitacoes from "./components/ListagemSolicitacoes";
import "./styles.scss";
import Filtros from "./components/Filtros";
import { gerarParametrosConsulta } from "helpers/utilities";

export default () => {
  const [carregando, setCarregando] = useState(false);
  const [solicitacoes, setSolicitacoes] = useState();
  const [ativos, setAtivos] = useState([]);
  const [filtros, setFiltros] = useState();
  const [total, setTotal] = useState();
  const [page, setPage] = useState();

  const buscarSolicitacoes = async page => {
    setCarregando(true);
    const params = gerarParametrosConsulta({ page: page, ...filtros });
    const response = await getRequisicoesListagem(params);
    if (response.data.count) {
      setSolicitacoes(response.data.results);
      setTotal(response.data.count);
    } else {
      setSolicitacoes(null);
      setTotal(response.data.count);
    }
    setAtivos([]);
    setCarregando(false);
  };

  useEffect(() => {
    if (filtros) {
      buscarSolicitacoes(1);
    }
  }, [filtros]);

  const nextPage = page => {
    buscarSolicitacoes(page);
    setPage(page);
  };

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 card-consulta-requisicao-entrega">
        <div className="card-body gestao-requisicao-entrega">
          <Filtros setFiltros={setFiltros} setSolicitacoes={setSolicitacoes} />

          {solicitacoes && (
            <>
              <br /> <hr /> <br />
              <ListagemSolicitacoes
                solicitacoes={solicitacoes}
                ativos={ativos}
                setAtivos={setAtivos}
              />
              <div className="row">
                <div className="col">
                  <Pagination
                    current={page || 1}
                    total={total}
                    showSizeChanger={false}
                    onChange={nextPage}
                    pageSize={10}
                    className="float-left"
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
