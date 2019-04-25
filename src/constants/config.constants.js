let API_URL = process.env.REACT_APP_API_URL;
let JWT_AUTH = process.env.REACT_APP_JWT_AUTH;
let USER_URL = process.env.REACT_APP_USER_URL;
let API_MOCK = process.env.REACT_APP_API_MOCK;

if (process.env.NODE_ENV === "production") {
  // This way we can pass params to static files. see Dockerfile.
  // when build default env is production
  API_URL = "API_URL_REPLACE_ME";
  JWT_AUTH = "JWT_AUTH_REPLACE_ME";
  USER_URL = "USER_URL_REPLACE_ME";
  API_MOCK = "API_MOCK_REPLACE_ME";
}

module.exports = {
  API_URL: API_URL,
  JWT_AUTH: JWT_AUTH,
  USER_URL: USER_URL,
  API_MOCK: API_MOCK
};
