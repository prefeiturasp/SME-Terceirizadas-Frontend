import React, { Component } from 'react'
import { ButtonConfirm, ButtonCancel, ButtonActionOk } from '../Shareable/button'
import { Grid, Label } from '../Shareable/responsiveBs4'
import { LabelAndInput, LabelAndCombo, LabelAndTextArea } from '../Shareable/labelAndInput'
import '../Shareable/custom.css'

class MenuChange extends Component {
  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div>
            <label className='header-form-label mb-5'>Nº de matriculados</label>
          </div>
          <div>
            <button className="btn btn-primary mr-3">150</button>
            <label>Informação automática disponibilizada no cadastro da UE</label>
          </div>
          <div className="form-group row">
            <LabelAndInput cols='6 6 6 6' type='text' name='rf' label='RF Responsável'></LabelAndInput>
            <LabelAndInput cols='6 6 6 6' type='text' name='cargo' label='Cargo / Função'></LabelAndInput>
          </div>
          <div className="form-group row">
            <LabelAndInput cols='12 12 12 12' name='nome' label='Nome' ></LabelAndInput>
          </div>
          <div className="form-group row">
            <LabelAndCombo cols='5 5 5 5' name='periodo' label='Período de alteração' ></LabelAndCombo>
            <LabelAndCombo cols='4 4 4 4' name='tipo' label='Tipo de Alimentação' ></LabelAndCombo>
            <LabelAndInput cols='3 3 3 3' name='nro_alunos' label='Nº de alunos' ></LabelAndInput>
          </div>
          <div className="form-group row">
            <LabelAndCombo cols='5 5 5 5' label='Período de alteração' ></LabelAndCombo>
            <LabelAndCombo cols='4 4 4 4' label='Tipo de Alimentação' ></LabelAndCombo>
            <LabelAndInput cols='3 3 3 3' type='number' label='Nº de alunos' ></LabelAndInput>
          </div>
          <ButtonActionOk type='' text='Adicionar Período'/>
          <div className='form-group row-1'>
            <label className='session-header mt-3'>Data de alteração</label>
          </div>
          <div className='form-group row'>
            <LabelAndInput cols='4 4 4 4' type='date' name='de' label='Alterar dia' ></LabelAndInput>
            <LabelAndCombo cols='4 4 4 4' label='Para' name='para' ></LabelAndCombo>
          </div>
          <div className='form-group row'>
            <LabelAndInput cols='4 4 4 4' type='date' name='de' label='Alterar dia' ></LabelAndInput>
            <LabelAndInput cols='4 4 4 4' type='date' name='ate' label='Até' ></LabelAndInput>
            <LabelAndCombo cols='4 4 4 4' label='Para' name='para' ></LabelAndCombo>
          </div>
          <div className='form-group row'>
            <ButtonActionOk type='' className='ml-3' text='Adicionar dia'></ButtonActionOk>
            <ButtonActionOk type='' className='ml-3' cols='' text='Adicionar Ciclo'></ButtonActionOk>
          </div>
          <div className='form-group'>
            <LabelAndTextArea label='Observações' name='obs'></LabelAndTextArea>
          </div>
        </form>
      </div>
    );
  }
}


export default MenuChange
