import axios from "axios";
export const api = axios.create({
  baseURL: "https://amazon-api.sellead.com/",
});

axios.interceptors.response.use(
  function (response) {
    if (response.data) {
      // return success
      if (response.status === 200 || response.status === 201) {
        return response;
      }
      // reject errors & warnings
      return Promise.reject(response);
    }

    // default fallback
    return Promise.reject(response);
  },
  function (error) {
    // if the server throws an error (404, 500 etc.)
    return Promise.reject(error);
  }
);
