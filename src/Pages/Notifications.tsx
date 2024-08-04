import React, { useEffect, useState } from "react";
import NotificationComponent from "../components/NotificationComponent";
import useFetchNotifications from "../Hooks/useNotifications";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../firebaseConfig";
import Loader from "../components/common/Loader";

export default function Notifications({ currentUser }) {
  const { notifications } = useFetchNotifications();
  const location = useLocation();
  const isNotifEmpty = location?.state?.isRead;

  if (isNotifEmpty === 0)
    return <h1 className="no-notification">No New Notifications</h1>;

  return (
    <div>
      <div className="post-status-main">
        {notifications.map((notification) => (
          <div key={notification.id}>
            <NotificationComponent notification={notification} />
          </div>
        ))}
      </div>
    </div>
  );
}
