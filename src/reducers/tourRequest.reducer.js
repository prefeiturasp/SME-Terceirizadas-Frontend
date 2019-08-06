import { GET_KITS, GET_QTD_ALUNOS } from "../constants/tourRequest.constants";

const INITIAL_STATE = {
  kitEnum: [],
  qtdAluno: {}
};

export const tourRequestReducer = (state = INITIAL_STATE, action) => {
  switch (action) {
    case GET_KITS:
      return { ...state, kitEnum: action.payload };
    case GET_QTD_ALUNOS:
      return { ...state, qtdAluno: action.payload };
    default:
      return state;
  }
};
