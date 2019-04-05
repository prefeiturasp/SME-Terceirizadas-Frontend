import React, { Component } from 'react'
import { LabelAndInput, LabelAndCombo, LabelAndTextArea, LabelWithDate } from './Shareable/labelAndInput'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import "react-datepicker/dist/react-datepicker.css";
import './Shareable/custom.css'
import BaseButton, { ButtonStyle } from './Shareable/button';


export class DayChange extends Component {

  constructor(props) {
    super(props);

    this.state = {
      food_period: { food_period: '', student_count: '', reason: '' },
      suspension_range: { from: new Date(), to: new Date() }
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
            <LabelAndInput placeholder='Registro funcional'
              value={this.props.rf} cols='6 6 6 6' type='text'
              name='rf' label='RF Responsável'>
            </LabelAndInput>
            <LabelAndInput value={this.props.cargo} cols='6 6 6 6' type='text' name='cargo' label='Cargo / Função'></LabelAndInput>
          </div>
          <div className="form-group row">
            <LabelAndInput value={this.props.nome} cols='12 12 12 12' name='nome' label='Nome' ></LabelAndInput>
          </div>
          <div className="form-row">
            <LabelAndCombo cols='5 5 5 5' name='periodo' label='Período de alteração' ></LabelAndCombo>
            <LabelAndInput cols='3 3 3 3' name='nroAlunos' value={this.props.nroAlunos} label='Nº de alunos' type='number' ></LabelAndInput>
            <LabelAndCombo cols='4 4 4 4' name='periodo' label='Motivo' ></LabelAndCombo>
          </div>
          <label className="bold">Substituição</label>
          <div className="form-group row">
            <LabelWithDate cols='5 5 5 5'
              label='Cardápio dia'
              selected={suspension_range.from}
              onChange={this.handleDatePickerFromChange} />
            <div className="col-sm-1 v-align">
              para
            </div>
            <div className="col-sm-1 v-align">
              <i className="fa fa-arrow-right" aria-hidden="true"></i>
            </div>
            <LabelWithDate cols='5 5 5 5'
              label='Cardápio dia'
              selected={suspension_range.to}
              onChange={this.handleDatePickerFromChange} />
          </div>
          <div className="form-group">
            <LabelAndTextArea value={this.props.obs} label='Observação' name='obs'></LabelAndTextArea>
          </div>
          <div className="form-group row float-right">
            <BaseButton label='Cancelar' style={ButtonStyle.OutlinePrimary} />
            <BaseButton label='Enviar Solicitação' style={ButtonStyle.Primary} className='ml-3' />
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cargo: state.dayChange.cargo,
  rf: state.dayChange.cargo,
  nome: state.dayChange.nome,
  nroAlunos: state.dayChange.nroAlunos
})


export default connect(mapStateToProps)(DayChange)
