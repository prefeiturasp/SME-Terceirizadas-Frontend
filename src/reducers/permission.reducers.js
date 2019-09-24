import { GET_PERMS } from "../constants/permission.constants";

const INITIAL_STATE = {
  perms: []
};

export const permissionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PERMS:
      return { ...state, perms: action.payload };

    default:
      return state;
  }
};
