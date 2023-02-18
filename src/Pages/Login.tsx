import { useState } from "react";
import "./Login.css";
import googleLogo from "../assets/logo_google.svg";
import kwizzLogo from "../assets/logo.svg";

interface LoginProps {
  trigger: boolean;
  setLoginTrigger: (trigger: boolean) => void;
}

const Login = (props: LoginProps) => {
  const [loginCredentials, updateLoginCredentials] = useState({
    email: "",
    password: "",
  });

  return props.trigger ? (
    <div className="popup">
      <div className="popup--inner">
        <button
          className="close-btn"
          onClick={() => props.setLoginTrigger(false)}
        >
          X
        </button>
        <img src={kwizzLogo} alt="kwizz logo" className="popup-header--logo" />

        <h2 style={{ textAlign: "left" }}>become a kwizz master</h2>
        <p style={{ textAlign: "left" }}>
          Create an account to save your progess and collect achievements
        </p>
        <form className="login--form">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="email"
            value={loginCredentials.email}
            onChange={(e) =>
              updateLoginCredentials({
                ...loginCredentials,
                email: e.target.value,
              })
            }
          />
          <input
            type="password"
            placeholder="password"
            value={loginCredentials.password}
            onChange={(e) =>
              updateLoginCredentials({
                ...loginCredentials,
                password: e.target.value,
              })
            }
          />
          <button type="submit">Log In</button>
        </form>
        <div className="login--external">
          <img src={googleLogo} alt="google logo" className="auth-logo" />
          Continue with Google
          <div />
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Login;
