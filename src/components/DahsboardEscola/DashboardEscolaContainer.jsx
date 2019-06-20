import React, { Component } from 'react'
import DashboardEscola from './DashboardEscola';

export default class DashboardEscolaContainer extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            autorizadas: [
                {
                  text: "12083 - 7A IP I - Solicitação Unificada",
                  date: "11:19"
                },
                {
                  text: "12083 - 7A IP I - Solicitação de Kit Lanche",
                  date: "Qua 11:07"
                },
                {
                  text: "12083 - 7A IP I - Solicitação Unificada",
                  date: "Qua 10:07"
                }
              ]
        }
    }
    render() {
        const {autorizadas} = this.state
        return (
            <div>
                <DashboardEscola numeroAlunos={250}
                                 autorizadas={autorizadas} />
            </div>
        )
    }
}
