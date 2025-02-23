"use client";
import Login from "@/components/Login";
import { useAuth0 } from "@auth0/auth0-react";
import Logout from "../Logout";
import { ButtonProps } from "../ui/Button";

const Profile = ({ ...props }: ButtonProps) => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const ButtonComponent = isAuthenticated ? Logout : Login;
  return (
    <div className="flex gap-3 items-center">
      {user && (
        <span className="hidden sm:block text-text-base/50">{user.name}</span>
      )}
      <ButtonComponent {...props} />
    </div>
  );
};

export default Profile;
