import React, { useState } from "react";
import { useEffect } from "react";
import { Spin } from "antd";
import { getCronograma } from "services/cronograma.service";
import AcoesDetalhar from "../AcoesDetalhar";
import { usuarioEhEmpresaFornecedor } from "helpers/utilities";
import AcoesDetalharCronograma from "../AcoesDetalharCronograma";
import AcoesDetalharDinutreDiretoria from "../AcoesDetalharDinutreDiretoria";
import AcoesDetalharDilogDiretoria from "../AcoesDetalharDilogDiretoria";
import {
  usuarioEhCronograma,
  usuarioEhDilogDiretoria,
  usuarioEhDinutreDiretoria
} from "helpers/utilities";
import HTTP_STATUS from "http-status-codes";
import "./styles.scss";
import DadosCronograma from "../DadosCronograma";

export default () => {
  const urlParams = new URLSearchParams(window.location.search);
  const uuid = urlParams.get("uuid");
  const [cronograma, setCronograma] = useState(null);

  const getDetalhes = async () => {
    if (uuid) {
      const responseCronograma = await getCronograma(uuid);
      if (responseCronograma.status === HTTP_STATUS.OK) {
        setCronograma(responseCronograma.data);
      }
    }
  };

  const converte_tipo_carga = tipo => {
    if (tipo === "PALETIZADA") {
      return "Paletizada";
    } else if (tipo === "ESTIVADA_BATIDA") {
      return "Estivada/Batida";
    }
  };

  useEffect(() => {
    getDetalhes();
  }, []);

  return (
    <Spin tip="Carregando..." spinning={!cronograma}>
      <div className="card mt-3">
        <div className="card-body">
          {cronograma && (
            <>
              <DadosCronograma cronograma={cronograma} />
              <hr className="hr-detalhar" />
              <p className="head-green mt-3">Dados do Recebimento</p>
              <br />
              {cronograma.programacoes_de_recebimento.length > 0 &&
                cronograma.programacoes_de_recebimento
                  .reverse()
                  .map((programacao, key) => {
                    return (
                      <>
                        <div key={key} className="row mb-3">
                          <div className="col-3">
                            <p>Data Programada:</p>
                            <p>
                              <b>{programacao.data_programada}</b>
                            </p>
                          </div>
                          <div className="col-3">
                            <p>Tipo de Carga:</p>
                            <p>
                              <b>
                                {converte_tipo_carga(programacao.tipo_carga)}
                              </b>
                            </p>
                          </div>
                        </div>
                      </>
                    );
                  })}
              <br />
              {usuarioEhEmpresaFornecedor() && (
                <div className="mt-4 mb-4">
                  <AcoesDetalhar cronograma={cronograma} />
                </div>
              )}
              {usuarioEhCronograma() && (
                <div className="mt-4 mb-4">
                  <AcoesDetalharCronograma cronograma={cronograma} />
                </div>
              )}
              {usuarioEhDinutreDiretoria() && (
                <AcoesDetalharDinutreDiretoria cronograma={cronograma} />
              )}
              {usuarioEhDilogDiretoria() && (
                <AcoesDetalharDilogDiretoria cronograma={cronograma} />
              )}
            </>
          )}
        </div>
      </div>
    </Spin>
  );
};
