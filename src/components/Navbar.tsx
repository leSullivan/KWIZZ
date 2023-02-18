import "./navbar.css";
import logo from "../assets/navLogo.svg";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  setLoginTrigger: (trigger: boolean) => void;
}
  const Navbar = (props:NavbarProps) => {
  const navigate = useNavigate();

  return (
    <nav>
      {/* <ul>
                <li>Home</li>
                <li>Leaderboard</li>
            </ul> */}
      <div className="spacer" />
      <h2 onClick={() => navigate("/")} className="navbar--title"> kwizz. </h2>
      <button onClick={()=>props.setLoginTrigger(true)}>Log In</button>

      {/* <div className="userAccount">{userName}</div>  user: ? btn*/}
    </nav>
  );
};

export default Navbar;
