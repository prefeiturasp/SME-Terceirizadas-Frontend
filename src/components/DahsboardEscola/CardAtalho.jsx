import React from 'react'
const styleHeader = {
    padding: '0.75rem 1.25rem',
    marginBottom: 0,
    backgroundColor: '#fff',
    borderBottom: '1px solid #e3e6f0',
    color: '#353535',
    fontWeight : 'bold',
    letterSpacing: '0.01em',
    fontStyle: 'normal',
    fonFamily: 'Roboto',
    height : '4em'
}
const styleBody = {
    padding: 10 + 'px'
}

const styleFont = {
    fontSize: '13px',
    color: '#4C5862'
}

const styleLink = {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    alignItems: 'center',
    textAlign: 'center',
    color: '#035D96'
}
const styleFooter = {
    backgroundColor: '#fff',
    
}
export default props => (
    <div>
        <div className="card mt-3 mr-3 ml-3" style={{ width: '15rem' }}>
            <div class="card-header" style={styleHeader}>{props.titulo}</div>
            <div className="card-body" style={styleBody}>
                <p class="card-text" style={styleFont}>{props.texto}</p>
            </div>
            <div align="center" className="card-footer" style={styleFooter}>
                <a href={props.href} style={styleLink} class="card-link">{props.textoLink}</a>
            </div>
        </div>
    </div>
)