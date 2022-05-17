import { Spin } from "antd";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";
import { toastError } from "components/Shareable/Toast/dialogs";
import React, { useState } from "react";
import { gerarExcelRelatorioDietaEspecial } from "services/dietaEspecial.service";
import Filtros from "./components/Filtros";
import ListagemDietas from "./components/ListagemDietas";
import "./styles.scss";

const RelatorioDietaEspecial = () => {
  const [carregando, setCarregando] = useState(false);
  const [dietasFiltradas, setDietasFiltradas] = useState([]);
  const [statusSelecionado, setStatusSelecionado] = useState(false);
  const [mostrarFiltrosAutorizadas, setMostrarFiltrosAutorizadas] = useState(
    false
  );
  const [filtragemRealizada, setFiltragemRealizada] = useState(false);
  const [terceirizadaUuid, setTerceirizadaUuid] = useState(null);
  const [dataInicial, setDataInicial] = useState(null);
  const [dataFinal, setDataFinal] = useState(null);
  const [lotesSelecionados, setLotesSelecionados] = useState([]);
  const [classificacoesSelecionadas, setClassificacoesSelecionadas] = useState(
    []
  );
  const [protocolosSelecionados, setProtocolosSelecionados] = useState([]);

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
    gerarExcelRelatorioDietaEspecial(params)
      .then(() => {})
      .catch(error => {
        error.response.data.text().then(text => toastError(text));
      });
  };

  return (
    <>
      <div className="sub-titulo">Filtrar dietas</div>
      <Spin tip="Carregando..." spinning={carregando}>
        <div className="card mt-3">
          <div className="card-body">
            <Filtros
              setCarregando={setCarregando}
              setDietasFiltradas={setDietasFiltradas}
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
                <ListagemDietas dietasFiltradas={dietasFiltradas} />
              </>
            )}
            {dietasFiltradas.length > 0 && (
              <Botao
                texto="Exportar XLSX"
                style={BUTTON_STYLE.GREEN_OUTLINE}
                icon={BUTTON_ICON.FILE_EXCEL}
                className="float-right ml-3"
                onClick={() => exportarXLSX()}
              />
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
