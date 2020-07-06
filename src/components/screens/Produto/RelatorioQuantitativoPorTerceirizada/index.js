import { Spin } from "antd";
import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

import { obterRelatorioQuantitativo } from "helpers/terceirizadas";

import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
  BUTTON_ICON
} from "components/Shareable/Botao/constants";
import FormBuscaProduto from "components/Shareable/FormBuscaProduto";
import "./style.scss";

const gerarLabelPorFiltro = filtros => {
  if (filtros.data_inicial && filtros.data_final) {
    return `Veja resultados período "${moment(
      filtros.data_inicial,
      "DD/MM/YYYY"
    ).format("DD/MM/YYYY")} à ${moment(filtros.data_final, "DD/MM/YYYY").format(
      "DD/MM/YYYY"
    )}":`;
  } else if (filtros.data_inicial) {
    return `Veja resultados apartir de "${moment(
      filtros.data_inicial,
      "DD/MM/YYYY"
    ).format("DD/MM/YYYY")}":`;
  } else if (filtros.data_final) {
    return `Veja resultados até "${moment(
      filtros.data_final,
      "DD/MM/YYYY"
    ).format("DD/MM/YYYY")}":`;
  } else {
    return "Veja resultados da busca:";
  }
};

const TabelaQuantitativoPorTerceirizada = ({ terceirizadas }) => {
  if (!terceirizadas) return false;
  return (
    <section className="tabela-quantitativo-por-terceirizada">
      <div className="header-quantitativo-por-terceirizada">
        <div>Terceirizada</div>
        <div>Período (dias)</div>
        <div>Quantidade total de produtos</div>
      </div>
      {terceirizadas.map((item, index) => {
        return (
          <Fragment key={index}>
            <div className="row-quantitativo-nome">
              <div>{item.nomeTerceirizada}</div>
              <div />
              <div>{item.totalProdutos}</div>
            </div>
            <div className="row-quantitativo-card">
              <div className="row-quantitativo-status">
                <div className="status-flex-container">
                  <div>Produtos homologados</div>
                  <div>{item.qtdePorStatus.PRODUTOS_HOMOLOGADOS}</div>
                </div>
                <div className="status-flex-container">
                  <div>Produtos não homologados</div>
                  <div>{item.qtdePorStatus.PRODUTOS_NAO_HOMOLOGADOS}</div>{" "}
                </div>
                <div className="status-flex-container">
                  <div>Produtos pendentes de homolog.</div>
                  <div>{item.qtdePorStatus.PRODUTOS_PENDENTES_HOMOLOGACAO}</div>
                </div>
                <div className="status-flex-container">
                  <div>Produtos aguardando a. sensorial</div>
                  <div>
                    {item.qtdePorStatus.PRODUTOS_AGUARDANDO_ANALISE_SENSORIAL}
                  </div>
                </div>
              </div>
              <div className="row-quantitativo-status">
                <div className="status-flex-container">
                  <div>Produtos aguardando correção</div>
                  <div />
                </div>
                <div className="status-flex-container">
                  <div>Reclamação de produto</div>
                  <div>{item.qtdePorStatus.RECLAMACAO_DE_PRODUTO}</div>
                </div>
                <div className="status-flex-container">
                  <div>Produtos em análise de reclamação</div>
                  <div>{item.qtdePorStatus.PRODUTOS_ANALISE_RECLAMACAO}</div>
                </div>
                <div className="status-flex-container">
                  <div>Produtos suspensos</div>
                  <div>{item.qtdePorStatus.PRODUTOS_SUSPENSOS}</div>
                </div>
              </div>
            </div>
          </Fragment>
        );
      })}
    </section>
  );
};

const RelatorioQuantitativoPorTerdeirizada = () => {
  const [terceirizadas, setTerceirizadas] = useState(null);
  const [filtros, setFiltros] = useState(null);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (!filtros) return;
    async function fetchData() {
      setCarregando(true);
      const response = await obterRelatorioQuantitativo(filtros);
      setCarregando(false);
      setTerceirizadas(response.detalhes);
    }
    fetchData();
  }, [filtros, setTerceirizadas]);

  const onSubmitForm = formValues => {
    setFiltros(formValues);
  };

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 page-relatorio-quantitativo-por-terceirizada">
        <div className="card-body">
          <h3 className="font-weight-bold">
            Relatório quantitativo por terceirizada
          </h3>
          <FormBuscaProduto
            onSubmit={onSubmitForm}
            onAtualizaProdutos={() => {}}
          />
        </div>
      </div>

      {terceirizadas && !terceirizadas.length && (
        <div className="text-center mt-5">
          A consulta retornou 0 resultados.
        </div>
      )}

      <Modal
        dialogClassName="modal-90w"
        show={Boolean(terceirizadas && terceirizadas.length)}
        onHide={() => {}}
      >
        <section className="m-3">
          <h4 className="font-weight-normal text-secondary">
            Relatório quantitativo por terceirizada
          </h4>
          <p className="text-black font-weight-bold mb-1">
            {filtros && gerarLabelPorFiltro(filtros)}
          </p>
          <TabelaQuantitativoPorTerceirizada terceirizadas={terceirizadas} />
        </section>

        <section className="m-3">
          <Botao
            texto="voltar"
            titulo="voltar"
            type={BUTTON_TYPE.BUTTON}
            style={BUTTON_STYLE.BLUE_OUTLINE}
            icon={BUTTON_ICON.ARROW_LEFT}
            onClick={() => {
              setFiltros(null);
              setTerceirizadas(null);
            }}
            className="float-right"
          />
        </section>
      </Modal>
    </Spin>
  );
};

export default RelatorioQuantitativoPorTerdeirizada;
