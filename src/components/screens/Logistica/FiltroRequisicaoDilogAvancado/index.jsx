import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const FORM_NAME = "buscaRequisicoesDilogAvancado";

// const initialState = {
//   dados: {},
//   status: [
//     { key: 1, value: "Todos" },
//     { key: 2, value: "Aguardando envio" },
//     { key: 3, value: "Enviada" },
//     { key: 4, value: "Cancelada" },
//     { key: 5, value: "Confirmada" },
//     { key: 6, value: "Em análise" }
//   ]
// };

// function reducer(state, { type: actionType, payload }) {
//   switch (actionType) {
//     case "atualizarFiltro": {
//       if (!payload.searchText.length) {
//         return { ...state, [payload.filtro]: [] };
//       }
//       const reg = new RegExp(payload.searchText, "i");
//       const filtrado = state.dados[payload.filtro].filter(el => reg.test(el));
//       return { ...state, [payload.filtro]: filtrado };
//     }

//     case "resetar":
//       return { ...initialState, dados: state.dados };
//     default:
//       // eslint-disable-next-line no-console
//       console.error("Invalid action type: ", actionType);
//   }
// }

const FiltroRequisicaoDilogAvancado = () => {
  return <div>djkskjsldljksjklfsdfsd</div>;
};

const mapStateToProps = state => {
  return {
    initialValues: state.finalForm[FORM_NAME]
  };
};

export default withRouter(
  connect(mapStateToProps)(FiltroRequisicaoDilogAvancado)
);
