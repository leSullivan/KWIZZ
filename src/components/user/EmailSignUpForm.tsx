import { FormEvent, useState } from "react";
import {
  registerEmailPassword
} from "../../firebase";

const EmailSignUpForm = (props: { email: string; setAuthOptions: (option: "none" | "login" | "register") => void }) => {
  const [registerData, setRegisterData] = useState({password: "", repeatPassword: "", match: true});
  const [result, setResult] = useState<string | null>(null);

  async function signUpUser(e: FormEvent) {
    e.preventDefault();
    registerData.password !== registerData.repeatPassword?
      setRegisterData( prev => ({...prev, match: false})):
      setRegisterData( prev => ({...prev, match: true}));
    
    if (props.email === "" || registerData.password === "" || registerData.match === false) {
      return;
    }
    const success = await registerEmailPassword(props.email, registerData.password);
    // if success then setAuthOptions("none")
    //error handling
  }

  return (
    <form onSubmit={(e) => signUpUser(e)}>
      <input
        type="password"
        placeholder="Password"
        className="popup--input"
        value={registerData.password}
        onChange={(e) => setRegisterData(prev => ({...prev, password: e.target.value}))}
      />
      <input
        type="password"
        placeholder="Repeat Password"
        className="popup--input"
        value={registerData.repeatPassword}
        onChange={(e) => setRegisterData(prev => ({...prev, repeatPassword: e.target.value}))}
      />
      {registerData.match ? null : <p>Passwords do not match.</p>}
      <button type="submit" className="popup--button">
        Register
      </button>
    </form>
  );
};

export default EmailSignUpForm;
