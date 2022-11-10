import React from "react";
import { Spin } from "antd";
import "./styles.scss";

export default ({ listaRascunhos }) => {
  const so_data = data => {
    if (data) {
      return data.slice(0, 10);
    }
  };
  const so_hora = hora => {
    if (hora) {
      return hora.slice(11, 16);
    }
  };
  return (
    <>
      <Spin tip="Carregando..." spinning={!listaRascunhos}>
        {listaRascunhos && listaRascunhos.length > 0 && (
          <div className="card mt-3">
            <div className="card-body body-rascunho">
              <span className="titulo-rascunho">Rascunhos</span>
              <div className="tabela-rascunho">
                {listaRascunhos.map((rascunho, idx) => {
                  return (
                    <div key={idx} className="row row-rascunho">
                      <div className="col-5 numero-rascunho">{`Cronograma #${
                        rascunho.numero
                      }`}</div>
                      <div className="col-7 data-rascunho ">
                        {`Rascunho salvo em ${so_data(
                          rascunho.criado_em
                        )} às ${so_hora(rascunho.criado_em)}`}

                        <span className="icon-editar-rascunho">
                          <i className="fas fa-edit" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </Spin>
    </>
  );
};
