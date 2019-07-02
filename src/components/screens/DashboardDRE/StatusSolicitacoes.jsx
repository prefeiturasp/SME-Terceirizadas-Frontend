import React, { Component } from 'react'
import { CardDashboard } from '../../Shareable/CardDashboard';
import { InputSearch } from '../../DahsboardEscola/InputSearch';
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
            <div className="card mt-3">
                <div className='card-body'>
                    <InputSearch />
                    <div className="pb-3"></div>
                    <CardDashboard
                        titulo={'Aprovadas'}
                        solicitacoes={solicitacoes}
                        tipo={'card-authorized'}
                        icone={'fa-check'}
                    />
                    <CardDashboard
                        titulo={'Pendente Aprovação'}
                        solicitacoes={solicitacoes}
                        tipo={'card-pending'}
                        icone={'fa-exclamation-triangle'}
                    />
                    <CardDashboard
                        titulo={'Recusadas'}
                        solicitacoes={solicitacoes}
                        tipo={'card-denied'}
                        icone={'fa-check'}
                    />
                    <CardDashboard
                        titulo={'Canceladas'}
                        solicitacoes={solicitacoes}
                        tipo={'card-cancelled'}
                        icone={'fa-times-circle'}
                    />
                </div>
            </div>
        )
    }
}
