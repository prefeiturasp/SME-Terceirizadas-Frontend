import { Spin } from "antd";
import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

import {
  getProdutosPorTerceirizada,
  getRelatorioProdutosHomologados
} from "services/produto.service";
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

const data = [
  {

  }
]

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
                  <div>Mezanino Distribuidora</div>
                  <div>30 dias </div>
                  <div>25</div>
                </div>
               <div className="row-quantitativo-card">
               <div className="row-quantitativo-status">
                  <div className="status-flex-container"><div>Produtos homologados</div><div>{"3"}</div></div>
                  <div className="status-flex-container"><div>Produtos não homologados</div><div>{"3"}</div> </div>
                  <div className="status-flex-container"><div>Produtos pendentes de homolog.</div><div>{"3"}</div></div>
                  <div className="status-flex-container"><div>Produtos aguardando a. sensorial</div><div>{"3"}</div></div>
                </div>
                <div className="row-quantitativo-status">
                  <div className="status-flex-container"><div>Produtos aguardando correção</div><div>{"3"}</div></div>
                  <div className="status-flex-container"><div>Reclamação de produto</div><div>{"3"}</div></div>
                  <div className="status-flex-container"><div>Produtos em análise de reclamação</div><div>{"3"}</div></div>
                  <div className="status-flex-container"><div>Produtos suspensos</div><div>{"3"}</div></div>
                </div>
               </div>
              </Fragment>
              );
            })}
    </section>
  );
};

const RelatorioQuantitativoPorTerdeirizada = () => {
  const [terceirizadas, setTerceirizadas] = useState(data);
  const [filtros, setFiltros] = useState(null);
  const [carregando, setCarregando] = useState(false);

/*   useEffect(() => {
    if (!filtros) return;
    async function fetchData() {
      setCarregando(true);
      const response = await getProdutosPorTerceirizada(filtros);
      setCarregando(false);
      //console.log(response.data)
      setTerceirizadas(response.data);
    }
    fetchData();
  }, [filtros, setTerceirizadas]);
  */

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
        show2={Boolean(terceirizadas && terceirizadas.length)}
        show={true}
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
          <Link
            to="route"
            target="_blank"
            onClick={event => {
              event.preventDefault();
              window.open(getRelatorioProdutosHomologados(filtros));
            }}
          >
            <Botao
              type={BUTTON_TYPE.BUTTON}
              titulo="imprimir"
              texto="imprimir"
              style={BUTTON_STYLE.BLUE}
              icon={BUTTON_ICON.PRINT}
              className="float-right ml-3"
              onClick={() => {
                setFiltros(null);
                setTerceirizadas(null);
              }}
            />
          </Link>
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
