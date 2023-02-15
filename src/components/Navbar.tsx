import "./navbar.css"
import logo from "../assets/navLogo.svg";


const Navbar = () => {
    return(
        
        <nav>
            <h2> kwizz </h2>
            <ul>
                <li>Home</li>
                <li>Leaderboard</li>
            </ul>
            <button>Log In</button>

            {/* <div className="userAccount">{userName}</div>  user: ? btn*/}
        </nav>
    )
};

export default Navbar;