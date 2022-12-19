import React, { useContext, useState } from "react";
import { Header } from "../Header";
import { Sidebar } from "../Sidebar";
import BotaoVoltar from "./BotaoVoltar";
import { meusDados as getMeusDados } from "../../../services/perfil.service";
import "./style.scss";
import { usuarioEhLogistica, usuarioEhDistribuidora } from "helpers/utilities";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import MeusDadosContext from "context/MeusDadosContext";
import ModalVoltar from "./ModalVoltar";

export const Page = ({ ...props }) => {
  const history = useHistory();

  const {
    children,
    titulo,
    botaoVoltar,
    voltarPara,
    temModalVoltar,
    textoModalVoltar
  } = props;

  const [nome, setNome] = useState(null);
  const [nomeEscola, setNomeEscola] = useState(null);
  const [toggled, setToggled] = useState(false);
  const [modalVoltar, setModalVoltar] = useState(false);

  const { setMeusDados } = useContext(MeusDadosContext);

  useEffect(() => {
    if (!localStorage.getItem("meusDados")) {
      getMeusDados().then(meusDados => {
        setMeusDados(meusDados);
        localStorage.setItem("nome", JSON.stringify(meusDados.nome));
        if (meusDados.tipo_usuario === "dieta_especial") {
          localStorage.setItem(
            "crn_numero",
            JSON.stringify(meusDados.crn_numero)
          );
          localStorage.setItem(
            "registro_funcional",
            JSON.stringify(meusDados.registro_funcional)
          );
        }
        if (
          meusDados.tipo_usuario === "escola" &&
          meusDados.vinculo_atual &&
          meusDados.vinculo_atual.instituicao
        ) {
          setNomeEscola(meusDados.vinculo_atual.instituicao.nome);
        }
        setNome(meusDados.nome);
      });
    } else {
      this.setState({ nome: localStorage.getItem("nome") });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBack = () => {
    if (temModalVoltar) {
      setModalVoltar(true);
    } else {
      voltarPara ? history.push(voltarPara) : history.goBack();
    }
  };

  return (
    <div id="wrapper">
      <Header toggled={toggled} />
      <Sidebar
        nome={nome}
        nomeEscola={nomeEscola}
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
            <span className="texto-titulo">{titulo}</span>
            {botaoVoltar && <BotaoVoltar onClick={handleBack} />}
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
      <ModalVoltar
        modalVoltar={modalVoltar}
        setModalVoltar={setModalVoltar}
        textoModalVoltar={textoModalVoltar}
      />
    </div>
  );
};

export default Page;
