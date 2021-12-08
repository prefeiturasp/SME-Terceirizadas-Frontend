import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import { slugifyMin } from "../../../helper";
import { Checkbox } from "antd";
import Botao from "components/Shareable/Botao";
import { BUTTON_STYLE } from "components/Shareable/Botao/constants";

export default ({
  notificacao,
  handleChangeMarcarComoLida,
  clickBtnNotificacoes,
  toggleBtnNotificacoes,
  index
}) => {
  const retornaClasseStatus = notificacao => {
    if (notificacao.tipo === "Pendência" && !notificacao.resolvido) {
      return "card-header-notificacao-pendente";
    } else if (notificacao.lido) {
      return "card-header-notificacao-lida";
    } else return "";
  };

  return (
    <div className="card mt-3" key={notificacao.uuid}>
      <div
        className={`card-header card-tipo-${slugifyMin(
          notificacao.tipo
        )} ${retornaClasseStatus(notificacao)}`}
        id={`heading_${notificacao.uuid}`}
      >
        <div className="row">
          <div className="col-9">
            <div className="row">
              <div className="col-md-3 align-self-center">
                <span className={`span-tipo-${slugifyMin(notificacao.tipo)}`}>
                  {notificacao.tipo}
                </span>
              </div>
              <div className="col-md-9 ">
                <p className="mb-0 titulo-notificacao">
                  {notificacao.categoria}
                </p>
                <p className="mb-0">
                  <span className="remetente-categoria">
                    {notificacao.titulo}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="col-2 align-self-center text-right">
            <p className="mb-0">{notificacao.criado_em}</p>
          </div>
          <div className="col-1 align-self-center">
            <button
              onClick={() => toggleBtnNotificacoes(notificacao.uuid)}
              className="btn btn-link btn-block text-left px-0"
              type="button"
              data-toggle="collapse"
              data-target={`#collapse_${notificacao.uuid}`}
              aria-expanded="true"
              aria-controls={`collapse_${notificacao.uuid}`}
            >
              <span className="span-icone-toogle">
                <i
                  className={
                    clickBtnNotificacoes[notificacao.uuid]
                      ? "fas fa-chevron-up"
                      : "fas fa-chevron-down"
                  }
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div
        id={`collapse_${notificacao.uuid}`}
        className="collapse"
        aria-labelledby="headingOne"
        data-parent="#accordionNotificacoes"
      >
        <div className="card-body">
          <div className="row">
            <div className="col-12">{notificacao.descricao}</div>
          </div>
          <div className="row acoes-notificacoes">
            {/* <button
                                        //onClick={() => toggleBtnNotificacoes(notificacao.uuid)}
                                        className="btn btn-link btn-block text-left px-0" type="button"
                                        data-toggle="collapse" data-target={`#collapse_${notificacao.uuid}`}
                                        aria-expanded="true" aria-controls={`collapse_${notificacao.uuid}`}
                                    > */}

            <div className="checkbox-container">
              <Checkbox
                defaultChecked={notificacao.lido}
                style={{
                  fontSize: "16px",
                  paddingTop: "10px",
                  paddingLeft: "12px"
                }}
                onChange={() => {
                  handleChangeMarcarComoLida(notificacao, index);
                }}
              >
                Marcar como lida
              </Checkbox>
            </div>
            {/* </button> */}
            {notificacao.link && (
              <Link to={notificacao.link}>
                {/* TENTAR COLOCAR ÍCONE NO BOTÃO */}
                <Botao
                  texto="Acesse Aqui"
                  className="general-button"
                  style={BUTTON_STYLE.GREEN_OUTLINE}
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
