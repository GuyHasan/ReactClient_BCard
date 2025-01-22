import { useContext } from "react";
import { authContext } from "../App";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ThemeContext } from "../ThemeProvider";

function Footer() {
	const { theme, toggleTheme } = useContext(ThemeContext);
	const { userLoggedIn } = useContext(authContext);
	const { token } = useContext(authContext);
	const isBusiness = token ? jwtDecode(token).isBusiness : false;
	return (
		<>
			<footer className={`text-center p-2 d-flex justify-content-center align-items-center gap-5 ${theme === "dark" ? "bg-dark text-white" : "bg-light text-black"}`}>
				<Link to='/about' className={`d-flex flex-column text-decoration-none ${theme === "dark" ? "text-white" : "text-dark"}`}>
					<i className='fa-solid fa-circle-info'></i>
					<p className='m-0'>About</p>
				</Link>
				{userLoggedIn && (
					<Link to='cards/favorites' className={`d-flex flex-column text-decoration-none ${theme === "dark" ? "text-white" : "text-dark"}`}>
						<i className='fa-solid fa-heart'></i>
						<p className='m-0'>Favorites</p>
					</Link>
				)}
				{userLoggedIn && isBusiness && (
					<Link to='cards/my-cards' className={`d-flex flex-column text-decoration-none ${theme === "dark" ? "text-white" : "text-dark"}`}>
						<i className='fa-regular fa-id-card'></i>
						<p className='m-0'>My Cards</p>
					</Link>
				)}
			</footer>
		</>
	);
}

export default Footer;
