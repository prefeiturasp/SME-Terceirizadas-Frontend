import React, { Fragment, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import "./styles.scss";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
} from "components/Shareable/Botao/constants";
import ModalSolicitacaoDownload from "components/Shareable/ModalSolicitacaoDownload";
import { gerarExcelRelatorioControleSobras } from "services/controleSobras.service";
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
    const response = await gerarExcelRelatorioControleSobras({
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
            <table className="table table-bordered table-items">
              <thead>
                <tr className="table-head-items">
                  <th className="unidade_dre">Unidade Educacional e DRE</th>
                  <th className="tipo_alimentacao">Tipo de Alimentação</th>
                  <th className="tipo_alimento">Tipo de Alimento</th>
                  <th className="data_medicao">Data da Medição</th>
                  <th className="periodo">Período</th>
                  <th className="peso_refeicao_distribuida">
                    Peso da Refeição Distribuída (Kg)
                  </th>
                  <th className="peso_sobra">Peso da Sobra (Kg)</th>
                  <th className="total_alunos">Total de Alunos (frequência)</th>
                  <th className="total_primeira_oferta">
                    Total Primeira Oferta
                  </th>
                  <th className="total_segunda_oferta">
                    Total Segunda Oferta (Repetição)
                  </th>
                  <th className="percentual_sobra">% Sobra</th>
                  <th className="media_aluno">Média por Aluno</th>
                  <th className="media_refeicao">Média por Refeição</th>
                  <th className="classificacao">Classificação</th>
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
                        <td>{item.tipo_alimentacao_nome}</td>
                        <td>{item.tipo_alimento_nome}</td>
                        <td>{item.data_medicao}</td>
                        <td>{item.periodo}</td>
                        <td>{item.quantidade_distribuida}</td>
                        <td>{item.peso_sobra}</td>
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
