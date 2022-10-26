import React from "react";
import "antd/dist/antd.css";
import "./styles.scss";

export default ({ terceirizadas, ativos, setAtivos, modulo }) => {
  return (
    <section className="resultado-busca-emails-terceirizadas">
      <article>
        <div className="grid-table header-table">
          <div>Empresas e E-mails Cadastrados no Módulo de {modulo}</div>
        </div>
        {terceirizadas.map((terceirizada, key) => {
          const bordas =
            ativos && ativos.includes(terceirizada.uuid)
              ? "desativar-borda"
              : "";
          const icone =
            ativos && ativos.includes(terceirizada.uuid)
              ? "minus-square"
              : "plus-square";
          return (
            <>
              <div key={key} className="grid-table body-table">
                <div className={`${bordas}`}>
                  <i
                    className={`far fa-${icone} expand icon-green px-3`}
                    onClick={() => {
                      ativos && ativos.includes(terceirizada.uuid)
                        ? setAtivos(
                            ativos.filter(el => el !== terceirizada.uuid)
                          )
                        : setAtivos(
                            ativos
                              ? [...ativos, terceirizada.uuid]
                              : [terceirizada.uuid]
                          );
                    }}
                  />
                  {terceirizada.razao_social}
                </div>
              </div>

              {ativos && ativos.includes(terceirizada.uuid) && (
                <>
                  {terceirizada.emails_terceirizadas.map((emails, key) => {
                    return (
                      emails.modulo === modulo && (
                        <div
                          key={key}
                          className="grid-table body-table hand-cursor"
                        >
                          <div className="col-12">
                            <div className="ml-5">{emails.email} </div>
                          </div>
                        </div>
                      )
                    );
                  })}
                </>
              )}
            </>
          );
        })}
      </article>
    </section>
  );
};
