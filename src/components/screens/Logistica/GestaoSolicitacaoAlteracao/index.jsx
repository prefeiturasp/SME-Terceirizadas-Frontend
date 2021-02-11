import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { getListagemSolicitacaoAlteracao } from "../../../../services/logistica.service.js";
import "./styles.scss";
import Filtros from "./components/Filtros";
import { gerarParametrosConsulta } from "helpers/utilities";

export default () => {
  const [carregando, setCarregando] = useState(false);
  const [solicitacoes, setSolicitacoes] = useState();
  const [filtros, setFiltros] = useState();
  const [total, setTotal] = useState();
  const [page, setPage] = useState();

  const buscarSolicitacoes = async page => {
    setCarregando(true);
    const params = gerarParametrosConsulta({ page: page, ...filtros });
    const response = await getListagemSolicitacaoAlteracao(params);
    if (response.data.count) {
      setSolicitacoes(response.data.results);
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

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 card-gestao-solicitacao-alteracao">
        <div className="card-body gestao-solicitacao-alteracao">
          <Filtros
            setFiltros={setFiltros}
            setSolicitacoes={setSolicitacoes}
            setTotal={setTotal}
            solicitacoes={solicitacoes}
            page={page}
          />
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
