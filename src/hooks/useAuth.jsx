import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = (route) => {
	const token = sessionStorage.getItem("token");
	const navigate = useNavigate();

	useEffect(() => {
		if (!token) {
			navigate("/login");
		} else {
			let { isBusiness } = jwtDecode(token);
			if (route === "my-cards" && !isBusiness) {
				navigate("/");
			}
		}
	}, [token]);

	return token;
};

export default useAuth;
