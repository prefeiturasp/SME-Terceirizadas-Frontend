import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import HTTP_STATUS from "http-status-codes";
import { toastError } from "components/Shareable/Toast/dialogs";
import {
  consultaTiposAlimento,
  getNomesTiposAlimento,
} from "services/tipoAlimento.service";
import Filtros from "./componentes/Filtros";
import Tabela from "./componentes/Tabela";
import "./style.scss";
import { Paginacao } from "components/Shareable/Paginacao";

export default () => {
  const initialValues = { page: 1 };
  const [carregando, setCarregando] = useState(true);
  const [resultado, setResultado] = useState(undefined);
  const [nomes, setNomes] = useState(undefined);
  const [total, setTotal] = useState(0);
  const [filtros, setFiltros] = useState(initialValues);
  const [page, setPage] = useState(1);

  async function fetchData() {
    const respItems = await consultaTiposAlimento(initialValues);
    setResultado(respItems.data.results);
    setTotal(respItems.data.count);
    const respNomes = await getNomesTiposAlimento();
    setNomes(respNomes.data.results);
    setCarregando(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const changePage = async (page) => {
    try {
      setCarregando(true);
      let payload = filtros;
      payload["page"] = page;
      const response = await consultaTiposAlimento(payload);
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
          setCarregando={setCarregando}
          nomes={nomes}
          setTotal={setTotal}
          setFiltros={setFiltros}
          setPage={setPage}
          changePage={() => changePage(page)}
          initialValues={initialValues}
        />
        {resultado && (
          <>
            <Tabela resultado={resultado} changePage={() => changePage(page)} />
            <Paginacao
              className="mt-3 mb-3"
              current={page || 1}
              total={total}
              showSizeChanger={false}
              onChange={(page) => {
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
