import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom"; 
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import "./home.css"

export default function StartScreen() {
  //parameter für API abgfragen

  const navigate = useNavigate(); 
  const [user, loading, error] = useAuthState(auth);

  return (
    <div className="home">
      <div className='home--content'>
        <img src={logo} alt="logo" className="home--logo" />
        <div className="home--options">
          {user && <p>Welcome back, {user.displayName}!</p>}
          <p>How many questions can you answer correctly?</p>
          <button onClick={() => navigate('/game')}>Start Game</button>
        </div>
      </div>
    </div>
  );
}
