import React, { Component, Fragment } from "react";
import HTTP_STATUS from "http-status-codes";
import CardMatriculados from "../Shareable/CardMatriculados";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { bindActionCreators } from "redux";
import { loadAlteracaoCardapio } from "../../reducers/alteracaoCardapioReducer";
import { connect } from "react-redux";
import { Rascunhos } from "./Rascunhos";
import { required } from "../../helpers/fieldValidators";
import { LabelAndCombo } from "../Shareable/labelAndInput/labelAndInput";
import { deleteAlteracaoCardapio } from "../../services/alteracaoDecardapio.service";
import { toastError, toastSuccess } from "../Shareable/Toast/dialogs";
import { InputComData } from "../Shareable/DatePicker";

import "./style.scss";

const ENTER = 13;

class AlteracaoCardapio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      periodos: [],
      loading: true,
      alteracaoCardapioList: [],
      status: "SEM STATUS",
      title: "Nova Alteração de Cardápio",
      id: "",
      showModal: false,
      salvarAtualizarLbl: "Salvar Rascunho",

      options: {
        MANHA: [],
        TARDE: [],
        NOITE: [],
        INTEGRAL: []
      }
    };
  }

  OnDeleteButtonClicked(id_externo, uuid) {
    if (window.confirm("Deseja remover este rascunho?")) {
      deleteAlteracaoCardapio(uuid).then(
        statusCode => {
          if (statusCode === HTTP_STATUS.NO_CONTENT) {
            toastSuccess(`Rascunho # ${id_externo} excluído com sucesso`);
            this.refresh();
          } else {
            toastError("Houve um erro ao excluir o rascunho");
          }
        },
        function(error) {
          toastError("Houve um erro ao excluir o rascunho");
        }
      );
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.periodos.length === 0 && this.props.periodos.length > 0) {
      this.setState({
        periodos: this.props.periodos
      });
    }
    const { motivos, meusDados, proximos_dois_dias_uteis } = this.props;
    const { loading, periodos } = this.state;
    if (
      motivos !== [] &&
      periodos !== [] &&
      meusDados !== null &&
      proximos_dois_dias_uteis !== null &&
      loading
    ) {
      this.setState({
        loading: false
      });
    }
  }

  resetForm(event) {
    this.props.reset("alteracaoCardapio");
    this.props.loadAlteracaoCardapio(null);
    this.setState({
      status: "SEM STATUS",
      title: "Nova Alteração de Cardápio",
      id: "",
      showModal: false,
      salvarAtualizarLbl: "Salvar Rascunho",
      dias_razoes: [
        {
          id: Math.floor(Math.random() * (1000000 - 9999999)) + 1000000,
          data: null,
          motivo: null,
          observacao: null,
          data_inicial: null,
          data_final: null,
          weekdays: []
        }
      ],
      options: {
        MANHA: [],
        TARDE: [],
        NOITE: [],
        INTEGRAL: []
      }
    });
  }

  render() {
    const { loading, alteracaoCardapioList, title } = this.state;
    const {
      handleSubmit,
      meusDados,
      proximos_dois_dias_uteis,
      motivos
    } = this.props;
    return (
      <Fragment>
        {loading ? (
          <div>Carregando...</div>
        ) : (
          <form className="mt-3" onSubmit={handleSubmit}>
            <Field component={"input"} type="hidden" name="uuid" />
            <CardMatriculados
              numeroAlunos={meusDados.escolas[0].quantidade_alunos}
            />

            {alteracaoCardapioList.length > 0 && (
              <section className="mt-3">
                <span className="page-title">Rascunhos</span>
                <Rascunhos
                  alteracaoCardapioList={alteracaoCardapioList}
                  OnDeleteButtonClicked={this.OnDeleteButtonClicked}
                  resetForm={event => this.resetForm(event)}
                  OnEditButtonClicked={params =>
                    this.OnEditButtonClicked(params)
                  }
                />
              </section>
            )}
            <section className="card  mt-3">
              <article className="card-body">
                <div
                  className="card-title font-weight-bold"
                  style={this.fontHeader}
                >
                  Descrição da Alteração
                </div>
                <section className="section-form-datas mt-4">
                  <Field
                    component={InputComData}
                    //onBlur={event => this.onAlterarDiaChanged(event)}
                    name="alterar_dia"
                    minDate={proximos_dois_dias_uteis}
                    label="Alterar dia"
                    disabled={this.props.data_inicial || this.props.data_final}
                  />
                  <div className="opcao-data">Ou</div>
                  <Field
                    component={InputComData}
                    name="data_inicial"
                    label="De"
                    disabled={this.props.alterar_dia}
                  />
                  <Field
                    component={InputComData}
                    name="data_final"
                    label="Até"
                    disabled={this.props.alterar_dia}
                  />
                </section>
                <section className="section-form-motivo mt-3">
                  <Field
                    component={LabelAndCombo}
                    name="motivo"
                    label="Motivo"
                    options={motivos}
                    validate={required}
                  />
                </section>
              </article>
              <hr />
              <article className="card-body">
                <header className="descricao-periodos-alimentacao">
                  <div>Período</div>
                  <div>Alterar alimentação de:</div>
                  <div>Para alimentação:</div>
                  <div>N° de alunos</div>
                </header>

                <section className="item-periodo-alimentacao">
                  <Fragment>
                    <label htmlFor="check" className="checkbox-label">
                      <Field component={"input"} type="checkbox" name="check" />
                      <span
                        // onClick={() =>
                        //   this.props.change(
                        //     `substituicoes_${period.nome}.check`,
                        //     !checkMap[period.nome]
                        //   )
                        // }
                        className="checkbox-custom"
                      />
                      <div className="teste">MANHÃ</div>
                    </label>
                  </Fragment>

                  <div className="cor-teste">.</div>
                  <div className="cor-teste">.</div>
                  <div className="cor-teste">.</div>
                </section>

                <section className="item-periodo-alimentacao">
                  <div className="cor-teste">.</div>
                  <div className="cor-teste">.</div>
                  <div className="cor-teste">.</div>
                  <div className="cor-teste">.</div>
                </section>
                <section className="item-periodo-alimentacao">
                  <div className="cor-teste">.</div>
                  <div className="cor-teste">.</div>
                  <div className="cor-teste">.</div>
                  <div className="cor-teste">.</div>
                </section>
                <section className="item-periodo-alimentacao">
                  <div className="cor-teste">.</div>
                  <div className="cor-teste">.</div>
                  <div className="cor-teste">.</div>
                  <div className="cor-teste">.</div>
                </section>
                <section className="item-periodo-alimentacao">
                  <div className="cor-teste">.</div>
                  <div className="cor-teste">.</div>
                  <div className="cor-teste">.</div>
                  <div className="cor-teste">.</div>
                </section>
              </article>
            </section>
          </form>
        )}
      </Fragment>
    );
  }
}

const AlteracaoCardapioForm = reduxForm({
  form: "alteracaoCardapio",
  enableReinitialize: true
})(AlteracaoCardapio);

const selector = formValueSelector("alteracaoCardapio");

const mapStateToProps = state => {
  return {
    initialValues: state.alteracaoCardapio.data
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadAlteracaoCardapio
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlteracaoCardapioForm);
