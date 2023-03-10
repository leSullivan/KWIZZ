import "./AuthPopup.css";
import kwizzLogo from "../assets/logo.svg";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import AuthWithExternalProvider from "../components/user/AuthWithExternalProvider";
import EmailLoginForm from "../components/user/EmailLoginForm";
import EmailSignUpForm from "../components/user/EmailSignUpForm";
import CloseIcon from "../assets/close.png";
import BackIcon from "../assets/back.png";
import ForgotPasswordForm from "../components/user/ForgotPasswordForm";
import { FormEvent, useState, useEffect } from "react";
import { auth } from "../firebase";
import { fetchSignInMethodsForEmail } from "firebase/auth";

interface LoginProps {
  trigger: boolean;
  setLoginTrigger: (trigger: boolean) => void;
}

const AuthPopup = (props: LoginProps) => {
  const [user, loading, error] = useAuthState(auth);
  const [resetEmail, setResetEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [authOptions, setAuthOptions] = useState<"none" | "login" | "register">(
    "none"
  );

  useEffect(() => {
    if (loading) return;
    if (user) props.setLoginTrigger(false);
  }, [user, loading]);

  async function checkAuthOptions(e: FormEvent) {
    e.preventDefault();
    if (email === "") {
      return;
    }
    const signInMethods = await fetchSignInMethodsForEmail(auth, email);
    if (signInMethods.length === 0) {
      setAuthOptions("register");
    } else if (signInMethods.includes("password")) {
      setAuthOptions("login");
    } else {
      alert(
        `You already signed up with ${signInMethods[0]}. Please use that provider to login.`
      );
    }
  }

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
          <ForgotPasswordForm setAuthOptions={setAuthOptions} />
        ) : (
          <>
            <h2 className="popup--header">Greetings fellow kwizzmaster</h2>
            <p style={{ textAlign: "left", marginBottom: "1rem" }}>
              Pleaser enter your email to login or register.
            </p>
            <form className="login--form" onSubmit={checkAuthOptions}>
              <input
                type="email"
                placeholder="E-Mail"
                className="popup--input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {authOptions === "none" && (
                <button type="submit" className="popup--button">
                  Continue
                </button>
              )}
            </form>
            {authOptions === "login" && (
              <EmailLoginForm email={email} setAuthOptions={setAuthOptions} />
            )}
            {authOptions === "register" && (
              <EmailSignUpForm email={email} setAuthOptions={setAuthOptions} />
            )}
            <AuthWithExternalProvider />
            <p onClick={() => setResetEmail(true)} className="popup--link">
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
