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

class Relatorio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unifiedSolicitationList: [],
      uuid: null,
      meusDados: { diretorias_regionais: [{ nome: "" }] },
      redirect: false,
      showModal: false,
      ehInclusaoContinua: false,
      InversaoCardapio: null,
      escolaDaInversao: null,
      prazoDoPedidoMensagem: null
    };
    this.closeModal = this.closeModal.bind(this);
  }

  setRedirect() {
    this.setState({
      redirect: true
    });
  }

  renderizarRedirecionamentoParaInversoesDeCardapio = () => {
    if (this.state.redirect) {
      return <Redirect to="/terceirizada/inversoes-dia-cardapio" />;
    }
  };

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    meusDados().then(meusDados => {
      this.setState({ meusDados });
    });
    getDiasUteis().then(response => {
      const proximos_cinco_dias_uteis = dataParaUTC(
        new Date(response.proximos_cinco_dias_uteis)
      );
      const proximos_dois_dias_uteis = dataParaUTC(
        new Date(response.proximos_dois_dias_uteis)
      );
      if (uuid) {
        getInversaoDeDiaDeCardapio(uuid).then(response => {
          const InversaoCardapio = response.data;
          const data_de = moment(InversaoCardapio.data_de, "DD/MM/YYYY");
          const data_para = moment(InversaoCardapio.data_para, "DD/MM/YYYY");
          let dataMaisProxima = data_de;
          if (dataMaisProxima < data_para) {
            dataMaisProxima = data_para;
          }

          this.setState({
            InversaoCardapio,
            uuid,
            escolaDaInversao: InversaoCardapio.escola,
            prazoDoPedidoMensagem: prazoDoPedidoMensagem(
              dataMaisProxima,
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
    terceirizadaTomaCiencia(uuid).then(
      response => {
        if (response.status === HTTP_STATUS.OK) {
          toastSuccess("Inversão de dias de cardápio validada com sucesso!");
          this.setRedirect();
        } else if (response.status === HTTP_STATUS.BAD_REQUEST) {
          toastError("xxxxxxx");
        }
      },
      function(error) {
        toastError("xxxxx");
      }
    );
  }

  render() {
    const {
      showModal,
      InversaoCardapio,
      prazoDoPedidoMensagem,
      meusDados,
      escolaDaInversao
    } = this.state;
    return (
      <div>
        <ModalRecusarSolicitacao
          closeModal={this.closeModal}
          showModal={showModal}
        />
        {this.renderizarRedirecionamentoParaInversoesDeCardapio()}
        {!InversaoCardapio ? (
          <div>Carregando...</div>
        ) : (
          <form onSubmit={this.props.handleSubmit}>
            <span className="page-title">{`Inversão de dia de cardápio - Pedido #${
              InversaoCardapio.id_externo
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
                        {InversaoCardapio.id_externo}
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
                      {InversaoCardapio.escola && InversaoCardapio.escola.nome}
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-2 report-label-value">
                    <p>DRE</p>
                    <p className="value-important">
                      {meusDados.diretorias_regionais &&
                        meusDados.diretorias_regionais[0].nome}
                    </p>
                  </div>
                  <div className="col-2 report-label-value">
                    <p>Lote</p>
                    <p className="value-important">
                      {escolaDaInversao.lote && escolaDaInversao.lote.nome}
                    </p>
                  </div>
                  <div className="col-2 report-label-value">
                    <p>Tipo de Gestão</p>
                    <p className="value-important">
                      {escolaDaInversao &&
                        escolaDaInversao.tipo_gestao &&
                        escolaDaInversao.tipo_gestao.nome}
                    </p>
                  </div>
                </div>
                <hr />
                {InversaoCardapio.logs && (
                  <div className="row">
                    <FluxoDeStatus listaDeStatus={InversaoCardapio.logs} />
                  </div>
                )}
                <hr />
                <div className="row">
                  <div className="report-students-div col-3">
                    <span>Nº de alunos matriculados total</span>
                    <span>{escolaDaInversao.quantidade_alunos}</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 report-label-value">
                    <p className="value">
                      Descrição da inversão de dias de cardápio
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
                  {/* {InversaoCardapio.quantidades_periodo.map(
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
                  )} */}
                </table>
                <div className="row">
                  <div className="col-12 report-label-value">
                    <p>Observações</p>
                    <p
                      className="value"
                      dangerouslySetInnerHTML={{
                        __html: InversaoCardapio.descricao
                      }}
                    />
                  </div>
                </div>
                <div className="form-group row float-right mt-4">
                  <BaseButton
                    label={"Não Validar Solicitação"}
                    className="ml-3"
                    onClick={() => this.showModal()}
                    type={ButtonType.BUTTON}
                    style={ButtonStyle.OutlinePrimary}
                  />
                  <BaseButton
                    label="Validar Solicitação"
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
