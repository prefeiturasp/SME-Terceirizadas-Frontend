import React from "react";

import Botao from "components/Shareable/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";
import ModalSolicitacaoDownload from "components/Shareable/ModalSolicitacaoDownload";

import useView from "./view";
import { Filtros } from "../../../../types";

type Props = {
  params: Filtros;
  className: string;
};

export default ({ params, className }: Props) => {
  const view = useView({ params });

  return (
    <div className={className}>
      <Botao
        texto="Exportar em XLSX"
        style={BUTTON_STYLE.GREEN_OUTLINE}
        icon={BUTTON_ICON.FILE_EXCEL}
        type={BUTTON_TYPE.BUTTON}
        disabled={view.exportando}
        onClick={view.exportarXLSX}
      />
      {view.exibirModalCentralDownloads && (
        <ModalSolicitacaoDownload
          show={view.exibirModalCentralDownloads}
          setShow={view.setExibirModalCentralDownloads}
        />
      )}
    </div>
  );
};
