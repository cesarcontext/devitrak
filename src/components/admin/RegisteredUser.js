import React from "react";
import { useAdminStore } from "../../hooks/useAdminStore";

export const RegisteredUser = () => {

    const { startLoadingUser, userRegitered } = useAdminStore()

    console.log('start loading users', userRegitered )
  return (
    <div>
      <ul className="list-group list-group-flush">
        {}
        <li className="list-group-item">An item</li>
        <li className="list-group-item">A second item</li>
        <li className="list-group-item">A third item</li>
        <li className="list-group-item">A fourth item</li>
        <li className="list-group-item">And a fifth one</li>
      </ul>
    </div>
  );
};

/**
 *
 */
