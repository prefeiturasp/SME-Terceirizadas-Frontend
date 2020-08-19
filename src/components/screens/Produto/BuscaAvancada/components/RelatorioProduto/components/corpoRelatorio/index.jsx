import React, { Component, Fragment } from "react";
import { FluxoDeStatus } from "components/Shareable/FluxoDeStatus";
import { fluxoPartindoTerceirizada } from "components/Shareable/FluxoDeStatus/helper";
import "../styles.scss";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
  BUTTON_ICON
} from "components/Shareable/Botao/constants";
import MotivoDaRecusaDeHomologacao from "components/Shareable/MotivoDaRecusaDeHomologacao";
import MotivoSuspensao from "components/Shareable/MotivoSuspensao";

import "antd/dist/antd.css";
import { Modal } from "antd";
import { getRelatorioProduto } from "services/relatorios";

export default class CorpoRelatorio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      informacoes: [],
      visible: false,
      logs: [],
      logSelecionado: null
    };
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({
      visible: false
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  componentWillMount() {
    let { informacoesNutricionais, produto } = this.props;
    const { informacoes } = this.state;

    let informacoesFormatadas = [];
    informacoesNutricionais.forEach(item => {
      let dict = {
        nome: item.nome,
        ativo: item.ativo,
        informacoes: []
      };
      item.informacoes_nutricionais.forEach(info => {
        produto.informacoes_nutricionais.forEach(prodInfo => {
          if (info.uuid === prodInfo.informacao_nutricional.uuid) {
            dict.informacoes.push({
              nome: info.nome,
              uuid: info.uuid,
              medida: `${prodInfo.quantidade_porcao} ${info.medida}`,
              valor: `${prodInfo.valor_diario} %`
            });
          } else {
            dict.informacoes.push({
              nome: info.nome,
              uuid: info.uuid,
              medida: `**** ${info.medida}`,
              valor: `**** %`
            });
          }
        });
      });
      informacoesFormatadas.push(dict);
    });

    if (informacoes.length === 0) {
      const logs = produto.todos_logs;
      this.setState({ informacoes: informacoesFormatadas, logs });
    }
  }

  renderInformacaoNutricional = (indice, ativo) => {
    let { informacoes } = this.state;
    informacoes[indice].ativo = !ativo;
    this.setState({ informacoes });
  };

  itemLogAtivo = (index, ativo) => {
    let { logs, logSelecionado } = this.state;
    logs.forEach(log => {
      log.ativo = false;
    });
    if (!ativo) {
      logs[index].ativo = !ativo;
      logSelecionado = logs[index];
    } else {
      logSelecionado = null;
    }

    this.setState({ logs, logSelecionado });
  };

  retornaIniciais = log => {
    const nome = log.usuario.nome.split(" ");
    let iniciais = "";
    nome.forEach((n, index) => {
      if (index <= 1) {
        iniciais = iniciais.concat(n.charAt(0)).toUpperCase();
      }
    });
    return iniciais;
  };

  render() {
    const { produto, historico } = this.props;
    const { informacoes, logs, logSelecionado } = this.state;
    return (
      <section className="corpo-reatorio-produto">
        <article className="flex-botoes-relatorio">
          <Botao
            type={BUTTON_TYPE.BUTTON}
            style={BUTTON_STYLE.BLUE}
            icon={BUTTON_ICON.PRINT}
            onClick={() => {
              getRelatorioProduto(produto);
            }}
            className="mr-2"
          />
          <Botao
            type={BUTTON_TYPE.BUTTON}
            texto="historico"
            style={BUTTON_STYLE.GREEN_OUTLINE}
            onClick={this.showModal}
          />
        </article>
        {!!logs.length && (
          <>
            <MotivoDaRecusaDeHomologacao logs={historico.logs || []} />
            <MotivoSuspensao logs={historico.logs || []} />
          </>
        )}
        <header>
          <div className="label-relatorio">Nome do produto</div>
          <div className="label-relatorio">Marca</div>
          <div className="label-relatorio">Tipo</div>
          <div className="label-relatorio">Data</div>

          <div className="value-relatorio">{produto.nome}</div>
          <div className="value-relatorio">{produto.marca.nome}</div>
          <div className="value-relatorio">
            {produto.eh_para_alunos_com_dieta ? "DIETA ESPECIAL" : "COMUM"}
          </div>
          <div className="value-relatorio">
            {produto.criado_em.split(" ")[0]}
          </div>
        </header>
        <article>
          <hr />
          <FluxoDeStatus
            listaDeStatus={historico.logs}
            fluxo={fluxoPartindoTerceirizada}
          />
          <hr />
        </article>
        <article className="informacoes-gerais">
          <div className="header-informacao">
            Informação de empresa solicitante (Terceirizada)
          </div>
          <div className="grid-empresa-info">
            <div className="label-relatorio">
              {" "}
              Empresa solicitante (Terceirizada)
            </div>
            <div className="label-relatorio">Telefone </div>
            <div className="label-relatorio">E-mail</div>
            <div className="value-relatorio">
              {produto.ultima_homologacao.rastro_terceirizada.nome_fantasia}
            </div>
            <div className="value-relatorio">
              {
                produto.ultima_homologacao.rastro_terceirizada.contatos[0]
                  .telefone
              }
            </div>
            <div className="value-relatorio">
              {produto.ultima_homologacao.rastro_terceirizada.contatos[0].email}
            </div>
          </div>
        </article>
        <hr />
        <article className="informacoes-gerais">
          <div className="header-informacao">Identificação do Produto</div>
          <div className="info-sem-grid">
            <div className="label-relatorio">
              O produto se destina a alimentação de alunos com dieta especial?
            </div>
            <div className="value-relatorio">
              {produto.eh_para_alunos_com_dieta ? "SIM" : "NÃO"}
            </div>
          </div>

          <div className="grid-marca-fabricante-info info-sem-grid">
            <div className="label-relatorio">Marca</div>
            <div className="label-relatorio">Fabricante</div>
            <div className="value-relatorio">{produto.marca.nome}</div>
            <div className="value-relatorio">{produto.fabricante.nome}</div>
          </div>

          <div className="info-sem-grid">
            <div className="label-relatorio">Compoentes do produto</div>
            <div className="value-relatorio">{produto.componentes}</div>
          </div>

          <div className="info-sem-grid">
            <div className="label-relatorio">
              {" "}
              O produto contém ou pode conter ingredientes/aditivos alergênicos?
            </div>
            <div className="value-relatorio">
              {produto.tem_aditivos_alergenicos ? "SIM" : "NÃO"}
            </div>
          </div>

          <div className="info-sem-grid">
            <div className="informativo-importante">
              IMPORTANTE: Relacioná-los conforme dispõe a RDC nº 26 de 02/07/15
            </div>
          </div>
        </article>
        <hr />
        <article className="informacoes-gerais">
          <div className="header-informacao">Informações nutricionais</div>

          <div className="grid-marca-fabricante-info info-sem-grid">
            <div className="label-relatorio">Porção</div>
            <div className="label-relatorio">Unidade caseira</div>
            <div className="value-relatorio">{produto.porcao}</div>
            <div className="value-relatorio">{produto.unidade_caseira}</div>
          </div>

          <div className="listagem-proteinas">
            {informacoes.map((informacao, index) => {
              const icone = informacao.ativo ? "angle-up" : "angle-down";
              const ativo = informacao.ativo;
              return (
                <Fragment key={index}>
                  <nav
                    key={index}
                    className="item-listagem"
                    onClick={() => {
                      this.renderInformacaoNutricional(index, ativo);
                    }}
                  >
                    <div className="header-listagem">
                      <div className="descricao-proteina">
                        {informacao.nome}
                      </div>
                      <i className={`fas fa-${icone}`} />
                    </div>
                  </nav>
                  {informacao.ativo && (
                    <Fragment>
                      <div className="detalhe-item-listagem">
                        <div />
                        <div className="header-item-detalhe">MEDIDA</div>
                        <div className="header-item-detalhe">% VD</div>
                      </div>
                      <div key={index} className="corpo-itens-listagem">
                        {informacao.informacoes.map((info, index) => {
                          return (
                            <div className="detalhe-item-listagem" key={index}>
                              <div>{info.nome}</div>
                              <div>{info.medida}</div>
                              <div>{info.valor}</div>
                            </div>
                          );
                        })}
                      </div>
                    </Fragment>
                  )}
                </Fragment>
              );
            })}
          </div>

          <div className="aviso-importante-nutricional">
            IMPORTANTE: * % VD com base em uma dieta de 2.000 Kcal ou 8.400 KJ.
            Seus valores diários podem ser maiores ou menores dependendo de suas
            necessidades energéticas. (**) VD não estabelecidos
          </div>
        </article>
        <hr />
        <article className="informacoes-gerais">
          <div className="header-informacao">
            Informação do Produto (classificação)
          </div>

          <div className="info-sem-grid">
            <div className="label-relatorio">Tipo</div>
            <div className="value-relatorio">{produto.tipo}</div>
          </div>

          <div className="grid-marca-fabricante-info info-sem-grid">
            <div className="label-relatorio">Embalagem primária</div>
            <div className="label-relatorio">Prazo de validade</div>
            <div className="value-relatorio">{produto.tipo}</div>
            <div className="value-relatorio">{produto.prazo_validade}</div>
          </div>

          <div className="info-sem-grid">
            <div className="label-relatorio">
              Condições de armazenamento, conservação e prazo máximo para
              consumo após abertura da embalagem
            </div>
            <div className="value-relatorio">{produto.info_armazenamento}</div>
          </div>

          <div className="info-sem-grid">
            <div className="label-relatorio">
              Outras informações que empresa julgar necessário
            </div>
            <div className="value-relatorio">{produto.outras_informacoes}</div>
          </div>

          <div className="info-sem-grid">
            <div className="label-relatorio">
              Nº de registro do produto de órgão competente
            </div>
            <div className="value-relatorio">{produto.numero_registro}</div>
          </div>
        </article>

        <hr />

        <article className="informacoes-gerais">
          <div className="header-informacao label-relatorio">
            Foto do produto
          </div>

          <div>
            {produto.imagens.map((imagem, index) => {
              return (
                <div key={index}>
                  <a
                    href={imagem.arquivo}
                    className="value-important link"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {`Anexo ${index + 1}`}
                  </a>
                </div>
              );
            })}
          </div>
        </article>
        <hr />

        <article className="informacoes-gerais">
          {historico.logs.map((log, index) => {
            const tipoUsuario =
              log.usuario.tipo_usuario === "terceirizada"
                ? "TERCEIRIZADA"
                : "CODAE";
            const justificativa =
              log.justificativa === ""
                ? "SEM JUSTIFICATIVA"
                : log.justificativa;
            return (
              <Fragment key={index}>
                <div className="label-relatorio">
                  {log.status_evento_explicacao}
                </div>
                <div className="log-justificativa">
                  <div className="value-relatorio">{log.criado_em}</div>
                  <div className="spaco-log value-relatorio">{" - "}</div>
                  <div className="value-relatorio">{`${tipoUsuario}`}</div>
                </div>
                <div className="info-sem-grid justificativa-logs">
                  <div className="label-relatorio">Justificativa</div>
                  <div className="value-relatorio">
                    <p
                      className="value"
                      dangerouslySetInnerHTML={{
                        __html: justificativa
                      }}
                    />
                  </div>
                </div>
              </Fragment>
            );
          })}
        </article>

        <div>
          <Modal
            title="Histórico"
            visible={this.state.visible}
            onOk={this.handleOk}
            okText={"Fechar"}
            onCancel={this.handleCancel}
            width={800}
            maskClosable={false}
          >
            <section className="body-modal-produto">
              <div>Usuario</div>
              <div>Ações</div>
              <article className="list-logs">
                <section className="body-logs">
                  {logs.map((log, index) => {
                    const { ativo } = log;
                    const iniciais = this.retornaIniciais(log);
                    const tipoUsuario =
                      log.usuario.tipo_usuario === "terceirizada"
                        ? "TERCEIRIZADA"
                        : "CODAE";

                    return (
                      <div
                        key={index}
                        className={`${ativo && "ativo-item"} grid-item-log`}
                        onClick={() => {
                          this.itemLogAtivo(index, ativo);
                        }}
                      >
                        <div className="usuario">
                          <div>{iniciais}</div>
                        </div>
                        <div className="descricao">
                          <div className="descicao-titulo">
                            {log.status_evento_explicacao}
                          </div>
                          <div className="descicao-entidade">{tipoUsuario}</div>
                        </div>
                        <div className="descricao">
                          <div className="hora">
                            {log.criado_em.split(" ")[0]}
                          </div>
                          <div className="hora">
                            {log.criado_em.split(" ")[1]}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </section>
              </article>
              <article className="detail-log">
                <div />

                <div>
                  <header>
                    <div />
                    {logSelecionado !== null ? (
                      <div className="descricao-do-log">
                        <div className="header-log">
                          <div className="usuario">
                            <div>{this.retornaIniciais(logSelecionado)}</div>
                          </div>
                          <div className="nome-fantasia-empresa">
                            {logSelecionado.empresa}
                          </div>
                          <div>
                            <div>{logSelecionado.criado_em.split(" ")[0]}</div>
                            <div>{logSelecionado.criado_em.split(" ")[1]}</div>
                          </div>
                        </div>
                        <div className="body-log-item">
                          <header>
                            {logSelecionado.status_evento_explicacao}
                          </header>
                          <section>
                            <article>
                              <div>
                                RF: {logSelecionado.usuario.registro_funcional}
                              </div>
                              <div className="criado-em">
                                <div>Data:</div>
                                <div>
                                  {logSelecionado.criado_em.split(" ")[0]}
                                </div>
                              </div>
                            </article>
                            <article>
                              <div>Justificativa:</div>
                              <div>
                                {logSelecionado.justificativa === ""
                                  ? "SEM JUSTIFICATIVA"
                                  : logSelecionado.justificativa}
                              </div>
                            </article>
                          </section>
                        </div>
                      </div>
                    ) : (
                      <div />
                    )}
                  </header>
                </div>
              </article>
            </section>
          </Modal>
        </div>
      </section>
    );
  }
}
