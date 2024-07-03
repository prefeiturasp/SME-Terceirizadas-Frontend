import React, { ReactElement, useState } from "react";
import { Tooltip } from "antd";
import ModalSolicitacaoDownload from "components/Shareable/ModalSolicitacaoDownload";
import { toastError } from "components/Shareable/Toast/dialogs";
import { RelatorioVisitaItemListagem } from "interfaces/imr.interface";
import {
  DETALHAR_RELATORIO_FISCALIZACAO,
  EDITAR_RELATORIO_FISCALIZACAO,
  RELATORIO_FISCALIZACAO_TERCEIRIZADAS,
  SUPERVISAO,
  TERCEIRIZADAS,
} from "configs/constants";
import { truncarString } from "helpers/utilities";
import HTTP_STATUS from "http-status-codes";
import { exportarPDFRelatorioFiscalizacao } from "services/imr/relatorioFiscalizacaoTerceirizadas";
import { NavLink } from "react-router-dom";
import "./styles.scss";

interface Props {
  objetos: RelatorioVisitaItemListagem[];
  perfilNutriSupervisao: boolean;
}

const TAMANHO_MAXIMO = 40;

export const Listagem: React.FC<Props> = ({
  objetos,
  perfilNutriSupervisao,
}) => {
  const [exibirModalCentralDownloads, setExibirModalCentralDownloads] =
    useState(false);
  const [imprimindoPDF, setImprimindoPDF] = useState<string>("");

  const deParaStatus = (status: string) =>
    ["Enviado para CODAE"].includes(status) && !perfilNutriSupervisao
      ? "Enviado pela Supervisão"
      : status;

  const exportarPDF = async (uuid: string) => {
    setImprimindoPDF(uuid);
    const response = await exportarPDFRelatorioFiscalizacao({
      uuid,
    });
    if (response.status === HTTP_STATUS.OK) {
      setExibirModalCentralDownloads(true);
    } else {
      toastError("Erro ao baixar PDF. Tente novamente mais tarde");
    }
    setImprimindoPDF("");
  };

  const renderizarAcoes = (
    objeto: RelatorioVisitaItemListagem
  ): ReactElement => {
    const botaoContinuarCadastro = (
      <Tooltip title="Editar relatório">
        <NavLink
          className="float-start"
          to={`/${SUPERVISAO}/${TERCEIRIZADAS}/${RELATORIO_FISCALIZACAO_TERCEIRIZADAS}/${EDITAR_RELATORIO_FISCALIZACAO}?uuid=${objeto.uuid}`}
        >
          <button className="verde">
            <i className="fas fa-edit" />
          </button>
        </NavLink>
      </Tooltip>
    );

    const botaoDetalhar = (
      <Tooltip title="Visualizar Relatório">
        <NavLink
          className="float-start"
          to={`/${SUPERVISAO}/${TERCEIRIZADAS}/${RELATORIO_FISCALIZACAO_TERCEIRIZADAS}/${DETALHAR_RELATORIO_FISCALIZACAO}?uuid=${objeto.uuid}`}
        >
          <button className="verde">
            <i className="fas fa-eye" />
          </button>
        </NavLink>
      </Tooltip>
    );

    const botaoImprimir = (
      <Tooltip title="Relatório em PDF">
        <button
          onClick={() => exportarPDF(objeto.uuid)}
          className="verde"
          disabled={imprimindoPDF === objeto.uuid}
        >
          <i className="fas fa-download" />
        </button>
      </Tooltip>
    );

    return (
      <div>
        {objeto.status === "Em Preenchimento" &&
          perfilNutriSupervisao &&
          botaoContinuarCadastro}
        {objeto.status === "Enviado para CODAE" &&
          perfilNutriSupervisao &&
          botaoDetalhar}
        {objeto.status !== "Em Preenchimento" &&
          perfilNutriSupervisao &&
          botaoImprimir}
      </div>
    );
  };

  return (
    <div className="listagem-relatorios-visita">
      <div className="titulo-verde mt-5 mb-3">
        Relatórios das Visitas as Unidades Cadastrados
      </div>

      <article>
        <div className="grid-table header-table">
          <div>Diretoria Regional</div>
          <div>Unidade Educacional</div>
          <div>Data da Visita</div>
          <div>Status</div>
          <div>Ações</div>
        </div>

        {objetos.map((objeto) => {
          return (
            <>
              <div key={objeto.uuid} className="grid-table body-table">
                <div>{objeto.diretoria_regional}</div>
                <div>
                  <Tooltip title={objeto.unidade_educacional}>
                    {truncarString(objeto.unidade_educacional, TAMANHO_MAXIMO)}
                  </Tooltip>
                </div>
                <div>{objeto.data}</div>
                <div>{deParaStatus(objeto.status)}</div>
                <div className="p-0">{renderizarAcoes(objeto)}</div>
              </div>
            </>
          );
        })}
      </article>
      <ModalSolicitacaoDownload
        show={exibirModalCentralDownloads}
        setShow={setExibirModalCentralDownloads}
      />
    </div>
  );
};
