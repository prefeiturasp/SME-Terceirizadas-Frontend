import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Home from '../../pages/Home';

export class Header extends Component {
  state = {}
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-white static-top navbar-sme fixed-top">
          <div className="container-fluid">
            <div className="nav-bar">
              <Link className="navbar-brand" exact to="/" component={Home}>
                <img src="http://placehold.it/150x50?text=Logo" alt="" />
              </Link>
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
              aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>


            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#profile">Profile &nbsp;<i className="fa fa-1x fa-user-circle"></i></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#logout">Sair &nbsp;<i className="fas fa-1x fa-power-off"></i></a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

