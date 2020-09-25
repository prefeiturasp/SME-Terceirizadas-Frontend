import { Spin, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { gerarParametrosConsulta, deepCopy } from "helpers/utilities";

import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
  BUTTON_ICON
} from "components/Shareable/Botao/constants";

import { gerarLabelPorFiltro } from "helpers/produto";

import "./styles.scss";

import {
  getProdutosRelatorioSituacao,
  getPdfRelatorioSituacaoProduto
} from "services/produto.service";

import FormBuscaProduto from "./components/FormBuscaProduto";
import TabelaSituacaoProduto from "./components/TabelaSituacaoProduto";
import { getTodasOpcoesStatusPorPerfil, retornaStatusBackend } from "./helpers";

const processaFiltrosSituacao = filtros => {
  const params = deepCopy(filtros);
  if (filtros.situacao) {
    params.status = retornaStatusBackend(filtros.situacao);
  } else {
    params.status = getTodasOpcoesStatusPorPerfil();
  }
  return params;
};

export default () => {
  const [dadosRelatorio, setDadosRelatorio] = useState(null);
  const [filtros, setFiltros] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [carregandoPagina, setCarregandoPagina] = useState(false);
  const [produtosCount, setProdutosCount] = useState(0);
  const [page, setPage] = useState(1);
  const [exibirModal, setExibirModal] = useState(null);
  const PAGE_SIZE = 10;

  useEffect(() => {
    if (!filtros) return;
    async function fetchData() {
      setCarregando(true);
      const params = gerarParametrosConsulta({
        ...processaFiltrosSituacao(filtros),
        page: page,
        page_size: PAGE_SIZE
      });
      const response = await getProdutosRelatorioSituacao(params);
      setCarregando(false);
      setCarregandoPagina(false);
      setDadosRelatorio(response.data.results);
      if (response.data.count > 0) setExibirModal(true);
      setProdutosCount(response.data.count);
    }
    fetchData();
  }, [filtros, page]);

  const onSubmitForm = formValues => {
    setPage(1);
    setFiltros({ ...formValues });
  };

  const nextPage = page => {
    setPage(page);
    setCarregandoPagina(true);
  };

  const onImprimir = () => {
    const params = gerarParametrosConsulta({
      ...processaFiltrosSituacao(filtros)
    });
    getPdfRelatorioSituacaoProduto(params);
  };

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 card-relatorio-situtacao">
        <div className="card-body">
          <FormBuscaProduto onSubmit={onSubmitForm} />

          {dadosRelatorio && !dadosRelatorio.length && (
            <div className="text-center mt-5">
              Não existem dados para filtragem informada
            </div>
          )}
        </div>
      </div>

      <Modal
        dialogClassName="modal-90w"
        show={exibirModal}
        onHide={() => {
          setExibirModal(null);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Relatório de situação do produto</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Spin tip="Carregando..." spinning={carregandoPagina}>
            <section className="m-3">
              <p className="text-black font-weight-bold mb-1">
                {filtros && gerarLabelPorFiltro(filtros)}
              </p>
              <TabelaSituacaoProduto dadosRelatorio={dadosRelatorio} />
            </section>
          </Spin>
        </Modal.Body>
        <Modal.Footer className="modal-rodape-situacao">
          <Pagination
            current={page}
            total={produtosCount}
            className="float-left"
            showSizeChanger={false}
            onChange={page => {
              nextPage(page);
            }}
            pageSize={PAGE_SIZE}
          />
          <Botao
            style={BUTTON_STYLE.BLUE}
            icon={BUTTON_ICON.PRINT}
            texto="Imprimir"
            onClick={onImprimir}
            type={BUTTON_TYPE.BUTTON}
            className="float-right mr-2"
          />
          <Botao
            texto="Voltar"
            titulo="Voltar"
            type={BUTTON_TYPE.BUTTON}
            style={BUTTON_STYLE.BLUE_OUTLINE}
            icon={BUTTON_ICON.ARROW_LEFT}
            onClick={() => {
              setExibirModal(null);
            }}
            className="float-right mr-2"
          />
        </Modal.Footer>
      </Modal>
    </Spin>
  );
};
