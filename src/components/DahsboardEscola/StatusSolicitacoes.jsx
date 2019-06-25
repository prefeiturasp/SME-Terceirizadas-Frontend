import React, { Component } from 'react'
import { CardDashboard } from '../Shareable/CardDashboard';
import { InputSearch } from './InputSearch';
const solicitacoes = [
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
    },
    {
        text: "12083 - 7A IP I - Solicitação Unificada",
        date: "Qua 10:07"
    },
    {
        text: "12083 - 7A IP I - Solicitação Unificada",
        date: "Qua 10:07"
    },
    {
        text: "12083 - 7A IP I - Solicitação Unificada",
        date: "Qua 10:07"
    },
    {
        text: "12083 - 7A IP I - Solicitação Unificada",
        date: "Qua 10:07"
    },
]

export default class StatusSolicitacoes extends Component {
    render() {
        return (
            <div className="card">
                <div className='card-body'>
                    {/* <input className="form-control" type='text' placeholder='Pesquisa' /> */}
                    <InputSearch />
                    <div className="pb-3"></div>
                    <CardDashboard
                        titulo={'Aprovadas'}
                        solicitacoes={solicitacoes}
                        tipo={'card-authorized'}
                        icone={'fa-check'}
                    />
                </div>
            </div>
        )
    }
}
