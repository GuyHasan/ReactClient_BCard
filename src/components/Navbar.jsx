import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../App";
import { jwtDecode } from "jwt-decode";
import { successMessage } from "../services/messageServices";
import { ThemeContext } from "../ThemeProvider";
import SearchBar from "./SearchBar";

function Navbar() {
	const { theme, toggleTheme } = useContext(ThemeContext);
	let { userLoggedIn } = useContext(authContext);
	let { setUserLoggedIn } = useContext(authContext);
	let { token } = useContext(authContext);
	let isBusiness = token ? jwtDecode(token).isBusiness : false;

	const navigate = useNavigate();

	const handleLogout = () => {
		sessionStorage.removeItem("token");
		setUserLoggedIn(false);
		navigate("/");
		successMessage("Logged out successfully");
	};

	return (
		<>
			<nav className={`navbar navbar-expand-lg ${theme === "light" ? "navbar-light bg-light" : "navbar-dark bg-dark"} px-5`}>
				<div className='container-fluid'>
					<NavLink className='navbar-brand' to='/'>
						<i className='fa-solid fa-building'></i> BCard <span style={{ fontSize: "0.75rem", display: "block", transform: "translateY(-5px)" }}>Businesses Social Network</span>
					</NavLink>
					<button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
						<span className='navbar-toggler-icon'></span>
					</button>
					<div className='collapse navbar-collapse' id='navbarSupportedContent'>
						<ul className='navbar-nav me-auto mb-2 mb-lg-0'>
							<li className='nav-item'>
								<NavLink className='nav-link active' to='/about'>
									About
								</NavLink>
							</li>
							{userLoggedIn && (
								<li className='nav-item'>
									<NavLink className='nav-link active' to='/cards/favorites'>
										Favorites
									</NavLink>
								</li>
							)}
							{userLoggedIn && isBusiness && (
								<li className='nav-item'>
									<NavLink className='nav-link active' to='/cards/my-cards'>
										My Cards
									</NavLink>
								</li>
							)}
						</ul>
						<div className='d-flex mb-1'>
							<SearchBar />
							<div className='d-flex align-items-center mx-2 darkModeToggle' onClick={() => toggleTheme()} style={{ cursor: "pointer" }}>
								{theme === "dark" ? <i className='fa-solid fa-sun'></i> : <i className='fa-regular fa-moon'></i>}
							</div>
						</div>
						{userLoggedIn ? (
							<>
								<ul className='navbar-nav  mb-2 mb-lg-0'>
									<li className='nav-item'>
										<NavLink className='nav-link active' to='/profile'>
											Profile
										</NavLink>
									</li>
								</ul>
								<button onClick={handleLogout} className='btn text-decoration-none p-0'>
									Logout
								</button>
							</>
						) : (
							<ul className='navbar-nav  mb-2 mb-lg-0'>
								<li className='nav-item'>
									<NavLink className='nav-link active' to='/signup'>
										Signup
									</NavLink>
								</li>
								<li className='nav-item'>
									<NavLink className='nav-link active' to='/login'>
										Login
									</NavLink>
								</li>
							</ul>
						)}
					</div>
				</div>
			</nav>
		</>
	);
}

export default Navbar;
