import React, { Component } from "react";
import { Header } from "../Header";
import { Sidebar } from "../Sidebar";
import BotaoVoltar from "./BotaoVoltar";
import { meusDados as getMeusDados } from "../../../services/perfil.service";
import "./style.scss";
import BotaoVoltarGoBack from "./BotaoVoltarGoBack";
import { usuarioEhLogistica, usuarioEhDistribuidora } from "helpers/utilities";

export default class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: null,
      toggled: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ toggled: !this.state.toggled });
  }

  async componentDidMount() {
    if (!localStorage.getItem("meusDados")) {
      const meusDados = await getMeusDados();
      localStorage.setItem("nome", JSON.stringify(meusDados.nome));
      if (meusDados.tipo_usuario === "dieta_especial") {
        localStorage.setItem(
          "crn_numero",
          JSON.stringify(meusDados.crn_numero)
        );
      }

      this.setState({
        nome: meusDados.nome
      });
    } else {
      this.setState({ nome: localStorage.getItem("nome") });
    }
  }

  render() {
    const { nome, toggled } = this.state;
    const { children, titulo, botaoVoltar, voltarPara } = this.props;
    return (
      <div id="wrapper">
        <Header toggled={toggled} />
        <Sidebar nome={nome} toggle={this.toggle} toggled={toggled} />
        <div id="content-wrapper" className="pt-5">
          <div
            className={`content-wrapper-div ${toggled &&
              "toggled"} d-flex flex-column p-4 mt-5`}
          >
            {children.length ? children[0] : children}
            <h1 className="page-title">
              {titulo}
              {botaoVoltar && voltarPara && (
                <BotaoVoltar location={this.props.location} to={voltarPara} />
              )}
              {botaoVoltar && voltarPara === undefined && <BotaoVoltarGoBack />}
            </h1>
            {(usuarioEhDistribuidora() || usuarioEhLogistica()) &&
              window.location.pathname === "/" && (
                <img
                  className="marca-dagua"
                  src="/assets/image/marca-dagua-sigpae.svg"
                  alt=""
                />
              )}
            {children.map((child, key) => {
              return <div key={key}>{key > 0 && child}</div>;
            })}
          </div>
        </div>
      </div>
    );
  }
}
