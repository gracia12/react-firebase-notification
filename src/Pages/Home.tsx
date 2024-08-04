import React, { useEffect, useState } from "react";
import HomeComponent from "../components/HomeComponent";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import Loader from "../components/common/Loader";

interface HomeProps {
  currentUser: any; // Replace 'any' with the appropriate type for currentUser
}

const Home: React.FC<HomeProps> = ({ currentUser }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (res) => {
      if (!res?.accessToken) {
        navigate("/");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [navigate]);

  return loading ? <Loader /> : <HomeComponent currentUser={currentUser} />;
};

export default Home;
