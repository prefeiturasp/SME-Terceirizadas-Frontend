import React, { useEffect, useState } from "react";
import { Spin, Pagination } from "antd";
import {
  getNomesProtocolos,
  getStatusProtocolos
} from "services/dietaEspecial.service";
import Filtros from "./componentes/Filtros";
import Tabela from "./componentes/Tabela";
import { consultaProtocoloPadrao } from "services/dietaEspecial.service";
import HTTP_STATUS from "http-status-codes";
import { toastError } from "components/Shareable/Toast/dialogs";
import "./style.scss";

export default () => {
  const [carregando, setCarregando] = useState(true);
  const [resultado, setResultado] = useState(undefined);
  const [nomes, setNomes] = useState(undefined);
  const [status, setStatus] = useState(undefined);
  const [total, setTotal] = useState(0);
  const [filtros, setFiltros] = useState({});
  const [page, setPage] = useState(0);

  async function fetchData() {
    const respNomes = await getNomesProtocolos();
    const respStatus = await getStatusProtocolos();
    setNomes(respNomes.data.results);
    setStatus(respStatus.data.results);
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
      const response = await consultaProtocoloPadrao(payload);
      if (response.status === HTTP_STATUS.OK) {
        setResultado(response.data);
        setTotal(response.data.count);
        setCarregando(false);
      }
    } catch (e) {
      toastError("Houve um erro ao tentar trocar página");
    }
  };

  return (
    <div className="card mt-3 card-cadastro-protocolo-padrao pl-3 pr-3">
      <Spin tip="Carregando..." spinning={carregando}>
        <Filtros
          setResultado={setResultado}
          nomes={nomes}
          status={status}
          setCarregando={setCarregando}
          setTotal={setTotal}
          setFiltros={setFiltros}
          setPage={setPage}
        />
        {resultado && (
          <>
            <Tabela resultado={resultado} />
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
