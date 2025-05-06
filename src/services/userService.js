import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { errorMessage } from "./messageServices";
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export const userLogin = async (email, password) => {
	try {
		let data = JSON.stringify({
			email: email,
			password: password,
		});

		let config = {
			method: "post",
			maxBodyLength: Infinity,
			url: `${apiUrl}/users/login`,
			headers: {
				"Content-Type": "application/json",
			},
			data: data,
		};
		let response = await axios(config);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const getUser = async (token) => {
	try {
		let id = jwtDecode(token)._id;
		let config = {
			method: "get",
			maxBodyLength: Infinity,
			url: `${apiUrl}/users/${id}`,
			headers: {
				"x-auth-token": token,
			},
		};
		let response = await axios(config);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const registerUser = async (user) => {
	try {
		let data = JSON.stringify(user);
		let config = {
			method: "post",
			maxBodyLength: Infinity,
			url: `${apiUrl}/users`,
			headers: {
				"Content-Type": "application/json",
			},
			data: data,
		};
		let response = await axios(config);
		return response.data;
	} catch (error) {
		errorMessage(error.response.data);
	}
};

export const updateUser = async (user) => {
	try {
		let token = sessionStorage.getItem("token");
		let data = JSON.stringify(user);
		let id = jwtDecode(token)._id;
		let config = {
			method: "put",
			maxBodyLength: Infinity,
			url: `${apiUrl}/users/${id}`,
			headers: {
				"x-auth-token": token,
				"Content-Type": "application/json",
			},
			data: data,
		};
		let response = await axios(config);
		return response.data;
	} catch (error) {
		if (error.status === 400) {
			errorMessage("Bad Request, Please check your input");
		}
		console.log(error);
	}
};
