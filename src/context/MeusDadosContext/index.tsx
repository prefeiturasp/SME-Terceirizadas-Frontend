import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { MeusDadosInterface } from "./interfaces";

export type StateMeusDadosType = {
  meusDados: MeusDadosInterface;
  setMeusDados: Dispatch<SetStateAction<MeusDadosInterface>>;
};

export const MeusDadosContext = createContext<StateMeusDadosType>({
  meusDados: undefined,
  setMeusDados: () => {},
});

type ContextProviderType = {
  children?: ReactNode;
};

const MeusDadosContextProvider = ({ children }: ContextProviderType) => {
  const [meusDados, setMeusDados] = useState<MeusDadosInterface>();
  return (
    <MeusDadosContext.Provider value={{ meusDados, setMeusDados }}>
      {children}
    </MeusDadosContext.Provider>
  );
};

export { MeusDadosContextProvider };
export default MeusDadosContext;
