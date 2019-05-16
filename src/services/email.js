import CONFIG from "../constants/config.constants";
import { authService } from "./auth";

const authData = ()=>{
  return `JWT ${authService.getToken()}`
}

export const getEmailConfiguration = async () => {
  try {
    const response = await fetch(`${CONFIG.API_URL}/email/1/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authData()
      }
    });
    const json = await response.json();
    return json;
  } catch (err) {
    return console.log(`getEmailConfigurationError: ${err}`);
  }
};

export const setEmailConfiguration = async values => {
  try {
    const response = await fetch(`${CONFIG.API_URL}/email/1/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: authData()
      },
      body: JSON.stringify(values)
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(`setEmailConfigurationError ${error}`);
  }
};

export const testEmailConfiguration = async to_email => {
  try {
    const response = await fetch(`${CONFIG.API_URL}/email-test/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authData()
      },
      body: JSON.stringify({ to_email: to_email })
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(`testEmailConfigurationError ${error}`);
  }
};
