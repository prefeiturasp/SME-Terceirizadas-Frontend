import React, { Component } from 'react'
import {Authentication} from '../../services/auth'


export default class Login extends Component {

  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: ''
    };

  }

  validForm(){
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleSubmit = event => {
    event.preventDefault();
    Authentication(this.state.email,this.state.password)
  }

  handleChange = event =>{
    this.setState({
      [event.target.name] : event.target.value
    });
  }

  render() {
    return (
      <div>
        <div className="container">
            <div className="card mb-5 mt-5 mx-auto card-width bg-dark">
                <div className="card-body">
                  <div className="card-body text-center text-white">LOGO</div>
                </div>
            </div>
            <div className="card card-login mx-auto mt-5 card-width">
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>

                        <div className="form-group">
                            <label>E-mail</label>
                            <input
                                  autoFocus
                                  autoComplete="off"
                                  name="email"
                                  type="email"
                                  value={this.state.email}
                                  onChange={this.handleChange}
                                  className="form-control" />
                        </div>

                        <div className="form-group">
                            <label>Senha</label>
                            <input
                                  type="password"
                                  name="password"
                                  value={this.state.password}
                                  onChange={this.handleChange}
                                  className="form-control" />

                            <p className="text-right mt-2"><a href="#teste" className="text-primary">Esqueci minha senha</a></p>
                        </div>

                        <button className="btn btn-primary btn-block" disabled={!this.validForm()}>Acessar</button>
                        <p className="text-center mt-3"><a href="#teste" className="text-primary">Ainda não sou cadastrado</a></p>
                    </form>
                </div>
            </div>
        </div>
      </div>
    )
  }
}
