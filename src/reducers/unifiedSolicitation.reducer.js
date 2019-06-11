const LOAD_UNIFIED_SOLICITATION = "LOAD_UNIFIED_SOLICITATION";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case LOAD_UNIFIED_SOLICITATION:
      if (action.data != null)
        action.data.escolas.forEach(function(escola) {
          action.data[`school_${escola.id}`] = escola;
        });
      return {
        data: {
          ...action.data
        }
      };
    default:
      return state;
  }
}

export const loadUnifiedSolicitation = data => dispatch =>
  dispatch({ type: LOAD_UNIFIED_SOLICITATION, data });
