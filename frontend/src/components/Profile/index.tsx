"use client";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import React from "react";
import Login from "@/components/Login";
import Logout from "../Logout";

const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
      return <div>Loading ...</div>;
    }

    if (!isAuthenticated) {
    return (
        <div className="flex gap-2 px-2">
          <p>Not logged in.</p>
          <Login />
        </div>
    );
    }

    return (
      <div className="flex gap-2 px-2">
          <div className="flex flex-col">
            <p>{user?.name}</p>
            <p>{user?.email}</p>
          </div>
          <Logout />
      </div>
    );
  };
  
  export default Profile;