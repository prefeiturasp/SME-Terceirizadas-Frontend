import { Spin } from "antd";
import HTTP_STATUS from "http-status-codes";
import { TipoOcorrenciaInterface } from "interfaces/imr.interface";
import { ResponseFormularioSupervisaoTiposOcorrenciasInterface } from "interfaces/responses.interface";
import React, { useEffect, useState } from "react";
import { Form } from "react-final-form";
import { getTiposOcorrenciaPorEdital } from "services/imr/relatorioFiscalizacaoTerceirizadas";

export const RegistrarNovaOcorrencia = () => {
  const [tiposOcorrencia, setTiposOcorrencia] =
    useState<Array<TipoOcorrenciaInterface>>();
  const [loadingTiposOcorrencia, setLoadingTiposOcorrencia] = useState(false);
  const [erroAPI, setErroAPI] = useState<string>("");

  const getTiposOcorrenciaPorEditalAsync = async (): Promise<void> => {
    setLoadingTiposOcorrencia(true);
    const response: ResponseFormularioSupervisaoTiposOcorrenciasInterface =
      await getTiposOcorrenciaPorEdital({
        edital_uuid: "",
      });
    if (response.status === HTTP_STATUS.OK) {
      setTiposOcorrencia(response.data);
    } else {
      setErroAPI(
        "Erro ao carregar tipos de ocorrência do edital da unidade educacional. Tente novamente mais tarde."
      );
    }
    setLoadingTiposOcorrencia(false);
  };

  useEffect(() => {
    getTiposOcorrenciaPorEditalAsync();
  }, []);

  const onSubmit = () => {};

  return (
    <div className="card mt-3">
      <div className="card-body">
        <Form onSubmit={onSubmit}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              {!erroAPI && (
                <Spin spinning={loadingTiposOcorrencia}>
                  {tiposOcorrencia && <div>a</div>}
                </Spin>
              )}
            </form>
          )}
        </Form>
      </div>
    </div>
  );
};
