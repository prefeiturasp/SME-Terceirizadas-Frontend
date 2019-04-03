import React, { Component } from 'react'
import { ButtonConfirm, ButtonCancel } from '../Shareable/button'
import { Grid } from '../Shareable/responsiveBs4'
import './MenuChange.css'
import { LabelAndInput, LabelAndTextArea } from '../Shareable/labelAndInput'

class MenuChange extends Component {
  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <span className="uppercase-label">solicitações</span>
          <br></br>
          <span className="header-form-label">Alteração de Cardápio</span>
          <div className="form-group row">
            <label htmlFor="periodo" className="col-lg-2 col-sm-2 col-md-2 col-form-label">Período</label>
            <input className="form-control col-xs-3 col-lg-3 col-md-3 col-sm-3" type="text" name="periodo" id="periodo"></input>
            <label htmlFor="matriculados" className="col-lg-2 col-sm-2 col-md-2 col-form-label">Matriculados</label>
            <input className="form-control col-xs-3 col-lg-3 col-md-3 col-sm-3" type="number" name="matriculados" id="matriculados"></input>
          </div>
          <LabelAndInput colsInput='3 3 3 3' colsLabel='2 2 2 2' name='rf_responsavel' label='R.F. esponsável' type='text' />
          <LabelAndInput colsInput='3 3 3 3' colsLabel='2 2 2 2' name='cargo' label='Cargo' type='text' />
          <LabelAndInput colsInput='3 3 3 3' colsLabel='2 2 2 2' name='nome' label='Nome' type='text' />
          <LabelAndInput colsInput='3 3 3 3' colsLabel='2 2 2 2' name='dt_modificacao' label='Data de modificação' type='date' />
          <LabelAndInput colsInput='3 3 3 3' colsLabel='2 2 2 2' name='participantes' label='Número de alunos participantes' type='text' />
          <LabelAndInput colsInput='3 3 3 3' colsLabel='2 2 2 2' name='de' label='Alterar de' type='date' />
          <LabelAndInput colsInput='3 3 3 3' colsLabel='2 2 2 2' name='para' label='Para' type='date' />
          <div className="form-group row ">
            <label htmlFor="motivo" className="col-lg-2 col-sm-2 col-md-2 col-form-label">Motivo</label>
            <Grid cols='3 3 4 4'>
              <select name="motivo" id="motivo" className="form-control">
                <option>Escolha...</option>
                <option>...</option>
                <option>escolha 2.</option>
              </select>
            </Grid>
          </div>
          <LabelAndTextArea colsInput='9 9 6 6' colsLabel='2 2 2 2' name='obs' label='Observações'></LabelAndTextArea>
          <LabelAndInput colsInput='3 3 3 3' colsLabel='2 2 2 2' name='salario' label='Salario' type='number' />
          <Grid cols='4 4 3 2' classNameArgs="float-right">
            <ButtonCancel text='Cancelar' />
            <ButtonConfirm text='Enviar solicitação' />
          </Grid>
        </form>
      </div>
    );
  }
}

export default MenuChange
