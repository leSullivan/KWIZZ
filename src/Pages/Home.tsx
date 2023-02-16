import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom"; 
import "./home.css"

export default function StartScreen() {
  //parameter für API abgfragen

  const navigate = useNavigate(); 

  return (
    <div className="home">
      <div className='home--content'>
        <img src={logo} alt="logo" className="home--logo" />
        <div className="home--options">
          <p>How many questions can you answer correctly?</p>
          <button onClick={() => navigate('/game')}>Start Game</button>
        </div>
      </div>
    </div>
  );
}
