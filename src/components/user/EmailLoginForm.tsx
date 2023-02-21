import { FormEvent, useState } from "react";
import {
  auth,
  loginEmailPassword,
  registerEmailPassword,
} from "../../firebase";
import { fetchSignInMethodsForEmail } from "firebase/auth";

const EmailLoginForm = () => {
  const [loginCredentials, updateLoginCredentials] = useState({
    email: "",
    password: "",
  });

  async function checkInUser(e: FormEvent) {
    e.preventDefault();
    const signInMethods = await fetchSignInMethodsForEmail(
      auth,
      loginCredentials.email
    );
    if (signInMethods.length === 0) {
      registerEmailPassword(loginCredentials.email, loginCredentials.password);
    } else if (signInMethods.includes("password")){
        loginEmailPassword(loginCredentials.email, loginCredentials.password);
    } else {
        alert("You already signed up with a different provider.");
    }
  }

  return (
    <form className="login--form" onSubmit={(e) => checkInUser(e)}>
      <input
        type="email"
        placeholder="E-Mail"
        className="popup--input"
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
        placeholder="Password"
        className="popup--input"
        value={loginCredentials.password}
        onChange={(e) =>
          updateLoginCredentials({
            ...loginCredentials,
            password: e.target.value,
          })
        }
      />
      <button type="submit" className="popup--button">Login / Register</button>
    </form>
  );
};

export default EmailLoginForm;
