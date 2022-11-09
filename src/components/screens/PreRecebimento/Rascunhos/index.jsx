import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { getRascunhos } from "services/cronograma.service";
import HTTP_STATUS from "http-status-codes";
import { FormOutlined } from "@ant-design/icons";

export default () => {
  const [carregando, setCarregando] = useState(false);
  const [listaRascunhos, setListaRascunhos] = useState([{}]);

  useEffect(() => {
    async function fetch() {
      setCarregando(true);
      const response = await getRascunhos();
      if (
        response.status === HTTP_STATUS.OK &&
        response.data.results.length > 0
      ) {
        setListaRascunhos(response.data.results);
        setCarregando(false);
      }
    }
    fetch();
  }, []);

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3">
        <div className="card-body">
          <span>Rascunho</span>
          {listaRascunhos.map((rascunho, idx) => {
            return (
              <div key={idx} className="row">
                <div className="col-8">{`Cronograma #${rascunho.numero}`}</div>
                <div className="col-3">
                  {`Rascunho salvo em ${rascunho.criado_em}`}
                </div>
                <div className="col-1">
                  <span className="icons">
                    <FormOutlined className="ml-5 mr-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Spin>
  );
};
