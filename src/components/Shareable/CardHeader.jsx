import React, { Component } from 'react'
const styleColor = {color: 'indigo'}
export default class CardHeader extends Component {
    render() {
        return (
            <div class="card mt-3">
                <div class="card-body">
                    <span class="blockquote-sme">Nº de Matriculados</span>
                    <i className="float-right fa fa-bars"></i>
                    <div></div>
                    <span class="badge-sme badge-secondary-sme">{this.props.numeroAlunos}</span>
                    <span class="blockquote-sme pl-2 text-color-sme-silver">Informação automática disponibilizada no <b style={styleColor}>Cadastro da Unidade Escolar</b></span>
                </div>
            </div>
        )
    }
}
