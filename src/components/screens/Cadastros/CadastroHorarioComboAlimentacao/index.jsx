import React, { Component, Fragment } from "react";
import { Field, reduxForm } from "redux-form";
import { InputText } from "../../../Shareable/Input/InputText";
import { InputHorario } from "../../../Shareable/Input/InputHorario";
import { verificaSeCampoEhValido } from "./helper";
import Wizard from "../../../Shareable/Wizard";
import Botao from "../../../Shareable/Botao";
import { BUTTON_TYPE, BUTTON_STYLE } from "../../../Shareable/Botao/constants";
import "./style.scss";
import moment from "moment";

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

  render() {
    const {
      vinculosDeCombos,
      periodoEscolar,
      comboAlimentacaoAtual
    } = this.state;
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
                const campoValido = verificaSeCampoEhValido(
                  vinculosDeCombos,
                  periodoEscolar,
                  comboAlimentacaoAtual
                );
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
                        !combo.uuid
                          ? "Informe a hora inicial"
                          : "---------------------"
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
                          ? campoValido
                            ? "combo-ativo"
                            : "combo-ativo-invalido"
                          : "combo-inativo"
                      }`}
                      nameEmpty={
                        !combo.uuid
                          ? "Informe a hora inicial"
                          : "----------------------"
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
            <Botao
              texto={"Confirmar"}
              className="botao-desabilitado"
              type={BUTTON_TYPE.BUTTON}
              style={BUTTON_STYLE.GREEN_OUTLINE}
            />
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
