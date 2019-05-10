import React, { Component } from 'react'
import { Collapse } from 'react-bootstrap'
import InputCheck from './InputCheck';

const btStyle = { color: "#686868" }


class collapsePermission extends Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            open: false
        }
    }

    handleToggle = () => {
        this.setState({
            open: !this.state.open
        })
    }

    render() {
        const { labelProfile, idProfile, permissionList } = this.props
        const { open } = this.state
        return (
            <div>
                <ul className="list-group">
                    <li className="list-group-item">
                        <button type="button" onClick={this.handleToggle.bind(this)}
                            className="btn btn-link"
                            style={btStyle}
                            data-toggle="collapse"
                            data-target={`#${idProfile}`}
                            aria-expanded={open}
                            aria-controls={idProfile}>
                            <i class="fas fa-clipboard-check"></i> {labelProfile}
                        </button>
                    </li>
                    <div className={`${open ? 'collapse show' : 'collapse'}`} id={idProfile}>
                        <li className="list-group-item pl-5" id={idProfile} aria-labelledby={idProfile}>
                            <InputCheck key={1000} name="Todos" />
                        </li>

                        {permissionList.map((value, key) => {
                            return (
                                <li className="list-group-item pl-5" id={idProfile} aria-labelledby={idProfile}>
                                    <InputCheck name={value.name} key={key} />
                                </li>
                            )
                        })}

                        <li className="list-group-item" id={idProfile} aria-labelledby={idProfile}>
                            <button type="button" className="btn btn-outline-primary btn-lg btn-block">+ Adicionar Novo Perfil</button>
                        </li>
                    </div>
                </ul>
            </div>

        )
    }
}

export default collapsePermission