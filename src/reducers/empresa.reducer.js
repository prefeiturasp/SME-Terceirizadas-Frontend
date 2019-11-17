const LOAD_EMPRESA = "LOAD_EMPRESA";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case LOAD_EMPRESA:
      return {
        data: {
          ...action.data
        }
      };
    default:
      return state;
  }
}

export const loadEmpresa = data => dispatch =>
  dispatch({ type: LOAD_EMPRESA, data });
