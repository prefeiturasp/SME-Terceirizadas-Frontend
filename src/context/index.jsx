import React from "react";
import { BuildProviderTree } from "./helpers";

import { CentralDeDownloadContextProvider } from "./CentralDeDownloads";
import { EscolaSimplesContextProvider } from "./EscolaSimplesContext";
import { MeusDadosContextProvider } from "./MeusDadosContext";
import { SolicitacaoAlimentacaoContextProvider } from "./SolicitacaoAlimentacao";
import { TemaContextProvider } from "./TemaContext";

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
