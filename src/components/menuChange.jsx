// TODO: quebrar esse componente
import React, { Component } from 'react'

class MenuChange extends Component {
  handleSubmit = event => {
    console.log(event)
    alert('email: ' + this.state.email + ' -  Password: ' + this.state.password)
    event.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <span className="uppercase-label">solicitações</span>
          <br></br>
          <span className="header-form-label">Alteração de Cardápio</span>
          <div className="form-group row">
            <label htmlFor="periodo" className="col-lg-2 col-sm-2 col-md-2 col-form-label">Período</label>
            <div className="col-lg-4 col-sm-4 col-md-4  ">
              <input className="form-control" type="text" name="periodo" id="periodo"></input>
            </div>
            <label htmlFor="matriculados" className="col-lg-2 col-sm-2 col-md-2 col-form-label">Matriculados</label>
            <div className="col-lg-2 col-sm-2 col-md-3 ">
              <input className="form-control" type="number" name="matriculados" id="matriculados"></input>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="rf-search" className="col-lg-2 col-sm-2 col-md-2  col-form-label">RF responsável</label>
            <div className="col-lg-2 col-sm-4 col-md-3 ">
              <input className="form-control" type="search" name="rf-search" id="rf-search"></input>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="cargo" className="col-lg-2 col-sm-2 col-md-2   col-form-label">Cargo</label>
            <div className="col-lg-2 col-sm-2 col-md-3 ">
              <input className="form-control" type="search" name="cargo" id="cargo"></input>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="nome" className="col-lg-2 col-sm-2 col-md-2    col-form-label">Nome</label>
            <div className="col-lg-5 col-sm-5 col-md-5  ">
              <input className="form-control" type="text" name="nome" id="nome"></input>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="data" className="col-lg-2 col-sm-2 col-md-2  col-form-label">Data da modificação</label>
            <div className="col-lg-3 col-sm-3 col-md-3">
              <input className="form-control" type="date" name="data" id="data"></input>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="nroalunos" className="col-lg-2 col-sm-2 col-md-2  col-form-label">Número de alunos
            participantes</label>
            <div className="col-lg-3 col-sm-3 col-md-3">
              <input className="form-control" type="number" name="nroalunos" id="nroalunos"></input>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="de" className="col-lg-2 col-sm-2 col-md-2  col-form-label">Alterar de</label>
            <div className="col-lg-3 col-sm-3 col-md-3">
              <input className="form-control" type="date" name="de" id="de"></input>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="para" className="col-lg-2 col-sm-2 col-md-2 col-form-label">Para</label>
            <div className="col-lg-3 col-sm-3 col-md-3">
              <input className="form-control" type="date" name="para" id="para"></input>
            </div>
          </div>
          <div className="form-group row ">
            <label htmlFor="motivo" className="col-lg-2 col-sm-2 col-md-2 col-form-label">Motivo</label>
            <div className="col-lg-3 col-sm-3 col-md-3 ">
              <select name="motivo" id="motivo" className="form-control">
                <option>Escolha...</option>
                <option>...</option>
                <option>escolha 2.</option>
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="obs" className="col-lg-2 col-sm-2 col-md-2 col-form-label">Observações</label>
            <div className="col-lg-9 col-sm-9 col-md-9 ">
              <textarea className="form-control" rows="4" name="obs" id="obs"></textarea>
            </div>

          </div>
          <div className="float-right">
            <button type="reset" className="btn btn-outline-primary">Cancelar</button>
            <button type="submit" className="btn btn-primary">Enviar solicitação</button>
          </div>
        </form>
      </div>
    );
  }
}

export default MenuChange
