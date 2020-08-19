import { Spin } from "antd";
import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { bindActionCreators } from "redux";

import Botao from "components/Shareable/Botao";
import LabelResultadoDaBusca from "components/Shareable/LabelResultadoDaBusca";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";

import {
  reset,
  setProdutos,
  setAtivos
} from "reducers/responderReclamacaoProduto";

import { getReclamacoesTerceirizadaPorFiltro } from "services/produto.service";

import Reclamacao from "./Reclamacao";
import FormBuscaProduto from "./FormBuscaProduto";

import "./style.scss";

const TabelaProdutos = ({
  produtos,
  filtros,
  setProdutos,
  setCarregando,
  ativos,
  setAtivos
}) => {
  if (!produtos) return false;

  return (
    <>
      <LabelResultadoDaBusca filtros={filtros} />
      <section className="tabela-resultado-consultar-reclamacao-produto">
        <div className="table-grid table-header">
          <div className="table-header-cell">Nome do Produto</div>
          <div className="table-header-cell">Marca</div>
          <div className="table-header-cell">Tipo</div>
          <div className="table-header-cell">Qtde. Reclamações</div>
          <div className="table-header-cell">Data de Cadastro</div>
        </div>
        {produtos.map((produto, indexProduto) => {
          const bordas = ativos.includes(indexProduto) ? "desativar-borda" : "";
          const icone = ativos.includes(indexProduto)
            ? "angle-up"
            : "angle-down";

          return (
            <Fragment key={indexProduto}>
              <div className="tabela-produto tabela-body-produto item-produto">
                <div className="table-grid table-body">
                  <div className={`table-body-cell ${bordas}`}>
                    {produto.nome}
                  </div>
                  <div className={`table-body-cell ${bordas}`}>
                    {produto.marca.nome}
                  </div>
                  <div className={`table-body-cell ${bordas}`}>
                    {produto.eh_para_alunos_com_dieta ? "D. Especial" : "Comum"}
                  </div>
                  <div className={`table-body-cell ${bordas}`}>
                    {produto.ultima_homologacao.qtde_questionamentos}
                  </div>

                  <div
                    className={`table-body-cell ${bordas} d-flex justify-content-between`}
                  >
                    {produto.criado_em.split(" ")[0]}
                    <i
                      className={`fas fa-${icone} mr-3`}
                      onClick={() => {
                        ativos.includes(indexProduto)
                          ? setAtivos(ativos.filter(el => el !== indexProduto))
                          : setAtivos([...ativos, indexProduto]);
                      }}
                    />
                  </div>
                </div>
              </div>
              {ativos.includes(indexProduto) && (
                <Fragment key={indexProduto}>
                  <div className="mt-2 text-right">
                    <Link
                      to={`/gestao-produto/relatorio?uuid=${
                        produto.ultima_homologacao.uuid
                      }`}
                    >
                      <Botao
                        texto="Ver produto"
                        type={BUTTON_TYPE.SUBMIT}
                        style={BUTTON_STYLE.GREEN_OUTLINE}
                        className="ml-3 mr-3"
                      />
                    </Link>
                  </div>
                  <hr />

                  {produto.ultima_homologacao.reclamacoes.map(
                    (reclamacao, indexReclamacao, arr) => {
                      const deveMostrarBarraHorizontal =
                        indexReclamacao < arr.length - 1;
                      return [
                        <Reclamacao
                          key={indexReclamacao}
                          indexReclamacao={indexReclamacao + 1}
                          indexProduto={indexProduto}
                          reclamacao={reclamacao}
                          setAtivos={setAtivos}
                          setProdutos={setProdutos}
                          produtos={produtos}
                          setCarregando={setCarregando}
                        />,
                        deveMostrarBarraHorizontal && <hr />
                      ];
                    }
                  )}

                  <div className="mt-4 mb-5"> &nbsp;</div>
                </Fragment>
              )}
            </Fragment>
          );
        })}
      </section>
    </>
  );
};

const ResponderReclamacaoProduto = ({
  history,
  produtos,
  setProdutos,
  ativos,
  setAtivos,
  reset
}) => {
  const [filtros, setFiltros] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [filtrarUUID, setFiltrarUUID] = useState(true);
  const urlParams = new URLSearchParams(window.location.search);
  const uuid = urlParams.get("uuid");

  useEffect(() => {
    if (history && history.action === "PUSH") {
      reset();
    }
    if (!filtros && !uuid) return;
    async function fetchData() {
      setCarregando(true);
      setProdutos(null);
      let response = {};
      if (filtrarUUID) {
        setFiltrarUUID(false);
        response = await getReclamacoesTerceirizadaPorFiltro({ uuid: uuid });
        setAtivos([0]);
      } else {
        response = await getReclamacoesTerceirizadaPorFiltro(filtros);
        setAtivos([]);
      }
      setProdutos(response.data.results);
      setCarregando(false);
    }
    fetchData();
  }, [filtros]);

  const onSubmitForm = formValues => {
    setFiltros({ ...formValues });
  };

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 screen-responder-reclamacao-produto">
        <div className="card-body">
          <FormBuscaProduto
            onSubmit={onSubmitForm}
            onAtualizaProdutos={() => {}}
            exibirBotaoVoltar
            exibirStatus={false}
          />
        </div>
        {produtos && !produtos.length && (
          <div className="text-center mt-5">
            A consulta retornou 0 resultados.
          </div>
        )}
        {produtos && produtos.length > 0 && (
          <div className="container-tabela">
            <TabelaProdutos
              produtos={produtos}
              history={history}
              filtros={filtros}
              setProdutos={setProdutos}
              setCarregando={setCarregando}
              ativos={ativos}
              setAtivos={setAtivos}
            />
          </div>
        )}
      </div>
    </Spin>
  );
};

const mapStateToProps = state => {
  return {
    ativos: state.avaliarReclamacaoProduto.ativos,
    produtos: state.avaliarReclamacaoProduto.produtos
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setAtivos,
      setProdutos,
      reset
    },
    dispatch
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ResponderReclamacaoProduto)
);
