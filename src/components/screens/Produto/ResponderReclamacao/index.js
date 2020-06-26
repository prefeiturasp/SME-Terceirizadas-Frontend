import React, { useEffect, useState, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { Spin } from "antd";
import { getProdutosPorFiltro } from "services/produto.service";
import Botao from "components/Shareable/Botao";
import InformacaoDeReclamante from "components/Shareable/InformacaoDeReclamante";
import LabelResultadoDaBusca from "components/Shareable/LabelResultadoDaBusca";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";
import { GESTAO_PRODUTO } from "configs/constants";
import FormBuscaProduto from "../AtivacaoSuspensao/FormBuscaProduto";
import ModalResponderReclamacao from "./ModalResponderReclamacao";
import { ordenaLogs, getQuestionamentoCodae } from "./helpers";
import "./style.scss";

const TabelaProdutos = ({ produtos, history, setProdutos, filtros }) => {
  const [ativos, setAtivos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  if (!produtos) return false;

  return (
    <>
      <ModalResponderReclamacao
        showModal={produtoSelecionado}
        closeModal={() => setProdutoSelecionado(null)}
        produto={produtoSelecionado || {}}
        idHomologacao={
          produtoSelecionado ? produtoSelecionado.ultima_homologacao.uuid : ""
        }
        atualizarDados={uuid => {
          setProdutos(
            produtos.map(el => {
              return el.ultima_homologacao.uuid === uuid
                ? { ...el, respondido: true }
                : el;
            })
          );
          setProdutoSelecionado(null);
        }}
      />

      <LabelResultadoDaBusca filtros={filtros} />
      <section className="tabela-resultado-consultar-reclamacao-produto">
        <div className="table-grid table-header">
          <div className="table-header-cell">Nome do Produto</div>
          <div className="table-header-cell">Marca</div>
          <div className="table-header-cell">Fabricante</div>
        </div>
        {produtos.map((produto, index) => {
          const terceirizada = produto.ultima_homologacao.rastro_terceirizada;
          const bordas = ativos.includes(index) ? "desativar-borda" : "";
          const icone = ativos.includes(index) ? "angle-up" : "angle-down";
          const logs = ordenaLogs(produto.ultima_homologacao.logs);
          // eslint-disable-next-line no-console
          const reclamacao = produto.ultima_homologacao.reclamacoes[0]; //getReclamacao(logs);
          const questionamento = getQuestionamentoCodae(logs);

          return (
            <Fragment key={index}>
              <div className="table-grid table-body">
                <div className={`table-body-cell ${bordas}`}>
                  {produto.nome}
                </div>
                <div className={`table-body-cell ${bordas}`}>
                  {produto.marca.nome}
                </div>
                <div className={`table-body-cell ${bordas}`}>
                  {produto.fabricante.nome}
                </div>
                <div className="reclamacao-collapse">
                  <i
                    className={`fas fa-${icone}`}
                    onClick={() => {
                      ativos.includes(index)
                        ? setAtivos(ativos.filter(el => el !== index))
                        : setAtivos([...ativos, index]);
                    }}
                  />
                </div>
              </div>
              {ativos.includes(index) && (
                <>
                  <div className="grid-detalhe mt-3">
                    <div className="grid-detalhe-cell label-empresa">
                      Empresa solicitante (Terceirizada)
                    </div>
                    <div className="grid-detalhe-cell label-empresa">
                      Telefone
                    </div>
                    <div className="grid-detalhe-cell label-empresa">
                      E-mail
                    </div>
                    <div className="grid-detalhe-cell value-empresa">
                      {terceirizada.nome_fantasia}
                    </div>
                    <div className="grid-detalhe-cell value-empresa template-contatos-terc">
                      {terceirizada.contatos.map((contato, index) => {
                        return <div key={index}>{contato.telefone}</div>;
                      })}
                    </div>
                    <div className="grid-detalhe-cell value-empresa template-contatos-terc">
                      {terceirizada.contatos.map((contato, index) => {
                        return <div key={index}>{contato.email}</div>;
                      })}
                    </div>
                  </div>

                  <InformacaoDeReclamante
                    reclamacao={reclamacao}
                    questionamento={questionamento}
                  />

                  <div className="float-right">
                    <Botao
                      texto="Responder"
                      type={BUTTON_TYPE.BUTTON}
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                      onClick={() => setProdutoSelecionado(produto)}
                      className="ml-3"
                      disabled={produto.respondido}
                    />
                    <Botao
                      texto="Ver Produto"
                      onClick={() =>
                        history.push(
                          `/${GESTAO_PRODUTO}/responder-reclamacao/detalhe?id=${
                            produto.ultima_homologacao.uuid
                          }`
                        )
                      }
                      type={BUTTON_TYPE.SUBMIT}
                      style={BUTTON_STYLE.GREEN}
                      className="ml-3 mr-3"
                    />
                  </div>
                  <div className="mt-4 mb-5"> &nbsp;</div>
                </>
              )}
            </Fragment>
          );
        })}
      </section>
    </>
  );
};

const ResponderReclamacaoProduto = ({ history }) => {
  const [produtos, setProdutos] = useState(null);
  const [filtros, setFiltros] = useState(null);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (!filtros) return;
    async function fetchData() {
      setCarregando(true);
      const response = await getProdutosPorFiltro(filtros);
      setCarregando(false);
      setProdutos(
        response.data.results.map(el => ({ ...el, respondido: false }))
      );
    }
    fetchData();
  }, [filtros, setProdutos]);

  const onSubmitForm = formValues => {
    setFiltros({ ...formValues, status: ["CODAE_PEDIU_ANALISE_RECLAMACAO"] });
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
              setProdutos={setProdutos}
              history={history}
              filtros={filtros}
            />
          </div>
        )}
      </div>
    </Spin>
  );
};

export default withRouter(ResponderReclamacaoProduto);
