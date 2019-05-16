import decode from "jwt-decode";
import CONFIG from "../constants/config.constants";

const TOKEN_ALIAS = "TOKEN";

const login = async (email, password) => {
  try {
    const response = await fetch(CONFIG.JWT_AUTH, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
    const json = await response.json();
    const isValid = isValidResponse(json);
    if (isValid) {
      localStorage.setItem(TOKEN_ALIAS, json.token);
      window.location.href = "/";
    }
    return isValid;
  } catch (error) {
    return error;
  }
};

const logout = () => {
  localStorage.removeItem(TOKEN_ALIAS);
  window.location.reload();
};

const getToken = () => {
  let token = localStorage.getItem(TOKEN_ALIAS);
  if (token) {
    if (isTokenExpired(token)) logout();
    if (needsToRefreshToken(token)) {
      refreshToken(token).then(json => {
        if (isValidResponse(json))
          localStorage.setItem(TOKEN_ALIAS, json.token);
      });
      token = localStorage.getItem(TOKEN_ALIAS);
    }
    return token;
  } else {
    logout();
  }
};

const isLoggedIn = () => {
  const token = localStorage.getItem(TOKEN_ALIAS);
  if (token) {
    return true;
  }
  return false;
};

const isValidResponse = json => {
  const isValid = json.token.length >= 203 ? true : false;
  return isValid;
};

const refreshToken = async token => {
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

const needsToRefreshToken = token => {
  const secondsLeft = calculateTokenSecondsLeft(token);
  if (secondsLeft < CONFIG.REFRESH_TOKEN_TIMEOUT) {
    return true;
  } else return false;
};

const isTokenExpired = token => {
  try {
    const secondsLeft = calculateTokenSecondsLeft(token);
    if (secondsLeft <= 0) {
      return true;
    } else return false;
  } catch (err) {
    console.log("Falha ao verificar token expirado");
    return true;
  }
};

const calculateTokenSecondsLeft = token => {
  const decoded = decode(token);
  const dateToken = new Date(decoded.exp * 1000);
  const dateVerify = new Date(Date.now());
  const secondsLeft = (dateToken - dateVerify) / 1000;
  return secondsLeft;
};

export const authService = {
  login,
  logout,
  getToken,
  isLoggedIn
};
