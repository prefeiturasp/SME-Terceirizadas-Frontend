import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { getRascunhos } from "services/cronograma.service";
import HTTP_STATUS from "http-status-codes";
import "./styles.scss";

export default () => {
  const [carregando, setCarregando] = useState(false);
  const [listaRascunhos, setListaRascunhos] = useState([{}]);
  const [temRascunho, setTemRascunho] = useState(false);

  useEffect(() => {
    async function fetch() {
      setCarregando(true);
      const response = await getRascunhos();
      if (
        response.status === HTTP_STATUS.OK &&
        response.data.results.length > 0
      ) {
        setListaRascunhos(response.data.results);
        setTemRascunho(true);
      } else {
        setTemRascunho(false);
      }
      setCarregando(false);
    }
    fetch();
  }, []);

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
      {temRascunho && (
        <Spin tip="Carregando..." spinning={carregando}>
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
        </Spin>
      )}
    </>
  );
};
