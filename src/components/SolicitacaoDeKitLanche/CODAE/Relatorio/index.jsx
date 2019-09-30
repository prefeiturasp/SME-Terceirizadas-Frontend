import HTTP_STATUS from "http-status-codes";
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { reduxForm } from "redux-form";
import { dataParaUTC } from "../../../../helpers/utilities";
import { getDiasUteis } from "../../../../services/diasUteis.service";
import {
  aprovaDeKitLancheAvulsoCodae,
  getDetalheKitLancheAvulsa
} from "../../../../services/solicitacaoDeKitLanche.service";
import { meusDados } from "../../../../services/perfil.service";
import { toastError, toastSuccess } from "../../../Shareable/Toast/dialogs";
import { FluxoDeStatus } from "../../../Shareable/FluxoDeStatus";
import { ModalRecusarSolicitacao } from "../../../Shareable/ModalRecusarSolicitacao";
import { prazoDoPedidoMensagem } from "./helper";
import { CODAE, SOLICITACAO_KIT_LANCHE } from "../../../../configs/constants";
import { statusEnum } from "../../../../constants/statusEnum";
import { corDaMensagem } from "../../../InversaoDeDiaDeCardapio/DRE/Relatorio/helper";
import Botao from "../../../Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
  BUTTON_ICON
} from "../../../Shareable/Botao/constants";

class Relatorio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unifiedSolicitationList: [],
      uuid: null,
      meusDados: { diretorias_regionais: [{ nome: "" }] },
      redirect: false,
      showModal: false,
      solicitacaoKitLanche: null,
      prazoDoPedidoMensagem: null
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
      return <Redirect to={`/${CODAE}/${SOLICITACAO_KIT_LANCHE}`} />;
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
        getDetalheKitLancheAvulsa(uuid).then(response => {
          const solicitacaoKitLanche = response;
          const data = solicitacaoKitLanche.solicitacao_kit_lanche.data;
          this.setState({
            solicitacaoKitLanche,
            uuid,
            prazoDoPedidoMensagem: prazoDoPedidoMensagem(
              data,
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
    toastSuccess("Solicitação de Alimentação negada com sucesso!");
  }

  handleSubmit() {
    const uuid = this.state.uuid;
    aprovaDeKitLancheAvulsoCodae(uuid).then(
      response => {
        if (response.status === HTTP_STATUS.OK) {
          toastSuccess("Solicitação de Kit Lanche Passeio autorizada com sucesso!");
          this.setRedirect();
        } else if (response.status === HTTP_STATUS.BAD_REQUEST) {
          toastError("Houve um erro ao autorizar a Solicitação de Kit Lanche Passeio");
        }
      },
      function(error) {
        toastError("Houve um erro ao autorizar a Solicitação de Kit Lanche Passeio");
      }
    );
  }

  render() {
    const {
      solicitacaoKitLanche,
      showModal,
      prazoDoPedidoMensagem
    } = this.state;
    return (
      <div className="report">
        {this.renderizarRedirecionamentoParaPedidosDeSolicitacao()}
        <ModalRecusarSolicitacao
          closeModal={this.closeModal}
          showModal={showModal}
        />
        {solicitacaoKitLanche && (
          <form onSubmit={this.props.handleSubmit}>
            <span className="page-title">
              Solicitação de Kit Lanche Passeio # {solicitacaoKitLanche.id_externo}
              <Link to={`/${CODAE}/${SOLICITACAO_KIT_LANCHE}`}>
                <Botao
                  texto="voltar"
                  type={BUTTON_TYPE.BUTTON}
                  style={BUTTON_STYLE.BLUE}
                  icon={BUTTON_ICON.ARROW_LEFT}
                  className="float-right"
                />
              </Link>
            </span>
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
                      style={BUTTON_STYLE.BLUE}
                      icon={BUTTON_ICON.PRINT}
                      className="float-right"
                    />
                  </p>
                  <div className="col-2">
                    <span className="badge-sme badge-secondary-sme">
                      <span className="id-of-solicitation-dre">
                        # {solicitacaoKitLanche.id_externo}
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
                      {solicitacaoKitLanche.escola &&
                        solicitacaoKitLanche.escola.nome}
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-2 report-label-value">
                    <p>DRE</p>
                    <p className="value-important">
                      {solicitacaoKitLanche.escola &&
                        solicitacaoKitLanche.escola.diretoria_regional &&
                        solicitacaoKitLanche.escola.diretoria_regional.nome}
                    </p>
                  </div>
                  <div className="col-2 report-label-value">
                    <p>Lote</p>
                    <p className="value-important">
                      {solicitacaoKitLanche.escola &&
                        solicitacaoKitLanche.escola.lote &&
                        solicitacaoKitLanche.escola.lote.nome}
                    </p>
                  </div>
                  <div className="col-2 report-label-value">
                    <p>Tipo de Gestão</p>
                    <p className="value-important">
                      {solicitacaoKitLanche.escola &&
                        solicitacaoKitLanche.escola.tipo_gestao &&
                        solicitacaoKitLanche.escola.tipo_gestao.nome}
                    </p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <FluxoDeStatus listaDeStatus={solicitacaoKitLanche.logs} />
                </div>
                <hr />
                <div className="row">
                  <div className="report-students-div col-3">
                    <span>Nº de alunos matriculados total</span>
                    <span>
                      {solicitacaoKitLanche.escola &&
                        solicitacaoKitLanche.escola.alunos_total}
                    </span>
                  </div>
                  {/* <div className="report-students-div col-3">
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
                  </div> */}
                </div>
                <div className="row">
                  <div className="col-12 report-label-value">
                    <p className="value">Descrição da Solicitação</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4 report-label-value">
                    <p>Data do evento</p>
                    <p className="value">
                      {solicitacaoKitLanche.solicitacao_kit_lanche &&
                        solicitacaoKitLanche.solicitacao_kit_lanche.data}
                    </p>
                  </div>
                  <div className="col-8 report-label-value">
                    <p>Local do passeio</p>
                    <p className="value">{solicitacaoKitLanche.local}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4 report-label-value">
                    <p>Nº de alunos participantes</p>
                    <p className="value">
                      {solicitacaoKitLanche.quantidade_alunos} alunos
                    </p>
                  </div>
                  <div className="col-8 report-label-value">
                    <p>Tempo previsto do passeio</p>
                    <p className="value">
                      {solicitacaoKitLanche.solicitacao_kit_lanche &&
                        solicitacaoKitLanche.solicitacao_kit_lanche
                          .tempo_passeio_explicacao}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 float-right report-label-value">
                    <p>Opção desejada</p>
                    {solicitacaoKitLanche.solicitacao_kit_lanche &&
                      solicitacaoKitLanche.solicitacao_kit_lanche.kits.map(
                        (kit, key) => {
                          return <p className="value">Modelo {kit.nome}</p>;
                        }
                      )}
                  </div>
                </div>
                {solicitacaoKitLanche.solicitacao_kit_lanche &&
                  solicitacaoKitLanche.solicitacao_kit_lanche.kits && (
                    <div className="row">
                      <div className="col-12 float-right report-label-value">
                        <p>Nº total de kits</p>
                        <p className="value">
                          {solicitacaoKitLanche.solicitacao_kit_lanche.kits
                            .length *
                            solicitacaoKitLanche.quantidade_alunos}{" "}
                          kits
                        </p>
                      </div>
                    </div>
                  )}
                <div className="row">
                  <div className="col-12 report-label-value">
                    <p>Observações</p>
                    <p
                      className="value"
                      dangerouslySetInnerHTML={{
                        __html:
                          solicitacaoKitLanche.solicitacao_kit_lanche &&
                          solicitacaoKitLanche.solicitacao_kit_lanche.descricao
                      }}
                    />
                  </div>
                </div>
                {solicitacaoKitLanche.status === statusEnum.DRE_VALIDADO && (
                  <div className="form-group row float-right mt-4">
                    <Botao
                      texto={"Negar Solicitação"}
                      className="ml-3"
                      onClick={() => this.showModal()}
                      type={BUTTON_TYPE.BUTTON}
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                    />
                    <Botao
                      texto="Autorizar Solicitação"
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
