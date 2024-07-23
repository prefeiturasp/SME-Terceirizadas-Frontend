import React, { Fragment, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import "./styles.scss";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
} from "components/Shareable/Botao/constants";
import ModalSolicitacaoDownload from "components/Shareable/ModalSolicitacaoDownload";
import { gerarExcelRelatorioControleSobrasBruto } from "services/controleSobras.service";
import { toastError } from "components/Shareable/Toast/dialogs";

const TabelaControleSobras = ({ list, getFiltros }) => {
  const [imprimindoExcel, setImprimindoExcel] = useState(false);
  const [exibirModalCentralDownloads, setExibirModalCentralDownloads] =
    useState(false);

  if (list === undefined || list.length === 0) {
    return <div>Carregando...</div>;
  }

  const exportarXLSX = async () => {
    setImprimindoExcel(true);
    const response = await gerarExcelRelatorioControleSobrasBruto({
      ...getFiltros(),
    });
    if (response.status === HTTP_STATUS.OK) {
      setExibirModalCentralDownloads(true);
    } else {
      toastError("Erro ao baixar XLSX. Tente novamente mais tarde");
    }
    setImprimindoExcel(false);
  };

  return (
    <>
      {list.length === 0 ? (
        <div className="row">
          <div className="col-12 text-center">Nenhum resultado encontrado</div>
        </div>
      ) : (
        <div className="row">
          <div className="col-12">
            <table className="table table-bordered table-items table-responsive">
              <thead>
                <tr className="table-head-items">
                  <th className="unidade_dre">Unidade Educacional e DRE</th>
                  <th>Data da Medição</th>
                  <th>Período</th>
                  <th>Tipo de Alimentação</th>
                  <th>Tipo de Alimento</th>
                  <th>Especificar</th>
                  <th>Tipo de Recipiente</th>
                  <th>Peso do Recipiente (Kg)</th>
                  <th>Peso do Alimento Pronto com Recipiente</th>
                  <th>Peso da Sobra com Recipiente</th>
                  <th>Peso do Alimento Pronto (Kg)</th>
                  <th>Peso da Sobra (Kg)</th>
                  <th>Peso da Refeição Distribuída (Kg)</th>
                  <th>Total de Alunos (frequência)</th>
                  <th>Total Primeira Oferta</th>
                  <th>Total Segunda Oferta (Repetição)</th>
                  <th>% Sobra</th>
                  <th>Média por Aluno</th>
                  <th>Média por Refeição</th>
                  <th>Classificação</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item, idx) => {
                  return (
                    <Fragment key={idx}>
                      <tr className="table-body-items">
                        <td>
                          <b>{item.escola_nome}</b>
                          <br></br>
                          <small>{item.dre_nome}</small>
                        </td>
                        <td>{item.data_medicao}</td>
                        <td>{item.periodo}</td>
                        <td>{item.tipo_alimentacao_nome}</td>
                        <td>{item.tipo_alimento_nome}</td>
                        <td>{item.especificar}</td>
                        <td>{item.tipo_recipiente_nome}</td>
                        <td>{item.peso_recipiente}</td>
                        <td>{item.peso_alimento_pronto_com_recipiente}</td>
                        <td>{item.peso_sobra_com_recipiente}</td>
                        <td>{item.peso_alimento}</td>
                        <td>{item.peso_sobra}</td>
                        <td>{item.peso_distribuida}</td>
                        <td>{item.frequencia}</td>
                        <td>{item.total_primeira_oferta}</td>
                        <td>{item.total_repeticao}</td>
                        <td>{item.percentual_sobra}</td>
                        <td>{item.media_por_aluno}</td>
                        <td>{item.media_por_refeicao}</td>
                        <td>{item.classificacao}</td>
                      </tr>
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
            <div className="row">
              <div className="col-12 text-right">
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
                  disabled={imprimindoExcel}
                  className="ml-3"
                  onClick={exportarXLSX}
                />
                {exibirModalCentralDownloads && (
                  <ModalSolicitacaoDownload
                    show={exibirModalCentralDownloads}
                    setShow={setExibirModalCentralDownloads}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ({ list, getFiltros }) => {
  return <TabelaControleSobras list={list} getFiltros={getFiltros} />;
};
