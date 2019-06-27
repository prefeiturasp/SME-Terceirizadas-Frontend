import React, { Component } from 'react'
import CardHeader from '../Shareable/CardHeader';
import { dataAtual } from './utils';
import CardBody from '../Shareable/CardBody';
import { SolicitationStatusCard } from '../Shareable/DashboardShared';
import CardAtalho from './CardAtalho';
import CardLegendas from './CardLegendas'
import CardHistorico from '../Shareable/CardHistorico';

export default class DashboardEscola extends Component {
    render() {
        const { numeroAlunos, autorizadas, theadList, trs } = this.props
        return (
            <div>
                <CardHeader numeroAlunos={numeroAlunos} />
                <CardBody titulo={'Painel de Status de Solicitações'} dataAtual={dataAtual()}>
                    <div className="row">
                        <div className="col-6">
                            <SolicitationStatusCard
                                cardTitle={"Autorizadas"}
                                cardType={"card-authorized"}
                                solicitations={autorizadas}
                                icon={"fa-check"}
                                href={'/status-solicitacoes-escola'}
                                />
                        </div>
                        <div className="col-6">
                            <SolicitationStatusCard
                                cardTitle={"Pendente Aprovação"}
                                cardType={"card-pending"}
                                solicitations={autorizadas}
                                icon={"fa-exclamation-triangle"}
                                href={'/status-solicitacoes-escola'}
                                />
                        </div>
                    </div>
                    <div className="row pt-3">
                        <div className="col-6">
                            <SolicitationStatusCard
                                cardTitle={"Recusadas"}
                                cardType={"card-denied"}
                                solicitations={autorizadas}
                                icon={"fa-ban"}
                                href={'/status-solicitacoes-escola'}
                                />
                        </div>
                        <div className="col-6">
                            <SolicitationStatusCard
                                cardTitle={"Canceladas"}
                                cardType={"card-cancelled"}
                                solicitations={autorizadas}
                                icon={"fa-times-circle"}
                                href={'/status-solicitacoes-escola'}
                            />
                        </div>
                    </div>

                    <CardLegendas />
                </CardBody>
                
                <div className="row">
                    <CardAtalho
                        titulo={'Alteracao de Dias de Cardapio'}
                        texto={'Para solicitar kits para passeios entre na pagina do Kit Lanche e faça um novo pedido'}
                        textoLink={"Novo pedido"}
                        href={'#teste'}
                    />
                    <CardAtalho
                        titulo={'Alteração de Cardápio'}
                        texto={'Para solicitar kits para passeios entre na pagina do Kit Lanche e faça um novo pedido'}
                        textoLink={"Novo pedido"}
                        href={'#teste'}
                    />
                    <CardAtalho
                        titulo={'Inclusão de Alimentação'}
                        texto={'Para solicitar kits para passeios entre na pagina do Kit Lanche e faça um novo pedido'}
                        textoLink={"Novo pedido"}
                        href={'#teste'}
                    />
                    <CardAtalho
                        titulo={'Suspensão de Refeição'}
                        texto={'Para solicitar kits para passeios entre na pagina do Kit Lanche e faça um novo pedido'}
                        textoLink={"Novo pedido"}
                        href={'#teste'}
                    />
                    <CardAtalho
                        titulo={'Kit Lanche'}
                        texto={'Para solicitar kits para passeios entre na pagina do Kit Lanche e faça um novo pedido'}
                        textoLink={"Novo pedido"}
                        href={'#teste'}
                    />
                </div>

                <CardHistorico 
                    thead={theadList} 
                    trs={trs} 
                    titulo={'Histórico de Alimentações solicitadas'}
                />

            </div>
        )
    }
}
