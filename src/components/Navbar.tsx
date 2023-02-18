import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { logout } from "../firebase";
import { useAuthState} from "react-firebase-hooks/auth";
import { auth } from "../firebase";


interface NavbarProps {
  setLoginTrigger: (trigger: boolean) => void;
}
  const Navbar = (props:NavbarProps) => {

  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  return (
    <nav>
      <h2 onClick={() => navigate("/")} className="navbar--title"> kwizz. </h2>
      {user ? <button onClick={logout} className="nav--button">Log Out</button>
      : <button onClick={()=>props.setLoginTrigger(true)} className="nav--button">Log In</button>} 
    </nav>
  );
};

export default Navbar;
