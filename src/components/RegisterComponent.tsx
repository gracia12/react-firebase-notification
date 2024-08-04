import { FC, useState } from "react";
import { RegisterAPI } from "../api/AuthAPI";
import { postUserData } from "../api/FirestoreAPI";
import { useNavigate } from "react-router-dom";
import { getUniqueID } from "../helpers/getUniqueId";
import { toast } from "react-toastify";

interface Credentials {
  name: string;
  email: string;
  password: string;
}

const RegisterComponent: FC = () => {
  const navigate = useNavigate();
  const [credentails, setCredentials] = useState<Credentials>({ name: "", email: "", password: "" });

  const register = async () => {
    try {
      const res = await RegisterAPI(credentails.email, credentails.password, credentails.name);
      toast.success("Account Created!");
      postUserData({
        userID: getUniqueID(),
        name: credentails.name,
        email: credentails.email,
        imageLink:
          "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
      });
      navigate("/home");
      localStorage.setItem("userEmail", res.user.email);
    } catch (err) {
      console.log(err);
      toast.error("Cannot Create your Account");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-wrapper-inner">
        <h1 className="heading">Sign UP</h1>

        <div className="auth-inputs">
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, name: event.target.value })
            }
            type="text"
            className="common-input"
            placeholder="Your Name"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, email: event.target.value })
            }
            type="email"
            className="common-input"
            placeholder="Email or phone number"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, password: event.target.value })
            }
            type="password"
            className="common-input"
            placeholder="Password (6 or more characters)"
          />
        </div>
        <button onClick={register} className="login-btn">
          Sign Up
        </button>
      </div>
      <hr className="hr-text" data-content="or" />
      <div className="signup-btn-container">
        <p className="go-to-signup">
          Already Account?{" "}
          <span className="join-now" onClick={() => navigate("/")}>
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterComponent;
