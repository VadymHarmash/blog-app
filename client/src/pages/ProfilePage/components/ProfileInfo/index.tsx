import React from "react";
import { useAppSelector } from "../../../../hooks/redux";

export const ProfileInfo: React.FC = () => {

  const { user } = useAppSelector((state) => state.userReducer);

  if (!user) return null;

  return (
    <div className="container">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <p>Posts: 0</p>
      <button>Add post</button>
    </div>
  );
};
