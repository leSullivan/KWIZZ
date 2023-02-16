import { useState } from "react";
import "./Login.css"

const Login = () => {
  const [loginCredentials, updateLoginCredentials] = useState({
    email: "",
    password: "",
  });

  return (
    <div style={{textAlign: 'center'}}>
      <h2>become a kwizz master</h2>
      <p>Create an account to save your progess and collect achievements</p>
      <form className="login--form">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="email"
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
          placeholder="password"
          value={loginCredentials.password}
          onChange={(e) =>
            updateLoginCredentials({
              ...loginCredentials,
              password: e.target.value,
            })
          }
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
