import { FC, useEffect, useState } from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { getConnections } from "../../../api/FirestoreAPI";

interface User {
  id: string;
  imageLink: string;
  name: string;
  headline: string;
}

interface ConnectedUsersProps {
  user: User;
  getCurrentUser: (id: string) => void;
  currentUser: { id: string };
}

const ConnectedUsers: FC<ConnectedUsersProps> = ({ user, getCurrentUser, currentUser }) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  useEffect(() => {
    getConnections(currentUser.id, user.id, setIsConnected);
  }, [currentUser.id, user.id]);

  return isConnected ? (
    <></>
  ) : (
    <div className="grid-child">
      <img src={user.imageLink} alt="User" />
      <p className="name">{user.name}</p>
      <p className="headline">{user.headline}</p>

      <button onClick={() => getCurrentUser(user.id)}>
        <AiOutlineUsergroupAdd size={20} />
        Connect
      </button>
    </div>
  );
}

export default ConnectedUsers;