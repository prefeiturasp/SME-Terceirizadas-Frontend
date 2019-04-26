import { JWT_AUTH } from "../constants/config.constants";

export const TOKEN_ALIAS = "userToken";

const login = async (email, password) => {
  try {
    const response = await fetch(JWT_AUTH, {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
    const json = await response.json();
    return validResponse(json);
  } catch (error) {
    return error;
  }
};

function validResponse(json) {
  let key = Object.keys(json);
  let value = Object.values(json);
  if (key[0] === "token" && value[0].length >= 203) {
    localStorage.setItem(TOKEN_ALIAS, json.token);
    window.location.href = "/";
    return json;
  } else {
    return null;
  }
}

function logout() {
  localStorage.removeItem(TOKEN_ALIAS);
  window.location.reload();
}

export const userService = {
  login,
  logout
};
