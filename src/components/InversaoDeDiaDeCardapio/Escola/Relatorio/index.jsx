import HTTP_STATUS from "http-status-codes";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { formValueSelector, reduxForm } from "redux-form";
import { ESCOLA, PAINEL_CONTROLE } from "../../../../configs/constants";
import { meusDados } from "../../../../services/perfil.service";
import BaseButton, { ButtonStyle, ButtonType } from "../../../Shareable/button";
import { FluxoDeStatus } from "../../../Shareable/FluxoDeStatus";
import { escolaPodeCancelar } from "../../../../constants/statusEnum";
import {
  ModalCancelarInversaoDiaCardapio,
  ORIGEM_SOLICITACAO
} from "../../../Shareable/ModalCancelarInversaoDiaCardapio";
import {
  getInversaoDeDiaDeCardapio,
  dreAprovaPedidoEscola
} from "../../../../services/inversaoDeDiaDeCardapio.service";
import { toastError, toastSuccess } from "../../../Shareable/Toast/dialogs";
import "./style.scss";

class Relatorio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unifiedSolicitationList: [],
      uuid: null,
      meusDados: { diretorias_regionais: [{ nome: "" }] },
      redirect: false,
      showModal: false
    };
    this.closeModal = this.closeModal.bind(this);
  }

  setRedirect() {
    this.setState({
      redirect: true
    });
  }

  renderizarRedirecionamentoParaPedidosDeSolicitacao = () => {
    if (this.state.redirect) {
      return <Redirect to={`/${ESCOLA}/${PAINEL_CONTROLE}`} />;
    }
  };

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    meusDados().then(meusDados => {
      this.setState({ meusDados });
    });
    if (uuid) {
      getInversaoDeDiaDeCardapio(uuid).then(response => {
        const solicitacaoInversaoDeDiaDeCardapio = response;
        const data = solicitacaoInversaoDeDiaDeCardapio.data;
        this.setState({
          solicitacaoInversaoDeDiaDeCardapio: data,
          uuid
        });
      });
    }
  }

  showModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  handleSubmit() {
    const uuid = this.state.uuid;
    dreAprovaPedidoEscola(uuid).then(
      response => {
        if (response.status === HTTP_STATUS.OK) {
          toastSuccess(
            "Solicitação de Inversão de Dia de Cardapio validada com sucesso!"
          );
          this.setRedirect();
        } else if (response.status === HTTP_STATUS.BAD_REQUEST) {
          toastError("Houve um erro ao validar a Inversão de Dia de Cardapio");
        }
      },
      function() {
        toastError("Houve um erro ao validar a Inversão de Dia de Cardapio");
      }
    );
  }

  render() {
    const {
      solicitacaoInversaoDeDiaDeCardapio,
      showModal,
      uuid,
      meusDados
    } = this.state;
    const { justificativa } = this.props;
    return (
      <div>
        {this.renderizarRedirecionamentoParaPedidosDeSolicitacao()}
        <ModalCancelarInversaoDiaCardapio
          closeModal={this.closeModal}
          showModal={showModal}
          uuid={uuid}
          justificativa={justificativa}
          origemSolicitacao={ORIGEM_SOLICITACAO.ESCOLA}
          meusDados={meusDados}
          solicitacaoInversaoDeDiaDeCardapio={
            solicitacaoInversaoDeDiaDeCardapio
          }
        />
        {solicitacaoInversaoDeDiaDeCardapio && (
          <form onSubmit={this.props.handleSubmit}>
            <span className="page-title">
              Alteracao de Cardapio #{" "}
              {solicitacaoInversaoDeDiaDeCardapio.id_externo}
            </span>
            <div className="card mt-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-2">
                    <span className="badge-sme badge-secondary-sme">
                      <span className="id-of-solicitation-dre">
                        # {solicitacaoInversaoDeDiaDeCardapio.id_externo}
                      </span>
                      <br />{" "}
                      <span className="number-of-order-label">
                        ID DO PEDIDO
                      </span>
                    </span>
                  </div>
                  <div className="my-auto col-10 pl-4">
                    <span className="requester">Escola Solicitante</span>
                    <br />
                    <span className="dre-name">
                      {solicitacaoInversaoDeDiaDeCardapio.escola &&
                        solicitacaoInversaoDeDiaDeCardapio.escola.nome}
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-2 report-label-value">
                    <p>DRE</p>
                    <p className="value-important">
                      {solicitacaoInversaoDeDiaDeCardapio.escola &&
                        solicitacaoInversaoDeDiaDeCardapio.escola
                          .diretoria_regional &&
                        solicitacaoInversaoDeDiaDeCardapio.escola
                          .diretoria_regional.nome}
                    </p>
                  </div>
                  <div className="col-2 report-label-value">
                    <p>Lote</p>
                    <p className="value-important">
                      {solicitacaoInversaoDeDiaDeCardapio.escola &&
                        solicitacaoInversaoDeDiaDeCardapio.escola.lote &&
                        solicitacaoInversaoDeDiaDeCardapio.escola.lote.nome}
                    </p>
                  </div>
                  <div className="col-2 report-label-value">
                    <p>Tipo de Gestão</p>
                    <p className="value-important">
                      {solicitacaoInversaoDeDiaDeCardapio.escola &&
                        solicitacaoInversaoDeDiaDeCardapio.escola.tipo_gestao &&
                        solicitacaoInversaoDeDiaDeCardapio.escola.tipo_gestao
                          .nome}
                    </p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  {
                    <FluxoDeStatus
                      listaDeStatus={solicitacaoInversaoDeDiaDeCardapio.logs}
                    />
                  }
                </div>
                <hr />
                <div className="row">
                  <div className="report-students-div col-3">
                    <span>Nº de alunos matriculados total</span>
                    <span>
                      {solicitacaoInversaoDeDiaDeCardapio.escola &&
                        solicitacaoInversaoDeDiaDeCardapio.escola
                          .quantidade_alunos}
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 report-label-value">
                    <p className="value">Descrição da Solicitação</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 report-label-value">
                    <p>Observações</p>
                    <p
                      className="value"
                      dangerouslySetInnerHTML={{
                        __html:
                          solicitacaoInversaoDeDiaDeCardapio &&
                          solicitacaoInversaoDeDiaDeCardapio.motivo
                      }}
                    />
                  </div>
                </div>
                {escolaPodeCancelar(
                  solicitacaoInversaoDeDiaDeCardapio.status
                ) && (
                  <div className="form-group row float-right mt-4">
                    <BaseButton
                      label={"Cancelar solicitação"}
                      className="ml-3"
                      onClick={() => this.showModal()}
                      type={ButtonType.BUTTON}
                      style={ButtonStyle.OutlinePrimary}
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
const formName = "solicitacaoInversaoDeDiaDeCardapio";
const selector = formValueSelector(formName);

const mapStateToProps = state => {
  return {
    justificativa: selector(state, "justificativa")
  };
};

const RelatorioForm = reduxForm({
  form: formName,
  enableReinitialize: true
})(Relatorio);

export default connect(mapStateToProps)(RelatorioForm);
