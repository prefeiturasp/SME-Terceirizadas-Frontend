import React, { Component } from "react";
import { Header } from "../Header";
import { Sidebar } from "../Sidebar";
import { meusDados as getMeusDados } from "../../../services/perfil.service";
import "./style.scss";

export default class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: null,
      perfil: "escola",
      toggled: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ toggled: !this.state.toggled });
  }

  async componentDidMount() {
    if (!sessionStorage.getItem("meusDados")) {
      const meusDados = await getMeusDados();
      sessionStorage.setItem("nome", JSON.stringify(meusDados.nome));
      this.setState({ nome: meusDados.nome });
    } else {
      this.setState({ nome: sessionStorage.getItem("nome") });
    }
  }

  render() {
    const { nome, perfil, toggled } = this.state;
    const { children, titulo } = this.props;
    return (
      <div id="wrapper">
        <Header toggled={toggled} />
        <Sidebar
          nome={nome}
          perfil={perfil}
          toggle={this.toggle}
          toggled={toggled}
        />
        <div id="content-wrapper" className="pt-5">
          <div className="d-flex flex-column p-4 mt-5">
            {children[0]}
            <span className="page-title">{titulo}</span>
            {children[1]}
          </div>
        </div>
      </div>
    );
  }
}
