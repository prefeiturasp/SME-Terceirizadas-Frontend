import React from 'react'

export default props => (
    <div className="card mt-3">
        <div className="card-body">
            <div className="card-title font-weight-bold dashboard-card-title">
                <span><i className="fas fa-thumbtack"></i>{props.titulo}<i className="fas fa-pen"></i></span>
                <span className="float-right"><input className="input-search" placeholder="Pesquisar" />
                    <i className="fas fa-search"></i>
                </span>
            </div>
            <div>
                <p className="current-date">
                    Data: <span>{props.dataAtual}</span>
                </p>
            </div>
                {props.children}
        </div>
    </div>
)