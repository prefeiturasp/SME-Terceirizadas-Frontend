import React, { Component } from 'react'
import { ButtonConfirm, ButtonCancel } from '../Shareable/button'
import CustomDiv from '../Shareable/responsiveDiv'
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
            <CustomDiv cols='3 3 3 3'>
              <input className="form-control" type="text" name="periodo" id="periodo"></input>
            </CustomDiv>
            <label htmlFor="matriculados" className="col-lg-2 col-sm-2 col-md-2 col-form-label">Matriculados</label>
            <CustomDiv cols='3 3 3 3'>
              <input className="form-control" type="number" name="matriculados" id="matriculados"></input>
            </CustomDiv>
          </div>
          <div className="form-group row">
            <label htmlFor="rf-search" className="col-lg-2 col-sm-2 col-md-2  col-form-label">RF responsável</label>
            <CustomDiv cols='3 3 3 3'>
              <input className="form-control" type="search" name="rf-search" id="rf-search"></input>
            </CustomDiv>
          </div>
          <div className="form-group row">
            <label htmlFor="cargo" className="col-lg-2 col-sm-2 col-md-2   col-form-label">Cargo</label>
            <CustomDiv cols='3 3 3 3'>
              <input className="form-control" type="search" name="cargo" id="cargo"></input>
            </CustomDiv>
          </div>
          <div className="form-group row">
            <label htmlFor="nome" className="col-lg-2 col-sm-2 col-md-2    col-form-label">Nome</label>
            <CustomDiv cols='3 3 4 4'>
              <input className="form-control" type="text" name="nome" id="nome"></input>
            </CustomDiv>
          </div>
          <div className="form-group row">
            <label htmlFor="data" className="col-lg-2 col-sm-2 col-md-2  col-form-label">Data da modificação</label>
            <CustomDiv cols='3 3 4 4'>
              <input className="form-control" type="date" name="data" id="data"></input>
            </CustomDiv>
          </div>
          <div className="form-group row">
            <label htmlFor="nroalunos" className="col-lg-2 col-sm-2 col-md-2  col-form-label">Número de alunos
            participantes</label>
            <CustomDiv cols='3 3 4 4'>
              <input className="form-control" type="number" name="nroalunos" id="nroalunos"></input>
            </CustomDiv>
          </div>
          <div className="form-group row">
            <label htmlFor="de" className="col-lg-2 col-sm-2 col-md-2  col-form-label">Alterar de</label>
            <CustomDiv cols='3 3 4 4'>
              <input className="form-control" type="date" name="de" id="de"></input>
            </CustomDiv>
          </div>
          <div className="form-group row">
            <label htmlFor="para" className="col-lg-2 col-sm-2 col-md-2 col-form-label">Para</label>
            <CustomDiv cols='3 3 4 4'>
              <input className="form-control" type="date" name="para" id="para"></input>
            </CustomDiv>
          </div>
          <div className="form-group row ">
            <label htmlFor="motivo" className="col-lg-2 col-sm-2 col-md-2 col-form-label">Motivo</label>
            <CustomDiv cols='3 3 4 4'>
              <select name="motivo" id="motivo" className="form-control">
                <option>Escolha...</option>
                <option>...</option>
                <option>escolha 2.</option>
              </select>
            </CustomDiv>
          </div>
          <div className="form-group row">
            <label htmlFor="obs" className="col-lg-2 col-sm-2 col-md-2 col-form-label">Observações</label>
            <CustomDiv cols='9 9 6 6'>
              <textarea className="form-control" rows="4" name="obs" id="obs"></textarea>
            </CustomDiv>
          </div>
          <CustomDiv cols='4 4 3 2' classNameArgs="float-right">
            <ButtonCancel text='Cancelar' />
            <ButtonConfirm text='Enviar solicitação' />
          </CustomDiv>
        </form>
      </div>
    );
  }
}

export default MenuChange
