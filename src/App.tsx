import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import GameScreen from "./components/game/GameScreen";
import Navbar from "./components/Navbar";
import PageNotFound from "./Pages/NotFound";

import blob1 from "./assets/blob1.svg";
import blob2 from "./assets/blob2.svg";

function App() {
  return (
    //navbar??
    //später route zum GameScreen
    <Router>
      <Navbar />
      <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<GameScreen />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        {/* <img src={blob1} className="blob1" alt="blob" /> */}
        {/* <img src={blob2} className="blob2" alt="blob" /> */}
      </main>
      </Router>
    
  );
}

export default App;
