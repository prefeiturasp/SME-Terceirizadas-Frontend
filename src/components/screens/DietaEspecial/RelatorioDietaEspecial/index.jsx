import { Spin } from "antd";
import { toastError } from "components/Shareable/Toast/dialogs";
import MeusDadosContext from "context/MeusDadosContext";
import { usuarioEhEmpresaTerceirizada } from "helpers/utilities";
import HTTP_STATUS from "http-status-codes";
import React, { useContext, useState } from "react";
import { Form } from "react-final-form";
import {
  gerarExcelRelatorioDietaEspecial,
  gerarPdfRelatorioDietaEspecial,
  getSolicitacoesRelatorioDietasEspeciais,
} from "services/dietaEspecial.service";
import { Filtros } from "./components/Filtros";
import { ListagemDietas } from "./components/ListagemDietas";
import "./styles.scss";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
} from "components/Shareable/Botao/constants";
import ModalSolicitacaoDownload from "components/Shareable/ModalSolicitacaoDownload";

const PAGE_SIZE = 10;

export const RelatorioDietaEspecial = () => {
  const { meusDados } = useContext(MeusDadosContext);

  const [filtros, setFiltros] = useState(null);
  const [dietasEspeciais, setDietasEspeciais] = useState(null);
  const [unidadesEducacionais, setUnidadesEducacionais] = useState([]);

  const [erroAPI, setErroAPI] = useState("");
  const [loadingDietas, setLoadingDietas] = useState(false);
  const [imprimindoPdf, setImprimindoPdf] = useState(false);
  const [imprimindoExcel, setImprimindoExcel] = useState(false);
  const [exibirModalCentralDownloads, setExibirModalCentralDownloads] =
    useState(false);

  const PARAMS = { limit: PAGE_SIZE, offset: 0 };

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

  const onSubmit = async (values) => {
    setLoadingDietas(true);
    let params = {
      ...PARAMS,
      ...values,
    };
    if (usuarioEhEmpresaTerceirizada()) {
      params["terceirizada"] = meusDados.vinculo_atual.instituicao.uuid;
    }
    const response = await getSolicitacoesRelatorioDietasEspeciais(
      ajustaParams(params)
    );
    if (response.status === HTTP_STATUS.OK) {
      setDietasEspeciais(response.data);
    } else {
      toastError(
        "Erro ao carregar dados das dietas especiais. Tente novamente mais tarde."
      );
    }
    setLoadingDietas(false);
  };

  const exportarXLSX = async (values) => {
    if (usuarioEhEmpresaTerceirizada()) {
      values["terceirizada"] = meusDados.vinculo_atual.instituicao.uuid;
    }
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
    if (usuarioEhEmpresaTerceirizada()) {
      values["terceirizada"] = meusDados.vinculo_atual.instituicao.uuid;
    }
    setImprimindoPdf(true);
    const response = await gerarPdfRelatorioDietaEspecial(ajustaParams(values));
    if (response.status === HTTP_STATUS.OK) {
      setExibirModalCentralDownloads(true);
    } else {
      toastError("Erro ao baixar PDF. Tente novamente mais tarde");
    }
    setImprimindoPdf(false);
  };

  return (
    <div className="card mt-3">
      <div className="card-body">
        {erroAPI && <div>{erroAPI}</div>}
        {!erroAPI && meusDados && (
          <>
            <Form onSubmit={onSubmit}>
              {({ handleSubmit, values, form }) => (
                <form onSubmit={handleSubmit}>
                  <Spin
                    spinning={loadingDietas}
                    tip="Carregando dietas especiais..."
                  >
                    <Filtros
                      erroAPI={erroAPI}
                      filtros={filtros}
                      form={form}
                      meusDados={meusDados}
                      values={values}
                      setDietasEspeciais={setDietasEspeciais}
                      setErroAPI={setErroAPI}
                      setFiltros={setFiltros}
                      setUnidadesEducacionais={setUnidadesEducacionais}
                      unidadesEducacionais={unidadesEducacionais}
                    />
                    {dietasEspeciais && (
                      <>
                        <div className="row">
                          <div className="total-dietas col-12 text-right">
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
                          values={values}
                        />
                        {dietasEspeciais && dietasEspeciais.length === 0 && (
                          <div className="text-center mt-5">
                            Nenhum resultado encontrado.
                          </div>
                        )}
                        <div className="row">
                          <div className="col-12 text-right">
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
                              onClick={() => exportarPDF(values)}
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
                              onClick={() => exportarXLSX(values)}
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
                </form>
              )}
            </Form>
          </>
        )}
      </div>
    </div>
  );
};
