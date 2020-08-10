import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import HTTP_STATUS from "http-status-codes";
import { STATUS_CODAE_SUSPENDEU } from "configs/constants";
import { Field, reduxForm, formValueSelector } from "redux-form";
import Botao from "../../../Shareable/Botao";
import { BUTTON_TYPE, BUTTON_STYLE } from "../../../Shareable/Botao/constants";
import {
  getHomologacaoProduto,
  getNumeroProtocoloAnaliseSensorial,
  CODAEHomologaProduto,
  CODAENaoHomologaProduto,
  CODAEPedeAnaliseSensorialProduto,
  CODAEPedeCorrecao,
  getReclamacaoDeProduto
} from "../../../../services/produto.service";
import "./style.scss";
import { ToggleExpandir } from "../../../Shareable/ToggleExpandir";
import { Collapse } from "react-collapse";
import {
  formataInformacoesNutricionais,
  produtoEhReclamacao,
  retornaData
} from "./helper";
import { toastSuccess, toastError } from "../../../Shareable/Toast/dialogs";
import { ModalPadrao } from "../../../Shareable/ModalPadrao";
import MotivoDaRecusaDeHomologacao from "components/Shareable/MotivoDaRecusaDeHomologacao";
import MotivoHomologacao from "components/Shareable/MotivoHomologacao";
import {
  stringSeparadaPorVirgulas,
  usuarioEhCODAEGestaoProduto
} from "../../../../helpers/utilities";
import { TIPO_PERFIL } from "../../../../constants/shared";
import { FluxoDeStatus } from "components/Shareable/FluxoDeStatus";
import { fluxoPartindoTerceirizada } from "components/Shareable/FluxoDeStatus/helper";

class HomologacaoProduto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      produto: null,
      uuid: null,
      protocoloAnalise: null,
      showModal: false,
      qualModal: "indeferir",
      status: null,
      reclamacaoProduto: null,
      verificado: false,
      logs: []
    };
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal = () => {
    this.setState({ showModal: false });
  };

  componentDidMount = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    getHomologacaoProduto(uuid).then(response => {
      this.setState({
        produto: response.data.produto,
        informacoesNutricionais: formataInformacoesNutricionais(
          response.data.produto
        ),
        status: response.data.status,
        terceirizada: response.data.rastro_terceirizada,
        uuid,
        logs: response.data.logs
      });
    });
  };

  componentDidUpdate = async () => {
    const { qualModal, protocoloAnalise, produto, verificado } = this.state;
    if (qualModal === "analise" && protocoloAnalise === null) {
      let response = await getNumeroProtocoloAnaliseSensorial();
      this.setState({ protocoloAnalise: response.data });
    }

    if (produto !== null && !verificado) {
      if (produtoEhReclamacao(produto)) {
        produto["eh_reclamacao"] = true;
        const { uuid } = produto.ultima_homologacao;
        let response = await getReclamacaoDeProduto(uuid);
        this.setState({ reclamacaoProduto: response.data });
      } else {
        produto["eh_reclamacao"] = false;
      }
      this.setState({ verificado: true, produto });
    }
  };

  loadHomologacao = () => {
    const { uuid } = this.state;
    getHomologacaoProduto(uuid).then(response => {
      this.setState({
        produto: response.data.produto,
        informacoesNutricionais: formataInformacoesNutricionais(
          response.data.produto
        ),
        status: response.data.status
      });
    });
  };

  activateInformacao(key) {
    let informacoesNutricionais = this.state.informacoesNutricionais;
    informacoesNutricionais[key].active = !informacoesNutricionais[key].active;
    this.forceUpdate();
  }

  onSubmit = () => {
    const { uuid } = this.state;
    CODAEHomologaProduto(uuid).then(response => {
      if (response.status === HTTP_STATUS.OK) {
        toastSuccess("Solicitação de homologado enviada com sucesso");
        this.loadHomologacao(uuid);
      } else {
        toastError(response.data.detail);
      }
    });
  };

  renderFluxo = homologacao => {
    const { logs, status } = homologacao;
    const tipoPerfil = localStorage.getItem("tipo_perfil");
    const ultimoLog = logs[logs.length - 1].status_evento_explicacao;
    if (
      ultimoLog === "CODAE pediu análise sensorial" &&
      tipoPerfil === TIPO_PERFIL.GESTAO_PRODUTO
    ) {
      return (
        <Fragment>
          <FluxoDeStatus
            listaDeStatus={logs}
            fluxo={fluxoPartindoTerceirizada}
          />
          <hr />
        </Fragment>
      );
    } else if (
      status === "CODAE_PENDENTE_HOMOLOGACAO" &&
      [TIPO_PERFIL.GESTAO_PRODUTO, TIPO_PERFIL.TERCEIRIZADA].includes(
        tipoPerfil
      )
    ) {
      return (
        <Fragment>
          <FluxoDeStatus
            listaDeStatus={logs}
            fluxo={fluxoPartindoTerceirizada}
          />
          <hr />
        </Fragment>
      );
    } else {
      return false;
    }
  };

  render() {
    const {
      produto,
      informacoesNutricionais,
      uuid,
      showModal,
      qualModal,
      status,
      terceirizada,
      protocoloAnalise,
      reclamacaoProduto,
      logs
    } = this.state;
    const {
      necessita_analise_sensorial,
      handleSubmit,
      justificativa
    } = this.props;
    const { ultima_homologacao } = produto !== null && produto;
    const ultimoLog = logs !== null && logs[logs.length - 1];
    return (
      <div className="card">
        <div className="card-body">
          {!produto ? (
            <div>Carregando...</div>
          ) : (
            <form
              className="homologacao-produto"
              onSubmit={handleSubmit(this.onSubmit)}
            >
              <ModalPadrao
                showModal={showModal}
                closeModal={this.closeModal}
                toastSuccessMessage={
                  qualModal === "nao-homologar"
                    ? "Solicitação de não homologado enviada com sucesso"
                    : qualModal === "corrigir"
                    ? "Solicitação de correção enviada com sucesso"
                    : "Solicitação de análise sensorial enviada com sucesso"
                }
                modalTitle={
                  qualModal === "nao-homologar"
                    ? "Deseja não homologar (indeferir) este produto?"
                    : qualModal === "corrigir"
                    ? "Deseja solicitar correção do cadastro do produto?"
                    : "Deseja solicitar a análise sensorial do produto?"
                }
                endpoint={
                  qualModal === "nao-homologar"
                    ? CODAENaoHomologaProduto
                    : qualModal === "corrigir"
                    ? CODAEPedeCorrecao
                    : CODAEPedeAnaliseSensorialProduto
                }
                uuid={uuid}
                protocoloAnalise={protocoloAnalise}
                loadSolicitacao={this.loadHomologacao}
                justificativa={justificativa}
                labelJustificativa={
                  qualModal === "analise"
                    ? "Informações Adicionais"
                    : "Justificativa"
                }
                helpText={
                  qualModal === "analise"
                    ? "Solicitamos que seja informado a quantidade e descrição para análise sensorial"
                    : undefined
                }
              />
              {reclamacaoProduto !== null &&
                produto !== null &&
                produto.eh_reclamacao && (
                  <section className="descricao-reclamação">
                    <article className="motivo-data-reclamacao">
                      <div>Motivo da reclamação:</div>
                      <div>Data: {retornaData(reclamacaoProduto)}</div>
                    </article>
                    <article className="box-detalhe-reclamacao">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: reclamacaoProduto.reclamacao
                        }}
                      />
                    </article>
                  </section>
                )}
              {status === STATUS_CODAE_SUSPENDEU && (
                <section className="descricao-suspensao">
                  <article className="motivo-data-suspensao">
                    <div>Motivo da suspensão:</div>
                    <div>Data: {ultimoLog.criado_em.split(" ")[0]}</div>
                  </article>
                  <article className="box-detalhe-suspensao">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: ultimoLog.justificativa
                      }}
                    />
                  </article>
                </section>
              )}

              {!!logs.length && status !== STATUS_CODAE_SUSPENDEU && (
                <Fragment>
                  <MotivoDaRecusaDeHomologacao logs={logs} />
                  <MotivoHomologacao logs={logs} />
                </Fragment>
              )}
              {ultima_homologacao && this.renderFluxo(ultima_homologacao)}
              <div className="title">
                Informação de empresa solicitante (Terceirizada)
              </div>
              <div className="row">
                <div className="col-4 report-label-value">
                  <p>Empresa solicitante (Terceirizada)</p>
                  <p className="value">{terceirizada.nome_fantasia}</p>
                </div>
                <div className="col-4 report-label-value">
                  <p>Telefone</p>
                  <p className="value">{terceirizada.contatos[0].telefone}</p>
                </div>
                <div className="col-4 report-label-value">
                  <p>E-mail</p>
                  <p className="value">{terceirizada.contatos[0].email}</p>
                </div>
              </div>

              <hr />
              <div className="title">Identificação do Produto</div>
              <div className="row">
                <div className="col-12 report-label-value">
                  <p>
                    O produto se destina a alimentação de alunos com dieta
                    especial?
                  </p>
                  <p className="value">
                    {produto.eh_para_alunos_com_dieta ? "SIM" : "NÃO"}
                  </p>
                </div>
              </div>
              {produto.eh_para_alunos_com_dieta && (
                <Fragment>
                  <div className="row">
                    <div className="col-12 report-label-value">
                      <p>Protocolos</p>
                      <p className="value">
                        {stringSeparadaPorVirgulas(produto.protocolos, "nome")}
                      </p>
                    </div>
                  </div>
                </Fragment>
              )}
              <div className="row">
                <div className="col-6 report-label-value">
                  <p>Marca</p>
                  <p className="value">
                    {produto.marca ? produto.marca.nome : "Não possui marca"}
                  </p>
                </div>
                <div className="col-6 report-label-value">
                  <p>Fabricante</p>
                  <p className="value">
                    {produto.fabricante
                      ? produto.fabricante.nome
                      : "Não possui fabricante"}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-12 report-label-value">
                  <p>Componentes do produto</p>
                  <p className="value">
                    {produto.componentes || "Não possui componentes"}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-12 report-label-value">
                  <p>
                    O produto contém ou pode conter ingredientes/aditivos
                    alergênicos?
                  </p>
                  <p className="value">
                    {produto.tem_aditivos_alergenicos ? "SIM" : "NÃO"}
                  </p>
                </div>
              </div>
              {produto.tem_aditivos_alergenicos && (
                <div className="row">
                  <div className="col-12 report-label-value">
                    <p>Quais?</p>
                    <p className="value">
                      {produto.aditivos || "Não possui aditivos"}
                    </p>
                  </div>
                </div>
              )}
              <div className="row">
                <div className="col-5">
                  <div className="card-warning mt-3">
                    <strong>IMPORTANTE:</strong> Relacioná-los conforme dispõe a
                    RDC nº 26 de 02/07/15
                  </div>
                </div>
              </div>
              <hr />
              <div className="title">Informações nutricionais</div>
              <div className="row">
                <div className="col-6 report-label-value">
                  <p>Porção</p>
                  <p className="value">{produto.porcao}</p>
                </div>
                <div className="col-6 report-label-value">
                  <p>Unidade Caseira</p>
                  <p className="value">{produto.unidade_caseira}</p>
                </div>
              </div>
              {informacoesNutricionais &&
                informacoesNutricionais.map((informacao, key) => {
                  return (
                    <div className="pb-2" key={key}>
                      <div className="school-container col-md-12 mr-4">
                        <div className="row pt-2 pb-2 title">
                          <div className="title col-4">{informacao.nome}</div>
                          <div className="col-8 text-right">
                            <ToggleExpandir
                              onClick={() => this.activateInformacao(key)}
                              ativo={informacao.active}
                              className="float-right"
                            />
                          </div>
                        </div>
                        <Collapse isOpened={informacao.active}>
                          <table className="table-informacoes-nutricionais">
                            <thead>
                              <th className="row">
                                <td className="col-4">Título</td>
                                <td className="col-4">Quantidade por porção</td>
                                <td className="col-4">%VD(*)</td>
                              </th>
                            </thead>
                            <tbody>
                              {informacao.valores.map(
                                (informacaoNutricional, key) => {
                                  return (
                                    <tr className="row" key={key}>
                                      <td className="col-4">
                                        {informacaoNutricional.nome}
                                      </td>
                                      <td className="col-4">
                                        <div className="row">
                                          <div className="col-8">
                                            {
                                              informacaoNutricional.quantidade_porcao
                                            }{" "}
                                            {informacaoNutricional.medida}
                                          </div>
                                        </div>
                                      </td>
                                      <td className="col-4">
                                        <div className="row">
                                          <div className="col-8">
                                            {informacaoNutricional.valor_diario}{" "}
                                            %
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                }
                              )}
                            </tbody>
                          </table>
                        </Collapse>
                      </div>
                    </div>
                  );
                })}
              <div className="row">
                <div className="col-10">
                  <div className="card-warning gray mt-3 mb-3">
                    % Valores Diários com base em uma dieta de 2.000 Kcal ou
                    8.400 KJ.
                    <br />
                    Seus valores diários podem ser maiores ou menores dependendo
                    de suas necessidades energéticas. (**) VD não estabelecidos
                  </div>
                </div>
              </div>
              <hr />
              <div className="title">Informação do Produto (classificação)</div>
              <div className="row">
                <div className="col-6 report-label-value">
                  <p>Tipo</p>
                  <p className="value">{produto.tipo || "Sem tipo"}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-6 report-label-value">
                  <p>Embalagem primária</p>
                  <p className="value">
                    {produto.embalagem || "Sem embalagem"}
                  </p>
                </div>
                <div className="col-6 report-label-value">
                  <p>Prazo de validade</p>
                  <p className="value">
                    {produto.prazo_validade || "Sem prazo validade"}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-12 report-label-value">
                  <p>
                    Condições de armazenamento, conservação e prazo máximo para
                    consumo após abertura da embalagem
                  </p>
                  <p className="value">
                    {produto.info_armazenamento ||
                      "Sem informações sobre armazenamento"}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-12 report-label-value">
                  <p>Outras informações que empresa julgar necessário</p>
                  <p className="value">
                    {produto.outras_informacoes || "Sem mais informações"}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-12 report-label-value">
                  <p>Nº de registro do produto de órgão competente</p>
                  <p className="value">
                    {produto.numero_registro || "Registro não encontrado"}
                  </p>
                </div>
              </div>
              <section className="row attachments">
                <div className="col-12 report-label-value">
                  <p>Fotos do produto</p>
                  {produto.imagens.map((anexo, key) => {
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
              </section>
              {usuarioEhCODAEGestaoProduto() &&
                status === "CODAE_PENDENTE_HOMOLOGACAO" && (
                  <div className="link-with-student pt-4">
                    <div className="label">
                      <span className="required-asterisk">*</span>Precisa
                      solicitar análise sensorial?
                    </div>
                    <div className="row">
                      <div className="col-3">
                        <label className="container-radio">
                          Sim
                          <Field
                            component={"input"}
                            type="radio"
                            value="1"
                            name="necessita_analise_sensorial"
                          />
                          <span className="checkmark" />
                        </label>
                      </div>
                      <div className="col-3">
                        <label className="container-radio">
                          Não
                          <Field
                            component={"input"}
                            type="radio"
                            value="0"
                            name="necessita_analise_sensorial"
                          />
                          <span className="checkmark" />
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              {usuarioEhCODAEGestaoProduto() &&
                status === "CODAE_PENDENTE_HOMOLOGACAO" && (
                  <div className="row">
                    <div className="col-12 text-right pt-3">
                      <Botao
                        texto={"Análise"}
                        className="mr-3"
                        type={BUTTON_TYPE.BUTTON}
                        onClick={() =>
                          this.setState({
                            qualModal: "analise",
                            showModal: true
                          })
                        }
                        style={BUTTON_STYLE.GREEN}
                        disabled={
                          !necessita_analise_sensorial ||
                          necessita_analise_sensorial === "0"
                        }
                      />
                      <Botao
                        texto={"Corrigir"}
                        className="mr-3"
                        type={BUTTON_TYPE.BUTTON}
                        style={BUTTON_STYLE.GREEN_OUTLINE}
                        onClick={() =>
                          this.setState({
                            qualModal: "corrigir",
                            showModal: true
                          })
                        }
                      />
                      <Botao
                        texto={"Não homologar"}
                        className="mr-3"
                        onClick={() =>
                          this.setState({
                            qualModal: "nao-homologar",
                            showModal: true
                          })
                        }
                        type={BUTTON_TYPE.BUTTON}
                        style={BUTTON_STYLE.GREEN_OUTLINE}
                        disabled={
                          !necessita_analise_sensorial ||
                          necessita_analise_sensorial === "1"
                        }
                      />
                      <Botao
                        texto={"Homologar"}
                        type={BUTTON_TYPE.SUBMIT}
                        style={BUTTON_STYLE.GREEN_OUTLINE}
                        disabled={
                          !necessita_analise_sensorial ||
                          necessita_analise_sensorial === "1"
                        }
                      />
                    </div>
                  </div>
                )}
            </form>
          )}
        </div>
      </div>
    );
  }
}

const componentNameForm = reduxForm({
  form: "HomologacaoProduto"
})(HomologacaoProduto);
const selector = formValueSelector("HomologacaoProduto");
const mapStateToProps = state => {
  return {
    necessita_analise_sensorial: selector(state, "necessita_analise_sensorial"),
    justificativa: selector(state, "justificativa")
  };
};

export default connect(mapStateToProps)(componentNameForm);
