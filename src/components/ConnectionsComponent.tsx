import React, { FC, useEffect, useState } from "react";
import { getAllUsers, addConnection } from "../api/FirestoreAPI";
import ConnectedUsers from "./common/ConnectedUsers";
import "../Sass/ConnectionsComponent.scss";

interface User {
  id: string;
  name: string;
  // Add any other properties here
}

interface ConnectionsComponentProps {
  currentUser: User;
}

const ConnectionsComponent: FC<ConnectionsComponentProps> = ({ currentUser }) => {
  const [users, setUsers] = useState<User[]>([]);
  
  const getCurrentUser = (id: string): void => {
    addConnection(currentUser.id, id);
  };
  
  useEffect(() => {
    getAllUsers(setUsers);
  }, []);

  return users.length > 1 ? (
    <div className="connections-main">
      {users.map((user) => {
        return user.id === currentUser.id ? (
          <React.Fragment key={user.id}></React.Fragment>
        ) : (
          <ConnectedUsers
            currentUser={currentUser}
            user={user}
            getCurrentUser={getCurrentUser}
            key={user.id}
          />
        );
      })}
    </div>
  ) : (
    <div className="connections-main">No Connections to Add!</div>
  );
}

export default ConnectionsComponent;