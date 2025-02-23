"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const HomePage = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    // TODO: check user signin
    if (isAuthenticated) {
      router.push("/decks");
    } else {
      router.push("/login");
    }
  }, []);

  return null;
};

export default HomePage;
