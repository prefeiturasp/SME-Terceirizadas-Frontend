import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { Spin } from "antd";
import {
  getCronogramaDetalhar,
  imprimirCronograma,
} from "services/cronograma.service";
import AcoesDetalhar from "../AcoesDetalhar";
import { usuarioEhEmpresaFornecedor } from "helpers/utilities";
import AcoesDetalharDinutreDiretoria from "../AcoesDetalharDinutreDiretoria";
import AcoesDetalharDilogDiretoria from "../AcoesDetalharDilogDiretoria";
import {
  usuarioEhCronograma,
  usuarioEhDilogDiretoria,
  usuarioEhDinutreDiretoria,
} from "helpers/utilities";
import HTTP_STATUS from "http-status-codes";
import "./styles.scss";
import DadosCronograma from "../DadosCronograma";
import { toastError } from "components/Shareable/Toast/dialogs";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";
import { FluxoDeStatusPreRecebimento } from "components/Shareable/FluxoDeStatusPreRecebimento";

export default () => {
  const urlParams = new URLSearchParams(window.location.search);
  const uuid = urlParams.get("uuid");
  const [cronograma, setCronograma] = useState(null);
  const [carregando, setCarregando] = useState(false);

  const history = useHistory();

  const esconderLogFornecedor = (logs) => {
    return logs.filter(
      (log) => !["Assinado DINUTRE"].includes(log.status_evento_explicacao)
    );
  };

  const getDetalhes = async () => {
    if (uuid) {
      let responseCronograma = await getCronogramaDetalhar(uuid);
      if (responseCronograma.status === HTTP_STATUS.OK) {
        if (usuarioEhEmpresaFornecedor()) {
          responseCronograma.data.logs = esconderLogFornecedor(
            responseCronograma.data.logs
          );
        }
        setCronograma(responseCronograma.data);
      }
    }
  };

  const converte_tipo_carga = (tipo) => {
    if (tipo === "PALETIZADA") {
      return "Paletizada";
    } else if (tipo === "ESTIVADA_BATIDA") {
      return "Estivada/Batida";
    }
  };

  const baixarPDFCronograma = () => {
    setCarregando(true);
    let uuid = cronograma.uuid;
    let numero = cronograma.numero;
    imprimirCronograma(uuid, numero)
      .then(() => {
        setCarregando(false);
      })
      .catch((error) => {
        error.response.data.text().then((text) => toastError(text));
        setCarregando(false);
      });
  };

  const botaoImprimir = cronograma &&
    cronograma.status === "Assinado CODAE" && (
      <Botao
        texto="Baixar PDF Cronograma"
        type={BUTTON_TYPE.BUTTON}
        style={BUTTON_STYLE.GREEN_OUTLINE}
        className="float-end ml-3"
        onClick={() => baixarPDFCronograma()}
      />
    );

  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.goBack();
  };

  useEffect(() => {
    getDetalhes();
  }, []);

  return (
    <Spin tip="Carregando..." spinning={!cronograma || carregando}>
      <div className="card mt-3">
        <div className="card-body">
          {cronograma && (
            <>
              {cronograma.logs && (
                <>
                  <div className="row pb-3">
                    <p className="head-green mt-3 ml-3 mb-5">
                      Status do Cronograma
                    </p>
                    <FluxoDeStatusPreRecebimento
                      listaDeStatus={cronograma.logs}
                      itensClicaveisCronograma
                    />
                  </div>
                  <hr className="hr-detalhar" />
                </>
              )}
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
                  {botaoImprimir}
                </div>
              )}
              {usuarioEhCronograma() && (
                <div className="mt-4 mb-4">
                  <Botao
                    texto="Voltar"
                    type={BUTTON_TYPE.BUTTON}
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                    className="float-end ml-3"
                    onClick={() => handleBack()}
                  />
                  {botaoImprimir}
                </div>
              )}
              {usuarioEhDinutreDiretoria() && (
                <>
                  <AcoesDetalharDinutreDiretoria cronograma={cronograma} />
                  {botaoImprimir}
                </>
              )}
              {usuarioEhDilogDiretoria() && (
                <>
                  <AcoesDetalharDilogDiretoria cronograma={cronograma} />
                  {botaoImprimir}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </Spin>
  );
};
