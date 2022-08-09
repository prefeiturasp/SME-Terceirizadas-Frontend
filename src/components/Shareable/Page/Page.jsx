import React, { useState } from "react";
import { Header } from "../Header";
import { Sidebar } from "../Sidebar";
import BotaoVoltar from "./BotaoVoltar";
import { meusDados as getMeusDados } from "../../../services/perfil.service";
import "./style.scss";
import { usuarioEhLogistica, usuarioEhDistribuidora } from "helpers/utilities";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

export const Page = ({ ...props }) => {
  const history = useHistory();

  const { children, titulo, botaoVoltar } = props;

  const [nome, setNome] = useState(null);
  const [toggled, setToggled] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("meusDados")) {
      getMeusDados().then(meusDados => {
        localStorage.setItem("nome", JSON.stringify(meusDados.nome));
        if (meusDados.tipo_usuario === "dieta_especial") {
          localStorage.setItem(
            "crn_numero",
            JSON.stringify(meusDados.crn_numero)
          );
        }
        setNome(meusDados.nome);
      });
    } else {
      this.setState({ nome: localStorage.getItem("nome") });
    }
  }, []);

  return (
    <div id="wrapper">
      <Header toggled={toggled} />
      <Sidebar
        nome={nome}
        toggle={() => setToggled(!toggled)}
        toggled={toggled}
      />
      <div id="content-wrapper" className="pt-5">
        <div
          className={`content-wrapper-div ${toggled &&
            "toggled"} d-flex flex-column p-4 mt-5`}
        >
          {children.length ? children[0] : children}
          <h1 className="page-title">
            {titulo}
            {botaoVoltar && <BotaoVoltar onClick={() => history.goBack()} />}
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
};

export default Page;
