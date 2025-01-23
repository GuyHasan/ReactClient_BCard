import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = (route) => {
	const token = sessionStorage.getItem("token");
	const isBusiness = token ? jwtDecode(token).isBusiness : false;
	const navigate = useNavigate();
	useEffect(() => {
		if (!token) {
			if (route === "my-cards" || route === "profile" || route === "favorites") {
				navigate("/login");
			}
		} else {
			if (route === "login" || route === "signup") {
				navigate("/");
			} else if (route === "my-cards" && !isBusiness) {
				navigate("/");
			}
		}
	}, [token]);

	return token;
};

export default useAuth;
