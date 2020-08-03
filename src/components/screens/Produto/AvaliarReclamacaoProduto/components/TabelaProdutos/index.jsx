import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.scss";

import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";

import ModalJustificativa from "components/Shareable/ModalJustificativa";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import Reclamacao from "components/screens/Produto/Reclamacao/components/Reclamacao";

import { RECLAMACAO_PRODUTO_STATUS } from "constants/shared";
import {
  CODAEAceitaReclamacao,
  CODAERecusaReclamacao,
  CODAEQuestionaTerceirizada,
  CODAERespondeReclamante
} from "services/reclamacaoProduto.service";

const {
  AGUARDANDO_AVALIACAO,
  CODAE_ACEITOU,
  CODAE_RESPONDEU,
  RESPONDIDO_TERCEIRIZADA
} = RECLAMACAO_PRODUTO_STATUS;

export default class TabelaProdutos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indiceProdutoAtivo: undefined,
      mostraModalReclamacao: false,
      uuidReclamacao: undefined,
      acao: undefined,
      mostraModalJustificativa: false
    };
  }

  ACEITAR_RECLAMACAO = "aceitar";
  RECUSAR_RECLAMACAO = "rejeitar";
  QUESTIONAR = "questionar";
  RESPONDER = "responder";

  defineTitulo = () => {
    switch (this.state.acao) {
      case this.ACEITAR_RECLAMACAO:
        return "Aceitar reclamação de produto";
      case this.RECUSAR_RECLAMACAO:
        return "Recusar reclamação de produto";
      case this.QUESTIONAR:
        return "Questionar terceirizada sobre reclamação de produto";
      case this.RESPONDER:
        return "Responder reclamação de produto";
      default:
        return "";
    }
  };

  defineLabelJustificativa = () => {
    switch (this.state.acao) {
      case this.ACEITAR_RECLAMACAO:
      case this.RECUSAR_RECLAMACAO:
        return "Justificativa";
      case this.QUESTIONAR:
        return "Questionamento";
      case this.RESPONDER:
        return "Resposta";
      default:
        return "";
    }
  };

  defineEndpoint = () => {
    switch (this.state.acao) {
      case this.ACEITAR_RECLAMACAO:
        return CODAEAceitaReclamacao;
      case this.RECUSAR_RECLAMACAO:
        return CODAERecusaReclamacao;
      case this.QUESTIONAR:
        return CODAEQuestionaTerceirizada;
      case this.RESPONDER:
        return CODAERespondeReclamante;
      default:
        throw new Error("acao não informada");
    }
  };

  mostraToastSucesso = () => {
    switch (this.state.acao) {
      case this.ACEITAR_RECLAMACAO:
        return toastSuccess(
          "Aceite de reclamação de produto enviado com sucesso"
        );
      case this.RECUSAR_RECLAMACAO:
        return toastSuccess(
          "Recusa de reclamação de produto enviado com sucesso"
        );
      case this.QUESTIONAR:
        return toastSuccess(
          "Questionamento enviado a terceirizada com sucesso"
        );
      case this.RESPONDER:
        return toastSuccess("Reclamação respondida com sucesso");
      default:
        return toastSuccess("Solicitação enviada com sucesso");
    }
  };

  setIndiceProdutoAtivo = indice => {
    this.setState({
      indiceProdutoAtivo:
        this.state.indiceProdutoAtivo === indice ? undefined : indice
    });
  };

  abreModalJustificativa = (acao, uuidReclamacao) => {
    this.setState({
      mostraModalJustificativa: true,
      acao,
      uuidReclamacao
    });
  };

  fechaModalJustificativa = () => {
    this.setState({ mostraModalJustificativa: false });
  };

  onModalJustificativaSubmit = formValues =>
    new Promise(async (resolve, reject) => {
      const { uuidReclamacao } = this.state;
      const endpoint = this.defineEndpoint();
      const response = await endpoint(uuidReclamacao, formValues);
      if (response.status === 200) {
        this.props.atualizar();
        this.fechaModalJustificativa();
        this.mostraToastSucesso();
        resolve();
      } else {
        toastError(response.errors);
        reject(response.errors);
      }
    });

  render() {
    const { listaProdutos } = this.props;
    const { indiceProdutoAtivo, mostraModalJustificativa } = this.state;
    return (
      <section className="resultados-busca-produtos">
        <section>
          <div className="tabela-produto tabela-header-produto">
            <div>Nome do Produto</div>
            <div>Marca</div>
            <div>Tipo</div>
            <div>Qtde. Reclamações</div>
            <div>Data de cadastro</div>
          </div>
        </section>
        {listaProdutos.map((produto, indice) => {
          const isProdutoAtivo = indice === indiceProdutoAtivo;
          const reclamacoesAceitas = produto.ultima_homologacao.reclamacoes.find(
            reclamacao => reclamacao.status === CODAE_ACEITOU
          );
          const produtoTemReclacaoAceita = reclamacoesAceitas !== undefined;
          return (
            <div key={indice}>
              <div className="tabela-produto tabela-body-produto item-produto">
                <div>{produto.nome}</div>
                <div>{produto.marca.nome}</div>
                <div>
                  {produto.eh_para_alunos_com_dieta ? "D. Especial" : "Comum"}
                </div>
                <div>{produto.ultima_homologacao.reclamacoes.length}</div>
                <div className="com-botao">
                  {produto.criado_em.split(" ")[0]}
                  <div className="botoes-produto">
                    <i
                      className={`fas fa-angle-${
                        isProdutoAtivo ? "up" : "down"
                      }`}
                      onClick={() => {
                        this.setIndiceProdutoAtivo(indice);
                      }}
                    />
                  </div>
                </div>
              </div>
              {isProdutoAtivo && (
                <>
                  <div className="botao-reclamacao mt-4">
                    <Link
                      to={`/gestao-produto/relatorio?uuid=${
                        produto.ultima_homologacao.uuid
                      }`}
                    >
                      <Botao
                        texto="Ver produto"
                        className="ml-3"
                        type={BUTTON_TYPE.BUTTON}
                        style={BUTTON_STYLE.GREEN_OUTLINE}
                      />
                    </Link>
                  </div>
                  <hr />
                  {produto.ultima_homologacao.reclamacoes.map(
                    (reclamacao, indice) => {
                      const desabilitaAceitarReclamar =
                        produtoTemReclacaoAceita ||
                        (reclamacao.status !== AGUARDANDO_AVALIACAO &&
                          reclamacao.status !== RESPONDIDO_TERCEIRIZADA);
                      const desabilitaQuestionar =
                        produtoTemReclacaoAceita ||
                        reclamacao.status !== AGUARDANDO_AVALIACAO;
                      const desabilitaResponder =
                        !produtoTemReclacaoAceita ||
                        reclamacao.status === CODAE_RESPONDEU ||
                        (reclamacao.status !== AGUARDANDO_AVALIACAO &&
                          reclamacao.status !== RESPONDIDO_TERCEIRIZADA);
                      const deveMostrarBarraHorizontal =
                        indice <
                        produto.ultima_homologacao.reclamacoes.length - 1;
                      return [
                        <Reclamacao
                          key={0}
                          indice={indice + 1}
                          reclamacao={reclamacao}
                        />,
                        <div key={1} className="botao-reclamacao mt-4">
                          <Botao
                            texto="Responder"
                            className="ml-3"
                            type={BUTTON_TYPE.BUTTON}
                            style={BUTTON_STYLE.GREEN}
                            disabled={desabilitaResponder}
                            onClick={() =>
                              this.abreModalJustificativa(
                                this.RESPONDER,
                                reclamacao.uuid
                              )
                            }
                          />
                          <Botao
                            texto="Questionar Terceirizada"
                            className="ml-3"
                            type={BUTTON_TYPE.BUTTON}
                            style={BUTTON_STYLE.GREEN}
                            disabled={desabilitaQuestionar}
                            onClick={() =>
                              this.abreModalJustificativa(
                                this.QUESTIONAR,
                                reclamacao.uuid
                              )
                            }
                          />
                          <Botao
                            texto="Recusar"
                            className="ml-3"
                            onClick={() =>
                              this.abreModalJustificativa(
                                this.RECUSAR_RECLAMACAO,
                                reclamacao.uuid
                              )
                            }
                            type={BUTTON_TYPE.BUTTON}
                            style={BUTTON_STYLE.GREEN}
                            disabled={desabilitaAceitarReclamar}
                          />
                          <Botao
                            texto="Aceitar"
                            className="ml-3"
                            onClick={() =>
                              this.abreModalJustificativa(
                                this.ACEITAR_RECLAMACAO,
                                reclamacao.uuid
                              )
                            }
                            type={BUTTON_TYPE.BUTTON}
                            style={BUTTON_STYLE.GREEN}
                            disabled={desabilitaAceitarReclamar}
                          />
                        </div>,
                        deveMostrarBarraHorizontal && <hr />
                      ];
                    }
                  )}
                </>
              )}
            </div>
          );
        })}
        <ModalJustificativa
          titulo={this.defineTitulo()}
          labelJustificativa={this.defineLabelJustificativa()}
          showModal={mostraModalJustificativa}
          closeModal={this.fechaModalJustificativa}
          onSubmit={this.onModalJustificativaSubmit}
          comAnexo={
            this.state.acao === this.ACEITAR_RECLAMACAO ||
            this.state.acao === this.RECUSAR_RECLAMACAO
          }
        />
      </section>
    );
  }
}
