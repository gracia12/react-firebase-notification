import React, { useMemo, useState } from "react";
import Notifications from "../Pages/Notifications";
import { getCurrentUser } from "../api/FirestoreAPI";
import Topbar from "../components/common/Topbar";

export default function NotificationLayout() {
  const [currentUser, setCurrentUser] = useState({});

  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  return (
    <div>
      <Topbar currentUser={currentUser} />
      <Notifications currentUser={currentUser} />
    </div>
  );
}
