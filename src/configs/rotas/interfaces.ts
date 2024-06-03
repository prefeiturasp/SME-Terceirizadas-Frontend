import React from "react";

export interface RotaInterface {
  path: string;
  component: () => React.JSX.Element;
  tipoUsuario: boolean;
  exact?: boolean;
}
