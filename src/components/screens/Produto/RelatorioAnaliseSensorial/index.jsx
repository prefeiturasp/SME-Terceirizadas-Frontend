import React, { Component } from "react";
import {
  getHomologacao,
  getInformacoesGrupo
} from "../../../../services/produto.service";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
  BUTTON_ICON
} from "components/Shareable/Botao/constants";
import Botao from "components/Shareable/Botao";
import "./styles.scss";
import { Fragment } from "react";
import ModalResponderAnaliseSensorial from "../BuscaProdutoAnaliseSensorial/components/ModalResponderAnaliseSensorial";
import { getRelatorioProdutoAnaliseSensorial } from "services/relatorios";

class RelatorioAnaliseSensorial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homologacao: null,
      informacoes: null,
      showModal: false
    };
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    const responseHomolog = await getHomologacao(uuid);
    const responseInformacoes = await getInformacoesGrupo();

    const produto = responseHomolog.data.produto;

    produto.informacoes_nutricionais.forEach(item => {
      responseInformacoes.data.results.forEach(itemInfo => {
        itemInfo.informacoes_nutricionais.forEach(informacao => {
          informacao["ativo"] = false;
          if (item.informacao_nutricional.uuid === informacao.uuid) {
            informacao["quantidade_porcao"] = item.quantidade_porcao;
            informacao["valor_diario"] = item.valor_diario;
          } else {
            informacao["quantidade_porcao"] = "***";
            informacao["valor_diario"] = "***";
          }
        });
      });
    });

    this.setState({
      homologacao: responseHomolog.data,
      informacoes: responseInformacoes.data.results
    });
  };

  showModal() {
    this.setState({ ...this.state, showModal: true });
  }

  closeModal() {
    this.setState({ ...this.state, showModal: false });
  }

  retornaDataSolicitacao = ({ logs }) => {
    return logs[logs.length - 1].criado_em.split(" ")[0];
  };

  showItem = ({ nome }) => {
    let { informacoes } = this.state;
    informacoes.forEach(info => {
      if (info.nome === nome) {
        info.ativo = !info.ativo;
      }
    });
    this.setState({ informacoes });
  };

  exibir_protocolo_dieta = (protocolo, posicao, lista) => {
    const ultimo_item = lista.length === posicao + 1;
    return (
      <b>
        {protocolo.nome}
        {ultimo_item ? "." : "; "}
      </b>
    );
  };

  render() {
    const { homologacao, informacoes, showModal } = this.state;
    const justificativa =
      homologacao &&
      homologacao.logs[homologacao.logs.length - 1].justificativa;
    return (
      <div className="card">
        <div className="card-body">
          {homologacao !== null && (
            <article>
              <div className="row">
                <div className="row col-10 ml-0">
                  <div className="col-6 pl-0">
                    <p className="text-muted">
                      Solicitação de análise sensorial
                    </p>
                  </div>
                  <div className="col-6">
                    <p>
                      <span className="text-muted">
                        Protocolo Análise Sensorial:
                      </span>{" "}
                      {homologacao.protocolo_analise_sensorial}
                    </p>
                  </div>

                  <section className="texto-wysiwyg row col-12 ml-0">
                    <div className="col-12">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: justificativa
                        }}
                      />
                    </div>
                  </section>
                </div>

                <div className="col-2 a-flex">
                  <Botao
                    type={BUTTON_TYPE.BUTTON}
                    titulo="imprimir"
                    style={BUTTON_STYLE.BLUE}
                    icon={BUTTON_ICON.PRINT}
                    onClick={() => {
                      getRelatorioProdutoAnaliseSensorial(homologacao.produto);
                    }}
                  />
                  <Botao
                    texto={"Responder"}
                    type={BUTTON_TYPE.SUBMIT}
                    style={BUTTON_STYLE.GREEN}
                    onClick={() => this.showModal()}
                    className="ml-2"
                  />
                </div>
              </div>
              <hr />
            </article>
          )}

          {homologacao !== null ? (
            <section>
              <article className="quatro-colunas">
                <div>
                  <label>Nome Produto</label>
                  <p>{homologacao.produto.nome}</p>
                </div>

                <div>
                  <label>Marca</label>
                  <p>{homologacao.produto.marca.nome}</p>
                </div>

                <div>
                  <label>Fabricante</label>
                  <p>{homologacao.produto.fabricante.nome}</p>
                </div>

                <div>
                  <label>Data pedido de análise</label>
                  <p>{this.retornaDataSolicitacao(homologacao)}</p>
                </div>
              </article>

              <hr />

              <article>
                <header>
                  Informação de empresa solicitante (Terceirizada)
                </header>

                <section className="tres-colunas">
                  <div>
                    <label>Empresa solicitante (Terceirizada)</label>
                    <p>{homologacao.rastro_terceirizada.nome_fantasia}</p>
                  </div>

                  <div>
                    <label>Telefone</label>
                    <p>
                      {homologacao.rastro_terceirizada.contatos[0].telefone}
                    </p>
                  </div>

                  <div>
                    <label>E-mail</label>
                    <p>{homologacao.rastro_terceirizada.contatos[0].email}</p>
                  </div>
                </section>
              </article>

              <hr />

              <article>
                <header>Identificação do Produto</header>

                <section className="duas-colunas">
                  <div>
                    <label>
                      O produto se destina a alimentação de alunos com dieta
                      especial?
                    </label>
                    <p>
                      {homologacao.produto.eh_para_alunos_com_dieta
                        ? "SIM"
                        : "NÃO"}
                    </p>
                  </div>

                  {homologacao.produto.eh_para_alunos_com_dieta && (
                    <div>
                      <label>Nome dos protocolos de dieta especial</label>
                      {homologacao.produto.protocolos.map(
                        this.exibir_protocolo_dieta
                      )}
                    </div>
                  )}
                </section>

                <section className="duas-colunas">
                  <div>
                    <label>Marca</label>
                    <p>{homologacao.produto.marca.nome}</p>
                  </div>

                  <div>
                    <label>Fabricante</label>
                    <p>{homologacao.produto.fabricante.nome}</p>
                  </div>
                </section>

                <section>
                  <div>
                    <label>Componentes do produto</label>
                    <p>{homologacao.produto.componentes}</p>
                  </div>
                </section>

                <section>
                  <div>
                    <label>
                      O produto contém ou pode conter ingredientes/aditivos
                      alergênicos?
                    </label>
                    <p>
                      {homologacao.produto.tem_aditivos_alergenicos
                        ? "SIM"
                        : "NÃO"}
                    </p>
                  </div>
                </section>

                {homologacao.produto.tem_aditivos_alergenicos && (
                  <section>
                    <div>
                      <label>Quais?</label>
                      <p>{homologacao.produto.aditivos}</p>
                    </div>
                  </section>
                )}

                <section className="duas-colunas">
                  <div className="aviso-importante">
                    IMPORTANTE: Relacioná-los conforme dispõe a RDC nº 26 de
                    02/07/15
                  </div>

                  <div />
                </section>
              </article>

              <hr />

              <article>
                <header>Informações nutricionais</header>

                <section className="duas-colunas">
                  <div>
                    <label>Porção</label>
                    <p>{homologacao.produto.porcao}</p>
                  </div>

                  <div>
                    <label>Unidade caseira</label>
                    <p>{homologacao.produto.unidade_caseira}</p>
                  </div>
                </section>

                <section>
                  {informacoes !== null &&
                    informacoes.map((informacao, index) => {
                      const icone = informacao.ativo
                        ? "angle-up"
                        : "angle-down";
                      return (
                        <Fragment key={index}>
                          <div className="item-informacao-principal">
                            <div>{informacao.nome}</div>
                            <i
                              className={`fas fa-${icone}`}
                              onClick={() => this.showItem(informacao)}
                            />
                          </div>
                          {informacao.ativo && (
                            <div className="informacao-detalhe">
                              <div className="item-detalhe">
                                <div>DESCRICAO</div>
                                <div>PORÇÃO</div>
                                <div>VD%</div>
                              </div>
                              {informacao.informacoes_nutricionais.map(
                                (info, index) => {
                                  return (
                                    <div key={index} className="item-detalhe">
                                      <div>{info.nome}</div>
                                      <div>
                                        {info.quantidade_porcao} {info.medida}
                                      </div>
                                      <div>
                                        {info.valor_diario}
                                        {" %"}
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          )}
                        </Fragment>
                      );
                    })}
                </section>

                <section className="duas-colunas">
                  <div className="aviso-importante-info">
                    IMPORTANTE: * % VD com base em uma dieta de 2.000 Kcal ou
                    8.400 KJ. Seus valores diários podem ser maiores ou menores
                    dependendo de suas necessidades energéticas. (**) VD não
                    estabelecidos
                  </div>

                  <div />
                </section>
              </article>

              <hr />

              <article>
                <header>Informação do Produto (classificação)</header>
                <section>
                  <div>
                    <label>Tipo</label>
                    <p>{homologacao.produto.tipo}</p>
                  </div>
                </section>

                <section className="duas-colunas">
                  <div>
                    <label>Embalagem primária</label>
                    <p>{homologacao.produto.embalagem}</p>
                  </div>

                  <div>
                    <label>Prazo de validade</label>
                    <p>{homologacao.produto.prazo_validade}</p>
                  </div>
                </section>

                <section>
                  <div>
                    <label>
                      Condições de armazenamento, conservação e prazo máximo
                      para consumo após abertura da embalagem{" "}
                    </label>
                    <p>{homologacao.produto.info_armazenamento}</p>
                  </div>
                </section>

                <section>
                  <div>
                    <label>
                      Outras informações que empresa julgar necessário
                    </label>
                    <p>{homologacao.produto.outras_informacoes}</p>
                  </div>
                </section>

                <section>
                  <div>
                    <label>Nº de registro do produto de órgão competente</label>
                    <p>{homologacao.produto.numero_registro}</p>
                  </div>
                </section>
              </article>

              <hr />

              <article>
                <section>
                  <div>
                    <label>Anexo</label>
                    <div>
                      {homologacao.produto.imagens.map((anexo, key) => {
                        return (
                          <div key={key}>
                            <a
                              href={anexo.arquivo}
                              className="value-important link"
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              {`Anexo ${key + 1}`}
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>
              </article>
            </section>
          ) : (
            <div> Carregando...</div>
          )}
          <ModalResponderAnaliseSensorial
            showModal={showModal}
            closeModal={this.closeModal}
            homologacao={homologacao}
          />
        </div>
      </div>
    );
  }
}

export default RelatorioAnaliseSensorial;
