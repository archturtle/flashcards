import axios from "axios";

const axinst = axios.create({
  baseURL: "http://localhost:8080",
});

export const setAuthTokenInterceptor = (
  getAccessTokenSilently: () => Promise<string>,
) => {
  axinst.interceptors.request.use(
    async (config) => {
      try {
        const token = await getAccessTokenSilently();
        if (token) {
          // console.log(token)
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Error getting Auth0 token:", error);
      }
      return config;
    },
    (error) => Promise.reject(error),
  );
};

export default axinst;
