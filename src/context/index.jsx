import React from "react";
import { CentralDeDownloadContextProvider } from "./CentralDeDownloads";
import { TemaContextProvider } from "./TemaContext";
import { MeusDadosContextProvider } from "./MeusDadosContext";
import { SolicitacaoAlimentacaoContextProvider } from "./SolicitacaoAlimentacao";

export const GlobalContext = ({ children }) => {
  return (
    <TemaContextProvider>
      <CentralDeDownloadContextProvider>
        <SolicitacaoAlimentacaoContextProvider>
          <MeusDadosContextProvider>{children}</MeusDadosContextProvider>
        </SolicitacaoAlimentacaoContextProvider>
      </CentralDeDownloadContextProvider>
    </TemaContextProvider>
  );
};
