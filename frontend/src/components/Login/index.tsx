"use client";

import { useAuth0 } from "@auth0/auth0-react";
import Button from "../ui/Button";

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="size-full flex-1">
      <Button size="md" className="w-full" onClick={() => loginWithRedirect()}>
        Login
      </Button>
    </div>
  );
};

export default Login;
