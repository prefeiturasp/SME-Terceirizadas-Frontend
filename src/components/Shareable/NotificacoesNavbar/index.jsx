import React from "react";
import { Dropdown } from "antd";
import moment from "moment";
import Botao from "../Botao";
import { BUTTON_STYLE } from "../Botao/constants";
import "./style.scss";

export default () => {
  const notificacoes = [
    { lida: "sim", status: "lida", titulo: "aaaaaa" },
    { lida: "sim", status: "lida", titulo: "bbbbb" },
    { lida: "nao", status: "nao lida", titulo: "cccc" },
    { lida: "nao", status: "nao lida", titulo: "eeeeeeeeee" },
    { lida: "nao", status: "nao lida", titulo: "dddddddddddddddddd" }
  ];

  const menu = (
    <div className="menu-notificacoes">
      <table className="table mb-0">
        <tbody>
          {notificacoes.map((notificacao, index) => {
            return (
              <tr
                key={index}
                className="tr-notificacoes"
                // status={notificacao.status}
                // onClick={() => onClickNotificacao(notificacao.id)}
              >
                <td className="py-1 px-4 align-middle w-75">
                  {notificacao.titulo}
                </td>
                <td
                  className={`py-1 px-1 text-center w-25 align-middle ${
                    notificacao.lida
                  }`}
                >
                  {notificacao.status}
                </td>
                <td className="py-1 px-2 align-middle w-25 text-right">
                  {moment(notificacao.data).format("DD/MM/YYYY")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Botao
        texto="Ver tudo"
        className="btn-block btn-notificacoes"
        style={BUTTON_STYLE.GREEN_OUTLINE}
        // onClick={onClickVerTudo}
      />
    </div>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <div className="navbar-notificacoes">
        <div className="nav-link text-center">
          <div className="icone-verde-fundo">
            <i className="fas fa-bell icone-verde" />
            <span className="span-notificacoes-menor-que-10">
              {notificacoes.length}
            </span>
          </div>
        </div>
        <p className="title">Notificações</p>
      </div>
    </Dropdown>
  );
};
