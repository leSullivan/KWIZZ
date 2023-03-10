import { FormEvent, useState } from "react";
import {
  loginEmailPassword,
} from "../../firebase";

const EmailLoginForm = (props: { email: string; setAuthOptions: (option: "none" | "login" | "register") => void }) => {
  const [password, setPassword] = useState("");
  const [result, setResult] = useState<string | null>(null);

  async function signInUser(e: FormEvent) {
    e.preventDefault();
    if (props.email === "" || password === "") {
      return;
    }
    const success = await loginEmailPassword(props.email, password);
    // if success then setAuthOptions("none")
    //error handling
  }

  return (
    <form onSubmit={(e) => signInUser(e)}>
      <input
        type="password"
        placeholder="Password"
        className="popup--input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="popup--button">
        Login
      </button>
    </form>
  );
};

export default EmailLoginForm;
