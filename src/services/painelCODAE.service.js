import { API_URL } from "../constants/config.constants";
import authService from "./auth";

const authToken = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json"
};

export const getSolicitacoesAprovadosCodae = async () => {
  const url = `${API_URL}/codae-solicitacoes/aprovados/`;

  const OBJ_REQUEST = {
    headers: authToken,
    method: "GET"
  };
  try {
    const result = await fetch(url, OBJ_REQUEST);
    const json = await result.json();
    return json.results;
  } catch (error) {}
};

// export const getSolicitacoesAutorizadasPelaDRE = (dreUuid) => {
//   const url = `${API_URL}/diretorias-regionais/${dreUuid}/solicitacoes-autorizadas-por-mim/`;

//   const OBJ_REQUEST = {
//     headers: authToken,
//     method: "GET"
//   };
//   return fetch(url, OBJ_REQUEST)
//     .then(result => {
//       return result.json();
//     })
//     .catch(error => {
//       console.log(error);
//     });
// };

// export const getSolicitacoesPendentesParaDRE = (dreUuid) => {
//   const url = `${API_URL}/diretorias-regionais/${dreUuid}/solicitacoes-pendentes-para-mim/`;

//   const OBJ_REQUEST = {
//     headers: authToken,
//     method: "GET"
//   };
//   return fetch(url, OBJ_REQUEST)
//     .then(result => {
//       return result.json();
//     })
//     .catch(error => {
//       console.log(error);
//     });
// };
