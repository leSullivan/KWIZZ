import { FormEvent, useState } from "react";
import {
  auth,
  loginEmailPassword,
  registerEmailPassword,
} from "../../firebase";
import { fetchSignInMethodsForEmail } from "firebase/auth";

// const EmailLoginForm = () => {
//   const [loginCredentials, updateLoginCredentials] = useState({
//     email: "",
//     password: "",
//   });
//   const [result, setResult] = useState<string | null>(null);

//   async function checkInUser(e: FormEvent) {
//     e.preventDefault();
//     if(loginCredentials.email === ""){
//       return;
//     }
//     const signInMethods = await fetchSignInMethodsForEmail(
//       auth,
//       loginCredentials.email
//     );
//     if (signInMethods.length === 0) {
//       registerEmailPassword(loginCredentials.email, loginCredentials.password);
//     } else if (signInMethods.includes("password")){
//         const success =  loginEmailPassword(loginCredentials.email, loginCredentials.password);
//         if(success === "auth/wrong-password"){
//           setResult("Wrong password. Please try again.");
//         }
//     } else {
//         alert("You already signed up with a different provider.");
//     }
//   }

//   return (
//     <form className="login--form" onSubmit={(e) => checkInUser(e)}>
//       <input
//         type="email"
//         placeholder="E-Mail"
//         className="popup--input"
//         value={loginCredentials.email}
//         onChange={(e) =>
//           updateLoginCredentials({
//             ...loginCredentials,
//             email: e.target.value,
//           })
//         }
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         className="popup--input"
//         value={loginCredentials.password}
//         onChange={(e) =>
//           updateLoginCredentials({
//             ...loginCredentials,
//             password: e.target.value,
//           })
//         }
//       />
//       <button type="submit" className="popup--button">Login / Register</button>
//     </form>
//   );
// };

const EmailLoginForm = (props: { email: string }) => {
  const [password, setPassword] = useState("");
  const [result, setResult] = useState<string | null>(null);

  async function signInUser(e: FormEvent) {
    e.preventDefault();
    if (props.email === "" || password === "") {
      return;
    }
    const success = await loginEmailPassword(props.email, password);
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
