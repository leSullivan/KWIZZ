import googleLogo from "../../assets/logo_google.svg";
import { auth, loginGoogle } from "../../firebase";

function AuthWithExternalProvider() {
  return (
    <>
      <div className="login--spacer">
        <hr />
        or
        <hr />
      </div>
      <button className="btn--login-external" onClick={loginGoogle}>
        <img src={googleLogo} alt="google logo" className="auth-logo" />
        Continue with Google
      </button>
    </>
  );
}

export default AuthWithExternalProvider;
