import React, { Component, Fragment } from "react";
import { Field, reduxForm } from "redux-form";
import { InputText } from "../../../Shareable/Input/InputText";
import { InputHorario } from "../../../Shareable/Input/InputHorario";
import {
  todosOsCamposValidos,
  ultimoComboDisponivel,
  ultimoPeriodoDaEscola,
  salvaComboEHorarios
} from "./helper";
import HTTP_STATUS from "http-status-codes";
import Wizard from "../../../Shareable/Wizard";
import Botao from "../../../Shareable/Botao";
import { BUTTON_TYPE, BUTTON_STYLE } from "../../../Shareable/Botao/constants";
import "./style.scss";
import moment from "moment";
import { toastError } from "../../../Shareable/Toast/dialogs";

class CadastroHorarioComboAlimentacao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vinculosDeCombos: null,
      periodoEscolar: 0,
      comboAlimentacaoAtual: 0
    };
  }

  componentDidUpdate(prevProps) {
    const { vinculosDeCombos } = this.props;
    if (prevProps.vinculosDeCombos !== this.props.vinculosDeCombos) {
      this.setState({ vinculosDeCombos });
    }
    this.props.change("quantidade_alunos", 54);
  }

  obterHoraInicio = hora => {
    let {
      vinculosDeCombos,
      periodoEscolar,
      comboAlimentacaoAtual
    } = this.state;
    const horario = moment(hora).format("HH:mm:ss");
    vinculosDeCombos[periodoEscolar].combos[
      comboAlimentacaoAtual
    ].hora_inicial = horario;
    this.setState({ vinculosDeCombos });
  };

  obterHoraFim = hora => {
    let {
      vinculosDeCombos,
      periodoEscolar,
      comboAlimentacaoAtual
    } = this.state;
    const horario = moment(hora).format("HH:mm:ss");
    vinculosDeCombos[periodoEscolar].combos[
      comboAlimentacaoAtual
    ].hora_final = horario;
    this.setState({ vinculosDeCombos });
  };

  retornaUuidDoCombo = () => {
    let {
      vinculosDeCombos,
      periodoEscolar,
      comboAlimentacaoAtual
    } = this.state;
    return vinculosDeCombos[periodoEscolar].combos[comboAlimentacaoAtual].uuid;
  };

  enviarComboDeHorarios = () => {
    let {
      vinculosDeCombos,
      periodoEscolar,
      comboAlimentacaoAtual
    } = this.state;
    const uuidCombo = this.retornaUuidDoCombo();
    let response = null;
    if (uuidCombo === null) {
      response = salvaComboEHorarios(
        vinculosDeCombos,
        periodoEscolar,
        comboAlimentacaoAtual
      );
    } else {
      // console.log("kfdjkfdjkfjsdksdf");
    }

    if (response.status === HTTP_STATUS.CREATED) {
      vinculosDeCombos[periodoEscolar].combos[comboAlimentacaoAtual].uuid =
        response.uuid;
    } else if (response.status === HTTP_STATUS.OK) {
      // console.log("kfdjkfdjkfjsdksdf");
    } else {
      toastError("Erro ao salvar combo");
    }
  };

  render() {
    const {
      vinculosDeCombos,
      periodoEscolar,
      comboAlimentacaoAtual
    } = this.state;
    vinculosDeCombos &&
      ultimoComboDisponivel(
        vinculosDeCombos,
        periodoEscolar,
        comboAlimentacaoAtual
      );
    const { naoPermitido } = this.props;
    return !vinculosDeCombos ? (
      !naoPermitido ? (
        <div>Carregando...</div>
      ) : (
        <div>Voce não tem permissão</div>
      )
    ) : (
      <form className="card mt-3">
        <article className="grid-box">
          <header>Cruzamento das possibilidades</header>
          <Wizard
            arrayOfObjects={vinculosDeCombos}
            currentStep={periodoEscolar}
            nameItem="nome"
          />
          <section className="conteudo-wizard">
            <article className="numero-alunos">
              <section className="form-qtd-alunos">
                <header className="mb-2">N° de alunos</header>
                <article className="grid-form-alunos">
                  <Field name="quantidade_alunos" component={InputText} />
                  <div>
                    <i className="fas fa-pen" />
                  </div>
                </article>
              </section>
            </article>
            <div className="borda" />
            <article className="horarios-alimentacao">
              <nav className="mb-2">Tipo de alimentação</nav>
              <nav className="mb-2">Horário Início</nav>
              <nav className="mb-2">Horário de Término </nav>
              {vinculosDeCombos[periodoEscolar].combos.map((combo, index) => {
                return (
                  <Fragment key={index}>
                    <div
                      className={`combo-tipo-alimentacao mb-3
                        ${
                          comboAlimentacaoAtual === index
                            ? "combo-atual"
                            : "proximo-combo"
                        }`}
                    >
                      <nav>{combo.label}</nav> <div />
                    </div>
                    <Field
                      name={`hora_inicial_${index}`}
                      className={`${
                        comboAlimentacaoAtual === index
                          ? "combo-ativo"
                          : "combo-inativo"
                      }`}
                      nameEmpty={
                        !combo.uuid ? "Hora Inicial" : combo.hora_inicial
                      }
                      component={InputHorario}
                      onChange={date => this.obterHoraInicio(date)}
                      hora={combo.hora_inicial}
                      disabled={comboAlimentacaoAtual !== index ? true : false}
                    />
                    <Field
                      name={`hora_final_${index}`}
                      className={`${
                        comboAlimentacaoAtual === index
                          ? "combo-ativo"
                          : "combo-inativo"
                      }`}
                      nameEmpty={
                        !combo.uuid ? "Hora Término" : combo.hora_final
                      }
                      component={InputHorario}
                      hora={combo.hora_final}
                      onChange={date => this.obterHoraFim(date)}
                      disabled={comboAlimentacaoAtual !== index ? true : false}
                    />
                  </Fragment>
                );
              })}
            </article>
          </section>
          <section className="mt-5 footer-botoes">
            {todosOsCamposValidos(
              vinculosDeCombos,
              periodoEscolar,
              comboAlimentacaoAtual
            ) ? (
              ultimoComboDisponivel(
                vinculosDeCombos,
                periodoEscolar,
                comboAlimentacaoAtual
              ) ? (
                ultimoPeriodoDaEscola(vinculosDeCombos, periodoEscolar) ? (
                  <Botao
                    texto={"Finalizar"}
                    type={BUTTON_TYPE.BUTTON}
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                    onClick={() => this.enviarComboDeHorarios()}
                  />
                ) : (
                  <Botao
                    texto={"Próximo"}
                    type={BUTTON_TYPE.BUTTON}
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                    onClick={() => this.enviarComboDeHorarios()}
                  />
                )
              ) : (
                <Botao
                  texto={"Confirmar"}
                  type={BUTTON_TYPE.BUTTON}
                  style={BUTTON_STYLE.GREEN_OUTLINE}
                  onClick={() => this.enviarComboDeHorarios()}
                />
              )
            ) : (
              <Botao
                texto={"Confirmar"}
                className="desativado"
                type={BUTTON_TYPE.BUTTON}
                style={BUTTON_STYLE.GREEN_OUTLINE}
              />
            )}
          </section>
        </article>
      </form>
    );
  }
}

CadastroHorarioComboAlimentacao = reduxForm({
  form: "cadastroHorarioCombosAlimentacao"
})(CadastroHorarioComboAlimentacao);

export default CadastroHorarioComboAlimentacao;
