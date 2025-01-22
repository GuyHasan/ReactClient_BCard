import "./App.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import About from "./components/About";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";
import AllCards from "./components/AllCards";
import FavoriteCards from "./components/FavoriteCards";
import MyCards from "./components/MyCards";
import Footer from "./components/Footer";
import Home from "./components/Home";
import BusinessPage from "./components/BusinessPage";
import CreateCardModal from "./components/CreateCardModal";

import { createContext } from "react";
import { useEffect, useState } from "react";

import { ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./ThemeProvider";

export const authContext = createContext();
export const cardContext = createContext();
export const userContext = createContext();

function App() {
	const [themeForToast, setThemeForToast] = useState("light");
	const [themeChanged, setThemeChanged] = useState(false);
	const [token, setToken] = useState(null);
	const [loading, setLoading] = useState(true);
	const [cardsChanged, setCardsChanged] = useState(false);
	const [userChanged, setUserChanged] = useState(false);
	const [userLoggedIn, setUserLoggedIn] = useState(false);
	const [showAddCard, setShowAddCard] = useState(false);

	let isBusiness = token ? jwtDecode(token).isBusiness : false;

	useEffect(() => {
		if (sessionStorage.getItem("token")) {
			setUserLoggedIn(true);
		}
	}, []);
	useEffect(() => {
		if (userLoggedIn) {
			setToken(sessionStorage.getItem("token"));
		} else {
			setToken(null);
		}
	}, [userLoggedIn]);
	useEffect(() => {
		setThemeForToast(localStorage.getItem("theme"));
	}, [themeChanged]);

	return (
		<>
			<ThemeProvider>
				<cardContext.Provider value={{ cardsChanged, setCardsChanged, loading, setLoading }}>
					<authContext.Provider value={{ token, setToken, userLoggedIn, setUserLoggedIn }}>
						<userContext.Provider value={{ userChanged, setUserChanged }}>
							<Router>
								<Navbar setThemeChanged={setThemeChanged} />
								<Routes>
									<Route path='/' element={<Home />} />
									<Route path='/cards'>
										<Route path='' element={<AllCards />} />
										<Route path=':id' element={<BusinessPage />} />
										<Route path='my-cards' element={<MyCards />} />
										<Route path='favorites' element={<FavoriteCards />} />
									</Route>
									<Route path='/about' element={<About />} />
									<Route path='/login' element={<Login />} />
									<Route path='/signup' element={<Register />} />
									<Route path='/profile' element={<Profile />} />
									<Route path='*' element={<NotFound />} />
								</Routes>
								<Footer />
							</Router>
						</userContext.Provider>
					</authContext.Provider>
					{userLoggedIn && isBusiness && (
						<button className='btn btn-primary position-fixed shadow addCardButton' onClick={() => setShowAddCard(true)}>
							Add
						</button>
					)}
					<CreateCardModal show={showAddCard} setShow={setShowAddCard} />
					<ToastContainer theme={themeForToast} />
				</cardContext.Provider>
			</ThemeProvider>
		</>
	);
}

export default App;
