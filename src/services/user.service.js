import { JWT_AUTH } from "../constants/config.constants";

const login = async (email, password) => {
  try {
    const response = await fetch(JWT_AUTH, {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
      headers: { "Content-Type": "application/json" }
    });
    const json = await response.json();
    console.log("resp", json);
    let resp = validResponse(json);
    // localStorage.setItem('user', JSON.stringify(json));
    return resp;
  } catch (error) {
    console.log(error)
    return error;
  }
};

function validResponse(json) {
  let key = Object.keys(json);
  let value = Object.values(json);

  if (key[0] === "token" && value[0].length >= 208) {
    localStorage.setItem("user", JSON.stringify(json));
    return json;
  } else {
    window.location.href = "/login";
    return null;
  }
}

function logout() {
  localStorage.removeItem("user");
  window.location.reload();
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      if (response.status === 401) {
        logout();
        // location.reload();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
export const userService = {
  login,
  logout
};
