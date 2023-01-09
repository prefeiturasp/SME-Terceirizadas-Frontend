import { Spin } from "antd";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";
import { toastError } from "components/Shareable/Toast/dialogs";
import React, { useState, Fragment } from "react";
import {
  gerarExcelRelatorioDietaEspecial,
  gerarPdfRelatorioDietaEspecial
} from "services/dietaEspecial.service";
import Filtros from "./components/Filtros";
import ListagemDietas from "./components/ListagemDietas";
import "./styles.scss";

const RelatorioDietaEspecial = () => {
  const [carregando, setCarregando] = useState(false);
  const [dietasFiltradas, setDietasFiltradas] = useState([]);
  const [status, setStatus] = useState("");
  const [statusSelecionado, setStatusSelecionado] = useState(false);
  const [mostrarFiltrosAutorizadas, setMostrarFiltrosAutorizadas] = useState(
    false
  );
  const [filtragemRealizada, setFiltragemRealizada] = useState(false);
  const [terceirizadaUuid, setTerceirizadaUuid] = useState(null);
  const [nutriSupervisao, setNutriSupervisao] = useState(false);
  const [dataInicial, setDataInicial] = useState(null);
  const [dataFinal, setDataFinal] = useState(null);
  const [lotesSelecionados, setLotesSelecionados] = useState([]);
  const [classificacoesSelecionadas, setClassificacoesSelecionadas] = useState(
    []
  );
  const [protocolosSelecionados, setProtocolosSelecionados] = useState([]);
  const [imprimindoPdf, setImprimindoPdf] = useState(false);
  const [imprimindoExcel, setImprimindoExcel] = useState(false);

  const exportarXLSX = () => {
    const params = {
      status: mostrarFiltrosAutorizadas ? "AUTORIZADAS" : "CANCELADAS",
      lotes: lotesSelecionados.join(),
      classificacoes: classificacoesSelecionadas.join(),
      protocolos: protocolosSelecionados.join(),
      terceirizada_uuid: terceirizadaUuid,
      data_inicial: dataInicial,
      data_final: dataFinal
    };
    setImprimindoExcel(true);
    gerarExcelRelatorioDietaEspecial(params)
      .then(() => {
        setImprimindoExcel(false);
      })
      .catch(error => {
        error.response.data.text().then(text => toastError(text));
        setImprimindoExcel(false);
      });
  };

  const exportarPDF = () => {
    const params = {
      status: mostrarFiltrosAutorizadas ? "AUTORIZADAS" : "CANCELADAS",
      lotes: lotesSelecionados.join(),
      classificacoes: classificacoesSelecionadas.join(),
      protocolos: protocolosSelecionados.join(),
      terceirizada_uuid: terceirizadaUuid,
      data_inicial: dataInicial,
      data_final: dataFinal
    };
    setImprimindoPdf(true);
    gerarPdfRelatorioDietaEspecial(params)
      .then(() => {
        setImprimindoPdf(false);
      })
      .catch(error => {
        error.response.data.text().then(text => toastError(text));
        setImprimindoPdf(false);
      });
  };

  return (
    <>
      <div className="sub-titulo">Filtrar dietas</div>
      <Spin tip="Carregando..." spinning={carregando}>
        <div className="card relatorio-dietas-especiais mt-3">
          <div className="card-body">
            <Filtros
              setCarregando={setCarregando}
              setDietasFiltradas={setDietasFiltradas}
              dietasFiltradas={dietasFiltradas}
              setStatus={setStatus}
              setStatusSelecionado={setStatusSelecionado}
              setFiltragemRealizada={setFiltragemRealizada}
              lotesSelecionados={lotesSelecionados}
              setLotesSelecionados={setLotesSelecionados}
              classificacoesSelecionadas={classificacoesSelecionadas}
              setClassificacoesSelecionadas={setClassificacoesSelecionadas}
              protocolosSelecionados={protocolosSelecionados}
              setProtocolosSelecionados={setProtocolosSelecionados}
              terceirizadaUuid={terceirizadaUuid}
              setTerceirizadaUuid={setTerceirizadaUuid}
              nutriSupervisao={nutriSupervisao}
              setNutriSupervisao={setNutriSupervisao}
              dataInicial={dataInicial}
              setDataInicial={setDataInicial}
              dataFinal={dataFinal}
              setDataFinal={setDataFinal}
              mostrarFiltrosAutorizadas={mostrarFiltrosAutorizadas}
              setMostrarFiltrosAutorizadas={setMostrarFiltrosAutorizadas}
            />
            {dietasFiltradas.length > 0 && (
              <>
                <div className="total-dietas">
                  Total de dietas:
                  <div className="numero-total-dietas">
                    {dietasFiltradas.length}
                  </div>
                </div>
                <ListagemDietas
                  ehNutriSupervisao={nutriSupervisao}
                  dietasFiltradas={dietasFiltradas}
                  status={status}
                />
              </>
            )}
            {dietasFiltradas.length > 0 && (
              <Fragment>
                <Botao
                  texto="Exportar PDF"
                  style={
                    imprimindoPdf
                      ? BUTTON_STYLE.GREEN_OUTLINE
                      : BUTTON_STYLE.GREEN
                  }
                  icon={
                    imprimindoPdf ? BUTTON_ICON.LOADING : BUTTON_ICON.FILE_PDF
                  }
                  disabled={imprimindoPdf || imprimindoExcel}
                  className="float-right ml-3"
                  onClick={() => exportarPDF()}
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
                  className="float-right ml-3"
                  onClick={() => exportarXLSX()}
                />
              </Fragment>
            )}
            {!dietasFiltradas.length > 0 && !statusSelecionado && (
              <div className="text-center mt-5">Selecione um Status</div>
            )}
            {!dietasFiltradas.length > 0 && filtragemRealizada && (
              <div className="text-center mt-5">
                Nenhum resultado encontrado.
              </div>
            )}
          </div>
        </div>
      </Spin>
    </>
  );
};

export default RelatorioDietaEspecial;
