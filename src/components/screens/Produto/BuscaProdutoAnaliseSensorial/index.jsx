import React, { Component, Fragment } from "react";
import {
  getHomologacoesDeProdutoAnaliseSensorial,
  flegarHomologacaoPDF
} from "../../../../services/produto.service";
import { Paginacao } from "../../../Shareable/Paginacao";
import DetalheProduto from "./components/DetalheProduto";

import "./styles.scss";
import { retornaHomologacoesComContadorDePaginacoes } from "./helpers";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";
import Botao from "components/Shareable/Botao";
import { Link } from "react-router-dom";
import ModalResponderAnaliseSensorial from "./components/ModalResponderAnaliseSensorial";

class BuscaProdutoAnaliseSensorial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homologacoes: [],
      page: 0,
      totalItens: 0,
      showModal: false
    };
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount = async () => {
    const response = await getHomologacoesDeProdutoAnaliseSensorial();

    const arrayHomolog = retornaHomologacoesComContadorDePaginacoes(
      response.data
    );
    this.setState({
      homologacoes: arrayHomolog,
      totalItens: response.data.length
    });
  };

  showItem = ({ uuid }) => {
    let { homologacoes, page } = this.state;
    homologacoes[page].forEach(homolog => {
      if (uuid === homolog.uuid) {
        homolog.ativo = !homolog.ativo;
      } else {
        homolog.ativo = false;
      }
    });
    this.setState({ homologacoes });
  };

  pdfGerado = async ({ uuid }) => {
    let { homologacoes, page } = this.state;
    homologacoes[page].forEach(homolog => {
      if (uuid === homolog.uuid) {
        homolog.pdf_gerado = true;
      }
    });
    this.setState({ homologacoes });
    await flegarHomologacaoPDF(uuid);
  };

  showModal() {
    this.setState({ ...this.state, showModal: true });
  }

  closeModal() {
    this.setState({ ...this.state, showModal: false });
  }

  render() {
    const { homologacoes, page, totalItens, showModal } = this.state;
    return (
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

            {homologacoes.length > 0 &&
              homologacoes[page].map((homologacao, index) => {
                const icone = homologacao.ativo ? "angle-up" : "angle-down";
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
                          onClick={() => this.showItem(homologacao)}
                        />
                      </div>
                    </article>
                    {homologacao.ativo && (
                      <DetalheProduto homologacao={homologacao} />
                    )}
                    {homologacao.ativo && (
                      <article className="rodape-com-botoes">
                        <Botao
                          texto={"Documento de entrega"}
                          type={BUTTON_TYPE.SUBMIT}
                          style={BUTTON_STYLE.GREEN_OUTLINE}
                          onClick={() => this.pdfGerado(homologacao)}
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
                          onClick={() => this.showModal()}
                        />
                      </article>
                    )}
                    <ModalResponderAnaliseSensorial
                      showModal={showModal}
                      closeModal={this.closeModal}
                      homologacao={homologacao}
                    />
                  </Fragment>
                );
              })}
          </section>

          <Paginacao defaultCurrent={1} total={totalItens} pageSize={10} />
        </div>
      </div>
    );
  }
}

export default BuscaProdutoAnaliseSensorial;
