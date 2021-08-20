import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.scss";

import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";

import ModalJustificativa from "components/Shareable/ModalJustificativa";
import { ModalPadrao } from "components/Shareable/ModalPadrao";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import Reclamacao from "components/screens/Produto/Reclamacao/components/Reclamacao";
import { getNumeroProtocoloAnaliseSensorial } from "../../../../../../services/produto.service";

import { CODAEPedeAnaliseSensorialProdutoReclamacao } from "../../../../../../services/reclamacaoProduto.service";

import { RECLAMACAO_PRODUTO_STATUS } from "constants/shared";
import {
  CODAEAceitaReclamacao,
  CODAERecusaReclamacao,
  CODAEQuestionaTerceirizada,
  CODAEQuestionaUE,
  CODAEQuestionaNutrisupervisor
} from "services/reclamacaoProduto.service";
import { ordenaPorCriadoEm } from "./helpers";

const {
  AGUARDANDO_AVALIACAO,
  CODAE_ACEITOU,
  CODAE_RECUSOU,
  AGUARDANDO_RESPOSTA_UE,
  RESPONDIDO_UE,
  AGUARDANDO_RESPOSTA_NUTRISUPERVISOR,
  AGUARDANDO_ANALISE_SENSORIAL,
  AGUARDANDO_RESPOSTA_TERCEIRIZADA,
  RESPONDIDO_TERCEIRIZADA,
  ANALISE_SENSORIAL_RESPONDIDA
} = RECLAMACAO_PRODUTO_STATUS;

export default class TabelaProdutos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mostraModalReclamacao: false,
      uuidReclamacao: undefined,
      acao: undefined,
      mostraModalJustificativa: false,
      showModalAnalise: false,
      tipo_resposta: undefined,
      protocoloAnalise: null,
      terceirizada: null,
      escola: null
    };
  }

  ACEITAR_RECLAMACAO = "aceitar";
  RECUSAR_RECLAMACAO = "rejeitar";
  QUESTIONAR_TERCEIRIZADA = "questionar_terceirizada";
  QUESTIONAR_UE = "questionar_ue";
  QUESTIONAR_NUTRISUPERVISOR = "questionar_nutrisupervisor";
  RESPONDER = "responder";

  defineTitulo = () => {
    switch (this.state.acao) {
      case this.QUESTIONAR_TERCEIRIZADA:
        return "Questionar terceirizada sobre reclamação de produto";
      case this.QUESTIONAR_UE:
        return "Questionar Unidade Educacional sobre reclamação de produto";
      case this.QUESTIONAR_NUTRISUPERVISOR:
        return "Questionar Nutrisupervisor sobre reclamação de produto";
      case this.RESPONDER:
        return "Responder reclamação de produto";
      default:
        return "";
    }
  };

  defineLabelJustificativa = () => {
    switch (this.state.acao) {
      case this.QUESTIONAR_TERCEIRIZADA:
        return "Questionamento";
      case this.QUESTIONAR_UE:
        return "Questionamento";
      case this.QUESTIONAR_NUTRISUPERVISOR:
        return "Questionamento";
      case this.RESPONDER:
        return "Justificativa";
      default:
        return "";
    }
  };

  defineEndpoint = () => {
    switch (this.state.acao) {
      case this.QUESTIONAR_TERCEIRIZADA:
        return CODAEQuestionaTerceirizada;
      case this.QUESTIONAR_UE:
        return CODAEQuestionaUE;
      case this.QUESTIONAR_NUTRISUPERVISOR:
        return CODAEQuestionaNutrisupervisor;
      case this.RESPONDER:
        if (this.state.tipo_resposta === this.ACEITAR_RECLAMACAO) {
          return CODAEAceitaReclamacao;
        }
        if (this.state.tipo_resposta === this.RECUSAR_RECLAMACAO) {
          return CODAERecusaReclamacao;
        }
        break;
      default:
        throw new Error("acao não informada");
    }
  };

  mostraToastSucesso = () => {
    switch (this.state.acao) {
      case this.QUESTIONAR_TERCEIRIZADA:
        return toastSuccess(
          "Questionamento enviado a terceirizada com sucesso"
        );
      case this.QUESTIONAR_UE:
        return toastSuccess(
          "Questionamento enviado a unidade educacional com sucesso"
        );
      case this.QUESTIONAR_NUTRISUPERVISOR:
        return toastSuccess("Questionamento enviado com Sucesso!");
      case this.RESPONDER:
        if (this.state.tipo_resposta === this.ACEITAR_RECLAMACAO) {
          return toastSuccess(
            "Aceite de reclamação de produto enviado com sucesso"
          );
        }
        if (this.state.tipo_resposta === this.RECUSAR_RECLAMACAO) {
          return toastSuccess(
            "Recusa de reclamação de produto enviado com sucesso"
          );
        }
        break;
      default:
        return toastSuccess("Solicitação enviada com sucesso");
    }
  };

  abreModalJustificativa = (
    acao,
    uuidReclamacao,
    produto,
    terceirizada = null,
    escola = null
  ) => {
    this.setState({
      mostraModalJustificativa: true,
      acao,
      uuidReclamacao,
      produto,
      terceirizada: terceirizada,
      escola: escola
    });
  };

  fechaModalJustificativa = () => {
    this.setState({ mostraModalJustificativa: false });
  };

  abreModalAnalise = async uuidReclamacao => {
    let response = await getNumeroProtocoloAnaliseSensorial();
    this.setState({
      showModalAnalise: true,
      protocoloAnalise: response.data,
      uuidReclamacao: uuidReclamacao
    });
  };

  closeModalAnalise = () => {
    this.setState({ showModalAnalise: false });
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
      this.props.setLoading(false);
    });

  render() {
    const {
      listaProdutos,
      indiceProdutoAtivo,
      setIndiceProdutoAtivo,
      terceirizadas
    } = this.props;
    const {
      mostraModalJustificativa,
      showModalAnalise,
      protocoloAnalise,
      escola,
      terceirizada
    } = this.state;
    return (
      <section className="resultados-busca-produtos mb-3">
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
                        setIndiceProdutoAtivo(
                          indice === indiceProdutoAtivo ? undefined : indice
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
              {isProdutoAtivo && (
                <div className="container">
                  <div className="botao-ver-produto mt-4">
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
                  {produto.ultima_homologacao.reclamacoes
                    .sort(ordenaPorCriadoEm)
                    .map((reclamacao, indice) => {
                      const desabilitaQuestionar =
                        produtoTemReclacaoAceita ||
                        ![
                          AGUARDANDO_AVALIACAO,
                          RESPONDIDO_TERCEIRIZADA,
                          ANALISE_SENSORIAL_RESPONDIDA,
                          RESPONDIDO_UE
                        ].includes(reclamacao.status);
                      const desabilitaResponder =
                        produtoTemReclacaoAceita ||
                        [
                          CODAE_ACEITOU,
                          CODAE_RECUSOU,
                          AGUARDANDO_ANALISE_SENSORIAL
                        ].includes(reclamacao.status);
                      const desabilitarAnalise =
                        produtoTemReclacaoAceita ||
                        ![
                          AGUARDANDO_AVALIACAO,
                          RESPONDIDO_TERCEIRIZADA,
                          ANALISE_SENSORIAL_RESPONDIDA,
                          RESPONDIDO_UE
                        ].includes(reclamacao.status);
                      const desabilitaQuestionarUE =
                        produtoTemReclacaoAceita ||
                        reclamacao.status ===
                          AGUARDANDO_RESPOSTA_TERCEIRIZADA ||
                        reclamacao.status === AGUARDANDO_RESPOSTA_UE ||
                        reclamacao.status === AGUARDANDO_ANALISE_SENSORIAL ||
                        reclamacao.status === CODAE_RECUSOU ||
                        reclamacao.status ===
                          AGUARDANDO_RESPOSTA_NUTRISUPERVISOR;
                      const desabilitaQuestionarNutrisupervisao =
                        produtoTemReclacaoAceita ||
                        reclamacao.status ===
                          AGUARDANDO_RESPOSTA_TERCEIRIZADA ||
                        reclamacao.status === AGUARDANDO_RESPOSTA_UE ||
                        reclamacao.status === AGUARDANDO_ANALISE_SENSORIAL ||
                        reclamacao.status === CODAE_RECUSOU ||
                        reclamacao.status ===
                          AGUARDANDO_RESPOSTA_NUTRISUPERVISOR;
                      const deveMostrarBarraHorizontal =
                        indice <
                        produto.ultima_homologacao.reclamacoes.length - 1;
                      return [
                        <Reclamacao key={0} reclamacao={reclamacao} />,
                        <div key={1}>
                          <p className="botao-reclamacao-title">
                            Questionamentos
                          </p>
                        </div>,
                        <div key={2} className="botao-reclamacao mt-4">
                          <Botao
                            texto="Questionar Terceirizada"
                            type={BUTTON_TYPE.BUTTON}
                            style={BUTTON_STYLE.GREEN_OUTLINE}
                            disabled={desabilitaQuestionar}
                            onClick={() =>
                              this.abreModalJustificativa(
                                this.QUESTIONAR_TERCEIRIZADA,
                                reclamacao.uuid,
                                produto,
                                reclamacao.escola.lote
                                  ? reclamacao.escola.lote.terceirizada
                                  : null
                              )
                            }
                          />
                          {reclamacao.usuario &&
                            reclamacao.usuario.tipo_usuario ===
                              "supervisao_nutricao" && (
                              <Botao
                                texto="Questionar nutricionista supervisor"
                                className="ml-3"
                                type={BUTTON_TYPE.BUTTON}
                                style={BUTTON_STYLE.GREEN_OUTLINE}
                                disabled={desabilitaQuestionarNutrisupervisao}
                                onClick={() =>
                                  this.abreModalJustificativa(
                                    this.QUESTIONAR_NUTRISUPERVISOR,
                                    reclamacao.uuid,
                                    produto,
                                    null,
                                    reclamacao.escola
                                  )
                                }
                              />
                            )}
                          <Botao
                            texto="Questionar U.E"
                            className="ml-3"
                            type={BUTTON_TYPE.BUTTON}
                            style={BUTTON_STYLE.GREEN_OUTLINE}
                            disabled={desabilitaQuestionarUE}
                            onClick={() =>
                              this.abreModalJustificativa(
                                this.QUESTIONAR_UE,
                                reclamacao.uuid,
                                produto,
                                null,
                                reclamacao.escola
                              )
                            }
                          />
                        </div>,
                        <div key={3}>
                          <p className="botao-reclamacao-title">
                            Solicitar análise e resposta
                          </p>
                        </div>,
                        <div key={4} className="botao-reclamacao mt-4">
                          <Botao
                            texto="Solicitar análise sensorial"
                            className="mr-3"
                            type={BUTTON_TYPE.BUTTON}
                            style={BUTTON_STYLE.GREEN_OUTLINE}
                            onClick={() =>
                              this.abreModalAnalise(reclamacao.uuid)
                            }
                            disabled={desabilitarAnalise}
                          />
                          <Botao
                            texto="Responder"
                            className="ml-3 botaoResponder"
                            type={BUTTON_TYPE.BUTTON}
                            style={BUTTON_STYLE.GREEN}
                            disabled={desabilitaResponder}
                            onClick={() =>
                              this.abreModalJustificativa(
                                this.RESPONDER,
                                reclamacao.uuid,
                                produto
                              )
                            }
                          />
                        </div>,
                        deveMostrarBarraHorizontal && <hr />
                      ];
                    })}
                </div>
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
          state={this.state}
          comAnexo={this.state.acao === this.RESPONDER}
          terceirizada={terceirizada}
          escola={escola}
        />
        <ModalPadrao
          showModal={showModalAnalise}
          closeModal={this.closeModalAnalise}
          toastSuccessMessage="Solicitação de análise sensorial enviada com sucesso"
          modalTitle="Deseja solicitar a análise sensorial do produto?"
          endpoint={CODAEPedeAnaliseSensorialProdutoReclamacao}
          uuid={this.state.uuidReclamacao}
          protocoloAnalise={protocoloAnalise}
          loadSolicitacao={() => this.props.atualizar()}
          terceirizadas={terceirizadas}
          eAnalise={true}
          labelJustificativa="Informações Adicionais"
          helpText="Solicitamos que seja informado a quantidade e descrição para análise sensorial"
        />
      </section>
    );
  }
}
