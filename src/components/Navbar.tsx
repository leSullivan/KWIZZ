import "./navbar.css";
import logo from "../assets/navLogo.svg";
import { useNavigate } from "react-router-dom";

  const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav>
      {/* <ul>
                <li>Home</li>
                <li>Leaderboard</li>
            </ul> */}
      <div className="spacer" />
      <h2 onClick={() => navigate("/")} className="navbar--title"> kwizz. </h2>
      <button onClick={()=>navigate('/login')}>Log In</button>

      {/* <div className="userAccount">{userName}</div>  user: ? btn*/}
    </nav>
  );
};

export default Navbar;
