import { GET_KITS, GET_QTD_ALUNOS } from "../constants/tourRequest.constants";
import {
  getKitsByApi,
  getQuatidadeAlunoApi
} from "../services/tourRequest.service";

export const getKits = () => ({
  type: GET_KITS,
  payload: getKitsByApi()
});

export const getQuantidadeAlunos = () => ({
  type: GET_QTD_ALUNOS,
  payload: getQuatidadeAlunoApi()
});
