import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import "react-datepicker/dist/react-datepicker.css";
import './day-change.css'


export default class DayChange extends Component {

  constructor(props) {
    super(props);

    this.state = {
      food_period: {food_period: '', student_count: '', reason: ''},
      suspension_range: {from: new Date(), to: new Date()}
    };
  }

  validForm() {
    return true;
  }

  handleDatePickerFromChange = date => {
    this.setState({
      ...this.state,
      suspension_range: {
        ...this.state.suspension_range,
        from: date
      }
    });
  }

  handleDatePickerToChange = date => {
    this.setState({
      ...this.state,
      suspension_range: {
        ...this.state.suspension_range,
        to: date
      }
    });
  }

  render() {
    const { food_period, suspension_range } = this.state;
    return (
      <div className="container">
        <div>
          <label className="subtitle">Solicitações</label>
        </div>
        <div>
          <label className="category">Alteração de Dias do Cardápio</label>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group row">
            <div className="col-12">
              <label for="rf-responsible">Nº de Matriculados</label>
              <p className="number-registered">
                <span className="gray-rectangle">
                  150
                </span>
                Informação automática disponibilizada no
                <br />
                <span className="purple">
                  Cadastro da Unidade Escolar
                </span>
              </p>
             </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-6">
              <label for="rf-responsible">RF Responsável</label>
              <input type="text" className="form-control" name="rf-responsible"></input>
            </div>
            <div className="col-sm-6">
              <label for="role">Cargo / Função</label>
              <input type="text" className="form-control" name="role"></input>
            </div>
          </div>
          <div className="form-group">
            <label for="name">Nome</label>
            <input type="text" className="form-control" name="name"></input>
          </div>
          <div className="form-row">
            <div className="form-group col-sm-5">
              <label className="bold" for="food_period">Período de Alteração</label>
              <select placeholder="Selecione" name="food_period" className="form-control">
                <option value="" disabled selected>Selecione</option>
                <option>1º Período - Matutino</option>
              </select>
            </div>
            <div className="form-group col-sm-3">
              <label for="student_count">Nº de alunos</label>
              <input name="student_count" type="text" className="form-control"></input>
            </div>
            <div className="col-sm-4">
              <label for="reason_day">Motivo</label>
              <select placeholder="Selecione" name="reason_day" className="form-control">
                <option value="" disabled selected>Selecione</option>
                <option>1º Período - Matutino</option>
              </select>
            </div>
          </div>
          <label className="bold">Substituição</label>
          <div className="form-group row">
            <div className="input-group col-sm-5">
              <div className="input-group-prepend">
                <span class="input-group-text">Cardápio dia</span>
              </div>
              <DatePicker
                dateFormat="dd/MM/yyyy"
                selected={suspension_range.from}
                onChange={this.handleDatePickerFromChange}
                className="form-control"
                locale={ptBR}
              />
              <i className="fa fa-calendar fa-lg"></i>
            </div>
            <div className="col-sm-1 v-align">
              para
            </div>
            <div className="col-sm-1 v-align">
              <i className="fa fa-arrow-right" aria-hidden="true"></i>
            </div>
            <div className="active-calendar input-group col-sm-5">
              <div className="input-group-prepend">
                <span class="input-group-text">Cardápio dia</span>
              </div>
              <DatePicker
                dateFormat="dd/MM/yyyy"
                selected={suspension_range.to}
                onChange={this.handleDatePickerToChange}
                className="form-control"
                locale={ptBR}
              />
              <i className="fa fa-calendar fa-lg"></i>
            </div>
          </div>
          <div className="form-group">
            <label>Observação <span className="gray">(campo opcional)</span></label>
            <textarea className="form-control"></textarea>
          </div>
          <div className="form-group row">
            <div className="offset-sm-4 col-sm-4">
              <button
                type="button"
                onClick=""
                className="col-12 btn-lg btn-outline-primary"
              >
                Cancelar
              </button>
            </div>
            <div className="col-sm-4">
              <button
                type="button"
                onClick=""
                className="col-12 btn btn-lg btn-primary"
              >
                Enviar Solicitação
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
