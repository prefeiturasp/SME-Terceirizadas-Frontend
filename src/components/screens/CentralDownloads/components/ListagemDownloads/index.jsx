import React from "react";
import "antd/dist/antd.css";
import "./styles.scss";
import { Checkbox, Tooltip } from "antd";
import { STATUS_DOWNLOAD } from "constants/shared";
import { baixarArquivoCentral } from "services/downloads.service";
import moment from "moment";

const ListagemDownloads = ({ downloads, deletaDownload, marcarVisto }) => {
  const retornaIconeStatus = status => {
    switch (status) {
      case STATUS_DOWNLOAD.CONCLUIDO:
        return "fas fa-check-circle verde";
      case STATUS_DOWNLOAD.EM_PROCESSAMENTO:
        return "fas fa-sync laranja";
      case STATUS_DOWNLOAD.ERRO:
        return "fas fa-times-circle vermelho";
    }
  };

  const baixarArquivo = async download => {
    await baixarArquivoCentral(download);
  };

  const verificaDataDownload = download => {
    const dataDownload = moment(download.data_criacao, "DD/MM/YYYY [ás] HH:mm");
    return moment().diff(dataDownload, "hours") < 96;
  };

  const retornaTextoTooltip = download => {
    if (download.status !== STATUS_DOWNLOAD.CONCLUIDO)
      return "Houve erro no download. Favor solicitar novamente.";
    else if (!verificaDataDownload(download))
      return "O prazo para download expirou. Solicite novamente.";
    else return "";
  };

  return (
    <section className="tabela-downloads">
      <article>
        <div className="grid-table header-table">
          <div>Identificador</div>
          <div>Status</div>
          <div>Data de Criação</div>
          <div>Visto</div>
          <div>Ações</div>
        </div>
        {downloads.map((download, index) => {
          return (
            <>
              <div className="grid-table body-table">
                <div>{download.identificador}</div>
                <div className="flex-container">
                  <i className={retornaIconeStatus(download.status)} />
                </div>
                <div>
                  {download.status === STATUS_DOWNLOAD.EM_PROCESSAMENTO
                    ? "----"
                    : download.data_criacao}
                </div>
                <div className="flex-container">
                  {download.status === STATUS_DOWNLOAD.EM_PROCESSAMENTO ? (
                    "----"
                  ) : (
                    <Checkbox
                      defaultChecked={download.visto}
                      onChange={() => {
                        marcarVisto(download, index);
                      }}
                    />
                  )}
                </div>
                <div className="flex-container">
                  <Tooltip title={retornaTextoTooltip(download)}>
                    <button
                      disabled={
                        download.status !== STATUS_DOWNLOAD.CONCLUIDO ||
                        !verificaDataDownload(download)
                      }
                      onClick={() => baixarArquivo(download)}
                      className="verde"
                    >
                      <i className="fas fa-download" />
                    </button>
                  </Tooltip>

                  <button
                    disabled={
                      download.status === STATUS_DOWNLOAD.EM_PROCESSAMENTO
                    }
                    onClick={() => deletaDownload(download)}
                    className="vermelho"
                  >
                    <i className="fas fa-trash-alt" />
                  </button>
                </div>
              </div>
            </>
          );
        })}
      </article>
    </section>
  );
};

export default ListagemDownloads;
