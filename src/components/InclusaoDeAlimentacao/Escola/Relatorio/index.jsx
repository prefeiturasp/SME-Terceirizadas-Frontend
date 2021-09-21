import React, { Component } from "react";
import { formValueSelector, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Botao } from "../../../Shareable/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
  BUTTON_TYPE
} from "../../../Shareable/Botao/constants";
import { INCLUSAO_ALIMENTACAO, ESCOLA } from "../../../../configs/constants";
import { FluxoDeStatus } from "../../../Shareable/FluxoDeStatus";
import { meusDados } from "../../../../services/perfil.service";
import {
  prazoDoPedidoMensagem,
  corDaMensagem,
  stringSeparadaPorVirgulas,
  parseRelatorioURLParams,
  ehInclusaoContinua
} from "helpers/utilities";
import { ModalCancelarInclusaoDeAlimentacao } from "./components/ModalCancelarInclusaoAlimentacao";
import { escolaPodeCancelar } from "../../../../constants/shared";
import { fluxoPartindoEscola } from "../../../Shareable/FluxoDeStatus/helper";
import { obterSolicitacaoDeInclusaoDeAlimentacao } from "services/inclusaoDeAlimentacao";

class Relatorio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unifiedSolicitationList: [],
      uuid: null,
      meusDados: null,
      redirect: false,
      showModal: false,
      inclusaoDeAlimentacao: null,
      prazoDoPedidoMensagem: null
    };
    this.closeModal = this.closeModal.bind(this);
    this.setRedirect = this.setRedirect.bind(this);
  }

  setRedirect() {
    this.setState({
      redirect: true
    });
  }

  renderizarRedirecionamentoParaPedidosDeInclusao = () => {
    if (this.state.redirect) {
      return <Redirect to={`/`} />;
    }
  };

  componentDidMount() {
    const [uuid, tipoSolicitacao] = parseRelatorioURLParams();
    meusDados().then(response => {
      this.setState({
        meusDados: response
      });
    });

    if (uuid) {
      obterSolicitacaoDeInclusaoDeAlimentacao(uuid, tipoSolicitacao).then(
        response => {
          this.setState({
            inclusaoDeAlimentacao: response,
            tipoSolicitacao,
            uuid,
            prazoDoPedidoMensagem: prazoDoPedidoMensagem(response.prioridade)
          });
        }
      );
    }
  }

  showModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  renderParteAvulsa() {
    const { tipoSolicitacao, inclusaoDeAlimentacao } = this.state;
    return (
      !ehInclusaoContinua(tipoSolicitacao) && (
        <table className="table-periods">
          <tr>
            <th>Data</th>
            <th>Motivo</th>
          </tr>
          {inclusaoDeAlimentacao.inclusoes.map((inclusao, key) => {
            return (
              <tr key={key}>
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
    const { tipoSolicitacao, inclusaoDeAlimentacao } = this.state;
    return (
      ehInclusaoContinua(tipoSolicitacao) && (
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
      meusDados,
      uuid
    } = this.state;
    const { justificativa, tipoSolicitacao } = this.props;
    return (
      <div className="report">
        {!inclusaoDeAlimentacao ? (
          <div>Carregando...</div>
        ) : (
          <div>
            <ModalCancelarInclusaoDeAlimentacao
              closeModal={this.closeModal}
              showModal={showModal}
              uuid={uuid}
              justificativa={justificativa}
              meusDados={meusDados}
              tipoSolicitacao={tipoSolicitacao}
              inclusaoDeAlimentacao={inclusaoDeAlimentacao}
              setRedirect={this.setRedirect}
            />
            {this.renderizarRedirecionamentoParaPedidosDeInclusao()}

            <form onSubmit={this.props.handleSubmit}>
              <span className="page-title">{`Inclusão de Alimentacão - Pedido # ${
                inclusaoDeAlimentacao.id_externo
              }`}</span>
              <Link to={`/${ESCOLA}/${INCLUSAO_ALIMENTACAO}`}>
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
                        {inclusaoDeAlimentacao.escola &&
                          inclusaoDeAlimentacao.escola.diretoria_regional &&
                          inclusaoDeAlimentacao.escola.diretoria_regional.nome}
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
                    <div className="col-2 report-label-value">
                      <p>Empresa</p>
                      <p className="value-important" />
                    </div>
                  </div>
                  <hr />
                  {inclusaoDeAlimentacao.logs && (
                    <div className="row">
                      <FluxoDeStatus
                        listaDeStatus={inclusaoDeAlimentacao.logs}
                        fluxo={fluxoPartindoEscola}
                      />
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
                  {escolaPodeCancelar(inclusaoDeAlimentacao.status) && (
                    <div className="form-group row mt-4">
                      <div className="col-12 text-right">
                        <Botao
                          texto={"Cancelar"}
                          onClick={() => this.showModal()}
                          type={BUTTON_TYPE.BUTTON}
                          style={BUTTON_STYLE.GREEN_OUTLINE}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }
}

const RelatorioForm = reduxForm({
  form: "inclusaoDeAlimentacaoForm",
  enableReinitialize: true
})(Relatorio);

const selector = formValueSelector("inclusaoDeAlimentacaoForm");

const mapStateToProps = state => {
  return {
    justificativa: selector(state, "justificativa")
  };
};

export default connect(mapStateToProps)(RelatorioForm);
