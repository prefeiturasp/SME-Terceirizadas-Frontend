import React, { Component } from 'react'

const btStyle = { color: "#686868" }


class collapseProfile extends Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            open : false
        }
    }

    handleToggle = ()=>{
        this.setState({
            open : !this.state.open
        })
    }

    render() {
        const { labelProfile, idProfile } = this.props
        const {open} = this.state

        return (
            <div>
                <ul className="list-group">
                    <li className="list-group-item">
                        <button className="btn btn-link"
                            style={btStyle}
                            data-toggle="collapse"
                            data-target={`#${idProfile}`}
                            aria-expanded={open}
                            aria-controls="collapsePermission">
                            <i class="fas fa-clipboard-check"></i> {labelProfile}
                        </button>
                    </li>


                    <li className="list-group-item collapse pl-5" id={idProfile} aria-labelledby={idProfile}>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" for="exampleCheck1">Permissão 1</label>
                        </div>
                    </li>

                </ul>
            </div>

        )
    }
}

export default collapseProfile