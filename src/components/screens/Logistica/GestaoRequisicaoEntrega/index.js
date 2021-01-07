import React, { useEffect, useState } from "react";
import { Spin, Pagination } from "antd";
import { getRequisicoesListagem } from "../../../../services/logistica.service.js";
import ListagemSolicitacoes from "./components/ListagemSolicitacoes";
import "./styles.scss";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
  BUTTON_ICON
} from "components/Shareable/Botao/constants";
import Filtros from "./components/Filtros";
import { gerarParametrosConsulta } from "helpers/utilities";
import ConfirmaTodos from "./components/ConfirmarTodos";

export default () => {
  const [carregando, setCarregando] = useState(false);
  const [solicitacoes, setSolicitacoes] = useState();
  const [filtros, setFiltros] = useState();
  const [ativos, setAtivos] = useState([]);
  const [total, setTotal] = useState();
  const [numEnviadas, setNumEnviadas] = useState();
  const [page, setPage] = useState();

  const buscarSolicitacoes = async page => {
    setCarregando(true);
    const params = gerarParametrosConsulta({ page: page, ...filtros });
    const response = await getRequisicoesListagem(params);
    if (response.data.count) {
      setSolicitacoes(response.data.results);
      setTotal(response.data.count);
      setNumEnviadas(response.data.num_enviadas);
    } else {
      setTotal(response.data.count);
      setSolicitacoes();
    }
    setAtivos([]);
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

  const updatePage = () => {
    buscarSolicitacoes(page);
  };

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3">
        <div className="card-body gestao-requisicao-entrega">
          <Filtros
            setFiltros={setFiltros}
            setSolicitacoes={setSolicitacoes}
            setTotal={setTotal}
          />
          {solicitacoes && (
            <>
              <br /> <hr /> <br />
              <ListagemSolicitacoes
                solicitacoes={solicitacoes}
                ativos={ativos}
                setAtivos={setAtivos}
                updatePage={updatePage}
              />
              <div className="row">
                <div className="col">
                  <Pagination
                    current={page}
                    total={total}
                    showSizeChanger={false}
                    onChange={nextPage}
                    pageSize={10}
                    className="float-left"
                  />
                  <Botao
                    texto="Imprimir todos"
                    type={BUTTON_TYPE.BUTTON}
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                    icon={BUTTON_ICON.PRINT}
                    className="float-right"
                  />
                  <Botao
                    texto="Posição Consolidada de Entrega"
                    type={BUTTON_TYPE.BUTTON}
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                    icon={BUTTON_ICON.EYE}
                    className="float-right ml-2 mr-2"
                  />
                  <ConfirmaTodos
                    updatePage={updatePage}
                    numEnviadas={numEnviadas}
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
