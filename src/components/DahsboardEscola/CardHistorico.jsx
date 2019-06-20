import React from 'react'
const styleHeader = {
    padding: '0.75rem 1.25rem',
    marginBottom: 0,
    backgroundColor: '#fff',
    borderBottom: '1px solid #e3e6f0',
    color: '#035D96',
    fontWeight : 'bold',
    letterSpacing: '0.01em',
    fontStyle: 'normal',
    fonFamily: 'Roboto',
    height : '4em'
}
export default props => (
    <div className="card mt-3">
        <div className="card-header" style={styleHeader}>
            <i class="fas fa-history mr-2"></i>
                Histórico de Alimentações solicitadas
            <i className="float-right fa fa-bars"></i>
        </div>
        {/* <div className="card-body"></div> */}
    </div>
)