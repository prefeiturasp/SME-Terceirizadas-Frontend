import MeusDadosContext from "context/MeusDadosContext";
import React, { useContext, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { deepCopy } from "helpers/utilities";
import { Filtros } from "./componentes/Filtros";
import { TabelaResultado } from "./componentes/TabelaResultado";
import { Paginacao } from "components/Shareable/Paginacao";
import "./style.scss";
import { STATUS_SOLICITACOES } from "./constants";

export const RelatorioSolicitacoesAlimentacao = ({ ...props }) => {
  const { endpoint } = props;
  const { meusDados } = useContext(MeusDadosContext);

  const [erroAPI, setErroAPI] = useState("");
  const [solicitacoes, setSolicitacoes] = useState(undefined);
  const [totalBusca, setTotalBusca] = useState(undefined);
  const [page, setPage] = useState(1);
  const [filtros, setFiltros] = useState(undefined);

  const onPageChanged = async (page, values) => {
    let _values = deepCopy(values);
    _values["limit"] = 10;
    _values["offset"] = (page - 1) * _values["limit"];
    setPage(page);

    const response = await endpoint(_values);
    if (response.status === HTTP_STATUS.OK) {
      setSolicitacoes(response.data.results);
      setTotalBusca(response.data.count);
    }
  };

  return (
    <div className="card relatorio-solicitacoes-alimentacao mt-3">
      <div className="card-body">
        {erroAPI && <div>{erroAPI}</div>}
        {meusDados && (
          <Filtros
            erroAPI={erroAPI}
            setErroAPI={setErroAPI}
            meusDados={meusDados}
            setSolicitacoes={setSolicitacoes}
            setTotalBusca={setTotalBusca}
            setPage={setPage}
            setFiltros={setFiltros}
            endpoint={endpoint}
          />
        )}
        {totalBusca !== undefined && filtros !== undefined && (
          <div className="row">
            <div className="col-12 mt-3">
              <p className="quantitativo">
                QUANTITATIVO GERAL DE SOLICITAÇÕES{" "}
                {STATUS_SOLICITACOES.find(
                  obj => obj.uuid === filtros.status
                ).nome.toUpperCase()}
              </p>
            </div>
            <div className="col-12 mt-1">
              <p className="totalHomologadosValor">
                Total de solicitações: <b>{totalBusca}</b>
              </p>
            </div>
          </div>
        )}
        {solicitacoes && filtros && (
          <TabelaResultado solicitacoes={solicitacoes} filtros={filtros} />
        )}
        {solicitacoes && solicitacoes.length && filtros ? (
          <Paginacao
            onChange={page => onPageChanged(page, filtros)}
            total={totalBusca}
            pageSize={10}
            current={page}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
