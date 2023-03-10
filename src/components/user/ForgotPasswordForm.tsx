import { FormEvent, useState } from "react";
import { resetPassword } from "../../firebase";
import {
  auth,
  loginEmailPassword,
  registerEmailPassword,
} from "../../firebase";
import { fetchSignInMethodsForEmail } from "firebase/auth";

function ForgotPasswordForm(props: {setAuthOptions: (option: "none" | "login" | "register") => void }) {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<string | null>(null);

  async function requestNewPassword(e:FormEvent ,email: string) {
    e.preventDefault();
    let success:string = await resetPassword(email);
    if(success === "success"){
      setEmail("");
      setResult("We sent you an email to reset your password. Please check your inbox. 🙌🏼");
    }else if(success === "auth/user-not-found"){
      setResult("We couldn't find a user with that email. Please try again.");
    }
  }
  props.setAuthOptions("none")
  return (
    <>
      <h2 className="popup--header">Need a hint?</h2>
      <p style={{ textAlign: "left", marginBottom: "1rem" }}>
        Please enter your email address and we will send you a link to reset
        your password.
      </p>
      <form onSubmit={(e) => requestNewPassword(e, email)}>
      <input
        type="email"
        value={email}
        className="popup--input"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="popup--button">Reset Password</button>
      </form>
      {result && <p>{result}</p>}

    </>
  );
}

export default ForgotPasswordForm;
