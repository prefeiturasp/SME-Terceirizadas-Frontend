import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.scss";

export default class Breadcrumb extends Component {
  render() {
    const { home, anteriores, atual } = this.props;
    return (
      <ul className="br-breadcrumb">
        <li>
          <Link className={`home ${atual && "is-active"}`} exact to={home}>
            <i class="fas fa-home" />
          </Link>
        </li>
        {anteriores &&
          anteriores.length > 0 &&
          anteriores.map(anterior => {
            return (
              <li>
                <Link className="is-active" exact to={anterior.href}>
                  {anterior.titulo}
                </Link>
              </li>
            );
          })}
        {atual && (
          <li>
            <Link exact to={atual.href}>
              {atual.titulo}
            </Link>
          </li>
        )}
      </ul>
    );
  }
}
