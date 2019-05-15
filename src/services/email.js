import CONFIG from "../constants/config.constants";

const getToken = () => {
  return "JWT  eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6Im1tYWlhLmNjQGdtYWlsLmNvbSIsImV4cCI6MTU1Nzk5NDkxNiwiZW1haWwiOiJtbWFpYS5jY0BnbWFpbC5jb20ifQ.Ca4YOM2o4SeWvVrfFFHZ5GtMdVmRCkEoS91B6s2Zmpo";
};

export const getEmailConfiguration = async () => {
  try {
    const response = await fetch(`${CONFIG.API_URL}/email/1/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken()
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
        Authorization: getToken()
      },
      body: JSON.stringify(values)
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(`setEmailConfigurationError ${error}`);
  }
};
