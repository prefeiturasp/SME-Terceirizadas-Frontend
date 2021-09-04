import React, { useEffect, useState } from "react";
import { Spin, Pagination } from "antd";
import HTTP_STATUS from "http-status-codes";
import { toastError } from "components/Shareable/Toast/dialogs";
import {
  getNomesItems,
  getTiposItems,
  consultaItems
} from "services/produto.service";
import Filtros from "./componentes/Filtros";
import Tabela from "./componentes/Tabela";
import "./style.scss";

export default () => {
  const [carregando, setCarregando] = useState(true);
  const [resultado, setResultado] = useState(undefined);
  const [nomes, setNomes] = useState(undefined);
  const [tipos, setTipos] = useState(undefined);
  const [total, setTotal] = useState(0);
  const [filtros, setFiltros] = useState({});
  const [page, setPage] = useState(1);

  async function fetchData() {
    const respNomes = await getNomesItems();
    const respTipos = await getTiposItems();
    const respItems = await consultaItems({});
    setNomes(respNomes.data.results);
    setTipos(respTipos.data);
    setResultado(respItems.data.results);
    setTotal(respItems.data.count);
    setCarregando(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const changePage = async page => {
    try {
      setCarregando(true);
      let payload = filtros;
      payload["page"] = page;
      const response = await consultaItems(payload);
      if (response.status === HTTP_STATUS.OK) {
        setResultado(response.data.results);
        setTotal(response.data.count);
      }
    } catch (e) {
      toastError("Houve um erro ao tentar trocar página");
    }
    setCarregando(false);
  };

  return (
    <div className="card mt-3 card-cadastro-geral pl-3 pr-3">
      <Spin tip="Carregando..." spinning={carregando}>
        <Filtros
          setResultado={setResultado}
          nomes={nomes}
          tipos={tipos}
          setCarregando={setCarregando}
          setTotal={setTotal}
          setFiltros={setFiltros}
          setPage={setPage}
          changePage={() => changePage(page)}
        />
        {resultado && (
          <>
            <div className="row">
              <div className="col-12">
                <p>
                  <b>Itens Cadastrados</b>
                </p>
              </div>
            </div>
            <Tabela resultado={resultado} changePage={() => changePage(page)} />
            <Pagination
              className="mt-3 mb-3"
              current={page || 1}
              total={total}
              showSizeChanger={false}
              onChange={page => {
                setPage(page);
                changePage(page);
              }}
              pageSize={10}
            />
          </>
        )}
      </Spin>
    </div>
  );
};
