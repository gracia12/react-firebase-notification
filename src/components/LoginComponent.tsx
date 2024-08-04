import { FC, useState } from "react";
import { LoginAPI } from "../api/AuthAPI";
import { useNavigate } from "react-router-dom";
import "../Sass/LoginComponent.scss";
import { toast } from "react-toastify";

interface Credentials {
  email: string;
  password: string;
}

const LoginComponent: FC = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<Credentials>({ email: "", password: "" });

  const login = async () => {
    try {
      const res = await LoginAPI(credentials.email, credentials.password);
      toast.success("Signed In to Successfully!");
      localStorage.setItem("userEmail", res.user.email);
      navigate("/home");
    } catch (err) {
      console.log(err);
      toast.error("Please Check your Credentials");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-wrapper-inner">
        <h1 className="heading">Sign in</h1>
        <div className="auth-inputs">
          <input
            onChange={(event) =>
              setCredentials({ ...credentials, email: event.target.value })
            }
            type="email"
            className="common-input"
            placeholder="Email or Phone"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentials, password: event.target.value })
            }
            type="password"
            className="common-input"
            placeholder="Password"
          />
        </div>
        <button onClick={login} className="login-btn">
          Sign in
        </button>
      </div>
      <hr className="hr-text" data-content="or" />
      <div className="signup-btn-container">
        <p className="go-to-signup">
          <span className="join-now" onClick={() => navigate("/register")}>
            Join now
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginComponent;
