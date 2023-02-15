import { useState, useEffect } from "react";
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";

import blob1 from "./assets/blob1.svg";
import blob2 from "./assets/blob2.svg";

function App() {
  const [started, startGame] = useState(false);

  return (
    //navbar??
    <main>
      <img src={blob1} className="blob1" alt="blob" />
      {started ? (
        <GameScreen changeSettings={() => startGame(false)}/>
      ) : (
        <StartScreen startGame={() => startGame(true)} />
      )}
      <img src={blob2} className="blob2" alt="blob" />
    </main>
  );
}

export default App;
