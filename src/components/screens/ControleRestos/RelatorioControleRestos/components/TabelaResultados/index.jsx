import React, { Fragment, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import "./styles.scss";
import { gerarExcelRelatorioControleRestos } from "services/controleRestos.service";
import ModalSolicitacaoDownload from "components/Shareable/ModalSolicitacaoDownload";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
} from "components/Shareable/Botao/constants";
import { toastError } from "components/Shareable/Toast/dialogs";

const TabelaControleRestos = ({ list, getFiltros }) => {
  const [imprimindoExcel, setImprimindoExcel] = useState(false);
  const [exibirModalCentralDownloads, setExibirModalCentralDownloads] =
    useState(false);

  if (list === undefined || list.length === 0) {
    return <div>Carregando...</div>;
  }

  const exportarXLSX = async () => {
    setImprimindoExcel(true);
    const response = await gerarExcelRelatorioControleRestos({
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
                  <th className="escola">Escola</th>
                  <th>Data da Medição</th>
                  <th>Período</th>
                  <th>Cardápio</th>
                  <th>Tipo de Alimentação</th>
                  <th>Resto Predomínante</th>
                  <th>Quantidade Distribuída</th>
                  <th>Tipo de Alimento</th>
                  <th>Peso do Resto (Kg)</th>
                  <th>Nº Refeições</th>
                  <th>Resto per Capita</th>
                  <th>% Resto</th>
                  <th>Classificação</th>
                  <th>Aceitabilidade</th>
                  <th>Observações</th>
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
                        <td>{item.cardapio}</td>
                        <td>{item.tipo_alimentacao_nome}</td>
                        <td>{item.resto_predominante}</td>
                        <td>{item.quantidade_distribuida}</td>
                        <td>{item.tipo_alimento_nome}</td>
                        <td>{item.peso_resto}</td>
                        <td>{item.num_refeicoes}</td>
                        <td>{item.resto_per_capita}</td>
                        <td>{item.percent_resto}</td>
                        <td>{item.classificacao}</td>
                        <td>{item.aceitabilidade}</td>
                        <td>{item.observacoes}</td>
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
  return <TabelaControleRestos list={list} getFiltros={getFiltros} />;
};
