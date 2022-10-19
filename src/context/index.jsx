import React from "react";
import { CentralDeDownloadContextProvider } from "./CentralDeDownloads";
import { MeusDadosContextProvider } from "./MeusDadosContext";
import { SolicitacaoAlimentacaoContextProvider } from "./SolicitacaoAlimentacao";

export const GlobalContext = ({ children }) => {
  return (
    <CentralDeDownloadContextProvider>
      <SolicitacaoAlimentacaoContextProvider>
        <MeusDadosContextProvider>{children}</MeusDadosContextProvider>
      </SolicitacaoAlimentacaoContextProvider>
    </CentralDeDownloadContextProvider>
  );
};
