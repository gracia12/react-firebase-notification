import { FC, useState, useEffect } from "react";
import "../Sass/NotificationComponent.scss";
import { formatTime } from "../helpers/formatTime";
import { getUserByID, readNotifications } from "../api/FirestoreAPI";

interface Notification {
  id: string;
  senderUserEmail: string;
  type: string;
  timestamp: number;
  isRead: boolean;
}

interface Profile {
  name: string;
  imageLink: string;
}

interface NotificationComponentProps {
  notification: Notification;
}

const NotificationComponent: FC<NotificationComponentProps> = ({ notification }) => {
  const [currentProfile, setCurrentProfile] = useState<Profile[]>([]);

  useEffect(() => {
    getUserByID(notification.senderUserEmail, setCurrentProfile);
  }, []);

  const { name, imageLink } = currentProfile[0] ?? { name: '', imageLink: '' };

  const readNotification = (id: string) => {
    readNotifications(id);
  }

  return (
    <>
      {!notification?.isRead ? (
        <div
          onClick={() => readNotification(notification.id)}
          className="posts-card"
          key={notification.id}
        >
          <div className="post-image-wrapper">
            <img
              className="profile-image"
              loading="lazy"
              src={imageLink}
            />
            <div>
              {notification.type === 'like' && (
                <p className="headline">{name} liked your Post.</p>
              )}
              {notification.type === 'comment' && (
                <p className="headline">{name} commented on your Post.</p>
              )}
              <p className="timestamp">{formatTime(notification.timestamp)}</p>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default NotificationComponent;
