import decode from "jwt-decode";
import CONFIG from "../constants/config.constants";

const TOKEN_ALIAS = "TOKEN";

const login = async (email, password) => {
  try {
    const response = await fetch(CONFIG.JWT_AUTH, {
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

export const refreshToken = async token => {
  try {
    const response = await fetch(`${CONFIG.API_URL}/api-token-refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ token })
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(`refreshToken ${error}`);
  }
};

function logout() {
  localStorage.removeItem(TOKEN_ALIAS);
  window.location.reload();
}

export const isLoggedIn = () => {
  if (localStorage.getItem(TOKEN_ALIAS)) {
    return true;
  }
  return false;
};

export const needsToRefreshToken = token => {
  //TODO: verificar essa func para ver se esta correta.
  const decoded = decode(token);
  const secondsLeft = new Date(decoded.exp) - new Date(Date.now() / 1000);
  if (secondsLeft < CONFIG.REFRESH_TOKEN_TIMEOUT) {
    return true;
  } else return false;
};

export const isTokenExpired = token => {
  try {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      return true;
    } else return false;
  } catch (err) {
    console.log("Falha ao verificar token expirado");
    return false;
  }
};

export const getToken = () => {
  let token = localStorage.getItem(TOKEN_ALIAS);
  if (token) {
    if (isTokenExpired(token)) logout();
    if (needsToRefreshToken(token)) {
      refreshToken(token).then(json => {
        localStorage.setItem(TOKEN_ALIAS, json.token);
      });
      token = localStorage.getItem(TOKEN_ALIAS);
    }
    return token;
  } else {
    logout();
  }
};

export const userService = {
  login,
  logout
};
