"use client";

import { Auth0Provider } from "@auth0/auth0-react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  return <Auth0Provider 
    domain="flashcards-bh11.us.auth0.com"
    clientId="nNCxQ3oJI9VhMzukmhHLij2rhiB46IIx"
    authorizationParams={{
        redirect_uri: window.location.origin
  }}>{children}</Auth0Provider>;
};

export default AuthProvider;
