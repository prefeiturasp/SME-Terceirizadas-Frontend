import { LOGISTICA, NOTIFICAR_EMPRESA } from "configs/constants";
import React from "react";
<<<<<<< Updated upstream:src/components/screens/Logistica/GuiasComNotificacoes/components/ListagemGuias/index.jsx
import { useHistory } from "react-router-dom";
=======
import { NavLink } from "react-router-dom";

>>>>>>> Stashed changes:src/components/screens/Logistica/GuiasComNotificacoes/components/ListagemNotificacoes/index.jsx
import "./styles.scss";
import { EDITAR_NOTIFICACAO } from "configs/constants";

<<<<<<< Updated upstream:src/components/screens/Logistica/GuiasComNotificacoes/components/ListagemGuias/index.jsx
const ListagemSolicitacoes = ({ guias }) => {
  const history = useHistory();

=======
const ListagemNotificacoes = ({ notificacoes }) => {
>>>>>>> Stashed changes:src/components/screens/Logistica/GuiasComNotificacoes/components/ListagemNotificacoes/index.jsx
  return (
    <section className="resultado-guias-notificacoes">
      <div className="titulo-verde">Lista de Notificações</div>
      <article>
        <div className="grid-table header-table">
          <div>Nº da Notificação</div>
          <div>Empresa</div>
          <div>Status da Notificação</div>
          <div>Número SEI</div>
          <div>Ações</div>
        </div>
        {notificacoes.map(notificacao => {
          return (
            <>
<<<<<<< Updated upstream:src/components/screens/Logistica/GuiasComNotificacoes/components/ListagemGuias/index.jsx
              <div key={guia.uuid} className="grid-table body-table">
                <div>{guia.numero}</div>
                <div>{guia.nome_empresa}</div>
                <div>{guia.status}</div>
                <div>{guia.processo_sei ? guia.processo_sei : "--"}</div>
                <div>
                  <span
                    onClick={() =>
                      history.push({
                        pathname: `/logistica/${EDITAR_NOTIFICACAO}`,
                        state: {
                          guia: guia
                        }
                      })
                    }
                  >
                    <i
                      title={
                        guia.status === "RASCUNHO"
                          ? "Editar Rascunho"
                          : "Visualizar Notificação"
                      }
                      className={`verde fas fa-${
                        guia.status === "RASCUNHO" ? "edit" : "eye"
                      }`}
                    />
                  </span>
=======
              <div key={notificacao.uuid} className="grid-table body-table">
                <div>{notificacao.numero}</div>
                <div>{notificacao.nome_empresa}</div>
                <div>{notificacao.status}</div>
                <div>
                  {notificacao.processo_sei ? notificacao.processo_sei : "--"}
                </div>
                <div>
                  <NavLink
                    to={`/${LOGISTICA}/${NOTIFICAR_EMPRESA}?uuid=${
                      notificacao.uuid
                    }`}
                  >
                    <span className="link-acoes px-2">
                      <i className="fas fa-eye green" />
                    </span>
                  </NavLink>
>>>>>>> Stashed changes:src/components/screens/Logistica/GuiasComNotificacoes/components/ListagemNotificacoes/index.jsx
                </div>
              </div>
            </>
          );
        })}
      </article>
    </section>
  );
};

export default ListagemNotificacoes;
