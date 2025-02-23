"use client";

import { useAuth0 } from "@auth0/auth0-react";
import Button, { ButtonProps } from "../ui/Button";

const Login = ({ ...props }: ButtonProps) => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      size="md"
      className="w-full"
      onClick={() => loginWithRedirect()}
      {...props}
    >
      Login
    </Button>
  );
};

export default Login;
