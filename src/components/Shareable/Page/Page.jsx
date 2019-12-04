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
    if (!localStorage.getItem("meusDados")) {
      const meusDados = await getMeusDados();
      localStorage.setItem("nome", JSON.stringify(meusDados.nome));
      this.setState({
        nome: meusDados.nome,
        nome_instituicao:
          (meusDados.vinculo_atual &&
            meusDados.vinculo_atual.instituicao &&
            meusDados.vinculo_atual.instituicao.nome) ||
          "Não vinculado à uma instituição",
        registro_funcional: meusDados.registro_funcional || "N/A"
      });
    } else {
      this.setState({ nome: localStorage.getItem("nome") });
    }
  }

  render() {
    const { nome, nome_instituicao, registro_funcional, toggled } = this.state;
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
                <Link
                  to={{
                    pathname:
                      this.props.location && this.props.location.state
                        ? this.props.location.state.prevPath
                        : voltarPara,
                    state: { botaoVoltar: true }
                  }}
                >
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
            {children.map((child, key) => {
              return <div key={key}>{key > 0 && child}</div>;
            })}
          </div>
        </div>
      </div>
    );
  }
}
