import React, { Component } from "react";
import HTTP_STATUS from "http-status-codes";
import BaseButton, { ButtonStyle, ButtonType } from "../../../Shareable/button";
import { Redirect } from "react-router-dom";
import { reduxForm } from "redux-form";
import { FluxoDeStatus } from "../../../Shareable/FluxoDeStatus";
import { prazoDoPedidoMensagem, corDaMensagem } from "./helper";
import { stringSeparadaPorVirgulas } from "../../../../helpers/utilities";
import { ModalRecusarSolicitacao } from "../../../Shareable/ModalRecusarSolicitacao";
import {
  getAlteracaoCardapio,
  CODAEConfirmaAlteracaoDeCardapio
} from "../../../../services/alteracaoDecardapio.service";

import { getDiasUteis } from "../../../../services/diasUteis.service";
import { meusDados } from "../../../../services/perfil.service";
import { dataParaUTC } from "../../../../helpers/utilities";
import { toastSuccess, toastError } from "../../../Shareable/Toast/dialogs";
import "../style.scss";
import "./style.scss";
import { ALTERACAO_CARDAPIO, CODAE } from "../../../../configs/constants";
import { statusEnum } from "../../../../constants/statusEnum";

class Relatorio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unifiedSolicitationList: [],
      uuid: null,
      meusDados: null,
      redirect: false,
      showModal: false,
      prazoDoPedidoMensagem: null
    };
    this.closeModal = this.closeModal.bind(this);
  }

  setRedirect() {
    this.setState({
      redirect: true
    });
  }

  renderizarRedirecionamentoParaPedidos = () => {
    if (this.state.redirect) {
      return <Redirect to={`/${CODAE}/${ALTERACAO_CARDAPIO}`} />;
    }
  };

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    meusDados().then(meusDados => {
      this.setState({
        meusDados
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
        getAlteracaoCardapio(uuid).then(alteracaoDeCardapio => {
          this.setState({
            alteracaoDeCardapio,
            uuid,
            prazoDoPedidoMensagem: prazoDoPedidoMensagem(
              alteracaoDeCardapio.data_inicial,
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
    toastSuccess("Alteração de Cardápio recusada!");
  }

  handleSubmit() {
    const uuid = this.state.uuid;
    CODAEConfirmaAlteracaoDeCardapio(uuid).then(
      response => {
        if (response.status === HTTP_STATUS.OK) {
          toastSuccess("Alteração de Cardápio autorizada com sucesso!");
          this.setRedirect();
        } else if (response.status === HTTP_STATUS.BAD_REQUEST) {
          toastError("Houve um erro ao autorizar a Alteração de Cardápio");
        }
      },
      function(error) {
        toastError("Houve um erro ao enviar a Alteração de Cardápio");
      }
    );
  }

  renderParteAvulsa() {
    const { alteracaoDeCardapio } = this.state;
    return (
      <table className="table-periods">
        <tr>
          <th>Data Inicial</th>
          <th>Data Final</th>
        </tr>
        <tr>
          <td>{alteracaoDeCardapio.data_inicial}</td>
          <td>{alteracaoDeCardapio.data_final}</td>
        </tr>
      </table>
    );
  }

  render() {
    const {
      showModal,
      alteracaoDeCardapio,
      prazoDoPedidoMensagem,
      meusDados
    } = this.state;
    return (
      <div>
        <ModalRecusarSolicitacao
          closeModal={this.closeModal}
          showModal={showModal}
        />
        {this.renderizarRedirecionamentoParaPedidos()}
        {!alteracaoDeCardapio ? (
          <div>Carregando...</div>
        ) : (
          <form onSubmit={this.props.handleSubmit}>
            <span className="page-title">{`Alteração de Cardápio - Pedido # ${
              alteracaoDeCardapio.id_externo
            }`}</span>
            <div className="card mt-3">
              <div className="card-body">
                <div className="row">
                  <p
                    className={`col-12 title-message ${corDaMensagem(
                      prazoDoPedidoMensagem
                    )}`}
                  >
                    {prazoDoPedidoMensagem}
                  </p>
                  <div className="col-2">
                    <span className="badge-sme badge-secondary-sme">
                      <span className="id-of-solicitation-dre">
                        # {alteracaoDeCardapio.id_externo}
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
                      {alteracaoDeCardapio.escola &&
                        alteracaoDeCardapio.escola.nome}
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
                      {alteracaoDeCardapio.escola &&
                        alteracaoDeCardapio.escola.lote &&
                        alteracaoDeCardapio.escola.lote.nome}
                    </p>
                  </div>
                  <div className="col-2 report-label-value">
                    <p>Tipo de Gestão</p>
                    <p className="value-important">
                      {alteracaoDeCardapio.escola &&
                        alteracaoDeCardapio.escola.tipo_gestao &&
                        alteracaoDeCardapio.escola.tipo_gestao.nome}
                    </p>
                  </div>
                </div>
                <hr />
                {alteracaoDeCardapio.logs && (
                  <div className="row">
                    <FluxoDeStatus listaDeStatus={alteracaoDeCardapio.logs} />
                  </div>
                )}
                <hr />
                <div className="row">
                  <div className="report-students-div col-3">
                    <span>Nº de alunos matriculados total</span>
                    <span>{alteracaoDeCardapio.escola.quantidade_alunos}</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 report-label-value">
                    <p className="value">Descrição da Alteração de Cardápio</p>
                  </div>
                </div>
                {this.renderParteAvulsa()}
                <table className="table-periods">
                  <tr>
                    <th>Período</th>
                    <th>Tipos de Alimentação</th>
                    <th>Quantidade de Alunos</th>
                  </tr>
                  {alteracaoDeCardapio.substituicoes.map(
                    (quantidade_por_periodo, key) => {
                      return (
                        <tr key={key}>
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
                          <td>{quantidade_por_periodo.qtd_alunos}</td>
                        </tr>
                      );
                    }
                  )}
                </table>

                <table className="table-periods">
                  <tr>
                    <th>Motivo</th>
                  </tr>
                  <tr>
                    <td>{alteracaoDeCardapio.motivo.nome}</td>
                  </tr>
                </table>

                <table className="table-periods">
                  <tr>
                    <th>Observações</th>
                  </tr>
                  <tr>
                    <td>
                      <p
                        className="value"
                        dangerouslySetInnerHTML={{
                          __html: alteracaoDeCardapio.observacao
                        }}
                      />
                    </td>
                  </tr>
                </table>
                {alteracaoDeCardapio.status === statusEnum.DRE_APROVADO && (
                  <div className="form-group row float-right mt-4">
                    <BaseButton
                      label={"Negar Solicitação"}
                      className="ml-3"
                      onClick={() => this.showModal()}
                      type={ButtonType.BUTTON}
                      style={ButtonStyle.OutlinePrimary}
                    />
                    <BaseButton
                      label="Autorizar Solicitação"
                      type={ButtonType.SUBMIT}
                      onClick={() => this.handleSubmit()}
                      style={ButtonStyle.Primary}
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
