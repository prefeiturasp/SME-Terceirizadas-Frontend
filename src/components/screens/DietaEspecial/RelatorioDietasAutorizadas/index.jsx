import React, { useContext, useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { Spin } from "antd";
import { toastError } from "components/Shareable/Toast/dialogs";
import { Filtros } from "./components/Filtros";
import { ListagemDietas } from "./components/ListagemDietas";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
} from "components/Shareable/Botao/constants";
import ModalSolicitacaoDownload from "components/Shareable/ModalSolicitacaoDownload";
import MeusDadosContext from "context/MeusDadosContext";
import {
  gerarExcelRelatorioDietaEspecial,
  getFiltrosRelatorioDietasEspeciais,
  gerarPdfRelatorioDietaEspecial,
} from "services/dietaEspecial.service";
import "./styles.scss";

export const RelatorioDietasAutorizadas = () => {
  const { meusDados } = useContext(MeusDadosContext);

  const [filtros, setFiltros] = useState(null);
  const [valuesForm, setValuesForm] = useState(null);
  const [dietasEspeciais, setDietasEspeciais] = useState(null);
  const [unidadesEducacionais, setUnidadesEducacionais] = useState([]);

  const [erroAPI, setErroAPI] = useState("");
  const [loadingDietas, setLoadingDietas] = useState(false);
  const [imprimindoPdf, setImprimindoPdf] = useState(false);
  const [imprimindoExcel, setImprimindoExcel] = useState(false);
  const [exibirModalCentralDownloads, setExibirModalCentralDownloads] =
    useState(false);

  const ajustaParams = (params) => {
    if (
      params.classificacoes_selecionadas &&
      params.classificacoes_selecionadas.length ===
        filtros.classificacoes.length
    ) {
      params.classificacoes_selecionadas = null;
    }

    if (
      params.protocolos_padrao_selecionados &&
      params.protocolos_padrao_selecionados.length ===
        filtros.protocolos_padrao.length
    ) {
      params.protocolos_padrao_selecionados = null;
    }

    if (
      params.unidades_educacionais_selecionadas &&
      params.unidades_educacionais_selecionadas.length ===
        unidadesEducacionais.length
    ) {
      params.unidades_educacionais_selecionadas = null;
    }
    return params;
  };

  const exportarXLSX = async (values) => {
    setImprimindoExcel(true);
    const response = await gerarExcelRelatorioDietaEspecial(
      ajustaParams(values)
    );
    if (response.status === HTTP_STATUS.OK) {
      setExibirModalCentralDownloads(true);
    } else {
      toastError("Erro ao baixar XLSX. Tente novamente mais tarde");
    }
    setImprimindoExcel(false);
  };

  const exportarPDF = async (values) => {
    setImprimindoPdf(true);
    const response = await gerarPdfRelatorioDietaEspecial(ajustaParams(values));
    if (response.status === HTTP_STATUS.OK) {
      setExibirModalCentralDownloads(true);
    } else {
      toastError("Erro ao baixar PDF. Tente novamente mais tarde");
    }
    setImprimindoPdf(false);
  };

  const getFiltrosRelatorioDietasEspeciaisAsync = async (values) => {
    setFiltros(null);
    const response = await getFiltrosRelatorioDietasEspeciais(values);
    if (response.status === HTTP_STATUS.OK) {
      setFiltros(response.data);
    } else {
      setErroAPI("Erro ao carregar filtros. Tente novamente mais tarde.");
    }
  };

  useEffect(() => {
    const params = {
      status_selecionado: "AUTORIZADAS",
    };
    getFiltrosRelatorioDietasEspeciaisAsync(params);
  }, []);

  return (
    <div className="card mt-3">
      <div className="card-body">
        {erroAPI && <div>{erroAPI}</div>}
        {!erroAPI && meusDados && (
          <>
            <Spin spinning={loadingDietas} tip="Carregando dietas especiais...">
              <Filtros
                erroAPI={erroAPI}
                filtros={filtros}
                meusDados={meusDados}
                setDietasEspeciais={setDietasEspeciais}
                setErroAPI={setErroAPI}
                setFiltros={setFiltros}
                setUnidadesEducacionais={setUnidadesEducacionais}
                unidadesEducacionais={unidadesEducacionais}
                onClear={() => {
                  setDietasEspeciais(null);
                  getFiltrosRelatorioDietasEspeciaisAsync({
                    status_selecionado: "AUTORIZADAS",
                  });
                }}
                setLoadingDietas={setLoadingDietas}
                ajustaParams={ajustaParams}
                setValuesForm={setValuesForm}
                getFiltrosRelatorioDietasEspeciaisAsync={
                  getFiltrosRelatorioDietasEspeciaisAsync
                }
              />
              {dietasEspeciais && (
                <>
                  <div className="row">
                    <div className="total-dietas col-12 text-end">
                      Total de dietas:
                      <div className="numero-total-dietas">
                        {dietasEspeciais.count}
                      </div>
                    </div>
                  </div>

                  <ListagemDietas
                    dietasEspeciais={dietasEspeciais}
                    meusDados={meusDados}
                    setDietasEspeciais={setDietasEspeciais}
                    setLoadingDietas={setLoadingDietas}
                    values={valuesForm}
                  />
                  {dietasEspeciais && dietasEspeciais.length === 0 && (
                    <div className="text-center mt-5">
                      Nenhum resultado encontrado.
                    </div>
                  )}
                  <div className="row">
                    <div className="col-12 text-end">
                      <Botao
                        texto="Exportar PDF"
                        style={
                          imprimindoPdf
                            ? BUTTON_STYLE.GREEN_OUTLINE
                            : BUTTON_STYLE.GREEN
                        }
                        icon={
                          imprimindoPdf
                            ? BUTTON_ICON.LOADING
                            : BUTTON_ICON.FILE_PDF
                        }
                        disabled={imprimindoPdf || imprimindoExcel}
                        onClick={() => exportarPDF(valuesForm)}
                      />
                      <Botao
                        texto="Exportar XLSX"
                        style={
                          imprimindoExcel
                            ? BUTTON_STYLE.GREEN_OUTLINE
                            : BUTTON_STYLE.GREEN
                        }
                        icon={
                          imprimindoExcel
                            ? BUTTON_ICON.LOADING
                            : BUTTON_ICON.FILE_EXCEL
                        }
                        disabled={imprimindoPdf || imprimindoExcel}
                        className="ms-3"
                        onClick={() => exportarXLSX(valuesForm)}
                      />
                      {exibirModalCentralDownloads && (
                        <ModalSolicitacaoDownload
                          show={exibirModalCentralDownloads}
                          setShow={setExibirModalCentralDownloads}
                        />
                      )}
                    </div>
                  </div>
                </>
              )}
            </Spin>
          </>
        )}
      </div>
    </div>
  );
};
