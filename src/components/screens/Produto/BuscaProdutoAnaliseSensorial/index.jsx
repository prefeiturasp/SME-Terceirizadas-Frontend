import React, { Component, Fragment } from "react";
import {
  getHomologacoesDeProdutoAnaliseSensorial,
  flegarHomologacaoPDF
} from "../../../../services/produto.service";
import { Paginacao } from "../../../Shareable/Paginacao";
import DetalheProduto from "./components/DetalheProduto";

import "./styles.scss";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";
import Botao from "components/Shareable/Botao";
import { Link } from "react-router-dom";
import ModalResponderAnaliseSensorial from "./components/ModalResponderAnaliseSensorial";
import { getRelatorioProdutoAnaliseSensorialRecebimento } from "services/relatorios";
import { Spin } from "antd";

class BuscaProdutoAnaliseSensorial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homologacoes: [],
      page: 0,
      uuidHomologacaoAtiva: undefined,
      showModal: false,
      loading: false
    };
    this.pageSize = 3;
  }

  componentDidMount = () => {
    this.refresh();
  };

  pdfGerado = async ({ uuid }) => {
    let { homologacoes } = this.state;
    await flegarHomologacaoPDF(uuid);
    this.setState({
      homologacoes: homologacoes.map(hom => {
        if (hom.uuid === uuid) {
          hom.pdf_gerado = true;
        }
        return hom;
      })
    });
  };

  showModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  ativaDesativaHomologacao = uuid => {
    this.setState({
      uuidHomologacaoAtiva:
        this.state.uuidHomologacaoAtiva === uuid ? undefined : uuid
    });
  };

  homologacoesPaginaAtual = () => {
    const { homologacoes, page } = this.state;
    const pageSize = this.pageSize;
    return homologacoes.slice(page * pageSize, (page + 1) * pageSize);
  };

  refresh = async () => {
    this.setState({ loading: true });
    const response = await getHomologacoesDeProdutoAnaliseSensorial();
    this.setState({
      homologacoes: response.data,
      loading: false
    });
  };

  render() {
    const { showModal, uuidHomologacaoAtiva, loading } = this.state;
    return (
      <Spin tip="Carregando..." spinning={loading}>
        <div className="card">
          <div className="card-body">
            <header className="cabecalho-page">
              Últimas solicitações de análise sensorial recebidas:
            </header>
            <section className="tabela-produtos">
              <article className="item-produto">
                <div>Nome Produto</div>
                <div>Marca</div>
                <div>Fabricante</div>
                <div>Data pedido de análise</div>
                <div>Documento de Entrega</div>
                <div />
              </article>

              {this.homologacoesPaginaAtual().map((homologacao, index) => {
                const homologacaoAtiva =
                  homologacao.uuid === uuidHomologacaoAtiva;
                const icone = homologacaoAtiva ? "angle-up" : "angle-down";
                const produto = homologacao.produto;
                const dataPedido = homologacao.logs[
                  homologacao.logs.length - 1
                ].criado_em.split(" ")[0];
                return (
                  <Fragment key={index}>
                    <article className="item-produto">
                      <div>{produto.nome}</div>
                      <div>{produto.marca.nome}</div>
                      <div>{produto.fabricante.nome}</div>
                      <div>{dataPedido}</div>
                      <div>{homologacao.pdf_gerado ? "PDF Gerado" : ""}</div>
                      <div>
                        <i
                          className={`fas fa-${icone}`}
                          onClick={() =>
                            this.ativaDesativaHomologacao(homologacao.uuid)
                          }
                        />
                      </div>
                    </article>
                    {homologacaoAtiva && (
                      <Fragment>
                        <DetalheProduto homologacao={homologacao} />
                        <article className="rodape-com-botoes">
                          <Botao
                            texto={"Documento de entrega"}
                            type={BUTTON_TYPE.SUBMIT}
                            style={BUTTON_STYLE.GREEN_OUTLINE}
                            onClick={() => {
                              this.pdfGerado(homologacao);
                              getRelatorioProdutoAnaliseSensorialRecebimento(
                                homologacao.produto
                              );
                            }}
                          />
                          <Link
                            to={`/pesquisa-desenvolvimento/relatorio-analise-sensorial?uuid=${
                              homologacao.uuid
                            }`}
                          >
                            <Botao
                              texto="Ver produto"
                              icon={undefined}
                              style={BUTTON_STYLE.GREEN_OUTLINE}
                            />
                          </Link>
                          <Botao
                            texto={"Responder"}
                            type={BUTTON_TYPE.SUBMIT}
                            style={BUTTON_STYLE.GREEN}
                            onClick={this.showModal}
                          />
                        </article>
                      </Fragment>
                    )}
                  </Fragment>
                );
              })}
            </section>

            <ModalResponderAnaliseSensorial
              showModal={showModal}
              closeModal={this.closeModal}
              homologacao={this.state.homologacoes.find(
                hom => hom.uuid === this.state.uuidHomologacaoAtiva
              )}
              onSend={this.refresh}
            />
            <Paginacao
              defaultCurrent={1}
              total={this.state.homologacoes.length}
              pageSize={this.pageSize}
              onChange={page => this.setState({ page: page - 1 })}
            />
          </div>
        </div>
      </Spin>
    );
  }
}

export default BuscaProdutoAnaliseSensorial;
