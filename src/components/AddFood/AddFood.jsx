import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import "react-datepicker/dist/react-datepicker.css";
import './add-food.css'


export default class AddFood extends Component {

  constructor(props) {
    super(props);

    this.state = {
      start: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      food_periods: [{food_period: '', food_type: '', student_count: ''}],
      suspension_dates: [{day: new Date(), reason_day: ''}],
      suspension_ranges: [{from: new Date(), to: new Date(), reason_range: ''}]
    };

  }

  validForm() {
    return true;
  }

  handleAddFoodPeriod = () => {
    this.setState({
      food_periods: this.state.food_periods.concat([{food_period: '', food_type: '', student_count: ''}])
    });
  };

  handleRemoveFoodPeriod = idx => () => {
    this.setState({
      food_periods: this.state.food_periods.filter((_, index) => idx !== index)
    });
  };

  handleAddSuspensionDate = () => {
    this.setState({
      suspension_dates: this.state.suspension_dates.concat([{day: new Date(), reason_range: ''}])
    });
  };

  handleRemoveSuspensionDate = idx => () => {
    this.setState({
      suspension_dates: this.state.suspension_dates.filter((_, index) => idx !== index)
    });
  };

  handleAddSuspensionRange = () => {
    this.setState({
      suspension_ranges: this.state.suspension_ranges.concat([{from: new Date(), to: new Date(), reason_range: ''}])
    });
  };

  handleRemoveSuspensionRange = idx => () => {
    this.setState({
      suspension_ranges: this.state.suspension_ranges.filter((_, index) => idx !== index)
    });
  };


  handleDatePickerChange = date => {
    this.setState({
      start: date
    });
  }

  handleDatePickerStartChange = date => {
    this.setState({
      startDate: date
    });
  }

  handleDatePickerEndChange = date => {
    this.setState({
      endDate: date
    });
  }

  handleSubmit = event => {
    alert('email: ' + this.state.email + ' -  Password: ' + this.state.password)
    event.preventDefault();
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const { food_periods, suspension_dates, suspension_ranges } = this.state;
    return (
      <div className="container">
        <div>
          <label className="subtitle">Solicitações</label>
        </div>
        <div>
          <label className="category">Inclusão de Alimentação</label>
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
          {food_periods.map((food_period, index) => (
          <div className="form-row">
            <div className="form-group col-md-5">
              <label className="bold" for="food_period">Período de inclusão</label>
              <select placeholder="Selecione" name="food_period" className="form-control">
                <option value="" disabled selected>Selecione</option>
                <option>1º Período - Matutino</option>
              </select>
            </div>
            <div className="form-group col-md-4">
              <label for="food_type">Tipo de alimentação</label>
              <select name="food_type" className="form-control">
                <option selected>Selecione</option>
                <option>...</option>
              </select>
            </div>
            <div className="form-group col-md-2">
              <label for="student_count">Nº de alunos</label>
              <input name="student_count" type="text" className="form-control"></input>
            </div>
            <div className="form-group col-md-1">
              <i onClick={this.handleRemoveFoodPeriod(index)} className="fa fa-trash fa-2x icon" aria-hidden="true"></i>
            </div>
          </div>))}
          <div className="form-group row">
            <div className="col-sm-4">
              <button
                type="button"
                onClick={this.handleAddFoodPeriod}
                className="col-12 btn btn-outline-dark"
              >
                Adicionar Período
              </button>
            </div>
          </div>
          <label className="bold">Data de suspensão</label>
          {suspension_dates.map((suspension_date, index) => (
            <div className="form-group row">
              <div className="col-sm-4">
                <label for="">Dia</label>
                <div>
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={this.state.start}
                    onChange={this.handleDatePickerChange}
                    className="form-control"
                    locale={ptBR}
                  />
                  </div>
              </div>
              <div className="col-sm-7">
                <label for="reason_day">Motivo</label>
                <select placeholder="Selecione" name="reason_day" className="form-control">
                  <option value="" disabled selected>Selecione</option>
                  <option>1º Período - Matutino</option>
                </select>
              </div>
              <div className="form-group col-md-1">
                <i onClick={this.handleRemoveSuspensionDate(index)} className="fa fa-trash fa-2x icon" aria-hidden="true"></i>
              </div>
            </div>
          ))}
          {suspension_ranges.map((suspension_range, index) => (
            <div className="form-group row">
              <div className="col-sm-4">
                <label for="">De</label>
                <div>
                  <DatePicker
                    selectsStart
                    dateFormat="dd/MM/yyyy"
                    selected={this.state.startDate}
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onChange={this.handleDatePickerStartChange}
                    className="form-control"
                    locale={ptBR}
                  />
                  </div>
              </div>
              <div className="col-sm-4">
                <label for="">Até</label>
                <div>
                  <DatePicker
                    selectsEnd
                    dateFormat="dd/MM/yyyy"
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    selected={this.state.endDate}
                    onChange={this.handleDatePickerEndChange}
                    className="col-12 form-control"
                    locale={ptBR}
                  />
                  </div>
              </div>
              <div className="col-sm-3">
                <label for="reason_range">Motivo</label>
                <select placeholder="Selecione" name="reason_range" className="form-control">
                  <option value="" disabled selected>Selecione</option>
                  <option>1º Período - Matutino</option>
                </select>
              </div>
              <div className="form-group col-md-1">
                <i onClick={this.handleRemoveSuspensionRange(index)} className="fa fa-trash fa-2x icon" aria-hidden="true"></i>
              </div>
            </div>
          ))}
          <div className="form-group row">
            <div className="col-sm-4">
              <button
                type="button"
                onClick={this.handleAddSuspensionDate}
                className="col-12 btn btn-outline-info"
              >
                Adicionar Dia
              </button>
            </div>
            <div className="col-sm-4">
              <button
                type="button"
                onClick={this.handleAddSuspensionRange}
                className="col-12 btn btn-outline-info"
              >
                Adicionar Ciclo
              </button>
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
                onClick={this.handleAddSuspensionDate}
                className="col-12 btn-lg btn-outline-primary"
              >
                Cancelar
              </button>
            </div>
            <div className="col-sm-4">
              <button
                type="button"
                onClick={this.handleAddSuspensionRange}
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
