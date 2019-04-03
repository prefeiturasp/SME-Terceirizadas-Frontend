import React, { Component } from 'react'
import { ButtonConfirm, ButtonCancel } from '../Shareable/button'
import Div from '../Shareable/responsiveDiv'
import './MenuChange.css'

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
            <Div cols='3 3 3 3'>
              <input className="form-control" type="text" name="periodo" id="periodo"></input>
            </Div>
            <label htmlFor="matriculados" className="col-lg-2 col-sm-2 col-md-2 col-form-label">Matriculados</label>
            <Div cols='3 3 3 3'>
              <input className="form-control" type="number" name="matriculados" id="matriculados"></input>
            </Div>
          </div>
          <div className="form-group row">
            <label htmlFor="rf-search" className="col-lg-2 col-sm-2 col-md-2  col-form-label">RF responsável</label>
            <Div cols='3 3 3 3'>
              <input className="form-control" type="search" name="rf-search" id="rf-search"></input>
            </Div>
          </div>
          <div className="form-group row">
            <label htmlFor="cargo" className="col-lg-2 col-sm-2 col-md-2   col-form-label">Cargo</label>
            <Div cols='3 3 3 3'>
              <input className="form-control" type="search" name="cargo" id="cargo"></input>
            </Div>
          </div>
          <div className="form-group row">
            <label htmlFor="nome" className="col-lg-2 col-sm-2 col-md-2    col-form-label">Nome</label>
            <Div cols='3 3 4 4'>
              <input className="form-control" type="text" name="nome" id="nome"></input>
            </Div>
          </div>
          <div className="form-group row">
            <label htmlFor="data" className="col-lg-2 col-sm-2 col-md-2  col-form-label">Data da modificação</label>
            <Div cols='3 3 4 4'>
              <input className="form-control" type="date" name="data" id="data"></input>
            </Div>
          </div>
          <div className="form-group row">
            <label htmlFor="nroalunos" className="col-lg-2 col-sm-2 col-md-2  col-form-label">Número de alunos
            participantes</label>
            <Div cols='3 3 4 4'>
              <input className="form-control" type="number" name="nroalunos" id="nroalunos"></input>
            </Div>
          </div>
          <div className="form-group row">
            <label htmlFor="de" className="col-lg-2 col-sm-2 col-md-2  col-form-label">Alterar de</label>
            <Div cols='3 3 4 4'>
              <input className="form-control" type="date" name="de" id="de"></input>
            </Div>
          </div>
          <div className="form-group row">
            <label htmlFor="para" className="col-lg-2 col-sm-2 col-md-2 col-form-label">Para</label>
            <Div cols='3 3 4 4'>
              <input className="form-control" type="date" name="para" id="para"></input>
            </Div>
          </div>
          <div className="form-group row ">
            <label htmlFor="motivo" className="col-lg-2 col-sm-2 col-md-2 col-form-label">Motivo</label>
            <Div cols='3 3 4 4'>
              <select name="motivo" id="motivo" className="form-control">
                <option>Escolha...</option>
                <option>...</option>
                <option>escolha 2.</option>
              </select>
            </Div>
          </div>
          <div className="form-group row">
            <label htmlFor="obs" className="col-lg-2 col-sm-2 col-md-2 col-form-label">Observações</label>
            <Div cols='9 9 6 6'>
              <textarea className="form-control" rows="4" name="obs" id="obs"></textarea>
            </Div>
          </div>
          <div className="float-right">
            <ButtonCancel text='Cancelar' />
            <ButtonConfirm text='Enviar solicitação' />
          </div>
        </form>
      </div>
    );
  }
}

export default MenuChange
