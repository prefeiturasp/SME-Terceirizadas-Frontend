import { Spin } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
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

const gerarLabelTotal = filtros => {
  if (filtros.data_inicial || filtros.data_final) return " no período";
  return "";
};

const TabelaProdutosHomologados = ({ grupos, filtros }) => {
  if (!grupos) return false;
  return (
    <section className="tabela-produtos-homologados">
      <div className="header-homologados">
        <div>Terceirizada</div>
        <div>Nome do Produto</div>
        <div>Marca</div>
        <div>Dieta Especial</div>
        <div>Aditivos Alergênicos</div>
        <div>Data de Cadastro</div>
        <div>Data de Homologação</div>
      </div>
      {grupos.map((grupo, index) => {
        return (
          <>
            {grupo.produtos.map((produto, index2) => {
              return (
                <div key={index2} className="body-homologados">
                  <div>
                    {
                      produto.ultima_homologacao.rastro_terceirizada
                        .nome_fantasia
                    }
                  </div>
                  <div>{produto.nome}</div>
                  <div>{produto.marca.nome}</div>
                  <div>{produto.eh_para_alunos_com_dieta ? "Sim" : "Não"}</div>
                  <div>{produto.tem_aditivos_alergenicos ? "Sim" : "Não"}</div>
                  <div>{produto.criado_em}</div>
                  <div>{produto.ultima_homologacao.criado_em}</div>
                </div>
              );
            })}
            <div className="linha-totalizacao" key={index}>
              <span>
                {`Total de itens por ${grupo.terceirizada.nome_fantasia}: `}
                <span>{grupo.produtos.length.toString().padStart(2, "0")}</span>
              </span>
            </div>
          </>
        );
      })}
      <div className="linha-totalizacao linha-totalizacao-geral">
        <span>
          {`Total de produtos cadastrados ${gerarLabelTotal(filtros)}:`}
          <span>
            {grupos
              .reduce((acc, v) => {
                return acc + v.produtos.length;
              }, 0)
              .toString()
              .padStart(2, "0")}
          </span>
        </span>
      </div>
    </section>
  );
};

const RelatorioProdutosHomologados = () => {
  const [grupos, setGrupos] = useState(null);
  const [filtros, setFiltros] = useState(null);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (!filtros) return;
    async function fetchData() {
      setCarregando(true);
      const response = await getProdutosPorTerceirizada(filtros);
      setCarregando(false);
      setGrupos(response.data);
    }
    fetchData();
  }, [filtros, setGrupos]);

  const onSubmitForm = formValues => {
    setFiltros(formValues);
  };

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 page-relatorio-produtos-homologados">
        <div className="card-body">
          <h3 className="font-weight-bold">
            Relatório de Produtos Homologados
          </h3>
          <FormBuscaProduto
            onSubmit={onSubmitForm}
            onAtualizaProdutos={() => {}}
          />
        </div>
      </div>

      {grupos && !grupos.length && (
        <div className="text-center mt-5">
          A consulta retornou 0 resultados.
        </div>
      )}

      <Modal
        dialogClassName="modal-90w"
        show={Boolean(grupos && grupos.length)}
        onHide={() => {}}
      >
        <section className="m-3">
          <h4 className="font-weight-normal text-secondary">
            Relatório de Produtos Homologados
          </h4>
          <p className="text-black font-weight-bold mb-1">
            {filtros && gerarLabelPorFiltro(filtros)}
          </p>
          <TabelaProdutosHomologados grupos={grupos} filtros={filtros} />
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
                setGrupos(null);
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
              setGrupos(null);
            }}
            className="float-right"
          />
        </section>
      </Modal>
    </Spin>
  );
};

export default RelatorioProdutosHomologados;
