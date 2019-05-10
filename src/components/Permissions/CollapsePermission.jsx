import React, { Component } from 'react'
import InputCheck from './InputCheck';

const btStyle = { color: "#686868" }


class collapsePermission extends Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            open: false,
            checked : false
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
                            <i class="fas fa-clipboard-check justify-content-end"></i> {labelProfile}
                        </button>

                        <div className="float-right">
                            <button
                                onClick={this.handleToggle.bind(this)}
                                style={btStyle}
                                className="btn btn-link"
                                type="button"
                                data-toggle="collapse"
                                data-target={`#${idProfile}`}
                                aria-expanded={open}
                                aria-controls={idProfile}>
                                <i class={open ? "fas fa-minus-circle" : "fas fa-plus-circle"}></i>
                            </button>
                        </div>
                    </li>
                    <div className={`${open ? 'collapse show' : 'collapse'}`} id={idProfile}>
                        <li className="list-group-item pl-5"
                            id={idProfile}
                            aria-labelledby={idProfile}>

                            <InputCheck 
                                    key={1000} name="todos" 
                                    label="Todos" />
                        </li>

                        {permissionList.map((value, key) => {
                            return (
                                <li
                                    className="list-group-item pl-5"
                                    id={idProfile}
                                    aria-labelledby={idProfile}>

                                    <InputCheck
                                        label={value.name}
                                        name={value.name}
                                        _key={key} />
                                </li>
                            )
                        })}

                    </div>
                </ul>
            </div>

        )
    }
}

export default collapsePermission