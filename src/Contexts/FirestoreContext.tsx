import { createContext, useEffect, useState, ReactNode } from "react";
import { firestore } from "../firebaseConfig";
import { collection, onSnapshot, query, where, DocumentData, QuerySnapshot } from "firebase/firestore";

interface User {
  id: string;
  email: string;
  // Add other properties as needed
}

interface FirestoreContextType {
  currentUser: User;
}

export const FirestoreContext = createContext<FirestoreContextType>({ currentUser: {} });

interface FirestoreProviderProps {
  children: ReactNode;
}

const FirestoreProvider = ({ children }: FirestoreProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User>({ id: "", email: "" });
  const userCollection = collection(firestore, "users");
  const currentEmail: string | null = localStorage.getItem("userEmail");

  const getCurrentUser = async () => {
    const currentUserQuery = query(
      userCollection,
      where("email", "==", currentEmail)
    );
    onSnapshot(currentUserQuery, (response: QuerySnapshot<DocumentData>) => {
      setCurrentUser(
        response.docs.map((docs) => {
          return { ...docs.data(), id: docs.id } as User;
        })[0]
      );
    });
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <FirestoreContext.Provider value={{ currentUser }}>
      {children}
    </FirestoreContext.Provider>
  );
};

export default FirestoreProvider;
