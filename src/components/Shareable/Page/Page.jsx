import React, { Component } from "react";
import { Botao } from "../Botao";
import { BUTTON_STYLE, BUTTON_TYPE, BUTTON_ICON } from "../Botao/constants";
import { Header } from "../Header";
import { Link } from "react-router-dom";
import { Sidebar } from "../Sidebar";
import { meusDados as getMeusDados } from "../../../services/perfil.service";
import "./style.scss";

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
    if (!sessionStorage.getItem("meusDados")) {
      const meusDados = await getMeusDados();
      sessionStorage.setItem("nome", JSON.stringify(meusDados.nome));
      this.setState({
        nome: meusDados.nome,
        nome_instituicao: meusDados.escolas[0] && meusDados.escolas[0].nome,
        registro_funcional: meusDados.registro_funcional || "N/A"
      });
    } else {
      this.setState({ nome: sessionStorage.getItem("nome") });
    }
  }

  render() {
    const {
      nome,
      nome_instituicao,
      registro_funcional,
      toggled
    } = this.state;
    const { children, titulo, botaoVoltar, voltarPara } = this.props;
    return (
      <div id="wrapper">
        <Header toggled={toggled} />
        <Sidebar
          nome={nome}
          toggle={this.toggle}
          toggled={toggled}
          registro_funcional={registro_funcional}
          nome_instituicao={nome_instituicao}
        />
        <div id="content-wrapper" className="pt-5">
          <div
            className={`content-wrapper-div ${toggled &&
              "toggled"} d-flex flex-column p-4 mt-5`}
          >
            {children.length ? children[0] : children}
            <h1 className="page-title">
              {titulo}
              {botaoVoltar && (
                <Link to={voltarPara}>
                  <Botao
                    texto="voltar"
                    titulo="voltar"
                    type={BUTTON_TYPE.BUTTON}
                    style={BUTTON_STYLE.BLUE}
                    icon={BUTTON_ICON.ARROW_LEFT}
                    className="float-right"
                  />
                </Link>
              )}
            </h1>
            {children[1]}
          </div>
        </div>
      </div>
    );
  }
}
