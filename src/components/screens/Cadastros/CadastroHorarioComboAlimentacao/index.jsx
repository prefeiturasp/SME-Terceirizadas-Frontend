import React, { Component, Fragment } from "react";
import { Field, reduxForm } from "redux-form";
import { InputText } from "../../../Shareable/Input/InputText";
import { InputHorario } from "../../../Shareable/Input/InputHorario";
import {
  todosOsCamposValidos,
  ultimoComboDisponivel,
  ultimoPeriodoDaEscola
} from "./helper";
import HTTP_STATUS from "http-status-codes";
import Wizard from "../../../Shareable/Wizard";
import Botao from "../../../Shareable/Botao";
import { BUTTON_TYPE, BUTTON_STYLE } from "../../../Shareable/Botao/constants";
import "./style.scss";
import moment from "moment";
import { toastError } from "../../../Shareable/Toast/dialogs";
import {
  postHorariosCombosPorEscola,
  putHorariosCombosPorEscola
} from "../../../../services/cadastroTipoAlimentacao.service";

class CadastroHorarioComboAlimentacao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vinculosDeCombos: null,
      periodoEscolar: 0,
      comboAlimentacaoAtual: 0,
      meusDados: null,
      exibirRelatorio: null
    };
  }

  componentDidUpdate(prevProps) {
    const { vinculosDeCombos, meusDados, horariosDosCombos } = this.props;
    if (prevProps.vinculosDeCombos !== this.props.vinculosDeCombos) {
      if (meusDados) {
        let todosOsCombos = [];
        vinculosDeCombos.forEach(vinculo => {
          vinculo.combos.forEach(combo => {
            todosOsCombos.push(combo);
          });
        });
        if (todosOsCombos.length === horariosDosCombos.length) {
          this.setState({ exibirRelatorio: true });
        } else {
          this.setState({ exibirRelatorio: false });
        }
      }
      this.setState({ vinculosDeCombos, meusDados });
    }
    this.props.change("quantidade_alunos", 54);
  }

  obterHoraInicio = hora => {
    let {
      vinculosDeCombos,
      periodoEscolar,
      comboAlimentacaoAtual
    } = this.state;
    const horario = moment(hora).format("HH:mm");
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
    const horario = moment(hora).format("HH:mm");
    vinculosDeCombos[periodoEscolar].combos[
      comboAlimentacaoAtual
    ].hora_final = horario;
    this.setState({ vinculosDeCombos });
  };

  enviarETrocaDePeriodo = () => {
    let {
      vinculosDeCombos,
      periodoEscolar,
      comboAlimentacaoAtual
    } = this.state;
    const combo =
      vinculosDeCombos[periodoEscolar].combos[comboAlimentacaoAtual];
    const request = {
      combo_tipos_alimentacao: combo.combo_tipos_alimentacao,
      escola: combo.escola,
      hora_inicial: combo.hora_inicial,
      hora_final: combo.hora_final
    };
    if (!combo.uuid) {
      postHorariosCombosPorEscola(request).then(response => {
        if (response.status === HTTP_STATUS.CREATED) {
          vinculosDeCombos[periodoEscolar].combos[comboAlimentacaoAtual].uuid =
            response.data.uuid;
          this.setState({
            vinculosDeCombos,
            comboAlimentacaoAtual: 0,
            periodoEscolar: periodoEscolar + 1
          });
        } else {
          toastError("Erro ao salvar combo");
        }
      });
    } else {
      putHorariosCombosPorEscola(request, combo.uuid).then(response => {
        if (response.status === HTTP_STATUS.OK) {
          this.setState({
            vinculosDeCombos,
            comboAlimentacaoAtual: 0,
            periodoEscolar: periodoEscolar + 1
          });
        } else {
          toastError("Erro ao alterar combo");
        }
      });
    }
  };

  enviarEFinalizar = () => {
    let {
      vinculosDeCombos,
      periodoEscolar,
      comboAlimentacaoAtual
    } = this.state;
    const combo =
      vinculosDeCombos[periodoEscolar].combos[comboAlimentacaoAtual];
    const request = {
      combo_tipos_alimentacao: combo.combo_tipos_alimentacao,
      escola: combo.escola,
      hora_inicial: combo.hora_inicial,
      hora_final: combo.hora_final
    };
    if (!combo.uuid) {
      postHorariosCombosPorEscola(request).then(response => {
        if (response.status === HTTP_STATUS.CREATED) {
          vinculosDeCombos[periodoEscolar].combos[comboAlimentacaoAtual].uuid =
            response.data.uuid;
          this.setState({
            exibirRelatorio: true,
            vinculosDeCombos,
            comboAlimentacaoAtual: 0,
            periodoEscolar: 0
          });
        } else {
          toastError("Erro ao salvar combo");
        }
      });
    } else {
      putHorariosCombosPorEscola(request, combo.uuid).then(response => {
        if (response.status === HTTP_STATUS.OK) {
          this.setState({
            exibirRelatorio: true,
            vinculosDeCombos,
            comboAlimentacaoAtual: 0,
            periodoEscolar: 0
          });
        } else {
          toastError("Erro ao alterar combo");
        }
      });
    }
  };

  enviarComboDeHorarios = () => {
    let {
      vinculosDeCombos,
      periodoEscolar,
      comboAlimentacaoAtual
    } = this.state;
    const combo =
      vinculosDeCombos[periodoEscolar].combos[comboAlimentacaoAtual];
    const request = {
      combo_tipos_alimentacao: combo.combo_tipos_alimentacao,
      escola: combo.escola,
      hora_inicial: combo.hora_inicial,
      hora_final: combo.hora_final
    };
    if (!combo.uuid) {
      postHorariosCombosPorEscola(request).then(response => {
        if (response.status === HTTP_STATUS.CREATED) {
          vinculosDeCombos[periodoEscolar].combos[comboAlimentacaoAtual].uuid =
            response.data.uuid;
          this.setState({
            vinculosDeCombos,
            comboAlimentacaoAtual: comboAlimentacaoAtual + 1
          });
        } else {
          toastError("Erro ao salvar combo");
        }
      });
    } else {
      putHorariosCombosPorEscola(request, combo.uuid).then(response => {
        if (response.status === HTTP_STATUS.OK) {
          this.setState({
            vinculosDeCombos,
            comboAlimentacaoAtual: comboAlimentacaoAtual + 1
          });
        } else {
          toastError("Erro ao alterar combo");
        }
      });
    }
  };

  salvaComboEHorarios = (
    vinculosDeCombos,
    periodoEscolar,
    comboAlimentacaoAtual
  ) => {
    const comboHorario =
      vinculosDeCombos[periodoEscolar].combos[comboAlimentacaoAtual];
    const request = {
      combo_tipos_alimentacao: comboHorario.combo_tipos_alimentacao,
      escola: comboHorario.escola,
      hora_inicial: comboHorario.hora_inicial,
      hora_final: comboHorario.hora_final
    };
    postHorariosCombosPorEscola(request).then(resp => {
      return resp;
    });
  };

  detalhesPeriodo = (index, ativo) => {
    let { vinculosDeCombos } = this.state;
    vinculosDeCombos.forEach((vinculo, indice) => {
      if (index === indice) {
        vinculo.ativo = !ativo;
      } else {
        vinculo.ativo = false;
      }
    });
    this.setState({ vinculosDeCombos });
  };

  getPeriodoHorario = index => {
    let { vinculosDeCombos } = this.state;
    vinculosDeCombos.forEach(vinculo => {
      vinculo.ativo = false;
    });
    this.setState({
      periodoEscolar: index,
      exibirRelatorio: false,
      vinculosDeCombos
    });
  };

  render() {
    const {
      vinculosDeCombos,
      periodoEscolar,
      comboAlimentacaoAtual,
      meusDados,
      exibirRelatorio
    } = this.state;
    vinculosDeCombos &&
      ultimoComboDisponivel(
        vinculosDeCombos,
        periodoEscolar,
        comboAlimentacaoAtual
      );
    const { naoPermitido } = this.props;
    return !vinculosDeCombos ? (
      !naoPermitido && !meusDados ? (
        <div>Carregando...</div>
      ) : (
        <div>Voce não tem permissão</div>
      )
    ) : exibirRelatorio ? (
      <section className="card mt-3">
        <main className="grid-relatorio">
          <header>Resumo do cadastro</header>

          <article>
            <nav className="tipo-periodos">Tipos de períodos</nav>
            <section>
              {vinculosDeCombos.map((element, index) => {
                return (
                  <Fragment key={index}>
                    <div className={`teste ${element.ativo && "ativo"}`}>
                      <div className="periodo-escolar">
                        {element.periodo_escolar.nome}
                      </div>
                      <div className="icons-action">
                        {element.ativo ? (
                          <Fragment>
                            <i
                              className="fas fa-pen"
                              onClick={() => this.getPeriodoHorario(index)}
                            />
                            <i
                              className="fas fa-angle-up"
                              onClick={() =>
                                this.detalhesPeriodo(index, element.ativo)
                              }
                            />
                          </Fragment>
                        ) : (
                          <Fragment>
                            <i />
                            <i
                              className="fas fa-angle-down"
                              onClick={() =>
                                this.detalhesPeriodo(index, element.ativo)
                              }
                            />
                          </Fragment>
                        )}
                      </div>
                    </div>
                    {element.ativo && (
                      <main
                        className={`grid-conteudo-periodo ${element.ativo &&
                          "ativo-conteudo"}`}
                      >
                        <nav>Tipos de alimentos atuais</nav>
                        <nav>Horário Inicio</nav>
                        <nav>Horário Término</nav>
                        {element.combos.map((combo, index) => {
                          return (
                            <Fragment key={index}>
                              <div>{combo.label}</div>
                              <div>{combo.hora_inicial}</div>
                              <div>{combo.hora_final}</div>
                            </Fragment>
                          );
                        })}
                      </main>
                    )}
                  </Fragment>
                );
              })}
            </section>
          </article>
        </main>
      </section>
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
                            : comboAlimentacaoAtual > index
                            ? "combo-passado"
                            : "proximo-combo"
                        }`}
                    >
                      <nav>{combo.label}</nav>{" "}
                      <div
                        className={
                          comboAlimentacaoAtual > index && "checado-item-ok"
                        }
                      >
                        {comboAlimentacaoAtual > index && (
                          <i className="fas fa-check" />
                        )}
                      </div>
                    </div>
                    <Field
                      name={`hora_inicial_${index}`}
                      className={`${
                        comboAlimentacaoAtual === index
                          ? "combo-ativo"
                          : comboAlimentacaoAtual > index
                          ? "combo-inativo horario-confirmado"
                          : "combo-inativo"
                      }`}
                      nameEmpty={"Hora Inicial"}
                      horaAtual={combo.hora_inicial}
                      component={InputHorario}
                      onChange={date => this.obterHoraInicio(date)}
                      disabled={comboAlimentacaoAtual !== index ? true : false}
                    />
                    <Field
                      name={`hora_final_${index}`}
                      className={`${
                        comboAlimentacaoAtual === index
                          ? "combo-ativo"
                          : comboAlimentacaoAtual > index
                          ? "combo-inativo horario-confirmado"
                          : "combo-inativo"
                      }`}
                      nameEmpty={"Hora Término"}
                      horaAtual={combo.hora_final}
                      component={InputHorario}
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
                    onClick={() => this.enviarEFinalizar()}
                  />
                ) : (
                  <Botao
                    texto={"Próximo"}
                    type={BUTTON_TYPE.BUTTON}
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                    onClick={() => this.enviarETrocaDePeriodo()}
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
