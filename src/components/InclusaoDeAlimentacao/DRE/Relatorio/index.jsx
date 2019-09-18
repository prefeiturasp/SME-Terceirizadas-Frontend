import React, { Component } from "react";
import HTTP_STATUS from "http-status-codes";
import { reduxForm } from "redux-form";
import { Link, Redirect } from "react-router-dom";
import { prazoDoPedidoMensagem, corDaMensagem } from "./helper";
import { Botao } from "../../../Shareable/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
  BUTTON_TYPE
} from "../../../Shareable/Botao/constants";
import { DRE, INCLUSAO_ALIMENTACAO } from "../../../../configs/constants";
import { FluxoDeStatus } from "../../../Shareable/FluxoDeStatus";
import { ModalRecusarSolicitacao } from "../../../Shareable/ModalRecusarSolicitacao";
import {
  getInclusaoDeAlimentacaoAvulsa,
  DREConfirmaInclusaoDeAlimentacaoAvulsa
} from "../../../../services/inclusaoDeAlimentacaoAvulsa.service";
import {
  getInclusaoDeAlimentacaoContinua,
  DREConfirmaInclusaoDeAlimentacaoContinua
} from "../../../../services/inclusaoDeAlimentacaoContinua.service";
import { getDiasUteis } from "../../../../services/diasUteis.service";
import { meusDados } from "../../../../services/perfil.service";
import {
  dataParaUTC,
  stringSeparadaPorVirgulas
} from "../../../../helpers/utilities";
import { statusEnum } from "../../../../constants/statusEnum";
import { toastSuccess, toastError } from "../../../Shareable/Toast/dialogs";

class Relatorio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unifiedSolicitationList: [],
      uuid: null,
      meusDados: null,
      redirect: false,
      showModal: false,
      ehInclusaoContinua: false,
      inclusaoDeAlimentacao: null,
      prazoDoPedidoMensagem: null
    };
    this.closeModal = this.closeModal.bind(this);
  }

  setRedirect() {
    this.setState({
      redirect: true
    });
  }

  renderizarRedirecionamentoParaPedidosDeInclusao = () => {
    if (this.state.redirect) {
      return <Redirect to={`/${DRE}/${INCLUSAO_ALIMENTACAO}`} />;
    }
  };

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    const ehInclusaoContinua = urlParams.get("ehInclusaoContinua");
    const getInclusaoDeAlimentacao =
      ehInclusaoContinua === "true"
        ? getInclusaoDeAlimentacaoContinua
        : getInclusaoDeAlimentacaoAvulsa;
    meusDados().then(response => {
      this.setState({
        meusDados: response
      });
    });
    getDiasUteis().then(response => {
      const proximos_cinco_dias_uteis = dataParaUTC(
        new Date(response.proximos_cinco_dias_uteis)
      );
      const proximos_dois_dias_uteis = dataParaUTC(
        new Date(response.proximos_dois_dias_uteis)
      );
      if (uuid) {
        getInclusaoDeAlimentacao(uuid).then(response => {
          const dataMaisProxima =
            response.inclusoes && response.inclusoes[0].data;
          this.setState({
            inclusaoDeAlimentacao: response,
            ehInclusaoContinua: ehInclusaoContinua === "true",
            uuid,
            prazoDoPedidoMensagem: prazoDoPedidoMensagem(
              response.data_inicial || dataMaisProxima,
              proximos_dois_dias_uteis,
              proximos_cinco_dias_uteis
            )
          });
        });
      }
    });
  }

  showModal() {
    this.setState({ showModal: true });
  }

  closeModal(e) {
    this.setState({ showModal: false });
    toastSuccess("Solicitação de Alimentação não validado com sucesso!");
  }

  handleSubmit() {
    const uuid = this.state.uuid;
    const DREConfirmaInclusaoDeAlimentacao = this.state.ehInclusaoContinua
      ? DREConfirmaInclusaoDeAlimentacaoContinua
      : DREConfirmaInclusaoDeAlimentacaoAvulsa;
    DREConfirmaInclusaoDeAlimentacao(uuid).then(
      response => {
        if (response.status === HTTP_STATUS.OK) {
          toastSuccess("Inclusão de Alimentação validada com sucesso!");
          this.setRedirect();
        } else if (response.status === HTTP_STATUS.BAD_REQUEST) {
          toastError("Houve um erro ao validar a Inclusão de Alimentação");
        }
      },
      function(error) {
        toastError("Houve um erro ao validar a Inclusão de Alimentação");
      }
    );
  }

  renderParteAvulsa() {
    const { ehInclusaoContinua, inclusaoDeAlimentacao } = this.state;
    return (
      !ehInclusaoContinua && (
        <table className="table-periods">
          <tr>
            <th>Data</th>
            <th>Motivo</th>
          </tr>
          {inclusaoDeAlimentacao.inclusoes.map(inclusao => {
            return (
              <tr>
                <td>{inclusao.data}</td>
                <td>{inclusao.motivo.nome}</td>
              </tr>
            );
          })}
        </table>
      )
    );
  }

  renderParteContinua() {
    const { ehInclusaoContinua, inclusaoDeAlimentacao } = this.state;
    return (
      ehInclusaoContinua && (
        <div>
          <div className="row">
            <div className="col-4 report-label-value">
              <p>Data do evento</p>
              <p className="value">
                {`${inclusaoDeAlimentacao.data_inicial} - ${
                  inclusaoDeAlimentacao.data_final
                }`}
              </p>
            </div>
            <div className="col-4 report-label-value">
              <p>Dias da Semana</p>
              <p className="value">
                {inclusaoDeAlimentacao.dias_semana_explicacao}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-12 report-label-value">
              <p>Motivo</p>
              <p className="value">{inclusaoDeAlimentacao.motivo.nome}</p>
            </div>
          </div>
        </div>
      )
    );
  }

  render() {
    const {
      showModal,
      inclusaoDeAlimentacao,
      prazoDoPedidoMensagem,
      meusDados
    } = this.state;
    return (
      <div className="report food-inclusion">
        <ModalRecusarSolicitacao
          closeModal={this.closeModal}
          showModal={showModal}
        />
        {this.renderizarRedirecionamentoParaPedidosDeInclusao()}
        {!inclusaoDeAlimentacao ? (
          <div>Carregando...</div>
        ) : (
          <form onSubmit={this.props.handleSubmit}>
            <span className="page-title">{`Inclusão de Alimentacão - Pedido # ${
              inclusaoDeAlimentacao.id_externo
            }`}</span>
            <Link to={`/${DRE}/${INCLUSAO_ALIMENTACAO}`}>
              <Botao
                texto="voltar"
                titulo="voltar"
                type={BUTTON_TYPE.BUTTON}
                style={BUTTON_STYLE.BLUE}
                icon={BUTTON_ICON.ARROW_LEFT}
                className="float-right"
              />
            </Link>
            <div className="card mt-3">
              <div className="card-body">
                <div className="row">
                  <p
                    className={`col-12 title-message ${corDaMensagem(
                      prazoDoPedidoMensagem
                    )}`}
                  >
                    {prazoDoPedidoMensagem}
                    <Botao
                      type={BUTTON_TYPE.BUTTON}
                      titulo="imprimir"
                      style={BUTTON_STYLE.BLUE}
                      icon={BUTTON_ICON.PRINT}
                      className="float-right"
                    />
                  </p>
                  <div className="col-2">
                    <span className="badge-sme badge-secondary-sme">
                      <span className="id-of-solicitation-dre">
                        # {inclusaoDeAlimentacao.id_externo}
                      </span>
                      <br />{" "}
                      <span className="number-of-order-label">
                        ID DO PEDIDO
                      </span>
                    </span>
                  </div>
                  <div className="report-div-beside-order my-auto col-8">
                    <span className="requester">Escola Solicitante</span>
                    <br />
                    <span className="dre-name">
                      {inclusaoDeAlimentacao.escola &&
                        inclusaoDeAlimentacao.escola.nome}
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-2 report-label-value">
                    <p>DRE</p>
                    <p className="value-important">
                      {meusDados &&
                        meusDados.diretorias_regionais &&
                        meusDados.diretorias_regionais[0].nome}
                    </p>
                  </div>
                  <div className="col-2 report-label-value">
                    <p>Lote</p>
                    <p className="value-important">
                      {inclusaoDeAlimentacao.escola &&
                        inclusaoDeAlimentacao.escola.lote &&
                        inclusaoDeAlimentacao.escola.lote.nome}
                    </p>
                  </div>
                  <div className="col-2 report-label-value">
                    <p>Tipo de Gestão</p>
                    <p className="value-important">
                      {inclusaoDeAlimentacao.escola &&
                        inclusaoDeAlimentacao.escola.tipo_gestao &&
                        inclusaoDeAlimentacao.escola.tipo_gestao.nome}
                    </p>
                  </div>
                </div>
                <hr />
                {inclusaoDeAlimentacao.logs && (
                  <div className="row">
                    <FluxoDeStatus listaDeStatus={inclusaoDeAlimentacao.logs} />
                  </div>
                )}
                <hr />
                <div className="row">
                  <div className="report-students-div col-3">
                    <span>Nº de alunos matriculados total</span>
                    <span>
                      {inclusaoDeAlimentacao.escola.quantidade_alunos}
                    </span>
                  </div>
                  {/*<div className="report-students-div col-3">
                  <span>Nº de alunos matutino</span>
                  <span>{escola.matutino}</span>
                </div>
                <div className="report-students-div col-3">
                  <span>Nº de alunos vespertino</span>
                  <span>{escola.vespertino}</span>
                </div>
                <div className="report-students-div col-3">
                  <span>Nº de alunos nortuno</span>
                  <span>{escola.noturno}</span>
                </div>*/}
                </div>
                <div className="row">
                  <div className="col-12 report-label-value">
                    <p className="value">
                      Descrição da Inclusão de Alimentação
                    </p>
                  </div>
                </div>
                {this.renderParteContinua()}
                {this.renderParteAvulsa()}
                <table className="table-periods">
                  <tr>
                    <th>Período</th>
                    <th>Tipos de Alimentação</th>
                    <th>Quantidade de Alunos</th>
                  </tr>
                  {inclusaoDeAlimentacao.quantidades_periodo.map(
                    quantidade_por_periodo => {
                      return (
                        <tr>
                          <td>
                            {quantidade_por_periodo.periodo_escolar &&
                              quantidade_por_periodo.periodo_escolar.nome}
                          </td>
                          <td>
                            {stringSeparadaPorVirgulas(
                              quantidade_por_periodo.tipos_alimentacao,
                              "nome"
                            )}
                          </td>
                          <td>{quantidade_por_periodo.numero_alunos}</td>
                        </tr>
                      );
                    }
                  )}
                </table>
                <div className="row">
                  <div className="col-12 report-label-value">
                    <p>Observações</p>
                    <p
                      className="value"
                      dangerouslySetInnerHTML={{
                        __html: inclusaoDeAlimentacao.descricao
                      }}
                    />
                  </div>
                </div>
                {inclusaoDeAlimentacao.status === statusEnum.DRE_A_VALIDAR && (
                  <div className="form-group row float-right mt-4">
                    <Botao
                      texto={"Não Validar Solicitação"}
                      className="ml-3"
                      onClick={() => this.showModal()}
                      type={BUTTON_TYPE.BUTTON}
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                    />
                    <Botao
                      texto="Validar Solicitação"
                      type={BUTTON_TYPE.SUBMIT}
                      onClick={() => this.handleSubmit()}
                      style={BUTTON_STYLE.GREEN}
                      className="ml-3"
                    />
                  </div>
                )}
              </div>
            </div>
          </form>
        )}
      </div>
    );
  }
}

const RelatorioForm = reduxForm({
  form: "unifiedSolicitationFilledForm",
  enableReinitialize: true
})(Relatorio);
export default RelatorioForm;
