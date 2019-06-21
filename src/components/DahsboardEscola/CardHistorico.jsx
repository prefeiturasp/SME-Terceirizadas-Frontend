import React from 'react'
const styleHeader = {
    padding: '0.75rem 1.25rem',
    marginBottom: 0,
    backgroundColor: '#fff',
    borderBottom: '1px solid #e3e6f0',
    color: '#035D96',
    fontWeight: 'bold',
    letterSpacing: '0.01em',
    fontStyle: 'normal',
    fonFamily: 'Roboto',
    height: '4em'
}
export default props => (
    <div id="accordion">
        <div className="card mt-3">
            <div className="card-header" id="headingOne" style={styleHeader}>
                <i class="fas fa-history mr-2"></i>
                Histórico de Alimentações solicitadas
            <a className="btn btn-link float-right" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    <i className="float-right fa fa-bars"></i>
                </a>
            </div>
            <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                <div className="card-body">
                    <h1>OI GENTE</h1>
                </div>
            </div>
        </div>
    </div>
)