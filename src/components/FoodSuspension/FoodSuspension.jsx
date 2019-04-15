import React, { Component } from 'react';

class FoodSuspension extends Component {

  fontHeader = {
    color: "#686868"
  }
  bgMorning = {
    background: "#FFF7CB"
  }

  state = {}
  render() {
    return (
      <div>
        <span className="page-title">Suspensão de Alimentação</span>
        <div className="card mt-3">
          <div className="card-body">
            <span className="blockquote-sme">Nº de Matriculados</span>
            <div></div>
            <span class="badge-sme badge-secondary-sme">{this.props.enrolled}</span>
            <span className="blockquote-sme pl-2 text-color-sme-silver">Informaçâo automática disponibilizada no Cadastro da Unidade Escolar</span>
          </div>
        </div>

        <div className="card mt-3">
          <div className="card-body">
            <div className="card-title font-weight-bold" style={this.fontHeader}>Descrição da Suspensão</div>
            <table className="table table-borderless">
              <tr>
                <td>Período</td>
                <td>Tipo de Alimentação</td>
                <td>Nº de Alunos</td>
              </tr>
              <tbody>
                  <tr>
                    <td>
                      
                    </td>
                    <td>

                    </td>
                    <td>

                    </td>
                  </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default FoodSuspension
