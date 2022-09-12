import React from "react";

export const userInfoEmailCheck = ({ user }) => {

  const { email } = user

  return (
    <div>
      <div>{email}</div>
    </div>
  );
};
