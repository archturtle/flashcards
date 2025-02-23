"use client";

import { useEffect, useState } from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { ReactNode } from "react";
import AuthProviderSetup from "@/components/authProviderSetup";

interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <Auth0Provider
      domain="flashcards-bh11.us.auth0.com"
      clientId="nNCxQ3oJI9VhMzukmhHLij2rhiB46IIx"
      authorizationParams={{ 
				redirect_uri: window.location.origin + "/decks",
				audience: "https://flashcards-bh11.us.auth0.com/api/v2/",
				// scope: "openid profile email"
			}}
    >
      <AuthProviderSetup />
      {children}
    </Auth0Provider>
  );
}

export default AuthProvider;
