// TODO: decompor isso em componentes
import React from 'react'

export default function MenuChange(props) {
  return (
    <div className="container">
      <span className="uppercase-label">solicitações</span>
      <br></br>
      <span className="header-form-label">Alteração de Cardápio</span>
      <div className="form-group row">
        <label for="periodo" className="col-lg-2 col-sm-2 col-md-2 col-form-label">Período</label>
        <div className="col-lg-4 col-sm-4 col-md-4  ">
          <input className="form-control" type="text" value="" id="periodo"></input>
        </div>
        <label for="matriculados" className="col-lg-2 col-sm-2 col-md-2 col-form-label">Matriculados</label>
        <div className="col-lg-2 col-sm-2 col-md-3 ">
          <input className="form-control" type="number" value="" id="matriculados"></input>
        </div>
      </div>
      <div className="form-group row">
        <label for="rf-search" className="col-lg-2 col-sm-2 col-md-2  col-form-label">RF responsável</label>
        <div className="col-lg-2 col-sm-4 col-md-3 ">
          <input className="form-control" type="search" value="" id="rf-search"></input>
        </div>
      </div>
      <div className="form-group row">
        <label for="cargo" className="col-lg-2 col-sm-2 col-md-2   col-form-label">Cargo</label>
        <div className="col-lg-2 col-sm-2 col-md-3 ">
          <input className="form-control" type="search" value="" id="cargo"></input>
        </div>
      </div>
      <div className="form-group row">
        <label for="nome" className="col-lg-2 col-sm-2 col-md-2    col-form-label">Nome</label>
        <div className="col-lg-5 col-sm-5 col-md-5  ">
          <input className="form-control" type="text" value="" id="nome"></input>
        </div>
      </div>
      <div className="form-group row">
        <label for="data" className="col-lg-2 col-sm-2 col-md-2  col-form-label">Data da modificação</label>
        <div className="col-lg-3 col-sm-3 col-md-3">
          <input className="form-control" type="date" value="2019-01-01" id="data"></input>
        </div>
      </div>
      <div className="form-group row">
        <label for="nroalunos" className="col-lg-2 col-sm-2 col-md-2   col-form-label">Número de alunos
          participantes</label>
        <div className="col-lg-3 col-sm-3 col-md-3">
          <input className="form-control" type="number" value="" id="nroalunos"></input>
        </div>
      </div>
      <div className="form-group row">
        <label for="de" className="col-lg-2 col-sm-2 col-md-2  col-form-label">Alterar de</label>
        <div className="col-lg-3 col-sm-3 col-md-3">
          <input className="form-control" type="date" value="2019-01-01" id="de"></input>
        </div>
      </div>
      <div className="form-group row">
        <label for="para" className="col-lg-2 col-sm-2 col-md-2 col-form-label">Para</label>
        <div className="col-lg-3 col-sm-3 col-md-3">
          <input className="form-control" type="date" value="2019-01-01" id="para"></input>
        </div>
      </div>
      <div className="form-group row ">
        <label for="motivo" className="col-lg-2 col-sm-2 col-md-2 col-form-label">Motivo</label>
        <div className="col-lg-3 col-sm-3 col-md-3 ">
          <select id="motivo" className="form-control">
            <option selected>Escolha...</option>
            <option>...</option>
          </select>
        </div>
      </div>
      <div className="form-group row">
        <label for="obs" className="col-lg-2 col-sm-2 col-md-2 col-form-label">Observações</label>
        <div className="col-lg-9 col-sm-9 col-md-9 ">
          <textarea className="form-control" rows="4" id="obs"></textarea>
        </div>

      </div>
      <div className="float-right">
        <button type="reset" className="btn btn-outline-primary">Cancelar</button>
        <button type="submit" className="btn btn-primary">Enviar solicitação</button>
      </div>
    </div>
  );
}
