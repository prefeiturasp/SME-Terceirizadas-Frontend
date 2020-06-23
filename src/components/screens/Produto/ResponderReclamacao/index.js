import React, { useEffect, useState, Fragment } from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";
import * as R from "ramda";
import { Spin } from "antd";
import { getProdutosPorFiltro } from "services/produto.service";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";
import { GESTAO_PRODUTO } from "configs/constants";
import FormBuscaProduto from "../AtivacaoSuspensao/FormBuscaProduto";
import ModalResponderReclamacao from "./ModalResponderReclamacao";
import "./style.scss";

const ordenaLogs = logs => {
  const sortedLogs = logs
    .concat()
    .sort((a, b) => moment(a.criado_em) - moment(b.criado_em));
  return sortedLogs;
};

const getReclamacao = logs => {
  const arr = R.filter(
    R.propEq(
      "status_evento_explicacao",
      "Escola/Nutricionista reclamou do produto"
    ),
    logs
  );
  return arr[0];
};

const getQuestionamentoCodae = logs => {
  const arr = R.filter(
    R.propEq("status_evento_explicacao", "CODAE autorizou reclamação"),
    logs
  );
  return arr[0];
};

const produtos1 = [
  {
    nome: "SUCO DE UVA",
    marca: { nome: "Maguari" },
    fabricante: { nome: "Unilever" },
    ultima_homologacao: {
      rastro_terceirizada: {
        nome_fantasia: "Fabrica SSS",
        contatos: [
          {
            telefone: "33 333 333",
            email: "test@test.com"
          },
          {
            telefone: "33 4444444",
            email: "admin@admin.com"
          }
        ]
      },
      logs: [
        {
          criado_em: new Date().toString(),
          status_evento_explicacao: "Escola/Nutricionista reclamou do produto",
          justificativa: "AAAA"
        },
        {
          criado_em: new Date().toString(),
          status_evento_explicacao: "CODAE autorizou reclamação",
          justificativa: "BBBB"
        }
      ]
    }
  },
  {
    nome: "LEITE INTEGRAL",
    marca: { nome: "Maguari" },
    fabricante: { nome: "Unilever" },
    ultima_homologacao: {
      rastro_terceirizada: {
        nome_fantasia: "Fabrica SSS",
        contatos: [
          {
            telefone: "33 333 333",
            email: "test@test.com"
          },
          {
            telefone: "33 4444444",
            email: "admin@admin.com"
          }
        ]
      },
      logs: [
        {
          criado_em: new Date().toString(),
          status_evento_explicacao: "Escola/Nutricionista reclamou do produto",
          justificativa: "AAAA"
        },
        {
          criado_em: new Date().toString(),
          status_evento_explicacao: "CODAE autorizou reclamação",
          justificativa: "BBBB"
        }
      ]
    }
  }
];

const TabelaProdutos = ({ produtos, history, setProdutos }) => {
  const [ativos, setAtivos] = useState([0]);
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
      <section className="tabela-resultado-consultar-reclamacao-produto">
        <div className="table-grid table-header">
          <div className="table-header-cell">Nome do Produto</div>
          <div className="table-header-cell">Marca</div>
          <div className="table-header-cell">Fabricante</div>
        </div>
        {produtos.map((produto, index) => {
          const terceirizada = produto.ultima_homologacao.rastro_terceirizada;
          const bordas = "";
          const icone = produto ? "angle-up" : "angle-down";
          const logs = ordenaLogs(produto.ultima_homologacao.logs);
          // eslint-disable-next-line no-console
          console.dir(logs);
          const reclamacao = getReclamacao(logs);
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
                  <hr />
                  <div className="grid-detalhe">
                    <div className="grid-detalhe-cell label-empresa">
                      Nome da Escola
                    </div>
                    <div className="grid-detalhe-cell label-empresa">
                      Código EOL
                    </div>
                    <div className="grid-detalhe-cell label-empresa" />
                    <div className="grid-detalhe-cell value-empresa">
                      {terceirizada.nome_fantasia}
                    </div>
                    <div className="grid-detalhe-cell value-empresa">XXXX</div>
                    <div className="grid-detalhe-cell value-empresa" />
                  </div>
                  <div className="grid-detalhe">
                    <div className="grid-detalhe-cell label-empresa">
                      Nome do Reclamante
                    </div>
                    <div className="grid-detalhe-cell label-empresa">
                      RF/CRN/CFN
                    </div>
                    <div className="grid-detalhe-cell label-empresa">Cargo</div>
                    <div className="grid-detalhe-cell value-empresa">
                      {reclamacao.usuario.nome}
                    </div>
                    <div className="grid-detalhe-cell value-empresa">
                      {reclamacao.usuario.registro_funcional || ""}
                    </div>
                    <div className="grid-detalhe-cell value-empresa">
                      {reclamacao.usuario.cargo || ""}
                    </div>
                  </div>
                  <hr />
                  <div className="log-reclamacao">
                    <div className="label-empresa">Reclamação</div>
                    <div className="value-empresa mb-3">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: reclamacao.justificativa
                        }}
                      />
                    </div>
                    <div className="label-empresa">Questionamento CODAE</div>
                    <div className="value-empresa">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: questionamento.justificativa
                        }}
                      />
                    </div>
                  </div>
                  <hr />

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
    setFiltros({ ...formValues, status: ["CODAE_AUTORIZOU_RECLAMACAO"] });
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

        {produtos && produtos.length && (
          <div className="container-tabela">
            <TabelaProdutos
              produtos={produtos}
              setProdutos={setProdutos}
              history={history}
            />
          </div>
        )}
      </div>
    </Spin>
  );
};

export default withRouter(ResponderReclamacaoProduto);
