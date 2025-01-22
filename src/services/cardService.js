import axios from "axios";
import { errorMessage } from "./messageServices";

export const getAllCards = async () => {
	let config = {
		method: "get",
		maxBodyLength: Infinity,
		url: "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
		headers: {},
	};
	try {
		const response = await axios.request(config);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const getCardById = async (id) => {
	try {
		let config = {
			method: "get",
			maxBodyLength: Infinity,
			url: `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
			headers: {},
		};
		const response = await axios.request(config);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const getMyCards = async (token) => {
	try {
		let token = sessionStorage.getItem("token");
		let config = {
			method: "get",
			maxBodyLength: Infinity,
			url: "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards",
			headers: {
				"x-auth-token": token,
			},
		};
		const response = await axios.request(config);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const getFavoriteCards = async (userId) => {
	try {
		const allCards = await getAllCards();
		const favoriteCards = allCards.filter((card) => card.likes.includes(userId));
		return favoriteCards;
	} catch (error) {
		console.log(error);
	}
};

export const createCard = async (card) => {
	try {
		let token = sessionStorage.getItem("token");
		let data = JSON.stringify(card);
		let config = {
			method: "post",
			maxBodyLength: Infinity,
			url: "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
			headers: {
				"Content-Type": "application/json",
				"x-auth-token": token,
			},
			data: data,
		};
		const response = await axios.request(config);
		return response.data;
	} catch (error) {
		if (error.response.status === 401) {
			errorMessage("Unauthorized, Please login to create a card");
		} else if (error.response.status === 400) {
			errorMessage("Bad Request, Please check your input");
		} else {
			errorMessage("Card creation failed");
		}
		console.log(error);
	}
};

export const likeCard = async (cardId) => {
	try {
		let token = sessionStorage.getItem("token");
		let config = {
			method: "patch",
			maxBodyLength: Infinity,
			url: `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`,
			headers: {
				"x-auth-token": token,
			},
		};
		const response = await axios.request(config);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const updateCard = async (card, cardId) => {
	try {
		let token = sessionStorage.getItem("token");
		let data = JSON.stringify(card);
		let config = {
			method: "put",
			maxBodyLength: Infinity,
			url: `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`,
			headers: {
				"Content-Type": "application/json",
				"x-auth-token": token,
			},
			data: data,
		};
		const response = await axios.request(config);
		return response.data;
	} catch (error) {
		if (error.response.status === 401) {
			errorMessage("Unauthorized, Please login to edit a card");
		} else if (error.response.status === 400) {
			errorMessage("Bad Request, Please check your input");
		} else {
			errorMessage("Card update failed");
		}
		console.log(error);
	}
};

export const deleteCard = async (cardId) => {
	try {
		let token = sessionStorage.getItem("token");
		let config = {
			method: "delete",
			maxBodyLength: Infinity,
			url: `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`,
			headers: {
				"x-auth-token": token,
			},
		};
		const response = await axios.request(config);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const refreshCards = async (cardsType) => {
	switch (cardsType) {
		case "all":
			return await getAllCards();
		case "my":
			return await getMyCards();
		case "favorite":
			return await getFavoriteCards();
		default:
			return [];
	}
};
