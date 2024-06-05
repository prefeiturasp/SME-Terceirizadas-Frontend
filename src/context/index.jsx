import React from "react";
import { CentralDeDownloadContextProvider } from "./CentralDeDownloads";
import { TemaContextProvider } from "./TemaContext";
import { MeusDadosContextProvider } from "./MeusDadosContext";
import { SolicitacaoAlimentacaoContextProvider } from "./SolicitacaoAlimentacao";
import { EscolaSimplesContextProvider } from "./EscolaSimplesContext";

export const GlobalContext = ({ children }) => {
  return (
    <TemaContextProvider>
      <CentralDeDownloadContextProvider>
        <SolicitacaoAlimentacaoContextProvider>
          <EscolaSimplesContextProvider>
            <MeusDadosContextProvider>{children}</MeusDadosContextProvider>
          </EscolaSimplesContextProvider>
        </SolicitacaoAlimentacaoContextProvider>
      </CentralDeDownloadContextProvider>
    </TemaContextProvider>
  );
};
