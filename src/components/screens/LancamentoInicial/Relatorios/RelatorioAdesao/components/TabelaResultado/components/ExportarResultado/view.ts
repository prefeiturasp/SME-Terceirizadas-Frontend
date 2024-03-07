import { useState } from "react";
import HTTP_STATUS from "http-status-codes";

import { toastError } from "components/Shareable/Toast/dialogs";

export default () => {
  const [exportando, setExportando] = useState(false);
  const [exibirModalCentralDownloads, setExibirModalCentralDownloads] =
    useState(false);

  const exportarPDF = async () => {
    setExportando(true);
    const response = undefined;
    if (response.status === HTTP_STATUS.OK) {
      setExibirModalCentralDownloads(true);
    } else {
      toastError("Erro ao exportar pdf. Tente novamente mais tarde.");
    }
    setExportando(false);
  };

  const exportarXLSX = async () => {
    setExportando(true);
    const response = undefined;
    if (response.status === HTTP_STATUS.OK) {
      setExibirModalCentralDownloads(true);
    } else {
      toastError("Erro ao exportar xlsx. Tente novamente mais tarde.");
    }
    setExportando(false);
  };

  return {
    exportando,
    exibirModalCentralDownloads,
    setExibirModalCentralDownloads,
    exportarPDF,
    exportarXLSX,
  };
};
