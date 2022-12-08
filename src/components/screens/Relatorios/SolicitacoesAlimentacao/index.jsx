import MeusDadosContext from "context/MeusDadosContext";
import React, { useContext, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { deepCopy } from "helpers/utilities";
import { Filtros } from "./componentes/Filtros";
import { TabelaResultado } from "./componentes/TabelaResultado";
import { Paginacao } from "components/Shareable/Paginacao";
import "./style.scss";
import { STATUS_SOLICITACOES } from "./constants";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";
import ModalSolicitacaoDownload from "components/Shareable/ModalSolicitacaoDownload";
import { toastError } from "components/Shareable/Toast/dialogs";

export const RelatorioSolicitacoesAlimentacao = ({ ...props }) => {
  const { endpoint, endpointGerarExcel } = props;
  const { meusDados } = useContext(MeusDadosContext);

  const [erroAPI, setErroAPI] = useState("");
  const [solicitacoes, setSolicitacoes] = useState(undefined);
  const [totalBusca, setTotalBusca] = useState(undefined);
  const [page, setPage] = useState(1);
  const [filtros, setFiltros] = useState(undefined);
  const [submitting, setSubmitting] = useState(false);
  const [
    exibirModalCentralDownloads,
    setExibirModalCentralDownloads
  ] = useState(false);

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

  const exportarXLSX = async () => {
    setSubmitting(true);
    const response = await endpointGerarExcel(filtros);
    if (response.status === HTTP_STATUS.OK) {
      setExibirModalCentralDownloads(true);
    } else {
      toastError("Erro ao exportar xlsx. Tente novamente mais tarde.");
    }
    setSubmitting(false);
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
          <>
            <Paginacao
              onChange={page => onPageChanged(page, filtros)}
              total={totalBusca}
              pageSize={10}
              current={page}
            />
            <div className="row">
              <div className="col-12 text-right">
                <Botao
                  texto="Baixar Excel"
                  style={BUTTON_STYLE.GREEN_OUTLINE}
                  icon={BUTTON_ICON.FILE_EXCEL}
                  type={BUTTON_TYPE.BUTTON}
                  disabled={submitting}
                  onClick={() => exportarXLSX()}
                />
                {exibirModalCentralDownloads && (
                  <ModalSolicitacaoDownload
                    show={exibirModalCentralDownloads}
                    setShow={setExibirModalCentralDownloads}
                  />
                )}
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
