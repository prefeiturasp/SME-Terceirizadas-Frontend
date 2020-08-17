import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
  BUTTON_ICON
} from "components/Shareable/Botao/constants";

import { gerarLabelPorFiltro } from "helpers/produto";

import {
  getProdutosPorFiltro,
  getPdfRelatorioSituacaoProduto
} from "services/produto.service";

import FormBuscaProduto from "./components/FormBuscaProduto";
import TabelaSituacaoProduto from "./components/TabelaSituacaoProduto";
import { listarCardsPermitidos } from "helpers/gestaoDeProdutos";
import { deepCopy } from "helpers/utilities";
import { ENDPOINT_HOMOLOGACOES_PRODUTO_STATUS } from "constants/shared";

const processaFiltrosSituacao = filtros => {
  const params = deepCopy(filtros);
  if (filtros.situacao) {
    const card = listarCardsPermitidos().find(
      card => card.style === filtros.situacao
    );
    params.status = card.incluir_status.map(status =>
      Object.keys(ENDPOINT_HOMOLOGACOES_PRODUTO_STATUS).find(
        key => ENDPOINT_HOMOLOGACOES_PRODUTO_STATUS[key] === status
      )
    );
  }
  return params;
};

export default () => {
  const [dadosRelatorio, setDadosRelatorio] = useState(null);
  const [filtros, setFiltros] = useState(null);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (!filtros) return;
    async function fetchData() {
      setCarregando(true);
      const response = await getProdutosPorFiltro(
        processaFiltrosSituacao(filtros)
      );
      setCarregando(false);
      setDadosRelatorio(response.data.results);
    }
    fetchData();
  }, [filtros, setDadosRelatorio]);

  const onSubmitForm = formValues => {
    setFiltros(formValues);
  };

  const onImprimir = () => {
    const params = processaFiltrosSituacao(filtros);
    if (filtros.situacao) {
      const card = listarCardsPermitidos().find(
        card => card.style === filtros.situacao
      );
      params.situacao = card.titulo;
    }
    getPdfRelatorioSituacaoProduto(params);
  };

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 page-relatorio-quantitativo-por-terceirizada">
        <div className="card-body">
          <FormBuscaProduto onSubmit={onSubmitForm} />
        </div>
      </div>

      {dadosRelatorio && !dadosRelatorio.length && (
        <div className="text-center mt-5">
          Produto não foi encontrado para filtragem realizada.
        </div>
      )}

      <Modal
        dialogClassName="modal-90w"
        show={Boolean(dadosRelatorio && dadosRelatorio.length)}
        onHide={() => {}}
      >
        <section className="m-3">
          <h4 className="font-weight-normal text-secondary">
            Relatório de situação do produto
          </h4>
          <p className="text-black font-weight-bold mb-1">
            {filtros && gerarLabelPorFiltro(filtros)}
          </p>
          <TabelaSituacaoProduto dadosRelatorio={dadosRelatorio} />
        </section>

        <section className="m-3">
          <Botao
            texto="voltar"
            titulo="voltar"
            type={BUTTON_TYPE.BUTTON}
            style={BUTTON_STYLE.BLUE_OUTLINE}
            icon={BUTTON_ICON.ARROW_LEFT}
            onClick={() => {
              setDadosRelatorio(null);
            }}
            className="float-right"
          />
          <Botao
            style={BUTTON_STYLE.BLUE}
            icon={BUTTON_ICON.PRINT}
            texto="Imprimir"
            onClick={onImprimir}
            type={BUTTON_TYPE.BUTTON}
            className="float-right mr-2"
          />
        </section>
      </Modal>
    </Spin>
  );
};
