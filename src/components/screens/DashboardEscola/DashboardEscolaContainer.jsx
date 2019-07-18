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
                },
                {
                  text: "12083 - 7A IP I - Solicitação Unificada",
                  date: "Qua 10:07"
                }
              ],
            theadList : [
              'Nº Solicitação',
              'Escola',
              'Quantidade de Alimentações solicitadas'
            ],
            trs : [
              {
                '_id': 12083,
                'escola': 'EMEF CACILDA BECKER',
                'quantidade' : 1705
              },
              {
                '_id': 12084,
                'escola': 'EMEF AMORIM LIMA, DES.',
                'quantidade' : 150
              },
              {
                '_id': 12085,
                'escola': 'EMEF AMORIM LIMA, DES.',
                'quantidade' : 150
              },
              {
                '_id': 12086,
                'escola': 'EMEF AMORIM LIMA, DES.',
                'quantidade' : 150
              },
              {
                '_id': 12087,
                'escola': 'EMEF AMORIM LIMA, DES.',
                'quantidade' : 150
              },
              {
                '_id': 12088,
                'escola': 'EMEF AMORIM LIMA, DES.',
                'quantidade' : 150
              },
            ]
        }
    }
    render() {
        const {autorizadas, theadList, trs} = this.state
        console.log(window.location.pathname)
        return (
            <div>
                <DashboardEscola numeroAlunos={250}
                                 autorizadas={autorizadas}
                                 theadList={theadList}
                                 trs={trs}
                />
            </div>
        )
    }
}
