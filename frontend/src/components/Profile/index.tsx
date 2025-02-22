"use client";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import React from "react";
import Login from "@/components/Login";

const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
      return <div>Loading ...</div>;
    }

    if (!isAuthenticated) {
    return (
        <div>
        <p>Not authenticated</p>
        <Login />
        </div>
    );
    }

    return (
      <div>
          <img src={user?.picture} alt={user?.name} />
          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
      </div>
    );
  };
  
  export default Profile;