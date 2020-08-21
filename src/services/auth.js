import decode from "jwt-decode";
import CONFIG from "../constants/config";
import { toastError } from "../components/Shareable/Toast/dialogs";

export const TOKEN_ALIAS = "TOKEN";

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

      await fetch(`${CONFIG.API_URL}/usuarios/atualizar-cargo/`, {
        method: "GET",
        headers: {
          Authorization: `JWT ${json.token}`,
          "Content-Type": "application/json"
        }
      });

      await fetch(`${CONFIG.API_URL}/usuarios/meus-dados/`, {
        method: "GET",
        headers: {
          Authorization: `JWT ${json.token}`,
          "Content-Type": "application/json"
        }
      }).then(result => {
        const response = result.json();
        response.then(result => {
          localStorage.setItem(
            "tipo_perfil",
            JSON.stringify(result.tipo_usuario)
          );
          localStorage.setItem(
            "perfil",
            JSON.stringify(result.vinculo_atual.perfil.nome)
          );
          window.location.href = "/";
        });
      });
    } else {
      toastError("Login e/ou senha inválidos");
    }
    return isValid;
  } catch (error) {
    return false;
  }
};

const logout = () => {
  localStorage.removeItem(TOKEN_ALIAS);
  window.location.href = "/login";
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
  try {
    const decoded = decode(json.token);
    const test2 =
      decoded.user_id !== undefined &&
      decoded.username !== undefined &&
      decoded.exp !== undefined &&
      decoded.email !== undefined;
    const test1 = json.token.length >= 203 ? true : false;
    return test1 && test2;
  } catch (error) {
    return false;
  }
};

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

const needsToRefreshToken = token => {
  const secondsLeft = calculateTokenSecondsLeft(token);
  if (secondsLeft < CONFIG.REFRESH_TOKEN_TIMEOUT) {
    return true;
  } else return false;
};

export const isTokenExpired = token => {
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

export const calculateTokenSecondsLeft = token => {
  const decoded = decode(token);
  const dateToken = new Date(decoded.exp * 1000);
  const dateVerify = new Date(Date.now());
  const secondsLeft = (dateToken - dateVerify) / 1000;
  return secondsLeft;
};

const authService = {
  login,
  logout,
  getToken,
  isLoggedIn,
  isValidResponse
};

export default authService;
