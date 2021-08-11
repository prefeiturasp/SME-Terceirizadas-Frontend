import React, { useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { Spin, Pagination } from "antd";
import {
  getRequisicoesListagem,
  gerarExcelSolicitacoes,
  arquivaGuias,
  desarquivaGuias
} from "../../../../services/logistica.service.js";
import ListagemSolicitacoes from "./components/ListagemSolicitacoes";
import "./styles.scss";
import Filtros from "./components/Filtros";
import { gerarParametrosConsulta } from "helpers/utilities";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
  BUTTON_ICON
} from "components/Shareable/Botao/constants";
import { enviaSolicitacoesDaGrade } from "../../../../services/disponibilizacaoDeSolicitacoes.service";
import {
  toastError,
  toastInfo,
  toastSuccess
} from "components/Shareable/Toast/dialogs";
import { Modal } from "react-bootstrap";

export default () => {
  const [carregando, setCarregando] = useState(false);
  const [carregandoModal, setCarregandoModal] = useState(false);
  const [solicitacoes, setSolicitacoes] = useState();
  const [ativos, setAtivos] = useState([]);
  const [filtros, setFiltros] = useState();
  const [total, setTotal] = useState();
  const [page, setPage] = useState();
  const [carregandoExcel, setCarregandoExcel] = useState(false);
  const [selecionados, setSelecionados] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const buscarSolicitacoes = async page => {
    setCarregando(true);
    const params = gerarParametrosConsulta({ page: page, ...filtros });
    const response = await getRequisicoesListagem(params);
    if (response.data.count) {
      setSolicitacoes(response.data.results);
      setTotal(response.data.count);
    } else {
      setSolicitacoes(null);
      setTotal(response.data.count);
    }
    setAtivos([]);
    setCarregando(false);
  };

  const enviarSolicitacoesMarcadas = async () => {
    setCarregandoModal(true);
    let payload = selecionados.map(x => x.uuid);
    const response = await enviaSolicitacoesDaGrade(payload);
    if (response.status === HTTP_STATUS.OK && response.data.length === 0) {
      atualizaTabela();
      setShowModal(false);
      response.status = 500;
    } else if (response.status === HTTP_STATUS.OK && response.data.length > 0) {
      atualizaTabela();
      setShowModal(false);
    } else {
      response.status = 500;
    }
    setCarregandoModal(false);

    exibeToastPeloStatus(response.status);
  };

  const exibeToastPeloStatus = status => {
    if (status === HTTP_STATUS.OK) {
      toastSuccess("Requisições de entrega enviadas com sucesso");
    } else if (status === HTTP_STATUS.BAD_REQUEST) {
      toastError("Erro de transição de estado");
    } else {
      toastInfo("Nenhuma requisição de entrega a enviar");
    }
  };

  const atualizaTabela = () => {
    buscarSolicitacoes(page ? page : 1);
  };

  const confereSolicitacoesSelecionadas = () => {
    let desabilitar = false;
    selecionados.map(solicitacao => {
      if (solicitacao.status !== "Aguardando envio") {
        desabilitar = true;
      }
    });
    return desabilitar || selecionados.length === 0;
  };

  const arquivaDesarquivaGuias = async (
    selecionadas,
    numero_requisicao,
    situacao,
    setModal,
    setCarregando
  ) => {
    setCarregando(true);
    let guias = selecionadas.map(x => x.numero_guia);
    const payload = { guias, numero_requisicao };
    let textoToast =
      situacao === "ATIVA"
        ? "Guia(s) de Remessa arquivada(s) com sucesso"
        : "Guia(s) de Remessa desarquivada(s) com sucesso";
    let response =
      situacao === "ATIVA"
        ? await arquivaGuias(payload)
        : await desarquivaGuias(payload);
    if (response.status === HTTP_STATUS.OK) {
      atualizaTabela();
      toastSuccess(textoToast);
      setModal(false);
    } else {
      toastError("Erro ao arquivar a guia");
    }
    setCarregando(false);
  };

  useEffect(() => {
    if (filtros) {
      buscarSolicitacoes(1);
    }
  }, [filtros]);

  const nextPage = page => {
    buscarSolicitacoes(page);
    setPage(page);
  };

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 card-consulta-requisicao-entrega">
        <div className="card-body gestao-requisicao-entrega">
          <Filtros setFiltros={setFiltros} setSolicitacoes={setSolicitacoes} />

          {solicitacoes && (
            <>
              <br /> <hr /> <br />
              <ListagemSolicitacoes
                solicitacoes={solicitacoes}
                selecionados={selecionados}
                setSelecionados={setSelecionados}
                ativos={ativos}
                setAtivos={setAtivos}
                arquivaDesarquivaGuias={arquivaDesarquivaGuias}
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
                </div>
                <div className="d-flex align-items-end">
                  <Botao
                    texto="Enviar"
                    type={BUTTON_TYPE.BUTTON}
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                    className="ml-2 mr-2"
                    onClick={() => {
                      setShowModal(true);
                    }}
                    disabled={confereSolicitacoesSelecionadas()}
                  />
                  <Spin size="small" spinning={carregandoExcel}>
                    <Botao
                      texto="Exportar Relatório"
                      type={BUTTON_TYPE.BUTTON}
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                      icon={BUTTON_ICON.EYE}
                      className="ml-2 mr-2"
                      onClick={() => {
                        setCarregandoExcel(true);
                        const params = gerarParametrosConsulta({ ...filtros });
                        gerarExcelSolicitacoes(params).then(() => {
                          setCarregandoExcel(false);
                        });
                      }}
                    />
                  </Spin>
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

      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
      >
        <Spin tip="Enviando..." spinning={carregandoModal}>
          <Modal.Header closeButton>
            <Modal.Title>Atenção</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selecionados.length === 1
              ? `Deseja enviar a Requisição de Entrega n° ${
                  selecionados[0].numero_solicitacao
                } ? `
              : `Deseja enviar as seguintes Requisições de Entrega n° ${selecionados
                  .map(x => x.numero_solicitacao)
                  .join("; ")} ? `}
          </Modal.Body>
          <Modal.Footer>
            <Botao
              texto="SIM"
              type={BUTTON_TYPE.BUTTON}
              onClick={() => {
                enviarSolicitacoesMarcadas();
              }}
              style={BUTTON_STYLE.GREEN}
              className="ml-3"
              disabled={carregandoModal}
            />
            <Botao
              texto="NÃO"
              type={BUTTON_TYPE.BUTTON}
              onClick={() => {
                setShowModal(false);
              }}
              style={BUTTON_STYLE.GREEN_OUTLINE}
              className="ml-3"
            />
          </Modal.Footer>
        </Spin>
      </Modal>
    </Spin>
  );
};
