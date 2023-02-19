import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from "./firebase";
import {User as FirebasUser} from "firebase/auth";
import Home from "./Pages/Home";
import GameScreen from "./Pages/GameScreen";
import Navbar from "./components/Navbar";
import PageNotFound from "./Pages/NotFound";
import Footer from "./components/Footer";
import Login from "./Pages/Login";

import blob1 from "./assets/blob1.svg";
import blob2 from "./assets/blob2.svg";

function App() {
  const [loginTrigger, setLoginTrigger] = useState(false);
  const [user , setUser] = useState<FirebasUser| null>(null);
  
  return (
    <Router>
      <Navbar setLoginTrigger={setLoginTrigger}/> 
      <Login trigger={loginTrigger} setLoginTrigger={setLoginTrigger} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<GameScreen />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        {/* <img src={blob1} className="blob1" alt="blob" /> */}
        {/* <img src={blob2} className="blob2" alt="blob" /> */}
      </main>
      <Footer />
    </Router>
  );
}

export default App;
