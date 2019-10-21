import HTTP_STATUS from "http-status-codes";
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { reduxForm } from "redux-form";
import { toastError, toastSuccess } from "../../../Shareable/Toast/dialogs";
import { FluxoDeStatus } from "../../../Shareable/FluxoDeStatus";
import {
  getSuspensaoDeAlimentacaoUUID,
  terceirizadaTomaCienciaSuspensaoDeAlimentacao
} from "../../../../services/suspensaoDeAlimentacao.service";
import { stringSeparadaPorVirgulas } from "../../../../helpers/utilities";
import {
  SUSPENSAO_ALIMENTACAO,
  TERCEIRIZADA
} from "../../../../configs/constants";
import { statusEnum } from "../../../../constants/statusEnum";
import Botao from "../../../Shareable/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
  BUTTON_TYPE
} from "../../../Shareable/Botao/constants";
import "./style.scss";

class Relatorio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: null,
      suspensaoAlimentacao: null,
      dadosEscola: null,
      redirect: false
    };
  }

  setRedirect() {
    this.setState({
      redirect: true
    });
  }

  renderizarRedirecionamentoParaSuspensoesDeAlimentacao = () => {
    if (this.state.redirect) {
      return <Redirect to={`/${TERCEIRIZADA}/${SUSPENSAO_ALIMENTACAO}`} />;
    }
  };

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    if (uuid) {
      getSuspensaoDeAlimentacaoUUID(uuid).then(response => {
        let suspensaoAlimentacao = response.data;
        let dadosEscola = suspensaoAlimentacao.escola;
        this.setState({
          suspensaoAlimentacao,
          dadosEscola,
          uuid
        });
      });
    }
  }

  handleSubmit() {
    const uuid = this.state.uuid;
    terceirizadaTomaCienciaSuspensaoDeAlimentacao(uuid).then(
      response => {
        if (response.status === HTTP_STATUS.OK) {
          toastSuccess(
            "Ciência de suspensão de alimentação avisada com sucesso!"
          );
          this.setRedirect();
        } else if (response.status === HTTP_STATUS.BAD_REQUEST) {
          toastError("Erro ao tomar ciência de suspensão de alimentação");
        }
      },
      function() {
        toastError("Erro ao tomar ciência de suspensão de alimentação");
      }
    );
  }

  render() {
    const { suspensaoAlimentacao, dadosEscola } = this.state;
    return (
      <div className="report">
        {this.renderizarRedirecionamentoParaSuspensoesDeAlimentacao()}
        {!suspensaoAlimentacao ? (
          <div>Carregando...</div>
        ) : (
          <form onSubmit={this.props.handleSubmit}>
            <span className="page-title">{`Suspensão de Alimentação - Solicitação # ${
              suspensaoAlimentacao.id_externo
            }`}</span>
            <Link to={`/${TERCEIRIZADA}/${SUSPENSAO_ALIMENTACAO}`}>
              <Botao
                texto="voltar"
                type={BUTTON_TYPE.BUTTON}
                titulo="voltar"
                style={BUTTON_STYLE.BLUE}
                icon={BUTTON_ICON.ARROW_LEFT}
                className="float-right"
              />
            </Link>
            <div className="card mt-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-2">
                    <span className="badge-sme badge-secondary-sme">
                      <span className="id-of-solicitation-dre">
                        # {suspensaoAlimentacao.id_externo}
                      </span>
                      <br />{" "}
                      <span className="number-of-order-label">
                        ID DA SOLICITAÇÂO
                      </span>
                    </span>
                  </div>
                  <div className="report-div-beside-order suspension col-8">
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
                      {dadosEscola && dadosEscola.diretoria_regional.nome}
                    </p>
                  </div>
                  <div className="col-2 report-label-value">
                    <p>Lote</p>
                    <p className="value-important">
                      {dadosEscola && dadosEscola.lote.nome}
                    </p>
                  </div>
                  <div className="col-2 report-label-value">
                    <p>Tipo de Gestão</p>
                    <p className="value-important">
                      {dadosEscola && dadosEscola.tipo_gestao.nome}
                    </p>
                  </div>
                </div>
                <hr />
                {suspensaoAlimentacao.logs && (
                  <div className="row">
                    <FluxoDeStatus
                      listaDeStatus={suspensaoAlimentacao.logs}
                      tipoDeFluxo={"informativo"}
                    />
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
                    <p className="value">Descrição da Suspensão</p>
                  </div>
                </div>
                {/* {this.renderDetalheInversao()} */}
                <table className="table-periods">
                  <tr>
                    <th>Período</th>
                    <th>Tipos de Alimentação</th>
                    <th>Quantidade de Alunos</th>
                  </tr>
                  {suspensaoAlimentacao.quantidades_por_periodo.map(
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
                        __html: suspensaoAlimentacao.observacao
                      }}
                    />
                  </div>
                </div>
                {suspensaoAlimentacao.status === statusEnum.INFORMADO && (
                  <div className="form-group row float-right mt-4">
                    <Botao
                      texto="Ciente"
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
