import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom"; 
import "./home.css"

export default function StartScreen() {
  //parameter für API abgfragen

  const navigate = useNavigate(); 

  return (
    <div className="start--screen">
      <img src={logo} alt="logo" className="start--screen-logo" />
      <form>
        <p>How many questions can you answer correctly?</p>
        <button onClick={() => navigate('/game')}>Start Game</button>
      </form>
    </div>
  );
}
