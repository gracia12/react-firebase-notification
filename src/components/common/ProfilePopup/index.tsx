import { FC, useMemo, useState } from "react";
import { onLogout } from "../../../api/AuthAPI";
import { getCurrentUser } from "../../../api/FirestoreAPI";
import Button from "../Button";
import "./index.scss";

interface User {
  name: string;
  headline: string;
}

const ProfilePopup: FC = () => {
  const [currentUser, setCurrentUser] = useState<User>({ name: "", headline: "" });
  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  return (
    <div className="popup-card">
      <p className="name">{currentUser?.name}</p>
      <p className="headline">{currentUser?.headline}</p>
      <Button title="Log out" onClick={onLogout} />
    </div>
  );
}

export default ProfilePopup;