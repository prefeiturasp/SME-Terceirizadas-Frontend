import React from "react";
import { CentralDeDownloadContextProvider } from "./CentralDeDownloads";
import { TemaContextProvider } from "./TemaContext";
import { MeusDadosContextProvider } from "./MeusDadosContext";
import { SolicitacaoAlimentacaoContextProvider } from "./SolicitacaoAlimentacao";
import { EscolaSimplesContextProvider } from "./EscolaSimplesContext";
import { BuildProviderTree } from "./helpers";

const Providers = BuildProviderTree([
  CentralDeDownloadContextProvider,
  TemaContextProvider,
  MeusDadosContextProvider,
  SolicitacaoAlimentacaoContextProvider,
  EscolaSimplesContextProvider,
]);

export const GlobalContext = ({ children }) => {
  return <Providers>{children}</Providers>;
};
