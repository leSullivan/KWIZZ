import { FormEvent, useState } from "react";
import { resetPassword } from "../../firebase";

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");

  async function requestNewPassword(e:FormEvent ,email: string) {
    e.preventDefault();
    let success:string = await resetPassword(email);
    if(success === "success"){
      setEmail("");
      alert("We sent you an email to reset your password. Please check your inbox. 🙌🏼");
    }else if(success === "auth/user-not-found"){
      alert("We couldn't find a user with that email. Please try again.");
    }
  }

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
      

    </>
  );
}

export default ForgotPasswordForm;
