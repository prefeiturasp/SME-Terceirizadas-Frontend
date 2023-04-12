import React, { useEffect, useState } from "react";
import { Spin, Pagination } from "antd";
import { getNomesProtocolos } from "services/dietaEspecial.service";
import Filtros from "./componentes/Filtros";
import Tabela from "./componentes/Tabela";
import { consultaProtocoloPadrao } from "services/dietaEspecial.service";
import HTTP_STATUS from "http-status-codes";
import { toastError } from "components/Shareable/Toast/dialogs";
import "./style.scss";
import { getNumerosEditais } from "services/edital.service";

export default () => {
  const [carregando, setCarregando] = useState(true);
  const [resultado, setResultado] = useState(undefined);
  const [nomes, setNomes] = useState(undefined);
  const [status, setStatus] = useState(undefined);
  const [total, setTotal] = useState(0);
  const [filtros, setFiltros] = useState({});
  const [editais, setEditais] = useState(undefined);
  const [erroAPI, setErroAPI] = useState(false);
  const [page, setPage] = useState(0);

  const getEditaisAsync = async () => {
    const response = await getNumerosEditais();
    if (response.status === HTTP_STATUS.OK) {
      setEditais(response.data.results);
    } else {
      setErroAPI(true);
    }
  };

  async function fetchData() {
    const respNomes = await getNomesProtocolos();
    const respProtocolo = await consultaProtocoloPadrao({});
    setNomes(respNomes.data.results);
    setStatus(["Liberado", "Não liberado"]);
    setResultado(respProtocolo.data);
    setTotal(respProtocolo.data.count);
    getEditaisAsync();
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
      }
    } catch (e) {
      toastError("Houve um erro ao tentar trocar página");
    }
    setCarregando(false);
  };

  return (
    <div className="card mt-3 card-cadastro-protocolo-padrao pl-3 pr-3">
      {erroAPI && (
        <div>Erro ao carregar dados. Tente novamente mais tarde.</div>
      )}
      <Spin tip="Carregando..." spinning={(carregando || !editais) && !erroAPI}>
        {editais && (
          <Filtros
            setResultado={setResultado}
            nomes={nomes}
            status={status}
            setCarregando={setCarregando}
            setTotal={setTotal}
            setFiltros={setFiltros}
            setPage={setPage}
            editais={editais}
          />
        )}
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
