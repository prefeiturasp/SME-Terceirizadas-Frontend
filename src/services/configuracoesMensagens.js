import CONFIG from "../constants/config.constants";
import authService from "./auth";

const authHeader = {
  "Content-Type": "application/json",
  Authorization: `JWT ${authService.getToken()}`
};

export const getTemplatesMensagem = async () => {
  try {
    const response = await fetch(`${CONFIG.API_URL}/templates-mensagem/`, {
      method: "GET",
      headers: authHeader
    });
    const json = await response.json();
    return json;
  } catch (err) {
    return console.log(`getEmailConfigurationError: ${err}`);
  }
};
