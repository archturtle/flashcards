"use client";

import { useAuth0 } from "@auth0/auth0-react";
import Button from "../ui/Button";

const Logout = () => {
  const { logout } = useAuth0();

  return (
    <div className="size-full flex-1">
      <Button size="md" className="w-full" onClick={() => logout({ logoutParams: { returnTo: window.location.origin + "/decks" } })}>
        Log Out
      </Button>
    </div>
  );
};

export default Logout;
