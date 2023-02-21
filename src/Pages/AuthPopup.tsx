import { useState } from "react";
import "./AuthPopup.css";
import kwizzLogo from "../assets/logo.svg";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthWithExternalProvider from "../components/user/AuthWithExternalProvider";
import EmailLoginForm from "../components/user/EmailLoginForm";
import CloseIcon from "../assets/close.png";
import BackIcon from "../assets/back.png";
import ForgotPasswordForm from "../components/user/ForgotPasswordForm";

interface LoginProps {
  trigger: boolean;
  setLoginTrigger: (trigger: boolean) => void;
}

const AuthPopup = (props: LoginProps) => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const [resetEmail, setResetEmail] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (user) props.setLoginTrigger(false);
  }, [user, loading]);

  return props.trigger ? (
    <div className="popup">
      <div className="popup--inner">
        <div className="popup--navigation">
          {resetEmail ? (
            <img
              src={BackIcon}
              className="popup--back"
              onClick={() => setResetEmail(false)}
            />
          ) : (
            <div />
          )}
          <img
            src={kwizzLogo}
            alt="kwizz logo"
            className="popup-header--logo"
          />
          <img
            src={CloseIcon}
            className="popup--close"
            onClick={() => props.setLoginTrigger(false)}
          />
        </div>
        {resetEmail ? (
          <ForgotPasswordForm />
        ) : (
          <>
            <h2 className="popup--header">Greetings fellow kwizzmaster</h2>
            <p style={{ textAlign: "left", marginBottom: "1rem" }}>
              Pleaser enter your email and password to login or register.
            </p>
            <EmailLoginForm />
            <AuthWithExternalProvider />
            <p
              onClick={() => setResetEmail(true)}
              className="popup--link"
            >
              Forgot your password?
            </p>
          </>
        )}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default AuthPopup;
