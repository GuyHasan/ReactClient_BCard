import { useContext, useEffect, useState } from "react";
import { authContext, cardContext } from "../App";
import { getFavoriteCards } from "../services/cardService";
import { jwtDecode } from "jwt-decode";
import { ShowCards } from "./ShowCards";
import useAuth from "../hooks/useAuth";
import { Spinner } from "react-bootstrap";

function FavoriteCards() {
	const isAuthenticated = useAuth("favorites");
	if (!isAuthenticated) return null;

	let { cardsChanged, loading, setLoading } = useContext(cardContext);
	let [favoriteCards, setFavoriteCards] = useState([]);
	let [hasFetched, setHasFetched] = useState(false);
	let token = sessionStorage.getItem("token");
	let userId = token ? jwtDecode(token)._id : null;

	const fetchFavoriteCards = async () => {
		try {
			setLoading(true);
			let favoriteCardsData = await getFavoriteCards(userId);
			setFavoriteCards(favoriteCardsData);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
			setHasFetched(true);
		}
	};
	useEffect(() => {
		fetchFavoriteCards();
	}, []);

	const updateFavoriteCardsFetch = async () => {
		let updatedFavoriteCards = await getFavoriteCards(userId);
		setFavoriteCards(updatedFavoriteCards);
	};
	useEffect(() => {
		updateFavoriteCardsFetch();
	}, [cardsChanged]);

	return (
		<>
			<div className='container d-flex flex-column justify-content-center align-items-center gap-3 py-5'>
				<h1 className='w-100 text-center'>Your Favorite Cards</h1>
				{loading && !hasFetched ? (
					<div className='d-flex justify-content-center'>
						<Spinner animation='border' role='status'>
							<span className='visually-hidden'>Loading...</span>
						</Spinner>
					</div>
				) : !hasFetched ? (
					<div className='d-flex justify-content-center'>
						<Spinner animation='border' role='status'>
							<span className='visually-hidden'>Loading...</span>
						</Spinner>
					</div>
				) : favoriteCards.length === 0 ? (
					<p className='text-center text-capitalize fs-5'>
						You don't have any favorite cards yet! <br /> Like the cards you want to add to your favorites.
					</p>
				) : (
					<div className='d-flex flex-wrap gap-5 px-5 justify-content-center my-2 w-100'>
						<ShowCards cards={favoriteCards} />
					</div>
				)}
				<p className='spacerFromFooter mx-5'></p>
			</div>
		</>
	);
}

export default FavoriteCards;
