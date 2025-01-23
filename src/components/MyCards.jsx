import { useContext, useEffect, useState } from "react";
import { getMyCards } from "../services/cardService";
import { authContext, cardContext } from "../App";
import { ShowCards } from "./ShowCards";
import useAuth from "../hooks/useAuth";
import { Spinner } from "react-bootstrap";

function MyCards() {
	const isAuthenticated = useAuth("my-cards");
	if (!isAuthenticated) return null;

	let { cardsChanged, loading, setLoading } = useContext(cardContext);
	let [cards, setCards] = useState([]);
	let { token } = useContext(authContext);
	let [hasFetched, setHasFetched] = useState(false);

	const fetchMyCards = async () => {
		try {
			setLoading(true);
			let myCardsData = await getMyCards(token);
			setCards(myCardsData);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
			setHasFetched(true);
		}
	};
	useEffect(() => {
		if (token) fetchMyCards();
	}, [token]);

	const updateMyCardsFetch = async () => {
		let updatedMyCards = await getMyCards(token);
		setCards(updatedMyCards);
	};
	useEffect(() => {
		updateMyCardsFetch();
	}, [cardsChanged]);

	return (
		<>
			<div className='container d-flex flex-column justify-content-center align-items-center gap-3 py-5'>
				<h1 className='w-100 text-center'>My Cards</h1>
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
				) : cards.length === 0 ? (
					<p className='text-center text-capitalize fs-5'>
						You haven't created any cards yet! <br /> Click on the "add" button at the bottom-right to create your first Business Card.
					</p>
				) : (
					<div className='d-flex flex-wrap gap-5 px-5 justify-content-center my-2 w-100'>
						<ShowCards cards={cards} />
					</div>
				)}
				<p className='spacerFromFooter mx-5'></p>
			</div>
		</>
	);
}

export default MyCards;
