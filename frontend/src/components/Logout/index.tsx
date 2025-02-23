"use client";

import { useAuth0 } from "@auth0/auth0-react";
import Button, { ButtonProps } from "../ui/Button";

const Logout = ({ className, ...props }: ButtonProps) => {
  const { logout } = useAuth0();

  return (
    <Button size="md" className={className} onClick={() => logout()} {...props}>
      Log Out
    </Button>
  );
};

export default Logout;
