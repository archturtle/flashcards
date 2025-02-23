import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { setAuthTokenInterceptor } from "../utils/axiosInstance";

export default function AuthProviderSetup() {
    const { getAccessTokenSilently } = useAuth0();
  
    useEffect(() => {
      setAuthTokenInterceptor(getAccessTokenSilently);
    }, [getAccessTokenSilently]);
  
    return null;
  }