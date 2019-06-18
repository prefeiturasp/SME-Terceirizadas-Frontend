import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field, reduxForm, formValueSelector } from "redux-form";
import BaseButton, { ButtonStyle, ButtonType } from "../Shareable/button";
import "../Shareable/custom.css";

class DashboardDRE extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { enrolled, handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.props.handleSubmit)}>
          <Field component={"input"} type="hidden" name="uuid" />
          <span className="page-title">Solicitação Unificada</span>
          <div className="card mt-3">
            <div className="card-body">
              <span className="blockquote-sme">
                Nº de Matriculados DRE Ipiranga
              </span>
              <div />
              <span className="badge-sme badge-secondary-sme">{enrolled}</span>
              <span className="blockquote-sme pl-2 text-color-sme-silver">
                Informação automática disponibilizada no Cadastro da Unidade
                Escolar
              </span>
              <p className="pt-3 blockquote-sme">Lotes pertencentes à DRE</p>
              <div>
                <table className="table-lote">
                  <tr>
                    <th>Lote</th>
                    <th>Tipo de Gestão</th>
                  </tr>
                  <tr>
                    <td>7A IP I IPIRANGA</td>
                    <td>TERC TOTAL</td>
                  </tr>
                  <tr>
                    <td>7A IP II IPIRANGA</td>
                    <td>TERC TOTAL</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div className="card mt-3">
            <div className="card-body">
              <div className="card-title font-weight-bold title-color">
                Pedido Genérico
              </div>
              <p>Acesse o formulário para fazer uma Solicitação Unificada</p>
              <BaseButton
                label="Solicitação Unificada"
                onClick={handleSubmit(values => this.handleSubmit(values))}
                type={ButtonType.BUTTON}
                style={ButtonStyle.OutlinePrimary}
              />
            </div>
          </div>
          <div className="card mt-3">
            <div className="card-body">
              <div className="card-title font-weight-bold dashboard-card-title">
                <i className="fas fa-thumbtack" />
                Painel de Status de Solicitações
                <i className="fas fa-pen" />
              </div>
              <div>
                <p className="current-date">
                  Data: <span>28 de março de 2019</span>
                </p>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="card card-panel card-authorized">
                    <div className="card-title-status">
                      <i className="fas fa-check" />
                      Autorizadas
                    </div>
                    <hr />
                    <p className="data">
                      12083 - 7A IP I - Solicitação Unificada
                      <span className="float-right">11:19</span>
                    </p>
                    <p className="data">
                      12083 - 7A IP I - Solicitação de Kit Lanche
                      <span className="float-right">Qua 11:07</span>
                    </p>
                    <p className="data">
                      12083 - 7A IP I - Solicitação Unificada
                      <span className="float-right">Qua 10:07</span>
                    </p>
                    <a href="#" className="see-more">
                      Ver Mais
                    </a>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card card-panel card-pending">
                    <div className="card-title-status">
                      <i className="fas fa-exclamation-triangle" />
                      Pendente Aprovação
                    </div>
                    <hr />
                    <p className="data">
                      12083 - 7A IP I - Solicitação Unificada
                      <span className="float-right">11:19</span>
                    </p>
                    <p className="data">
                      12083 - 7A IP I - Solicitação de Kit Lanche
                      <span className="float-right">Qua 11:07</span>
                    </p>
                    <p className="data">
                      12083 - 7A IP I - Solicitação Unificada
                      <span className="float-right">Qua 10:07</span>
                    </p>
                    <a href="#" className="see-more">
                      Ver Mais
                    </a>
                  </div>
                </div>
              </div>
              <div className="row pt-3">
                <div className="col-6">
                  <div className="card card-panel card-denied">
                    <div className="card-title-status">
                      <i className="fas fa-ban" />
                      Recusadas
                    </div>
                    <hr />
                    <p className="data">
                      12083 - 7A IP I - Solicitação Unificada
                      <span className="float-right">11:19</span>
                    </p>
                    <p className="data">
                      12083 - 7A IP I - Solicitação de Kit Lanche
                      <span className="float-right">Qua 11:07</span>
                    </p>
                    <p className="data">
                      12083 - 7A IP I - Solicitação Unificada
                      <span className="float-right">Qua 10:07</span>
                    </p>
                    <a href="#" className="see-more">
                      Ver Mais
                    </a>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card card-panel card-cancelled">
                    <div className="card-title-status">
                      <i className="fas fa-times-circle" />
                      Canceladas
                    </div>
                    <hr />
                    <p className="data">
                      12083 - 7A IP I - Solicitação Unificada
                      <span className="float-right">11:19</span>
                    </p>
                    <p className="data">
                      12083 - 7A IP I - Solicitação de Kit Lanche
                      <span className="float-right">Qua 11:07</span>
                    </p>
                    <p className="data">
                      12083 - 7A IP I - Solicitação Unificada
                      <span className="float-right">Qua 10:07</span>
                    </p>
                    <a href="#" className="see-more">
                      Ver Mais
                    </a>
                  </div>
                </div>
              </div>
              <p className="caption">Legenda</p>
              <div className="caption-choices">
                <span>
                  <i className="fas fa-check" />
                  Solicitação Autorizada
                </span>
                <span>
                  <i className="fas fa-exclamation-triangle" />
                  Solicitação Pendente Aprovação
                </span>
                <span>
                  <i className="fas fa-ban" />
                  Solicitação Recusadas
                </span>
                <span>
                  <i className="fas fa-times-circle" />
                  Solicitação Canceladas
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const DashboardDREForm = reduxForm({
  form: "dashboardDRE",
  enableReinitialize: true
})(DashboardDRE);
const selector = formValueSelector("foodInclusion");
const mapStateToProps = state => {
  return {
    initialValues: state.foodInclusion.data,
    description_first_period: selector(state, "description_first_period"),
    description_second_period: selector(state, "description_second_period"),
    description_third_period: selector(state, "description_third_period"),
    description_fourth_period: selector(state, "description_fourth_period"),
    description_integrate: selector(state, "description_integrate")
  };
};

/*const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadFoodInclusion
    },
    dispatch
  );*/

export default connect(
  mapStateToProps
  //mapDispatchToProps
)(DashboardDREForm);
