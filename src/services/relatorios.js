import { API_URL } from "../constants/config.constants";

export const getDetalheKitLancheUnificado = uuid => {
  const url = `${API_URL}/relatorio-kit-lanche-unificado?uuid=${uuid}`;
  return url;
};
