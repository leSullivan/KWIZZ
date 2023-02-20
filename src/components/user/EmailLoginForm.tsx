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
    if (signInMethods.length !== 0) {
      loginEmailPassword(loginCredentials.email, loginCredentials.password);
    } else {
      registerEmailPassword(loginCredentials.email, loginCredentials.password);
    }
  }

  return (
    <form className="login--form" onSubmit={(e) => checkInUser(e)}>
      <input
        type="email"
        placeholder="E-Mail"
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
        value={loginCredentials.password}
        onChange={(e) =>
          updateLoginCredentials({
            ...loginCredentials,
            password: e.target.value,
          })
        }
      />
      <button type="submit">Login / Register</button>
    </form>
  );
};

export default EmailLoginForm;
