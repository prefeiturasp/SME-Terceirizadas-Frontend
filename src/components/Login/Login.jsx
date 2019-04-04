import React, { Component } from 'react'
import {userActions} from '../../actions/user.actions'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'


export class Login extends Component {

  constructor(props){
    super(props);
    this.props.dispatch(userActions.logout());
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validForm(){
    return this.props.email.length > 0 && this.props.password.length > 0;
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({subimitted :true});
    const {email, password} = this.props;
    const {dispatch} = this.props;

    if(email && password){
        dispatch(userActions.login(email,password));
    }
    // Authentication(this.state.email,this.state.password)
  }

  handleChange = event =>{
    this.setState({
      [event.target.name] : event.target.value
    });
  }

  render() {
    const { loggingIn } = this.props;
    // const { email, password, submitted } = this.state;
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
                                  value={this.props.email}
                                  onChange={this.handleChange}
                                  className="form-control" />
                        </div>

                        <div className="form-group">
                            <label>Senha</label>
                            <input
                                  type="password"
                                  name="password"
                                  value={this.props.password}
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
const mapStateToProps = (state) => ({
  email : state.login.email,
  password : state.login.password,
  subimitted: state.login.subimitted,
})


export default connect(mapStateToProps)(Login)
