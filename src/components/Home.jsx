import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCards } from "../services/cardService";
import { ShowCards } from "./ShowCards";
import { cardContext } from "../App";
import { Spinner } from "react-bootstrap";

function Home() {
	let [exampleCards, setExampleCards] = useState([]);
	let [hasFetched, setHasFetched] = useState(false);
	let { cardsChanged, loading, setLoading } = useContext(cardContext);

	const fetchExampleCards = async () => {
		try {
			setLoading(true);
			let cards = await getAllCards();
			cards = cards.slice(0, 6);
			setExampleCards(cards);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
			setHasFetched(true);
		}
	};
	useEffect(() => fetchExampleCards, []);

	const updateCardsFetch = async () => {
		let updatedCards = await getAllCards();
		updatedCards = updatedCards.slice(0, 6);
		setExampleCards(updatedCards);
	};
	useEffect(() => {
		updateCardsFetch();
	}, [cardsChanged]);

	const navigate = useNavigate();
	const handleCardsNavigition = () => {
		navigate("/cards");
	};
	return (
		<>
			<div className='container d-flex flex-column justify-content-center align-items-center gap-3 mt-5 home'>
				<h2 className='text-center'>BCard - Worldwide Business Site </h2>
				<h5 className='text-center'>The Biggest Site For Business Cards</h5>
				<p className='w-75 text-center'>
					The website gatherer many type of information about diffrenets type of business, you can look around and search for your disire business, and also add your own business or mark your favorite ones! here is some examples:
				</p>
				{loading && !hasFetched ? (
					<Spinner animation='border' role='status'>
						<span className='visually-hidden'>Loading...</span>
					</Spinner>
				) : exampleCards.length === 0 ? (
					<h3>Not Found Any Cards</h3>
				) : (
					<div className='d-flex flex-wrap gap-5 px-5 justify-content-center my-2'>
						<ShowCards cards={exampleCards} />
					</div>
				)}
				<button onClick={handleCardsNavigition} className='btn btn-primary mb-5 mt-2'>
					To All The Cards
				</button>
				<p className='spacerFromFooter'></p>
			</div>
		</>
	);
}

export default Home;
