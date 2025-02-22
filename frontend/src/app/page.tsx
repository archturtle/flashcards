"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    // TODO: check user signin
    const isSignedIn = true;
    if (isSignedIn) {
      router.push("/decks");
    } else {
      router.push("/login");
    }
  }, []);

  return null;
};

export default HomePage;
