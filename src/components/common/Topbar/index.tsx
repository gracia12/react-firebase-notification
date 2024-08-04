import React, { FC, useEffect, useState } from "react";
import {
  AiOutlineHome,
  AiOutlineUserSwitch,
  AiOutlineBell,
} from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";
import { getAllUsers } from "../../../api/FirestoreAPI";
import ProfilePopup from "../ProfilePopup";
import useFetchNotifications from "../../../Hooks/useNotifications";

import "./index.scss";

interface TopbarProps {
  currentUser: {
    id: string;
    email: string;
    imageLink: string;
  };
}

const Topbar: FC<TopbarProps> = ({ currentUser }) => {
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [users, setUsers] = useState<any[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { notifications } = useFetchNotifications();

  const isRead: boolean[] = notifications
    .filter((item) => item.isRead === false)
    .map((notif) => notif.isRead);

  const goToRoute = (route: string) => {
    navigate(route);
  };

  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };

  useEffect(() => {
    getAllUsers(setUsers);
  }, []);

  return (
    <div className="topbar-main">
      {popupVisible ? (
        <div className="popup-position">
          <ProfilePopup />
        </div>
      ) : (
        <></>
      )}

      <div className="react-icons">
        <AiOutlineHome
          size={30}
          className="react-icon"
          onClick={() => goToRoute("/home")}
        />
        <AiOutlineUserSwitch
          size={30}
          className="react-icon"
          onClick={() => goToRoute("/connections")}
        />
        <AiOutlineBell
          size={30}
          className={`notification-icon react-icon ${
            location.pathname === "/notifications" ? "filled" : ""
          }`}
          onClick={() =>
            navigate("/notifications", {
              state: {
                isRead: isRead.length,
              },
            })
          }
        />
        {isRead.length ? (
          <div className="active-notifications">{isRead.length}</div>
        ) : (
          <></>
        )}
      </div>
      <img
        className="user-logo"
        src={currentUser?.imageLink}
        alt="user"
        onClick={displayPopup}
      />
    </div>
  );
};

export default Topbar;
