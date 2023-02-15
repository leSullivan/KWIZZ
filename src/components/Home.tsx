import logo from "../assets/logo.svg";
import "./home.css"

interface StartScreenProps {
  startGame: () => void;
}

export default function StartScreen(props: StartScreenProps) {
  //parameter für API abgfragen

  return (
    <div className="start--screen">
      <img src={logo} alt="logo" className="start--screen-logo" />
      <form>
        <h1>kwizz</h1>
        <p>How many questions can you answer correctly?</p>
        <input type="number" placeholder="Number of questions" />
        <input type="number" placeholder="Number of questions" />
        <button onClick={props.startGame}>Start Game</button>
      </form>
    </div>
  );
}
