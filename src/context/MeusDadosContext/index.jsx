import React, { createContext, useState } from "react";

const DEFAULT_VALUE_MEUS_DADOS = {
  meusDados: undefined,
  setMeusDados: () => undefined,
};

const MeusDadosContext = createContext(DEFAULT_VALUE_MEUS_DADOS);

const MeusDadosContextProvider = ({ children }) => {
  const [meusDados, setMeusDados] = useState();
  return (
    <MeusDadosContext.Provider value={{ meusDados, setMeusDados }}>
      {children}
    </MeusDadosContext.Provider>
  );
};

export { MeusDadosContextProvider };
export default MeusDadosContext;
