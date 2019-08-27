import HTTP_STATUS from "http-status-codes";
import moment from "moment";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { reduxForm } from "redux-form";
import { dataParaUTC } from "../../../../helpers/utilities";
import { getDiasUteis } from "../../../../services/diasUteis.service";
import {
  getInversaoDeDiaDeCardapio,
  terceirizadaTomaCiencia
} from "../../../../services/inversaoDeDiaDeCardapio.service";
import { meusDados } from "../../../../services/perfil.service";
import BaseButton, { ButtonStyle, ButtonType } from "../../../Shareable/button";
import { toastError, toastSuccess } from "../../../Shareable/dialogs";
import { FluxoDeStatus } from "../../../Shareable/FluxoDeStatus";
import { ModalRecusarSolicitacao } from "../../../Shareable/ModalRecusarSolicitacao";
import "../style.scss";
import { corDaMensagem, prazoDoPedidoMensagem } from "./helper";
import "./style.scss";
import { getSuspensaoDeAlimentacaoUUID } from "../../../../services/suspensaoDeAlimentacao.service";

class Relatorio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: null,
      showModal: false,
      suspensaoAlimentacao: null,
      dadosEscola: null
    };
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    if (uuid) {
      getSuspensaoDeAlimentacaoUUID(uuid).then(response => {
        let suspensaoAlimentacao = response.data;
        let dadosEscola = suspensaoAlimentacao.escola;
        this.setState({ suspensaoAlimentacao, dadosEscola });
      });
    }
  }

  showModal() {
    this.setState({ showModal: true });
  }

  closeModal(e) {
    this.setState({ showModal: false });
    toastSuccess("Solicitação de Alimentação não validado com sucesso!");
  }

  handleSubmit() {}

  render() {
    const { showModal, suspensaoAlimentacao, dadosEscola } = this.state;
    return (
      <div>
        <ModalRecusarSolicitacao
          closeModal={this.closeModal}
          showModal={showModal}
        />
        {!suspensaoAlimentacao ? (
          <div>Carregando...</div>
        ) : (
          <form onSubmit={this.props.handleSubmit}>
            <span className="page-title">{`Suspensao de alimentação - Solicitação #${
              suspensaoAlimentacao.id_externo
            }`}</span>
            <div className="card mt-3">
              <div className="card-body">
                <div className="row">
                  <p className={`col-12 title-message ${corDaMensagem("red")}`}>
                    Solicitação no prazo limite
                  </p>
                  <div className="col-2">
                    <span className="badge-sme badge-secondary-sme">
                      <span className="id-of-solicitation-dre">
                        {suspensaoAlimentacao.id_externo}
                      </span>
                      <br />{" "}
                      <span className="number-of-order-label">
                        ID DA SOLICITAÇÂO
                      </span>
                    </span>
                  </div>
                  <div className="report-div-beside-order my-auto col-8">
                    <span className="requester">Escola Solicitante</span>
                    <br />
                    <span className="dre-name">
                      {suspensaoAlimentacao.escola &&
                        suspensaoAlimentacao.escola.nome}
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-2 report-label-value">
                    <p>DRE</p>
                    <p className="value-important">
                      {dadosEscola &&
                        dadosEscola.diretoria_regional.nome}
                    </p>
                  </div>
                  <div className="col-2 report-label-value">
                    <p>Lote</p>
                    <p className="value-important">
                      {dadosEscola &&
                        dadosEscola.lote.nome}
                    </p>
                  </div>
                  <div className="col-2 report-label-value">
                    <p>Tipo de Gestão</p>
                    <p className="value-important">
                      {dadosEscola &&
                        dadosEscola.tipo_gestao.nome}
                    </p>
                  </div>
                </div>
                <hr />
                {suspensaoAlimentacao.logs && (
                  <div className="row">
                    <FluxoDeStatus listaDeStatus={suspensaoAlimentacao.logs} tipoDeFluxo={"informativo"} />
                  </div>
                )}
                <hr />
                <div className="row">
                  <div className="report-students-div col-3">
                    <span>Nº de alunos matriculados total</span>
                    <span>{dadosEscola.quantidade_alunos}</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 report-label-value">
                    <p className="value">
                      Descrição da suspensão de alimentação
                    </p>
                  </div>
                </div>
                {/* {this.renderDetalheInversao()} */}
                <table className="table-periods">
                  <tr>
                    <th>Período</th>
                    <th>Tipos de Alimentação</th>
                    <th>Quantidade de Alunos</th>
                  </tr>
                </table>
                <div className="row">
                  <div className="col-12 report-label-value">
                    <p>Observações</p>
                    <p
                      className="value"
                      dangerouslySetInnerHTML={{
                        __html: suspensaoAlimentacao.observacao
                      }}
                    />
                  </div>
                </div>
                <div className="form-group row float-right mt-4">
                  <BaseButton
                    label="Tomar ciência"
                    type={ButtonType.SUBMIT}
                    onClick={() => this.handleSubmit()}
                    style={ButtonStyle.Primary}
                    className="ml-3"
                  />
                </div>
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
