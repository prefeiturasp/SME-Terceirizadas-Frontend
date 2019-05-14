import CONFIG from "../constants/config.constants";

const getToken = () => {
  return "JWT  ....";
};

export const getEmailConfiguration = async () => {
  try {
    const response = await fetch(`${CONFIG.API_URL}/email/1/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken
      }
    });
    const json = await response.json();
    return json;
  } catch (err) {
    return console.log(`Error: ${err}`);
  }
};

export const setEmailConfiguration = async () => {
  const response = await fetch(`${CONFIG.API_URL}/email/1/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken
    },
    body: JSON.stringify({ password: "123123123" })
  });
  const json = await response.json();
  return json;
};
