import React, { useEffect, useState } from "react";
import { Spin, Pagination } from "antd";
import {
  getRequisicoesListagem,
  gerarPDFDistribuidorSolicitacoes,
  gerarExcelSolicitacoes
} from "../../../../services/logistica.service.js";
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
  const [carregandoPDFConfirmados, setCarregandoPDFConfirmados] = useState(
    false
  );
  const [carregandoExcelConfirmados, setCarregandoExcelConfirmados] = useState(
    false
  );
  const [solicitacoes, setSolicitacoes] = useState();
  const [filtros, setFiltros] = useState();
  const [ativos, setAtivos] = useState([]);
  const [total, setTotal] = useState();
  const [numEnviadas, setNumEnviadas] = useState();
  const [numConfirmadas, setNumConfirmadas] = useState();
  const [page, setPage] = useState();

  const buscarSolicitacoes = async page => {
    setCarregando(true);
    const params = gerarParametrosConsulta({ page: page, ...filtros });
    const response = await getRequisicoesListagem(params);
    if (response.data.count) {
      setSolicitacoes(response.data.results);
      setTotal(response.data.count);
      setNumEnviadas(response.data.num_enviadas);
      setNumConfirmadas(response.data.num_confirmadas);
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
      <div className="card mt-3 card-gestao-requisicao-entrega">
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
                    className="float-left mb-2"
                  />
                </div>
                <div className="d-flex align-items-end">
                  <Spin size="small" spinning={carregandoPDFConfirmados}>
                    <Botao
                      texto="Imprimir requisições confirmadas"
                      type={BUTTON_TYPE.BUTTON}
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                      icon={BUTTON_ICON.PRINT}
                      onClick={() => {
                        setCarregandoPDFConfirmados(true);
                        gerarPDFDistribuidorSolicitacoes({ ...filtros }).then(
                          () => {
                            setCarregandoPDFConfirmados(false);
                          }
                        );
                      }}
                      disabled={numConfirmadas === 0}
                    />
                  </Spin>
                  <Spin size="small" spinning={carregandoExcelConfirmados}>
                    <Botao
                      texto="Exportar"
                      type={BUTTON_TYPE.BUTTON}
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                      icon={BUTTON_ICON.EYE}
                      className="ml-2 mr-2"
                      onClick={() => {
                        setCarregandoExcelConfirmados(true);
                        gerarExcelSolicitacoes({ ...filtros }).then(() => {
                          setCarregandoExcelConfirmados(false);
                        });
                      }}
                    />
                  </Spin>
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
