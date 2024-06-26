import { Tooltip } from "antd";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";
import ModalSolicitacaoDownload from "components/Shareable/ModalSolicitacaoDownload";
import { toastError } from "components/Shareable/Toast/dialogs";
import {
  EDITAR,
  RELATORIO_FISCALIZACAO,
  RELATORIO_FISCALIZACAO_TERCEIRIZADAS,
  SUPERVISAO,
  TERCEIRIZADAS,
} from "configs/constants";
import { truncarString } from "helpers/utilities";
import HTTP_STATUS from "http-status-codes";
import { RelatorioVisitaItemListagem } from "interfaces/imr.interface";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { exportarPDFRelatorioFiscalizacao } from "services/imr/relatorioFiscalizacaoTerceirizadas";
import "./styles.scss";
interface Props {
  objetos: RelatorioVisitaItemListagem[];
  handleEditAction?: (_uuid: any) => void;
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

  const navigate = useNavigate();
  const deParaStatus = (status: string) =>
    ["Enviado para CODAE"].includes(status) && !perfilNutriSupervisao
      ? "Enviado pela Supervisão"
      : status;

  const goToFormularioSupervisao = (uuid: string) => {
    navigate(
      `/${SUPERVISAO}/${TERCEIRIZADAS}/${RELATORIO_FISCALIZACAO_TERCEIRIZADAS}/${RELATORIO_FISCALIZACAO}/${uuid}/${EDITAR}`,
      { state: { uuid: uuid } }
    );
  };

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
                <div>
                  {objeto.status === "Em Preenchimento" &&
                    perfilNutriSupervisao && (
                      <Botao
                        type={BUTTON_TYPE.BUTTON}
                        style={`${BUTTON_STYLE.GREEN_OUTLINE} no-border`}
                        icon={BUTTON_ICON.EDIT}
                        onClick={() => goToFormularioSupervisao(objeto.uuid)}
                        tooltipExterno="Editar relatório"
                      />
                    )}
                  {objeto.status && objeto.status !== "Em Preenchimento" && (
                    <Botao
                      style={`${BUTTON_STYLE.GREEN_OUTLINE} no-border`}
                      icon={
                        imprimindoPDF === objeto.uuid
                          ? BUTTON_ICON.LOADING
                          : BUTTON_ICON.FILE_PDF
                      }
                      disabled={imprimindoPDF === objeto.uuid}
                      onClick={() => exportarPDF(objeto.uuid)}
                    />
                  )}
                </div>
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
