import React, { useEffect, useState } from "react";
import { Spin, Pagination } from "antd";
import { getRequisicoesDistribuidor } from "../../../../services/logistica.service.js";
import ListagemSolicitacoes from "./components/ListagemSolicitacoes";
import "./styles.scss";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
  BUTTON_ICON
} from "components/Shareable/Botao/constants";

export default () => {
  const [carregando, setCarregando] = useState(false);
  const [solicitacoes, setSolicitacoes] = useState();
  const [ativos, setAtivos] = useState([]);
  const [total, setTotal] = useState();
  const [page, setPage] = useState();

  const buscarSolicitacoes = async page => {
    setCarregando(true);
    const response = await getRequisicoesDistribuidor({ page: page });
    if (response.data.count) {
      setSolicitacoes(response.data.results);
      setTotal(response.data.count);
    } else {
      setSolicitacoes();
    }
    setCarregando(false);
  };

  useEffect(() => {
    buscarSolicitacoes(1);
  }, []);

  const nextPage = page => {
    buscarSolicitacoes(page);
    setPage(page);
  };

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3">
        <div className="card-body gestao-requisicao-entrega">
          {solicitacoes && (
            <>
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
                  <Botao
                    texto="Confirmar todos"
                    type={BUTTON_TYPE.BUTTON}
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                    icon={BUTTON_ICON.CHECK_CIRCLE}
                    className="float-right"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Spin>
  );
};
