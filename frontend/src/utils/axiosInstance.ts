import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const axinst = axios.create({
    baseURL: "http://localhost:8080"
});

axinst.interceptors.request.use(
    async (config) => {
        try {
            const {getAccessTokenSilently} = useAuth0();
            const token = await getAccessTokenSilently()
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error("Error getting Auth0 token:", error)
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
);

export default axinst;
