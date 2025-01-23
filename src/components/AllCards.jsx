import { useContext, useEffect, useState } from "react";
import { getAllCards } from "../services/cardService";
import { ShowCards } from "./ShowCards";
import { cardContext } from "../App";
import { Spinner } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function AllCards() {
	const searchQuery = new URLSearchParams(useLocation().search).get("search");

	let [cards, setCards] = useState([]);
	let [filteredCards, setFilteredCards] = useState([]);
	let [hasFetched, setHasFetched] = useState(false);
	let { cardsChanged, loading, setLoading } = useContext(cardContext);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	const fetchCards = async () => {
		try {
			setLoading(true);
			let cards = await getAllCards();
			setCards(cards);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
			setHasFetched(true);
		}
	};
	const updateCardsFetch = async () => {
		let updatedCards = await getAllCards();
		setCards(updatedCards);
	};

	useEffect(() => {
		fetchCards();
	}, []);

	useEffect(() => {
		updateCardsFetch();
	}, [cardsChanged]);

	useEffect(() => {
		if (searchQuery) {
			setLoading(true);
			let filteredData = cards.filter((card) => card.title.toLowerCase().includes(searchQuery.toLowerCase()));
			setFilteredCards(filteredData);
			setLoading(false);
		}
	}, [searchQuery, cards]);

	return (
		<>
			<div className='container d-flex flex-column justify-content-center align-items-center gap-3 py-5'>
				<h1 className=' w-100 text-center'>All Business Cards</h1>
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
				) : (searchQuery && filteredCards.length === 0) || (!searchQuery && cards.length === 0) ? (
					<h5 className='text-center'>Not Found Any Cards</h5>
				) : (
					<div className='d-flex flex-wrap gap-5 px-5 justify-content-center my-2 w-100'>
						<ShowCards cards={searchQuery ? filteredCards : cards} />
					</div>
				)}
				<p className='spacerFromFooter mx-5'></p>
			</div>
			<button
				onClick={scrollToTop}
				style={{
					position: "fixed",
					bottom: "70px",
					left: "20px",
					border: "none",
					borderRadius: "50%",
					width: "35px",
					height: "35px",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					cursor: "pointer",
				}}>
				<i className='fas fa-arrow-up'></i>
			</button>
		</>
	);
}

export default AllCards;
