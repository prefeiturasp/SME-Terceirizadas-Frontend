const LOAD_ALUNOS_POR_FAIXA_ETARIA = "LOAD_ALUNOS_POR_FAIXA_ETARIA";
const SET_TOTAL_ALUNOS_SELECIONADOS = "SET_TOTAL_ALUNOS_SELECIONADOS"

export default function reducer(state = {}, action) {
  let totalAlunosCei = 0
  switch (action.type) {
    case LOAD_ALUNOS_POR_FAIXA_ETARIA:
      console.log('LOAD_ALUNOS_POR_FAIXA_ETARIA.action.data', action.data)
      return Object.assign({}, state, {
        alunosPorFaixaEtaria: action.data,
      });
    case SET_TOTAL_ALUNOS_SELECIONADOS:
      console.log('SET_TOTAL_ALUNOS_SELECIONADOS.action.data', action.data)
      return Object.assign({}, state, {
        totalAlunosSelecionadosCei: action.data
      })
    default:
      return state;
  }
}
