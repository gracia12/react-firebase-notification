import { useEffect, useState, useContext } from "react";
import { FirestoreContext } from "../Contexts/FirestoreContext";
import { getNotifications } from "../api/FirestoreAPI";

export default function useFetchNotifications() {
  const { currentUser } = useContext(FirestoreContext)

  const [notifications, setNotifications] = useState([]);
  const [isError, setError] = useState(false);

  const fetchNotifications = async () => {
    try {
      if (currentUser?.id) {
        getNotifications(currentUser?.id, setNotifications);
      }
    } catch (err) {
      console.log(err, "error");
      setError(true);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [currentUser?.id]);

  return { notifications };

}
