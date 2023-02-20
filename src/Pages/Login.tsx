import { FormEvent, useState } from "react";
import "./Login.css";
import kwizzLogo from "../assets/logo.svg";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthWithExternalProvider from "../components/user/AuthWithExternalProvider";
import EmailLoginForm from "../components/user/EmailLoginForm";

interface LoginProps {
  trigger: boolean;
  setLoginTrigger: (trigger: boolean) => void;
}

const Login = (props: LoginProps) => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) return;
    if (user) props.setLoginTrigger(false);
  }, [user, loading]);

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

        <h2 className="popup--header">Greetings fellow kwizzmaster</h2>
        <p style={{ textAlign: "left", marginBottom: "1rem" }}>
          Pleaser enter your email and password to login or register.
        </p>
        <EmailLoginForm />
        <AuthWithExternalProvider />
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Login;
