import React, { useState } from "react";
import "antd/dist/antd.css";
import "./styles.scss";
import { CONFERENCIA_GUIA, LOGISTICA, REPOSICAO_GUIA } from "configs/constants";
import { NavLink } from "react-router-dom";
import { imprimirGuiaRemessa } from "services/logistica.service.js";
import { toastError } from "components/Shareable/Toast/dialogs";
import { Spin } from "antd";

const ListagemSolicitacoes = ({ guias }) => {
  const [carregando, setCarregando] = useState(false);

  const checaReposicao = guia => {
    let alimentosPendentes = guia.alimentos.filter(
      alimento => alimento.embalagens[0].qtd_a_receber > 0
    );
    return alimentosPendentes.length > 0;
  };

  const baixarPDFGuiaRemessa = guia => {
    setCarregando(true);
    let uuid = guia.uuid;
    imprimirGuiaRemessa(uuid)
      .then(() => {
        setCarregando(false);
      })
      .catch(error => {
        error.response.data.text().then(text => toastError(text));
        setCarregando(false);
      });
  };

  const retornaBotaoAcao = guia => {
    if (
      ["Recebimento parcial", "Não recebida"].includes(guia.status) &&
      checaReposicao(guia) &&
      guia.situacao === "ATIVA"
    ) {
      return (
        <>
          <NavLink
            className="float-left"
            to={`/${LOGISTICA}/${REPOSICAO_GUIA}?uuid=${guia.uuid}`}
          >
            <span className="link-acoes green">
              <i className="fas fa-redo" />
              Repor
            </span>
          </NavLink>
          |
        </>
      );
    } else if (
      ["Pendente de conferência", "Insucesso de entrega"].includes(
        guia.status
      ) &&
      guia.situacao === "ATIVA"
    ) {
      return (
        <>
          <NavLink
            className="float-left"
            to={`/${LOGISTICA}/${CONFERENCIA_GUIA}?uuid=${guia.uuid}`}
          >
            <span className="link-acoes green">
              <i className="fas fa-eye" />
              Conferir
            </span>
          </NavLink>
          |
        </>
      );
    }
  };

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <section className="resultado-conferir-entrega">
        <article>
          <div className="grid-table header-table">
            <div>Número da Guia</div>
            <div>Nome do Distribuidor</div>
            <div>Data de entrega</div>
            <div>Status</div>
            <div>Ações</div>
          </div>
          {guias.map(guia => {
            return (
              <>
                <div key={guia.uuid} className="grid-table body-table">
                  <div>{guia.numero_guia}</div>
                  <div>{guia.nome_distribuidor}</div>
                  <div>{guia.data_entrega}</div>
                  <div>{guia.status}</div>
                  <div>
                    {retornaBotaoAcao(guia)}

                    <span
                      className="link-acoes"
                      onClick={() => baixarPDFGuiaRemessa(guia)}
                    >
                      <i className="fas fa-print" />
                      Imprimir
                    </span>
                  </div>
                </div>
              </>
            );
          })}
        </article>
      </section>
    </Spin>
  );
};

export default ListagemSolicitacoes;
