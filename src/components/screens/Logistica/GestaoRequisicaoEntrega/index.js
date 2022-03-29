import React, { useEffect, useState, useContext } from "react";
import { Modal } from "react-bootstrap";
import HTTP_STATUS from "http-status-codes";
import { Spin, Pagination } from "antd";
import {
  getRequisicoesListagem,
  gerarPDFDistribuidorSolicitacao,
  gerarPDFDistribuidorSolicitacoes,
  gerarExcelSolicitacoes,
  confirmaCancelamento
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
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import ConfirmaTodos from "./components/ConfirmarTodos";
import { CentralDeDownloadContext } from "context/CentralDeDownloads";

export default () => {
  const [carregando, setCarregando] = useState(false);
  const [carregandoPDFConfirmados, setCarregandoPDFConfirmados] = useState(
    false
  );
  const [carregandoExcel, setCarregandoExcel] = useState(false);
  const [solicitacoes, setSolicitacoes] = useState();
  const [filtros, setFiltros] = useState();
  const [ativos, setAtivos] = useState([]);
  const [total, setTotal] = useState();
  const [numEnviadas, setNumEnviadas] = useState();
  const [numConfirmadas, setNumConfirmadas] = useState();
  const [page, setPage] = useState();
  const [initialValues, setInitialValues] = useState({});
  const [show, setShow] = useState(false);

  const centralDownloadContext = useContext(CentralDeDownloadContext);

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

  const atualizaTabela = () => {
    buscarSolicitacoes(page ? page : 1);
  };

  const confirmaCancelamentoGuias = async (
    solicitacao,
    setModal,
    setCarregando
  ) => {
    setCarregando(true);
    let guias = solicitacao.guias
      .filter(x => x.status === "Aguardando cancelamento")
      .map(x => x.numero_guia);
    let numero_requisicao = solicitacao.numero_solicitacao;
    const payload = { guias, numero_requisicao };
    let textoToast = "Guia(s) de Remessa cancelada(s) com sucesso";
    let response = await confirmaCancelamento(payload);
    if (response.status === HTTP_STATUS.OK) {
      atualizaTabela();
      toastSuccess(textoToast);
      setModal(false);
    } else {
      toastError("Erro ao arquivar a guia");
    }
    setCarregando(false);
  };

  const imprimirRequisicao = async uuid => {
    await gerarPDFDistribuidorSolicitacao(uuid);
    setShow(true);
    centralDownloadContext.getQtdeDownloadsNaoLidas();
  };

  const imprimirRequisicoesConfirmadas = () => {
    setCarregandoPDFConfirmados(true);
    const params = gerarParametrosConsulta({ ...filtros });
    gerarPDFDistribuidorSolicitacoes(params).then(() => {
      setCarregandoPDFConfirmados(false);
      setShow(true);
      centralDownloadContext.getQtdeDownloadsNaoLidas();
    });
  };

  useEffect(() => {
    const queryString = window.location.search;

    if (queryString) {
      const urlParams = new URLSearchParams(window.location.search);
      const codigo = urlParams.get("numero_requisicao");
      const filtro = {
        numero_requisicao: codigo
      };
      setFiltros({ ...filtro });
      setInitialValues({ ...filtro });
    }
  }, []);

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

  const handleClose = () => {
    setShow(false);
  };

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <Modal show={show} onHide={handleClose} dialogClassName="modal-entregas">
        <Modal.Header closeButton>
          <Modal.Title>Geração solicitada com sucesso.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          A geração foi solicitada. Em breve você receberá um aviso na central
          de downloads com o resultado.
        </Modal.Body>
      </Modal>
      <div className="card mt-3 card-gestao-requisicao-entrega">
        <div className="card-body gestao-requisicao-entrega">
          <Filtros
            setFiltros={setFiltros}
            setSolicitacoes={setSolicitacoes}
            setTotal={setTotal}
            initialValues={initialValues}
            setInitialValues={setInitialValues}
          />
          {solicitacoes && (
            <>
              <br /> <hr /> <br />
              <ListagemSolicitacoes
                solicitacoes={solicitacoes}
                ativos={ativos}
                setAtivos={setAtivos}
                updatePage={updatePage}
                confirmaCancelamentoGuias={confirmaCancelamentoGuias}
                imprimirRequisicao={imprimirRequisicao}
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
                      onClick={imprimirRequisicoesConfirmadas}
                      disabled={numConfirmadas === 0}
                    />
                  </Spin>
                  <Spin size="small" spinning={carregandoExcel}>
                    <Botao
                      texto="Exportar"
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
