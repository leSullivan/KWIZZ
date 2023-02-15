import { useState, useEffect } from "react";
import Home from "./components/Home";
import GameScreen from "./components/game/GameScreen";
import Navbar from "./components/Navbar";

import blob1 from "./assets/blob1.svg";
import blob2 from "./assets/blob2.svg";

function App() {
  const [started, startGame] = useState(false);

  return (
    //navbar??
    //später route zum GameScreen
    <div className="App">
      <Navbar />
      <main>
        <img src={blob1} className="blob1" alt="blob" />
        {started ? (
          <GameScreen changeSettings={() => startGame(false)}/>
        ) : (
          <Home startGame={() => startGame(true)} />
        )}
        <img src={blob2} className="blob2" alt="blob" />
      </main>
    </div>
    
  );
}

export default App;
